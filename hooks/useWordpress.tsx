import React, { useEffect, createContext, useContext, useState } from 'react'
import { wpapi } from '../services/wordpress';
import { Paper, toDto, createInstance } from '../models'

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
    console.log('default Paper :>> ', currentPaper);

    const getAllUsers = () => wpapi.users();

    const getUser = (id: number) =>
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

    const publish = async (paper: Paper): Promise<Paper> => {
        const { authorId, id } = paper;

        const existingPaper = id ? await wpapi.pages()
            .author(authorId)
            .id(id) : null;

        console.log('currentPaper', existingPaper)

        if (!!existingPaper) {
            const updatedPaper = await wpapi.pages()
                .author(authorId)
                .id(existingPaper.id)
                .update(paper)
            console.log('updatedPaper :>> ', updatedPaper
                , 'paper as dto :>>', toDto(updatedPaper, Paper));
            setCurrentPaper(updatedPaper);
            return updatedPaper;
        }
        else {
            let createdPaper = wpapi.pages()
                .author(authorId)
                .create(paper)
            console.log('createdPaper :>> ', createdPaper
                , 'paper as dto :>>', toDto(createdPaper, Paper));
            paper.id = createdPaper.id; // Update the new id for UI use.
            setCurrentPaper(createdPaper)
            return paper;
        }
    }

    // useEffect(() => {
    // }, []);

    return {
        getAllUsers,
        getUser,

        getPages,
        getPageById,
        getPageBySlug,

        publish,
    }
}

// export function getSamplePageContent(html) {
//     // console.log('publishing html:\n', html);
//     let slug = 'sample-slug' //TODO: use your slug making function
//     let title = 'sample-title-2' // TODO: get from UI
//     let excerpt = 'lorem ipsum' // TODO: get from UI
//     const pageContents = {
//         content: html,
//         slug,
//         title,
//         excerpt
//     }
//     return pageContents
// }

// .then(function (response) {
            //     console.log('response (on create): ', response)
            //     console.log('WordPress paper id: ', response.id)
        // })
        // .catch(error => {
        //     if (!!error)
        //         console.error('Error occured when posting a new page to WordPress: ', error)
        // })
// .then(function (response) {
        //     console.log('response (on update): ', response)
        //     console.log('WordPress paper id: ', response.id)
        // })
        // .catch(error => {
        //     if (!!error)
        //         console.error('Error occured when updating a page in WordPress: ', error)
        // })