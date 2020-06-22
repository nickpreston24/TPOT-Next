import React, { Component, useState } from 'react'
import * as ROUTES from '../../constants/routes';
import { useAuth } from "@hooks"
import { ZeitButton, ButtonLink } from "@components/experimental"
import { Chip, Box } from '@material-ui/core'
import { Formik } from 'formik'
import { notify } from 'components/experimental/Toasts';
import { Column, Row } from 'simple-flexbox'  // A placeholder for MUI's Box className issue.

import Router from 'next/router'


const Login = () => {

    const auth = useAuth();
    const { signin, signout, user } = auth;

    return (
        <div>
            {/* <Box
                textAlign="center"
                px={2}
            > */}
            <Row
                horizontal="center"
            >
                <h2>Login to Toolbox</h2>
            </Row>
            <Row horizontal="center">
                {/* Using the first Basic Formik example here */}
                <Formik
                    initialValues={{ email: '', password: '' }}
                    validate={values => {
                        const errors = {};
                        if (!values.email) {
                            errors.email = 'Required';
                        } else if (
                            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                        ) {
                            errors.email = 'Invalid email address';
                        }
                        console.log('errors', errors)
                        return errors;
                    }}
                    onSubmit={async (values, { setSubmitting }) => {
                        const { email, password } = values;
                        setSubmitting(true)
                        await signin(email, password);
                        console.log('authed user :>>', !!user)
                        setSubmitting(false);

                        if (!!user) {
                            notify('You are now signed in!')
                            // TODO: Redirect to Checkout
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
                        isSubmitting,
                        /* and other goodies */
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
                                <ZeitButton
                                    type="submit"
                                    disabled={isSubmitting} // FIXME: Roll this into ZeitButton's props.
                                    text='Sign In'
                                />
                                <Chip
                                    label='Go Back'
                                    title={`Go Home`}
                                    component={ButtonLink}
                                    href={ROUTES.LANDING}
                                    as="/"
                                    clickable

                                />
                                {/* FIXME: Have the ZLButton do perform the route change */}
                                {/* <ZeitLinkButton
                                    label='Go Back'
                                    title='Go Home'
                                    href={ROUTES.LANDING}
                                    as="/"
                                >
                                    Go Home
                                </ZeitLinkButton> */}
                            </form>
                        )}
                </Formik>
            </Row>
            {/* </Box> */}

        </div>
    );
};

export default Login