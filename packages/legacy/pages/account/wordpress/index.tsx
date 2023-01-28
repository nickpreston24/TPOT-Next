import Stack from '@chakra-ui/core/dist/Stack';
import React, { } from 'react';
import CategoryList from './CategoryList';
import { DraftedPapersList } from './DraftedPapersList';
import PostList from './PostList';
import SearchBar from './SearchBar';

const Wordpress = () => {

    return (
        <Stack>
            <SearchBar>
                {({ loading, posts }) =>
                    <Stack direction='row'>
                        <PostList
                            style={{ background: "linear-gradient(to left, #ff34d7, #2bc0e4)", color: '#efe' }}
                            heading="Search Results"
                            posts={posts}
                            loading={loading}
                        />
                        <DraftedPapersList />
                        <CategoryList />
                    </Stack>
                }
            </SearchBar>
        </Stack>
    );
}

export default Wordpress;
