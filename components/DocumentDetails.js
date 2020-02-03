import { Avatar, Box, Button, Divider } from '@material-ui/core'
import AccessTimeIcon from '@material-ui/icons/AccessTime'
import { toJS } from 'mobx'
import { inject, observer } from 'mobx-react';
import moment from 'moment'
import React from 'react'
import DocumentForm from './DocumentForm'

const DocumentDetails = observer(({ document, store }) => {
  const { data, id } = document
  let { title, excerpt, status, slug, date_modified } = data
  if (date_modified) {
    date_modified = new store.fb.firebase.firestore.Timestamp(date_modified.seconds, date_modified.nanoseconds)
    date_modified = moment.duration(moment(date_modified.toDate()).diff(moment())).humanize(true)
  }
  status = status == 'in-progress' ? 'Ready for publishing' : 'In progress'
  return (
    <Box flexGrow={1} fontSize={14} fontFamily="'Poppins', sans-serif" minWidth={300} maxWidth={300}>
      <Box display="flex" px={3} py={3} flexWrap="wrap">
        <Box display="flex" flexGrow={1} alignItems="center" py={2}>
          <Box height={14} width={14} bgcolor="#ffd400" borderRadius="50%" mr={0.5} mb={0.5} />
          <Box mr="4px" >Status:</Box>
          <Box color="dodgerblue"><span>{status}</span></Box>
        </Box>
        <Box display="flex" flexGrow={1} alignItems="center">
          <Box fontSize={16} mr={0.25}><AccessTimeIcon fontSize="inherit" /></Box>
          <Box mr="4px" >Publish:</Box>
          <Box color="dodgerblue"><span>Now</span></Box>
        </Box>
        <Box display="flex" width="100%" my={2} color="white">
          <Box flexGrow={1} pr={2} ><Button fullWidth color="inherit" variant="contained" style={{ boxShadow: 'none', textTransform: 'unset', background: '#16c98d' }}>Publish</Button></Box>
          <Box width={90}><Button color="inherit" fullWidth variant="contained" style={{ boxShadow: 'none', textTransform: 'unset', background: '#a2a9b1' }}>More</Button></Box>
        </Box>
        <Box display="flex" color="#a6aab1">{`Last saved ${date_modified}`}</Box>
      </Box>
      <Divider />
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
      <Divider />
      <Box pt={3} px={3}>
        <DocumentForm {...{ document }} />
      </Box>
      {/* <Box display="flex">{slug}</Box>
      <Box display="flex">{excerpt}</Box>
      <Box display="flex">{slug}</Box> */}
    </Box>
  )
})

export default inject('store')(DocumentDetails)