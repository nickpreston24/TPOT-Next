import { CheckoutStatus, CheckoutColors } from '../constants/session-statuses'
import { Chip } from '@material-ui/core'
import { FC } from 'react'

interface ChipProps {
    status: string
}

const StatusChip: FC<ChipProps> = (props: ChipProps) => {

    const { status } = props
    let [key] = getKeyByValue(CheckoutStatus, toTitleCase(status, '-')) as string
    let label = CheckoutStatus[key]// || 'unknown'
    const background = CheckoutColors.get(label)// || '#777'

    return (
        <Chip {...{ label }} style={{ background }} />
    )
}

const getKeyByValue: any = (obj: any, value: string) => Object.entries(obj).find(([, name]) => value === name)

// An adapter method that converts our dash-delimited status values to strings our Enums and Labels can recognize
const toTitleCase = (text: string, delimiter: string = ' ') => {
    let sentence = text.toLowerCase().split(delimiter)
    for (let i = 0; i < sentence.length; i++) {
        sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1)
    }
    return sentence.join(' ')
}

// const toPascalCase = (word: string) =>
//     word.replace(/(\w)(\w*)/g, // split into word character groups
//         (group1, group2) =>
//             group1.toUpperCase() + group2.toLowerCase()) // make second group(s) uppercased

export default StatusChip