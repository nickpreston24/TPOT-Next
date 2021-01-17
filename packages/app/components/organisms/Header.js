import Avatar from '@chakra-ui/core/dist/Avatar'
import Button from '@chakra-ui/core/dist/Button'
import Flex from '@chakra-ui/core/dist/Flex'
import Heading from '@chakra-ui/core/dist/Heading'
import Icon from '@chakra-ui/core/dist/Icon'
import Input from '@chakra-ui/core/dist/Input'
import { InputRightElement } from '@chakra-ui/core/dist/InputElement'
import InputGroup from '@chakra-ui/core/dist/InputGroup'
import Menu, {
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
} from '@chakra-ui/core/dist/Menu'
import Stack from '@chakra-ui/core/dist/Stack'
import Switch from '@chakra-ui/core/dist/Switch'
import Text from '@chakra-ui/core/dist/Text'
import Tooltip from '@chakra-ui/core/dist/Tooltip'
import { useRouter } from 'next/router'
import React from 'react'
import * as ROUTES from '../../constants/routes'
import { isDev } from '../../helpers'
import { useAuth } from '../../hooks'
import { hideMe } from '../utils/disableMe'

const Header = ({ children }) => {
  const { signout } = useAuth()
  const router = useRouter()

  return (
    <Stack direction='row' spacing={6} px={4} h='100%' w='100%' align='center' color='gray.600'>
      <Stack direction='row' align='center' spacing={4}>
        <Icon name='scribe' size={8} />
        <Heading size='lg' fontWeight={500}>
          Scribe
        </Heading>
      </Stack>
      <Flex w='100%' justify='center' style={hideMe(!isDev())}>
        <InputGroup w='100%' maxW={800}>
          <InputRightElement children={<Icon name='search' />} />
          <Input variant='filled' placeholder='Search for letters' />
        </InputGroup>
      </Flex>
      <Stack direction='row' align='center' spacing={4}>
        <AccountDropdown />
        <Tooltip label='Chat coming soon!' placement='bottom-start'>
          <Icon disableM name='chat' size={5} mr={4} style={hideMe(!isDev())} />
        </Tooltip>
        <Tooltip label='Enable dark mode' placement='bottom-start'>
          <Switch style={hideMe(!isDev())} isDisabled={!isDev()} color='primary' />
        </Tooltip>
      </Stack>
    </Stack>
  )
}

export default Header

const AccountDropdown = () => {
  const router = useRouter()
  const redirectToHome = () => router.push(ROUTES.LANDING)

  const { user, signout } = useAuth()

  const displayName = user ? user.displayName || user.email : 'Username'

  const menuItems = [
    {
      disabled: true,
      title: 'My Account',
      icon: 'settings',
      cb: () => router.push(ROUTES.ACCOUNT),
    },
    {
      disabled: false,
      title: 'Sign Out',
      icon: 'moon',
      cb: () => signout(redirectToHome),
    },
    {
      disabled: false,
      title: 'Trello',
      icon: 'calendar',
      // cb: () => window.open(ROUTES.TRELLO, "_blank")
    },
    {
      disabled: true,
      title: 'Docs',
      icon: 'info-outline',
      // cb: () => window.history.pushState({}, 'My Title', ROUTES.TRELLO)
    },
  ]

  return (
    <Menu>
      <MenuButton as={Button} variant='unstyled' fontWeight={400} mr={4}>
        <Stack direction='row' align='center' spacing={3}>
          <Stack spacing={0} align='flex-end'>
            <Text fontSize='lg'>{displayName}</Text>
          </Stack>
          <Avatar size='sm' src='https://tinyurl.com/yde4dceq' />
        </Stack>
      </MenuButton>
      <MenuList>
        <MenuGroup title='Profile'>
          {menuItems.slice(0, 2).map((item, key) => (
            <MenuItem disabled={item.disabled} onClick={item.cb} key={key}>
              <Icon mr={3} name={item.icon} />
              {item.title}
            </MenuItem>
          ))}
        </MenuGroup>
        <MenuDivider />
        <MenuGroup title='Help'>
          {menuItems.slice(2, 4).map((item, key) => (
            <MenuItem disabled={item.disabled} onClick={item.cb} key={key}>
              <Icon mr={3} name={item.icon} />
              {item.title}
            </MenuItem>
          ))}
        </MenuGroup>
      </MenuList>
    </Menu>
  )
}
