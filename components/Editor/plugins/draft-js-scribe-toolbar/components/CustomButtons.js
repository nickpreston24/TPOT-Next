import React, { Component } from 'react'
import { Box, Button, Tooltip } from '@material-ui/core'
import { withProps } from 'recompose'
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
import { RichUtils } from 'draft-js'


// Create the visual characteristics of the button and map the parent schema's functionality to it

export const BaseButton = props => {
    
    const { icon: SvgIcon, toggleEffect, isActive, label } = props

    const active = isActive()

    return (
        <Tooltip title={label} TransitionComponent={Zoom} arrow>
            <Button
                onMouseDown={toggleEffect}
                style={{ minWidth: 40, minHeight: 40, color: active ? 'dodgerblue' : '#000' }}
            >
                <SvgIcon />
            </Button>
        </Tooltip>
    )
}

// Pick a schema to create certain types of buttons. Schema is determined by config.type

export const generateButton = config => props => {

    const { schema } = config
    let buttonProps = {}

    if (schema == 'inline') {
        buttonProps = createInlineStyleButton(config)(props)
    } else if (schema == 'block') {
        buttonProps = createBlockStyleButton(config)(props)
    }

    const Component = withProps(buttonProps)(BaseButton)
    return <Component {...props} />
}


//       SCHEMAS
////////////////////////////
// Makes props that will be wrapped with the BaseButton

const createInlineStyleButton = config => props => {
    const { type } = config
    return {
        ...config,
        isActive: () => props.getEditorState().getCurrentInlineStyle().has(type),
        toggleEffect: event => {
            event.preventDefault()
            props.setEditorState(
                RichUtils.toggleInlineStyle(
                    props.getEditorState(), 
                    type
                )
            );
        }
    }
}

const createBlockStyleButton = config => props => {
    const { type } = config
    return {
        ...config,
        isActive: () => (RichUtils.getCurrentBlockType(props.getEditorState()) === type),
        toggleEffect: event => {
            event.preventDefault();
            props.setEditorState(
                RichUtils.toggleBlockType(
                    props.getEditorState(),
                    type
                )
            );
        }
    }
}

// Create all the custom Button exports for the module

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
    type: 'BOLD',
    label: 'Color Text',
    schema: 'inline',
    icon: FormatColorTextIcon,
})

export const HighlightButton = generateButton({
    type: 'BOLD',
    label: 'Highlight Text',
    schema: 'inline',
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

