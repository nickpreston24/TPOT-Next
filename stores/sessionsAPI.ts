import '@services/firebase'
import { Collection, Document } from 'firestorter'
import { Session } from 'models'
import { toJS } from 'mobx';
import { CheckoutStatus } from 'constants/CheckoutStatus';
import { IDocumentOptions } from 'firestorter/lib/Types';
import { isDev } from 'helpers';

const DEFAULT_AUTHOR = 9;
const queryLimit = 10;

export type SessionDocument = Document<Session>;

export type Sessions = Collection<SessionDocument>;

export const sessions = new Collection<SessionDocument>("sessions");

export const unlockSession = async (id: string) => {
    let options = { mode: 'off' } as IDocumentOptions
    let document = new Document(`sessions/${id}`, options);
    await document.fetch()

    if (document.hasData) {
        await document.update({
            status: CheckoutStatus.InProgress
        })
    }
}

export const saveSession = async (session: any | Session): Promise<string> => {
    // let options = { mode: 'off' } as IDocumentOptions
    if (!session.slug)
        return null;

    let document = new Document(`sessions/${session.slug}`);
    await document.fetch()
    isDev() && console.log('document', document)

    // Collision detection
    if (!!document.hasData)
        return null; // Session.None; TODO: create Null Object for session and give it the resulting error for read.

    let currentSession = toJS(document.data);

    Object.assign(currentSession, session)
    await document.set(currentSession)
    isDev() && console.log('saved session :>> ', currentSession);
    return document.ref.id as string
}

export const checkoutSession = async (id: string) => {
    let options = { mode: 'off' } as IDocumentOptions
    let document = new Document(`sessions/${id}`, options);
    await document.fetch()

    if (!document.hasData)
        return null; // Session.None; TODO: create Null Object for session and give it the resulting error for read.

        let session = toJS(document.data as Session);
    // isDev() && console.log('checked out session :>> ', session);

    await document.update(session as object)

    return session;
}

export const updateSession = async (id: string, session: any | Session): Promise<Session | object> => {

    let options = { mode: 'off' } as IDocumentOptions
    let document = new Document(`sessions/${id}`, options);
    await document.fetch()

    if (!document.hasData)
        return null; // Session.None; TODO: create Null Object for session and give it the resulting error for read.

    let currentSession = toJS(document.data);
    // console.log('oldSession :>> ', currentSession);

    session.date_modified = new Date()
    Object.assign(currentSession, session)
    isDev() && console.log('currentSession', currentSession) //TODO: Don't delete this, Apparently updateSession is being called on each render of the Checkout table for EACH existing session.  Why? I don't know. -MP
    await document.update(currentSession)
        .catch(console.error);

    return session;
}

export const removeSession = async (id: string) => {
    let document = new Document(`sessions/${id}`)
    await document.delete()
}

// Filter by Wordpress paper author:
// export let authorId = observable.box(DEFAULT_AUTHOR);
// export const setAuthor = (id: number) => authorId.set(id);

export const getAuthorSessions = async (author: number) => {
    sessions.query = (ref) => {

        // const author = authorId.get();
        // console.log('current author :>> ', author);

        return author ?
            ref.where('author', '==', author).limit(queryLimit)
            : undefined;
    }

    // console.log('sessions.query :>> ', sessions.query);
    // console.log('sessions.docs.length :>> ', sessions.docs.length);
}


// export class SessionStore {

//     // @observable 
//     sessions = new Collection('sessions')

//     /*
//         @BP: If you want, you can make these observable, though I don't
//         recommend going outside for firestorter documentation unless you have a good reason to do so.
//     */

//     // @observable loading = false
//     // @observable prevDocument = null
//     // @observable page = 0
//     // @observable pageSize = 7
//     // @observable filter?= ''
//     // @observable direction = ''
//     // @observable query = null
//     // @observable totalCount = 0

//     //     @action countTotalDocs = async () => {
//     //         // let options = new ICollectionOptions {{Mode.Off}}
//     //         console.log('This is the Collection you are looking for ... ')
//     // console.log('this.sessions.docs.length :>> ', this.sessions.docs.length);
//     //         return this.sessions.docs.length

//     //         // let collection = await new Collection('sessions', {
//     //         //     // Mode = Mode.Off                
//     //         // }).fetch()
//     //         // this.totalCount = collection.docs.length
//     //     }

//     // @computed get count() {
//     //     return this.sessions.docs.length
//     // }

//     // @action orderChange = (colID, direction) => {
//     //     this.filter = colID
//     //     this.direction = direction
//     // }

//     // @action setLoading = (isLoading: boolean) => this.loading = isLoading

//     // @action changePage = page =>
//     //     this.page = page

//     // @action changeRowsPerPage = pageSize =>
//     //     this.pageSize = pageSize

//     // @action setTotalCount = count =>
//     //     this.totalCount = count

//     // @action updateQuery = query =>
//     //     this.sessions.query = query


//     // queryBuilder = autorun(async () => {

//     //     let { page, pageSize, filter, direction, prevDocument } = this
//     //     this.setLoading(true)

//     //     filter = !!filter ? 'title' : 'status'
//     //     direction = !!filter ? 'asc' : direction

//     //     // await this.countTotalDocs()
//     //     await this.updateQuery(
//     //         collectionRef => {
//     //             return collectionRef
//     //                 .orderBy(filter, direction)
//     //                 .limit(pageSize)
//     //                 .startAfter(prevDocument)

//     //         }
//     //     )

//     //     this.setLoading(false)
//     // })
// }

// export const sessionStore = new SessionStore();

// const Sessions = createContext(new SessionStore());
// export default Sessions;


// export const sessionStoreContext =  createContext(new SessionStore());
// export default SessionStore;
