import { Box } from "@chakra-ui/core"
import ListItem from '@molecules/ListItem'
import PropTypes from "prop-types";
import React from "react";

const Dashboard = ({ title, ...props }) => {
  return (
    <Box bg="purple.500" pos="absolute" display="flex" h="100%" w="100%">
      <Box bg="green.500">test</Box>
      <Box bg="blue.500">test</Box>
      <ListItem />
    </Box>
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
