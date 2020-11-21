import Box from "@chakra-ui/core/dist/Box";
import Heading from "@chakra-ui/core/dist/Heading";
import List from "@chakra-ui/core/dist/List";
import Spinner from "@chakra-ui/core/dist/Spinner";
import React from "react";
import Post from "./Post";

/** Renders a list of Posts */
export const PostList = ({ heading, loading, papers }) => {

    if (!papers || papers.length == 0)
        return null;

    return (

        <Box>
            <Box textAlign="center">
                <Heading>{heading}</Heading>
            </Box>

            {
                loading
                    ? <Spinner />
                    : <List>
                        {papers.map((post, id) => (
                            <Post key={id} post={post} />
                        ))}
                    </List>
            }
        </Box>
    );
}

export default PostList;