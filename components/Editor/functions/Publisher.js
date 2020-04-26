
Skip to content
Pull requests
Issues
Marketplace
Explore
@MikePreston17
HarvestHaven /
TPOT-Next

2
1

    0

Code
Issues 0
Pull requests 0
Actions
Projects 0
Wiki
Security 1
Insights
Settings
TPOT-Next/components/RichEditor/functions/Publisher.js /
@MikePreston17 MikePreston17 Refactored RichEditor functions b34092b 19 days ago
We found a potential security vulnerability in one of your dependencies.

You can see this message because you have been granted access to security alerts for this repository.
128 lines (106 sloc) 3.81 KB
import AsyncObject from '@cuties/cuties'
import { generateHtmlFromEditorState } from '../functions'

Object.prototype.isEmpty = function () {
    for (var key in this) {
        if (this.hasOwnProperty(key))
            return false;
    }
    return true;
}

const WordPressNotInitializedException = new Error("Wordpress has not been initialized!");

// TODO: Temporarary - Refactor this to be DB configurable:
const wp = new WPAPI({
    endpoint: 'https://www.thepathoftruth.com/wp-json',
    username: 'michael.n.preston@gmail.com',
    password: null //TODO: init w/ process.env or firebase
});

/**
   * Publishes html content to wordpress
   *   If post already exists, update with latest contents.
   *   Else, create it, then update it.
   */

export class PublishedDocument extends AsyncObject {

    disabledMsg = "Sorry, publish feature is disabled for now.";

    constructor(authorId = -1, pageContents = {}, latestPage = null) {
        super(authorId, pageContents)

        if (!wp)
            throw WordPressNotInitializedException;

        if (!pageContents || !Object.keys(pageContents).length > 0)
            throw new Error("Received no contents to publish!");
    }

    asyncCall() {
        return (authorId, pageContents) => {

            let html = generateHtmlFromEditorState(editorState);

            if (!html)
                return;

            if (pageContents.isEmpty())
                pageContents = getSamplePageContent(html);

            console.log(pageContents.isEmpty());
            console.log('last post? ', !!latestPage)
            // console.log(pageContents)
            // return;      

            if (!!latestPage) {
                wp.pages()
                    .author(authorId)
                    .id(latestPage.id)
                    .update(pageContents)
                    .then(function (response) {
                        console.log('response: ', response)
                        console.log(response.id);
                    })
                    .catch(error => {
                        if (!!error)
                            console.error("Error occured when updating a page in WordPress: ", error);
                    });
            }
            else {
                wp.pages()
                    .author(authorId)
                    .create(pageContents)
                    .then(function (response) {
                        console.log('response: ', response)
                        console.log('WordPress paper id: ', response.id);
                        this.id = id;
                    })
                    .catch(error => {
                        if (!!error)
                            console.error("Error occured when posting a new page to WordPress: ", error);
                    });
            }
        }
    }

    // Return the Id of the paper just published
    onResult(result) {
        return this.id;
    }
}

export class LastWordpressPost extends AsyncObject {
    constructor(authorId, wp) {
        super(authorId, wp);

        if (!wp)
            throw WordPressNotInitializedException;
    }

    asyncCall() {
        return (authorId = 10) => {
            //TODO: create and call a getLastPost method, passing in the current wp admin creds and username
            let myLastPost = await wp.pages()
                .author(authorId)
                .id(26510);

            console.log('my pages: ', myLastPost)
            this.lastPost = myLastPost;
        }
    }

    onResult = () => this.lastPost;
}
function getSamplePageContent(html) {
    console.log('publishing html:\n', html);
    let slug = 'sample-slug'; //TODO: use your slug making function
    let title = 'sample-title'; // TODO: get from UI
    let excerpt = 'lorem ipsum'; // TODO: get from UI
    const pageContents = {
        content: html,
        slug,
        title,
        excerpt
    };
}

    © 2020 GitHub, Inc.
    Terms
    Privacy
    Security
    Status
    Help

    Contact GitHub
    Pricing
    API
    Training
    Blog
    About





// import { AsyncObject } from '@cuties/cutie'
// import { generateHtmlFromEditorState } from '../../RichEditor/functions'
// import ExtendableError from '../../Errors'
// import WPAPI from 'wpapi'

// class WordPressNotInitializedException extends ExtendableError { message = "Wordpress has not been initialized!" }
// class PaperNotFoundException extends ExtendableError { message = "Could not find the Paper you're looking for..." }


