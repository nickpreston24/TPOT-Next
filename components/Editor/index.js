import React from 'react'
import { Box } from '@material-ui/core'
import { inject, observer } from 'mobx-react'
import Draft from './Draft'

@inject('store')
@observer
class Editor extends React.Component {

    render() {
        return (
            <Box border={1} height="100%" >
                {/* // Original */}
                <Draft />
                {/* // Code */}
            </Box>
        )
    }
}

export default Editor
