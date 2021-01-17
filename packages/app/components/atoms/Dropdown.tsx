import Select from '@chakra-ui/core/dist/Select'
import React, { FC, useState } from 'react'

type DropdownProps = {
  options: string[]
  onChange?: (selected: string) => void
  initial?: string | number
  placeholder?: string
  name?: string
}

export const Dropdown: FC<DropdownProps> = (props) => {
  const { options, onChange, name, placeholder, initial } = props
  const [selected, setSelected] = useState(!!initial ? initial?.toString() : '')

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
      {options.map((name, key) => (
        <option key={key}>{name}</option>
      ))}
    </Select>
  )
}

export default Dropdown
