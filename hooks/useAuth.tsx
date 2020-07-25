import React, { useState, useEffect, useContext, createContext } from "react";
import '@services/firebase'
import * as firebase from "firebase/app";
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

    const [user, setUser] = useState(null);
    // Wrap any Firebase methods we want to use making sure
    // to save the user to state.
    const signin = (email, password) => {

        return firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(response => {
                setUser(response.user);
                return response.user;
            });
    };

    const signup = (email, password) => {
        return firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(response => {
                setUser(response.user);
                return response.user;
            });
    };

    const signout = (onSignout: () => void) => {
        return firebase
            .auth()
            .signOut()
            .then(() => {
                setUser(null);
                isDev() && console.log('authUser :>> ', !!user);
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
        // console.log('Activating auth...')
        const unsubscribe = firebase.auth().onAuthStateChanged(user => {
            // console.log('authUser? :>> ', !!user);
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    return {
        user,
        signin,
        signup,
        signout,
        sendPasswordResetEmail,
        confirmPasswordReset,
        firebase
    }
}