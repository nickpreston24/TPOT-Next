import React from 'react'
import { Box, Button as MuiButton, Tooltip, Menu, MenuItem } from '@material-ui/core'
import { compose } from 'recompose'
import Zoom from '@material-ui/core/Zoom';
import { observer } from 'mobx-react'


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


/* --------------------- MAIN BUTTON -------------------- */

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

export default ActionWrappedButton
