import React, { CSSProperties } from 'react';
import { Toggle } from 'components/atoms';
import { observable } from 'mobx';
import Flex from '@chakra-ui/core/dist/Flex';
import List from '@chakra-ui/core/dist/List';
import Button from '@chakra-ui/core/dist/Button';
import Heading from '@chakra-ui/core/dist/Heading';
import Box from '@chakra-ui/core/dist/Box';
import { initialSettings } from '../../../constants/settings'
import { Setting } from '../../../models/Setting';
import { MultiSelect } from '../../../components/molecules/list/MultiSelect';

export function makeStyle(theme: any, usePrimary?: boolean): CSSProperties {
  const { primary, secondary, light, dark } = theme.colors;

  return {
    minWidth: "2em",
    fontSize: `${usePrimary ? '32px' : '32px'}`,
    border: `2px solid ${usePrimary ? primary : secondary}`,
    color: `${usePrimary ? primary : secondary}`,
    backgroundColor: `${usePrimary ? light : dark}`
  };
}

const toggleTheme = {
  colors: {
    primary: '#14a56b',
    secondary: '#aa3355',
    dark: '#eee',
    light: '#555',
  }
}

export const scribeTheme1 = {

  colors: {
    primary: '#bad',
    secondary: 'dodgerblue',
    dark: '#222',
    light: '#a29',
  }
}

const settings = observable<Setting>(initialSettings)

interface Option {
  label: string,
}

const initialOptions = [
  { label: "USA" },
  { label: "Canada" },
  { label: 'Australia' },
  { label: 'Denmark' },
  { label: 'Israel' },
  { label: 'Germany' },
  { label: 'France' },
]

let options = observable<Option>(initialOptions);

const AccountSettings = () => {

  // const [country, setCountry] = useState('Mexico');

  const updateOptions = (newOptions) => {
    options = newOptions
  }

  return (

    <Box>
      <Flex
        m={[2, 3]}
        direction="column" p={4}
        style={makeStyle(scribeTheme1, true)}
      >
        <h1>Account Settings</h1>
        <List>
          {settings.map((setting, key) => {

            let { title } = setting;

            return (
              <Flex direction="row" key={key} justify="left" >
                <Toggle
                  key={key}
                  onToggle={(nextValue) => {
                    setting.value = nextValue;
                  }}
                >{({ toggle, on }) => (
                  <Button
                    mr={4}
                    onClick={toggle}
                    style={makeStyle(toggleTheme, on)}
                  >{on ? 'ON' : 'off'}</Button>
                )}
                </Toggle>
                <Heading>{title}</Heading>
              </Flex>
            )
          })}
        </List>

      </Flex>

      <MultiSelect
        selectedOptions={options.map(o => o.label)}
        // options={updateOptions}
        onChange={null}
        options={[]}
        // value={country}
        placeholder="Mexico"
      />
    </Box>
  );
}

export default AccountSettings;