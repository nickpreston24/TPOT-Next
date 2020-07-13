import { Avatar, Box } from '@material-ui/core'

const Contributors = () =>
<Box py={2} px={3}>
  <Box mr="4px" py={1}>Contributors</Box>
  <Box display="flex" py={1}>
    <Box pr={1}>
      <Avatar alt="Remy Sharp" src="http://www.themes-lab.com/conbis/assets/images/avatars/avatar1.png" />
    </Box>
    <Box pr={1}>
      <Avatar alt="Remy Sharp" src="http://www.themes-lab.com/conbis/assets/images/avatars/avatar5.png" />
    </Box>
    <Box pr={1}>
      <Avatar alt="Remy Sharp" src="http://www.themes-lab.com/conbis/assets/images/avatars/avatar7.png" />
    </Box>
  </Box>
</Box>

export default Contributors