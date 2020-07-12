import '@services/firebase'
import { Collection, Document } from 'firestorter'
import { Session, toDto } from 'models'
import { observable, toJS } from 'mobx';
import { CheckoutStatus } from 'constants/CheckoutStatus';
import { IDocumentOptions } from 'firestorter/lib/Types';

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
            status: "in-progress"
        })
    }
}

export const checkoutSession = async (id: string) => {
    let options = { mode: 'off' } as IDocumentOptions
    // console.log('options :>> ', options);

    let document = new Document(`sessions/${id}`, options);
    const sessionData = await document.fetch()

    if (!document.hasData)
        return null; // Session.None; TODO: create Null Object for session and give it the resulting error for read.

    let session = toJS(document.data as Session);
    // console.log('session :>> ', session);

    if (session.status !== 'checked-out')
        session.status = 'checked-out'

    await document.update(session)

    return session;
}

export const CreateSession = (props: object | Session): Session | object => {
    let document = new Document<Session>();
    return document
};

const updateSession = (update: object | Session): Session | object => {

    return {};
}

// Filter by wp author:
// export let authorId = observable.box(DEFAULT_AUTHOR);
// export const setAuthor = (id: number) => authorId.set(id);

export const getAuthorSessions = async (author: number) => {
    sessions.query = (ref) => {

        // const author = authorId.get();
        console.log('current author :>> ', author);

        return author ?
            ref.where('author', '==', author).limit(queryLimit)
            : undefined;
    }

    // console.log('sessions.query :>> ', sessions.query);
    // console.log('sessions.docs.length :>> ', sessions.docs.length);
}

//Only grabs the query:
// const currentUserSessions = sessions.query = ref => ref.where("author", "==", authorId);
// console.log('mysessions :>> ', currentUserSessions);

// const sessionDoc = new SessionDocument('sessions');

// Trying to grab a filtered collection for the current wp user (all his sessions).

// const col = new Collection('sessions', {
//   query: (ref) => ref.where('author', '==', authorId).limit(queryLimit)
// })

// console.log('col :>> ', col);

// autorun(() => {
//   console.log('col.docs :>> ', col.docs);
// })


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
