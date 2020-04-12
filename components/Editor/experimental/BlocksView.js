import React from 'react'
import { Box } from '@material-ui/core'
import SyntaxHighlighter from 'react-syntax-highlighter';
import solarizedLight from 'react-syntax-highlighter/dist/cjs/styles/hljs/solarized-light';

const BlocksView = ({ hidden = true, state }) => {

    if (!state) 
        return <div>No Block state</div>
        
    const printedJSON = JSON.stringify(state, null, 4);

    return <Box flexGrow={1} display={hidden ? 'none' : 'flex'} justifyContent="center">
        <Box display="block" maxWidth={800}>
            <SyntaxHighlighter language='json' children={printedJSON} style={solarizedLight} lineProps={{
                style: {
                    border: '0px solid yellow'
                }
            }} codeTagProps={{
                style: {
                    border: '0px solid red'
                }
            }} customStyle={{
                fontSize: 16,
                overflowX: 'scroll',
                background: 'transparent'
            }} />
        </Box>
    </Box>
};

export default BlocksView
