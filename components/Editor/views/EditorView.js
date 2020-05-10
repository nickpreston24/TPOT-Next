import React, { useState, useEffect } from 'react'
import { Box } from '@material-ui/core'
import OriginalDocxView from '../views/OriginalDocxView'
import BlocksView from '../views/BlocksView'
import DraftView from '../views/DraftView'
import CodeView from '../views/CodeView'
import { toClass } from 'recompose'
import PropTypes from 'prop-types'

// The <Editor /> component is wrapper class that meshes together a DraftJS
// editor plus several visualizers. Most of its methods are an abstraction
// of the editor's functions, but there are bonuses like mode switching.
// It should be able to be dropped into any application to get a clean draft
// editor with some nicer features. In our case, the <Editor /> component is
// instantiated and a reference is made by DocumentEditor, our shim for the
// editor inside Toolbox. Once a reference is made, you can call all the vanilla
// methods inside this class, set its initial state, and give it a function to
// save with, etc. This class and its children may always function in isolation.

// RESPONSIBILITY --> Multiple View Editor with Extra Abilitys:
// 
// └── this
//     ├── getCode
//     ├── getBlocks
//     ├── getOriginal
//     ├── getRawState
//     ├── getStylesheet
//     ├── getDraftEditor
//     ├── getEditorState
//     ├── setCode
//     ├── setBlocks
//     ├── setOriginal
//     ├── setStylesheet
//     ├── setEditorState
//     ├── handleSave
//     ├── handlePublish
//     └── handleDuplicate

const EditorView = props => {

    // Validate props
    const mode = props.mode || 'draft'
    const children = props.children || (() => <></>)
    const handleSave = props.handleSave || (() => null)
    const handlePublish = props.handlePublish || (() => null)
    const handleDuplicate = props.handleDuplicate || (() => null)

    // Use the parent's refs if available otherwise use internal ones
    const editorRef = props.editorRef || React.useRef(null) // Will return this component which contains Original, Code, Draft, etc.
    const draftRef = props.draftRef || React.useRef(null) // Will return the child, DraftView which contains the Vanilla DraftJS Editor

    const [code, setCode] = useState('');
    const [blocks, setBlocks] = useState({});
    const [original, setOriginal] = useState('');

    // REQUIRED:
    // Semantically define additional component properties on mount that are accessible by a parent referencing EditorView
    useEffect(() => {

        // _this contains Internal properties unique to this component, EditorView that we want publicly available
        let _this = {
            // Getters
            getCode: () => code,
            getBlocks: () => blocks,
            getOriginal: () => original,
            // Setters
            setCode: setCode,
            setBlocks: setBlocks,
            setOriginal: setOriginal,
        }

        // Pass up some properties from a referenced draftEditor as well if a actively filled draftRef has been supplied by the parent
        let _child_this = {}
        if (draftRef.current) {
            _child_this = {
                getRawState: () => draftRef.current.getRawState,
                getStylesheet: () => draftRef.current.getStylesheet,
                getEditorState: () => draftRef.current.getEditorState,
                getDraftEditor: () => draftRef.current,
                // Setters
                setEditorState: draftRef.current.setEditorState,
                setStylesheet: draftRef.current.setStylesheet,
                // Actions
                handleSave: draftRef.current.handleSave,
                handlePublish: draftRef.current.handlePublish,
                handleDuplicate: draftRef.current.handleDuplicate,
            }
        }


        // Map additional component properties to this reference
        editorRef.current = { ...editorRef.current, ..._this, ..._child_this }
    })

    // Additional props to pass to DraftView and other Views
    const states = {
        mode,
        code,
        original,
        blocks
    }
    const handles = {
        handleSave,
        handlePublish,
        handleDuplicate
    }

    // Map all props for the Stateless Functional Component on to the RenderedComponent which is a class component
    return (
        <RenderedComponent // <-- This guy is a class wrapped FC. The 'editorRef' is targeting this component
            ref={editorRef} // <-- Here is EditorView's ref. This is what DocumentEditor can see. This enables DocumentEditor to use
            // └── EditorView's internal functions, like getBlocks, getRawState, getCode, setOriginal, and setCode.
            draftRef={draftRef} // <-- The second ref, draftRef, gets passed down to DraftView in RenderedComponent's return statement.
            // └── This enables us to have access to DraftView's internal functions, like getEditorState and setStylesheet
            {...{ states, handles, children }} // <-- These are the props that each mode will inherit, most of them going to DraftView.
        />
    )
}

