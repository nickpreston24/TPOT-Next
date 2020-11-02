import { FC } from 'react';
import PseudoBox from '@chakra-ui/core/dist/PseudoBox';
import { Slots, Chip } from './Chip';

interface ChipSelectProps extends Partial<Slots> {
    onSelected: () => void;
}
/** A chip for Selecting Multiple Items */

export const ChipSelect: FC<ChipSelectProps> = (props) => {
    const { onDelete } = props;

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
            <Chip
            {...props}
            >{{
                title: "Test",
                // onDelete,
            }}</Chip>
        </PseudoBox>
    );
};
