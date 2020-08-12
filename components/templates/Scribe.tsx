import React, { FC, ReactNode } from 'react'
import Button, { ButtonProps } from '@chakra-ui/core/dist/Button'
import Flex from '@chakra-ui/core/dist/Flex'
import Heading from '@chakra-ui/core/dist/Heading'
import Stack from '@chakra-ui/core/dist/Stack'
import Text from '@chakra-ui/core/dist/Text'

import Layout from '../layout/Dashboard'
import SplashScreen from '../svg/SittingAtComputer'

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

    return (
        <Layout>
            <Stack align="center" spacing={8} paddingTop={16}>
                <Heading fontWeight={300}>{title}</Heading>
                <Flex w={400} h={400} justifyContent="center" alignItems="center">
                    <SplashScreen />
                </Flex>
                <Text fontSize="lg">{subtitle}</Text>
                <Stack align="center" direction="row" spacing={6}>
                    <Button fontWeight="normal" {...primaryButtonProps} >
                        {primaryButtonProps.children}
                    </Button>
                    <Button fontWeight="normal" {...secondaryButtonProps} >
                        {secondaryButtonProps.children}
                    </Button>
                    {children}
                </Stack>
            </Stack>
        </Layout>
    )
}

export default Template