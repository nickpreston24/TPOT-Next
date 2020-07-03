import React from "react";
import { Select } from '@chakra-ui/core'
export const Dropdown = ({ choices =[], placeholder = "Select option" }) => {
    console.log('choices :>> ', choices);
    // choices = choices || []
    return <Select placeholder={placeholder}>
        {choices.map((item, index) => {
            return <option key={index} value={index}>{item}</option>
        })}
    </Select>;
};
export default Dropdown;