import Box from '@chakra-ui/core/dist/Box';
import List from '@chakra-ui/core/dist/List';
import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { Post } from './Post'
import { Spinner } from '@chakra-ui/core';

export const ChineseIndex = () => {

    const [isLoading, setIsLoading] = useState(true)
    const [posts, setPosts] = useState([])

    let url = "https://www.thepathoftruth.com/wp-json/wp/v2/pages"
    useEffect(() => {
        axios
            .get(url)
            .then((response) => {
                // console.log('response :>> ', response.data);
                // setPosts(response.data);
                setPosts(response.data)
                setIsLoading(false);
            })
            .catch(console.error);
    }, []);

    return (
        <Box>
            <h2>
                Chinese index:
            </h2>
            {
                isLoading
                    ? <Spinner />
                    : <List>
                        {posts.map((post, id) => (
                            <Post                                
                                key={id} post={post}></Post>
                        ))}
                    </List>
            }
        </Box>
    );
}

export default ChineseIndex;