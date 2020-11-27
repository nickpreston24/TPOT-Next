import space, { breakpoints } from './space'

import colors from './colors'
import components from './defaults'
import { extendTheme } from '@chakra-ui/react'
import icons from './icons'

// import fonts from './fonts'

console.log(components)

// Let's say you want to add custom colors
const customTheme = extendTheme({
  ...colors,
  // ...icons,
  // ...space,
  // ...fonts,
  ...breakpoints,
  ...components
})

export default customTheme