// Add Type Safety for Props
EditorView.propTypes = {
    mode: PropTypes.string,
    handleSave: PropTypes.func,
    handlePublish: PropTypes.func,
    handleDuplicate: PropTypes.func,
    children: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.object
    ]),
    editorRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({ current: PropTypes.object })
    ]),
    draftRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({ current: PropTypes.object })
    ])
}

export default EditorView



// RENDERED COMPONENT
//////////////////////////////////

// toClass() wrapps the FC up so that it can be used with references and have accessible methods (See Line: 96)
const RenderedComponent = toClass(({ draftRef, states, handles, children }) => {

    const { mode, code, original, blocks } = states

    return (
        <Box display="flex" flexGrow={1} height="100%" flexDirection="column" alignItems="center" flexWrap="nowrap" bgcolor="background.paper" style={{ boxSizing: 'border-box', overflowY: 'hidden' }} >
            <Box display="block" width="100%" height="100%" justifyContent="center" style={{ overflowX: 'hidden', overflowY: mode !== 'draft' ? 'scroll' : 'hidden' }}>
                <OriginalDocxView state={original} hidden={mode !== 'original'} />
                <DraftView draftRef={draftRef} hidden={mode !== 'draft'} {...handles} children={children} />
                {/* !IMPORTANT: These modes below all work, but will likely only be used by ADMINS */}
                <CodeView state={code} hidden={mode !== 'code'} />
                <BlocksView state={blocks} hidden={mode !== 'blocks'} />
            </Box>
            <Box display="flex" justifyContent="center" p={1}>
                {children}
            </Box>
        </Box>
    )

    // return (
    //     <Box display="flex" flexGrow={1} height="100%" flexDirection="column" alignItems="center" flexWrap="nowrap" bgcolor="background.paper" style={{ boxSizing: 'border-box', overflowY: 'hidden' }} >
    //         <Box display={mode === 'draft' ? 'flex' : 'block'} width="100%" height="100%" justifyContent="center" style={{ overflowX: 'hidden', overflowY: mode !== 'draft' ? 'scroll' : 'hidden' }}>
    //             <OriginalDocxView state={original} hidden={mode !== 'original'} />
    //             <DraftView draftRef={draftRef} hidden={mode !== 'draft'} {...handles} />
    //             {/* !IMPORTANT: These modes below all work, but will likely only be used by ADMINS */}
    //             <CodeView state={code} hidden={mode !== 'code'} />
    //             <BlocksView state={blocks} hidden={mode !== 'blocks'} />
    //         </Box>
    //         <Box display="flex" justifyContent="center" p={1}>
    //             {children}
    //         </Box>
    //     </Box>
    // )
})

RenderedComponent.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.object
    ]),
    states: PropTypes.shape({
        mode: PropTypes.string,
        code: PropTypes.string,
        original: PropTypes.string,
        blocks: PropTypes.object
    }),
    handles: PropTypes.shape({
        handleSave: PropTypes.func,
        handlePublish: PropTypes.func,
        handleDuplicate: PropTypes.func
    }),
    draftRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({ current: PropTypes.object })
    ])
}






























//     // Map all props onto the Stateless Functional Component
//     return (
//         <RenderedComponentFC
//             ref={editorRef}
//             draftRef={draftRef}
//             {...{ states, handles, children }}
//         />
//     )
// }

