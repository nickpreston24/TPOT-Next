import axios from 'axios'
import Box from '@chakra-ui/core/dist/Box'
import Button from '@chakra-ui/core/dist/Button'
import FormControl from '@chakra-ui/core/dist/FormControl'
import FormLabel from '@chakra-ui/core/dist/FormLabel'
import Input from '@chakra-ui/core/dist/Input'
import React, { useEffect, useState } from 'react'
import Flex from '@chakra-ui/core/dist/Flex'
import Heading from '@chakra-ui/core/dist/Heading'
import PostList from './PostList'
import { DeadLinks } from './DeadLinks'
import { useDebounce } from 'hooks'

export default function Search() {

    // const sample_url = 'https://www.thepathoftruth.com/false-teachers/clayton-jennings.htm'
    // const sample_term = 'clayton-jennings'

    // const sample_content_search = 'https://www.thepathoftruth.com/wp-json/wp/v2/pages?per_page=3&search=replacement%20theology'

    // const sample_title_search = ''

    const [form, updateForm] = useState({ term: '' })
    const [papers, setPapers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [url, setUrl] = useState('');

    const [isSearching, setIsSearching] = useState(false);
    // Debounce search term so that it only gives us latest value ...
    // ... if searchTerm has not been updated within last 500ms.
    // The goal is to only have the API call fire when user stops typing ...
    // ... so that we aren't hitting our API rapidly.
    const debouncedSearchTerm = useDebounce(form.term, 500);

    // Effect for API call 
    useEffect(
        () => {
            if (debouncedSearchTerm) {
                setIsSearching(true);

                let url = `https://www.thepathoftruth.com/wp-json/wp/v2/pages?per_page=10&search=${debouncedSearchTerm.trim()}`

                axios
                    .get(url)
                    .then((response) => {
                        console.log('response :>> ', response.data);
                        setPapers(response.data)
                        setLoading(false);
                        setIsSearching(false);
                    })
                    .catch(console.error);
            } else {
                setPapers([]);
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

        setUrl(`https://www.thepathoftruth.com/wp-json/wp/v2/pages?per_page=10&search=${form.term.trim()}`)
        console.log('url :>> ', url);
    };



    const onSubmit = (e) => {
        e.preventDefault();
        setLoading(true)
        setUrl(`https://www.thepathoftruth.com/wp-json/wp/v2/pages?per_page=10&search=${form.term.trim()}`)
        console.log('url :>> ', url);
        axios
            .get(url)
            .then((response) => {
                console.log('response :>> ', response.data);
                setPapers(response.data)
                setLoading(false);
            })
            .catch(console.error);
    }

    return (
        <Flex
            width="100%"
            align="center"
        >
            <Box p={2}
                width="100%"
            >
                <Box textAlign="center">
                    <Heading>Search</Heading>
                </Box>
                <Box my={4} textAlign="left">
                    <form onSubmit={onSubmit}>
                        <a href={url}>{url}</a>
                        <FormControl>
                            <FormLabel>Search by Contents</FormLabel>
                            <Input
                                value={form.term}
                                name='term'
                                onChange={updateField}
                                type="text" isRequired placeholder="faith" />
                        </FormControl>
                        <Button
                            variantColor="teal"
                            variant="outline"
                            type="submit"
                            width="full"
                            mt={4}>
                            Search
                        </Button>
                    </form>
                </Box>

                <PostList
                    heading="Results"
                    loading={loading}
                    papers={papers}
                />

                <DeadLinks
                    loading={loading}
                    papers={papers}></DeadLinks>
            </Box>

        </Flex>
    );
}