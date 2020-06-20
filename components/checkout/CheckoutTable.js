import React, { useState, useEffect, useContext } from 'react'
import MaterialTable from 'material-table'
import { Box, Chip } from '@material-ui/core'
import columns from './columns'
import StyledTableBody from './StyledTableBody'
import { observer } from 'mobx-react'
import { observable, toJS } from 'mobx'
import UploadButton from './UploadButton'
import moment from 'moment'
import SessionStore from '../../stores/SessionStore'
import * as ROUTES from '@routes'
import ZeitLinkButton, { ButtonLink } from '@components/experimental'
import StatusChip from '../StatusChip'

// <CheckoutTable /> is a class component that has a live connection to the firebase
// 'sessions' Collection. It is an inexpensive reactive component that displays the
// documents available through a paginated table. It is reactive so that when somebody
// else is editing a document, you will see the table update with the status change.
// It is the springboard for checking out a document, unlocking, or uploading a new
// document to firestore for editing. It is also offers a way to download documents.
// @observer
// export 
export const CheckoutTable = observer(() => {

    const tableRef = React.createRef()
    const [data, setData] = useState([]);

    const sessionStore = useContext(SessionStore);

    const {
        sessions
        , loading
        , prevDocument
        , page
        , pageSize
        , filter
        , direction
        , query
        , totalCount

        , changePage
        , changeRowsPerPage
        , setTotalCount
        , updateQuery
        , queryBuilder
        , setLoading
        , orderChange

    } = sessionStore;


    // TODO: Set results to the data array for render in checkout's render().
    useEffect(() => {
        let results = [
            // {
            //     id: 2,
            //     status: 'in-progress'
            // }
        ]
        toJS(sessions.docs).map(document => {
            let entry = toJS(document.data)
            let id = document.id
            let { status, date_modified, date_uploaded, contributors } = entry
            let date_modified_timestamp = date_modified
            status = status || 'in-progress'
            if (!date_modified || !date_uploaded) { return }
            date_modified = moment.duration(moment(date_modified.toDate()).diff(moment())).humanize(true)
            date_uploaded = moment.duration(moment(date_uploaded.toDate()).diff(moment())).humanize(true)
            results.push({
                ...entry,
                id,
                status,
                date_modified,
                date_uploaded,
                date_modified_timestamp,
                author: contributors,
            })
        })

        setData(results)
    }, []);

    return (
        <Box fontFamily="'Poppins', sans-serif" width={900}>
            <div>
                {
                    sessions.docs.map((doc, index) => {
                        let { status, date_modified, date_uploaded, title } = doc.data
                        let id = doc.id;
                        let date_modified_timestamp = date_modified
                        status = status || 'in-progress'
                        if (!date_modified || !date_uploaded) { return }
                        date_modified = moment.duration(moment(date_modified.toDate()).diff(moment())).humanize(true)
                        date_uploaded = moment.duration(moment(date_uploaded.toDate()).diff(moment())).humanize(true)
                        console.log('id:', `/scribe/edit/${id}`)
                        return (
                            <div key={index}>
                                <h5>{title} - {id}</h5>
                                <StatusChip status={status} />
                                <Chip
                                    label='Check out'
                                    title={title}
                                    component={ButtonLink}
                                    href='/scribe/edit/[doc]'
                                    as={`/scribe/edit/${id}`}
                                    clickable
                                />
                            </div>
                        )
                    })
                }
            </div>
            {/* <MaterialTable
                title="Checkout"
                columns={columns}
                data={data}
                isLoading={loading}
                tableRef={tableRef}
                onChangePage={changePage}
                onChangeRowsPerPage={changeRowsPerPage}
                onOrderChange={orderChange}
                detailPanel={paper => <TableDetails paper={paper} />}
                components={{ Container: props => <StyledTableBody {...props} /> }}
                options={{
                    // search: search,
                    pageSize: pageSize,
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
                        icon: () => <UploadButton />,
                        isFreeAction: true,
                        onClick: () => null
                    }
                ]}
            /> */}
        </Box>
    )
})