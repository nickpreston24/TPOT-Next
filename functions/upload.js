import { convertFile } from './converter'
import { Collection } from 'firestorter'
import { draftContentFromHtml, stateFromElementConfig, draftContentToHtml } from './utilities'
import { EditorState, convertToRaw } from 'draft-js'
import { storage } from '@services/firebase'
import { CheckoutStatus } from '@constants'

export const uploadLocalFile = async (file, userName = null) => {

    // Check to make sure document has not already been uploaded before

    // const storageRef = await firebase.storage().ref()
    const storageRef = storage.ref();

    // console.log('storageRef :>> ', !!storageRef);
    // console.log('file name', file.name)

    // const getDocumentMetadata = (storageRef, filepath) => {
    //     return storageRef.child(filepath).getMetadata()
    // }

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

    // console.log('title :>> ', title);

    let slug = (title)
        .replace(/\s/g, '-')
        .toLowerCase()

    // console.log('slug :>> ', slug);

    // Get the full, unadultured local conversion result
    let html = await convertFile(file)
    // console.log('html :>> ', !!html);

    // Create a session in firebase for the document
    if (!html) {
        console.warn(`There is no html input to convert: ${html}`)
    } else {
        console.info(`Converted Document: ${title}`)
    }

    // Get results from Draft and other utilities
    const { newContentState, newBaseStyleMap } = draftContentFromHtml(html, stateFromElementConfig)
    const editorState = EditorState.createWithContent(newContentState)
    const draftState = convertToRaw(editorState.getCurrentContent())
    const codeState = draftContentToHtml(editorState, newContentState)

    // Build a full Document in the '/sessions' Collection
    const document = await new Collection('sessions').add({
        status: CheckoutStatus.NotStarted,
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

    // console.log('document :>> ', document);
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
    const downloadUrl = await snapshot.ref.getDownloadURL()

    if (!downloadUrl) {
        console.error(`Could not get download URL: ${downloadUrl}`)
        return
    }

    await document.update({
        docx: downloadUrl
    })

    console.info(
        'Document Converted and Uploaded Successfully!:\n',
        '\nDownload URL\n', downloadUrl,
        '\n\nDocument Data', !!document.data //toJS(document.data)
    )

    return { document, downloadUrl };
}