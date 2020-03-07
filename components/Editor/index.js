import React from 'react'
import { Box } from '@material-ui/core'
import { inject, observer } from 'mobx-react'
import Original from './Original'
import Blocks from './Blocks'
import Draft from './Draft'
import Code from './Code'
import { EditorState } from 'draft-js'

// @inject('store')
// @observer
class Editor extends React.Component {

    draft = React.createRef()

    state = {
        mode: 'draft',
        code: null,
    }

    componentDidMount() {
        // console.log( this.draft.current.rawState )
    }

    componentDidUpdate() {
        // console.log( this.draft.current.editorState )
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
        // convert the current editors draftState to html result
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
