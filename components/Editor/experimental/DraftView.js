import React, { Component, forwardRef } from 'react'
import PropTypes from 'prop-types'
import { Box } from '@material-ui/core'
import Editor from 'draft-js-plugins-editor';
import { baseStyleMap } from '../functions/utilities'
import { inject, observer } from 'mobx-react'
import plugins from '../functions/plugins'
import { EditorState, convertToRaw, getDefaultKeyBinding, usesMacOSHeuristics, isOptionKeyCommand, isCtrlKeyCommand, KeyBindingUtil } from 'draft-js';
import { Toolbar } from '../components/Toolbar';
import { compose } from 'recompose';

// The <Draft /> component is the primary view mode of the <Editor /> It can
// also be used in a standalone app. All state managment is best done with
// React.setState() rather than something like Redux or MobX. Additional plugins
// can be written for the editor and are registered under ./functions/plugins


const myEditor = props => {
    
    const [editorState, setEditorState] = React.useState(EditorState.createEmpty());

    // Use the parent's ref if available otherwise use the vanilla one
    const editor = !! props.draftRef ? props.draftRef : React.useRef(null)

    // Focus the editor's textbox
    function focus() {
        editor.current.focus();
    }

    // Focus the editor when this component mounts
    React.useEffect(() => {
        focus()
    }, []);

    return (
        <div onClick={focus} style={{ border: '1px solid black', margin: 20, width: '100%', height: '100%' }}>
            <Editor
                ref={editor}
                editorState={editorState}
                onChange={editorState => setEditorState(editorState)}
            />
        </div>
    );
}

// myEditor.propTypes = {
//     ref: PropTypes.oneOfType([
//         PropTypes.func, 
//         PropTypes.shape({ current: PropTypes.instanceOf(Component) })
//     ]).isRequired
// }

export default myEditor



const DraftViewFC = props => {

    const editorRef = React.createRef()

    // const [state, setState] = useState({
    //     editorState: EditorState.createEmpty(),
    //     stylesheet: baseStyleMap
    // });

    /// OR,    
    const [editorState, setEditorState] = useState(EditorState.createEmpty);
    const [stylesheet, setStylesheet] = useState(baseStyleMap);
    const [blocks, setBlocks] = useState(convertToRaw(editorState.getCurrentContent()));
    const [code, setCode] = useState('I am code');

    onChange = nextEditorState => setState(nextEditorState)

    const handleKeyCommand = command => {
        console.log('command: ', command)
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

    // TODO: @Braden - If for save/publish, first include the CTRL button.  Leave out of MVP.
    const myKeyBindingFn = (event) => {
        const { hasCommandModifier } = KeyBindingUtil
        if (event.keyCode === 83 /* `S` key */ && hasCommandModifier(event)) { event.preventDefault(); return 'save' }
        if (event.keyCode === 80 /* `P` key */ && hasCommandModifier(event)) { event.preventDefault(); return 'publish' }
        return getDefaultKeyBinding(event)
    }

    render = () => {
        const { hidden } = props;
        const editorState = props.editorState;
        return <Box
            style={{ boxSizing: 'border-box', overflowY: 'hidden' }}
            display={hidden ? 'none' : 'flex'}
            flexGrow={1}
            flexDirection="column"
            alignItems="center"
            flexWrap="nowrap"
            bgcolor="background.paper"
        >
            <Box
                style={{ boxSizing: 'border-box' }}
                display="flex"
                width="100%"
            >
                <Toolbar forward={editorRef.current} />
            </Box>
            <Box
                style={{ overflowY: 'scroll' }}
                flexGrow={1}
                display="flex"
                width="100%"
                justifyContent="center"
            >
                <Box display="flex"
                    width={800}>
                    {!!editorState ? <Editor
                        ref={editorRef}
                        editorState={editorState}
                        customStyleMap={props.stylesheet}
                        onChange={onChange}
                        handleKeyCommand={handleKeyCommand}
                        // keyBindingFn={this.myKeyBindingFn}
                        plugins={plugins} /> : <div>Letters Could not be Loaded</div>}
                </Box>
            </Box>
        </Box>
    }
};

@inject('store')
@observer
class DraftView extends React.Component {

    editorRef = React.createRef()

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
        console.log('command: ', command)
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

    // TODO: @Braden - If for save/publish, first include the CTRL button.  Leave out of MVP.
    myKeyBindingFn(e) {
        // console.log('key binding()')
        const { hasCommandModifier } = KeyBindingUtil
        if (e.keyCode === 83 /* `S` key */ && hasCommandModifier(e)) { e.preventDefault(); return 'save' }
        if (e.keyCode === 80 /* `P` key */ && hasCommandModifier(e)) { e.preventDefault(); return 'publish' }
        return getDefaultKeyBinding(e)
    }

    render() {
        const { hidden } = this.props
        const editorState = this.state.editorState;
        return (
            <Box display={hidden ? 'none' : 'flex'} flexGrow={1} flexDirection="column" alignItems="center" flexWrap="nowrap" bgcolor="background.paper" style={{ boxSizing: 'border-box', overflowY: 'hidden' }} >
                <Box display="flex" width="100%" style={{ boxSizing: 'border-box' }} >
                    <Toolbar forward={this.editorRef.current} />
                </Box>
                <Box display="flex" flexGrow={1} width="100%" justifyContent="center" style={{ overflowY: 'scroll' }}>
                    <Box display="flex" width={800} >
                        {
                            !!editorState ?
                                <Editor
                                    ref={this.editorRef}
                                    editorState={editorState}
                                    customStyleMap={this.state.stylesheet}
                                    onChange={this.onChange}
                                    handleKeyCommand={this.handleKeyCommand}
                                    // keyBindingFn={this.myKeyBindingFn}
                                    plugins={plugins}
                                />
                                : <div>Letters Could not be Loaded</div>
                        }
                    </Box>
                </Box>
            </Box>
        )
    }
}

// export default myEditor
