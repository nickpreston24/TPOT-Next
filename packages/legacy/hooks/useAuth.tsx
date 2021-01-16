import React, { useState, useEffect, useContext, createContext } from "react";
import '@services/firebase'
import * as firebase from "firebase/app";
import app from 'firebase/app';
import { onAuthUserListener } from '../services/firebase'
import { isDev } from "helpers";
import useFirestoreQuery from "./useFirestoreQuery";

const authContext = createContext(null);

// Provider component that wraps your app and makes auth object 
//  available to any child component that calls useAuth().

// Hook for child components to get the auth object 
//  and re-render when it changes.

export const useAuth = () => {
    return useContext(authContext);
};

// Provider component that wraps your app and makes auth object 

//  available to any child component that calls useAuth().

export function ProvideAuth({ children }, handleAuthFailure?: () => void) {
    const auth = useProvideAuth();
    return !auth
        ? handleAuthFailure()// || <div>Auth couldn't be loaded!</div>  //TODO: 
        : <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

// Provider hook that creates auth object and handles state
function useProvideAuth() {

    const auth = app.auth();

    const [state, setState] = useState({
        authUser: null //TODO: MST-ify this.  When page reloads, it turns null. - MP
    });

    // NOTE: This is temporary for cases where our user is not stored on refresh (f5) or localStorage.  Use MST to fix that issue!
    const getUser = () => {
        // useFirestoreQuery()
        // const snapshot = await store.collection('users')
        // .where()
    }

    // Wrap any Firebase methods we want to use making sure
    // to save the user to state.
    const signin = (email, password) => {

        return firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(response => {
                // setUser(response.user);
                console.log('response.user', response.user)
                setState({
                    ...state,
                    authUser: response.user
                })

                // TODO: @Braden-Preston or @mikepreston17, use MST to store this user between refreshes
                localStorage.setItem('user', JSON.stringify(response.user))

                return response.user;
            });
    };

    const signup = (email, password) => {
        return firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(response => {
                // setUser(response.user);
                setState({
                    ...state,
                    authUser: response.user
                })

                // TODO: @Braden-Preston or @mikepreston17, use MST to store this user between refreshes
                localStorage.setItem('user', JSON.stringify(response.user))

                return response.user;
            });
    };

    const signout = (onSignout: () => void) => {
        return firebase
            .auth()
            .signOut()
            .then(() => {
                setState({
                    ...state,
                    authUser: null
                })

                if (onSignout) {
                    // TODO: @Braden-Preston or @mikepreston17, use MST to store this user between refreshes
                    localStorage.setItem('user', '')
                    onSignout();
                }
            })
            .catch(console.error);
    };

    const sendPasswordResetEmail = email => {

        return firebase
            .auth()
            .sendPasswordResetEmail(email)
            .then(() => {
                return true;
            });
    };

    const confirmPasswordReset = (code, password) => {
        return firebase
            .auth()
            .confirmPasswordReset(code, password)
            .then(() => {
                return true; // Ensures we get a pass/fail instead of void
            });
    };



    // Subscribe to user on mount
    // Because this sets state in the callback it will cause any 
    //  component that utilizes this hook to re-render with the 
    //  latest auth object.

    useEffect(() => {

        const unsubscribe = onAuthUserListener(
            authUser => {
                localStorage.setItem('authUser', JSON.stringify(authUser));
                setState({ ...state, authUser });
            },
            () => {
                localStorage.removeItem('authUser');
                setState({ authUser: null });
            },
        );

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    return {
        user: state.authUser,
        signin,
        signup,
        signout,
        sendPasswordResetEmail,
        confirmPasswordReset,
        firebase,
    }
}