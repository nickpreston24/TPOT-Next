import PropTypes from 'prop-types';
import React, { useEffect, useState } from "react";
import { observer, Provider } from 'mobx-react';
import { compose, withProps } from 'recompose';
import { Box, withStyles, Button } from '@material-ui/core'
import { BoldButton, ItalicButton, UnderlineButton, AlignLeftButton, AlignCenterButton, AlignRightButton, HeadingFourButton, HeadingThreeButton, ParagraphButton, NumberButton, BulletButton, IndentIcon, ColorTextButton, HighlightButton, Quotebutton, EmojiIcon, LinkButton, MoreButton, DividerButton } from './CustomButtons'
import { observable, toJS } from 'mobx';
import { RichUtils } from 'draft-js'
// import { Toolbar } from '../../index'
import FormatBoldIcon from '@material-ui/icons/FormatBold'

// export default props => {
//     return (
//         <Toolbar>
//             {
//                 // may be use React.Fragment instead of div to improve perfomance after React 16
//                 (externalProps) => (
//                     <Box width="100%" display="flex" flexDirection="row" overflow="hidden" mt="20px" mb="10px" p={4} border={1} borderColor="red">
//                         {/* <BoldButton {...externalProps} /> */}
//                         <BaseButton {...externalProps} />
//                         {/* <BaseButton {...externalProps} />
//                         <BaseButton {...externalProps} />
//                         <BaseButton {...externalProps} />
//                         <BaseButton {...externalProps} /> */}

//                         {/* <BoldButton {...externalProps} />
//                         <ItalicButton {...externalProps} />
//                         <UnderlineButton {...externalProps} />
//                         <CodeButton {...externalProps} />
//                         <Separator {...externalProps} />
//                         <HeadlinesButton {...externalProps} />
//                         <UnorderedListButton {...externalProps} />
//                         <OrderedListButton {...externalProps} />
//                         <BlockquoteButton {...externalProps} />
//                         <CodeBlockButton {...externalProps} /> */}
//                     </Box>
//                 )
//             }
//         </Toolbar>
//     )
// }

// const BaseButton = compose(

// )(
//     class BaseButton extends React.Component {
//         toggleStyle = event => {
//             event.preventDefault();
//             this.props.setEditorState(
//                 RichUtils.toggleInlineStyle(this.props.getEditorState(), 'BOLD')
//             );
//         };

//         preventBubblingUp = event => {
//             event.preventDefault();
//         };

//         // we check if this.props.getEditorstate is undefined first in case the button is rendered before the editor
//         styleIsActive = () =>
//             this.props.getEditorState &&
//             this.props
//                 .getEditorState()
//                 .getCurrentInlineStyle()
//                 .has('BOLD');

//         render() {
//             const { theme } = this.props;
//             const style = { minWidth: 40, minHeight: 40, color: this.styleIsActive() ? 'dodgerblue' : '#000' }
//             // const className = this.styleIsActive()

//             //   ? clsx(theme.button, theme.active)
//             //   : theme.button;
//             console.log(this.props)
//             return (
//                 <Box p={2} border={1} borderColor="green"
//                     // className={theme.buttonWrapper}
//                     style={style}
//                     onMouseDown={this.preventBubblingUp}
//                 >
//                     <Button
//                         // className={className}
//                         style={style}
//                         onClick={this.toggleStyle}
//                         type="button"
//                         children={<FormatBoldIcon />}
//                     />
//                 </Box>
//             );
//         }

//         // render() {
//         //     const { props } = this
//         //     console.log(props)
//         //     return (
//         //         <Button>
//         //             Testing
//         //         </Button>
//         //     )
//         // }
//     }
// )


const BaseButton = compose(
    observer
)(
    class BaseButton extends React.Component {

        preventBubblingUp = event => event.preventDefault()

        isActive = () => this.props.isActive(this)

        toggleEffect = event => {
            event.preventDefault()
            this.props.toggleEffect(this)
        }

        render() {
            const { theme } = this.props;
            const style = { minWidth: 40, minHeight: 40, color: this.isActive() ? 'dodgerblue' : '#000' }
            // const className = this.styleIsActive()

            //   ? clsx(theme.button, theme.active)
            //   : theme.button;
            // console.log(this.props)
            return (
                <Box p={2} border={1} borderColor="green"
                    // className={theme.buttonWrapper}
                    style={style}
                    onMouseDown={this.preventBubblingUp}
                >
                    <Button
                        // className={className}
                        style={style}
                        onClick={this.toggleEffect}
                        type="button"
                        children={<FormatBoldIcon />}
                    />
                </Box>
            );
        }

        // render() {
        //     const { props } = this
        //     console.log(props)
        //     return (
        //         <Button>
        //             Testing
        //         </Button>
        //     )
        // }
    }
)

// const createInlineStyleButton = config => props => {
//     const { type } = config
//     return {
//         ...config,
//         isActive: () => props.getEditorState().getCurrentInlineStyle().has(type),
//         toggleEffect: event => {
//             event.preventDefault()
//             props.setEditorState(
//                 RichUtils.toggleInlineStyle(
//                     props.getEditorState(),
//                     type
//                 )
//             );
//         }
//     }
// }

const makeInlineButton = config => ({
    isActive: _this =>
        _this.props.activeInlineStyles &&
        _this.props.activeInlineStyles.includes(config.type),
    toggleEffect: _this => {
        _this.props.setEditorState(
            RichUtils.toggleInlineStyle(
                _this.props.getEditorState(),
                config.type
            )
        )
    }
})

