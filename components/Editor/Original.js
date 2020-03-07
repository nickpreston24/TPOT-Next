import React from 'react'
import { Box } from '@material-ui/core'
import { inject, observer } from 'mobx-react'
import ReactHtmlParser from "react-html-parser";

@inject('store')
@observer
class Original extends React.Component {

    render() {
        const { hidden } = this.props
        return (
            <Box border={0} p={2} flexGrow={1} display={hidden ? 'none' : 'inherit'} >
                {ReactHtmlParser(this.props.state)}
            </Box>
        )
    }
}

export default Original
