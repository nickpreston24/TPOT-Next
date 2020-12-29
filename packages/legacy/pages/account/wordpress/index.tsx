import Stack from '@chakra-ui/core/dist/Stack';
import React, {  } from 'react';
import CategoryList from './CategoryList';
import { DraftedPapersList } from './DraftedPapersList';
import PostList from './PostList';
import SearchBar, { sessionStyle } from './SearchBar';

const Wordpress = () => {

    return (
        <Stack>
            <SearchBar>
                {({ loading, posts }) =>
                    <Stack direction="row">
                        <PostList
                            style={sessionStyle}
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
