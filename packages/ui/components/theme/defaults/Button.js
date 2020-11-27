export default {
    Button: {
      // Styles for the base style
        baseStyle: {
          borderRadius: 'md',
        },
        // Styles for the size variations
        sizes: {
          xl: {
            h: '56px',
            fontSize: 'lg',
            px: '32px'
          }
        },
        // Styles for the visual variations
        variants: {
          pink: {
            bg: 'pink.200',
            color: 'white',
            boxShadow: '0 0 2px 2px #FF0099'
          }
        },
        // The default `size` or `variant` values
        defaultProps: {
          size: 'sm',
          variant: 'solid'
        }
    }
}
