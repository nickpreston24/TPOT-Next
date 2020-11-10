import Box from '@chakra-ui/core/dist/Box';
import Button from '@chakra-ui/core/dist/Button';
import Flex from '@chakra-ui/core/dist/Flex';
import List from '@chakra-ui/core/dist/List';
import Spinner from '@chakra-ui/core/dist/Spinner';
import { useAuth, useWordpress } from 'hooks';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { ChineseIndex } from './ChinesePapers'

const index = () => {

    const router = useRouter();
    const { user } = useAuth();
    const { wpUsers, isLoading, categories, getPageBySlug, search } = useWordpress();

    // console.log('categories :>> ', categories);

    useEffect(() => {
        // getPageBySlug('chinese/index.htm')
        //     .then((response) => {
        //         console.log('response :>> ', response);
        //     })

        // search('chinese')
        //     .then((response) => {
        //         console.log('response :>> ', response);
        //     })
    }, []);

    return (
        <Box>
            <ChineseIndex />

            <List>{categories.map((category, index) => {
                let { name, id, count } = category;
                return <span key={id}>
                    <h3>{name} <p>({count})</p></h3>
                </span>
            })}</List>

            {/* <List>
                {
                    isLoading
                        ? <Spinner size="md" />
                        : <div>Wordpress Users: {wpUsers.length}</div>
                }
            </List> */}

            {/* <div>
                Hello, nothing is here yet... please go <Link href="/">Home</Link>
            </div> */}
        </Box>
    );
}

export default index;
