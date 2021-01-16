import space, { breakpoints } from './space'

import colors from './colors'
import icons from './icons'
import theme from "@chakra-ui/core/dist/theme";

// import fonts from './fonts'





// Let's say you want to add custom colors
const customTheme = {
  ...theme,
  ...colors,
  ...icons,
  ...space,
  // ...fonts,
  ...breakpoints
};

export default customTheme