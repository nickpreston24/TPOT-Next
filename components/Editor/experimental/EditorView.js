import React, { useState, useEffect, forwardRef, useRef, useCallback } from 'react'
import { Box } from '@material-ui/core'
import OriginalDocxView from '../experimental/OriginalDocxView'
import BlocksView from '../experimental/BlocksView'
import DraftView from '../experimental/DraftView'
import CodeView from '../experimental/CodeView'
import { compose, toClass, flattenProp, withHandlers, withState, lifecycle } from 'recompose'
import { observer } from 'mobx-react'
import { Editor, EditorState } from 'draft-js'

// The <Editor /> component is wrapper class that meshes together a DraftJS
// editor plus several visualizers. Most of its methods are an abstraction
// of the editor's functions, but there are bonuses like mode switching.
// It should be able to be dropped into any application to get a clean draft
// editor with some nicer features. In our case, the <Editor /> component is
// instantiated and a reference is made by DocumentEditor, our shim for the
// editor inside Toolbox. Once a reference is made, you can call all the vanilla
// methods inside this class, set its initial state, and give it a function to
// save with, etc. This class and its children may always function in isolation.





const EditorView = props => {

    const editorRef = !!props.editorRef ? props.editorRef : React.useRef(null) // Will return this component which contains Original, Code, Draft, etc.
    const draftRef = !!props.draftRef ? props.draftRef : React.useRef(null) // Will return the child which contains the Vanilla Draft Editor

    // const editorRef = !!ref ? ref : React.useRef(null) // Will return this component which contains Original, Code, Draft, etc.
    // const draftRef = React.useRef(null) // Will return the child which contains the Vanilla Draft Editor

    // This component's local properties will be accessible under editorRef.props
    const handlers = {
        test: 'cat',
        render() {
            console.log('yeah!')
        }
    }

    return (
        <RenderedComponent
            ref={editorRef}
            draftRef={draftRef}
            {...{ handlers }}
        />
    )
}

export default EditorView


// RENDERED COMPONENT

// toClass() wrapps the FC up so that it can be used with references
const RenderedComponent = toClass(({ draftRef }) => {
    return (
        <Box width="100%" height="100%" m={8}>
            <DraftView draftRef={draftRef} />
        </Box>
    )
})






// const enhance = compose(
//     withState('position', 'setPos', 'relative'),
//     withHandlers({
//         isTop: ({ setPos }) => () => {
//             console.log('Enhanced!')
//             // const { top } = ref && ref.getBoundingClientRect()
//             // top && setPos(top <= 0 ? 'fixed' : 'relative')
//         },
//     }),
//     // lifecycle({
//     //     componentDidMount() {
//     //         if (this.props.subscribe) {
//     //             this.props.subscribe(this.props)
//     //         }
//     //     }
//     // })
// )

// function EditorView(props) {

//     useEffect(() => {
//         props.subscribe({
//             kittens: 'test'
//         })
//     })

//     return (
//         <p>Test!</p>
//     )
// }

// export default enhance(EditorView)







// function EditorView(props) {

//     const ref = useRef(ref)

//     // const [mode, setMode] = useState('draft');

//     function hello() {
//         console.log('test')
//     }

//     const hellosavey = () => {
//         console.log('hello')
//     }

//     const meetingsAreCool = useCallback((a, b) => {
//         // do something with a, b and props.x
//     }, [props.x]);

//     // Provide subscribing parent this functional component's properties
//     useEffect(() => {
//         console.log('MOUNTED EDITOR')
//         const properties = {
//             ref: ref,
//             props: props,
//             state: {
//                 chicken: 'test'
//             },
//             handlers: {
//                 useEffect,
//                 hello,
//                 hellosavey,
//                 meetingsAreCool
//             }
//         }
//         if (!!props.subscribe) {
//             props.subscribe(properties)
//             console.log(properties)
//         }
//     }, [props.subscribe])

//     return (
//         <div ref={ref}>
//             <p>test!</p>
//         </div>
//     )

// }

// export default EditorView






// function EditorView() {
//     // const [editorState, setEditorState] = React.useState(
//     //   EditorState.createEmpty()
//     // );

