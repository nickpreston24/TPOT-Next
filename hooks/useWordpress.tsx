import React, { useEffect, createContext, useContext, useState } from 'react'
import { wpapi } from '../services/wordpress';
import { Paper, toDto, createInstance } from '../models'
import { isDev } from 'helpers';

// class WordPressNotInitializedException extends ExtendableError { message = 'Wordpress has not been initialized!' }
// class PaperNotFoundException extends ExtendableError { message = 'Could not find the Paper you\'re looking for...' }

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

    const getAllUsers = () => wpapi.users();

    // const findUser = (email) => getAllUsers.filter(user => user.email === email);

    const getUser = async (id: number) =>
        wpapi
            .users()
            .id(id)

    const getPageBySlug = (slug: string) => wpapi.pages().slug(slug);

    const getPageById = (id: number) => wpapi.pages().id(id);

    const getPages = (authorId: number, perPage: number = 10) =>
        wpapi
            .pages()
            .author(authorId)
            .perPage(perPage)

    // const removePaper = (id:number)

    /**
     * Publishes a Paper as a draft only
     */
    const publish = async (paper: Paper): Promise<Paper> => {

        const { author, id } = paper;

        //Testing permalink alteration here:
        // paper.permalink = 'https://www.thepathoftruth.com/chinese/'

        // Check for collisions:
        const existingPaper = id ? await wpapi.pages()
            .author(author)
            .id(id) : null;

        isDev() && console.log('currentPaper', existingPaper)

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

                    // console.log('updatedPaper :>> ', updatedPaper);
                    setCurrentPaper(updatedPaper);

                })
        }
        // Publish paper as a new Draft:
        else {
            console.log('creating paper :>> ', paper);
            // let permalink_template = 'https://www.thepathoftruth.com//%postname%.htm';
            // console.log('fixedPermalink :>> ', fixedPermalink);
            // paper.slug = '&middot;htm'            
            // console.log('paper.slug :>> ', paper.slug);

            let wordpressCredentials = {
                username: 'michael.n.preston@gmail.com',
                password: 'Mercury2020!!'
                // username: 'bpfilmsinc@gmail.com',
                // password: 'Mercury18'
            }

            let pageConfig = {
                content: `<p>Test Paper</p>`,
                slug: 'test-paper-10-17',
                title: "Test WP Publish",
                excerpt: "This is a test of WP API's draft"
            }

            let options = {
                ...pageConfig,
                // slug: 'letters\/test\.htm',
                status: 'pending',
                author: 3, // Victor Hafichuk
                categories: [496], // letters
                date: new Date(), // publish time
            }

            wpapi._options = {
                ...wpapi._options,
                username: wordpressCredentials.username,
                password: wordpressCredentials.password,
            }

            wpapi.pages()
                .author(11)
                .create(options)
                .then((response) => {
                    console.log(`Page is now live at: ${response.link}`)
                    console.error('Sucessfully Published Letter to TPOT!')
                })
                .catch((error) => {
                    if (error.code === 'incorrect_password') {
                        console.log('Invalid Password. Log out and back into TPOT.')
                    } else {
                        console.error(`Unknown Publish Error: ${error.code}`, error)
                    }
                })

            // let response = await wpapi.pages()
            //     .author(author)
            // .create({ permalink_template, ...paper })

            // isDev() && console.log('response :>> ', response);

            // let fixedPermalinkTemplate = "https://www.thepathoftruth.com/%pagename%.htm"

            // let updatedPaper = await wpapi.pages()
            //     .author(author)
            //     .id(response.id)
            //     .update({ slug: 'hot-potato&middot;htm' })
            //     // .update({ permalink_template: fixedPermalinkTemplate })
            //     // .update({ generated_slug: fixedPermalink, slug: fixedPermalink })
            // console.log('updatedPaper :>> ', updatedPaper);

            // wpapi.pages()
            //     .author(author)
            //     .create(paper)
            //     .then((response) => {
            //         // console.log('response :>> ', response);
            //         //     console.log('createdPaper :>> ', createdPaper
            //         // , 'paper as dto :>>', toDto(createdPaper, Paper));
            //         let createdPaper = toDto(response, Paper);
            //         paper.id = response.id; // Update the new id for UI use.
            //         console.log('createdPaper :>> ', createdPaper);
            //         setCurrentPaper(createdPaper)
            //     })
            //     .catch(console.error)
        }

        return currentPaper;
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


    useEffect(() => {
        getAllUsers()
            .then((users) => setWpUsers(users))
    }, []);

    return {
        wpUsers,

        getUser,
        getPages,
        getPageById,
        getPageBySlug,

        publish,
    }
}