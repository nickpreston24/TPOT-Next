import { FC } from 'react';
import { CheckoutStatus, CheckoutColors } from '../../../constants';
import MUIChip from '@material-ui/core/Chip';

type ChipStatusProps = {
    status: CheckoutStatus;
};
/** A colored chip for the Checkout Table statuses*/

export const ChipStatus: FC<ChipStatusProps> = ({ status }) => {

    status = status || CheckoutStatus.NotStarted;

    let label = status || 'Unknown';
    const background = CheckoutColors.get(status) || '#777';

    return (
        <MUIChip {...{ label }} style={{ background }} />
    );
};
