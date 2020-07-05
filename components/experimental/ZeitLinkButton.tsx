import React, { FC, Component } from 'react'
import Button, { ButtonProps } from '@material-ui/core/Button'
import Link, { LinkProps } from 'next/link'
import { Button as ChakraButton } from '@chakra-ui/core'


/**
 * We need to Omit from the MUI Button the {href} prop
 * as we have to handle routing with Next.js Router
 * so we block the possibility to specify an href.
 * Src: https://gist.github.com/herr-vogel/0b5d4f3c28f08dc6cc4a2fd4f7b4a4df
 */

export type ButtonLinkProps = Omit<ButtonProps, 'href' | 'classes'> &
    Pick<LinkProps, 'href' | 'as' | 'prefetch'>

export const ButtonLink = React.forwardRef<ButtonLinkProps, any>(
    ({ href = '/', as = '/', prefetch, ...props }, ref) => (
        <Link href={href} as={as} prefetch={prefetch} passHref>
            <Button ref={ref} {...props} />
        </Link>
    )
)

ButtonLink.displayName = 'ButtonLink'

interface ZeitLinkProps {
    className?: string
    href: string
    as?: string
    text: string
    onClick: () => void
}

// // https://material-ui.com/demos/buttons/#third-party-routing-library
export const ZeitLinkButton: FC<ZeitLinkProps> = ({
    onClick, text, className, href, as, children
}) => (
        <Button
            text={text}
            onClick={onClick}
            component={ButtonLink}
            className={className}
            as={as}
            href={href}>
            {children}
        </Button>)

export default ZeitLinkButton