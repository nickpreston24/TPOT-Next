import React, { Component } from 'react'
import { Box, Button as MuiButton, Tooltip } from '@material-ui/core'
import { compose, withProps } from 'recompose'
import FormatBoldIcon from '@material-ui/icons/FormatBold'
import FormatItalicIcon from '@material-ui/icons/FormatItalic'
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined'
import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft'
import FormatAlignCenterIcon from '@material-ui/icons/FormatAlignCenter'
import FormatAlignRightIcon from '@material-ui/icons/FormatAlignRight'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import RemoveIcon from '@material-ui/icons/Remove';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import FormatColorTextIcon from '@material-ui/icons/FormatColorText';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import FormatIndentIncreaseIcon from '@material-ui/icons/FormatIndentIncrease';
import FormatSizeIcon from '@material-ui/icons/FormatSize';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import FormatQuoteIcon from '@material-ui/icons/FormatQuote';
import LinkIcon from '@material-ui/icons/Link';
import Zoom from '@material-ui/core/Zoom';
import { observer } from 'mobx-react'
import { observable } from 'mobx'
import { RichUtils } from 'draft-js'



// Create the visual characteristics of the button and map the parent schema's functionality to it

const BaseButton = compose(
    observer
)(
    props => {

        const preventBubblingUp = event => event.preventDefault()

        const isActive = () => props.isActive(props)

        const toggleEffect = event => {
            event.preventDefault()
            props.toggleEffect(props)
        }

        const { type, label, schema } = props
        const style = { minWidth: 40, minHeight: 40, color: isActive() ? 'dodgerblue' : '#000' }
        const Icon = props.icon

        return (

            <Box p={2} border={1} borderColor="green"
                // className={theme.buttonWrapper}
                style={style}
                onMouseDown={preventBubblingUp}
            >
                <Tooltip title={label} TransitionComponent={Zoom} arrow>
                    <MuiButton
                        // className={className}
                        style={style}
                        onClick={toggleEffect}
                        type="button"
                        children={<Icon />}
                    />
                </Tooltip>
            </Box >
        )
    }
)

class ReactiveIcon extends React.Component {
    shouldComponentUpdate() {
        return true
    }
    // shouldComponentUpdate(nextProps) {
    //     const { props } = this
    //     console.log(props.active !== nextProps.active)
    //     if (props.active !== nextProps.active) {
    //         return true
    //     } else {
    //         return false
    //     }
    // }

    render() {
        const { props } = this
        const { icon, toggleEffect, isActive, label } = props

        const Icon = props.icon

        // console.log('icon render')

        const active = true

        return (
            <Box p={2} border={1} borderColor="blue">
                <Icon style={{ color: active ? 'dodgerblue' : '#000' }} />
            </Box>
        )
    }
}


// //       SCHEMAS
// ////////////////////////////
// // Makes props that will be wrapped with the BaseButton

const createInlineStyleButton = config => ({
    isActive: props =>
        props.activeInlineStyles &&
        props.activeInlineStyles.includes(config.type),
    toggleEffect: props => {
        props.setEditorState(
            RichUtils.toggleInlineStyle(
                props.getEditorState(),
                config.type
            )
        )
    }
})


const createBlockStyleButton = config => ({
    isActive: props =>
        props.activeBlockStyle &&
        props.activeBlockStyle === config.type,
    toggleEffect: props => {
        props.setEditorState(
            RichUtils.toggleBlockType(
                props.getEditorState(),
                config.type
            )
        )
    }
})

const createCustomStyleButton = config => ({
    isActive: props => {
        const PREFIX = props.customStylePrefix
        const CUSTOM_PROP = config.type
        const CUSTOM_ATTRB = config.value
        const CUSTOM_NAME = `${PREFIX}${CUSTOM_PROP.toUpperCase()}_${CUSTOM_ATTRB}`
        return props.activeInlineStyles && props.activeInlineStyles.includes(CUSTOM_NAME)
    },
    toggleEffect: props => {
        const PREFIX = props.customStylePrefix
        const CUSTOM_PROP = config.type
        const CUSTOM_ATTRB = config.value
        const CUSTOM_NAME = `${PREFIX}${CUSTOM_PROP.toUpperCase()}_${CUSTOM_ATTRB}`
        // Register the custom style name in the editor's stylesheet before you apply it
        let customStyleMap = props.getProps().customStyleMap
        customStyleMap = Object.assign(customStyleMap, { [`${CUSTOM_NAME}`]: { [`${CUSTOM_PROP}`]: CUSTOM_ATTRB } })
        // Toggle the style using the attribute name (ex:  #FF0099, 24PX, LIME, etc.)
        props.setEditorState(
            props.customStyleFunctions[`${CUSTOM_PROP}`].toggle(
                props.getEditorState(),
                CUSTOM_ATTRB.toUpperCase()
            )
        )
    }
})


