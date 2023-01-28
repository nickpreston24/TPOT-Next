import React from 'react';
import { useFirestoreQuery } from 'hooks';
import { store } from 'services/firebase/firebase';
import Post from './Post';

// Renders A Single Session by a known uid
const Session = ({ uid='0001' }) => {

    const { data, status, error } = useFirestoreQuery(
        store.collection('sessions')
            .doc(uid) // Document
    );

    if (status === "loading") {
        return "Loading...";
    }

    if (status === "error") {
        return `Error: ${error.message}`;
    }


    return (
        <Post
            post={data} />
    );
};

export default Session