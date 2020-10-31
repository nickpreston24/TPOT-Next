import { Box, Button, Flex } from "@chakra-ui/core";

import PropTypes from "prop-types";
import React from "react";

const SplitBackground = ({ headerHeight }) => {
  return (
    <Flex
      bg="red.500"
      pos="absolute"
      zIndex={-1}
      direction="column"
      h="100%"
      w="100%"
    >
      <Box bg="#373740" h={headerHeight}></Box>
      <Box bg="gray.100" flexGrow={1}></Box>
    </Flex>
  );
};

SplitBackground.propTypes = {
  /**
   * The height of the header in the background
   */
  headerHeight: PropTypes.number,
  /**
   * The height of the header in the background
   */
  parallax: PropTypes.bool,
};

SplitBackground.defaultProps = {
  headerHeight: 256,
  parallax: true,
};

export default SplitBackground;
