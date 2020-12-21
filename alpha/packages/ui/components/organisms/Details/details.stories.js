import Details from '@organisms/Details'
import React from 'react'

export default {
    title: 'organisms/Details',
    parameters: {
        layout: 'fullscreen',
    },
}

const Template = args => <Details {...args} />

export const Example = Template.bind({})
Example.args = {
    name: 'Dave',
}

export const Empty = Template.bind({})
