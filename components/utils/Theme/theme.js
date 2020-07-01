import * as React from 'react';
import { theme } from "@chakra-ui/core";
import icons from './icons'
import colors from './colors'
import space from './space'

// Let's say you want to add custom colors
const customTheme = {
    ...theme,
    ...colors,
    ...icons,
    ...space
  };

export default customTheme