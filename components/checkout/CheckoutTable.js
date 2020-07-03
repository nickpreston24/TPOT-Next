import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { useSessions } from '@hooks'
import { Collection } from 'firestorter'
import moment from 'moment'
import { Chip } from '@material-ui/core'
// import StatusChip from '../components/StatusChip.tsx'
import { ButtonLink } from '../experimental'

// <CheckoutTable /> is a class component that has a live connection to the firebase
// 'sessions' Collection. It is an inexpensive reactive component that displays the
// documents available through a paginated table. It is reactive so that when somebody
// else is editing a document, you will see the table update with the status change.
// It is the springboard for checking out a document, unlocking, or uploading a new
// document to firestore for editing. It is also offers a way to download documents.

export const CheckoutTable = observer(class Table extends Component {

    constructor() {
        super()
        this.collection = new Collection('sessions');
        // console.log('this.collection :>> ', this.collection);
    }

    render() {
        const { docs, fetching } = this.collection;
        return (
            <div>
                {docs.map((doc) => <CheckoutItem key={doc.id} doc={doc} />)}
            </div>
        )
    }
})


const CheckoutItem = observer(
    class CheckoutItem extends Component {
        render() {

            const { doc } = this.props;
            let { slug, status, date_modified, date_uploaded, title } = doc.data
            let id = doc.id;
            // let date_modified_timestamp = date_modified
            status = status || 'in-progress'
            // date_modified = moment.duration(moment(date_modified.toDate()).diff(moment())).humanize(true)
            // date_uploaded = moment.duration(moment(date_uploaded.toDate()).diff(moment())).humanize(true)
            // if (!date_modified || !date_uploaded) { return } 
            {/* console.log('id:', `/scribe/edit/${id}`) */ }

            return (
                <div>
                    <div key={id}>
                        <h5>{title} - {id}</h5>
                        {/* <StatusChip status={status} /> */}

                        <Chip
                            label='Checkout'
                            title={title}
                            component={ButtonLink}
                            href='/scribe/edit/[doc]'
                            // href={`/scribe/edit/${id}`}
                            as={`/scribe/edit/${id}`}
                            clickable
                        />
                    </div>
                </div>
            )
        }
    }
)

// export const CheckoutTable = observer(({ }) => {

//     // const tableRef = React.createRef()  
//     // const { user } = useAuth();
//     // const { sessions } = useSessions();
//     // // let results = toJS(store.sessions).docs

//     const collection = new Collection<Document<SessionType>>('sessions');


//     console.log('sessions :>> ', sessions);

//     // let docs = toJS(store.sessions.docs).map(document => {
//     //     let entry = toJS(document.data)
//     //     let id = document.id
//     //     console.log('entry :>> ', entry);
//     //     return { id, entry }
//     // })

//     return (<div>I like trains</div>)

//     // return (
//     //     <Box
//     //         alignItems="center"
//     //         horizontal="center"
//     //     >
//     //         <div>
//     //             {
//     //                 !!sessions &&
//     //                 sessions.map((doc, index) => {
//     //                     let { status, date_modified, date_uploaded, title } = doc.data
//     //                     let id = doc.id;
//     //                     let date_modified_timestamp = date_modified
//     //                     status = status || 'in-progress'
//     //                     if (!date_modified || !date_uploaded) { return }
//     //                     date_modified = moment.duration(moment(date_modified.toDate()).diff(moment())).humanize(true)
//     //                     date_uploaded = moment.duration(moment(date_uploaded.toDate()).diff(moment())).humanize(true)
//     //                     {/* console.log('id:', `/scribe/edit/${id}`) */ }
//     //                     return (
//     //                         <div key={index}>
//     //                             <h5>{title} - {id}</h5>
//     //                             <StatusChip status={status} />
//     //                             <Chip
//     //                                 label='Check out'
//     //                                 title={title}
//     //                                 component={ButtonLink}
//     //                                 href='/scribe/edit/[doc]'
//     //                                 as={`/scribe/edit/${id}`}
//     //                                 clickable
//     //                             />
//     //                         </div>
//     //                     )
//     //                 })
//     //             }
//     //         </div>



//     //     </Box>
//     // )
// })


export default CheckoutTable;



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