//     function hello() {
//         console.log('hello!')
//     }

//     // const editor = React.useRef(null);

//     // function focusEditor() {
//     //   editor.current.focus();
//     // }

//     // React.useEffect(() => {
//     //   focusEditor()
//     // }, []);

//     return (
//         <p>Test Me!</p>
//     //   <div onClick={focusEditor}>
//     //     <Editor
//     //       ref={editor}
//     //       editorState={editorState}
//     //       onChange={editorState => setEditorState(editorState)}
//     //     />
//     //   </div>
//     );
//   }

// export default toClass(EditorView)






// const EditorView = compose(
//     toClass,
//     withState('counter', 'setCounter', 0),
//     withHandlers({
//       increment: ({ setCounter }) => () => setCounter(n => n + 1),
//       decrement: ({ setCounter }) => () =>  setCounter(n => n - 1),
//       reset: ({ setCounter }) => () => setCounter(0)
//     })
// )((props, ref) => {
//     console.log('stateless props', props)

//     const [mode, setMode] = useState('draft');

//     const meetingsAreCool = useCallback((a, b) => {
//         // do something with a, b and props.x
//     }, [props.x]);

//     return (
//         <p>Test!</p>
//     )
// })

// export default EditorView


// const EditorView = (props, ref) => {
//     console.log('stateless props', props)

//     const [mode, setMode] = useState('draft');

//     const meetingsAreCool = useCallback((a, b) => {
//         // do something with a, b and props.x
//     }, [props.x]);

//     return (
//         <p>Test! {props.counter}</p>
//     )
// }

// export default compose(
//     withState('counter', 'setCounter', 0),
//     withHandlers({
//         increment: ({ setCounter }) => () => setCounter(n => n + 1),
//         decrement: ({ setCounter }) => () => setCounter(n => n - 1),
//         reset: ({ setCounter }) => () => setCounter(0)
//     }),
//     // toClass,
// )(EditorView)

// export default EditorView





// export default compose(
//     observer
// )(EditorView)

// class EditorView extends React.Component {

//     draftRef = React.createRef()

//     state = {
//         mode: 'draft',
//         code: null,
//     }

//     set mode(mode) {
//         this.setState({ mode })
//     }

//     get mode() {
//         return this.state.mode
//     }

//     set editorState(editorState) {
//         this.draftRef.current.editorState = editorState
//     }

//     get editorState() {
//         return this.draftRef.current.editorState
//     }

//     set code(code) {
//         this.setState({ code })
//     }

//     get code() {
//         return this.state.code
//     }

//     set original(original) {
//         this.setState({ original })
//     }

//     get original() {
//         return this.state.original
//     }

//     set stylesheet(stylesheet) {
//         this.draftRef.current.stylesheet = stylesheet
//     }

//     get stylesheet() {
//         return this.draftRef.current.stylesheet
//     }

//     get blocks() {
//         return !!this.draftRef.current ? this.draftRef.current.blocks : ''
//     }

//     render() {
//         const { mode, code, draftRef, original, blocks } = this
//         const { saveFn, children } = this.props

//         return (
//             <Box display="flex" flexGrow={1} height="100%" flexDirection="column" alignItems="center" flexWrap="nowrap" bgcolor="background.paper" style={{ boxSizing: 'border-box', overflowY: 'hidden' }} >
//                 <Box display={mode === 'draft' ? 'flex' : 'block'} width="100%" justifyContent="center" style={{ overflowX: 'hidden', overflowY: mode !== 'draft' ? 'scroll' : 'hidden' }}>
//                     <OriginalDocxView state={original} hidden={mode !== 'original'} />
//                     <DraftView ref={draftRef} hidden={mode !== 'draft'} saveFn={saveFn} />
//                     <CodeView state={code} hidden={mode !== 'code'} />
//                     <BlocksView state={blocks} hidden={mode !== 'blocks'} />
//                 </Box>
//                 <Box display="flex" justifyContent="center" width="100%" style={{ boxSizing: 'border-box' }} p={1} boxShadow={3} borderColor="grey">
//                     {children}
//                 </Box>
//             </Box>
//         )
//     }
// }

// export default EditorView
