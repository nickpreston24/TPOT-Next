import React from 'react'
import NextLink from 'next/link'
import Template from '@templates/Welcome'
import * as ROUTES from '@constants/routes'
import { useRouter } from 'next/router'
import { Text, Link, Icon, useToast } from '@chakra-ui/core'
import { useFormik } from 'formik'
import { useAuth } from "@hooks"
import * as yup from 'yup'

const Page = () => {

  // Get the url query for 'm'. Example: toolbox.tech/m=login
  const router = useRouter()
  const { query: { m } } = router
  const mode = m || 'default'

  // Get authentication properties
  const auth = useAuth();
  const { user, signin, signup, sendPasswordResetEmail } = auth;

  const toast = useToast()

  // Navigation callbacks for links in the UI
  const redirectRegister = () => router.push(`${ROUTES.LANDING}?m=register`)
  const redirectForgot = () => router.push(`${ROUTES.LANDING}?m=forgot`)
  const redirectLogin = () => router.push(`${ROUTES.LANDING}?m=login`)
  const redirectScribe = () => router.push(ROUTES.SCRIBE)
  const redirectHome = () => router.push(ROUTES.LANDING)

  // Make a Formik instance for the application that the Template will render
  const toolboxAuthenticationForm = useFormik({
    initialValues: { firstName: '', lastName: '', email: '', password: '' },
    validationSchema: yup.object({
      formMode: yup.string().default(mode),
      email: yup.string()
        .when('formMode', {
          is: mode => ['register', 'login', 'forgot'].includes(mode),
          then: yup.string().email().required('Please enter your email'),
          otherwise: yup.string(),
        }),
      password: yup.string()
        .when('formMode', {
          is: mode => ['register', 'login'].includes(mode),
          then: yup.string().required('Please enter your password'),
          otherwise: yup.string(),
        }),
      firstName: yup.string()
        .when('formMode', {
          is: mode => ['register'].includes(mode),
          then: yup.string().required('First name is required'),
          otherwise: yup.string(),
        }),
      lastName: yup.string()
        .when('formMode', {
          is: mode => ['register'].includes(mode),
          then: yup.string().required('Last name is required'),
          otherwise: yup.string(),
        }),
    }),
    onSubmit: async (values, actions) => {

      const actionConfig = {
        register: {
          title: "Account created",
          description: "Check your inbox and confirm your email",
          cb: redirectLogin
        },
        login: {
          title: "Signed in Successfully",
          description: "Welcome to Toolbox! Enjoy your stay",
          cb: redirectScribe
        },
        forgot: {
          title: "Email Sent",
          description: "Check your inbox for the password reset",
          cb: redirectLogin
        }
      }

      // Get some information first
      const { setSubmitting } = actions
      const { email, password, firstName, lastName } = values

      // Set a timeout to prevent the Button UI from stalling
      setTimeout(() => actions.setSubmitting(false), 1000);

      // Choose the correct promise for the form's mode
      const promise = () => {
        actions.setSubmitting(true)
        switch (mode) {
          case 'forgot':
            return sendPasswordResetEmail(email)
          case 'register':
            return signup(email, password, /* firstName, lastName*/)
          case 'login':
            return signin(email, password)
        }
      }

      // Execute the promise and notify user of messages and errors
      promise()
        .then(() => {
          toast({
            position: "bottom-left",
            title: actionConfig[mode].title,
            description: actionConfig[mode].description,
            status: "success",
          })
          actions.setSubmitting(false)
          actionConfig[mode].cb()
        })
        .catch(error => {
          toast({
            position: "bottom-left",
            title: 'There was a problem',
            description: error.message,
            status: "error",
          })
        })
    },
  });

  const mainButtonHref = `${ROUTES.LANDING}?m=login`
  const mainButtonText = 'Sign In'

  const MainButtonLink = (
    <NextLink href={mainButtonHref}>
      <a>{mainButtonText}</a>
    </NextLink>
  )

  return (
    <Template
      mode={mode} // Driven by a URL query
      title="TPOT Toolbox"
      subtitle={PathOfTruthSubtitle}
      primaryButtonProps={{
        children: MainButtonLink
      }}
      formik={toolboxAuthenticationForm}
    />
  )
}

export default Page


const PathOfTruthSubtitle = (
  <Text>
    {'A Collection of tools for '}
    <Link href={"https://www.thepathoftruth.com"} isExternal color="blue.500">
      {"The Path of Truth"} <Icon name="external-link" mx="2px" />
    </Link>
  </Text>
)

