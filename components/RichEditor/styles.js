import palette from '@constants/palette.json'

/* This object provides the styling information for our custom color styles. */
export const colorStyleMap = {
    'red': {
      color: 'rgba(255, 0, 0, 1.0)',
    },
    'orange': {
      color: 'rgba(255, 127, 0, 1.0)',
    },
    'yellow': {
      color: 'rgba(180, 180, 0, 1.0)',
    },
    'green': {
      color: 'rgba(0, 180, 0, 1.0)',
    },
    'blue': {
      color: 'rgba(0, 0, 255, 1.0)',
    },
    'indigo': {
      color: 'rgba(75, 0, 130, 1.0)',
    },
    'violet': {
      color: 'rgba(127, 0, 255, 1.0)',
    },
    'awesome': {
      color: '#bada55'
    },
    'giraffe': {
      color: '#612afe'
    },
    'chocolate': {
      color: '#7e4907'
    },
    'upstack': {
      color: 'rgba(0,161,225,.9)'
    },
    'taters': {
      color: '#7a7e25'
    },
    'teapot': {
      color: '#c02615'
    }
  } 


// TODO: Refactor into its own theme file and hotswap (dark/light/etc)
const styles = {
    root: {
        border: '2px solid' + palette.primary.blue,
        backgroundColor: palette.primary.white,
        fontFamily: '\'Helvetica\', sans-serif',
        borderRadius: '40px',
        padding: 20
    },
    content: {
        backgroundColor: palette.secondary.eggshell,
        border: '1px solid ' + palette.secondary.orange,
        overflowY: 'auto',
        borderRadius: '25px',
        cursor: 'text',
        // height: "100%",
        padding: 10,
        boxSizing: 'border-box',
        cursor: 'text',
        boxShadow: 'inset 0px 1px 8px -3px #ABABAB'
    },
    controls: {
        fontFamily: '\'Helvetica\', sans-serif',
        fontSize: 14,
        marginBottom: 10,
        userSelect: 'none',
    },
    headers: {
        color: palette.primary.teal
    },
    button: {
        backgroundColor: palette.primary.white,
        color: palette.primary.blue,
        border: '1 px solid' + palette.primary.blue,

        margin: '0 0.3em 0.3em 0',
        textAlign: 'center',
        borderRadius: '.25em',
        fontWeight: '400',
        textDecoration: 'none',
        fontFamily: '\'firacode\', sans-serif',
        transition: 'all 0.2s'
    },
    submitButton: {
        color: palette.secondary.eggshell,
        backgroundColor: palette.primary.teal,
        display: 'inline-block',
        padding: '.3em .3em .3em .3em',
        margin: '.3em .3em .3em .3em',
        textAlign: 'center'
    }
}

export default styles