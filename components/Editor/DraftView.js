import React from 'react'
import { Box } from '@material-ui/core'
import Editor from 'draft-js-plugins-editor';
import { baseStyleMap } from './functions/utilities'
import plugins from './functions/plugins'
import { EditorState, convertToRaw, getDefaultKeyBinding, usesMacOSHeuristics, isOptionKeyCommand, isCtrlKeyCommand, KeyBindingUtil } from 'draft-js';
import { Toolbar } from './components/Toolbar';

// The <Draft /> component is the primary view mode of the <Editor /> It can
// also be used in a standalone app. All state managment is best done with
// React.setState() rather than something like Redux or MobX. Additional plugins
// can be written for the editor and are registered under ./functions/plugins

class DraftView extends React.Component {

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

    set editorState(editorState) {
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

    get blocks() {
        return convertToRaw(this.state.editorState.getCurrentContent())
    }

    get code() {
        return 'I am code'
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
        if (e.keyCode === 83 /* `S` key */ && hasCommandModifier(e)) { e.preventDefault(); return 'save' }
        if (e.keyCode === 80 /* `P` key */ && hasCommandModifier(e)) { e.preventDefault(); return 'publish' }
        return getDefaultKeyBinding(e)
    }

    render() {
        const { hidden } = this.props
        return (
            <Box display={hidden ? 'none' : 'flex'} flexGrow={1} flexDirection="column" alignItems="center" flexWrap="nowrap" bgcolor="background.paper" style={{ boxSizing: 'border-box', overflowY: 'hidden' }} >
                <Box display="flex" width="100%" style={{ boxSizing: 'border-box' }} >
                    <Toolbar forward={this.editor.current} />
                </Box>
                <Box display="flex" flexGrow={1} width="100%" justifyContent="center" style={{ overflowY: 'scroll' }}>
                    <Box display="flex" width={800} >
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
                </Box>
            </Box>
        )
    }
}

export default DraftView
