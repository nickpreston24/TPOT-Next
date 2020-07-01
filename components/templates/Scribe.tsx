import React, { FC } from 'react'
import { Button, Flex, Heading, Stack, Icon, ButtonProps } from '@chakra-ui/core'
import Layout from '../layout/Dashboard'
import SittingAtComputer from '../svg/SittingAtComputer'


type ScribeTemplateProps = {
    title?: string,
    /**
     * Props applied to the back arrow [`IconButton`](/api/icon-button/) component.
     */
    subtitle?: string,
    primaryButtonProps?: Partial<ButtonProps>,
    secondaryButtonProps?: Partial<ButtonProps>
}

const Template: FC<ScribeTemplateProps> = ({
    title,
    subtitle,
    primaryButtonProps,
    secondaryButtonProps
}) => {

    return (
        <Layout>
            <Stack align="center" spacing={8}>
                <Heading>{title}</Heading>
                <Flex w={400} h={400} justifyContent="center" alignItems="center">
                    <SittingAtComputer />
                </Flex>
                <Heading size="md">{subtitle}</Heading>
                <Stack align="center" direction="row" spacing={8}>
                    <Button {...primaryButtonProps}>
                        {primaryButtonProps.children && primaryButtonProps.children}
                    </Button>
                    <Button {...secondaryButtonProps}>
                        {secondaryButtonProps.children && secondaryButtonProps.children}
                    </Button>
                </Stack>
            </Stack>
        </Layout>
    )
}

export default Template