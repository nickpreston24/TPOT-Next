import React from 'react'
import { Flex, Icon, Heading, Text, Stack, Avatar, InputGroup, InputRightElement, Input, Switch } from '@chakra-ui/core'

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
                    <Avatar size="sm" src="https://tinyurl.com/yde4dceq"/>
                </Stack>
                <Icon name="settings" size={5}/>
                <Switch color="primary" mt={1}/>
            </Stack>
        </Stack>
    )
}

export default Header