import React, { Component } from 'react'
import { compose } from 'recompose'
import { Box, withStyles } from '@material-ui/core'
// import { BoldButton, ItalicButton, UnderlineButton, AlignLeftButton, AlignCenterButton, AlignRightButton, HeadingFourButton, HeadingThreeButton, ParagraphButton, NumberButton, BulletButton, IndentIcon, ColorTextButton, HighlightButton, Quotebutton, EmojiIcon, LinkButton, MoreButton, DividerButton } from './CustomButtons'

import createRichButtonsPlugin from 'draft-js-richbuttons-plugin';

const richButtonsPlugin = createRichButtonsPlugin();

const {
    // inline buttons
    ItalicButton, BoldButton, MonospaceButton, UnderlineButton,
    // block buttons
    ParagraphButton, BlockquoteButton, CodeButton, OLButton, ULButton, H1Button, H2Button, H3Button, H4Button, H5Button, H6Button
} = richButtonsPlugin;

// Toolbar is a visual component that has buttons, and other information
// relevant to the draft editor. It requires the richButtonsPlugin and
// {other plugin names} to be instanced properly inside ../functions/plugins.


// SAME BUG: // BUG: https://github.com/jasonphillips/draft-js-richbuttons-plugin/issues/7
export const Toolbar = () =>
    (
        <div className="myToolbar">
            <BoldButton />
            <ItalicButton />
            <ULButton />
            <OLButton />
            <BlockquoteButton />
            <ParagraphButton />
            <MonospaceButton />
            <H1Button />
            <H2Button />
            <H3Button />
            <H4Button />
            <H5Button />
            <H6Button />
            <CodeButton />

        </div>
    )


// BUG: https://github.com/jasonphillips/draft-js-richbuttons-plugin/issues/7
export const ToolbarLegacy = compose(
    // withStyles(styles)
)(
    class Toolbar extends Component {

        render() {
            return (
                <Box height="100%" width="100%" display="flex" flexDirection="row" overflow="hidden" boxShadow={2}>
                    <BoldButton />
                    <ItalicButton />
                    <UnderlineButton />
                    {/* <HeadlineOneButton /> */}

                    <HeadingFourButton />
                    <HeadingThreeButton />
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
                    <ParagraphButton />
                </Box>
            )
        }
    }
)