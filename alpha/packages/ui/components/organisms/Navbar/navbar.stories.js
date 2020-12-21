import Navbar from "@organisms/Navbar";
import React from "react";

export default {
  title: "Organisms/Navbar",
  parameters: {
    layout: "fullscreen",
  },
};

const Template = (args) => <Navbar {...args} />;

export const Example = Template.bind({});
Example.args = {
  title: "Kittens",
};

export const Empty = Template.bind({});
