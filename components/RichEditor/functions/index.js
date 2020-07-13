import { ContentState, convertFromHTML, convertToRaw } from 'draft-js'
import { colorStyleMap } from '../styles'
import draftToHtml from 'draftjs-to-html'
import { toJS } from 'mobx'
import { EditorStateNotFoundError, ArgumentNullReferenceError } from '@Errors'

// TODO: Move to a constants.js
const draftToHtmlPrefix = 'color-'

const focus = () => editorRef.current.focus()

const logState = editorState => {
    if (!editorState) throw new EditorStateNotFoundError()
    console.log('Current state:', editorState.toJS())
}

const transformInlineStyles = (rawContentState) => {

    // Get all avaialable color names:
    let currentColors = Object.keys(colorStyleMap)

    rawContentState.blocks
        .map(block => block.inlineStyleRanges
            // Filter the recolorized contents such that BOLD doesn't conflict with a color :
            .filter(range => currentColors.includes(range.style))
            // Rename the colors to be prefixed properly for compatibility with draftToHtml as inline styles
            .map(inlineStyle => {
                let styleName = inlineStyle.style
                let foundStyle = colorStyleMap[styleName].color
                let renamedInlineColor = draftToHtmlPrefix + foundStyle
                inlineStyle.style = renamedInlineColor
            }))
}



// export const toggleBlockType = type => {
//     onChange(RichUtils.toggleBlockType(editorState, type));
// };

// export const toggleInlineStyle = type => {
//     onChange(RichUtils.toggleInlineStyle(editorState, type));
// };


/** For a given state, toggle the selection to the given color  */
export const toggleColor = (editorState, toggledColor = 'black') => {

    if (!editorState)
        throw new EditorStateNotFoundError()

    // console.log('toggled color:', toggledColor);

    const selection = editorState.getSelection()
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

    const currentStyle = editorState.getCurrentInlineStyle()

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

    return nextEditorState
}


/**
 * Generate EditorState from a given html string
 */
const getEditorStateFromHtml = (html = null) => {
    const blocksFromHTML = convertFromHTML(html)
    const state = ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap,
    )

    return EditorState.createWithContent(state)
}


/**
 * Generate the the Html from Draft state
 */
const generateHtmlFromEditorState = (editorState) => {
    if (!editorState)
        throw new EditorStateNotFoundError()

    /* Using draft-js-export-html: */

    // const contentState = editorState.getCurrentContent()
    // return stateToHTML(contentState);

    /* Using draftjs-to-html */

    const rawContentState = convertToRaw(editorState.getCurrentContent())
    // console.log('rawContentState', rawContentState);
    transformInlineStyles(rawContentState)
    return draftToHtml(rawContentState)
}

const getJsonFromRaw = editorState => {
    if (!editorState)
        throw new EditorStateNotFoundError()

    return JSON.stringify(convertToRaw(editorState.getCurrentContent()))
}

export {
    getEditorStateFromHtml,
    getJsonFromRaw,
    generateHtmlFromEditorState,
    focus,
    logState,

}