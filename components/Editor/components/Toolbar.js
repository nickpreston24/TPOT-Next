import React, { Component } from 'react'
import { compose } from 'recompose'
import { Box, withStyles } from '@material-ui/core'
import { BoldButton, ItalicButton, UnderlineButton } from './CustomButtons'

// Toolbar is a visual component that has buttons, and other information
// relevant to the draft editor. It requires the richButtonsPlugin and
// {other plugin names} to be instanced properly inside ../functions/plugins.

// console.log(CustomButtons)

export const Toolbar = compose(
    // withStyles(styles)
)(
    class Toolbar extends Component {

        render() {
            // const { BoldButton, ItalicButton, H2Button, CustomButton } = CustomButtons
            return (
                <Box border={1} p={2}>
                    <div className="myToolbar">
                        <BoldButton {...{forward: this.props.forward}}/>
                        <ItalicButton {...{forward: this.props.forward}}/>
                        <UnderlineButton {...{forward: this.props.forward}}/>
                    </div>
                </Box>
            )
        }
    }
)