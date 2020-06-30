import { theme } from '@chakra-ui/core'

const customBreakpoints = ["360px", "768px", "1024px", "1440px"];
//const breakpoints: ["30em", "48em", "62em", "80em"]; //default
customBreakpoints.sm = customBreakpoints[0];
customBreakpoints.md = customBreakpoints[1];
customBreakpoints.lg = customBreakpoints[2];
customBreakpoints.xl = customBreakpoints[3];

// example theme.js
export const customTheme = {
    ...theme,
    colors: {
        ...theme.colors,
        brand: {
            900: "#1a365d",
            800: "#153e75",
            700: "#2a69ac",
        },
    },
    breakpoints: customBreakpoints,
    fonts: {
        heading: '"Avenir Next", sans-serif',
        body: "system-ui, sans-serif",
        mono: "Menlo, monospace",
    },
    fontSizes: {
        xs: "0.75rem",
        sm: "0.875rem",
        md: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem",
        "5xl": "3rem",
        "6xl": "4rem",
    },
    zIndices: {
        hide: -1,
        auto: "auto",
        base: 0,
        docked: 10,
        dropdown: 1000,
        sticky: 1100,
        banner: 1200,
        overlay: 1300,
        modal: 1400,
        popover: 1500,
        skipLink: 1600,
        toast: 1700,
        tooltip: 1800,
    },

    radii: {},
    opacity: {},
    borders: {},
};