import React, { useState, useEffect } from 'react'
import { Box, CircularProgress } from '@material-ui/core'
import Editor, { createEditorStateWithText } from 'draft-js-plugins-editor';
import { baseStyleMap } from '../functions/utilities'
import { inject, observer } from 'mobx-react'
import { EditorState, convertToRaw, getDefaultKeyBinding, usesMacOSHeuristics, isOptionKeyCommand, isCtrlKeyCommand, KeyBindingUtil, ContentState } from 'draft-js';
import { Toolbar } from '../components/Toolbar';
// import { RichEditor } from '../../RichEditor';


/** MP's Imports from RichEditor */
import { Modifier, RichUtils, convertFromRaw } from "draft-js";
import { useRef } from "react";
import { UnderConstruction } from '../../../pages/404'
// import { SubmitButton } from "./buttons/SubmitButton";

import {
    plugins
    , RedoButton
    , sampleEditorState
    , UndoButton
    , BlockStyleControls
    , InlineStyleControls
    , ColorPicker
    , getBlockStyle
} from '../plugins';
console.log('plugins', plugins);

import {
    generateHtmlFromEditorState
    , getJsonFromRaw
    , logState

} from '../../RichEditor/functions'

import styles, { colorStyleMap } from '../../RichEditor/styles'
import { ArgumentNullReferenceError } from "../../Errors";


// The <DraftView /> component is the primary view mode of the <EditorView /> It
// may also be used in a standalone app. All state managment is best done with
// React.setState() rather than something like Redux or MobX. Additional plugins
// can be written for the editor and are registered under ./functions/plugins

// RESPONSIBILITY --> Vanilla DraftJS Functionality:
// 
// └── this
//     ├── focus
//     ├── blur
//     ├── onChange
//     ├── editorState
//     ├── getStylesheet
//     ├── setStylesheet
//     ├── rawState
//     ├── handleSave
//     ├── handlePublish
//     ├── handleDuplicate
//     ├── keyCommands
//     ├── keyBindings
//     └── plugins

