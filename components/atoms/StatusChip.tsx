import { CheckoutStatus, CheckoutColors } from '../../constants/CheckoutStatus'
import { Chip } from '@material-ui/core'
import { FC } from 'react'
import { getKeyByValue } from '../../helpers'

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

// // An adapter method that converts our dash-delimited status values to strings our Enums and Labels can recognize
// const toTitleCase = (text: string, delimiter: string = ' ') => {
//     if (!text)
//         throw new Error('Text cannot be null')
//     let sentence = text.toLowerCase().split(delimiter)
//     for (let i = 0; i < sentence.length; i++) {
//         sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1)
//     }
//     return sentence.join(' ')
// }

export default StatusChip