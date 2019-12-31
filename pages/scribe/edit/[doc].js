import React from 'react'
import { useRouter } from 'next/router'
import { Document } from 'firestorter'
import Dashboard from '../../../components/Dashboard'
import { observer, inject } from 'mobx-react'
import { toJS } from 'mobx'
import { Box, Button, Divider } from '@material-ui/core'
import moment from 'moment'
import AccessTimeIcon from '@material-ui/icons/AccessTime'


const Doc = ({ store }) => {
  const router = useRouter()
  const { doc } = router.query
  const { authUser } = store
  const document = authUser ? new Document(`sessions/${doc}`) : null
  if (document) {
    const { id, isLoading, data } = document
    return (
      <Dashboard title={`TPOT Scribe - Edit - ${doc}`}
        details={() => <DocumentDetails {...{ document }} />}
      >
        {isLoading
          ? <span>Loading...</span>
          : <Editor key={id} {...{ document }} />
        }
      </Dashboard>
    )
  } else {
    console.error("TPOT: no access, the store's initial props were not set by NextJS's router: \n\n authUser is", authUser)
    return (
      <Dashboard title={`TPOT Scribe - Edit - ${doc}`}
        details={<p>Error</p>}
      >
        <p>You don't have access to this page. This is a bug being worked on.</p>
      </Dashboard>
    )
  }
}

export default inject('store')(Doc)

const Editor = observer(({ document }) => {
  const { data, id } = document
  const entries = data ? Object.entries(data) : []
  return (
    <>
      <h3>{`Now Editing: ${data.title}`}</h3>
      {data && entries.map((element, idx) => (
        <p key={idx}><b>{element[0]}</b>{`: ${element[1]}`}</p>
      ))}
    </>
  )
})


const DocumentDetails = observer(({ document }) => {
  const { data, id } = document
  let { title, excerpt, status, slug, date_modified } = data
  if (date_modified) {
    date_modified = moment.duration(moment(date_modified.toDate()).diff(moment())).humanize(true)
  }
  status = status == 'in-progress' ? 'Ready for publishing' : 'In progress'
  console.log(toJS(data))
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
          <Box flexGrow={1} pr={2} ><Button fullWidth color="inherit" variant="contained" style={{boxShadow: 'none', textTransform: 'unset', background: '#16c98d'}}>Publish</Button></Box>
          <Box width={90}><Button color="inherit" fullWidth variant="contained" style={{boxShadow: 'none', textTransform: 'unset', background: '#a2a9b1'}}>More</Button></Box>
        </Box>
        <Box display="flex" color="#a6aab1">{`Last saved ${date_modified}`}</Box>
      </Box>
      <Divider />
      
      <Box display="flex">{slug}</Box>
      <Box display="flex">{excerpt}</Box>
      <Box display="flex">{slug}</Box>
    </Box>
  )
});