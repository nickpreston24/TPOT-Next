import React from 'react'
import { Box } from '@material-ui/core'
import { inject, observer } from 'mobx-react'
import Editor from 'draft-js-plugins-editor';
import { EditorState, convertToRaw } from 'draft-js';
import plugins from './functions/plugins'

@inject('store')
@observer
class Draft extends React.Component {

    editor = React.createRef()

    state = {
        editorState: EditorState.createEmpty(),
    };

    onChange = (editorState) => {
        this.setState({
            editorState,
        });
    };

    set editorState( editorState ) {
        this.setState({ editorState })
    }

    get editorState() {
        return this.state.editorState
    }

    get rawState() {
        return convertToRaw(this.state.editorState.getCurrentContent())
    }

    get code() {
        return 'I am code'
    }

    get plainText() {
        return this.state.editorState.getCurrentContent().getPlainText()
    }

    render() {
        return (
            <Box border={1} >
                <Editor
                    ref={this.editor}
                    editorState={this.state.editorState}
                    onChange={this.onChange}
                    plugins={plugins}
                />
            </Box>
        );
    }
}

export default Draft
