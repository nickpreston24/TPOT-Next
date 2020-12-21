import DashboardLayout from '@layouts/DashboardLayout'
import React from 'react'

export default {
    title: 'Layouts/Dashboard',
    parameters: {
        layout: 'fullscreen',
    },
}

const Template = args => <DashboardLayout {...args} />

export const Example = Template.bind({})
Example.args = {
    title: 'Kittens',
}

export const Empty = Template.bind({})
