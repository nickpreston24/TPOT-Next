import React from 'react'
import { Flex, Icon, Button, PseudoBox, Box, Heading, Text, Stack, Avatar, InputGroup, InputRightElement, Input, Switch, Divider } from '@chakra-ui/core'

const appItems = [
    {
        icon: 'calendar',
        title: 'Dashboard',
        onClick: () => { }
    },
    {
        icon: 'scribe',
        title: 'Scribe',
        active: true,
        onClick: () => { }
    },
]

const actionItems = [
    {
        icon: 'add',
        title: 'New',
        onClick: () => { }
    },
    {
        icon: 'edit',
        title: 'Editor',
        onClick: () => { }
    },
    {
        icon: 'download',
        title: 'Checkout',
        onClick: () => { }
    },
    {
        icon: 'search',
        title: 'Preview',
        onClick: () => { }
    }
]

const settings = [
    {
        icon: 'settings',
        title: 'Open Settings',
        onClick: () => { }
    },
]

const ListItem = ({ onClick, icon, title, active, ...rest }) => (
    <PseudoBox border="1p solid blue" _hover={{
        bg: "#6c63ff47",
        color: active ? "white" : "gray.400",
        borderRadius: "md",
        overflow: 'hidden',
    }}
    >
        <Stack {...rest} onClick={onClick} bg={active && "#6c63ff47"} pl={3} pr={6} height="48px" borderRadius="md" boxSizing="border-box" align="center" direction="row" spacing={4} >
            <Icon color="primary.300" name={icon} />
            <Text fontSize="sm" color={active ? "white" : "gray.400"}>{title}</Text>
        </Stack>
    </PseudoBox>
)

const MenuItems = ({ title, items }) => (
    <Stack spacing={1} pb={6}>
        <Text fontSize="xs" color="gray.400" textDecoration="capitalize" pb={2}>{title}</Text>
        {items.map((item, idx) => (
            <ListItem key={idx} {...item} />
        ))}
    </Stack>
)

const Navbar = ({ children }) => {

    return (
        <Stack px={4} h="100%" w="100%" spacing={8}>
            <Box minH={70} maxh={70} >
                <Stack direction="row" align="center" pl={2} spacing={6} h="100%">
                    <Icon name="toolbox" size={10}/>
                    <Heading fontSize="xl" color="gray.300">TPOT Toolbox</Heading>
                </Stack>
                <Divider borderColor="gray.500" mt="-1px" />
            </Box>
            <MenuItems title="Apps" items={appItems} />
            <MenuItems title="Actions" items={actionItems} />
            <Flex alignItems="flex-end" flexGrow={1} pb={4}>
                <Button variantColor="primary" leftIcon="settings" w="100%" fontWeight={300} onClick={() => alert('settings')}>Settings</Button>
            </Flex>
        </Stack>
    )
}

export default Navbar