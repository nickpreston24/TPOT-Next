import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  IconButton,
  Input,
  PseudoBox,
  Select,
  Stack,
  Tag,
  TagCloseButton,
  TagLabel,
  Text,
  useTheme,
} from "@chakra-ui/core";

import ListItem from "@molecules/ListItem";
import Navbar from "@organisms/Navbar";
import PropTypes from "prop-types";
import React from "react";
import SplitBackground from "@molecules/SplitBackground";

const Dashboard = ({ title, ...props }) => {
  return (
    <Flex
      h="100%"
      w="100%"
      pos="absolute"
      justify="center"
      style={{ WebkitTapHighlightColor: "transparent" }}
    >
      <Stack spacing={4} h={"100%"} w="100%" maxW={1200} px="16px">
        <Box minH={{ base: 130, md: 150 }}>
          <Navbar bg="transparent" />
        </Box>
        <Box flexGrow={1} pos="relative">
          <Stack spacing={4} direction="row">
            <Box
              borderRadius="lg"
              boxShadow="md"
              w={{ base: "100%" }}
              h={600}
              bg="white"
            ></Box>
            <DetailsPanel />
          </Stack>
          <DetailsToggle />
        </Box>
      </Stack>
      <SplitBackground />
    </Flex>
  );
};

Dashboard.propTypes = {
  /**
   * The text at the top given to the Header
   */
  title: PropTypes.string.isRequired,
};

Dashboard.defaultProps = {
  title: "Dashboard",
};

export default Dashboard;

const tagOptions = ["chinese", "diabolical doctrine", "salvation", "faith"];

const DetailsToggle = () => (
  <Flex
    right="-16px"
    top="8px"
    pos="absolute"
    w="45px"
    h="44px"
    bg="#29333ae0"
    bg="blue.500"
    justify="center"
    align="center"
    color="#9699a0"
    color="white"
    borderRadius="8px 0px 0px 8px"
    boxShadow="lg"
    display={{ base: "flex", lg: "none" }}
  >
    <Icon name="info" />
  </Flex>
);

const DetailsPanel = () => (
  <Stack
    spacing={4}
    borderRadius="lg"
    boxShadow="md"
    d={{ base: "none", lg: "block" }}
    boxSizing="border-box"
    p={6}
    minW={{ base: 0, md: 350 }}
    h="100%"
    bg="white"
    color="gray.600"
  >
    <CardTitle />
    <Stack direction="row">
      <Box width={1 / 2}>
        <FormLabel htmlFor="type">Type</FormLabel>
        <Select
          id="type"
          value="translation"
          onChange={() => null}
          variant="filled"
        >
          <option value="letter">Letter</option>
          <option value="translation">Translation</option>
          <option value="biography">Biography</option>
          <option value="page">Generic</option>
        </Select>
      </Box>
      <Box width={1 / 2}>
        <FormLabel htmlFor="tags">Tags</FormLabel>
        <Select
          id="type"
          defaultValue=""
          onChange={() => null}
          variant="filled"
        >
          <option value="">Select...</option>
          <option value="translation">Translation</option>
          <option value="biography">Biography</option>
          <option value="page">Generic</option>
        </Select>
      </Box>
    </Stack>
    <Box>
      {tagOptions.map((tag, idx) => (
        <Tag
          key={idx}
          rounded="full"
          size="sm"
          variantColor="teal"
          mr={1}
          mb={1}
        >
          <TagLabel>{tag}</TagLabel>
          <TagCloseButton />
        </Tag>
      ))}
    </Box>
    <Box>
      <FormLabel htmlFor="slug">Slug</FormLabel>
      <Stack direction="row">
        <Input id="slug" placeholder="name-of-paper" variant="filled" />
      </Stack>
    </Box>
    <Box>
      <Stack direction="row">
        <FormLabel htmlFor="slug" flexGrow={1}>
          When live, the URL will be:
        </FormLabel>
        <Button size="xs">Copy</Button>
      </Stack>
      <PseudoBox
        mt={1}
        rounded="full"
        transition="250ms background ease-in"
        _hover={{ bg: "blue.100" }}
        _active={{ bg: "blue.100" }}
      >
        <Text
          px={4}
          as="input"
          w="100%"
          outline="none"
          color="blue.500"
          bg="transparent"
          textDecor="underline"
          fontSize="sm"
          readOnly
          contentEditable
          isTruncated
          value="www.thepathoftruth.com/letters/name-of-paper.htm"
        />
      </PseudoBox>
    </Box>
    <Stack direction="row" pt={2} spacing={0}>
      <Button variantColor="blue" w="50%">
        Save
      </Button>
      <Button variantColor="green" w="100%">
        Submit for Review
      </Button>
    </Stack>
  </Stack>
);

const CardTitle = () => (
  <Stack pb={4}>
    <Stack direction="row">
      <Heading size="md" mt={1} fontWeight={500}>
        Publish Details
      </Heading>
    </Stack>
    <Box h="2px" bg="gray.100" />
  </Stack>
);
