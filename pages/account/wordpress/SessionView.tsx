import React from 'react';
import { useFirestoreQuery } from 'hooks';
import { store } from 'services/firebase/firebase';
import Post from './Post';

const sessionStyle = { background: "linear-gradient(to left, #ff34d7, #2bc0e4)", color: '#efe' }


// Renders A Single Session by a known uid
export const SessionView = ({ uid = '-1' }) => {

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
        !!uid ? null :
            <Post
                style={sessionStyle}
                post={data} />
    );
};

export default SessionView