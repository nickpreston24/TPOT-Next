import '@services/firebase'
import { Collection, Document } from 'firestorter'
import { Session } from 'models'

export type SessionDocument = Document<Session>;

export type Sessions = Collection<SessionDocument>;

const sessions = new Collection<SessionDocument>("sessions");

// const currentUserSessions = sessions.query = ref => ref.where("author", "==", authorId);
// console.log('mySessions :>> ', currentUserSessions);

export { sessions }

export class SessionStore {

    // @observable 
    sessions = new Collection('sessions')

    /*
        @BP: If you want, you can make these observable, though I don't
        recommend going outside for firestorter documentation unless you have a good reason to do so.
    */

    // @observable loading = false
    // @observable prevDocument = null
    // @observable page = 0
    // @observable pageSize = 7
    // @observable filter?= ''
    // @observable direction = ''
    // @observable query = null
    // @observable totalCount = 0

    //     @action countTotalDocs = async () => {
    //         // let options = new ICollectionOptions {{Mode.Off}}
    //         console.log('This is the Collection you are looking for ... ')
    // console.log('this.sessions.docs.length :>> ', this.sessions.docs.length);
    //         return this.sessions.docs.length

    //         // let collection = await new Collection('sessions', {
    //         //     // Mode = Mode.Off                
    //         // }).fetch()
    //         // this.totalCount = collection.docs.length
    //     }

    // @computed get count() {
    //     return this.sessions.docs.length
    // }

    // @action orderChange = (colID, direction) => {
    //     this.filter = colID
    //     this.direction = direction
    // }

    // @action setLoading = (isLoading: boolean) => this.loading = isLoading

    // @action changePage = page =>
    //     this.page = page

    // @action changeRowsPerPage = pageSize =>
    //     this.pageSize = pageSize

    // @action setTotalCount = count =>
    //     this.totalCount = count

    // @action updateQuery = query =>
    //     this.sessions.query = query


    // queryBuilder = autorun(async () => {

    //     let { page, pageSize, filter, direction, prevDocument } = this
    //     this.setLoading(true)

    //     filter = !!filter ? 'title' : 'status'
    //     direction = !!filter ? 'asc' : direction

    //     // await this.countTotalDocs()
    //     await this.updateQuery(
    //         collectionRef => {
    //             return collectionRef
    //                 .orderBy(filter, direction)
    //                 .limit(pageSize)
    //                 .startAfter(prevDocument)

    //         }
    //     )

    //     this.setLoading(false)
    // })
}

// export const sessionStore = new SessionStore();

// const Sessions = createContext(new SessionStore());
// export default Sessions;


// export const sessionStoreContext =  createContext(new SessionStore());
export default SessionStore;
