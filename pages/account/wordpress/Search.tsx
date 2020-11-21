import axios from 'axios'
import Box from '@chakra-ui/core/dist/Box'
import Button from '@chakra-ui/core/dist/Button'
import FormControl from '@chakra-ui/core/dist/FormControl'
import FormLabel from '@chakra-ui/core/dist/FormLabel'
import Input from '@chakra-ui/core/dist/Input'
import React, { useEffect, useState } from 'react'
import Icon from '@chakra-ui/core/dist/Icon'
import Flex from '@chakra-ui/core/dist/Flex'
import Heading from '@chakra-ui/core/dist/Heading'
import Stack from '@chakra-ui/core/dist/Stack'
import { InputLeftElement } from '@chakra-ui/core/dist/InputElement'
import PostList from './PostList'
import { DeadLinks } from './DeadLinks'
import { useDebounce, useFirestoreQuery } from 'hooks'
import { MdSearch } from "react-icons/md"
import InputGroup from '@chakra-ui/core/dist/InputGroup'
import { store } from 'services/firebase/firebase'
import Post from './Post'
import Spinner from '@chakra-ui/core/dist/Spinner'

const sessionStyle = { background: "linear-gradient(to left, #ff34d7, #2bc0e4)", color: '#efe' }
const tpotStyle = { background: "linear-gradient(to left, #722, #f31)", color: '#efe' }

export default function Search({ take = 10 }) {

    const [form, updateForm] = useState({ term: '' })
    const [papers, setPapers] = useState([]); // Papers from Wordpress
    const [sessions, setSessions] = useState([{
        title: 'test',
        excerpt: 'test',
        slug: 'test-session',
        href: 'http://www.thepathoftruth.com',

    }]); // Sessions from Firestore
    const [loading, setLoading] = useState(false);
    const [url, setUrl] = useState('');

    // Debounce search term so that it only gives us latest value 
    // so that we aren't hitting our API rapidly.
    const debouncedSearchTerm = useDebounce(form.term, 500).trim();

    // Effect for API call
    useEffect(() => {
        // console.log('loading? :>> ', loading);
        setLoading(true);

        if (debouncedSearchTerm) {
            setLoading(true);
            let query = `pages?per_page=${take}&search="${debouncedSearchTerm}"`
            let url = `https://www.thepathoftruth.com/wp-json/wp/v2/${query}`

            setUrl(url)

            axios
                .get(url)
                .then((response) => {
                    // console.log('response :>> ', response.data);
                    setPapers(response.data)
                    setLoading(false);
                })
                .catch(console.error);

        } else {
            // setPapers([]);
            setLoading(false)
        }
    },
        [debouncedSearchTerm] // Only call effect if debounced search term changes
    );

    /**
     * Updates the appropriate state prop by its field name from the 
     * form where 'name' is a prop on the target component
     */
    const updateField = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        updateForm({ ...form, [name]: value });
    };

    const onSubmit = (e) => {
        e.preventDefault();

        if (!url)
            return;

        setLoading(true)
        axios
            .get(url)
            .then((response) => {
                // console.log('response :>> ', response.data);
                setPapers(response.data)
                setLoading(false);
            })
            .catch(console.error);
    }

    return (
        <Stack
            width="100%"
            align="center"
            p={2}
        >
            <Box textAlign="center">
                <Heading size="lg">Search</Heading>
            </Box>
            <Stack
                my={4}
                textAlign="left"
                direction='column'
            >
                <form onSubmit={onSubmit}>
                    <a href={url}>{url}</a>
                    <FormControl>
                        <FormLabel>Search by Contents</FormLabel>

                        <InputGroup>

                            <InputLeftElement
                                pointerEvents="none"
                                children={<Icon
                                    as={MdSearch}
                                    size="5"
                                    color="green.300" />}
                            />
                            <Input
                                value={form.term}
                                name='term'
                                onChange={updateField}
                                type="text"
                                isRequired
                                placeholder="faith"
                            />
                            {/* <InputRightElement children={<MdSearch color="green.500" /> */}
                        </InputGroup>
                    </FormControl>
                    <Button
                        variantColor="teal"
                        variant="outline"
                        type="submit"
                        width="full"
                        mt={4}
                        isDisabled={loading}
                    >
                        Search
                        </Button>
                </form>
            </Stack>


            <Stack direction='row'>

                <PostList
                    style={tpotStyle}
                    heading="Results"
                    loading={loading}
                    papers={papers}
                />

                {/* <PostList
                    heading="Results"
                    loading={loading}
                    papers={sessions}
                /> */}

                {/* <SessionDoc uid={'my-paper'} /> */}
                <SessionsList />
            </Stack>

            <DeadLinks
                loading={loading}
                papers={papers}
            />

        </Stack>
    );
}


// All Sessions
const SessionsList = () => {

    const { data, status, error } = useFirestoreQuery(
        store.collection('sessions') // Collection
    )

    if (status === "loading") {
        return <Spinner />
    }

    if (status === "error") {
        return <div><b>`Error: ${error.message}`</b></div>
    }

    console.log('data :>> ', data);

    return <PostList
        style={sessionStyle}
        heading="Sessions" papers={data} />
}

// Single Session
const SessionDoc = ({ uid }) => {

    const { data, status, error } = useFirestoreQuery(
        store.collection('sessions')
            .doc(uid) // Document
    )

    if (status === "loading") {
        return "Loading...";
    }

    if (status === "error") {
        return `Error: ${error.message}`;
    }

    console.log('data :>> ', data);

    return (
        <Post
            style={sessionStyle}
            post={data}
        />
    );
}