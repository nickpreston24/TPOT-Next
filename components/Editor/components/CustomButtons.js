import React from 'react'
import { richButtonsPlugin } from '../functions/plugins'
import { Box, Button } from '@material-ui/core'
import { withProps } from 'recompose'
import FormatBoldIcon from '@material-ui/icons/FormatBold'
import FormatItalicIcon from '@material-ui/icons/FormatItalic'
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined'


// Create the visual characteristics of the button and map the parent schema's functionality to it

export const BaseButton = props => {
    // console.log(props)
    const { icon, toggleInlineStyle, isActive, label, inlineStyle, onMouseDown } = props
    return (
        // <a onClick={toggleInlineStyle} onMouseDown={onMouseDown}>
        // <span
        //     className={`fa fa-${iconName}`}
        //     title={title ? title : label}
        //     style={{ color: isActive ? '#000' : '#777' }}
        // />
        <Box 
            onClick={toggleInlineStyle} onMouseDown={onMouseDown}
            color={isActive ? '#000' : '#777'}
        >
            {label}
        </Box>
    )
}

// Pick a schema to creat certain types of buttons. Schema is determined by config.type

export const generateButton = config => {
    const { style, label, type } = config
    if ( !type ) return


    switch (type) {
        case 'inline':
            return withProps({ children: <BaseButton /> })(richButtonsPlugin.createStyleButton({ style, label }))
        case 'block':
            return withProps({ children: <BaseButton /> })(richButtonsPlugin.createBlockButton({ style, label }))
    }
    
}

// Create all the custom Button exports for the module

export const BoldButton = generateButton({
    style: 'BOLD',
    label: 'Bold',
    type: 'inline',
    icon: FormatBoldIcon,
})

export const ItalicButton = generateButton({
    style: 'ITALIC',
    label: 'Italic',
    type: 'inline',
    icon: FormatItalicIcon,
})

export const UnderlineButton = generateButton({
    style: 'UNDERLINE',
    label: 'Underline',
    type: 'inline',
    icon: FormatUnderlinedIcon,
})