const generateButton = (config) => {
    console.log('make button', config)
    const externalProps = makeInlineButton(config)
    return withProps(externalProps)(BaseButton)
}

const OldButton = generateButton({
    type: 'BOLD',
    label: 'Bold',
    schema: 'inline',
    icon: FormatBoldIcon,
})



const Toolbar = props => {

    const { store } = props

    const getProps = store.getItem('getProps')
    const setEditorState = store.getItem('setEditorState')
    const getEditorState = store.getItem('getEditorState')
    const customStylePrefix = store.getItem('customStylePrefix')
    const customStyleFunctions = store.getItem('customStyleFunctions')

    const editorState = getEditorState()
    const activeInlineStyles = Array.from(editorState.getCurrentInlineStyle())
    const activeBlockStyle = RichUtils.getCurrentBlockType(editorState)
    // const activeInlineStyles = observable.box(Array.from(editorState.getCurrentInlineStyle()))
    // const activeBlockStyle = observable.box(RichUtils.getCurrentBlockType(editorState))

    // store.updateItem('activeInline', activeInlineStyles)
    // store.updateItem('activeBlock', activeBlockStyle)

    // class activeStylesStore {
    //     @observable inline = activeInlineStyles
    //     @observable block = activeBlockStyle
    // }

    // const activeStyles = new activeStylesStore()

    // const activeStyles = {
    //     inline: activeInlineStyles,
    //     block: activeBlockStyle,
    // }

    // console.log(activeInlineStyles)
    // console.log(activeBlockStyle)
    // isActive: () => props.getEditorState().getCurrentInlineStyle().has(type),
    // isActive: () => (RichUtils.getCurrentBlockType(props.getEditorState()) === type),

    const childProps = {
        getProps,
        setEditorState, getEditorState,
        customStylePrefix, customStyleFunctions,
        activeInlineStyles, activeBlockStyle
    }

    // const childProps = {
    //     getPlugins: store.getItem('getPlugins'),
    //     getProps: store.getItem('getProps'),
    //     setEditorState: store.getItem('setEditorState'),
    //     getEditorState: store.getItem('getEditorState'),
    //     customStylePrefix: store.getItem('customStylePrefix'),
    //     customStyleFunctions: store.getItem('customStyleFunctions'),
    // }

    // let [ childProps, setChildProps ] = useState({})

    // useEffect(() => {
    //     const { store } = props
    //     setChildProps({
    //         selection: store.getItem('selection'),
    //         getPlugins: store.getItem('getPlugins'),
    //         getProps: store.getItem('getProps'),
    //         setEditorState: store.getItem('setEditorState'),
    //         getEditorState: store.getItem('getEditorState'),
    //         customStylePrefix: store.getItem('customStylePrefix'),
    //         customStyleFunctions: store.getItem('customStyleFunctions'),
    //     })
    // }, []) // only once on mount

    console.log('toolbar render')
    // console.log(childProps)

    return (
        <Box width="100%" display="flex" flexDirection="row" overflow="hidden" mt="20px" mb="10px" p={4} border={1} borderColor="red">
            {/* <Provider inlineStyles={activeInlineStyles}> */}
            {/* <ActiveStylesProvider activeStyles={activeStyles}> */}
            {/* <OldButton {...childProps} />

            <OldButton {...childProps} />
                <OldButton {...childProps} />
                <OldButton {...childProps} />
                <OldButton {...childProps} />
                <OldButton {...childProps} />
                <OldButton {...childProps} />
                <OldButton {...childProps} />
                <OldButton {...childProps} />
                <OldButton {...childProps} />
                <OldButton {...childProps} />
                <OldButton {...childProps} />
                <OldButton {...childProps} />
                <OldButton {...childProps} />
                <OldButton {...childProps} />
                <OldButton {...childProps} /> */}

            {/* <BaseButton {...childProps} />
                <BaseButton {...childProps} />
                <BaseButton {...childProps} />
                <BaseButton {...childProps} />
                <BaseButton {...childProps} />
                <BaseButton {...childProps} />
                <BaseButton {...childProps} />
                <BaseButton {...childProps} />
                <BaseButton {...childProps} />
                <BaseButton {...childProps} />
                <BaseButton {...childProps} />
                <BaseButton {...childProps} />
                <BaseButton {...childProps} />
                <BaseButton {...childProps} />
                <BaseButton {...childProps} /> */}

            {/* <BoldButton {...childProps} />
                <BoldButton {...childProps} />
                <BoldButton {...childProps} />
                <BoldButton {...childProps} />
                <BoldButton {...childProps} />
                <BoldButton {...childProps} />
                <BoldButton {...childProps} />
                <BoldButton {...childProps} />
                <BoldButton {...childProps} /> */}
            {/* </ActiveStylesProvider> */}
            {/* </Provider> */}
            <BoldButton {...childProps} />
            <ItalicButton {...childProps} />
            <UnderlineButton {...childProps} />
            <ParagraphButton {...childProps} />
            <HeadingThreeButton {...childProps} />
            <HeadingFourButton {...childProps} />
            <ColorTextButton {...childProps} />
            <HighlightButton {...childProps} />
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

Toolbar.propTypes = {
    store: PropTypes.object.isRequired
}

export default compose(
    // observer
)(Toolbar)