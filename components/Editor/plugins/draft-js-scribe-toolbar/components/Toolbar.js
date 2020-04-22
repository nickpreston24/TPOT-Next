import PropTypes from 'prop-types';
import React from "react";
import { observer } from 'mobx-react';
import { compose } from 'recompose';
import { Box, withStyles } from '@material-ui/core'
import { BoldButton, ItalicButton, UnderlineButton, AlignLeftButton, AlignCenterButton, AlignRightButton, HeadingFourButton, HeadingThreeButton, ParagraphButton, NumberButton, BulletButton, IndentIcon, ColorTextButton, HighlightButton, Quotebutton, EmojiIcon, LinkButton, MoreButton, DividerButton } from './CustomButtons'



class Toolbar extends React.Component {

    render() {

        var _props = this.props,
            theme = _props.theme,
            store = _props.store;

        var childProps = {
            getEditorState: store.getItem('getEditorState'),
            setEditorState: store.getItem('setEditorState'),
            selection: store.getItem('selection'),
            onOverrideContent: this.onOverrideContent
        };

        return (
            <Box height="100%" width="100%" display="block" flexDirection="row" overflow="hidden" boxShadow={2}>
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