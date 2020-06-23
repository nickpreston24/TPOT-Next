import WPAPI from 'wpapi'
import { wpapi } from './api';

export class WordpressUserService {
    wordpress: WPAPI

    constructor(wpapi: WPAPI) {
        this.wordpress = wpapi
    }

    getUser = (id: number) => this.wordpress.users().id(id)

    getPostsFromUser = (id: number) =>
        this.wordpress
            .posts()
            .author(id)

    getPagesFromUser = (id: number, limit: number = 10) =>
        this.wordpress
            .pages()
            .author(id)
            .perPage()
}

export const wordpressUserService = new WordpressUserService(wpapi)
export { wpapi }