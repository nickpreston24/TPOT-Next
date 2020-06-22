import { convertFile } from './converter'
import { Collection } from 'firestorter'
import { draftContentFromHtml, stateFromElementConfig, draftContentToHtml } from './utilities'
import { EditorState, convertToRaw } from 'draft-js'
import { toJS } from 'mobx'

import { firebase, db, storage } from '@services/firebase'

/** TODO: @MP: Trim this firebase stuff down to bare minumum. 
 *  We don't need everything and the kitchen sink, 
 *  but I'm confused as to what parts are firebase, db, auth, etc. 
 *  and how to properly init and use them,
 *  thanks to guides renaming each as each other. */

// import app from 'firebase/app'
// import 'firebase/auth'
// import 'firebase/firestore'
// import 'firebase/storage'
// import { initFirestorter } from 'firestorter'
// import { convertFile } from '../../components/Editor/functions/converter'

// const config = {
//     apiKey: process.env.REACT_APP_API_KEY,
//     authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//     databaseURL: process.env.REACT_APP_DATABASE_URL,
//     projectId: process.env.REACT_APP_PROJECT_ID,
//     storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//     messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
// }


// if (!app.apps.length) {
//     app.initializeApp(config);

//     initFirestorter({ firebase: app })
//     console.count('Firebase API -- init()')
// }

// import firebase from 'firebase'

// console.log('firebase :>> ', firebase);

export const uploadLocalFile = async (file, userName = null) => {

    // Check to make sure document has not already been uploaded before

    // const storageRef = await firebase.storage().ref()
    const storageRef = storage.ref();
    console.log('storageRef :>> ', storageRef);

    const getDocumentMetadata = (storageRef, filepath) => {
        return storageRef.child(filepath).getMetadata()
    }

    console.log('file name', file.name)

    // const existingDoc = await getDocumentMetadata(storageRef, `${file.name}`)
    //     .catch(console.error)

    // console.log('existingDoc.fullPath', existingDoc.fullPath)

    // if (existingDoc && file.name === existingDoc.fullPath) {
    //     console.warn('Document already uploaded, exiting: ', existingDoc)
    //     notify('Document already uploaded', 'error')
    //     return
    // }

    // Start formulating properties of the new document

    let title = (file.name)
        .replace(/\s/g, ' ') //Spaces first,
        .replace(/[,?*#!:;_]/g, ' ') // then specials
        .replace(/[\(\)\[\]\{\}]/g, '') // then then braces
        .replace('.docx', '')
        .trim()

    console.log('title :>> ', title);

    let slug = (title)
        .replace(/\s/g, '-')
        .toLowerCase()

    console.log('slug :>> ', slug);

    // Get the full, unadultured local conversion result
    let html = await convertFile(file)
    console.log('html :>> ', !!html);

    // Create a session in firebase for the document
    if (!html) {
        console.warn(`There is no html input to convert: ${html}`)
    } else {
        console.info(`Converting Document: ${title}`)
    }

    // Get results from Draft and other utilities
    const { newContentState, newBaseStyleMap } = draftContentFromHtml(html, stateFromElementConfig)
    const editorState = EditorState.createWithContent(newContentState)
    const draftState = convertToRaw(editorState.getCurrentContent())
    const codeState = draftContentToHtml(editorState, newContentState)

    // Build a full Document in the '/sessions' Collection
    const document = await new Collection('sessions').add({
        status: 'not-started',
        contributors: userName,
        date_uploaded: new Date(),
        date_modified: new Date(),
        draft: JSON.stringify(draftState),
        code: JSON.stringify(codeState),
        original: JSON.stringify(html),
        stylesheet: JSON.stringify(newBaseStyleMap),
        filename: file.name,
        title: title,
        slug: `letters/${slug}.htm`,
        excerpt: ''
    })
    console.log('document :>> ', document);
    if (!document) {
        console.warn(`Session failed to create entry: ${document}`)
    } else {
        console.info(`Session created, with id: ${document.id}\n`)
    }

    // Since the document doesn't already exist
    console.info(`Uploading Document to Storage: ${file.name}`)

    const snapshot = await storageRef
        .child(`${file.name}`)
        .put(file)
        .then()

    if (!snapshot) {
        console.error(`Uploading document failed!: ${snapshot}`)
        return
    }

    // Update the session with the valid document download URL+token
    const downloadURL = await snapshot.ref.getDownloadURL()

    if (!downloadURL) {
        console.error(`Could not get download URL: ${downloadURL}`)
        return
    }

    await document.update({
        docx: downloadURL
    })

    console.info(
        'Document Converted and Uploaded Successfully!:\n',
        '\nDownload URL\n', downloadURL,
        '\n\nDocument Data', toJS(document.data)
    )

}