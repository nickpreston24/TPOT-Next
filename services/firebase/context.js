import React from 'react'


export const FirebaseContext = React.createContext(null)

export const FirebaseProvider = FirebaseContext.Provider

export const withFirebase = Component => props => (
  <FirebaseContext.Consumer>
    {firebase => <Component {...props} firebase={firebase} />}
  </FirebaseContext.Consumer>
)


export const AuthUserContext = React.createContext(null)

export const AuthUserProvider = AuthUserContext.Provider

export const withAuthUser = Component => props => (
  <AuthUserContext.Consumer>
    {authUser => <Component {...props} authUser={authUser} />}
  </AuthUserContext.Consumer>
)