import { useEffect, useState } from "react";
import axios from 'axios'
import PostList from "./PostList";
import { useWordpress } from "hooks";

const sessionStyle = { background: "linear-gradient(to left, #ff34d7, #2bc0e4)", color: '#efe' }

export const DraftedPapersList = ({ take = 10 }) => {

    const [posts, setPosts] = useState([]); // Papers from Wordpress
    const [loading, setLoading] = useState(false);
    const { wpapi, getPagesForAuthor } = useWordpress();

    // Effect for API call
    useEffect(() => {
        setLoading(true);

        // NOTE: Axios requires a nonce to be passed and auth'd when searching for DRAFTS, not publihs for some reason
        // see: https://wordpress.org/support/topic/wp-api-get-posts-with-statusdraft-returns-401/
        let query = `pages?per_page=${take}&status=publish"`;
        let url = `https://www.thepathoftruth.com/wp-json/wp/v2/${query}`;
        axios
            .get(url)
            .then((response) => {
                setPosts(response.data);
                setLoading(false);
            });
    }, []);

    return <PostList
        style={sessionStyle}
        heading="Drafts"
        posts={posts}
        loading={loading}
    />

};


export default DraftedPapersList