const DraftView = props => {

    // Validate props
    const hidden = props.hidden
    const handleSave = props.handleSave || (() => null)
    const handlePublish = props.handlePublish || (() => null)
    const handleDuplicate = props.handleDuplicate || (() => null)

    // Use the parent's ref if available otherwise use an internal one
    const draftRef = props.draftRef || React.useRef(null)

    //  Create minimum initial states
    const [editorState, setEditorState] = React.useState(EditorState.createEmpty())
    const [stylesheet, setStylesheet] = useState(baseStyleMap)

    // Focus the editor's textbox
    const focus = () => draftRef.current.focus()

    // De-Focus the editor's textbox
    const blur = () => draftRef.current.blur()

    // Convert ContentState to Blocks and Entity maps
    const rawState = () => convertToRaw(editorState.getCurrentContent())

    // Invoke high-level commands within the editor. hasCommandModifier will add
    // CTRL + (key) for Windows/Linux and CMD + (key) for Mac automatically
    const myKeyBindingFn = (event) => {
        const { hasCommandModifier } = KeyBindingUtil
        if (event.keyCode === 83 /* `S` key */ && hasCommandModifier(event)) { event.preventDefault(); return 'save' }
        if (event.keyCode === 80 /* `P` key */ && hasCommandModifier(event)) { event.preventDefault(); return 'publish' }
        if (event.keyCode === 68 /* `D` key */ && hasCommandModifier(event)) { event.preventDefault(); return 'duplicate' }
        return getDefaultKeyBinding(event)
    }

    // TODO @ MP - Merge the two handleKeys
    const handleKeyCommand = (command, state) => {
        console.info(`Editor Call Action --> ${command}`)
        if (command === 'save') { handleSave(); return 'handled'; }
        if (command === 'publish') { handlePublish(); return 'handled'; }
        if (command === 'duplicate') { handleDuplicate(); return 'handled'; }

        const nextState = RichUtils.handleKeyCommand(state, command);

        if (nextState) {
            onChange(nextState);
            return "handled";
        }

        return 'not-handled';
    }

    const toggleBlockType = type => {
        onChange(RichUtils.toggleBlockType(editorState, type));
    };

    const toggleInlineStyle = type => {
        onChange(RichUtils.toggleInlineStyle(editorState, type));
    };

    const onChange = nextstate => {
        setEditorState(nextstate);
    };

    // Focus / Blur the editor during mount and un-mount
    useEffect(() => {
        if (!!draftRef.current) {
            focus()
            return () => blur()
        }
    }, []);

    const toggleColor = (toggledColor) => {
        console.log('toggled color:', toggledColor);
        // console.log(editorState)
        const selection = editorState.getSelection();
        // console.log('selection: ', selection);

        const nextContentState = Object.keys(colorStyleMap)
            .reduce((contentState, color) => {
                // console.log('color', colorStyleMap[color].color);
                return Modifier.removeInlineStyle(contentState, selection, color)
            }, editorState.getCurrentContent())

        let nextEditorState = EditorState.push(
            editorState,
            nextContentState,
            'change-inline-style'
        )

        const currentStyle = editorState.getCurrentInlineStyle();

        // Unset the style override for the current color:
        if (selection.isCollapsed()) {
            // console.log('unset style.');
            nextEditorState = currentStyle.reduce((state, color) => {
                return RichUtils.toggleInlineStyle(state, color)
            }, nextEditorState)
        }

        // If the color is being toggled on, apply it.
        if (!currentStyle.has(toggledColor)) {
            // console.log('applied color!', currentStyle);
            nextEditorState = RichUtils.toggleInlineStyle(
                nextEditorState,
                toggledColor
            )
        }

        onChange(nextEditorState)
    };


    // REQUIRED:
    // Semantically define additional component properties on mount
    useEffect(() => {
        const _this = {
            // Getters
            getRawState: () => rawState,
            getStylesheet: () => stylesheet,
            getEditorState: () => editorState,
            // Setters
            setEditorState: setEditorState,
            setStylesheet: setStylesheet,
            // Actions:
            handleSave: handleSave,
            handlePublish: handlePublish,
            handleDuplicate: handleDuplicate,
        }
        // Map additional component properties to this reference
        draftRef.current = { ...draftRef.current, ..._this }
    }, [])

    const { root, content, controls } = styles;

    return (
        <Box display={hidden ? 'none' : 'flex'} flexGrow={1} height="100%" flexDirection="column" alignItems="center" flexWrap="nowrap" bgcolor="background.paper" style={{ boxSizing: 'border-box', overflowY: 'hidden' }} >
            {/* <Box display="flex" width="100%" style={{ boxSizing: 'border-box' }} >
                <Toolbar forward={draftRef.current} />
            </Box> */}
            <Box display="flex" width="100%" style={{ boxSizing: 'border-box' }} >

                <div style={controls}>
                    <BlockStyleControls
                        editorState={editorState}
                        onToggle={toggleBlockType}
                    />
                    <InlineStyleControls
                        editorState={editorState}
                        onToggle={toggleInlineStyle}
                    />

                    <ColorPicker
                        editorState={editorState}
                        onToggle={toggleColor}
                    />

                    {/* Universal controls */}
                    {/* <PrimaryButton onClick={clear}>Clear</PrimaryButton> */}
                    <UndoButton />
                    <RedoButton />
                </div>

            </Box>
            <Box
                display="flex" flexGrow={1} width="100%" justifyContent="center" style={{ overflowY: 'scroll' }}>
                <Box display="flex" width={800} >
                    <div
                        // className="RichEditor-root"
                        // style={root}
                    >
                        <Editor
                            ref={draftRef}
                            plugins={plugins}
                            onChange={onChange}
                            editorState={editorState}
                            customStyleMap={stylesheet}
                            keyBindingFn={myKeyBindingFn}
                            handleKeyCommand={handleKeyCommand}
                            placeholder={"Start typing to begin..."}

                            blockStyleFn={getBlockStyle}
                        />
                    </div>
                </Box>
            </Box>
        </Box>
    )
}

export default DraftView






























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
                        customStyleMap={stylesheet}
                        onChange={onChange}
                        handleKeyCommand={handleKeyCommand}
                        onFocus={logState(editorState)}
                        // keyBindingFn={this.myKeyBindingFn}
                        plugins={plugins} /> : <UnderConstruction message="Editor did not load properly" />}
                </Box>
            </Box>
        </Box>
    }
};

@inject('store')
@observer
class LegacyDraftView extends React.Component {

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
