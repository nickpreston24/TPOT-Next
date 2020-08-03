import React from 'react'
import { Tooltip, Flex, Icon, Button, PseudoBox, Box, Heading, Text, Stack, Avatar, InputGroup, InputRightElement, Input, Switch, Divider } from '@chakra-ui/core'
import { disableMe, hideMe } from '../utils/disableMe'
import { isDev } from 'helpers'
import Router, { useRouter } from 'next/router'
import * as ROUTES from '@constants/routes'

import { CheckoutStatus } from '@constants'

import { scribeStore } from '@stores'

// This is the main component that will be rendered into Dashboard's "sidebar"
const Navbar = () => {

    let appButtons = appItems.slice(0, -1)
    let settingsProps = appItems.slice(-1)

    return (
        <Stack px={4} h="100%" w="100%" spacing={8}>
            <AppLogo />
            <NavbarGroup title="Apps">
                {appButtons.map((btn, idx) =>
                    <NavbarButton {...btn} key={idx} />
                )}
            </NavbarGroup>
            <NavbarGroup title="Actions">
                {actionItems.map((btn, idx) =>
                    <NavbarButton {...btn} key={idx} />
                )}
            </NavbarGroup>
            <Flex alignItems="flex-end" flexGrow={1} pb={4}>
                <SettingsButton {...settingsProps} />
            </Flex>
        </Stack>
    )
}

export default Navbar

// These options will always stay the same. Just a list of apps we can navigate to
const appItems = [
    // {
    //     icon: 'calendar',
    //     title: 'Dashboard',
    //     activationRoute: ROUTES.DASHBOARD,
    //     // style: disableMe(!isDev()), // Feature will come later, disable for now
    //     disable: isDev(),
    //     onClick: () => Router.push(ROUTES.DASHBOARD)
    // },
    {
        icon: 'scribe',
        title: 'Scribe',
        activationRoute: ROUTES.SCRIBE,
        onClick: () => Router.push(ROUTES.SCRIBE)
    },
    {
        // Settings should always be defined last
        icon: 'settings',
        title: 'Open Settings',
        activationRoute: ROUTES.SETTINGS,
        style: disableMe(!isDev()),
        onClick: () => Router.push(ROUTES.SETTINGS)
    },
]

// These options can change on a per-app or per-page basis. To be controlled 
// with a hook, useLayoutProps(), called by a NextJS /page/**  in the future.
const actionItems = [
    {
        icon: 'add',
        title: 'New',
        activationRoute: ROUTES.EDIT,
        toolTip: "Create a new Paper",
        onClick: () => {
            scribeStore.lastStatus = CheckoutStatus.NotStarted;
            Router.push(ROUTES.EDIT)
        }
    },
    // {
    //     icon: 'edit',
    //     title: 'Editor',
    //     activationRoute: ROUTES.DOC2,
    //     style: disableMe(!isDev()), // Feature will come later, disable for now
    //     onClick: () => alert('Back to current paper')
    //     // TODO function that returns to current document
    // },
    {
        icon: 'download',
        title: 'Checkout',
        toolTip: "Create an existing Paper",
        activationRoute: ROUTES.CHECKOUT,
        onClick: () => {
            scribeStore.lastStatus = CheckoutStatus.CheckedOut;
            Router.push(ROUTES.CHECKOUT)
        }
    },
    // {
    //     icon: 'search',
    //     title: 'Preview',
    //     style: disableMe(!isDev()), // Feature will come later, disable for now
    //     onClick: () => Router.push('/scribe/preview/[id]')
    //     // TODO function that routes to a letter previewed in a TPOT mockup
    // }
]


const AppLogo = () =>
    <Box minH={70} maxh={70} mb={8}>
        <Stack direction="row" align="center" pl={2} spacing={6} h="100%">
            <Icon name="toolbox" size={10} />
            <Heading fontSize="xl" color="gray.300">TPOT Toolbox</Heading>
        </Stack>
        <Divider borderColor="gray.500" mt="-1px" />
    </Box>


// Button that goes at the bottom. Very purple
const SettingsButton = props =>
    <Button
        w="100%"
        leftIcon="settings"
        variantColor="primary"
        isDisabled={props.disabled}
        onClick={props.onClick}
        fontWeight={300}
    >
        Settings
    </Button>


// A container with a title that groups a few buttons together
const NavbarGroup = props =>
    <Stack spacing={1} pb={6}>
        <Text fontSize="xs" color="gray.400" textDecoration="capitalize" pb={2}>{props.title}</Text>
        {props.children}
    </Stack>


// A custom (very purple) button for the Navbar / Sidebar
const NavbarButton = props => {
    const { icon, title, activationRoute, disable, toolTip, ...rest } = props

    const { route } = useRouter()
    const isActive = route === activationRoute

    return (
        <Tooltip aria-label="navbar-tooltip" label="Test">

            <PseudoBox
                onClick={props.onClick}
                pl={3} pr={6}
                as="button"
                height="52px"
                rounded="md"
                display="flex"
                alignItems="center"
                justifyContent="flex-start"
                outline="0 !important" // kill the hovering outline
                _hover={{ bg: "primary.700", cursor: disable ? 'not-allowed' : 'auto' }}
                bg={isActive ? "primary.700" : "none"}
            >
                <Icon color="primary.300" name={icon} />
                <Text fontSize="sm"
                    ml={4} flexGrow={1} textAlign="left"
                    color={isActive ? "#FFF" : "gray.400"}
                    fontWeight={isActive ? 500 : 400}
                >
                    {title}
                </Text>
            </PseudoBox>
        </Tooltip>
    )
}


