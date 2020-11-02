import React, { FC, ReactChild, ReactNode } from 'react'
import Text from '@chakra-ui/core/dist/Text'
import Flex from '@chakra-ui/core/dist/Flex'
import Box from '@chakra-ui/core/dist/Box'
import Button from '@chakra-ui/core/dist/Button'
import PseudoBox from '@chakra-ui/core/dist/PseudoBox'
import CloseButton from '@chakra-ui/core/dist/CloseButton'
import Badge from '@chakra-ui/core/dist/Badge'
import Stack from '@chakra-ui/core/dist/Stack'

type ChipProps = {
    children: ReactChild | Slots
}

export type Slots = {
    title: string
    subtitle?: string
    bg?: string
    color?: string

    onDelete?: Function

    avatar?: ReactNode
    badge?: ReactNode
}

/** A chakra Chip to replace MUI Chips */
export const Chip: FC<ChipProps> = (layout) => {

    const { children } = layout;

    if (!children)
        throw new Error('Children are required for this component.')

    if (areNamedSlots(children)) {

        let { title, subtitle, color, bg, onDelete, avatar, badge } = children

        // Default colors
        if (!color || !color.startsWith('#'))
            color = '#222'
        if (!bg || !bg.startsWith('#'))
            bg = '#eee'

        return (
            <Box
                color={color}
                bg={bg}
                m=".25rem"
                d="flex"
                borderRadius={'1.5rem'}
                alignItems="baseline"
            >
                {avatar && <div className="chip-avatar">{avatar}</div>}
                <Box
                    d="flex" flexDirection='column'
                    paddingLeft={5}
                    maxHeight="100px" // TODO: use media queries to limit height
                >
                    <Text>
                        {title}
                        {badge && <div className="chip-badge">{badge}</div>}
                    </Text>
                    {subtitle && <Text fontSize="sm">{subtitle}</Text>}
                </Box>
                {onDelete && <CloseButton onClick={() => onDelete()}>x</CloseButton>}
            </Box>
        )
    }
    else return <div className="chip">{children}</div>

}

export default Chip

// Helpers:
const isObject = <T extends object>(value: any): value is T => typeof value === 'object' && typeof value !== 'function' && value != undefined
const areNamedSlots = (children: any): children is Slots => isObject(children)
    && 'title' in children