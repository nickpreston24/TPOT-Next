import React, { FC, useState } from "react";
import Select from '@chakra-ui/core/dist/Select'

type DropdownProps = {
    options: string[]
    onChange?: (selected: string) => void
    initial?: string | number,
    placeholder?: string,
    name?: string, // The name of the controlled input - useful for changing states implicitly
}

/** A simple Dropdown.  TODO: Needs to send back the selected option */
export const Dropdown: FC<DropdownProps> = (props) => {
    
    const { options, onChange, name, placeholder, initial } = props;
    const [selected, setSelected] = useState(initial?.toString() || '')

    return (
        <Select
            onChange={(event) => {
                if (!!onChange) {
                    onChange(event.target.value)
                }
                setSelected(event.target.value)
            }}
            name={name}
            placeholder={placeholder}
            value={selected}
        >
            {options.map((name, key) => <option key={key}>{name}</option>)}
        </Select>
    )
}

export default Dropdown;