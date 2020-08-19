import React, { useEffect, useState } from 'react'
import { Modal, ModalHeader, ModalOverlay, ModalFooter, ModalContent, ModalCloseButton, ModalBody } from '@chakra-ui/core/dist/Modal'
import Button from '@chakra-ui/core/dist/Button'
import Divider from '@chakra-ui/core/dist/Divider'
import Flex from '@chakra-ui/core/dist/Flex'
import Icon from '@chakra-ui/core/dist/Icon'
import Link from '@chakra-ui/core/dist/Link'
import Box from '@chakra-ui/core/dist/Box'
import Stack from '@chakra-ui/core/dist/Stack'
import Collapse from '@chakra-ui/core/dist/Collapse'
import Tooltip from '@chakra-ui/core/dist/Tooltip'
import useDisclosure from '@chakra-ui/core/dist/useDisclosure'
import { observer } from 'mobx-react'
import { useRouter } from 'next/router'
import { sessions, unlockSession } from '../../stores/sessionsAPI'
import { toDto, Session } from '../../models'
import { notify } from 'components/Toasts'
import { useAuth } from 'hooks'
import { ROUTES } from 'constants/routes'
import { CheckoutStatus } from '../../constants'
import dynamic from 'next/dynamic'
import moment from 'moment'
import { StatusChip } from '../atoms'

// <CheckoutTable /> is a class component that has a live connection to the firebase
// 'sessions' Collection. It is an inexpensive reactive component that displays the
// documents available through a paginated table. It is reactive so that when somebody
// else is editing a document, you will see the table update with the status change.
// It is the springboard for checking out a document, unlocking, or uploading a new
// document to firestore for editing. It is also offers a way to download documents.


// Using a dynamic import with `ssr: false` option fixes most Mui issues
const MaterialTable = dynamic(() => import('material-table'),
    { ssr: false }
)

const columns = [
    { field: 'Icon', searchable: false, export: false, render: () => <Icon maxW={20} name="calendar" /> },
    { title: 'Document', field: 'title', type: "string", searchable: true },
    { title: 'Status', field: 'status', type: "string", searchable: false, render: row => <StatusChip status={row.status} /> },
    { title: 'Last Edited', field: 'date_modified', type: "string", searchable: false },
    { title: 'Author', field: 'author', type: "string", searchable: false },
    { title: 'Uploaded', field: 'date_uploaded', type: "string", searchable: false, hidden: true },
    { title: 'Cloud Location', field: 'docx', type: "string", searchable: false, hidden: true },
    { title: 'Slug', field: 'slug', searchable: false, hidden: true },
    { title: 'Excerpt', field: 'excerpt', searchable: false, hidden: true },
    { title: 'ID', field: 'id', searchable: false, hidden: true },
]

const DEFAULT_AUTHOR = 9;
const queryLimit = 10;

