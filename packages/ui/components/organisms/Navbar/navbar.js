import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  PseudoBox,
  Stack,
  Text,
} from "@chakra-ui/core";

import PropTypes from "prop-types";
import React from "react";
import SplitBackground from "@molecules/SplitBackground";

const Navbar = ({ title, bg = "#373740", ...props }) => {
  return (
    <Stack spacing={0} userSelect="none" bg={bg}>
      <Flex mt={2} py={4}>
        <Menu>
          <MenuButton as={AppSelectButton} />
          <MenuList>
            <MenuOptionGroup
              // defaultValue="scribe"
              title="Switch App"
              // type="radio"
            >
              <MenuItem as="a" value="scribe">
                <Icon name="scribe" mr="12px" />
                <span>Scribe</span>
              </MenuItem>
              <MenuDivider />
              <MenuItem value="settings">
                <Icon name="settings" mr="12px" />
                <span>Settings</span>
              </MenuItem>
            </MenuOptionGroup>
          </MenuList>
        </Menu>
        {/* <Box bg="red.500">test</Box> */}
        <Box flexGrow={1} />
        <Stack direction="row" align="center" spacing={4}>
          <PseudoBox
            pos="relative"
            h="32px"
            w="32px"
            display="flex"
            cursor="pointer"
            justifyContent="center"
            alignItems="center"
            textAlign="center"
            transition="150ms all ease-in"
            bg="#50505f"
            _hover={{ bg: "#2d2d38", color: "dodgerblue" }}
            borderRadius="full"
            boxShadow="sm"
            color="#9699a0"
          >
            <Icon name="chat" fontSize="18px" />
            <Box
              pos="absolute"
              zIndex={1}
              right={-2}
              top={-2}
              borderRadius="full"
              w="10px"
              h="10px"
              bg="red.400"
            />
          </PseudoBox>
          <Menu>
            <MenuButton as={AccountButton} />
            <MenuList placement="bottom-end">
              <MenuOptionGroup defaultChecked="account" title="Welcome Victor!">
                <MenuItem as="a" value="account">
                  <Icon name="link" mr="12px" />
                  <span>Account</span>
                </MenuItem>
                <MenuItem
                  as="a"
                  value="help"
                  target="_blank"
                  href="https://trello.com/b/9wUkSPXF/the-path-of-truth"
                >
                  <Icon name="info-outline" mr="12px" />
                  <span>Get Help</span>
                </MenuItem>
                <MenuDivider />
                <MenuItem as="a" value="signout">
                  <Icon name="external-link" mr="12px" />
                  <span>Sign Out</span>
                </MenuItem>
              </MenuOptionGroup>
            </MenuList>
          </Menu>
        </Stack>
      </Flex>
      <Box
        h="2px"
        style={{
          background:
            "linear-gradient(to right, #5c5c6900 0%,#5c5c69 10%,#5c5c69 90%,#5c5c6900 100%)",
        }}
      />
      <Stack direction="row" py={3}>
        <Stack
          cursor="pointer"
          direction="row"
          borderRadius="lg"
          bg="#2d2d38"
          p="4px"
          px={3}
          color="#36ec77"
        >
          <Icon name="add" size="24px" pr={2} />
          <Box color="white">Create</Box>
        </Stack>
        <Stack
          cursor="pointer"
          direction="row"
          borderRadius="lg"
          p="4px"
          px={3}
          color="#9699a0"
        >
          <Icon name="edit" size="24px" pr={2} />
          <Box>Edit</Box>
        </Stack>
        <Stack
          cursor="pointer"
          direction="row"
          borderRadius="lg"
          p="4px"
          px={3}
          color="#9699a0"
        >
          <Icon name="download" size="24px" pr={2} />
          <Box>Checkout</Box>
        </Stack>
      </Stack>
    </Stack>
  );
};

Navbar.propTypes = {
  /**
   * The text at the top given to the Header
   */
  title: PropTypes.string.isRequired,
};

Navbar.defaultProps = {
  title: "Dashboard",
};

export default Navbar;

const AppSelectButton = React.forwardRef(({ onClick }, ref) => (
  <PseudoBox
    onClick={onClick}
    alignItems="center"
    cursor="pointer"
    direction="row"
    align="center"
    display="flex"
    role="group"
  >
    <Icon name="toolbox" fontSize={40} mr={4} />
    <Heading fontSize={22} fontWeight="normal" color="white">
      <Box d={{ base: "none", md: "block" }}>TPOT Toolbox</Box>
      <Box d={{ base: "none", sm: "block", md: "none"}}>TPOT</Box>
    </Heading>
    <Icon d={{ base: "none", md: "block" }} name="chevron-right" ml={2} fontSize="2xl" color="white" />
    <PseudoBox
      ref={ref}
      transition="150ms all ease-in"
      _groupHover={{ bg: "#2d2d38" }}
      borderRadius="lg"
      bg="red"
      p="6px"
      pl={3}
    >
      <Heading fontSize={22} fontWeight="normal" color="white">
        Scribe
      </Heading>
      <Icon name="chevron-down" ml={2} fontSize="2xl" color="white" />
    </PseudoBox>
  </PseudoBox>
));

const AccountButton = React.forwardRef(({ onClick }, ref) => (
  <Stack
    ref={ref}
    onClick={onClick}
    cursor="pointer"
    direction="row"
    align="center"
    color="white"
  >
    {/* <Text display={{ base: "none", sm: "block" }} pr={2}>
      Victor H
    </Text> */}
    <Avatar pointerEvents="none" size="sm" src="https://tinyurl.com/y3kbtvll" />
  </Stack>
));
