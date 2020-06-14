import React, { Component } from 'react'
import Box from '@material-ui/core/Box'
import { observable, action, computed, autorun, reaction, toJS } from 'mobx'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Paper from '@material-ui/core/Paper'
import Draggable from 'react-draggable'
import { compose } from 'recompose'

// #2d374a
class DialogContainer extends Component {

    dialogPortal = React.createRef()
    @observable open = false
    @observable mounted = false

    // disposer = autorun(() => {
    //     if (!this.dialogPortal.current) {
    //         this.mounted = true
    //     }
    //     if (this.mounted && !!this.props.store) {
    //         const prompt = this.props.store.currentPrompt
    //         if (!!prompt) {
    //             this.open = true
    //         }
    //     }

    // })

    componentDidMount() {
        this.mounted = true
    }

    @action display = () =>
        this.open = true

    @action dismiss = () =>
        this.open = false

    @action resolve = () => {
        let prompt = this.props.store.currentPrompt
        prompt.resolve()
        this.dismiss()
    }

    @action reject = () => {
        let prompt = this.props.store.currentPrompt
        prompt.reject()
        this.dismiss()
    }

    render() {
        // const { currentPrompt, dialogPortal } = this.props.store
        const { dialogPortal, resolve, reject, open, mounted } = this
        // const prompt = currentPrompt
        return (
            <Box ref={dialogPortal} position="absolute" width="100vw" height="100vh" position="absolute" zIndex={1200} style={{ boxSizing: 'border-box', pointerEvents: 'none' }}>
                <CustomDialog {...{ resolve, reject, open, mounted }} />
            </Box>
        )
    }
}


function PaperComponent(props) {
    return (
        <Draggable cancel={'[class*="MuiDialogContent-root"]'}>
            <Paper {...props} />
        </Draggable>
    )
}

const CustomDialog = compose(
    observer
)(props => {

    const { prompt, type, resolve, reject, display, dismiss, open, mounted, store } = props
    // const { currentPrompt } = store
    // console.log(mounted)
    console.log(props)

    // const prompt = this.props.store.currentPrompt
    // const prompt = this.props.store.currentPrompt
    // if (prompt){ this.display()}
    // const type = prompt ? prompt.type : null
    // console.log('type', type)
    if (mounted) {
        console.log('m')
    } else {
        console.log('nope')
        const { currentPrompt } = store
        console.log(currentPrompt)
    }
    console.log(prompt) 
    return (
        <Box>
            <h1>THIS IS TEXT</h1>
            {prompt && (
                <Dialog
                    open={true}
                    onClose={reject}
                    PaperComponent={PaperComponent}
                    aria-labelledby="draggable-dialog-title"
                >
                    <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                        Subscribe
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            To subscribe to this website, please enter your email address here. We will send updates
                            occasionally.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={reject} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={resolve} color="primary">
                            Subscribe
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
        </Box>

    )
})


export { DialogContainer }


