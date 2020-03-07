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
        const children = this.props.state || ''
        return (
            <Box flexGrow={1} display={hidden ? 'none' : 'inherit'} >
                <SyntaxHighlighter
                    showLineNumbers
                    wrapLines
                    language='html'
                    children={children}
                    style={solarizedLight}
                    lineProps={{ style: { border: '0px solid yellow' } }}
                    codeTagProps={{ style: { border: '0px solid red' } }}
                    customStyle={{
                        fontSize: 16,
                        overflow: 'hidden',
                        background: 'transparent',
                        textOverflow: 'ellipsis',
                    }}
                />
            </Box>
        )
    }
}

export default Code
