import React, { Component } from 'react'
import { compose } from 'recompose'
import { inject, observer } from 'mobx-react';
import MaterialTable from 'material-table'
import { Box, Chip, Button, Link as MLink } from '@material-ui/core';
import { observable, computed, action, autorun, toJS, runInAction } from 'mobx';
import DescriptionIcon from '@material-ui/icons/Description';
import moment from 'moment';
import { useRouter } from 'next/router'
import Link from 'next/link'
import EditIcon from '@material-ui/icons/Edit';
import { Collection } from 'firestorter'


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
            totalCount: 0,
            array: [],
            pool: [],
            page: 0,
            last: 0
        }

        paginate = (array, page_size, page_number) => {
            return array.slice(page_number * page_size, (page_number + 1) * page_size)
        }

        disposer = autorun(async () => {

            let totalCount = this.sessions.docs.length
            let array = [...Array(totalCount).keys()]
            const paginate = (array, page_size, page_number) => {
                return array.slice(page_number * page_size, (page_number + 1) * page_size)
            }
            let pool = paginate(array, 5, 0)

            // let pool = this.paginate(array, this.config.pageLimit, this.config.page)
            console.log(pool)
            // this.config.totalCount = this.sessions.docs.length
            // this.config.array = [...Array(this.config.totalCount).keys()]
            // this.config.pool = this.paginate(this.config.array, this.config.pageLimit, this.config.page)
            // this.config.last = this.config.page != 0 ? this.config.pool[this.config.page] - 1 : 0
            // // await rest(800)
            this.config = {
                totalCount,
                array,
                pool
            }
        })

        render() {

            let { filter, direction, page, search, pageLimit, totalCount, last } = this.config
            let { store } = this.props
            let { loading } = this
            console.log(toJS(this.config))


            // this.sessions.query = undefined
            console.log(this.sessions.docs.length)

            this.sessions.query = (ref) => {
                ref = filter ? direction ? ref.orderBy(filter, direction) : ref.orderBy(filter) : ref
                ref = ref.limit(200)
                return ref
            }

            let data = []
            this.sessions.docs.map(document => {
                let entry = toJS(document.data)
                let id = document.id
                let { status, date_modified, date_uploaded } = entry
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
                    date_uploaded
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
                        detailPanel={paper => <PaperDetails paper={paper} />}
                        options={{
                            search: search,
                            pageSize: pageLimit,
                            pageSizeOptions: [5, 7, 10],
                            selection: false,
                            draggable: true,
                            grouping: true,
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
                            header: {
                                actions: 'imaaction'
                            },
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
                                onClick: () => this.tableRef.current && this.tableRef.current.onQueryChange(),
                            },
                            {
                                tooltip: 'Upload .docx from your computer',
                                icon: 'backupOutlinedIcon',
                                isFreeAction: true,
                                onClick: (evt, data) => alert('You want to delete ' + data.length + ' rows')
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

const PaperDetails = observer(({ paper }) => {
    let { id, slug, excerpt, docx, date_modified, date_uploaded } = paper
    docx = !!docx ? docx.slice(25) : ''

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
                            href={`https://firebasestorage.googleapis.com/v0/b/tpot-toolbox.appspot.com/o/originals%2F${docx}?alt=media&token=36efb560-7a06-4385-95cf-162051c3d304`}
                            key={id}
                        >
                            {`${docx}`}
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
                        <Link
                            href={"/scribe/edit/[doc]"}
                            as={`/scribe/edit/${id}`}
                            key={id}
                        ><Button color="primary" variant="contained" endIcon={<EditIcon />}>Start Editing</Button>
                        </Link>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
})

