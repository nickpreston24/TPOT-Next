import React, { FC, ReactNode } from 'react'
import { Button, Flex, Heading, Box, Stack, Input, Icon, Text, Link, ButtonProps, useTheme, Divider } from '@chakra-ui/core'
import Layout from '../layout/Dashboard'
import NextLink from 'next/link'
import SplashScreen from '../svg/MonitorDashboard'
import * as ROUTES from '../../constants/routes'


type ScribeTemplateProps = {
    title?: string,
    subtitle?: string,
    children: ReactNode,
    primaryButtonProps?: Partial<ButtonProps>,
    secondaryButtonProps?: Partial<ButtonProps>
}

const Template: FC<ScribeTemplateProps> = ({
    title = 'Enter a Title',
    subtitle = 'Enter a Subtitle',
    children,
    primaryButtonProps = {
        children: 'Primary',
        variantColor: 'primary',
        variant: 'outline'
    },
    secondaryButtonProps = {
        children: 'Secondary',
        variantColor: 'primary',
        variant: 'outline'
    }
}) => {

    const theme = useTheme()
    const gradient = `linear-gradient(135deg, ${theme.colors["gray"][900]} 0%, ${theme.colors["gray"][700]} 100%)`

    const GetStartedLink = (
        <NextLink href={ROUTES.SCRIBE}>
            <a>{'Go to Dashboard'}</a>
        </NextLink>
    )
    const PathOfTruthLink = (
        <Link href={"https://www.thepathoftruth.com"} isExternal color="blue.500">
            {"The Path of Truth"} <Icon name="external-link" mx="2px" />
        </Link>
    )

    return (
        <Flex id="frame"
            style={{ background: gradient }} justifyContent="center" alignItems="center" position="absolute" height="100%" width="100%">
            <Stack h="100%" w="100%" maxW={1200} maxH={700} overflow="hidden" direction="row-reverse" spacing={0} bg="primary.600" borderRadius="lg" shadow="2xl" >
                <Flex h="100%" w={1 / 3} alignItems="center" >
                    <Stack width="100%" spacing={3} px={16}>
                        <Heading color="gray.100" >Sign In</Heading>
                        <Divider m={10} mx={0} />
                        <Input variant="outline" placeholder="Email" />
                        <Input variant="outline" placeholder="Password" />
                        <Button mt={6} fontWeight={400} variantColor="primary" color="white" variant="outline" >Lets Go!</Button>
                        {/* < */}
                    </Stack>
                </Flex>
                <Flex h="100%" w={2 / 3} alignItems="flex-start" bg="gray.100">
                    <Stack width="100%" align="center" spacing={3} px={16}>
                        <Flex w={600} h={500} justifyContent="center" alignItems="center">
                            <SplashScreen />
                        </Flex>
                        <Heading color="gray.700" >TPOT Toolbox</Heading>
                        <Heading fontWeight={400} color="gray.700" size="md">
                            {'A Collection of tools for '}
                            {PathOfTruthLink}
                        </Heading>
                        <Button mt={6} fontWeight={400} variantColor="primary" children={GetStartedLink} />
                    </Stack>
                </Flex>
            </Stack>


            {/* <Stack w="100%" spacing={0} align="center" direction="row" border="1px solid blue" >
                <Stack h="100%" w={2 / 3} bg="primary.700" align="center" border="1px solid red">
                    <Heading color="white" >TPOT</Heading>
                    <Heading color="white" >Toolbox</Heading>
                    <Flex w={800} alignItems="center">
                        <SplashScreen />
                    </Flex>
                    <Box>
                        <Button variantColor="primary" fontWeight={400} >This is a Button</Button>
                    </Box>
                </Stack>
                <Flex h="100%" w={1 / 3} minW={500} bg="gray.100">Test</Flex>

            </Stack> */}


            {/* <Flex id="navbar" height="100%" minW={260} maxW={260} bg="dark.700" color="white" transition="width 0.3s ease-in-out 0s" overflow="hidden" whiteSpace="nowrap">
                <Navbar />
            </Flex>
            <Flex id="content" flexGrow={1} bg="gray.100" flexDirection="column" overflow="hidden">
                <Flex id="header" minH={70} h={70} bg="white" boxShadow="sm">
                    <Header />
                </Flex>
                <Box id="content" flexGrow={1} w="100%" p={4} overflowY="scroll" pt={16}>
                    {children}
                </Box>
            </Flex> */}
        </Flex>
        // <Layout>
        //     {/* <Stack align="center" spacing={8}>
        //         <Heading fontWeight={300}>{title}</Heading>
        //         <Flex w={400} h={400} justifyContent="center" alignItems="center">
        //             <SittingAtComputer />
        //         </Flex>
        //         <Text fontSize="lg">{subtitle}</Text>
        //         <Stack align="center" direction="row" spacing={6}>
        //             <Button fontWeight="normal" {...primaryButtonProps} >
        //                 {primaryButtonProps.children}
        //             </Button>
        //             <Button fontWeight="normal" {...secondaryButtonProps} >
        //                 {secondaryButtonProps.children}
        //             </Button>
        //             {children}
        //         </Stack>
        //     </Stack> */}
        // {/* </Layout> */}
    )
}

export default Template