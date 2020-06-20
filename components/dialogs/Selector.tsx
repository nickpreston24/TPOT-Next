// const loaders = ['disk', 'google']
import React from 'react'
import { FC } from "react"
import { makeStyles } from '@material-ui/core/styles'
import PersonIcon from '@material-ui/icons/Person'
import AddIcon from '@material-ui/icons/Add'
import { blue } from '@material-ui/core/colors'

import {
    ListItem
    , DialogTitle
    , Dialog
    , List
    , ListItemAvatar
    , Avatar
    , ListItemText
} from "@material-ui/core"

const useStyles = makeStyles({
    avatar: {
        backgroundColor: blue[100],
        color: blue[600],
    },
})

// const Panel = () => <div>Holds the actual dialog, passing along props</div>

const noop = (): void => { }

interface DialogProps {
    options: string[]  // Visual options for user
    onCloseFn?: (value: string) => void
    onSelectFn?: (value: string) => void
    open: boolean,
    title: string,
    // states: any[]   // stateful hooks
    // effects?: any[] // effect hooks
    // onCloseFn?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

// Abstract Base Dialog for any purpose
const Selector: FC<DialogProps> = ({
    options,
    onCloseFn,
    onSelectFn,
    open,
    title,
    // states,
    // effects,
}) => {

    if (!options || options.length === 0)
        throw Error("Dialog requires options");

    if (!onCloseFn)
        onCloseFn = noop

    if (!onSelectFn)
        onSelectFn = noop

    // const [open, setOpen] = React.useState(false)
    let [selectedValue, setSelectedValue] = React.useState(options[0])
    const classes = useStyles()

    // Do something with selected value
    const handleClose = () => {
        onCloseFn(selectedValue)
    }

    // Do something with value on click
    const handleListItemClick = (value) => {
        setSelectedValue(value)
        onCloseFn(value)
    }

    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
            <DialogTitle id="simple-dialog-title">{title || "Pick an Option"}</DialogTitle>
            <List>
                {
                    options.map((item) => (
                        <ListItem button onClick={() => handleListItemClick(item)} key={item} >
                            <ListItemAvatar>
                                <Avatar className={classes.avatar}>
                                    <PersonIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={item} />
                        </ListItem>
                    ))
                }
                {/* Sample */}
                {/* <ListItem autoFocus button onClick={() => handleListItemClick('addAccount')}>
                    <ListItemAvatar>
                        <Avatar>
                            <AddIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Add account" />
                </ListItem> */}
            </List>
        </Dialog>
    )
}

export default Selector;