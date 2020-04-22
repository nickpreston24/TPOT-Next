import PropTypes from 'prop-types';
import React from "react";
import { observer } from 'mobx-react';
import { compose } from 'recompose';
import { Box, withStyles } from '@material-ui/core'
import { BoldButton, ItalicButton, UnderlineButton, AlignLeftButton, AlignCenterButton, AlignRightButton, HeadingFourButton, HeadingThreeButton, ParagraphButton, NumberButton, BulletButton, IndentIcon, ColorTextButton, HighlightButton, Quotebutton, EmojiIcon, LinkButton, MoreButton, DividerButton } from './CustomButtons'



class Toolbar extends React.Component {

    render() {

        const { props } = this
        const { store } = props

        const childProps = {
            selection: store.getItem('selection'),
            getPlugins: store.getItem('getPlugins'),
            getProps: store.getItem('getProps'),
            setEditorState: store.getItem('setEditorState'),
            getEditorState: store.getItem('getEditorState'),
            getReadOnly: store.getItem('getReadOnly'),
            setReadOnly: store.getItem('setReadOnly'),
            getEditorRef: store.getItem('getEditorRef')
        };

        return (
            <Box width="100%" display="flex" flexDirection="row" overflow="hidden" mt="20px" mb="10px">
                <BoldButton {...childProps} />
                <ItalicButton {...childProps} />
                <UnderlineButton {...childProps} />
                <ParagraphButton {...childProps} />
                <HeadingThreeButton {...childProps} />
                <HeadingFourButton {...childProps} />
                {/* <ColorTextButton {...childProps} /> */}
                {/* <HighlightButton {...childProps} /> */}
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

}

Toolbar.propTypes = {
    store: PropTypes.object.isRequired
}

export default compose(
    // observer
)(Toolbar)