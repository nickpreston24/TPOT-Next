import { Box } from '@material-ui/core'

export const confirmSignout = {
    message: <Box py={20} fontSize={24} textAlign="center" fontFamily="'Poppins', sans-serif">{"Are you sure you want to leave?"}</Box>,
    cancel: { text: 'Go Back', color: 'inherit', variant: 'contained' },
    ok: { text: 'Yes, and Log Out', color: 'secondary', variant: 'contained' },
}