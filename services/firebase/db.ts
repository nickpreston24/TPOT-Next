import { db } from './firebase'

export const createUser = (
    id: string
    , username: string
    , email: string
) =>
    db.ref(`users/${id}`).set({
        username,
        email,
    })

export const getUsersOnce = () => db.ref('users').once('value')

//     signIn = (email, password) => {
//         return new Promise((resolve, reject) => {
//             this.auth.signInWithEmailAndPassword(email, password)
//                 .then(authUser => {
//                     this.redirect('/')
//                     resolve(authUser)
//                 })
//                 .catch(error => {
//                     reject(error)
//                 })
//         })
//     }

//     signOut = () => {
//         this.redirect('/login')
//         firebase.auth().signOut()
//             .then(result =>
//                 console.log('logged out user', result)
//             )
//     }

//     forgot = email => {
//         this.auth.sendPasswordResetEmail(email)
//     }

//     updatePassword = password => {
//         this.auth.currentUser.updatePassword(password)
//     }

//     getTime = () => firebase.firestore.Timestamp.fromDate(new Date())

//     setRouter = router => this.router = router

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

//     // Checkout Functions

//     save = async id => {
//         console.log('chekcout document', id)
//         return new Promise(async (resolve, reject) => {
//             console.log(`Save Document by ID: ${id}`)
//             let requestedDocument = new Document(`sessions/${id}`)
//             requestedDocument.update({
//                 date_modified: new Date()
//             })
//                 .then(resolve())
//                 .catch(reject())

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

//         return new Promise(async (resolve, reject) => {
//             console.log(`Checkout Document by ID: ${id}`)
//             let requestedDocument = new Document(`sessions/${id}`)
//             await requestedDocument.fetch()
//             let { status } = requestedDocument.data
//             if (['not-started', 'in-progress'].includes(status)) {
//                 this.redirect('/scribe/edit/[doc]', `/scribe/edit/${id}`)
//                 // href={"/scribe/edit/[doc]"}
//                 // as={`/scribe/edit/${id}`}
//                 resolve()
//             } else {
//                 reject()
//             }
//         })
//     }

//     unlock = async id => {
//         return new Promise(async (resolve, reject) => {
//             console.log(`Unlock Document by ID: ${id}`)
//             let requestedDocument = new Document(`sessions/${id}`)
//             await requestedDocument.fetch()
//             requestedDocument.update({
//                 status: 'in-progress'
//             })
//                 .then(resolve)
//                 .catch(reject)
//         })
//     }

//     upload = async (file) => {

//         // Run conversion:        
//         let html = await convertFile(file)
//         console.log(!!html && html)

//         if (!html)
//             return

//         // Upload to Cloud Storage:
//         let fileRef = storageRef.child(`${uploadsFolder}/${file.name}`)
//         fileRef.put(file)
//             .then(snapshot => {

//                 var fileName = file.name
//                 var { ...emptyPaper } = new Paper({
//                     docx: `${file.name}`,
//                     title: file.name,
//                     status: 'not-started',
//                     date_modified: Date.now(),
//                     date_uploaded: Date.now(),
//                     author: null,
//                     draft_state: {
//                         original: html,
//                         editor: null,
//                         code: null,
//                     },
//                     excerpt: null
//                 })

//                 console.log(emptyPaper)

//                 db.collection('sessions')
//                     .doc(emptyPaper.slug)
//                     .set(emptyPaper)
//                     .catch(console.error)

//                 alert(!!snapshot
//                     ? `Yay! File ${fileName} uploaded successfully!`
//                     : `Fail! ${fileName} could not be uploaded!`)

//                 console.log(`Downloading ${fileName}`)
//                 download(fileName)
//             })
//             .catch((error) => {
//                 console.log(error.message)
//                 alert('There was a problem uploading this file.')
//             })
//     }


// }