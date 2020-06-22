import { observable, action, computed, reaction } from 'mobx'
import { createContext } from 'react'
import { Paper } from '../models/paper'
import WPAPI from 'wpapi'
import { FirebaseUserService } from '../services/wordpress'
import { WordPressConfig } from '@models'

/* A representation of the current Session as it relates to a Wordpress Post */
export interface Session {
    html: string,
    status: string,
    code?: string,
    excerpt?: string,
    //... docx, etc.
}

/**
 * 
 * Handles publishing of posts asynchronously
 * - Publish raw (converted) html
 * - Detect old post by id and update, if that post is provided
 * - Get a firebase user.
 * - Get the 
 */
export class PublishService {

    private currentAuthorId = 5;
    private finalizedAuthorId = 10; // Victor
    private wpapi: WPAPI;
    firebaseUserService: FirebaseUserService

    constructor(
        options: WordPressConfig
        , firebaseUserService: FirebaseUserService
    ) {
        this.firebaseUserService = firebaseUserService
        console.log(options)
        this.wpapi = new WPAPI(options)
        console.log(this.wpapi)
    }

    async getWordPressCredentials(db: any) {
        let snapshot = await db.collection('public')
            .doc('wp-credentials')
            .get()

        // .then((documentSnapshot) => {
        //     if (!!documentSnapshot) {
        //         resolve(documentSnapshot.data())
        //     } else {
        //         resolve(null)
        //     }
        // })
        // .catch(err => {
        //     reject(err)
        // })
        return snapshot.data()
    }
}

export class FakePaperStore {

    constructor() {
        reaction(() => this.papers, _ => console.log(this.papers.length))
    }

    @observable papers: Paper[] = []

    @action addPaper = (paper: Paper) => {
        this.papers.push()
    }

    @action disablePaper = (id: number) => {
        throw new Error('Not implemented')
    }

    @action removePaper = (id: number) => {
        throw new Error('Not implemented')
    }

    @computed get info() {
        return {
            total: this.papers.length,
            completed: this.papers.filter(paper => paper.status === 'published').length,
            incomplete: this.papers.filter(paper => paper.status !== 'published').length,
        }
    }
}