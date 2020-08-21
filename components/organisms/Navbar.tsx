import React from 'react'
import Flex from '@chakra-ui/core/dist/Flex'
import Icon from '@chakra-ui/core/dist/Icon'
import Box from '@chakra-ui/core/dist/Box'
import Heading from '@chakra-ui/core/dist/Heading'
import Text from '@chakra-ui/core/dist/Text'
import Stack from '@chakra-ui/core/dist/Stack'
import Divider from '@chakra-ui/core/dist/Divider'
import { disableMe } from '../utils/disableMe'
import { isDev } from 'helpers'
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

    let appButtons = appItems
    let settingsProps = appItems.slice(-1)

    isDev() && console.log('settingsProps', settingsProps)

    return (
        <Stack
            px={4}
            spacing={8}
            width="100%"
        // border="5px lime dotted"
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
                <SettingsButton
                    onClickFn={() => appRemote.OpenSettings()}
                    {...settingsProps} />
            </Flex>
        </Stack>
    )
}

export default Navbar

const AppLogo = () =>
    <Box
        h={{ base: 70, sm: 10, md: 35, lg: 100 }}
        mb={8}
    >
        <Stack
            direction="row"
            align="center" pl={2}
            spacing={{ base: 6, sm: 3 }}
            h="100%">
            <Heading fontSize={{ base: "xl", sm: "sm", lg: 'lg' }} color="gray.300">Toolbox</Heading>
            <Icon name="toolbox" fontSize={{ base: 70, sm: 25, md: 60, lg: 45 }} />
        </Stack>
        <Divider borderColor="gray.500" mt="-1px" />
    </Box>

// A container with a title that groups a few buttons together
const NavbarGroup = props =>
    <Stack
        spacing={1}
        pb={6}
    >
        <Text
            fontSize={{ base: "md", sm: "sm", lg: 'lg' }}
            color="gray.400"
            textDecoration="capitalize"
            pb={2}>{props.title}
        </Text>
        {props.children}
    </Stack>