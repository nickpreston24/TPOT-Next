/**
 * Firebase Storage Provider
 * Intent: Wrap any component with the ability to do CRUD
 * with Firebase Storage
 */

import React from 'react'
// import firebase from 'firebase';
import { convertFile } from '../components/Editor/functions/converter';


export const CloudStorage = React.createContext()
const firebaseApiKey = process.env.REACT_APP_FIREBASE_STORAGE_API_KEY || null

if (!firebaseApiKey) {
    console.warn('Invalid api key, could not initialize this context!');
}

const uploadsFolder = 'originals'
const htmlFolder = 'tmp'


/**
 * Cloud File Provider
 * Allows any subscribers to interact with Cloud Storage files
 */
export const CloudStorageProvider = ({ db, firebase }) => {

    const storageRef = firebase.storage().ref();

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
        console.log('In download()');
        // Create a reference under which you want to list
        var fileRef = storageRef
            .child('tmp')
            .child('html')
            .child(fileName)

        console.log('ref: ', fileRef);

        // // Find all the prefixes and items.
        // listRef.listAll().then(function (res) {
        //     res.prefixes.forEach(function (folderRef) {
        //         // All the prefixes under listRef.
        //         // You may call listAll() recursively on them.
        //         console.log('folder ref: ', folderRef);
        //     });
        //     res.items.forEach(function (itemRef) {
        //         // All the items under listRef.
        //         console.log(itemRef);
        //     });
        // }).catch(function (error) {
        //     // Uh-oh, an error occurred!
        // });

        // fileRef.child('').getDownloadURL()
    }

    /** Mark a file for checkout */
    const checkout = (fileName) => {
        console.log(`Checking out ${fileName}`);
    }

    return (
        <CloudStorage.Provider value={{ upload, download, checkout }}>
            {props.children}
        </CloudStorage.Provider>
    )
}

class Paper {
    constructor(props) {
        Object.assign(this, { ...props });
        this.status = this.status || 'in-progress';
        this.slug = (this.slug || this.title)
            .replace(/\s/g, '-') //Spaces first,
            .replace(/[,?*#!:;_]/g, '-') // then specials
            .replace('.docx', '')
            .trim();
    }
}

export default CloudStorageProvider;