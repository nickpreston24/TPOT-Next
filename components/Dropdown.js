import React from "react";
import Select from '@chakra-ui/core/dist/Select'
/** A simple Dropdown.  TODO: Needs to send back the selected option */
export const Dropdown = ({ choices =[], placeholder = "Select option" }) => {
    // console.log('choices :>> ', choices);
    return <Select placeholder={placeholder}>
        {choices.map((item, index) => {
            return <option key={index} value={index}>{item}</option>
        })}
    </Select>;
};
export default Dropdown;