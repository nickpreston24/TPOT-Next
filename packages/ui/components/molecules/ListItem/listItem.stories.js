import ListItem from '@molecules/ListItem'
import React from 'react';

export default {
  title: "Molecules/ListItem",
  component: ListItem,
  argTypes: {
    color: { control: "color" },
  },
};

const Template = (args) => <ListItem {...args} />;


export const Default = Template.bind({});

export const Size = Template.bind({});
Size.args = {
  color: "#805AD5",
  size: "lg",
};

export const ColorHEX = Template.bind({});
ColorHEX.args = {
  color: "#1E90FF",
};

export const ColorRGB = Template.bind({});
ColorRGB.args = {
  color: "rgb(72, 187, 120)"
}

export const ColorKeyword = Template.bind({});
ColorKeyword.args = {
  color: "tomato",
};
