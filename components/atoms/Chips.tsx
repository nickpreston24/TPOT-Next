import { FC, ReactChild, ReactNode } from 'react'
import { CheckoutStatus, CheckoutColors } from '../../constants/CheckoutStatus'
import MUIChip from '@material-ui/core/Chip'
import Text from '@chakra-ui/core/dist/Text'
import Flex from '@chakra-ui/core/dist/Flex'
import Avatar from '@chakra-ui/core/dist/Avatar'
import PseudoBox from '@chakra-ui/core/dist/PseudoBox'
import Box from '@chakra-ui/core/dist/Box'
import Button from '@chakra-ui/core/dist/Button'
import { notify } from 'components/Toasts'

type ChipProps = {
    status: CheckoutStatus
}

export const StatusChip: FC<ChipProps> = ({ status }) => {

    status = status || CheckoutStatus.NotStarted;

    let label = status || 'Unknown'
    const background = CheckoutColors.get(status) || '#777';

    return (
        <MUIChip {...{ label }} style={{ background }} />
    )
}

interface SelectionProps extends Partial<Slots> {
    onSelected: () => void
}

/** A chip for  */
export const SelectChip: FC<SelectionProps> = (props) => {
    const { onSelected, title, onDelete } = props

    return (
        // Todo: Put the PseudoBox inside <Chip>'s children as a slotted outer render component (render prop?), using a pattern: https://medium.com/@martin_hotell/react-children-composition-patterns-with-typescript-56dfc8923c64
        <PseudoBox
            as="button"
            fontWeight="semibold"
            py={2}
            px={4}
            rounded="md"
            color="white"
            bg="blue.500"
            _active={{ bg: "blue.700" }}
            _focus={{ boxShadow: "outline" }}
        >
            <Chip>{{
                title: "Test",
                onDelete,
            }}</Chip>
        </PseudoBox>
    )
}

type Props = {
    children: ReactChild | Slots
}

type Slots = {
    title: string
    subtitle?: string
    bg?: string
    color?: string

    onDelete?: Function

    avatar?: ReactNode
    badge?: ReactNode
}

/** A chakra Chip to replace MUI Chips */
export const Chip: FC<Props> = (layout) => {

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
            <Flex>
                {avatar && <div className="chip-avatar">{avatar}</div>}
                <Box ml="3" color={color} bg={bg}>
                    <Text fontWeight="bold">
                        {title}
                        {badge && <div className="chip-badge">{badge}</div>}
                    </Text>
                    {subtitle && <Text fontSize="sm">{subtitle}</Text>}
                </Box>
                {onDelete && <Button onClick={() => onDelete()}>x</Button>}
            </Flex>)
    }
    else return <div className="chip">{children}</div>

}

export default Chip

// Helpers:
const isObject = <T extends object>(value: any): value is T => typeof value === 'object' && typeof value !== 'function' && value != undefined
const areNamedSlots = (children: any): children is Slots => isObject(children)
    && 'title' in children