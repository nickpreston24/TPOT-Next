import React, { Component } from 'react'
import { compose } from 'recompose'
import { uploadLocalFile } from '../Editor/functions/uploader'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'

import { withStyles } from '@material-ui/styles'
import MaterialTable, { Column } from 'material-table'
import { action, autorun, observable, toJS } from 'mobx'
import { inject, observer } from 'mobx-react'
import moment from 'moment'
import { Box, Button, Chip, Link as MLink, Paper } from '@material-ui/core'

import columns from './columns';
import { tableState } from './TableState'
import { store } from '../../stores/Root';
import TableDetails from './TableDetails'
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
        store: any
        sessions: any
        loading: boolean
        changePage: (page: number) => void
        changeRowsPerPage: (pageSize: number) => void
        orderChange: (orderBy: number, orderDirection: "desc" | "asc") => void
        pageSize: number
        columns: any[]

        constructor(props: any) {
            super(props)

            this.store = store;
            this.columns = columns;
        }

        render() {
            // const { store } = this.props
            // console.log('paper.status :>> ', paper.status)            

            let data = []
            this.sessions.docs.map(document => {
                let entry = toJS(document.data)
                let id = document.id
                let { status, date_modified, date_uploaded, contributors } = entry
                let date_modified_timestamp = date_modified
                status = status || 'in-progress'
                if (!date_modified || !date_uploaded) { return }
                date_modified = moment.duration(moment(date_modified.toDate()).diff(moment())).humanize(true)
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

            return (
                <Box fontFamily="'Poppins', sans-serif" width={900}>
                    <MaterialTable
                        title="Checkout"
                        columns={this.columns}
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


