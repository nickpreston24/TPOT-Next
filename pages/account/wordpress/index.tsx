import Box from '@chakra-ui/core/dist/Box';
import Button from '@chakra-ui/core/dist/Button';
import Flex from '@chakra-ui/core/dist/Flex';
import List from '@chakra-ui/core/dist/List';
import Spinner from '@chakra-ui/core/dist/Spinner';
import { useAuth, useWordpress } from 'hooks';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

const index = () => {

    const router = useRouter();

    const { user } = useAuth();
    const { wpUsers, isLoading } = useWordpress();

    return (

        <Box>
            <List>
                {
                    isLoading
                        ? <Spinner size="md" />
                        : <div>Wordpress Users: {wpUsers.length}</div>
                }
            </List>

            <div>
                Hello, nothing is here yet... please go <Link href="/">Home</Link>
            </div>
        </Box>
    );
}

export default index;
