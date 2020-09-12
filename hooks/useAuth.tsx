import React, { useState, useEffect, useContext, createContext } from "react";
import '@services/firebase'
import * as firebase from "firebase/app";
import app from 'firebase/app';
import { onAuthUserListener } from '../services/firebase'
import { isDev } from "helpers";

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

    // const [authUser, setUser] = useState(null);
    const auth = app.auth();

    const [state, setState] = useState({
        authUser: null
    });

    // Wrap any Firebase methods we want to use making sure
    // to save the user to state.
    const signin = (email, password) => {

        return firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(response => {
                // setUser(response.user);
                setState({
                    ...state,
                    authUser: response.user
                })
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
                return response.user;
            });
    };

    const signout = (onSignout: () => void) => {
        return firebase
            .auth()
            .signOut()
            .then(() => {
                // setUser(null);
                setState({
                    ...state,
                    authUser: null
                })

                // isDev() && console.log('authUser :>> ', !!authUser);
                if (onSignout)
                    onSignout();
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
                this.setState({ authUser });
            },
            () => {
                localStorage.removeItem('authUser');
                this.setState({ authUser: null });
            },
        );

        // const unsubscribe = firebase.auth()
        //     .onAuthStateChanged(authUser => {
        //         console.log('auth state changed', !!authUser);
        //         if (!!authUser) {
        //             // setState(authUser: user);
        //             setState({
        //                 ...state,
        //                 authUser: authUser
        //             })

        //             localStorage.setItem('authUser', JSON.stringify(authUser))
        //             setState({ authUser });

        //             isDev() && console.log('state :>> ', state);
        //             isDev() && console.log('localStorage (on signin) :>> ', localStorage);

        //         } else {
        //             // setState(authUser: null);
        //             setState({
        //                 ...state,
        //                 authUser: null
        //             })

        //             localStorage.removeItem('authUser');
        //             isDev() && console.log('state :>> ', state);
        //             isDev() && console.log('localStorage (on removal) :>> ', localStorage);
        //         }
        //     });

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
        // onAuthUserListener,

        firebase,
    }
}