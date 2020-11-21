import Box from '@chakra-ui/core/dist/Box';
import Flex from '@chakra-ui/core/dist/Flex';
import Heading from '@chakra-ui/core/dist/Heading';
import List from '@chakra-ui/core/dist/List';
import Spinner from '@chakra-ui/core/dist/Spinner';
import { useWordpress } from 'hooks';
import React from 'react';

const CategoryList = () => {

    const { categories, loading } = useWordpress();

    return (
        <Box
            width="full"
        >
            <Box textAlign="center">
                <Heading>Categories</Heading>
            </Box>

            {loading
                ? <Spinner />
                : <List>
                    {categories.map((category) => {
                        let {
                            name,
                            id,
                            count
                        } = category;
                        return (
                            <Flex
                                key={id}
                                direction="row">
                                <h3>{name} <p>({count})</p></h3>
                            </Flex>);
                    })}</List>}
        </Box>
    );
};
