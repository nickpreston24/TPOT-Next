import React, { Component } from 'react'
import { compose } from 'recompose'
import { inject, observer } from 'mobx-react';
import MaterialTable from 'material-table'
import { Box, Chip, Button, Link as MLink } from '@material-ui/core';
import { observable, computed, action, autorun, toJS, runInAction } from 'mobx';
import DescriptionIcon from '@material-ui/icons/Description';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import moment from 'moment';
import { useRouter } from 'next/router'
import Link from 'next/link'
import EditIcon from '@material-ui/icons/Edit';
import { Collection } from 'firestorter'
import { uploadLocalFile } from './Editor/functions/uploader'


export const CheckoutTable = compose(
    inject('store'),
    observer
)(
    class CheckoutTable extends Component {

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
                        detailPanel={paper => <PaperDetails {...{ paper, store }} />}
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
                            emptyRowsWhenPaging: true,
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
                        actions={[
                            {
                                icon: 'refresh',
                                tooltip: 'Refresh Table',
                                isFreeAction: true,
                                onClick: () => console.log('refresh')
                            },
                            {
                                tooltip: 'Upload DOCX',
                                icon: () => <UploadButton {...{store}} />,
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

const StatusChip = ({ status }) => {
    const label = statusMap[status]
    const color = labelColors[status]
    return (
        <Chip {...{ label }} style={{ background: color }} />
    )
}

const rest = (ms) =>
    new Promise(rs => (
        setTimeout(() => {
            rs()
        }, ms)
    ))

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

const PaperDetails = observer(({ paper, store }) => {
    let { checkout } = store
    let { id, slug, excerpt, docx, date_modified, date_uploaded, filename } = paper
    docx = !!docx ? docx : ''
    filename = !!filename ? filename : 'Document'

    return (
        <Box height={150} display="flex" flexWrap="no-wrap" fontSize={13}>
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
                    <Box display="flex" mb={2} flexGrow={1} style={{ overflowX: 'hidden', overflowY: 'scroll' }}>
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
                        {/* <Link
                            href={"/scribe/edit/[doc]"}
                            as={`/scribe/edit/${id}`}
                            key={id}
                        > */}
                        <Button onClick={() => checkout(id)} color="primary" variant="contained" endIcon={<EditIcon />}>Start Editing</Button>
                        {/* </Link> */}
                    </Box>
                </Box>
            </Box>
        </Box>
    )
})

