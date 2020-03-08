import React from 'react'
import { Box } from '@material-ui/core'
import Editor from 'draft-js-plugins-editor';
import { baseStyleMap } from './functions/utilities'
import plugins from './functions/plugins'
import { EditorState, convertToRaw, getDefaultKeyBinding, usesMacOSHeuristics, isOptionKeyCommand, isCtrlKeyCommand, KeyBindingUtil } from 'draft-js';
import { Toolbar } from './components/Toolbar';


class Draft extends React.Component {

    editor = React.createRef()

    state = {
        editorState: EditorState.createEmpty(),
        stylesheet: baseStyleMap
    }

    onChange = (editorState) => {
        this.setState({
            editorState,
        })
    }

    set editorState( editorState ) {
        this.setState({ editorState })
    }

    get editorState() {
        return this.state.editorState
    }

    set stylesheet(stylesheet) {
        this.setState({ stylesheet })
    }

    get stylesheet() {
        return this.state.stylesheet
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
    
    handleKeyCommand(command) {
        if (command === 'save') {
            this.props.saveFn()
            return 'handled';
        }
        if (command === 'publish') {
            // this.props.publishFn()
            return 'handled';
        }
        return 'not-handled';
    }

    myKeyBindingFn(e) {
        const { hasCommandModifier } = KeyBindingUtil
        if (e.keyCode === 83 /* `S` key */ && hasCommandModifier(e)) { e.preventDefault(); return 'save'}
        if (e.keyCode === 80 /* `P` key */ && hasCommandModifier(e)) { e.preventDefault(); return 'publish' }
        return getDefaultKeyBinding(e)
    }

    render() {
        const { hidden } = this.props

        // console.log('EDITOR', this.editor.current)
        return (
            <Box border={0} p={2} flexGrow={1} display={hidden ? 'none' : 'inherit'} >
                <Toolbar forward={this.editor.current}/>
                <Editor
                    ref={this.editor}
                    editorState={this.state.editorState}
                    customStyleMap={this.state.stylesheet}
                    onChange={this.onChange}					
                    handleKeyCommand={command => this.handleKeyCommand(command)}
					keyBindingFn={this.myKeyBindingFn}
                    plugins={plugins}
                />
            </Box>
        );
    }
}

export default Draft
