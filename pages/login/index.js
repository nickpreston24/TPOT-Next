import React, { Component } from 'react'
// import { Box } from '@material-ui/core'
// import LoginForm from './LoginForm'
// import Page from '@components/Page'
import * as ROUTES from '../../constants/routes';
import { useAuth } from "@hooks"
import { ZeitLinkButton, ZeitButton, ButtonLink } from "@components/experimental"
import { Chip } from '@material-ui/core'

const Login = () => {

    const auth = useAuth();
    const { signin } = auth;
    console.log('auth :>> ', signin);

    return (
        <div>
            <h2>Login</h2>

            <div>Finish the form using Formik, here.</div>

            {/* <button onClick={signin}>Sign In</button> */}
            <ZeitButton
                text='Sign In'
                onClick={signin}>
            </ZeitButton>
            <br />
            <Chip
                label='Go Back'
                title='test'
                component={ButtonLink}
                href={ROUTES.LANDING}
                as="/"
                clickable

            />

            {/* <ZeitLinkButton
                label='Go Back'
                title='test'
                href={ROUTES.LANDING}
                as="/"
            >
                Go Home
            </ZeitLinkButton> */}

        </div>
    );
};

export default Login