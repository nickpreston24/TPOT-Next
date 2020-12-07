import Box from "@chakra-ui/core/dist/Box";
import Heading from "@chakra-ui/core/dist/Heading";
import List from "@chakra-ui/core/dist/List";
import Spinner from "@chakra-ui/core/dist/Spinner";
import { Paper } from "models";
import React, { FC } from "react";
import Post from "./Post";

type Props = {
    heading?: string,
    loading?: boolean, // Use the loading spinner...or if not, just leave null
    posts: Paper[],
    style: any,
}

/** Renders a list of Posts */
export const PostList: FC<any> = ({ heading = '', loading = null, posts = [], style = { color: '#111', background: 'transparent' } }) => {

    if (!posts || posts.length == 0)
        return null;

    return (
        <Box>
            {!!heading &&
                <Box textAlign="center">
                    <Heading>{heading}</Heading>
                </Box>
            }

            {
                !!loading
                    ? <Spinner />
                    : <List>
                        {posts.map((post, id) => (
                            <Post
                                style={style}
                                key={id}
                                post={post}
                            />
                        ))}
                    </List>
            }
        </Box>
    );
}

export default PostList;