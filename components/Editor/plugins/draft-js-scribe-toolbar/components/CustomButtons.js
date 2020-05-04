import React, { Component } from 'react'
import { Box, Button as MuiButton, Tooltip, Menu, MenuItem } from '@material-ui/core'
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



// The most common visual element in the toolbar. Renders a purely visual icon element
const IconButton = compose(
    observer
)(
    ({ isActive, icon }) => {
        const style = { minWidth: 40, minHeight: 40, color: isActive() ? 'dodgerblue' : '#000' }
        const Icon = icon
        return (
            <MuiButton
                style={style}
                type="button"
                children={
                    <Icon />
                }
            />
        )
    }
)


// The second most common visual element in the toolbar. Renders a IconButton + a Palette child
const GroupButton = compose(
    observer
)(
    ({ preventBubblingUp, group, options, childElement, elementProps, isActive: active, ...rest }) => {

        const [anchorEl, setAnchorEl] = React.useState(null);

        const handleOpen = event => setAnchorEl(event.currentTarget)
        const handleClose = () => setAnchorEl(null);

        const groupItems = group(options)

        const { type, label, schema, icon } = elementProps
        const menuOpened = Boolean(anchorEl)
        const ClickableElement = childElement
        const toggleEffect = handleOpen
        const childProps = rest

        const isActive = () => active(rest)

        const wrapperProps = { toggleEffect, preventBubblingUp, label }
        const clickableProps = { isActive, type, label, schema, icon }

        return <>
            <Box
                onMouseDown={preventBubblingUp}
                onClick={handleOpen}
            >
                <EffectWrapper {...wrapperProps}>
                    <ClickableElement {...clickableProps} />
                </EffectWrapper>
            </Box >
            {menuOpened && (
                <Menu
                    anchorEl={anchorEl}
                    keepMounted
                    open={menuOpened}
                    onClose={handleClose}
                >
                    {groupItems.map((ChildButton, index) => (
                        <MenuItem key={index}>
                            <ChildButton {...childProps} />
                        </MenuItem>
                    ))}
                </Menu>
            )}
        </>
    }
)


// Wraps up the generator's props to a clickable area. Renders a child inside, ex: IconButton, GroupButton, Palette, etc.
const EffectWrapper = compose(
    observer
)(
    ({ toggleEffect, preventBubblingUp, label, children }) => {
        const handleEffect = toggleEffect || (() => null)
        return (
            <Box
                onClick={handleEffect}
                onMouseDown={preventBubblingUp}
            >
                <Tooltip title={label} TransitionComponent={Zoom} arrow>
                    <Box>
                        {children}
                    </Box>
                </Tooltip>
            </Box >
        )
    }
)

// Gets props from the generator and based on the config, chooses which family of button to render and apply props to
const ActionWrappedButton = compose(
    observer
)(
    props => {

        const preventBubblingUp = event => event.preventDefault()

        const isActive = () => props.isActive(props)

        const toggleEffect = event => {
            event.preventDefault()
            props.toggleEffect(props)
        }

        const { type, label, schema, icon, group } = props

        const wrapperProps = {
            toggleEffect, preventBubblingUp, label, group
        }

        const elementProps = {
            isActive, type, label, schema, icon
        }

        if (group) {
            return (
                <GroupButton
                    {...{ ...props, ...wrapperProps }}
                    elementProps={elementProps}
                    childElement={IconButton}
                />
            )
        }

        return (
            <EffectWrapper {...wrapperProps}>
                <IconButton {...elementProps} />
            </EffectWrapper>
        )
    }
)

// class ReactiveIcon extends React.Component {
//     shouldComponentUpdate() {
//         return true
//     }
//     // shouldComponentUpdate(nextProps) {
//     //     const { props } = this
//     //     console.log(props.active !== nextProps.active)
//     //     if (props.active !== nextProps.active) {
//     //         return true
//     //     } else {
//     //         return false
//     //     }
//     // }

//     render() {
//         const { props } = this
//         const { icon, toggleEffect, isActive, label } = props

//         const Icon = props.icon

//         // console.log('icon render')

//         const active = true

//         return (
//             <Box p={2} border={1} borderColor="blue">
//                 <Icon style={{ color: active ? 'dodgerblue' : '#000' }} />
//             </Box>
//         )
//     }
// }


// A schema that creates the props needed for an [INLINE] button ('BOLD', 'ITALIC', etc.)
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

// A schema that creates the props needed for a [BLOCK] button ('heading-four', 'blockquote', etc.)
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

