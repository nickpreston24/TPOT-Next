const admin = require('firebase-admin');
const functions = require('firebase-functions')
admin.initializeApp();

exports.convertDocxToHtml = functions.storage.object()
    .onFinalize( async (object) => {

        const filePath = object.name
        const name = filePath.split('/').pop()

        // Download the temp file
        const localFilePath = await bucket.file(filePath)
                .download({ destination: localFilePath })
        
        // Run your conversino code here
        const originalState = await convertToHtml(localFilePath)

        // Push the html result as the result of a new session Document
        await admin
            .firestore()
            .collection('sessions')
            .doc()
            .set({
                contributors: [],
                date_modified: admin.firestore().Timestamp.fromDate(Date.now),
                date_uploaded: admin.firestore().Timestamp.fromDate(Date.now),
                docx: `ref(tpot.firebase.com/storage/originals/${name})`,
                draft_state: {
                    code: null,
                    editor: null,
                    original: JSON.stringify(originalState)
                },
                excerpt: '',
                slug: sanitizeSlug(name),
                title: name
            })

    })