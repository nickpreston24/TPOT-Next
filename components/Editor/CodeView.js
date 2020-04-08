import React from 'react'
import { Box } from '@material-ui/core'
import { inject, observer } from 'mobx-react'
import SyntaxHighlighter from 'react-syntax-highlighter';
import solarizedLight from 'react-syntax-highlighter/dist/cjs/styles/hljs/solarized-light';

@inject('store')
@observer
class CodeView extends React.Component {

    render() {
        const { hidden } = this.props
        const children = this.props.state || ''
        return (
            <Box flexGrow={1} display={hidden ? 'none' : 'flex'} justifyContent="center" >
                <Box display="block" maxWidth={800} >
                    <SyntaxHighlighter
                        language='html'
                        children={children}
                        style={solarizedLight}
                        lineProps={{ style: { border: '0px solid yellow' } }}
                        codeTagProps={{ style: { border: '0px solid red' } }}
                        customStyle={{
                            fontSize: 16,
                            lineHeight: 1.5,
                            letterSpacing: 0.5,
                            overflowX: 'scroll',
                            background: 'transparent'
                        }}
                    />
                </Box>
            </Box>
        )
    }
}

export default CodeView
