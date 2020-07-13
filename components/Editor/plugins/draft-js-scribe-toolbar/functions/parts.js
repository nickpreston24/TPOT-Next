import React from 'react'
import { Box, Button as MuiButton, Tooltip, Popover } from '@material-ui/core'
import { compose } from 'recompose'
import { observer } from 'mobx-react'
import Zoom from '@material-ui/core/Zoom'


/* --------------------- ICON BUTTON -------------------- */

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


/* -------------------- GROUP BUTTON -------------------- */

// The second most common visual element in the toolbar. Renders a IconButton + a Palette child
const GroupButton = compose(
    observer
)(
    ({ preventBubblingUp, group, options, childElement, elementProps, Palette, isActive: active, ...rest }) => {

        const [anchorEl, setAnchorEl] = React.useState(null)

        const handleOpen = event => setAnchorEl(event.currentTarget)
        const handleClose = () => setAnchorEl(null)

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
                <Popover
                    keepMounted
                    open={menuOpened}
                    onClose={handleClose}
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                >
                    <Box display="relative" width="100%" height={10} bgcolor='#21304a' />
                    <Palette>
                        {groupItems.map((ChildButton, index) => (
                            <ChildButton key={index} {...childProps} />
                        ))}
                    </Palette>
                </Popover>
            )}
        </>
    }
)


/* -------------------- COLOR SWATCH -------------------- */

// The most common visual element in the toolbar. Renders a purely visual icon element
export const ColorSwatch = compose(
    observer
)(
    ({ isActive, value }) => {
        const active = isActive()
        const style = { color: active ? 'dodgerblue' : '#000', boxSizing: 'border-box' }
        return (
            <Box
                style={style}
                p={0}
                m={0}
                boxShadow={active ? 3 : 1}
                border={active ? 2 : 0.3}
                borderColor="lightgrey"
                minHeight={22}
                minWidth={22}
                maxHeight={22}
                maxWidth={22}
                bgcolor={value}
                borderRadius="50%"
            />
        )
    }
)


/* -------------------- COLOR PALETTE ------------------- */

// The most common visual element in the toolbar. Renders a purely visual icon element
export const ColorPalette = compose(
    observer
)(
    ({ children }) => {
        const style = { overflow: 'show' }
        let childrenArray = React.Children.toArray(children)
        let row1 = childrenArray.splice(0, 5)
        let row2 = childrenArray.splice(0, 5)
        let row3 = childrenArray.splice(0, 5)

        const ChildRow = ({ rowChildren }) => (
            <Box
                height={30}
                justifyContent="space-evenly"
                alignItems="center"
                display="flex"
                width="100%"
            >
                {rowChildren.map((child, index) => (
                    <Box
                        key={index}
                        display="flex"
                    >
                        {child}
                    </Box>
                ))}
            </Box>
        )
        return (
            <Box
                style={style}
                height={100}
                width={165}
                p={1}
                mb={0.75}
                flexWrap="wrap"
                alignContent="flex-end"
                display="flex"
            >
                <ChildRow rowChildren={row1} />
                <ChildRow rowChildren={row2} />
                <ChildRow rowChildren={row3} />
            </Box>
        )
    }
)


/* ------------------ HIGHLIGHT PALETTE ----------------- */

// The most common visual element in the toolbar. Renders a purely visual icon element
export const HighlightPalette = compose(
    observer
)(
    ({ children }) => {
        const style = { overflow: 'show' }
        let childrenArray = React.Children.toArray(children)

        const ChildRow = ({ rowChildren }) => (
            <Box
                height={30}
                justifyContent="space-evenly"
                alignItems="center"
                display="flex"
                width="100%"
            >
                {rowChildren.map((child, index) => (
                    <Box
                        key={index}
                        display="flex"
                    >
                        {child}
                    </Box>
                ))}
            </Box>
        )
        return (
            <Box
                style={style}
                height={35}
                width={165}
                p={1}
                mb={0.75}
                flexWrap="wrap"
                alignContent="flex-end"
                display="flex"
            >
                <ChildRow rowChildren={childrenArray} />
            </Box>
        )
    }
)


/* ------------------- EFFECT WRAPPER ------------------- */

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


/* ----------------- MAIN ACTION BUTTON ----------------- */

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

        const { value, type, label, schema, icon, group, Element } = props

        const wrapperProps = {
            toggleEffect, preventBubblingUp, label, group
        }

        const elementProps = {
            isActive, value, type, label, schema, icon
        }

        if (Element) {
            return (
                <EffectWrapper {...wrapperProps}>
                    <Element {...elementProps} />
                </EffectWrapper>
            )
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

export default ActionWrappedButton
