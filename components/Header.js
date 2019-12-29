import React from 'react'
import Link from 'next/link'
import Box from '@material-ui/core/Box'

const Header = () => (
    <Box display="flex" bgcolor="#21304a" height={70}>
        <Link href="/">
            <a>Home</a>
        </Link>
        <Link href="/about">
            <a>About</a>
        </Link>
    </Box>
);

export default Header;