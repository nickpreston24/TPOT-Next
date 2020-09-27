import Dashboard from "@organisms/Dashboard";
import React from "react";

export default {
  title: "Organisms/Dashboard",
  parameters: {
    layout: "fullscreen",
  },
};

const Template = (args) => <Dashboard {...args} />;

export const Example = Template.bind({});
Example.args = {
  title: "Kittens",
};

export const Empty = Template.bind({});
