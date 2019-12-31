import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import { initFirestorter } from 'firestorter'

export const Firebase = {

    init: () => {

        if (!firebase.apps.length) {
            firebase.initializeApp({
                apiKey: "AIzaSyCrRjT-eZQAxfPkDemOe0WiebiWVZju97w",
                authDomain: "tpot-toolbox.firebaseapp.com",
                databaseURL: "https://tpot-toolbox.firebaseio.com",
                projectId: "tpot-toolbox",
                storageBucket: "tpot-toolbox.appspot.com",
                messagingSenderId: "971065099433"
            })

            initFirestorter({ firebase: firebase })

            // Fix for Firebase 5.0.4 Timestamp Deprecation
            // firebase.firestore().settings({ timestampsInSnapshots: true })
        }

        return firebase
    },

    firebase: firebase,

    signIn: (email, password) => {
        return new Promise((resolve, reject) => {
            firebase.app().auth().signInWithEmailAndPassword(email, password)
                .then(authUser => {
                    resolve(authUser)
                })
                .catch(error => {
                    reject(error)
                })
        })
    },

    signOut: () => {
        firebase.app().auth().signOut()
    },

    register: (first, last, email, password) => {
        return new Promise((resolve, reject) => {
            firebase.app().auth().createUserWithEmailAndPassword(email, password)
                .then((newUser) => {
                    resolve(newUser)
                })
                .catch(error => {
                    reject(error)
                })
        })
    },

    forgot: email => {
        firebase.app().auth().sendPasswordResetEmail(email)
    }
}