/**
 * Firebase Storage Provider
 * Intent: Wrap any component with the ability to do CRUD
 * with Firebase Storage
 */

import React from 'react'
import firebase from 'firebase';
import { Paper } from '../../apps/Scribe/models/Paper'
import { convertFile } from '../utilities/converter';

let db = firebase.firestore()

export const CloudStorage = React.createContext()
const firebaseApiKey = process.env.REACT_APP_FIREBASE_STORAGE_API_KEY || null

if (!firebaseApiKey) {
    console.warn('Invalid api key, could not initialize this context!');
}

const storageRef = firebase.storage().ref();
const uploadsFolder = 'originals'
const htmlFolder = 'tmp'

/**
 * Cloud File Provider
 * Allows any subscribers to interact with Cloud Storage files
 */
const CloudStorageProvider = (props) => {

    const upload = async (file) => {

        // Run conversion:        
        let html = await convertFile(file);
        console.log(!!html && html);

        if (!html)
            return;

        // Upload to Cloud Storage:
        let fileRef = storageRef.child(`${uploadsFolder}/${file.name}`);
        fileRef.put(file)
            .then(snapshot => {

                var fileName = file.name;
                var { ...emptyPaper } = new Paper({
                    docx: `${file.name}`,
                    title: file.name,
                    status: "not-started",
                    date_modified: Date.now(),
                    date_uploaded: Date.now(),
                    author: null,
                    draft_state: {
                        original: html,
                        editor: null,
                        code: null,
                    },
                    excerpt: null
                })

                console.log(emptyPaper);

                db.collection('sessions')
                    .doc(emptyPaper.slug)
                    .set(emptyPaper)
                    .catch(console.error)

                alert(!!snapshot
                    ? `Yay! File ${fileName} uploaded successfully!`
                    : `Fail! ${fileName} could not be uploaded!`)

                console.log(`Downloading ${fileName}`);
                download(fileName)
            })
            .catch((error) => {
                console.log(error.message);
                alert('There was a problem uploading this file.')
            })
    }

    /** Download a file locally */
    const download = (fileName) => {        
        
        var fileRef = storageRef
            .child('tmp')
            .child('html')
            .child(fileName)
        //TODO: find instructions on how to stream in the actual contents of the file.
        console.log('download ref: ', fileRef);

        checkout(fileName)
    }

    /** TODO: Mark a file for checkout (flag it) */
    const checkout = (fileName) => {
        console.log(`Checking out ${fileName}`);
    }

    return (
        <CloudStorage.Provider value={{ upload, download, checkout }}>
            {props.children}
        </CloudStorage.Provider>
    )
}

export default CloudStorageProvider
