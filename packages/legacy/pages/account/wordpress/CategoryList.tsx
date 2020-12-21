import Box from '@chakra-ui/core/dist/Box';
import Flex from '@chakra-ui/core/dist/Flex';
import Heading from '@chakra-ui/core/dist/Heading';
import List from '@chakra-ui/core/dist/List';
import Spinner from '@chakra-ui/core/dist/Spinner';
import { Card } from 'components/atoms';
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
                                <Card>
                                    {{
                                        header: <Heading size="md">{name} - ({count})</Heading>,
                                        content: <Heading size="sm">Id: {id}</Heading>,
                                    }}
                                </Card>
                            </Flex>);
                    })}</List>}
        </Box>
    );
};

export default CategoryList