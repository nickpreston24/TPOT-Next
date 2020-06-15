import React, { Component } from 'react'
import { compose } from 'recompose'
import { uploadLocalFile } from '../Editor/functions/uploader'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import DescriptionIcon from '@material-ui/icons/Description'
import EditIcon from '@material-ui/icons/Edit'
import LockOpenIcon from '@material-ui/icons/LockOpen'
import { withStyles } from '@material-ui/styles'
import { Collection } from 'firestorter'
import MaterialTable from 'material-table'
import { action, autorun, toJS } from 'mobx'
import { observer } from 'mobx-react'
import moment from 'moment'
import { Box, Button, Collapse, Link as MLink, Paper } from '@material-ui/core'
import StatusChip from '../StatusChip'
import columns from './columns'
import { tableState } from './TableState'


// <CheckoutTable /> is a class component that has a live connection to the firebase
// 'sessions' Collection. It is an inexpensive reactive component that displays the
// documents available through a paginated table. It is reactive so that when somebody
// else is editing a document, you will see the table update with the status change.
// It is the springboard for checking out a document, unlocking, or uploading a new
// document to firestore for editing. It is also offers a way to download documents.

export const CheckoutTable = compose(observer)(
    class CheckoutTable extends Component {

        componentDidMount() {

            this.sessions = tableState.sessions;
            console.log('this.sessions :>> ', this.sessions);
        }

        tableRef = React.createRef()

        // @observable sessions = new Collection('sessions')

        // @observable loading = false
        // @observable prevDocument = null
        // @observable page = 0
        // @observable pageSize = 7
        // @observable filter = -1
        // @observable direction = ''
        // @observable query = null
        // @observable totalCount = 0

        // @action countTotalDocs = async () => {
        //     let collection = await new Collection('sessions', { mode: 'off' }).fetch()
        //     this.totalCount = collection.docs.length
        // }

        // @action orderChange = (colID, direction) => {
        //     this.filter = colID
        //     this.direction = direction
        // }

        // @action setLoading = bool =>
        //     this.loading = bool

        // @action changePage = page =>
        //     this.page = page

        // @action changeRowsPerPage = pageSize =>
        //     this.pageSize = pageSize

        // @action setTotalCount = count =>
        //     this.totalCount = count

        // @action updateQuery = query =>
        //     this.sessions.query = query


        // queryBuilder = autorun(async () => {

        //     let { pageSize, filter, direction, prevDocument } = this
        //     this.setLoading(true)

        //     filter = filter != -1 ? 'title' : 'status'
        //     direction = filter != -1 ? 'asc' : direction

        //     await this.countTotalDocs()
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

        render() {
            // const { store } = this.props
            // console.log('paper.status :>> ', paper.status)



            // const columns = [
            //     { field: 'Icon', searchable: false, export: false, render: () => <DocxIcon /> },
            //     { title: 'Document', field: 'title', type: 'string', searchable: true },
            //     {
            //         title: 'Status', field: 'status', type: 'string', searchable: false, render: paper => {
            //             const status = paper.status
            //             // console.log('status (checkout) :>> ', status)
            //             return <StatusChip status={status} />
            //         }
            //     },
            //     { title: 'Last Edited', field: 'date_modified', type: 'string', searchable: false },
            //     { title: 'Author', field: 'author', type: 'string', searchable: false },
            //     { title: 'Uploaded', field: 'date_uploaded', type: 'string', searchable: false, hidden: true },
            //     { title: 'Cloud Location', field: 'docx', type: 'string', searchable: false, hidden: true },
            //     { title: 'Slug', field: 'slug', searchable: false, hidden: true },
            //     { title: 'Excerpt', field: 'excerpt', searchable: false, hidden: true },
            //     { title: 'ID', field: 'id', searchable: false, hidden: true },
            // ]

            let data = []
            // this.sessions.docs.map(document => {
            //     let entry = toJS(document.data)
            //     let id = document.id
            //     let { status, date_modified, date_uploaded, contributors } = entry
            //     let date_modified_timestamp = date_modified
            //     status = status || 'in-progress'
            //     if (!date_modified || !date_uploaded) { return }
            //     date_modified = moment.duration(moment(date_modified.toDate()).diff(moment())).humanize(true)
            //     date_uploaded = moment.duration(moment(date_uploaded.toDate()).diff(moment())).humanize(true)
            //     data.push({
            //         ...entry,
            //         id,
            //         status,
            //         date_modified,
            //         date_uploaded,
            //         date_modified_timestamp,
            //         author: contributors,
            //     })
            // })

            return (
                <Box fontFamily="'Poppins', sans-serif" width={900}>
                    <MaterialTable
                        title="Checkout"
                        columns={columns}
                        data={data}
                        isLoading={this.loading}
                        tableRef={this.tableRef}
                        onChangePage={this.changePage}
                        onChangeRowsPerPage={this.changeRowsPerPage}
                        onOrderChange={this.orderChange}
                        detailPanel={paper => <TableDetails {...{ paper, store }} />}
                        components={{ Container: props => <StyledTableBody {...props} /> }}
                        options={{
                            // search: search,
                            pageSize: this.pageSize,
                            pageSizeOptions: [5, 7, 10],
                            selection: false,
                            draggable: true,
                            grouping: false,
                            exportButton: true,
                            exportAllData: true,
                            exportFileName: `TPOT Letters ${new Date().toDateString()}`,
                            columnsButton: false,
                            detailPanelType: 'single',
                            detailPanelColumnAlignment: 'right',
                            emptyRowsWhenPaging: false,
                            showSelectAllCheckbox: false,
                            showTextRowsSelected: false,
                        }}
                        localization={{
                            toolbar: {
                                exportTitle: 'Export Table',
                                exportName: 'Save as CSV',
                                searchTooltip: 'Search by Document Name',
                                searchPlaceholder: 'Search'
                            }
                        }}
                        actions={[
                            {
                                icon: 'refresh',
                                tooltip: 'Refresh Table',
                                isFreeAction: true,
                                onClick: () => console.log('refresh')
                            },
                            {
                                tooltip: 'Upload DOCX',
                                // icon: () => <UploadButton {...{ store }} />,
                                isFreeAction: true,
                                onClick: () => null
                            }
                        ]}
                    />
                </Box>
            )
        }
    }
)

const DocxIcon = () =>
    <DescriptionIcon style={{ color: '#0000008a' }} />

// An alternate Paper component to fix overflow clipping in the X direction on rows that have no data
const StyledTableBody = withStyles({
    root: {
        '& div > div > table': {
            overflow: 'hidden'
        }
    },
})(Paper)

const UploadButton = observer(({ store }) => {
    return (
        <Box width={24} height={20} p={0} m={0} mt="4px" display="flex" alignItems="center" justifyContent="center">
            <input
                // multiple // multi-upload not recommended
                accept=".docx"
                type="file"
                id="upload-button-input"
                style={{ display: 'none' }}
                onChange={(e) => {
                    const files = e.target.files
                    let file = files[0]
                    if (!file) return
                    uploadLocalFile(file, store)
                }}
            />
            <label htmlFor="upload-button-input" style={{ margin: 12 }}>
                <CloudUploadIcon />
            </label>
        </Box>
    )
})
