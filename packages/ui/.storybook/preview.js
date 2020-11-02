import { CSSReset, ThemeProvider } from "@chakra-ui/core";

import React from "react";
import theme from "@theme";

export const parameters = {
  layout: "centered",
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