// A schema that creates the props needed for any group button where group is a function.
const createGroupButton = config => ({
    isActive: props => {

        let types = config.options

        // Override types names only for buttons created with the customStyles module
        if (config.custom) {
            types = config.options.map( option => `${props.customStylePrefix}${config.type.toUpperCase()}_${option}` )
        }

        if (config.schema === 'inline') {
            return props.activeInlineStyles &&
                props.activeInlineStyles.some( style => types.includes(style))
        }
        if (config.schema === 'block') {
            return props.activeBlockStyle &&
                types.some( type => props.activeBlockStyle === type )
        }
    }
})


// A schema that creates the props needed for a [CUSTOM] button
// !IMPORTANT! - Uses functions created at plugin initilization
// These functions are from the 'draft-js-custom-styles' library
// via createStyles(['font-size', 'color', 'background'], PREFIX)
// The result is an object, customStyleFunctions, which contains
// three sets of functions, { color, fontSize, and background }
// EX: The set called 'color', contains functions for toggling on
// and off a Draft InlineStyle. Example:
//
// customStyleFunctions.color.toggle(
//      editorState,
//      'CUSTOM_COLOR_#FF0099'
// )
//
// The schema below though handles as many cases as you want. When
// creating a button config, just put the name of the JSS property
// you want DraftJS to handle, as well as the value you want: EX:
// { type: 'backgroundColor', value: '#FF0099', ...rest of config }

const createCustomStyleButton = config => ({
    isActive: props => {
        const PREFIX = props.customStylePrefix // CONFIG
        const CSS_PROPERTY = config.type // color
        const CSS_VALUE = config.value // #FF0099
        const STYLE_NAME = `${PREFIX}${CSS_PROPERTY.toUpperCase()}_${CSS_VALUE}` // CUSTOM_COLOR_#FF0099
        return props.activeInlineStyles && props.activeInlineStyles.includes(STYLE_NAME)
    },
    toggleEffect: props => {
        console.log(props)
        const PREFIX = props.customStylePrefix // CONFIG
        const CSS_PROPERTY = config.type // color
        const CSS_VALUE = config.value // #FF0099
        const STYLE_NAME = `${PREFIX}${CSS_PROPERTY.toUpperCase()}_${CSS_VALUE}` // CUSTOM_COLOR_#FF0099

        // Register the custom style name in the editor's stylesheet before you apply it
        let customStyleMap = props.getProps().customStyleMap
        customStyleMap = Object.assign(customStyleMap,
            // Editor's customStyleMap
            {
                //  'BOLD': { fontWeight: 'bold' },
                //  'ITALIC': { fontStyle: 'italic' },
                //  'UNDERLINE': { textDecoration: 'underline' },
                [`${STYLE_NAME}`]: { [`${CSS_PROPERTY}`]: CSS_VALUE }
                //  ... etc.
            }
        )

        // Toggle the style using its stylesheet name (ex:  'CUSTOM_COLOR_#FF0099', 'CUSTOM_FONTSIZE_24PX', etc.)
        props.setEditorState(
            props.customStyleFunctions[`${CSS_PROPERTY}`].toggle(
                props.getEditorState(),
                CSS_VALUE.toUpperCase()
            )
        )
    }
})


const generateButton = config => {

    const { schema, group } = config
    let parentProps = {}

    if (group) {
        parentProps = createGroupButton(config)
    } else if (schema == 'inline') {
        parentProps = createInlineStyleButton(config)
    } else if (schema == 'block') {
        parentProps = createBlockStyleButton(config)
    } else if (schema == 'custom') {
        parentProps = createCustomStyleButton(config)
    }

    const ButtonWithEffects = withProps(parentProps)(ActionWrappedButton)
    return withProps(config)(ButtonWithEffects)

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


export const HighlightsButton = generateButton({
    custom: true,
    type: 'background',
    label: 'Color Text',
    schema: 'inline',
    icon: FormatColorTextIcon,
    options: [
        '#FFFFFF', '#FFF4A3', '#FFA3D5', '#A3D4FF', '#BDFFA3'
    ],
    group: options => (
        options.reduce((items, value) => {
            items.push(
                generateButton({
                    value: value,
                    type: 'background',
                    label: `Highlight ${value}`,
                    schema: 'custom',
                    icon: FormatQuoteIcon,
                })
            )
            return items
        }, [])
    )
})

export const ColorsButton = generateButton({
    custom: true,
    type: 'color',
    label: 'Color Text',
    schema: 'inline',
    icon: FormatColorTextIcon,
    options: [
        '#000000', '#660000', '#990066', '#FFC000', '#00DBA8',
        '#660066', '#336600', '#FFFFFF', '#6033F1', '#0000FF',
        '#E00000', '#000099', '#ED7D31', '#0080FF', '#717171'
    ],
    group: options => (
        options.reduce((items, value) => {
            items.push(
                generateButton({
                    value: value,
                    type: 'color',
                    label: `Color ${value}`,
                    schema: 'custom',
                    icon: FormatQuoteIcon,
                })
            )
            return items
        }, [])
    )
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

