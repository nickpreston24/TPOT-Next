import Background from "@organisms/Background";
import React from "react";

export default {
  title: "Organisms/Background",
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
