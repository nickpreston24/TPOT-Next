import React, { useEffect, createContext, useContext, useState } from 'react'
import { wpapi } from '../services/wordpress';
import { Paper, toDto, createInstance } from '../models'
import { Document } from 'firestorter'
import { toJS } from 'mobx';
import axios from 'axios'

const wordpressContext = createContext(null);

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

    /** Get WP Credentials from Firebase */
    useEffect(() => {
        const doc = new Document<any>(`users/super-user`)
        doc.fetch()
            .then((response) => {
                let user = toJS(response.data);
                setSuperUser(user);
            })
    }, []);

    /** JWT Tokens */
    useEffect(() => {

        let savedToken = localStorage.getItem("token");
        if (!savedToken) {
            axios({
                method: "POST",
                headers: { "Content-Type": "application/json" },
                url: `https://www.thepathoftruth.com/wp-json/jwt-auth/v1/token`,
                // Sign-in exists only to fetch a token, then the token is used for Posting new content...
                params: {
                    username: "Michael",
                    password: "Mercury2020!!"
                }
            })
                .then((response) => {
                    console.log(response);
                    let { token } = response.data;
                    setToken(token);
                    localStorage.setItem("token", token);
                })
                .catch(console.error);
        }
        // Otherwise, set the stored token to state.
        else {
            console.log("Successfully retrieved JWT from localstorage " + savedToken);
            setToken(savedToken);
        }

    }, [])

    /** Preload data */
    useEffect(() => {
        wpapi.users()
            .then((users) => setWpUsers(users))

        wpapi.categories()
            .then((data) => {
                setCategories(data)
            })
    }, []);

    const getPageBySlug = (slug: string) => wpapi.pages().slug(slug);

    const getPageById = (id: number) => wpapi.pages().id(id);

    const getPages = (authorId: number, perPage: number = 10) =>
        wpapi
            .pages()
            .author(authorId)
            .perPage(perPage)

    const search = (term: string) => wpapi.search(term);

    /**
     * Publishes a Paper as a draft only
     */
    const publish = async (paper: Paper): Promise<Paper> => {

        const { author, id } = paper;

        // Check for collisions:
        const existingPaper = id ? await wpapi.pages()
            .author(author)
            .id(id) : null;

        // If existing paper, update it:
        if (!!existingPaper) {

            if (!!paper.language && paper.language.toLowerCase() !== 'english') {
                paper.slug = paper.language + "\/" + paper.slug + "_" + paper.language
            }

            wpapi.pages()
                .author(author)
                .id(existingPaper.id)
                .update(paper)
                .then((response) => {

                    let updatedPaper = toDto(response, Paper);
                    paper.id = response.id; // Update the new id for UI use.

                    setCurrentPaper(updatedPaper);
                })
        }
        // Publish paper as a new Draft:
        else {

            wpapi._options = {
                ...wpapi._options,
                ...superUser['wordpress-credentials']
            }

            const samplePaper = {
                content: '<p>123xyz</p>',
                title: 'wpap test',
                slug: 'wpap-test',
                status: 'pending',
                author: 9,
                categories: [496],
                date: new Date(),
            }

            wpapi.pages()
                .create(samplePaper)
                .then((response) => {
                    let createdPaper = toDto(response, Paper);
                    paper.id = response.id; // Update the new id for UI use.
                    setCurrentPaper(createdPaper)
                })
                .catch(console.error)
        }

        return currentPaper;
    }

    return {
        wpUsers,

        getPages,
        getPageById,
        getPageBySlug,

        publish,
        token,
        categories,
        search,
    }
}



// NOTE: We won't need wordpress users until much later in the special case where a published paper needs reviewed.

// console.log('wpUsers :>> ', wpUsers, authUser);

// let authorId = session.authorId;

// if (!!authorId) {
//     getUser(authorId)
//         .then((wpUser) => {
//             wpUser['yoast_head'] = '' // Try: https://blog.bitsrc.io/6-tricks-with-resting-and-spreading-javascript-objects-68d585bdc83
//             // console.log('current user :>> ', records);
//             setUser(toDto(wpUser, WordpressUser))
//         })

//      getPages(authorId)
//          .then((records) => {
//          // console.log('records :>> ', records);
//          let collection = mapToDto(records, Paper);
//          setPapers(collection);
//          setLoading(false)
//      })

//      getAuthorSessions(authorId)
//         .then((sessions) => {
//             console.log('session records', sessions)
//         })
// }

// console.log('authorId', authorId)



//Testing permalink alteration here:
// paper.permalink = 'https://www.thepathoftruth.com/chinese/'
// console.log('creating paper :>> ', paper);

// let permalink_template = 'https://www.thepathoftruth.com//%postname%.htm';
// // let fixedPermalinkTemplate = "https://www.thepathoftruth.com/%pagename%.htm"

// let response = await wpapi.pages()
//     .author(author)
//     .create({ permalink_template, ...paper })

// isDev() && console.log('response :>> ', response);


// let updatedPaper = await wpapi.pages()
//     .author(author)
//     .id(response.id)
//     .update({ slug: 'hot-potato&middot;htm' })
//     // .update({ permalink_template: fixedPermalinkTemplate })
//     // .update({ generated_slug: fixedPermalink, slug: fixedPermalink })