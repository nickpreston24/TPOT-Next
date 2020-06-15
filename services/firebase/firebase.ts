import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
import { initFirestorter } from 'firestorter'
// import { convertFile } from '../../components/Editor/functions/converter'

const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
}


if (!app.apps.length) {
    app.initializeApp(config);

    initFirestorter({ firebase: app })
    console.count('Firebase API -- init()')
}

export const auth = app.auth();
// export const db = app.database;
export const db = app.firestore();

// export default class Firebase {

//     auth: app.auth.Auth
//     storage: app.storage.Storage
//     firestore: app.firestore.Firestore
//     db: app.database.Database
//     listener: any
//     authUser: any
//     router: any

//     /* Singleton Support
//     *  Optional to be used, if possible, in a given component or hoc.
//     */
//     static instance = null;
//     static getInstance() {
//         if (!Firebase.instance) {
//             console.count('Firebase API -- init()')
//             Firebase.instance = new Firebase();
//         }
//         return this.instance;
//     }

//     constructor() {

//         console.log('Hello from firebase.ts')

//         if (!app.apps.length) {
//             app.initializeApp(config)

//             initFirestorter({ firebase: app })
//             console.count('Firebase API -- init()')
//         }

//         /* Firebase APIs */

//         // this.app = app.app()
//         this.auth = app.auth()
//         this.storage = app.storage()
//         this.firestore = app.firestore()
//         // this.db = app.database()

//         this.listener = this.auth.onAuthStateChanged(authUser => {
//             // this.authUser = authUser
//             // if (!authUser) {
//             //     this.redirect('/login') // migrate this redir to responsible pages
//             // }
//         })


//     }

//     forgot = email => {
//         this.auth.sendPasswordResetEmail(email)
//     }

//     updatePassword = password => {
//         this.auth.currentUser.updatePassword(password)
//     }

//     getTime = () => {
//         return app.firestore.Timestamp.fromDate(new Date())
//     }

//     setRouter = router =>
//         this.router = router

//     redirect = (path, as) => {
//         if (this.router) {
//             if (this.router.pathname !== path) {
//                 if (!!as) {
//                     this.router.push(path, as)
//                 } else {
//                     this.router.push(path)
//                 }
//             }
//         }
//     }

//     // Sign Up
//     createUser = (
//         email: string,
//         password: string
//     ) => this.auth.createUserWithEmailAndPassword(email, password);

//     // Sign In
//     signIn = (email: string, password: string) =>
//         this.auth.signInWithEmailAndPassword(email, password);

//     // Sign out
//     signOut = () => this.auth.signOut();

//     // Password Reset
//     resetUserPassword = (email: string) =>
//         this.auth.sendPasswordResetEmail(email);

//     // Password Change
//     updateUserPassword = (password: string) => this.auth.currentUser.updatePassword(password);


//     // Checkout Functions

//     save = async id => {
//         console.log('chekcout document', id)
//         return new Promise(async (resolve, reject) => {
//             // console.log(`Save Document by ID: ${id}`)
//             // let requestedDocument = new Document(`sessions/${id}`)
//             // requestedDocument.update({
//             //     date_modified: new Date()
//             // })
//             //     .then(resolve())
//             //     .catch(reject())

//             // @action.bound save = () => {
//             //     // const plainText = this.editor.current.plainText
//             //     // console.log(
//             //     //   // this.editor.current.editorState,
//             //     //   // this.editor.current.stylesheet,
//             //     //   this.editor.current.original, 
//             //     //   // this.editor.current.code,
//             //     // )

//             //     // status: 'not-started',
//             //     // contributors: store.authUser.email,
//             //     // date_uploaded: new Date(),
//             //     // date_modified: new Date(),
//             //     // draft: JSON.stringify(draftState),
//             //     // code: JSON.stringify(codeState),
//             //     // original: JSON.stringify(html),
//             //     // stylesheet: JSON.stringify(newBaseStyleMap),
//             //     // filename: file.name,
//             //     // title: title,
//             //     // slug: `letters/${slug}.htm`,
//             //     // excerpt: ''
//             //     // this.props.document.set({ draft: plainText }, { merge: true })
//             //     this.props.store.notify('Saved Document Successfully!', 'info')
//             //   }

//             // let { status } = requestedDocument.data
//             // if (['not-started', 'in-progress'].includes(status)) {
//             //     this.redirect("/scribe/edit/[doc]", `/scribe/edit/${id}`)
//             //     // href={"/scribe/edit/[doc]"}
//             //     // as={`/scribe/edit/${id}`}
//             //     resolve()
//             // } else {
//             //     reject()
//             // }
//         })
//     }

//     checkout = async id => {
//         // console.log('checking out document', id)
//         // const document = new Document(`sessions/${id}`)
//         // await document.fetch()
//         // const { status } = document.data

//         // if (['not-started', 'in-progress'].includes(status)) {
//         //     this.redirect("/scribe/edit/[doc]", `/scribe/edit/${id}`)
//         // }

//         // return new Promise(async (resolve, reject) => {
//         //     console.log(`Checkout Document by ID: ${id}`)
//         //     let requestedDocument = new Document(`sessions/${id}`)
//         //     await requestedDocument.fetch()
//         //     let { status } = requestedDocument.data
//         //     if (['not-started', 'in-progress'].includes(status)) {
//         //         this.redirect('/scribe/edit/[doc]', `/scribe/edit/${id}`)
//         //         // href={"/scribe/edit/[doc]"}
//         //         // as={`/scribe/edit/${id}`}
//         //         resolve()
//         //     } else {
//         //         reject()
//         //     }
//         // })
//     }

//     unlock = async id => {
//         return new Promise(async (resolve, reject) => {
//             // console.log(`Unlock Document by ID: ${id}`)
//             // let requestedDocument = new Document(`sessions/${id}`)
//             // await requestedDocument.fetch()
//             // requestedDocument.update({
//             //     status: 'in-progress'
//             // })
//             //     .then(resolve)
//             //     .catch(reject)
//         })
//     }

//     // upload = async (file) => {

//     //     // Run conversion:        
//     //     let html = await convertFile(file)
//     //     console.log(!!html && html)

//     //     if (!html)
//     //         return

//     //     // Upload to Cloud Storage:
//     //     let fileRef = storageRef.child(`${uploadsFolder}/${file.name}`)
//     //     fileRef.put(file)
//     //         .then(snapshot => {

//     //             var fileName = file.name
//     //             var { ...emptyPaper } = new Paper({
//     //                 docx: `${file.name}`,
//     //                 title: file.name,
//     //                 status: 'not-started',
//     //                 date_modified: Date.now(),
//     //                 date_uploaded: Date.now(),
//     //                 author: null,
//     //                 draft_state: {
//     //                     original: html,
//     //                     editor: null,
//     //                     code: null,
//     //                 },
//     //                 excerpt: null
//     //             })

//     //             console.log(emptyPaper)

//     //             this.db.collection('sessions')
//     //                 .doc(emptyPaper.slug)
//     //                 .set(emptyPaper)
//     //                 .catch(console.error)

//     //             alert(!!snapshot
//     //                 ? `Yay! File ${fileName} uploaded successfully!`
//     //                 : `Fail! ${fileName} could not be uploaded!`)

//     //             console.log(`Downloading ${fileName}`)
//     //             download(fileName)
//     //         })
//     //         .catch((error) => {
//     //             console.log(error.message)
//     //             alert('There was a problem uploading this file.')
//     //         })
//     // }

// }

// export default Firebase
// const firebase = Firebase.getInstance();
// const auth = firebase.auth

// export {
//     app as firebase,
//     auth
// }