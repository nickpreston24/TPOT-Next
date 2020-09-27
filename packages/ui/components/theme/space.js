import theme from "@chakra-ui/core/dist/theme";

export default {
    space: {
        px: "1px",
        "0": "0",
        "1": "0.25rem",
        "2": "0.5rem",
        "3": "0.75rem",
        "4": "1rem",
        "5": "1.25rem",
        "6": "1.5rem",
        "8": "2rem",
        "10": "2.5rem",
        "12": "3rem",
        "16": "4rem",
        "20": "5rem",
        "24": "6rem",
        "32": "8rem",
        "40": "10rem",
        "48": "12rem",
        "56": "14rem",
        "64": "16rem",
    },
};

// define your custom breakpoints
export const breakpoints = ['576px', '768px', '992px', '1200px']

// add an alias for object responsive prop
breakpoints.sm = breakpoints[0]
breakpoints.md = breakpoints[1]
breakpoints.md = breakpoints[2]
breakpoints.md = breakpoints[3]