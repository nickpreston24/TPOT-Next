import PseudoBox from '@chakra-ui/core/dist/PseudoBox'
import { FC } from 'react'
import { Chip, Slots } from './Chip'

interface ChipSelectProps extends Partial<Slots> {
  onSelected: () => void
}

export const ChipSelect: FC<ChipSelectProps> = (props) => {
  const { onDelete } = props

  return (
    <PseudoBox
      as='button'
      fontWeight='semibold'
      py={2}
      px={4}
      rounded='md'
      color='white'
      bg='blue.500'
      _active={{ bg: 'blue.700' }}
      _focus={{ boxShadow: 'outline' }}
    >
      <Chip {...props}>
        {{
          title: 'Test',
        }}
      </Chip>
    </PseudoBox>
  )
}
