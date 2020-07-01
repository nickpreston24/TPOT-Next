import React from "react";
import { Heading, Button, Link, Box, ListItem, List, Text, Spinner, Input, Stack, InputGroup, InputLeftAddon, InputRightAddon, Select } from '@chakra-ui/core'
export const Dropdown = props => {
    return <Select placeholder="Select option">
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
    </Select>;
};
export default Dropdown;