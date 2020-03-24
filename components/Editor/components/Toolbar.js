import React, { Component } from 'react'
import { compose } from 'recompose'
import { Box, withStyles } from '@material-ui/core'
import { BoldButton, ItalicButton, UnderlineButton, AlignLeftButton, AlignCenterButton, AlignRightButton, HeadingFourButton, HeadingThreeButton, ParagraphButton, NumberButton, BulletButton, IndentIcon, ColorTextButton, HighlightButton, Quotebutton, EmojiIcon, LinkButton, MoreButton, DividerButton } from './CustomButtons'

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
                <Box border={1} p={0} width="100%" display="flex" flexDirection="row" overflow="scroll">
                    {/* <div className="myToolbar"> */}
                    {/* AlignLeftButton, AlignCenterButton, AlignRightButton, HeadingFourButton, HeadingThreeButton, ParagraphButton, NumberButton, BulletButton, IndentIcon, ColorTextButton, HighlightButton, EmojiIcon, LinkButton, MoreButton, HorizontalRuleButton */}
                        <BoldButton />
                        <ItalicButton />
                        <UnderlineButton />
                        <HeadingFourButton />
                        <ColorTextButton />
                        <HighlightButton />
                        <Quotebutton />
                        <LinkButton />
                        <DividerButton />
                        <MoreButton />
                        <AlignLeftButton />
                        <AlignCenterButton />
                        <AlignRightButton />
                        <IndentIcon />
                        <NumberButton />
                        <BulletButton />
                        <EmojiIcon />
                        <HeadingThreeButton />
                        <ParagraphButton />
                    {/* </div> */}
                </Box>
            )
        }
    }
)