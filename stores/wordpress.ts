import { observable, action, computed, reaction } from 'mobx'
import { createContext } from 'react'
import { Paper, WordPressPaper } from '../models/paper'
// import { wordpressCredentials } from '../../../kiyap/client/src/experimental/firebase/tpot/db'
import WPAPI from 'wpapi'
import Firebase from '../services/firebase'

export interface WordPressOptions {
    endpoint: string,
    username: string,
    password: string
}

export interface WordpressSession {
    firebaseUserId: string,
    paper: WordPressPaper,
    session?: Session;
}

/* A representation of the current Session as it relates to a Wordpress Post */
export interface Session {
    html: string,
    status: string,
    code?: string,
    excerpt?: string,
    //... docx, etc.
}

export class FirebaseUserService {
    db: any

    constructor(db: Firebase) {
        this.db = db
    }

    getFirebaseUser = (id: number) => {
        this.db.collection('users')
            .doc(id)
            .get()
            .then((documentSnapshot) => {
                console.log(documentSnapshot.data())
            })
    }
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
        options: WordPressOptions
        , firebaseUserService: FirebaseUserService
    ) {
        this.firebaseUserService = firebaseUserService
        console.log(options)
        this.wpapi = new WPAPI(options)
        console.log(this.wpapi)
    }

    getWordPressCredentials(db: any) {
        db.collection('public')
            .doc('wp-credentials')
            .get()
            .then((documentSnapshot) => {
                if (!!documentSnapshot) {
                    resolve(documentSnapshot.data())
                } else {
                    resolve(null)
                }
            })
            .catch(err => {
                reject(err)
            })
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