import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/firestore'
import 'firebase/storage'
import { initFirestorter } from 'firestorter'

const config = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
}

if (!firebase.apps.length) {
  firebase.initializeApp(config)

  initFirestorter({ firebase: firebase })
}

export const auth = firebase.auth()
export const store = firebase.firestore()
export const storage = firebase.storage()

const user = (uid) => firebase.database().ref(`users/${uid}`)

export const onAuthUserListener = (next, fallback) =>
  auth.onAuthStateChanged(async (authUser) => {
    if (authUser) {
      user(authUser.uid)
        .once('value')
        .then((snapshot) => {
          const dbUser = snapshot.val()

          if (!dbUser) return

          if (!dbUser.roles) {
            dbUser.roles = {}
          }

          authUser = {
            uid: authUser.uid,
            email: authUser.email,
            emailVerified: authUser.emailVerified,
            providerData: authUser.providerData,
            ...dbUser,
          }

          next(authUser)
        })
    } else {
      fallback()
    }
  })

export { firebase }
