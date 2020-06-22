import { AsyncObject } from '@cuties/cutie'
import { generateHtmlFromEditorState } from '@RichEditor/functions'
import ExtendableError from '@Errors'
import { wpapi } from '@../services/wordpress/api';

class WordPressNotInitializedException extends ExtendableError { message = 'Wordpress has not been initialized!' }
class PaperNotFoundException extends ExtendableError { message = 'Could not find the Paper you\'re looking for...' }


// TODO: Temporary - Refactor this to be DB configurable:
// const wpapi = new WPAPI({
//     endpoint: 'https://www.thepathoftruth.com/wp-json',
//     username: 'michael.n.preston@gmail.com',
//     password: 'Mercury2020!!' //TODO: init w/ process.env or firebase
// })

const DEFAULT_AUTHOR = 10 //Victor

export function publish(html = '<p></p>', authorId = 10) {

    wpapi.pages()
        .author(authorId)
        .id(26510)
        // .id(99999) //fake id
        .then(latestPage => {

            console.log('latestPage', latestPage)

            let pageContents = getSamplePageContent(html)

            if (!!latestPage) {
                wpapi.pages()
                    .author(authorId)
                    .id(latestPage.id)
                    .update(pageContents)
                    .then(function (response) {
                        console.log('response (on update): ', response)
                        console.log('WordPress paper id: ', response.id)
                    })
                    .catch(error => {
                        if (!!error)
                            console.error('Error occured when updating a page in WordPress: ', error)
                    })
            }
            else {
                wpapi.pages()
                    .author(authorId)
                    .create(pageContents)
                    .then(function (response) {
                        console.log('response (on create): ', response)
                        console.log('WordPress paper id: ', response.id)
                        // this.id = id;
                    })
                    .catch(error => {
                        if (!!error)
                            console.error('Error occured when posting a new page to WordPress: ', error)
                    })
            }
        })
}

export function getSamplePageContent(html) {
    // console.log('publishing html:\n', html);
    let slug = 'sample-slug' //TODO: use your slug making function
    let title = 'sample-title-2' // TODO: get from UI
    let excerpt = 'lorem ipsum' // TODO: get from UI
    const pageContents = {
        content: html,
        slug,
        title,
        excerpt
    }
    return pageContents
}




/**
   * Publishes html content to wordpress
   *   If post already exists, update with latest contents.
   *   Else, create it, then update it.
   */
// export class PublishedDocument extends AsyncObject {

//     disabledMsg = "Sorry, publish feature is disabled for now.";

//     constructor(authorId = -1, pageContents = {}, latestPage = null) {
//         super(authorId, pageContents)

//         if (!pageContents || !Object.keys(pageContents).length > 0)
//             throw new Error("Received no contents to publish!");
//     }

//     asyncCall() {
//         return (authorId, pageContents) => {

//             if (!html)
//                 return;

//             if (pageContents.isEmpty())
//                 return;

//             console.log(pageContents.isEmpty());
//             console.log('last post? ', !!latestPage)
//             // console.log(pageContents)
//             // return;      

//             if (!!latestPage) {
//                 wpapi.pages()
//                     .author(authorId)
//                     .id(latestPage.id)
//                     .update(pageContents)
//                     .then(function (response) {
//                         console.log('response: ', response)
//                         console.log(response.id);
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
//         return this.id;
//     }
// }

// export class LastWordpressPost extends AsyncObject {
//     constructor(authorId) {
//         super(authorId);
//     }

//     asyncCall() {
//         console.log('test')
//         return (authorId = 10) =>
//             wpapi.pages()
//                 .author(authorId)
//                 .id(26510);
//     }

//     onResult = () => this.lastPost;
// }

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
//     //    constructor(authorId = -1, pageContents = {}, latestPage = null) {
//     //         super(authorId, pageContents)

//     constructor(latestPage, authorId = -1, pageContents = '<p></p>') {
//         super(latestPage, authorId, pageContents)

//         console.log('latestPage', latestPage);

//         this.latestPage = latestPage;
//         this.pageContents = pageContents;
//         this.authorId = authorId > 0 ? authorId : latestPage.author;

//         console.log('pageContents', !!this.pageContents);
//         console.log('this.latestPage', this.latestPage);
//         console.log('authorId', this.authorId);

//         // if(!latestPage)
//         //     throw PaperNotFoundException

