import { useToast } from '@chakra-ui/core'
import Icon from '@chakra-ui/core/dist/Icon'
import Link from '@chakra-ui/core/dist/Link'
import Text from '@chakra-ui/core/dist/Text'
import { useAuth } from '@hooks'
import { useFormik } from 'formik'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import * as yup from 'yup'
import Template from '../components/templates/Welcome'
import * as ROUTES from '../constants/routes'

const Page = () => {
  const router = useRouter()
  const {
    query: { m },
  } = router
  const mode = m || 'default'

  const auth = useAuth()
  const { user, signin, signup, sendPasswordResetEmail } = auth

  const toast = useToast()

  const redirectRegister = () => router.push(`${ROUTES.LANDING}?m=register`)
  const redirectForgot = () => router.push(`${ROUTES.LANDING}?m=forgot`)
  const redirectLogin = () => router.push(`${ROUTES.LANDING}?m=login`)
  const redirectScribe = () => router.push(ROUTES.SCRIBE)
  const redirectHome = () => router.push(ROUTES.LANDING)

  const toolboxAuthenticationForm = useFormik({
    initialValues: { firstName: '', lastName: '', email: '', password: '' },
    validationSchema: yup.object({
      formMode: yup.string().default(mode),
      email: yup.string().when('formMode', {
        is: (mode) => ['register', 'login', 'forgot'].includes(mode),
        then: yup.string().email().required('Please enter your email'),
        otherwise: yup.string(),
      }),
      password: yup.string().when('formMode', {
        is: (mode) => ['register', 'login'].includes(mode),
        then: yup.string().required('Please enter your password'),
        otherwise: yup.string(),
      }),
      firstName: yup.string().when('formMode', {
        is: (mode) => ['register'].includes(mode),
        then: yup.string().required('First name is required'),
        otherwise: yup.string(),
      }),
      lastName: yup.string().when('formMode', {
        is: (mode) => ['register'].includes(mode),
        then: yup.string().required('Last name is required'),
        otherwise: yup.string(),
      }),
    }),
    onSubmit: async (values, actions) => {
      const actionConfig = {
        register: {
          title: 'Account created',
          description: 'Check your inbox and confirm your email',
          cb: redirectLogin,
        },
        login: {
          title: 'Signed in Successfully',
          description: 'Welcome to Toolbox! Enjoy your stay',
          cb: redirectScribe,
        },
        forgot: {
          title: 'Email Sent',
          description: 'Check your inbox for the password reset',
          cb: redirectLogin,
        },
      }

      const { email, password, firstName, lastName } = values

      setTimeout(() => actions.setSubmitting(false), 1000)

      const promise = () => {
        actions.setSubmitting(true)
        switch (mode) {
          case 'forgot':
            return sendPasswordResetEmail(email)
          case 'register':
            return signup(email, password)
          case 'login':
            return signin(email, password)
        }
      }

      promise()
        .then(() => {
          toast({
            position: 'bottom-left',
            title: actionConfig[mode].title,
            description: actionConfig[mode].description,
            status: 'success',
          })
          actions.setSubmitting(false)
          actionConfig[mode].cb()
        })
        .catch((error) => {
          toast({
            position: 'bottom-left',
            title: 'There was a problem',
            description: error.message,
            status: 'error',
          })
        })
    },
  })

  const mainButtonHref = `${ROUTES.LANDING}?m=login`
  const mainButtonText = 'Sign In'

  const MainButtonLink = (
    <NextLink href={mainButtonHref}>
      <a>{mainButtonText}</a>
    </NextLink>
  )

  return (
    <Template
      mode={mode}
      title='TPOT Toolbox'
      subtitle={PathOfTruthSubtitle}
      primaryButtonProps={{
        children: MainButtonLink,
      }}
      formik={toolboxAuthenticationForm}
    />
  )
}

export default Page

const PathOfTruthSubtitle = (
  <Text>
    {'A Collection of tools for '}
    <Link href={'https://www.thepathoftruth.com'} isExternal color='blue.500'>
      {'The Path of Truth'} <Icon name='external-link' mx='2px' />
    </Link>
  </Text>
)
