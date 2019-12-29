import React, { Component } from 'react'
import Link from 'next/link'
import Box from '@material-ui/core/Box'
import { Tabs, Tab, Icon } from '@material-ui/core';
import { observable, action } from 'mobx';
import { observer } from 'mobx-react';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined'
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined'
import ViewQuiltOutlinedIcon from '@material-ui/icons/ViewQuiltOutlined'


@observer
class HeaderTabs extends Component {

    @observable value = 0

    @action handleChange = (e, newValue) =>
        this.value = newValue

    render() {
        return (
            <Box maxWidth={500} color="white">
                <Tabs
                    value={this.value}
                    onChange={this.handleChange}
                    indicatorColor="primary"
                    textColor="inherit"
                    variant="fullWidth"
                    aria-label="action tabs example"
                >
                    <Tab icon={<ViewQuiltOutlinedIcon />} label="Overview" />
                    <Tab icon={<CreateOutlinedIcon />} label="Editor" />
                    <Tab icon={<ShoppingCartOutlinedIcon />} label="Checkout" />
                </Tabs>
            </Box>
        )
    }
}

export default HeaderTabs;

{/* <Link href="/">
    <a>Home</a>
</Link>
<Link href="/about">
    <a>About</a>
</Link> */}