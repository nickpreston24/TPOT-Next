import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import { FirebaseContext, FirebaseProvider, withFirebase, AuthUserContext, AuthUserProvider, withAuthUser } from './context'
import withAuthorization from './hoc'
import { initFirestorter } from 'firestorter'
import { observable } from 'mobx'

class Firebase {

    @observable authUser = null
    @observable router = null

    constructor() {
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
        }


        this.app = firebase.app()
        this.auth = firebase.auth()
        this.firestore = firebase.firestore()

        this.listener = this.auth.onAuthStateChanged(authUser => {
            this.authUser = authUser
            if (!authUser) {
                this.redirect('/login')
            }
        })

    }

    register = (first, last, email, password) => {
        return new Promise((resolve, reject) => {
            this.auth.createUserWithEmailAndPassword(email, password)
                .then((newUser) => {
                    resolve(newUser)
                })
                .catch(error => {
                    reject(error)
                })
        })
    }

    signIn = (email, password) => {
        return new Promise((resolve, reject) => {
            this.auth.signInWithEmailAndPassword(email, password)
                .then(authUser => {
                    this.redirect('/')
                    resolve(authUser)
                })
                .catch(error => {
                    reject(error)
                })
        })
    }

    signOut = () => {
        this.redirect('/login')
        firebase.auth().signOut()
            .then(result =>
                console.log('logged out user', result)
            )
    }

    forgot = email => {
        this.auth.sendPasswordResetEmail(email)
    }

    updatePassword = password => {
        this.auth.currentUser.updatePassword(password)
    }

    getTime = () => {
        return firebase.firestore.Timestamp.fromDate(new Date())
    }

    setRouter = router =>
        this.router = router

    redirect = path => {
        if (this.router) {
            if (this.router.pathname !== path) {
                this.router.push(path)
            }
        }
    }

}

export default Firebase

export { FirebaseContext, FirebaseProvider, withFirebase, AuthUserContext, AuthUserProvider, withAuthUser, withAuthorization };
