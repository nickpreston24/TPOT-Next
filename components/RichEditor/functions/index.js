import { ContentState, convertFromHTML, convertToRaw } from 'draft-js'
import { colorStyleMap } from '../styles'
import draftToHtml from 'draftjs-to-html';
import { toJS } from 'mobx'
import { EditorStateNotFoundError } from '../../Errors'

// TODO: Move to a constants.js
const draftToHtmlPrefix = "color-";

const focus = () => editorRef.current.focus()

const logState = editorState => {
    if (!editorState) throw new EditorStateNotFoundError()
    console.log("Current state:", editorState.toJS());
};

const transformInlineStyles = (rawContentState) => {

    // Get all avaialable color names:
    let currentColors = Object.keys(colorStyleMap)

    rawContentState.blocks
        .map(block => block.inlineStyleRanges
            // Filter the recolorized contents such that BOLD doesn't conflict with a color :
            .filter(range => currentColors.includes(range.style))
            // Rename the colors to be prefixed properly for compatibility with draftToHtml as inline styles
            .map(inlineStyle => {
                let styleName = inlineStyle.style;
                let foundStyle = colorStyleMap[styleName].color;
                let renamedInlineColor = draftToHtmlPrefix + foundStyle;
                inlineStyle.style = renamedInlineColor
            }));
}

/**
 * Generate EditorState from a given html string
 */
const getEditorStateFromHtml = (html = null) => {
    const blocksFromHTML = convertFromHTML(html);
    const state = ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap,
    );

    return EditorState.createWithContent(state);
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
    transformInlineStyles(rawContentState);
    return draftToHtml(rawContentState)
}

const getJsonFromRaw = editorState => {
    if (!editorState)
        throw new EditorStateNotFoundError()

    return JSON.stringify(convertToRaw(editorState.getCurrentContent()));
};

export {
    getEditorStateFromHtml,
    getJsonFromRaw,
    generateHtmlFromEditorState,
    focus,
    logState,

}