import { Avatar, Box, Button, Divider, TextField } from '@material-ui/core'
import AccessTimeIcon from '@material-ui/icons/AccessTime'
import { toJS } from 'mobx'
import { inject, observer } from 'mobx-react';
import moment from 'moment'
import React, { useContext } from 'react'
import { compose } from 'recompose'
import { withForm } from '../components/DocumentForm'
import SimpleDialog from '../components/Editor/buttons/SimpleDialog'
import Typography from '@material-ui/core/Typography';
import { uploadLocalFile } from './Editor/functions/uploader'

// : Component usually plugged into the details prop in a Dashboard.
// : Displays the most important information and actions available to
// : the user from within the Dashboard.

const DocumentDetails = ({ store, form, document }) => {

  const { data } = document

  let { status, date_modified } = data

  const { fb } = store
  // console.log('fb', !!fb);

  const { upload } = fb;
  // console.log('upload', upload);

  console.count('Document Details render')

  const loaders = ['disk', 'google'
    // {
    //   name: 'disk',
    //   handler: () => { console.log('n/a') }
    // },
    // {
    //   name: 'google',
    //   handler: () => { console.log('n/a') }
    // },
  ]

  // const loaders = Object.entries({
  //   disk: {
  //     name: "From Disk",
  //     description: "Open a file from your computer's hard drive",
  //     // icon: HardDrive,
  //     enabled: true,
  //     handler: (event) => {
  //       const file = selectFile(event)
  //       upload(file)
  //     }
  //   },
  //   googleDrive: {
  //     name: "Coming Soon",
  //     description: "Open a file from your linked Google Drive folder",
  //     // icon: GoogleDrive,
  //     enabled: false,
  //     handler: (event) => { }
  //   }
  //   // {
  //   //     name: "Clipboard",
  //   //     description:
  //   //         "Opens a window where you can paste in the content of a word document",
  //   //     icon: ClipBoard,
  //   //     handler: () => {
  //   //         this.handleSelection("clipboard");
  //   //     }
  //   // }
  // })

  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(loaders[0]);
  const [selectedFile, setSelectedFile] = React.useState(null);

  if (date_modified) {
    date_modified = new store.fb.firebase.firestore.Timestamp(date_modified.seconds, date_modified.nanoseconds)
    date_modified = moment.duration(moment(date_modified.toDate()).diff(moment())).humanize(true)
  }

  status = status == 'in-progress' ? 'Ready for publishing' : 'In progress'

  // const selectFile = (event) => {
  //   return event.target.files[0];
  // }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

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
            {/* <Button fullWidth color="inherit" variant="contained" style={{ boxShadow: 'none', textTransform: 'unset', background: '#16c98d' }}>
              <UploadDialog />
            </Button> */}
            <Button fullWidth color="inherit" variant="contained" style={{ boxShadow: 'none', textTransform: 'unset', background: '#16c98d' }}>
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
            {true && <FilePicker onSelected={handleFileSelected} />}
            {/* <Button
              onClick={() =>
                <UploadDialog />
              }
              fullWidth color="inherit" variant="contained" style={{ boxShadow: 'none', textTransform: 'unset', background: '#101012' }}>
              Upload
              </Button> */}
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
        <InputFields {...{ form }} />
      </Box>
    </Box>
  )
}

export default compose(
  inject('store'),
  observer,
  withForm
)(DocumentDetails)

const InputFields = observer(({ form }) => {
  // const fields = Object.keys(toJS(form.fields))
  let { onBlur } = toJS(form.$hooks)

  return (
    <Box flexDirection="column" >
      <form onSubmit={form.onSubmit}>
        <Box height={70}>
          <TextField
            fullWidth
            error={form.$(`title`).hasError}
            helperText={form.$(`title`).error}
            {...form.$(`title`).bind({ onBlur: () => onBlur(form) })}
          />
        </Box>
        <Box height={70}>
          <TextField
            fullWidth
            error={form.$(`slug`).hasError}
            helperText={form.$(`slug`).error}
            {...form.$(`slug`).bind({ onBlur: () => onBlur(form) })}
          />
        </Box>
        <Box height={70}>
          <TextField
            multiline
            fullWidth
            error={form.$(`excerpt`).hasError}
            helperText={form.$(`excerpt`).error}
            {...form.$(`excerpt`).bind({ onBlur: () => onBlur(form) })}
          />
        </Box>
      </form>
    </Box>
  )
})

const FilePicker = ({ setSelectedFile, onSelected }) => {
  const setFile = (event) => {
    console.log('event: ', event)
    const file = event.target.files[0];

    console.log('file:', file)
    // setSelectedFile(file)
    onSelected(file);
  }
  return <input type="file" onChange={setFile} />;
}
