import React from 'react'
import { Box } from '@material-ui/core'
import { inject, observer } from 'mobx-react'
import Draft from './Draft'
import { EditorState } from 'draft-js'

// @inject('store')
// @observer
class Editor extends React.Component {

    draft = React.createRef()

    state = {
        mode: 'draft'
    }

    componentDidMount() {
        // console.log( this.draft.current.rawState )
    }

    componentDidUpdate() {

        // console.log( this.draft.current.editorState )
    }

    get mode() {
        return this.state.mode
    }

    set mode(mode) {
        this.setState({ mode })
    }

    set editorState(editorState) {
        this.draft.current.editorState = editorState
    }

    get editorState() {
        return this.draft.current.editorState
    }

    get code() {
        return this.draft.current.rawState
    }

    get plainText() {
        return this.draft.current.plainText
    }

    render() {
        const { mode } = this.state
        return (
            <Box border={1} height="100%" >
                {/* // Original */}
                <Draft ref={this.draft} />
                {/* // Code */}
            </Box>
        )
    }
}

export default Editor
