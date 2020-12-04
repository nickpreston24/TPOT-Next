const { createPaper } = require('./_lib/createPaper')

exports.handler = (event, context, callback) => {

    const { content, title, slug, author } = JSON.parse(event.body);

    console.log('body: ', event.body)

    // await createPaperViaPlaywright({ content, title })
    // await 
    // createPaper({ content, title })
    //     .then(() => {

            callback(null, {
                statusCode: 200,
                body: "Your paper was posted",
            })
        // })
        // .catch(console.error)


}