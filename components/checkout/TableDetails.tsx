import { observer } from "mobx-react"
import { Component } from "react"
import { Collapse, Box, Button, Chip, Link as MLink, Paper } from "@material-ui/core"
import EditIcon from '@material-ui/icons/Edit'
import LockOpenIcon from '@material-ui/icons/LockOpen'
import { compose } from 'recompose'

import { details } from './DetailState'
import { store } from "../../stores/root"


/**
 * @param {*} store
 * @descripion 
 * TableDetails is a class that is plugged in as a prop for the CheckoutTable
 * It displays additional information on dropdown of a row item. Clicking on
 * it also reveals actions that can be taken, like editing or unlocking the doc.
 */
const TableDetails = compose(observer)(
    class extends Component {
        allowUnlock: boolean
        open: boolean
        expand: () => boolean
        collapse: () => boolean
        unlockTimer: NodeJS.Timeout
        paper: any

        constructor(props) {
            super(props)
            this.allowUnlock = details.allowUnlock
            this.open = details.open
            this.expand = details.expand
            this.collapse = details.collapse


            this.paper = props.paper || null;
        }

        componentDidMount() {
            // Check every 250ms seconds to see if the document can be unlocked
            // This is low cost as it isn't actually calling the data from firestore
            // it just a simple math operation clientside against an existing value
            this.unlockTimer = setInterval(() => this.checkUnlock(this.props), 250)

            // Transition the animation for the expansion panel
            this.expand()
        }
        checkUnlock(props: Readonly<{}> & Readonly<{ children?: import("react").ReactNode }>): void {
            throw new Error("Method not implemented.")
        }

        componentWillUnmount() {
            clearInterval(this.unlockTimer)
            this.collapse()
        }

        render() {
            // const { store, paper } = this.props
            // let { allowUnlock } = this
            let { checkout, unlock } = store
            let { id, slug, excerpt, docx, date_uploaded, filename } = this.paper
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
                                        disabled={!this.allowUnlock}
                                        onClick={() => unlock(id)}
                                        color="primary"
                                        variant="outlined"
                                        endIcon={this.allowUnlock && <LockOpenIcon />}
                                        style={{ marginRight: 8 }}
                                    >
                                        {this.allowUnlock ? 'Unlock' : <LockOpenIcon />}
                                    </Button>
                                    <Button onClick={() => checkout(id)} color="primary" variant="contained" endIcon={<EditIcon />}>Start Editing</Button>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Collapse >
            )
        }
    }
)

export default TableDetails