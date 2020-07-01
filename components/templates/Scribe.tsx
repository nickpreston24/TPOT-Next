import React, { FC, ReactChild, ReactNode } from 'react'
import { Button, Flex, Heading, Stack, Icon, ButtonProps } from '@chakra-ui/core'
import Layout from '../layout/Dashboard'
import SittingAtComputer from '../svg/SittingAtComputer'


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
            <Stack align="center" spacing={8}>
                <Heading>{title}</Heading>
                <Flex w={400} h={400} justifyContent="center" alignItems="center">
                    <SittingAtComputer />
                </Flex>
                <Heading size="md">{subtitle}</Heading>
                <Stack align="center" direction="row" spacing={6}>
                    <Button {...primaryButtonProps}>
                        {primaryButtonProps.children}
                    </Button>
                    <Button {...secondaryButtonProps}>
                        {secondaryButtonProps.children}
                    </Button>
                    {children}
                </Stack>
            </Stack>
        </Layout>
    )
}

export default Template