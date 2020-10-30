import { Box, Flex, Stack } from "@chakra-ui/core";

import Background from "@organisms/Background";
import ListItem from "@molecules/ListItem";
import PropTypes from "prop-types";
import React from "react";

const Dashboard = ({ title, ...props }) => {
  return (
    <Flex h="100%" w="100%" pos="absolute" justify="center">
      <Stack spacing={4} h={"100%"} w="100%" maxW={1200}>
        <Box bg="green.500" h={150}></Box>
        <Box bg="red.500" flexGrow={1}></Box>
      </Stack>
      <Background />
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
