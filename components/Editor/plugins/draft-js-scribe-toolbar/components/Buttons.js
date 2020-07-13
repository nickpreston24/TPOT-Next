import FormatBoldIcon from '@material-ui/icons/FormatBold'
import FormatItalicIcon from '@material-ui/icons/FormatItalic'
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined'
import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft'
import FormatAlignCenterIcon from '@material-ui/icons/FormatAlignCenter'
import FormatAlignRightIcon from '@material-ui/icons/FormatAlignRight'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import RemoveIcon from '@material-ui/icons/Remove'
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered'
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted'
import FormatColorTextIcon from '@material-ui/icons/FormatColorText'
import BorderColorIcon from '@material-ui/icons/BorderColor'
import FormatIndentIncreaseIcon from '@material-ui/icons/FormatIndentIncrease'
import FormatSizeIcon from '@material-ui/icons/FormatSize'
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions'
import FormatQuoteIcon from '@material-ui/icons/FormatQuote'
import LinkIcon from '@material-ui/icons/Link'
import { generateButton } from '../functions/generator'
import {
    ColorSwatch,
    ColorPalette,
    HighlightPalette
} from '../functions/parts'


/* ////////////////////////////////////////////////////// */
/*                     SINGLE FUNCTION                    */
/* ////////////////////////////////////////////////////// */

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


/* ////////////////////////////////////////////////////// */
/*                 GROUPED PALLETTE BUTTON                */
/* ////////////////////////////////////////////////////// */


export const HighlightsButton = generateButton({
    custom: true,
    type: 'background',
    label: 'Highlight',
    schema: 'inline',
    Palette: HighlightPalette, 
    icon: BorderColorIcon,
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
                    Element: ColorSwatch,
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
    Palette: ColorPalette, 
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
                    Element: ColorSwatch,
                })
            )
            return items
        }, [])
    )
})