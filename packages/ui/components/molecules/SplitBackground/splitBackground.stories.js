import Background from "@molecules/SplitBackground";
import React from "react";

export default {
  title: "Molecules/SplitBackground",
  parameters: {
    layout: "fullscreen",
  },
};

const Template = (args) => <Background {...args} />;

export const Example = Template.bind({});
Example.args = {
  title: "Kittens",
};

export const Empty = Template.bind({});
