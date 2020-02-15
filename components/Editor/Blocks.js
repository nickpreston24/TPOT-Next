import React from 'react'
import { Box } from '@material-ui/core'
import { inject, observer } from 'mobx-react'
import SyntaxHighlighter from 'react-syntax-highlighter';
import solarizedLight from 'react-syntax-highlighter/dist/cjs/styles/hljs/solarized-light';

@inject('store')
@observer
class Code extends React.Component {

    render() {
        const { hidden } = this.props
        return (
            <Box border={1} flexGrow={1} display={hidden ? 'none' : 'inherit'} >
                {this.props.state}
            </Box>
        )
    }
}

export default Code
