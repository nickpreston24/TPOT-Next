import React, { Component } from 'react'
import { compose } from 'recompose'
import { inject, observer } from 'mobx-react';
import MaterialTable from 'material-table'
import { Box, Chip, Button, Link as MLink, Collapse, Paper } from '@material-ui/core';
import { observable, action, toJS } from 'mobx';
import DescriptionIcon from '@material-ui/icons/Description';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import moment from 'moment';
import EditIcon from '@material-ui/icons/Edit';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import { Collection, Document } from 'firestorter'
import { uploadLocalFile } from './Editor/functions/uploader'
import { withStyles } from '@material-ui/styles';

// <CheckoutTable /> is a class component that has a live connection to the firebase
// 'sessions' Collection. It is an inexpensive reactive component that displays the
// documents available through a paginated table. It is reactive so that when somebody
// else is editing a document, you will see the table update with the status change.
// It is the springboard for checking out a document, unlocking, or uploading a new
// document to firestore for editing. It is also offers a way to download documents.

export const CheckoutTable = compose(
    inject('store'),
    observer
)(
    class CheckoutTable extends Component {

        tableRef = React.createRef()

        @observable sessions = new Collection('sessions')
        @observable loading = false
        @observable config = {
            filter: '',
            direction: '',
            search: true,
            pageLimit: 5,
            totalCount: 11,
            array: [],
            pool: [],
            page: 0,
            last: 0
        }

        // PLEASE READ!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        // TODO : Notes for Nick for future development, please read
        // : Right now the data that the table recieves comes from an unfiltered, unsorted
        // : array of the sessions collection via Firestorter. This means features like
        // : sorting by category, name, search, and pagination won't work. Material-Table
        // : has a function for this, but it requires that the call is a single layer async.
        // : What would be better for us is to have an observable, data, that plugs into the
        // : MaterialTable prop called data. This observable needs to be a computed value that
        // : is a single Firestorter.query result. The query being a combination of filters,
        // : search, pagination, search and orderby. This query should be done in an @autorun
        // : with the result being the data state. When the new data is calculated, the component
        // : will re-render its children because this.data is in the render function.
        // : 
        // : I have started some of this work in the commented out code below, but it isn't MVP.
        // : Please leave it there until you implement it or come up with something better.
        // : 
        // : NOTE!!!! It is FINE to leave this in this state until we get like 100+ letters in /sesssions/

        // paginate = (array, page_size, page_number) => {
        //     return array.slice(page_number * page_size, (page_number + 1) * page_size)
        // }

        // disposer = autorun(async () => {

        //     let totalCount = this.sessions.docs.length
        //     let array = [...Array(totalCount).keys()]
        //     const paginate = (array, page_size, page_number) => {
        //         return array.slice(page_number * page_size, (page_number + 1) * page_size)
        //     }
        //     let pool = paginate(array, 5, 0)

        //     // let pool = this.paginate(array, this.config.pageLimit, this.config.page)
        //     console.log(pool)
        //     // this.config.totalCount = this.sessions.docs.length
        //     // this.config.array = [...Array(this.config.totalCount).keys()]
        //     // this.config.pool = this.paginate(this.config.array, this.config.pageLimit, this.config.page)
        //     // this.config.last = this.config.page != 0 ? this.config.pool[this.config.page] - 1 : 0
        //     // // await rest(800)
        //     this.config = {
        //         totalCount,
        //         array,
        //         pool
        //     }
        // this.data = [//result of query plus transformed data like date_modified gets humanized]
        // })



        render() {

            let { filter, direction, page, search, pageLimit, totalCount, last } = this.config
            let { store } = this.props
            let { loading, handleFile } = this

            let data = []
            this.sessions.docs.map(document => {
                let entry = toJS(document.data)
                let id = document.id
                let { status, date_modified, date_uploaded, contributors } = entry
                let date_modified_timestamp = date_modified
                status = status || 'in-progress';
                date_modified = new store.fb.firebase.firestore.Timestamp(date_modified.seconds, date_modified.nanoseconds)
                date_modified = moment.duration(moment(date_modified.toDate()).diff(moment())).humanize(true)
                date_uploaded = new store.fb.firebase.firestore.Timestamp(date_uploaded.seconds, date_uploaded.nanoseconds)
                date_uploaded = moment.duration(moment(date_uploaded.toDate()).diff(moment())).humanize(true)
                data.push({
                    ...entry,
                    id,
                    status,
                    date_modified,
                    date_uploaded,
                    date_modified_timestamp,
                    author: contributors,
                })
            })

            const columns = [
                { field: 'Icon', searchable: false, export: false, render: () => <DocxIcon /> },
                { title: 'Document', field: 'title', type: 'string', searchable: true },
                { title: 'Status', field: 'status', type: 'string', searchable: false, render: paper => <StatusChip status={paper.status} /> },
                { title: 'Last Edited', field: 'date_modified', type: 'string', searchable: false },
                { title: 'Author', field: 'author', type: 'string', searchable: false },
                { title: 'Uploaded', field: 'date_uploaded', type: 'string', searchable: false, hidden: true },
                { title: 'Cloud Location', field: 'docx', type: 'string', searchable: false, hidden: true },
                { title: 'Slug', field: 'slug', searchable: false, hidden: true },
                { title: 'Excerpt', field: 'excerpt', searchable: false, hidden: true },
                { title: 'ID', field: 'id', searchable: false, hidden: true },
            ]

            return (
                <Box fontFamily="'Poppins', sans-serif" width={900}>
                    <MaterialTable
                        title="Checkout"
                        columns={columns}
                        data={data}
                        isLoading={loading}
                        tableRef={this.tableRef}
                        detailPanel={paper => <TableDetails {...{ paper, store }} />}
                        options={{
                            search: search,
                            pageSize: pageLimit,
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
                        onChangePage={async (page) => {
                            loading = true
                            page = page
                            await rest(500)
                            loading = false
                        }}
                        onChangeRowsPerPage={pageSize => {
                            pageLimit = pageSize
                        }}
                        onOrderChange={(colID, direction) => {
                            filter = columns[colID] ? columns[colID].field : ''
                            direction = direction
                        }}
                        localization={{
                            toolbar: {
                                exportTitle: 'Export Table',
                                exportName: 'Save as CSV',
                                searchTooltip: 'Search by Document Name',
                                searchPlaceholder: 'Search'
                            }
                        }}
                        components={{
                            Container: props => <StyledTableBody {...props} />
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
                                icon: () => <UploadButton {...{ store }} />,
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

const statusMap = {
    'in-progress': 'In Progress',
    'not-started': 'Not Started',
    'checked-out': 'Checked Out',
    'published': 'Published',
}

const labelColors = {
    'in-progress': '#c3e3ff',
    'not-started': '#ffe8c6',
    'checked-out': '#ffc6c8',
    'published': '#c6ffc6',
}

const rest = (ms) =>
    new Promise(rs => (
        setTimeout(() => {
            rs()
        }, ms)
    ))


const DocxIcon = () =>
    <DescriptionIcon style={{ color: '#0000008a' }} />

const StatusChip = ({ status }) => {
    const label = statusMap[status]
    const color = labelColors[status]
    return (
        <Chip {...{ label }} style={{ background: color }} />
    )
}

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


/**
 * @param {*} store
 * @descripion 
 * TableDetails is a class that is plugged in as a prop for the CheckoutTable
 * It displays additional information on dropdown of a row item. Clicking on
 * it also reveals actions that can be taken, like editing or unlocking the doc.
 */
export const TableDetails = compose(
    inject('store'),
    observer
)(
    class extends Component {

        /**
         * @type Boolean
         * @description
         * An observable for hiding/showing the Unlock Button
         */
        @observable allowUnlock = false

        /**
         * @type Number
         * @description
         * An observable for the time in seconds since the last save
         */
        @observable seconds_since_last_save = 0

        /**
         * @description
         * checkUnlock() to make sure the prospective document is available to edit
         * before it can be unlocked. The reason we know this will work is if
         * another user has the document checked out, it is autosaving every 60
         * seconds. It then updates the "date_modified" field in Firebase. So if
         * we do a local operation against the staticly retrieved "date_modified"
         * and check to see if it is say, 70 seconds since it was last updated,
         * then it is possible to know the other user is not online, or having 
         * internet trouble or is no longer actively autosaving the document.
         * This means we can safely adjust the status on Firebase to "in-progress",
         * bypassing the local check for viability and gain access to the document
         * 
         * Obviously a better thing to do would be to handle this all serverside
         * with a backend that knows what users are online and who is currently in
         * a document, but for now, this should be safe enough considering we won't
         * have many concurrent users all begging to edit at the same time.
         */
        @action checkUnlock = async () => {
            let { paper } = this.props
            let { date_modified_timestamp } = paper
            let now = moment(new Date())
            let end = moment(date_modified_timestamp.toDate())
            let duration = moment.duration(now.diff(end)).asSeconds()
            // Return if not enough time has passed
            if (duration <= 70) { return }
            // Else enable the unlock button
            this.allowUnlock = true
        }

        @observable open = false

        @action expand = () => this.open = true
        @action collapse = () => this.open = false

        componentDidMount() {
            // Check every 250ms seconds to see if the document can be unlocked
            // This is low cost as it isn't actually calling the data from firestore
            // it just a simple math operation clientside against an existing value
            this.unlockTimer = setInterval(() => this.checkUnlock(this.props), 250)

            // Transition the animation for the expansion panel
            this.expand()
        }

        componentWillUnmount() {
            clearInterval(this.unlockTimer)
            this.collapse()
        }

        render() {
            const { store, paper } = this.props
            let { allowUnlock } = this
            let { checkout, unlock } = store
            let { id, slug, excerpt, docx, date_uploaded, filename } = paper
            docx = !!docx ? docx : ''
            filename = !!filename ? filename : 'Document'

            return (
                <Collapse in={this.open}>
                    <Box height={150} display="flex" flexWrap="no-wrap" fontSize={13} >
                        <Box width="50%" display="flex" flexDirection="column" pl={6} py={2}>
                            <Box display="flex">
                                <Box display="flex" minWidth={80} fontSize={13}>
                                    <b>Slug</b>
                                </Box>
                                <Box height={30}></Box>
                                <Box display="flex" flexGrow={1}>
                                    {slug}
                                </Box>
                            </Box>
                            <Box flexGrow={1} display="flex" pr={2} overflow="hidden">
                                <Box display="flex" minWidth={80} fontSize={13} >
                                    <b>Excerpt</b>
                                </Box>
                                <Box display="flex" mb={2} flexGrow={1} style={{ overflowX: 'hidden', overflowY: !!excerpt ? 'scroll' : 'hidden' }}>
                                    {excerpt}
                                </Box>
                            </Box>
                        </Box>
                        <Box width="50%" display="flex" flexDirection="column" pl={6} py={2}>
                            <Box display="flex">
                                <Box display="flex" minWidth={80} fontSize={13}>
                                    <b>Document</b>
                                </Box>
                                <Box height={30}></Box>
                                <Box display="flex" flexGrow={1} style={{ color: "dodgerblue !important" }}>
                                    <MLink
                                        href={`${docx}`}
                                        key={id}
                                    >
                                        {`${filename}`}
                                    </MLink>
                                </Box>
                            </Box>
                            <Box minWidth={80} display="flex" pr={2} overflow="hidden">
                                <Box display="flex" minWidth={80} fontSize={13} >
                                    <b>Uploaded</b>
                                </Box>
                                <Box height={30}></Box>
                                <Box display="flex" minWidth={80} fontSize={13} >
                                    {date_uploaded}
                                </Box>
                                <Box height={30}></Box>
                            </Box>
                            <Box flexGrow={1} display="flex" pr={2} justifyContent="flex-end" alignItems="flex-end">
                                <Box>
                                    {allowUnlock && (
                                        <Button onClick={() => unlock(id)} color="secondary" variant="contained" endIcon={<LockOpenIcon />} style={{ marginRight: 8 }}>Unlock</Button>
                                    )}
                                    <Button onClick={() => checkout(id)} color="primary" variant="contained" endIcon={<EditIcon />}>Start Editing</Button>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Collapse>
            )
        }
    }
)

