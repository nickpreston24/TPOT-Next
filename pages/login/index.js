import React, { Component, useState } from 'react'
import * as ROUTES from '@constants/routes';
import { useAuth } from "@hooks"
import { ZeitButton, ButtonLink } from "@components/experimental"
import { Box } from '@chakra-ui/core'
import { Chip } from '@material-ui/core'
import { Formik } from 'formik'
import { notify } from 'components/experimental/Toasts';

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
            <h2>Login to Toolbox</h2>

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
                        notify('You are now signed in!')
                        Router.push(ROUTES.SCRIBE)
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
                            <Button
                                type="submit"
                                text='Sign In'
                            >
                                <Link href={ROUTES.SCRIBE} />
                            </Button>
                            <Chip
                                label='Go Back'
                                title={`Go Home`}
                                component={ButtonLink}
                                href={ROUTES.LANDING}
                                as="/"
                                clickable
                            />
                        </form>
                    )}
            </Formik>
        </Box>
    );
};

export default Login