import { Avatar, Box, Button, Divider, TextField } from '@material-ui/core'
import AccessTimeIcon from '@material-ui/icons/AccessTime'
import { toJS } from 'mobx'
import { inject, observer } from 'mobx-react'
import moment from 'moment'
import React, { useContext } from 'react'
import { compose } from 'recompose'
import { withForm } from './DocumentForm'
import Contributors from './ContributorsSection'
import SimpleDialog from '../Editor/buttons/SimpleDialog'
import Typography from '@material-ui/core/Typography'
import { uploadLocalFile } from '../Editor/functions/uploader'
import FileBrowser from './FileBrowser'
import { publish } from '../Editor/functions/publisher'

// : Component usually plugged into the details prop in a Dashboard.
// : Displays the most important information and actions available to
// : the user from withimport Contributors from './ContributorsSection';
// in the Dashboard.import { PublishedDocument } from '../Editor/functions/Publisher';

const DocumentDetails = ({ store, form, document }) => {

  const { data } = document
  let { status, date_modified } = data

  // const { fb } = store
  // console.log('fb', !!fb);

  // const { upload } = fb;
  // console.log('upload', upload);

  console.count('Document Details render')

  const loaders = ['disk', 'google']

  const [open, setOpen] = React.useState(false)
  const [selectedValue, setSelectedValue] = React.useState(loaders[0])

  if (date_modified) {
    date_modified = new store.fb.firebase.firestore.Timestamp(date_modified.seconds, date_modified.nanoseconds)
    date_modified = moment.duration(moment(date_modified.toDate()).diff(moment())).humanize(true)
  }

  status = status == 'in-progress' ? 'Ready for publishing' : 'In progress'

  const handlePublish = () => {
    const documentData = toJS(data)
    let { code } = documentData
    // Parse out each field and convert to target format
    let html = JSON.parse(code)
    // console.log('html, ', html, 'code: ', code, documentData)
    publish(html)
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = (value) => {
    setOpen(false)
    setSelectedValue(value)
  }

  const handleFileSelected = async (file) => {
    console.log('uploading...', file)
    // await upload(file);
    await uploadLocalFile(file, store)
  }

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
          <Box mr="4px" >
            Publish:
          </Box>
          <Box color="dodgerblue">
            <span>Now</span>
          </Box>
        </Box>
        <Box display="flex" width="100%" my={2} color="white">
          <Box flexGrow={1} pr={2} >            
            <Button
              onClick={handlePublish}
              fullWidth color="inherit" variant="contained" style={{ boxShadow: 'none', textTransform: 'unset', background: '#16c98d' }}>
              Publish
            </Button>
            {/* <UploadDialog /> */}
            <Typography variant="subtitle1">Selected: {selectedValue}</Typography>
            <br />
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
              Open simple dialog
            </Button>
            <SimpleDialog
              loaders={loaders} selectedValue={selectedValue}
              open={open}
              onClose={handleClose}
            />
            {true && <FileBrowser onSelected={handleFileSelected} />}
          </Box>
          {/* <Box width={90}>
            <Button color="inherit" fullWidth variant="contained" style={{ boxShadow: 'none', textTransform: 'unset', background: '#a2a9b1' }}>
              More
            </Button>
          </Box> */}
        </Box>
        <Box display="flex" color="#a6aab1">{`Last saved ${date_modified}`}</Box>
      </Box>
      <Divider />
      <Contributors />
      <Divider />
      <Box pt={3} px={3}>
        <InputFields {...{ form }} />
      </Box>
    </Box>
  )
}

export default compose(
  inject('store'),
  // observer,
  withForm
)(DocumentDetails)

const InputFields = observer(({ form }) => {
  // const fields = Object.keys(toJS(form.fields))
  let { onBlur } = toJS(form.$hooks)

  return (
    <Box flexDirection="column" >
      <form onSubmit={form.onSubmit}>
        <Box height={70}>
          Paper Title:
          <TextField
            fullWidth
            error={form.$('title').hasError}
            helperText={form.$('title').error}
            {...form.$('title').bind({ onBlur: () => onBlur(form) })}
          />
        </Box>
        <Box height={70}>
          File Name:
          <TextField
            fullWidth
            error={form.$('slug').hasError}
            helperText={form.$('slug').error}
            {...form.$('slug').bind({ onBlur: () => onBlur(form) })}
          />
        </Box>
        <Box height={70}>
          Description:
          <TextField
            multiline
            fullWidth
            error={form.$('excerpt').hasError}
            helperText={form.$('excerpt').error}
            {...form.$('excerpt').bind({ onBlur: () => onBlur(form) })}
          />
        </Box>
      </form>
    </Box>
  )
})
