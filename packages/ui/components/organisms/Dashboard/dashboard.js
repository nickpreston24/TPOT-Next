import { Box, Flex, Stack } from "@chakra-ui/core";

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
          <Navbar />
        </Box>
        <Box flexGrow={1}>
          <Stack spacing={4} direction="row">
            <Box
              borderRadius="lg"
              boxShadow="lg"
              w={{ base: "100%" }}
              h={600}
              bg="white"
            ></Box>
            <Box
              borderRadius="lg"
              boxShadow="lg"
              d={{ base: "none", lg: "block" }}
              w={{ md: 500 }}
              h={400}
              bg="white"
            ></Box>
          </Stack>
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
