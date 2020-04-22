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

