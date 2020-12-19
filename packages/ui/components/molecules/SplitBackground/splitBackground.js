import { Box, Button, Flex, useTheme } from "@chakra-ui/react";
import { diagonalLines, morphingDiamonds } from "hero-patterns";

import PropTypes from "prop-types";
import React from "react";

const SplitBackground = ({ headerHeight }) => {
  const { colors: { gray } } = useTheme()
  return (
    <Flex pos="absolute" zIndex={-1} direction="column" h="100%" w="100%">
      <Box
        bg="#373740"
        backgroundImage={morphingDiamonds("#42424c")}
        boxShadow="inset 0px -25px 15px -15px #313138"
        h={headerHeight}
      ></Box>
      <Box
        bg="gray.50"
        backgroundImage={diagonalLines(gray[100])}
        flexGrow={1}
      ></Box>
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
