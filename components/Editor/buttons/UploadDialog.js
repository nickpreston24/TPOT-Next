import InputButton from './InputButton'
import Dialog from '@material-ui/core/Dialog'
import DialogContentText from '@material-ui/core/DialogContentText'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import React, { useState, useContext } from 'react'
import { inject, observer } from 'mobx-react'

// import GoogleDrive from "../../../media/hdd.png";
// import HardDrive from "../../../media/hdd.png";
import { CloudStorage } from '../../../contexts/CloudStorage'

const styles = theme => ({
    root: {
        // paddingTop: 64,
        // display: "flex",
        // flexWrap: "wrap"
    },
    paper: {
        maxWidth: 800,
        width: 600
        // height: ,
    },
    icon: {
        display: 'block',
        position: 'relative',
        left: '50%',
        transform: 'translateX(-50%)',
        height: 64,
        fontSize: 80,
        paddingTop: 64,
        paddingBottom: 32
    },
    grid: {
        '& button': {
            color: '#555',
            transition: 'all 0s linear 0s !important',
            position: 'relative',
            left: '50%',
            transform: 'translateX(-50%)'
        },
        '&:hover': {
            '& button': {
                color: theme.palette.primary.contrastText,
                background: theme.palette.primary.main,
                transition: 'all 0s linear 0s !important'
            }
        },
        width: '32.9999%'
    },
    textbox: {
        marginTop: 32,
        marginBottom: 48
    }
})

const UploadDialog = observer(({ classes, store, loaders = [] }) => {

    console.log('store', store, 'loaders', loaders)

    return (
        <Dialog
            id="LoadScreen"
            classes={{ root: classes.root, paper: classes.paper }}
            // open={currentModal === 'LoadScreen'}
            onClose={() => {
                //TODO: refactor this, it's ugly.
                const { history, match } = props
                if (!!history && history.push)
                    history.push(match.url)
                setCurrentModal(null)
            }}
            disablePortal
        >
            {Object.values(loaders).map(option => {
                const { name, enabled, handler } = option
                const { grid } = classes

                return (
                    <div>
                        <Grid
                            key={name.toLocaleLowerCase()}
                            item className={grid}
                        >
                            <img
                                src={option.icon}
                                className={classes.icon}
                                alt="cardimg" />
                            <InputButton {...{ name, enabled, handler }} />
                        </Grid>
                        <DialogContentText
                            align="center"
                            className={classes.textbox}>
                            {option.description}
                        </DialogContentText>
                    </div>
                )
            })}
        </Dialog>
    )
})

/* Holds state and operations for Uploader modal */
class Store {

    constructor({ lettersStore }) {

        console.log('CloudStorage', CloudStorage)

        // this.cloud = useContext(CloudStorage);
        // this.lettersStore = lettersStore
        // this.upload = this.cloud.upload
    }

    loaders = {
        disk: {
            name: 'From Disk',
            description: 'Open a file from your computer\'s hard drive',
            // icon: HardDrive, //ERROR: Module parse failed: Unexpected character '�' (1:0)     :'{
            //You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders
            enabled: true,
            handler: (event) => {
                const file = this.selectFile(event)
                this.upload(file)
            }
        },
        googleDrive: {
            name: 'Coming Soon',
            description: 'Open a file from your linked Google Drive folder',
            // icon: GoogleDrive,  //ERROR: Module parse failed: Unexpected character '�' (1:0)     :'{
            //You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders
            enabled: false,
            handler: (event) => { }
        }
        // {
        //     name: "Clipboard",
        //     description:
        //         "Opens a window where you can paste in the content of a word document",
        //     icon: ClipBoard,
        //     handler: () => {
        //         this.handleSelection("clipboard");
        //     }
        // }
    }


    selectFile = (event) => {
        return event.target.files[0]
    }
}

export default inject('store')(withStyles(styles)(UploadDialog))