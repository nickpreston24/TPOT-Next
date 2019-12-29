import React, { Component } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Box from '@material-ui/core/Box'
import { Tabs, Tab, Icon } from '@material-ui/core';
import { observable, action } from 'mobx';
import { observer } from 'mobx-react';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined'
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined'
import ViewQuiltOutlinedIcon from '@material-ui/icons/ViewQuiltOutlined'


const HeaderTabs = () => {
    const router = useRouter()
    const splitroute = router.pathname.split('/')
    const route = splitroute[splitroute.length - 1]
    let stop = 1
    switch (route) {
        case 'scribe':
            stop = 0
            break
        case 'editor':
            stop = 1
            break
        case 'checkout':
            stop = 2
            break
    }
    return (
        <Box maxWidth={500} color="white">
            <Tabs
                value={stop}
                indicatorColor="primary"
                textColor="inherit"
                variant="fullWidth"
                aria-label="action tabs example"
            >
                <LinkTab icon={<ViewQuiltOutlinedIcon />} label="Overview" href="/scribe" />
                <LinkTab icon={<CreateOutlinedIcon />} label="Editor" href="/scribe/editor" />
                <LinkTab icon={<ShoppingCartOutlinedIcon />} label="Checkout" href="/scribe/checkout" />
            </Tabs>
        </Box>
    )
}

const LinkTab = ({icon, label, href}) => {
    const router = useRouter()
    return (
        <Tab
            {...{ icon, label }} 
            component="a"
            onClick={(e) => router.push(href)}
        />
    )
}


// @observer
// class HeaderTabs extends Component {

//     @observable value = 0

//     @action handleChange = (e, newValue) =>
//         this.value = newValue

//     render() {
//         return (
//             <Box maxWidth={500} color="white">
//                 <Tabs
//                     value={this.value}
//                     onChange={this.handleChange}
//                     indicatorColor="primary"
//                     textColor="inherit"
//                     variant="fullWidth"
//                     aria-label="action tabs example"
//                 >
//                     <Tab icon={<ViewQuiltOutlinedIcon />} label="Overview" />
//                     <Tab icon={<CreateOutlinedIcon />} label="Editor" />
//                     <Tab icon={<ShoppingCartOutlinedIcon />} label="Checkout" />
//                 </Tabs>
//             </Box>
//         )
//     }
// }

export default HeaderTabs;

{/* <Link href="/">
    <a>Home</a>
</Link>
<Link href="/about">
    <a>About</a>
</Link> */}