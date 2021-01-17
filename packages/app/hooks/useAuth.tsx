import app, * as firebase from 'firebase/app'
import React, { createContext, useContext, useEffect, useState } from 'react'
import '../services/firebase'
import { onAuthUserListener } from '../services/firebase'

const authContext = createContext(null)

export const useAuth = () => {
  return useContext(authContext)
}

export function ProvideAuth({ children }, handleAuthFailure?: () => void) {
  const auth = useProvideAuth()
  return !auth ? (
    handleAuthFailure()
  ) : (
    <authContext.Provider value={auth}>{children}</authContext.Provider>
  )
}

function useProvideAuth() {
  const auth = app.auth()

  const [state, setState] = useState({
    authUser: null,
  })

  const signin = (email, password) => {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        setState({
          ...state,
          authUser: response.user,
        })

        localStorage.setItem('user', JSON.stringify(response.user))

        return response.user
      })
  }

  const signup = (email, password) => {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        setState({
          ...state,
          authUser: response.user,
        })

        localStorage.setItem('user', JSON.stringify(response.user))

        return response.user
      })
  }

  const signout = (onSignout: () => void) => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        setState({
          ...state,
          authUser: null,
        })

        if (onSignout) {
          localStorage.setItem('user', '')
          onSignout()
        }
      })
      .catch(console.error)
  }

  const sendPasswordResetEmail = (email) => {
    return firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        return true
      })
  }

  const confirmPasswordReset = (code, password) => {
    return firebase
      .auth()
      .confirmPasswordReset(code, password)
      .then(() => {
        return true
      })
  }

  useEffect(() => {
    const unsubscribe = onAuthUserListener(
      (authUser) => {
        localStorage.setItem('authUser', JSON.stringify(authUser))
        setState({ ...state, authUser })
      },
      () => {
        localStorage.removeItem('authUser')
        setState({ authUser: null })
      }
    )

    return () => unsubscribe()
  }, [])

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