const generateButton = config => {

    const { schema } = config
    let externalProps = {}

    if (schema == 'inline') {
        externalProps = createInlineStyleButton(config)
    } else if (schema == 'block') {
        externalProps = createBlockStyleButton(config)
    } else if (schema == 'custom') {
        externalProps = createCustomStyleButton(config)
    }

    const ButtonWithEffect = withProps(externalProps)(BaseButton)
    return withProps(config)(ButtonWithEffect)

}


export const BoldButton = generateButton({
    type: 'BOLD',
    label: 'Bold',
    schema: 'inline',
    icon: FormatBoldIcon,
})

export const ItalicButton = generateButton({
    type: 'ITALIC',
    label: 'Italic',
    schema: 'inline',
    icon: FormatItalicIcon,
})

export const UnderlineButton = generateButton({
    type: 'UNDERLINE',
    label: 'Underline',
    schema: 'inline',
    icon: FormatUnderlinedIcon,
})

export const DividerButton = generateButton({
    type: 'BOLD',
    label: 'Divider',
    schema: 'block',
    icon: RemoveIcon,
})

export const AlignLeftButton = generateButton({
    type: 'header-four',
    label: 'Align Left',
    schema: 'block',
    icon: FormatAlignLeftIcon,
})

export const AlignCenterButton = generateButton({
    type: 'BOLD',
    label: 'Align Center',
    schema: 'block',
    icon: FormatAlignCenterIcon,
})

export const AlignRightButton = generateButton({
    type: 'BOLD',
    label: 'Align Right',
    schema: 'block',
    icon: FormatAlignRightIcon,
})

export const NumberButton = generateButton({
    type: 'BOLD',
    label: 'Numbered List',
    schema: 'block',
    icon: FormatListNumberedIcon,
})

export const BulletButton = generateButton({
    type: 'BOLD',
    label: 'Bullet List',
    schema: 'block',
    icon: FormatListBulletedIcon,
})

export const ParagraphButton = generateButton({
    type: 'paragraph',
    label: 'Paragraph',
    schema: 'block',
    icon: FormatSizeIcon,
})

export const HeadingFourButton = generateButton({
    type: 'header-four',
    label: 'Heading 4',
    schema: 'block',
    icon: FormatSizeIcon,
})

export const HeadingThreeButton = generateButton({
    type: 'header-three',
    label: 'Heading 3',
    schema: 'block',
    icon: FormatSizeIcon,
})

export const ColorTextButton = generateButton({
    value: '#FF0099',
    type: 'color',
    label: 'Color Text',
    schema: 'custom',
    icon: FormatColorTextIcon,
})

export const HighlightButton = generateButton({
    value: '#FF0099',
    type: 'background',
    label: 'Highlight Text',
    schema: 'custom',
    icon: BorderColorIcon,
})

export const Quotebutton = generateButton({
    type: 'blockquote',
    label: 'Block Quote',
    schema: 'block',
    icon: FormatQuoteIcon,
})

export const MoreButton = generateButton({
    type: 'BOLD',
    label: 'Extra Buttons',
    schema: 'block',
    icon: MoreHorizIcon,
})

export const IndentIcon = generateButton({
    type: 'indent',
    label: 'Indent',
    schema: 'block',
    icon: FormatIndentIncreaseIcon,
})

export const EmojiIcon = generateButton({
    type: 'BOLD',
    label: 'Emojis',
    schema: 'block',
    icon: EmojiEmotionsIcon,
})

export const LinkButton = generateButton({
    type: 'BOLD',
    label: 'Add Link',
    schema: 'block',
    icon: LinkIcon,
})


// { type: 'inline', label: 'Bold', style: 'BOLD', icon: <BoldIcon /> },
// { type: 'inline', label: 'Italic', style: 'ITALIC', icon: <ItalicIcon /> },
// { type: 'inline', label: 'Underline', style: 'UNDERLINE', icon: <UnderlineIcon /> },
// { type: 'block', label: 'Divider', style: 'blockquote', icon: <HorizontalRuleIcon /> },
// { type: 'inline', label: 'Left', style: 'BOLD', icon: <AlignLeftIcon /> },
// { type: 'block', label: 'Center', style: 'CENTER', icon: <AlignCenterIcon /> },
// { type: 'block', label: 'Number', style: 'ordered-list-item', icon: <NumberIcon /> },
// { type: 'block', label: 'Bullet', style: 'unordered-list-item', icon: <BulletIcon /> },
// { type: 'block', label: 'Heading', style: 'header-four', icon: <HeadingIcon /> },
// { type: 'inline', label: 'Color', style: 'COLOR', icon: <TextColorIcon /> },
// { type: 'block', label: 'Quote', style: 'blockquote', icon: <BlockQuoteIcon /> },
// { type: 'inline', label: 'More Options', style: null, icon: <MoreMenuIcon /> },
// { type: 'inline', label: 'Indent', style: 'INDENT', icon: <IndentIcon /> },
// { type: 'inline', label: 'Highlight', style: 'HIGHLIGHT', icon: <HighlightIcon /> },
// { type: 'inline', label: 'Emoji', style: 'EMOJI', icon: <EmojiIcon /> },

