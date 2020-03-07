import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
import { FirebaseContext, FirebaseProvider, withFirebase, AuthUserContext, AuthUserProvider, withAuthUser } from './context'
import withAuthorization from './hoc'
import { initFirestorter, Document } from 'firestorter'
import { observable, toJS } from 'mobx'

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

        this.firebase = firebase
        this.app = firebase.app()
        this.auth = firebase.auth()
        this.storage = firebase.storage()
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

    redirect = (path, as) => {
        if (this.router) {
            if (this.router.pathname !== path) {
                if (!!as) {
                    this.router.push(path, as)
                } else {
                    this.router.push(path)
                }
            }
        }
    }

    // Checkout Functions

    save = async id => {
        console.log('chekcout document', id)
        return new Promise(async (resolve, reject) => {
            console.log(`Save Document by ID: ${id}`)
            let requestedDocument = new Document(`sessions/${id}`)
            requestedDocument.update({
                date_modified: new Date()
            })
                .then(resolve())
                .catch(reject())

            // @action.bound save = () => {
            //     // const plainText = this.editor.current.plainText
            //     // console.log(
            //     //   // this.editor.current.editorState,
            //     //   // this.editor.current.stylesheet,
            //     //   this.editor.current.original, 
            //     //   // this.editor.current.code,
            //     // )

            //     // status: 'not-started',
            //     // contributors: store.authUser.email,
            //     // date_uploaded: new Date(),
            //     // date_modified: new Date(),
            //     // draft: JSON.stringify(draftState),
            //     // code: JSON.stringify(codeState),
            //     // original: JSON.stringify(html),
            //     // stylesheet: JSON.stringify(newBaseStyleMap),
            //     // filename: file.name,
            //     // title: title,
            //     // slug: `letters/${slug}.htm`,
            //     // excerpt: ''
            //     // this.props.document.set({ draft: plainText }, { merge: true })
            //     this.props.store.notify('Saved Document Successfully!', 'info')
            //   }

            // let { status } = requestedDocument.data
            // if (['not-started', 'in-progress'].includes(status)) {
            //     this.redirect("/scribe/edit/[doc]", `/scribe/edit/${id}`)
            //     // href={"/scribe/edit/[doc]"}
            //     // as={`/scribe/edit/${id}`}
            //     resolve()
            // } else {
            //     reject()
            // }
        })
    }

    checkout = async id => {
        console.log('chekcout document', id)
        return new Promise(async (resolve, reject) => {
            console.log(`Checkout Document by ID: ${id}`)
            let requestedDocument = new Document(`sessions/${id}`)
            await requestedDocument.fetch()
            let { status } = requestedDocument.data
            if (['not-started', 'in-progress'].includes(status)) {
                this.redirect("/scribe/edit/[doc]", `/scribe/edit/${id}`)
                // href={"/scribe/edit/[doc]"}
                // as={`/scribe/edit/${id}`}
                resolve()
            } else {
                reject()
            }
        })
    }

    unlock = async id => {
        return new Promise(async (resolve, reject) => {
            console.log(`Unlock Document by ID: ${id}`)
            let requestedDocument = new Document(`sessions/${id}`)
            await requestedDocument.fetch()
            requestedDocument.update({
                status: 'in-progress'
            })
                .then(resolve)
                .catch(reject)
        })
    }

}

export default Firebase

export { FirebaseContext, FirebaseProvider, withFirebase, AuthUserContext, AuthUserProvider, withAuthUser, withAuthorization };
