import React from 'react'
import { Button, Flex, Heading, Stack, Icon } from '@chakra-ui/core'
import Layout from '../layout/Dashboard'
import SittingAtComputer from '../svg/SittingAtComputer'

const Template = () => {

    return (
        <Layout>
            <Stack align="center" spacing={8}>
                <Heading>Welcome to Scribe</Heading>
                <Flex w={400} h={400} justifyContent="center" alignItems="center">
                    <SittingAtComputer />
                </Flex>
                <Heading size="md">What would you like to do first?</Heading>
                <Stack align="center" direction="row" spacing={8}>
                    <Button color="#FFFFFF" bg="#6C63FF">Checkout a paper</Button>
                    <Button color="#6C63FF" variant="outline">Start from scratch</Button>
                </Stack>
            </Stack>
        </Layout>
    )
}

export default Template