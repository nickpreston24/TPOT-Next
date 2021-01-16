import React from 'react';
import PostList from './PostList';
import { useFirestoreQuery } from 'hooks';
import { store } from 'services/firebase/firebase';
import Spinner from '@chakra-ui/core/dist/Spinner';

// All Sessions
export const SessionsList = () => {

    const { data, status, error } = useFirestoreQuery(
        store.collection('sessions') // Collection
    );

    if (status === "loading") {
        return <Spinner />;
    }

    if (status === "error") {
        return <div><b>`Error: ${error.message}`</b></div>;
    }

    return <PostList
        style={{ background: "linear-gradient(to left, #ff34d7, #2bc0e4)", color: '#efe' }}
        heading="Sessions"
        posts={data}
    />;
};

export default SessionsList