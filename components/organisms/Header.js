import React from 'react'
import { Box, Flex, Icon, Heading, Text, Button, Grid, Stack, Avatar, InputGroup, InputRightElement, Input, Switch } from '@chakra-ui/core'
import ScribeLogo from '@components/svg/ScribeLogo'

const Header = ({children}) => {

    return (
        <Stack direction="row" spacing={6} px={4} h="100%" w="100%" align="center" color="gray.600">
            <Stack direction="row" align="center" spacing={4}>
                <Icon name="scribe" size={8}/>
                <Heading size="lg" fontWeight={500}>Scribe</Heading>
            </Stack>
            <Flex w="100%" justify="center">
                <InputGroup w="100%" maxW={800}>
                    <InputRightElement children={<Icon name="search" />}/>
                    <Input variant="filled" placeholder="Search for letters" />
                </InputGroup>
            </Flex>
            <Stack direction="row" align="center" spacing={4}>
                <Stack direction="row" align="center" spacing={3}>
                    <Stack spacing={0} align="flex-end">
                        <Text fontSize="lg" >Braden</Text>
                    </Stack>
                    <Avatar size="sm" src="http://www.themes-lab.com/conbis/assets/images/avatars/avatar1.png"/>
                </Stack>
                <Icon name="settings" size={5}/>
                <Switch mt={1}/>
            </Stack>
        </Stack>
    )
}

export default Header