import React from 'react'
import { Tooltip, Flex, Icon, Button, PseudoBox, Box, Heading, Text, Stack, Avatar, InputGroup, InputRightElement, Input, Switch, Divider } from '@chakra-ui/core'
import { disableMe, hideMe } from '../utils/disableMe'
import { isDev } from 'helpers'
import Router, { useRouter } from 'next/router'
import * as ROUTES from '../../constants/routes'
import { CheckoutStatus } from '../../constants'
import { scribeStore } from '../../stores'
import { NavbarButton, SettingsButton, ActionButton } from 'components/atoms'
import { SampleButtonCommand, NavbarCommand } from 'components/commands'

let routingCommand1 = new NavbarCommand(null, () => {
    alert("Pong")
    Router.push(ROUTES.CHECKOUT)
})

// This is the main component that will be rendered into Dashboard's "sidebar"
const Navbar = () => {

    let appButtons = appItems.slice(0, -1)
    let settingsProps = appItems.slice(-1)

    let command = new SampleButtonCommand(null);

    return (
        <Stack px={4} h="100%" w="100%" spacing={8}>
            <AppLogo />
            <ActionButton command={routingCommand1}>Command Test</ActionButton>
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
    <Box minH={70} maxHeight={70} mb={8}>
        <Stack direction="row" align="center" pl={2} spacing={6} h="100%">
            <Icon name="toolbox" fontSize={10} />
            <Heading fontSize="xl" color="gray.300">TPOT Toolbox</Heading>
        </Stack>
        <Divider borderColor="gray.500" mt="-1px" />
    </Box>

// A container with a title that groups a few buttons together
const NavbarGroup = props =>
    <Stack spacing={1} pb={6}>
        <Text fontSize="xs" color="gray.400" textDecoration="capitalize" pb={2}>{props.title}</Text>
        {props.children}
    </Stack>