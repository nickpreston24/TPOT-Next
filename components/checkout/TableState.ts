import { Collection, Mode } from 'firestorter'
import { observable, action, autorun } from 'mobx'

export default class TableState {

    @observable sessions = new Collection('sessions')
    @observable loading = false
    @observable prevDocument = null
    @observable page = 0
    @observable pageSize = 7
    @observable filter?= ''
    @observable direction = ''
    @observable query = null
    @observable totalCount = 0

    @action countTotalDocs = async () => {
        // let options = new ICollectionOptions {{Mode.Off}}
        let collection = await new Collection('sessions', {
            // Mode = Mode.Off                
        }).fetch()
        this.totalCount = collection.docs.length
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

        await this.countTotalDocs()
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

export const tableState = new TableState();