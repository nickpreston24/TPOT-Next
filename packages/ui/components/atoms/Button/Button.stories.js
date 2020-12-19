import Button from '@atoms/Button'
import React from 'react'

export default {
    title: 'atoms/Button',
    parameters: {
        layout: 'fullscreen',
    },
}

const Template = args => <Button {...args} />

export const Example = Template.bind({})
Example.args = {
    name: 'Dave',
}

export const Empty = Template.bind({})
