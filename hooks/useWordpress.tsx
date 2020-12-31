import React, { useEffect, createContext, useContext, useState } from 'react'
import { wpapi } from '../services/wordpress';
import { Paper, toDto, createInstance } from '../models'
import { Document } from 'firestorter'
import { toJS } from 'mobx';
import axios from 'axios'
import { notify } from 'components/Toasts';
import jwt from 'jsonwebtoken'

let endpoint = `https://www.thepathoftruth.com/wp-json/wp/v2/pages`;

const wordpressContext = createContext(null);

const isTokenExpired = (token) => jwt.decode(token, { complete: true }).exp < new Date().getTime()

export const useWordpress = () => useContext(wordpressContext)

export function ProvideWordpress({ children }) {
    const wordpress = useWordpressProvider();
    return !wordpress
        ? <>WordPress API could not be loaded!</>
        : <wordpressContext.Provider value={wordpress}>{children}</wordpressContext.Provider>
}

function useWordpressProvider() {

    const [currentPaper, setCurrentPaper] = useState(createInstance(Paper));
    const [wpUsers, setWpUsers] = useState([]);
    const [superUser, setSuperUser] = useState(null)
    const [token, setToken] = useState(null);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        /** Get WP Credentials from Firebase */
        const doc = new Document<any>(`users/super-user`)
        let user = null;

        const fetchSuperUser = async () => {
            await doc.fetch()
                .then((response) => {
                    let data = toJS(response.data);

                    user = data['wordpress-credentials'];

                    setSuperUser(data);

                    /** JWT Tokens */
                    let config = {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        url: `https://www.thepathoftruth.com/wp-json/jwt-auth/v1/token`,
                        // Sign-in exists only to fetch a token, then the token is used for Posting new content...
                        params: {
                            username: user?.email,
                            password: user?.password,
                            token: data?.token,
                        }
                    }

                    let savedToken = user?.token || localStorage.getItem("token");
                    let expired = isTokenExpired(savedToken);

                    if (expired) {
                        let message = 'Your Wordpress JWT has expired!  Requesting new one...'
                        console.warn(message)
                    }

                    // If token is bad or non-existent, get a new one from WP
                    if (!savedToken || expired) {
                        axios(config as any)
                            .then((response) => {
                                let { token } = response.data;
                                setToken(token);
                                doc.update({
                                    token: token
                                })
                                    .catch((err) => console.error('Error occured when trying to update JWT in super-user:' + err))
                                localStorage.setItem("token", token);
                            })
                            .catch((err) => console.error('Error when fetching new JWT token from Wordpress:' + err));
                    }
                    // Otherwise, set the stored token to state.
                    else {
                        setToken(savedToken);
                    }
                })
        }

        fetchSuperUser();
    }, []);

    /** Preload data */
    useEffect(() => {

        setLoading(true)

        wpapi.users()
            .then((users) => setWpUsers(users))

        wpapi.categories()
            .then((data) => {
                setCategories(data)
            })

        setLoading(false);
    }, []);

    const getPageBySlug = (slug: string) => wpapi.pages().slug(slug);

    const getPageById = (id: number) => wpapi.pages().id(id);

    const getPagesForAuthor = (authorId: number, take: number = 10) =>
        wpapi
            .pages()
            .author(authorId)
            .perPage(take)


    const getDrafts = () => wpapi.pages()
        .auth()
        // .param('context', 'edit')
        .param('status', 'publish')

    const search = (term: string) => wpapi.search(term);

    /**
     * Publishes a Paper as a draft only
     */
    const publish = async (paper: Paper, useWpapi: boolean = false): Promise<Paper> => {
        const { author, id, slug } = paper;
        let permalink = `https://www.thepathoftruth.com/${slug}.htm`
        const config = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // "Content-Type": "text/html",
                Authorization: `Bearer ${token}`
            },
            // meta: {
            //     permalink, link: permalink
            // }
        };


        // Check for collisions:
        const existingPaper = id ? await wpapi.pages()
            .author(author)
            .id(id) : false;

        // If existing paper, update it:
        if (!!existingPaper) {
            if (!!paper.language && paper.language.toLowerCase() !== 'english') {
                paper.slug = paper.language + "\/" + paper.slug + "_" + paper.language
            }
        }
        // Publish paper as a new Draft:
        else if (!existingPaper) {

            /** Post a paper using Axios */
            axios
                .post(endpoint, {
                    ...paper, meta: {
                        permalink, link: permalink
                    }
                }, config as any)
                .then((response) => {

                    notify(`Post successful!`, 'success')
                    // setResponse(JSON.stringify(response));
                })
                .catch((err) => console.error(err));
            // }
        }

        return currentPaper;
    }

    return {
        wpapi,
        wpUsers,

        getPagesForAuthor,
        getPageById,
        getPageBySlug,
        getDrafts,

        publish,
        token,
        categories,
        search,
    }
}



// NOTE: We won't need wordpress users until much later in the special case where a published paper needs reviewed.

// let authorId = session.authorId;

// if (!!authorId) {
//     getUser(authorId)
//         .then((wpUser) => {
//             wpUser['yoast_head'] = '' // Try: https://blog.bitsrc.io/6-tricks-with-resting-and-spreading-javascript-objects-68d585bdc83

//             setUser(toDto(wpUser, WordpressUser))
//         })

//      getPages(authorId)
//          .then((records) => {

//          let collection = mapToDto(records, Paper);
//          setPapers(collection);
//          setLoading(false)
//      })

//      getAuthorSessions(authorId)
//         .then((sessions) => {

//         })
// }


//Testing permalink alteration here:
// paper.permalink = 'https://www.thepathoftruth.com/chinese/'


// let permalink_template = 'https://www.thepathoftruth.com//%postname%.htm';
// // let fixedPermalinkTemplate = "https://www.thepathoftruth.com/%pagename%.htm"

// let response = await wpapi.pages()
//     .author(author)
//     .create({ permalink_template, ...paper })

// let updatedPaper = await wpapi.pages()
//     .author(author)
//     .id(response.id)
//     .update({ slug: 'hot-potato&middot;htm' })
//     // .update({ permalink_template: fixedPermalinkTemplate })
//     // .update({ generated_slug: fixedPermalink, slug: fixedPermalink })