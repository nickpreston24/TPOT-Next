import React from 'react'
import { Flex, Icon, Box, Heading, Text, Stack, Divider } from '@chakra-ui/core'
import { disableMe } from '../utils/disableMe'
import { isDev } from 'helpers'
import Router from 'next/router'
import * as ROUTES from '../../constants/routes'
import { NavbarButton, SettingsButton } from 'components/atoms'
import { scribeRemote, appRemote } from 'components/commands'

// This is the main component that will be rendered into Dashboard's "sidebar"
const Navbar = () => {

    // These options will always stay the same. Just a list of apps we can navigate to
    const appItems = [
        // {
        //     icon: 'calendar',
        //     title: 'Dashboard',
        //     disable: isDev(),
        //     onClickFn: () => appRemote.GotoDashboard()
        // },
        {
            icon: 'scribe',
            title: 'Scribe',
            toolTip: 'Scribe',
            onClickFn: () => appRemote.GotoScribe()
        },
        {
            // Settings should always be defined last
            icon: 'settings',
            title: 'Open Settings',
            toolTip: "Edit your Settings",
            style: disableMe(!isDev()),
            onClickFn: () => appRemote.OpenSettings()
        },
    ]

    // These options can change on a per-app or per-page basis. To be controlled 
    // with a hook, useLayoutProps(), called by a NextJS /page/**  in the future.
    const actionItems = [
        {
            icon: 'add',
            title: 'New',
            toolTip: "Create a new Paper",
            onClickFn: () => scribeRemote.CreateNew()
        },
        {
            icon: 'download',
            title: 'Checkout',
            toolTip: "Edit an existing Paper",
            onClickFn: () => scribeRemote.Checkout()
        },
    ]

    let appButtons = appItems.slice(0, -1)
    let settingsProps = appItems.slice(-1)

    isDev() && console.log('settingsProps', settingsProps)

    return (
        <Stack
            px={4}
            spacing={8}
            // width={["100%", .75, .25, 0.15]}
            border="5px lime dotted"
        >
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