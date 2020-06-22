// import { Collection, Mode } from 'firestorter'
import { observable, action, autorun, computed } from 'mobx'
// import '@services/firebase'
import { createContext } from 'react'

import '@services/firebase'
import { Collection } from 'firestorter'

class SessionStore {

    @observable sessions = new Collection('sessions')
    @observable loading = false
    @observable prevDocument = null
    @observable page = 0
    @observable pageSize = 7
    @observable filter?= ''
    @observable direction = ''
    @observable query = null
    @observable totalCount = 0

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

    @computed get count() {
        return this.sessions.docs.length
    }

    @action orderChange = (colID, direction) => {
        this.filter = colID
        this.direction = direction
    }

    @action setLoading = (isLoading: boolean) => this.loading = isLoading

    @action changePage = page =>
        this.page = page

    @action changeRowsPerPage = pageSize =>
        this.pageSize = pageSize

    @action setTotalCount = count =>
        this.totalCount = count

    @action updateQuery = query =>
        this.sessions.query = query


    queryBuilder = autorun(async () => {

        let { page, pageSize, filter, direction, prevDocument } = this
        this.setLoading(true)

        filter = !!filter ? 'title' : 'status'
        direction = !!filter ? 'asc' : direction

        // await this.countTotalDocs()
        await this.updateQuery(
            collectionRef => {
                return collectionRef
                    .orderBy(filter, direction)
                    .limit(pageSize)
                    .startAfter(prevDocument)

            }
        )

        this.setLoading(false)
    })
}

// export const sessionStore = new SessionStore();

// const Sessions = createContext(new SessionStore());
// export default Sessions;


// export default createContext(new SessionStore());
export default SessionStore;