// // TODO: Temporary - Refactor this to be DB configurable:
// const wpapi = new WPAPI({
//     endpoint: 'https://www.thepathoftruth.com/wp-json',
//     username: 'michael.n.preston@gmail.com',
//     password: 'Mercury2020!!' //TODO: init w/ process.env or firebase
// });

// const DEFAULT_AUTHOR = 10; //Victor

// /**
//    * Publishes html content to wordpress
//    *   If post already exists, update with latest contents.
//    *   Else, create it, then update it.
//    */

// export class PublishedDocument extends AsyncObject {

//     disabledMsg = "Sorry, publish feature is disabled for now.";

//     isEmpty = function (obj) {
//         for (var key in obj) {
//             if (obj.hasOwnProperty(key))
//                 return false;
//         }
//         return true;
//     }

//     // constructor(latestPage = null, pageContents = '<p></p>') {
//     constructor(latestPage, pageContents) {
//         super(latestPage, pageContents)

//         console.log('latestPage', latestPage);
//         console.log('authorId', latestPage.author);
//         console.log('pageContents', !!pageContents);
//         console.log('wpapi', !!wpapi);

//         this.latestPage = latestPage;
//         this.pageContents = pageContents;

//         // if(!latestPage)
//         //     throw PaperNotFoundException

//         if (!wpapi)
//             throw WordPressNotInitializedException("Wordpress has not been initialized!");

//         if (!pageContents || !Object.keys(pageContents).length > 0)
//             throw new Error("Received no contents to publish!");
//     }

//     asyncCall() {
//         return (latestPage, pageContents) => {

//             console.log('Attempted publish')
//             // if (pageContents.isEmpty())
//             // if (isEmpty(pageContents))
//             //     pageContents = getSamplePageContent(html);

//             // console.log(pageContents.isEmpty());
//             console.log('last post? ', this.latestPage)
//             // console.log(pageContents)
//             // return;      
//             const authorId = DEFAULT_AUTHOR;

//             if (!!this.latestPage) {
//                 wpapi.pages()
//                     .author(authorId)
//                     .id(latestPage.id)
//                     .update(pageContents)
//                     .then(function (response) {
//                         console.log('response: ', response)
//                         console.log(response.id);
//                         this.id = id;
//                     })
//                     .catch(error => {
//                         if (!!error)
//                             console.error("Error occured when updating a page in WordPress: ", error);
//                     });
//             }
//             else {
//                 wpapi.pages()
//                     .author(authorId)
//                     .create(pageContents)
//                     .then(function (response) {
//                         console.log('response: ', response)
//                         console.log('WordPress paper id: ', response.id);
//                         this.id = id;
//                     })
//                     .catch(error => {
//                         if (!!error)
//                             console.error("Error occured when posting a new page to WordPress: ", error);
//                     });
//             }
//         }
//     }

//     // Return the Id of the paper just published
//     onResult(result) {
//         console.info("You have results", result)
//         return this.id;
//     }
// }

// export class LastWordpressPost extends AsyncObject {
//     constructor(authorId) {
//         super(authorId);

//         if (!wpapi)
//             throw WordPressNotInitializedException;
//     }

//     asyncCall() {
//         // return async (authorId = DEFAULT_AUTHOR) => {
//         //     //TODO: create and call a getLastPost method, passing in the current wp admin creds and username
//         //     console.log('Author: ', authorId)
//         //     let myLastPost = await wpapi.pages()
//         //         .author(authorId)
//         //         .id(26510);

//         //     console.log('my pages: ', myLastPost)
//         //     this.lastPost = myLastPost;
//         // }

//         return (authorId = DEFAULT_AUTHOR) => {
//             //TODO: create and call a getLastPost method, passing in the current wp admin creds and username
//             // console.log('Author: ', authorId)
//             // let myLastPost = await 

//             // console.log('my pages: ', myLastPost)
//             wpapi.pages()
//                 .author(authorId)
//                 .id(26510)
//                 .then(result => {
//                     console.log('result', result)
//                     this.lastPost = result;

//                 });
//         };

//     }

//     onResult = () => this.lastPost;
// }

// function getSamplePageContent(html) {
//     console.log('publishing html:\n', html);
//     let slug = 'sample-slug'; //TODO: use your slug making function
//     let title = 'sample-title'; // TODO: get from UI
//     let excerpt = 'lorem ipsum'; // TODO: get from UI
//     const pageContents = {
//         content: html,
//         slug,
//         title,
//         excerpt
//     };
// }

