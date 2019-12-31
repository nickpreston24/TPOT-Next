import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import { initFirestorter } from 'firestorter'
import { firebaseConfig } from './firebase.key'

export const Firebase = {
    
    init: () => {
        
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig)

            initFirestorter({ firebase: firebase })
    
            // Fix for Firebase 5.0.4 Timestamp Deprecation
            // firebase.firestore().settings({ timestampsInSnapshots: true })
        }

        return firebase
    },

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
    }
}