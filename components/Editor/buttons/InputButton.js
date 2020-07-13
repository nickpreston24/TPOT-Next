import React from 'react'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import { compose } from 'recompose'

const styles = theme => (
    {
        input: {
            'font-size': '100px',
            position: 'absolute',
            left: 0,
            top: 0,
            opacity: 0,
        },
        wrapper: {
            position: 'relative',
            overflow: 'hidden',
            display: 'inline-block',
        },
        button: {
            '&:hover': {
                backgroundColor: 'transparent'
            }
        }
    })

const InputButton = ({ enabled, handler, name, ...rest }) => {

    const { classes } = rest
    const { wrapper, input, button } = classes

    return (
        <div className={wrapper}>
            <Button
                disabled={!enabled}
                className={button}
                variant="contained"
                color="inherit" >
                {name}
            </Button>
            <input
                className={input}
                disabled={!enabled}
                onChange={handler}
                type="file"
                multiple>
            </input>
        </div>
    )
}

export default compose(withStyles(styles))(InputButton)