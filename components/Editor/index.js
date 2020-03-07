import React from 'react'
import { Box } from '@material-ui/core'
import Original from './Original'
import Blocks from './Blocks'
import Draft from './Draft'
import Code from './Code'
import { EditorState } from 'draft-js'

// The <Editor /> component is wrapper class that meshes together a DraftJS
// editor plus several visualizers. Most of its methods are an abstraction
// of the editor's functions, but there are bonuses like mode switching.
// It should be able to be dropped into any application to get a clean draft
// editor with some nicer features. In our case, the <Editor /> component is
// instantiated and a reference is made by DocumentEditor, our shim for the
// editor inside Toolbox. Once a reference is made, you can call all the vanilla
// methods inside this class, set its initial state, and give it a function to
// save with, etc. This class and its children may always function in isolation.

class Editor extends React.Component {

    draft = React.createRef()

    state = {
        mode: 'draft',
        code: null,
    }

    componentDidMount() {
        // 
    }

    componentDidUpdate() {
        // 
    }

    set mode(mode) {
        this.setState({ mode })
    }

    get mode() {
        return this.state.mode
    }

    set editorState(editorState) {
        this.draft.current.editorState = editorState
    }

    get editorState() {
        return this.draft.current.editorState
    }

    set code(code) {
        this.setState({ code })
    }

    get code() {
        return this.state.code
    }

    set original(original) {
        this.setState({ original })
    }

    get original() {
        return this.state.original
    }

    set stylesheet(stylesheet) {
        this.draft.current.stylesheet = stylesheet
    }

    get stylesheet() {
        return this.draft.current.stylesheet
    } 

    get plainText() {
        if (!!this.draft.current) {
            return this.draft.current.plainText
        } else {
            return ""
        }
    }

    render() {
        const { mode, code, draft, original, plainText } = this
        const { saveFn } = this.props
        return (
            <Box border={0} p={2} flexGrow={1} fontSize={18} >
                <Original state={original} hidden={mode !== 'original'} />
                <Code state={code} hidden={mode !== 'code'} />
                <Draft ref={draft} hidden={mode !== 'draft'} saveFn={saveFn} />
                {/* <Blocks state={plainText} hidden={mode !== 'blocks'} /> */}
            </Box>
        )
    }
}

export default Editor
