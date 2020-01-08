import { Box } from '@material-ui/core'

export const confirmSignout = {
    message: <Box py={20} fontSize={24} textAlign="center" fontFamily="'Poppins', sans-serif">{"Are you sure you want to leave?"}</Box>,
    cancel: { text: 'Go Back', color: 'inherit', variant: 'contained' },
    ok: { text: 'Yes, Log Out', color: 'secondary', variant: 'contained' },
}

export const confirmSetAside = {
    message: <Box py={20} fontSize={24} textAlign="center" fontFamily="'Poppins', sans-serif">{"What would you like to do with your document?"}</Box>,
    cancel: { text: 'Keep Editing', color: 'inherit', variant: 'contained' },
    ok: { text: 'Set Aside for Later', color: 'secondary', variant: 'contained' },
}