//         if (!wpapi)
//             throw WordPressNotInitializedException("Wordpress has not been initialized!");

//         if (!pageContents || !Object.keys(pageContents).length > 0)
//             throw new Error("Received no contents to publish!");
//     }

//     asyncCall() {
//         return (latestPage, pageContents, authorId) => {

//             // console.log('Attempted publish')
//             // if (pageContents.isEmpty())
//             // if (isEmpty(pageContents))
//             //     pageContents = getSamplePageContent(html);

//             // console.log(pageContents.isEmpty());
//             // console.log('last post? ', this.latestPage)
//             // console.log(pageContents)
//             // return;      
//             // const authorId = DEFAULT_AUTHOR;

//             if (!!latestPage) {
//                 wpapi.pages()
//                     .author(authorId)
//                     .id(latestPage.id)
//                     .update(pageContents)
//                 // .then(function (response) {
//                 //     console.log('response: ', response)
//                 //     console.log(response.id);
//                 //     this.id = id;
//                 // })
//                 // .catch(error => {
//                 //     if (!!error)
//                 //         console.error("Error occured when updating a page in WordPress: ", error);
//                 // });
//             }
//             else {
//                 wpapi.pages()
//                     .author(authorId)
//                     .create(pageContents)
//                 // .then(function (response) {
//                 //     console.log('response: ', response)
//                 //     console.log('WordPress paper id: ', response.id);
//                 //     this.id = id;
//                 // })
//                 // .catch(error => {
//                 //     if (!!error)
//                 //         console.error("Error occured when posting a new page to WordPress: ", error);
//                 // });
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

//     onResult = result => {
//         console.log('result', result)
//         console.log('this.lastPost', this.lastPost);
//         return this.lastPost;
//         // return result;
//     };
// }

// import { AsyncObject } from '@cuties/cutie'
// import { generateHtmlFromEditorState } from '@RichEditor/functions'
// import ExtendableError from '@Errors'
// import WPAPI from 'wpapi'
// // import { generateHtmlFromEditorState } from '../functions'

// Object.prototype.isEmpty = function () {
//     for (var key in this) {
//         if (this.hasOwnProperty(key))
//             return false;
//     }
//     return true;
// }

// const WordPressNotInitializedException = new Error("Wordpress has not been initialized!");

// // TODO: Temporarary - Refactor this to be DB configurable:
// const wp = new WPAPI({
//     endpoint: 'https://www.thepathoftruth.com/wp-json',
//     username: 'michael.n.preston@gmail.com',
//     password: null //TODO: init w/ process.env or firebase
// });

// /**
//    * Publishes html content to wordpress
//    *   If post already exists, update with latest contents.
//    *   Else, create it, then update it.
//    */

// export class PublishedDocument extends AsyncObject {

//     disabledMsg = "Sorry, publish feature is disabled for now.";

//     constructor(authorId = -1, pageContents = {}, latestPage = null) {
//         super(authorId, pageContents)

//         if (!wp)
//             throw WordPressNotInitializedException;

//         if (!pageContents || !Object.keys(pageContents).length > 0)
//             throw new Error("Received no contents to publish!");
//     }

//     asyncCall() {
//         return (authorId, pageContents) => {

//             let html = generateHtmlFromEditorState(editorState);

//             if (!html)
//                 return;

//             if (pageContents.isEmpty())
//                 pageContents = getSamplePageContent(html);

//             console.log(pageContents.isEmpty());
//             console.log('last post? ', !!latestPage)
//             // console.log(pageContents)
//             // return;      

//             if (!!latestPage) {
//                 wp.pages()
//                     .author(authorId)
//                     .id(latestPage.id)
//                     .update(pageContents)
//                     .then(function (response) {
//                         console.log('response: ', response)
//                         console.log(response.id);
//                     })
//                     .catch(error => {
//                         if (!!error)
//                             console.error("Error occured when updating a page in WordPress: ", error);
//                     });
//             }
//             else {
//                 wp.pages()
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
//         return this.id;
//     }
// }

// export class LastWordpressPost extends AsyncObject {
//     constructor(authorId, wp) {
//         super(authorId, wp);

//         if (!wp)
//             throw WordPressNotInitializedException;
//     }

//     asyncCall() {
//         return (authorId = 10) =>
//             wp.pages()
//                 .author(authorId)
//                 .id(26510);
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

