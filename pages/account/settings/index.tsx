import React, { CSSProperties } from 'react';
import { Toggle } from 'components/atoms';
import { observable, toJS } from 'mobx';
import Flex from '@chakra-ui/core/dist/Flex';
import List from '@chakra-ui/core/dist/List';
import Button from '@chakra-ui/core/dist/Button';
import Heading from '@chakra-ui/core/dist/Heading';
import Box from '@chakra-ui/core/dist/Box';
// import { Button } from '@material-ui/core';
import { useAuthorization } from '../../../hooks'

function getStyle(theme: any, usePrimary?: boolean): CSSProperties {
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

const scribeTheme1 = {

  colors: {
    primary: '#bad',
    secondary: 'dodgerblue',
    dark: '#222',
    light: '#a29',
  }
}

// Model
interface Setting {
  app: string // | ToolboxApp  <== Define this later.
  title: string
  field: string
  value?: string | boolean // Bool for toggles, string for text.
}

// sample DB:
const settings = observable<Setting>(
  [{
    app: "Scribe",
    title: "Enable Dark Mode", // how the user sees it.
    field: "darkModeOn", // our ICommand name.
    value: true,
  },
  {
    app: "Scribe",
    title: "Enable Publishing", // how the user sees it.
    field: "enablePublish", // our ICommand name.
    value: true,
  }])

const AccountSettings = () => {

  const { user } = useAuthorization();

  console.log('user :>> ', user);

  return (
    <Flex
      m={[2, 3]}
      direction="column" p={4}
      style={getStyle(scribeTheme1, true)}
    >
      <List>
        {settings.map((setting, key) => {

          let { title, value } = setting;

          return (
            <Flex direction="row" key={key} justify="left" >
              <Toggle
                onToggle={(nextValue) => {
                  setting.value = nextValue;
                }}
              >{({ toggle, on }) => (
                <Button
                  mr={4}
                  onClick={toggle}
                  style={getStyle(toggleTheme, on)}
                >{on ? 'ON' : 'off'}</Button>
              )}
              </Toggle>
              <Heading>{title}</Heading>
            </Flex>
          )
        })}
        {/* <span><b>Settings:</b> {JSON.stringify(toJS(settings))}</span> */}
      </List>
    </Flex>
  );
}

export default AccountSettings;