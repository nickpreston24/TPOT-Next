import React from 'react';
import { observer, inject } from 'mobx-react';
import { withDialog } from 'muibox'
import { DialogProvider as DialogBox } from 'muibox'

const DialogProvider = props => (
    <DialogBox>
        <WithDialogConsumer {...props}/>
    </DialogBox>
)

@inject('store')
@observer
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
