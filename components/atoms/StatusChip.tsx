import { CheckoutStatus, CheckoutColors } from '../../constants/CheckoutStatus'
import Chip from '@material-ui/core/Chip'
import { FC } from 'react'

type ChipProps = {
    status: CheckoutStatus
}

export const StatusChip: FC<ChipProps> = ({ status }) => {

    status = status || CheckoutStatus.NotStarted;

    let label = status || 'Unknown'
    const background = CheckoutColors.get(status) || '#777';

    return (
        <Chip {...{ label }} style={{ background }} />
    )
}

export default StatusChip