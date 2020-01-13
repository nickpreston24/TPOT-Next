import React from 'react'
import { Box } from '@material-ui/core'
import { inject, observer } from 'mobx-react'

@inject('store')
@observer
class Code extends React.Component {

    render() {
        return (
            <Box border={1} height="100%" >
                Code
            </Box>
        )
    }
}

export default Code
