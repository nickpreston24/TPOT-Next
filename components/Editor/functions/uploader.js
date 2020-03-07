import { convertFile } from './converter'
import { Collection } from 'firestorter'
import { draftContentFromHtml, stateFromElementConfig, draftContentToHtml } from './utilities'
import { EditorState, convertToRaw } from 'draft-js'
import { toJS } from 'mobx'

export const uploadLocalFile = async (file, store) => {

    // Check to make sure document has not already been uploaded before

    const storageRef = await store.fb.storage.ref()

    const getDocumentMetadata = (storageRef, filepath) => {
        return new Promise(resolve => {
            storageRef.child(filepath).getMetadata()
                .then(metadata => resolve(metadata))
                .catch(error => resolve())
        })
    }

    const existingDoc = await getDocumentMetadata(storageRef, `${file.name}`)

    if (existingDoc) {
        console.error('Document already uploaded, exiting: ', existingDoc)
        store.notify('Document already uploaded', 'error')
        return
    }

    // Start formulating properties of the new document

    let title = (file.name)
        .replace(/\s/g, ' ') //Spaces first,
        .replace(/[,?*#!:;_]/g, ' ') // then specials
        .replace(/[\(\)\[\]\{\}]/g, '') // then then braces
        .replace('.docx', '')
        .trim();

    let slug = (title)
        .replace(/\s/g, '-')
        .toLowerCase()

    // Get the full, unadultured local conversion result
    let html = await convertFile(file)

    // Create a session in firebase for the document
    if (!html) {
        console.error(`There is no html input to convert: ${html}`)
    } else {
        console.warn(`Converting Document: ${title}`)
    }

    // Get results from Draft and other utilities
    const { newContentState, newBaseStyleMap } = draftContentFromHtml(html, stateFromElementConfig)
    const editorState = EditorState.createWithContent(newContentState)
    const draftState = convertToRaw(editorState.getCurrentContent())
    const codeState = draftContentToHtml(editorState, newContentState)

    // Build a full Document in the '/sessions' Collection
    const doc = await new Collection('sessions').add({
        status: 'not-started',
        contributors: store.authUser.email,
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

    if (!doc) {
        console.error(`Session failed to create entry: ${doc}`)
    } else {
        console.warn(`Session created, with id: ${doc.id}\n`)
    }

    // Since the document doesn't already exist
    console.warn(`Uploading Document to Storage: ${file.name}`)

    const snapshot = await store
        .fb
        .storage
        .ref()
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
    
    await doc.update({
        docx: downloadURL
    })

    console.warn(
        `Document Converted and Uploaded Successfully!:\n`, 
        '\nDownload URL\n', downloadURL, 
        '\n\nDocument Data', toJS(doc.data)
    )

    store.notify('Document uploaded successfully!', 'info')

}