import React from "react";
import { RichUtils } from 'draft-js'
import { compose } from 'recompose'
import { Box } from '@material-ui/core'
import PropTypes from 'prop-types'
import {
    BoldButton,
    ItalicButton,
    UnderlineButton,
    AlignLeftButton,
    AlignCenterButton,
    AlignRightButton,
    ColorsButton,
    HighlightsButton,
    HeadingFourButton,
    HeadingThreeButton,
    ParagraphButton,
    NumberButton,
    BulletButton,
    IndentIcon,
    ColorTextButton,
    HighlightButton,
    Quotebutton,
    EmojiIcon,
    LinkButton,
    MoreButton,
    DividerButton
} from './Buttons'


const Toolbar = props => {

    const { store } = props

    const getProps = store.getItem('getProps')
    const setEditorState = store.getItem('setEditorState')
    const getEditorState = store.getItem('getEditorState')
    const customStylePrefix = store.getItem('customStylePrefix')
    const customStyleFunctions = store.getItem('customStyleFunctions')

    const editorState = getEditorState()
    const activeInlineStyles = Array.from(editorState.getCurrentInlineStyle())
    const activeBlockStyle = RichUtils.getCurrentBlockType(editorState)

    const childProps = {
        getProps,
        setEditorState, getEditorState,
        customStylePrefix, customStyleFunctions,
        activeInlineStyles, activeBlockStyle
    }

    console.log('toolbar render')

    return (
        <Box width="100%" display="flex" flexDirection="row" overflow="hidden" mt="20px" mb="10px">
            <BoldButton {...childProps} />
            <ItalicButton {...childProps} />
            <UnderlineButton {...childProps} />
            <ParagraphButton {...childProps} />
            <HeadingThreeButton {...childProps} />
            <HeadingFourButton {...childProps} />
            <ColorsButton {...childProps} />
            <ColorTextButton {...childProps} />
            <HighlightsButton {...childProps} />
            <Quotebutton {...childProps} />
            {/* <LinkButton {...childProps} /> */}
            {/* <DividerButton {...childProps} /> */}
            {/* <MoreButton {...childProps} /> */}
            {/* <AlignLeftButton {...childProps} /> */}
            {/* <AlignCenterButton {...childProps} /> */}
            {/* <AlignRightButton {...childProps} /> */}
            {/* <IndentIcon {...childProps} /> */}
            {/* <NumberButton {...childProps} /> */}
            {/* <BulletButton {...childProps} /> */}
            {/* <EmojiIcon {...childProps} /> */}
        </Box>
    )
}

Toolbar.propTypes = {
    store: PropTypes.object.isRequired
}

export default Toolbar