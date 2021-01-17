import theme from "@chakra-ui/core/dist/theme";
import icons from './icons'
import colors from './colors'
import space, { breakpoints } from './space'
import fonts from './fonts'

const customTheme = {
  ...theme,
  ...colors,
  ...icons,
  ...space,
  ...fonts,
  ...breakpoints
};

export default customTheme