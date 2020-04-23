import React from 'react'
import { richButtonsPlugin } from '../plugins'
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


// Create the visual characteristics of the button and map the parent schema's functionality to it

export const BaseButton = props => {
    // console.log(props)
    const { icon: SvgIcon, toggleInlineStyle, toggleBlockType, isActive, label, inlineStyle, onMouseDown } = props
    // console.log(props)
    return (
        <Tooltip title={label} TransitionComponent={Zoom} arrow>
            <Button
                onClick={!!toggleInlineStyle ? toggleInlineStyle : toggleBlockType}
                onMouseDown={onMouseDown}
                style={{ minWidth: 40, minHeight: 40, color: isActive ? 'dodgerblue' : '#000' }}
            >
                <SvgIcon />
            </Button>
        </Tooltip>
        // <Box
        //     onClick={toggleInlineStyle} onMouseDown={onMouseDown}
        //     color={isActive ? '#000' : '#777'}
        //     borderColor="red"
        //     border={1}
        //     minWidth={40}
        //     maxWidth={40}
        //     minHeight={40}
        //     maxHeight={40}
        //     display="flex"
        //     justifyContent="center"
        //     // p="24px"
        //     style={{ boxSizing: 'border-box'}}
        //     // overflow="hidden"
        // >
        //     <Box
        //         display="flex"
        //         flexDirection="column"
        //         justifyContent="center"
        //         flexGrow={1}
        //         minWidth={24}
        //         maxWidth={24}
        //         // minHeight={24}
        //         // maxHeight={24}
        //         border={1}
        //     >
        //         <SvgIcon />
        //     </Box>
        // </Box>
    )
}

// Pick a schema to create certain types of buttons. Schema is determined by config.type

export const generateButton = config => {
    const { icon, style, type = 'BorderedBox' , label, schema } = config
    // console.log({ icon, style, type, label, schema })
    if (!schema) return


    switch (schema) {
        case 'inline':
            return withProps({ children: <BaseButton {...{ icon }} /> })(richButtonsPlugin.createStyleButton({ style, label }))
        case 'block':
            return withProps({ children: <BaseButton {...{ icon }} /> })(richButtonsPlugin.createBlockButton({ type, label }))
        default:
            return <BaseButton {...{ icon }} />
    }

}

// Create all the custom Button exports for the module

export const BoldButton = generateButton({
    style: 'BOLD',
    label: 'Bold',
    schema: 'inline',
    icon: FormatBoldIcon,
})

export const ItalicButton = generateButton({
    style: 'ITALIC',
    label: 'Italic',
    schema: 'inline',
    icon: FormatItalicIcon,
})

export const UnderlineButton = generateButton({
    style: 'UNDERLINE',
    label: 'Underline',
    schema: 'inline',
    icon: FormatUnderlinedIcon,
})

export const DividerButton = generateButton({
    style: 'BOLD',
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
    style: 'BOLD',
    label: 'Color Text',
    schema: 'inline',
    icon: FormatColorTextIcon,
})

export const HighlightButton = generateButton({
    style: 'BOLD',
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
    style: 'BOLD',
    label: 'Emojis',
    schema: 'block',
    icon: EmojiEmotionsIcon,
})

export const LinkButton = generateButton({
    style: 'BOLD',
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

