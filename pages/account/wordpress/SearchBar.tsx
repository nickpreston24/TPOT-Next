import axios from 'axios'
import Box from '@chakra-ui/core/dist/Box'
import Button from '@chakra-ui/core/dist/Button'
import FormControl from '@chakra-ui/core/dist/FormControl'
import FormLabel from '@chakra-ui/core/dist/FormLabel'
import Input from '@chakra-ui/core/dist/Input'
import React, { FC, useEffect, useState } from 'react'
import Icon from '@chakra-ui/core/dist/Icon'
import Heading from '@chakra-ui/core/dist/Heading'
import Stack from '@chakra-ui/core/dist/Stack'
import { InputLeftElement } from '@chakra-ui/core/dist/InputElement'
import { useDebounce } from 'hooks'
import { MdSearch } from "react-icons/md"
import InputGroup from '@chakra-ui/core/dist/InputGroup'

export const sessionStyle = { background: "linear-gradient(to left, #ff34d7, #2bc0e4)", color: '#efe' }

const SearchBar: FC<any> = ({ take = 10, children }) => {

    const [form, updateForm] = useState({ term: '' })
    const [posts, setPosts] = useState([]); // Papers from Wordpress
    const [loading, setLoading] = useState(false);
    const [url, setUrl] = useState('');

    // Debounce search term so that it only gives us latest value 
    // so that we aren't hitting our API rapidly.
    const debouncedSearchTerm = useDebounce(form.term, 500).trim();

    // Effect for API call
    useEffect(() => {
        setLoading(true);

        if (debouncedSearchTerm) {
            setLoading(true);
            let query = `pages?per_page=${take}&search="${debouncedSearchTerm}"`
            let url = `https://www.thepathoftruth.com/wp-json/wp/v2/${query}`

            setUrl(url)

            axios
                .get(url)
                .then((response) => {
                    console.log('response.data', response.data)
                    setPosts(response.data)
                    setLoading(false);
                })

        } else {
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
                setPosts(response.data)
                setLoading(false);
            })
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
                        // variantColor="teal"
                        color='green.300'
                        variant="outline"
                        type="submit"
                        width="full"
                        mt={4}
                        isDisabled={loading}
                    >
                        Search
                        </Button>
                </form>
                {/* {props.children({ loading, papers })} */}
                {children({ loading, posts })}
            </Stack>
        </Stack>
    );
};

export default SearchBar;