export const CheckoutTable = observer(() => {

    const router = useRouter();
    // console.log('router', router.pathname, 'base: ', router.basePath, 'asPath:', router.asPath)

    const { user } = useAuth();
    // console.log('user :>> ', user);   

    const { isLoading, hasDocs } = sessions;
    
    let tableData = []

    if (hasDocs) {

        // Modify data coming from Firebase and make a data array for the table
        sessions.docs.reduce((array, doc, idx) => {
            let { id, data } = doc
            let { status, date_modified, date_uploaded, contributors } = data

            // console.log('contributors :>> ', contributors);

            let now = moment()
            if (date_modified) {
                date_modified = moment.unix(date_modified.seconds)
                date_modified = moment.duration(date_modified.diff(now))
                date_modified = date_modified.humanize(true)
            }
            if (date_uploaded) {
                date_uploaded = moment.unix(date_uploaded.seconds)
                date_uploaded = moment.duration(date_uploaded.diff(now))
                date_uploaded = date_uploaded.humanize(true)
            }
            array.push({
                ...data,
                id,
                status,
                date_modified,
                date_uploaded,
                author: contributors,
            })
            return array //!important, return the final data set for the table            
            // .filter(s => s.authorId === DEFAULT_AUTHOR) // Works, but would like this as a .query =ref=>... down the road.
        }, tableData)
    }

    return (
        <MaterialTable
            title="Checkout"
            data={tableData}
            columns={columns}
            isLoading={isLoading}
            detailPanel={row => <TableDetails user={user} row={row} />}
            options={{
                pageSize: 7,
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
            icons={{
                Clear: () => <Icon name='close' />,
                Delete: () => <Icon name='delete' />,
                FirstPage: () => <Icon name='arrow-back' />,
                LastPage: () => <Icon name='arrow-forward' />,
                ResetSearch: () => <Icon name='small-close' />,
                NextPage: () => <Icon name='chevron-right' />,
                PreviousPage: () => <Icon name='chevron-left' />,
                DetailPanel: () => <Icon name='chevron-right' />,
                SortArrow: () => <Icon name='up-down' ml={2} />,
                Export: () => <Icon name='download' fontSize="xl" />,
                Search: React.forwardRef((ref, props) => <Icon {...props} name='search-2' />)
            }}
            actions={[
                {
                    isFreeAction: true,
                    tooltip: 'Refresh Table',
                    icon: () => <Icon name='repeat' fontSize="xl" />,
                    onClick: () => console.log('refresh')
                },
            ]}
        />
    )
})

const TableDetails = ({ row, user }) => {

    const { id } = row;
    let session = toDto(row, Session);

    // console.log('session :>> ', session);

    let { slug, excerpt, original, date_uploaded, filename, status, lastContributor } = session;

    const [isOpen, setIsOpen] = useState(false)

    const { isOpen: unlockIsOpen, onOpen: onUnlockModalOpen, onClose: afterUnlockModalClose } = useDisclosure(); // For the unlock modal confirmation to pop up to work, we need these.

    const router = useRouter()

    // console.log('status :>> ', status);
    // console.log('lastContributor :>> ', lastContributor);

    useEffect(() => {
        const timer = setTimeout(() => setIsOpen(true), 0)
        return () => clearTimeout(timer)
    }, []);

    const checkout = async () => {
        const PATH = ROUTES.EDIT
        router.push(`${PATH}/[doc]`, `${PATH}/${id}`)
    }

    const unlock = async () => {
        unlockSession(id)
        notify("Document successfully unlocked.  You may now check it out", 'info');
    }

    return (
        <Collapse isOpen={isOpen} alignContent="center" transition="all 1s ease-in-out">
            <Flex justifyContent="center">
                <Flex height={150} flexGrow={1} maxW={800} px={6} py={2}>
                    <Stack w="50%">
                        {slug &&
                            <Stack direction="row">
                                <Box minW="80px" fontWeight="bold">Slug</Box>
                                <Box>{slug}</Box>
                            </Stack>
                        }
                        {excerpt &&
                            <Stack direction="row">
                                <Box minW="80px" fontWeight="bold">Excerpt</Box>
                                <Box overflowX="hidden" overflowY="scroll">{excerpt}</Box>
                            </Stack>
                        }
                    </Stack>
                    <Divider orientation="vertical" m={4} />
                    <Stack w="50%">
                        {filename &&
                            <Stack direction="row">
                                <Box minW="80px" fontWeight="bold">Document</Box>
                                <Link href={original} isExternal color="blue.500">
                                    {filename} <Icon name="external-link" mx="2px" />
                                </Link>
                            </Stack>
                        }
                        {date_uploaded &&
                            <Stack direction="row">
                                <Box minW="80px" fontWeight="bold">Date Uploaded</Box>
                                <Box overflowX="hidden" overflowY="scroll">{date_uploaded}</Box>
                            </Stack>
                        }
                        <Stack flexGrow={1} justifyContent="flex-end" alignItems="flex-end" direction="row">
                            <ConfirmUnlock
                                action={unlock}
                                isOpen={unlockIsOpen}
                                onClose={afterUnlockModalClose}
                            // confirmedAction={unlock}  // may not be used, I forget.
                            >
                                Unlock
                                </ConfirmUnlock>
                            <Tooltip
                                label="Unlock a paper for editing"
                                placement="bottom"
                                aria-label="unlock-paper"
                            >
                                <Button
                                    onClick={onUnlockModalOpen}
                                    isDisabled={status !== CheckoutStatus.CheckedOut}
                                    leftIcon="unlock"
                                >
                                    Unlock
                            </Button>
                            </Tooltip>
                            <Tooltip label="Edit this paper" placement="bottom" aria-label="edit-paper">
                                <Button
                                    onClick={() => checkout()}
                                    leftIcon="edit"
                                    isDisabled={status === CheckoutStatus.CheckedOut}
                                    variantColor="primary"
                                >
                                    Start Editing
                                </Button>
                            </Tooltip>
                        </Stack>
                    </Stack>
                </Flex>
            </Flex>
        </Collapse >
    )
}

const ConfirmUnlock/*: FC<any>*/ = ({ isOpen, onClose, action }) => {

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Confirm: Unlock this paper?</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        Unlocking this paper for editing may cause unwanted issues like duplicated drafts.
                        Proceed if you understand the risk.
                    </ModalBody>

                    <ModalFooter>
                        <Stack>
                            <Button variantColor="green" mr={30} onClick={() => {
                                action()
                                onClose()
                            }}>
                                I understand and wish to continue.
                        </Button>
                            <Button variantColor="blue" onClick={onClose}>
                                On second thought...
                        </Button>
                        </Stack>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default CheckoutTable;