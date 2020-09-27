import { CSSReset, ThemeProvider } from "@chakra-ui/core";

import React from "react";
import theme from "../components/theme";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
};

export const decorators = [
  (Story) => (
    <ThemeProvider theme={theme}>
      <CSSReset />
      <Story />
    </ThemeProvider>
  ),
];
