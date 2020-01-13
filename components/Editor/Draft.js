import React from 'react'
import { Box } from '@material-ui/core'
import { inject, observer } from 'mobx-react'
import Editor from 'draft-js-plugins-editor';
import { EditorState } from 'draft-js';
import plugins from './functions/plugins'

@inject('store')
@observer
class Draft extends React.Component {

    state = {
        editorState: EditorState.createEmpty(),
    };

    onChange = (editorState) => {
        this.setState({
            editorState,
        });
    };

    render() {
        return (
            <Box border={1} >
                <Editor
                    editorState={this.state.editorState}
                    onChange={this.onChange}
                    plugins={plugins}
                />
            </Box>
        );
    }
}

export default Draft
