import React, { Component, useState } from 'react'
import * as ROUTES from '@constants/routes';
import { useAuth } from "@hooks"
import { ZeitButton, ZeitLinkButton, ButtonLink } from "@components/experimental"
import { Box, Button, Heading } from '@chakra-ui/core'
import { Chip } from '@material-ui/core'
import { Formik } from 'formik'
import { notify } from 'components/experimental/Toasts';
import Link from 'next/link'

import Router from 'next/router'

const validateInput = values => {
    const errors = {};
    if (!values.email) {
        errors.email = 'Required';
    }
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }
    // console.log('errors', errors)
    return errors;
};

const Login = () => {

    const auth = useAuth();
    const { signin, signout, user } = auth;

    return (
        <Box
            textAlign="center"
            px={2}
        >
            <Heading size="md">Login to Toolbox</Heading>

            {/* Using the first Basic Formik example here */}
            <Formik
                initialValues={{ email: '', password: '' }}
                validate={validateInput}
                onSubmit={async (values, { setSubmitting }) => {
                    const { email, password } = values;
                    setSubmitting(true)
                    await signin(email, password);
                    console.log('authed user :>>', !!user)
                    setSubmitting(false);

                    if (!!user) {
                        notify('You are now signed in!', 'success')
                        Router.push(ROUTES.SCRIBE)
                    }
                    else {
                        notify('There was a problem signing you in.', 'warn')
                    }
                }}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                }) => (
                        <form onSubmit={handleSubmit}>
                            <input
                                type="email"
                                name="email"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                            />
                            {errors.email && touched.email && errors.email}
                            <br />
                            <input
                                type="password"
                                name="password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                            />
                            {errors.password && touched.password && errors.password}
                            <br />
                            <ZeitLinkButton
                                type="submit"
                                text='Sign In'
                                href={ROUTES.SCRIBE}
                            >
                                Submit
                            </ZeitLinkButton>

                            {/* Keeping this Chip here b/c my ZeitButtons and Button+Link combos just make the form validate again :'{ */}
                            <Chip
                                label='Go Back'
                                title={`Go Home`}
                                component={ButtonLink}
                                href={ROUTES.LANDING}
                                as="/"
                                clickable
                            />

                            {/* <ZeitButton
                                text={`Go Home`}
                            // IDEA: Make this ACCOUNT once we have Settings and full Sessions / WP data views ready.
                            >
                                <Link href={ROUTES.LANDING} />
                            </ZeitButton> */}
                        </form>
                    )}
            </Formik>
        </Box>
    );
};

export default Login