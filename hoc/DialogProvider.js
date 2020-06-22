import React from 'react'
import { withDialog } from 'muibox'
import { DialogProvider as DialogBox } from 'muibox'


/**
 * MP: What is this, why do we need it and why does it require a store?
 */
const DialogProvider = props => (
    <DialogBox>
        <WithDialogConsumer {...props}/>
    </DialogBox>
)

class DialogConsumer extends React.Component {

    componentDidMount() {
        this.props.store.setKey('dialog', this.props.dialog)
    }

    render() {
        return <>{this.props.children}</>
    }
}

const WithDialogConsumer = withDialog()(DialogConsumer)

export default DialogProvider
