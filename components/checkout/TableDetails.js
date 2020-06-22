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

import { details } from '../../stores/DocumentDetailStore'

/**
 * @param {*} store
 * @descripion 
 * TableDetails is a class that is plugged in as a prop for the CheckoutTable
 * It displays additional information on dropdown of a row item. Clicking on
 * it also reveals actions that can be taken, like editing or unlocking the doc.
 */
export const TableDetails = compose(observer)(
    class extends Component {

        // /**
        //  * @type Boolean
        //  * @description
        //  * An observable for hiding/showing the Unlock Button
        //  */
        // @observable allowUnlock = false

        // /**
        //  * @type Number
        //  * @description
        //  * An observable for the time in seconds since the last save
        //  */
        // @observable seconds_since_last_save = 0

        // /**
        //  * @description
        //  * checkUnlock() to make sure the prospective document is available to edit
        //  * before it can be unlocked. The reason we know this will work is if
        //  * another user has the document checked out, it is autosaving every 60
        //  * seconds. It then updates the "date_modified" field in Firebase. So if
        //  * we do a local operation against the staticly retrieved "date_modified"
        //  * and check to see if it is say, 70 seconds since it was last updated,
        //  * then it is possible to know the other user is not online, or having 
        //  * internet trouble or is no longer actively autosaving the document.
        //  * This means we can safely adjust the status on Firebase to "in-progress",
        //  * bypassing the local check for viability and gain access to the document
        //  * 
        //  * Obviously a better thing to do would be to handle this all serverside
        //  * with a backend that knows what users are online and who is currently in
        //  * a document, but for now, this should be safe enough considering we won't
        //  * have many concurrent users all begging to edit at the same time.
        //  */
        // @action checkUnlock = async () => {
        //     let { paper } = this.props
        //     let { date_modified_timestamp } = paper
        //     let now = moment(new Date())
        //     let end = moment(date_modified_timestamp.toDate())
        //     let duration = moment.duration(now.diff(end)).asSeconds()
        //     // Return if not enough time has passed
        //     if (duration <= 70) { return }
        //     // Else enable the unlock button
        //     this.allowUnlock = true
        // }

        // @observable open = false

        // @action expand = () => this.open = true
        // @action collapse = () => this.open = false

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
                                <Box display="flex" flexGrow={1} style={{ color: 'dodgerblue !important' }}>
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
                                    <Button
                                        disabled={!allowUnlock}
                                        onClick={() => unlock(id)}
                                        color="primary"
                                        variant="outlined"
                                        endIcon={allowUnlock && <LockOpenIcon />}
                                        style={{ marginRight: 8 }}
                                    >
                                        {allowUnlock ? 'Unlock' : <LockOpenIcon />}
                                    </Button>
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

