import { Box, Button } from "@chakra-ui/core";

import PropTypes from "prop-types";
import React from "react";

const ListItem = ({ text, size, color, ...props }) => {
  return (
    <Button variantColor="black" bg={color} color="white" size={size} {...props}>
      {text}
    </Button>
  );
};

ListItem.propTypes = {
  /**
   * A short title for the button component
   */
  text: PropTypes.string.isRequired,
  /**
   * How large should the button be?
   */
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  /**
   * Background color (HEX string)
   */
  color: PropTypes.string,
};

ListItem.defaultProps = {
  text: 'Button',
  size: 'md',
  color: '#FF0099'
}

export default ListItem;
