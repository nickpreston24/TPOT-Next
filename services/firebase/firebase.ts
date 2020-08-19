import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
import { initFirestorter, Document } from 'firestorter'

const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
}

if (!firebase.apps.length) {
    firebase.initializeApp(config);

    initFirestorter({ firebase: firebase })
    console.count('Firebase API -- init()')
}

export const auth = firebase.auth();
// export const db = app.database;
export const db = firebase.firestore();
export const storage = firebase.storage();

export {
    firebase
}