// // export default EditorView









// // RENDERED COMPONENT
// //////////////////////////////////

// // toClass() wrapps the FC up so that it can be used with references (See Line: 99)
// const RenderedComponentFC = toClass(({ draftRef, states, handles, children }) => {

//     const { mode, code, original, blocks } = states

//     return (
//         <DraftView draftRef={draftRef} />
//         // <Box display="flex" flexGrow={1} height="100%" flexDirection="column" alignItems="center" flexWrap="nowrap" bgcolor="background.paper" style={{ boxSizing: 'border-box', overflowY: 'hidden' }} >
//         //     <Box display={mode === 'draft' ? 'flex' : 'block'} width="100%" justifyContent="center" style={{ overflowX: 'hidden', overflowY: mode !== 'draft' ? 'scroll' : 'hidden' }}>
//         //         {/* <OriginalDocxView state={original} hidden={mode !== 'original'} /> */}
//         //         <DraftView draftRef={draftRef} hidden={mode !== 'draft'} {...handles} />
//         //         {/* <CodeView state={code} hidden={mode !== 'code'} />
//         //         <BlocksView state={blocks} hidden={mode !== 'blocks'} /> */}
//         //     </Box>
//         //     <Box display="flex" justifyContent="center" width="100%" style={{ boxSizing: 'border-box' }} p={1} boxShadow={3} borderColor="grey">
//         //         {children}
//         //     </Box>
//         // </Box>
//     )
// })





// // export default compose(
// //     observer
// // )(EditorView)

// // class EditorView extends React.Component {

// //     draftRef = React.createRef()

// //     state = {
// //         mode: 'draft',
// //         code: null,
// //     }

// //     set mode(mode) {
// //         this.setState({ mode })
// //     }

// //     get mode() {
// //         return this.state.mode
// //     }

// //     set editorState(editorState) {
// //         this.draftRef.current.editorState = editorState
// //     }

// //     get editorState() {
// //         return this.draftRef.current.editorState
// //     }

// //     set code(code) {
// //         this.setState({ code })
// //     }

// //     get code() {
// //         return this.state.code
// //     }

// //     set original(original) {
// //         this.setState({ original })
// //     }

// //     get original() {
// //         return this.state.original
// //     }

// //     set stylesheet(stylesheet) {
// //         this.draftRef.current.stylesheet = stylesheet
// //     }

// //     get stylesheet() {
// //         return this.draftRef.current.stylesheet
// //     }

// //     get blocks() {
// //         return !!this.draftRef.current ? this.draftRef.current.blocks : ''
// //     }

// //     render() {
// //         const { mode, code, draftRef, original, blocks } = this
// //         const { saveFn, children } = this.props

// //         return (
// //             <Box display="flex" flexGrow={1} height="100%" flexDirection="column" alignItems="center" flexWrap="nowrap" bgcolor="background.paper" style={{ boxSizing: 'border-box', overflowY: 'hidden' }} >
// //                 <Box display={mode === 'draft' ? 'flex' : 'block'} width="100%" justifyContent="center" style={{ overflowX: 'hidden', overflowY: mode !== 'draft' ? 'scroll' : 'hidden' }}>
// //                     <OriginalDocxView state={original} hidden={mode !== 'original'} />
// //                     <DraftView ref={draftRef} hidden={mode !== 'draft'} saveFn={saveFn} />
// //                     <CodeView state={code} hidden={mode !== 'code'} />
// //                     <BlocksView state={blocks} hidden={mode !== 'blocks'} />
// //                 </Box>
// //                 <Box display="flex" justifyContent="center" width="100%" style={{ boxSizing: 'border-box' }} p={1} boxShadow={3} borderColor="grey">
// //                     {children}
// //                 </Box>
// //             </Box>
// //         )
// //     }
// // }

// // export default EditorView
