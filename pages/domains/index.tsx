import {
    Heading, Box, Text, Spinner
    , Input, Stack, InputGroup, InputLeftAddon
    , Button, useDisclosure, Modal, ModalOverlay
    , ModalContent, ModalHeader, ModalCloseButton
    , ModalBody, FormControl, FormLabel, ModalFooter
} from '@chakra-ui/core'
import { Paper } from 'models';
import { useWordpress } from '../../hooks'
import { useState, useEffect, useRef } from 'react';
import { mapToDto, Alter, With, createInstance, toDto } from 'models/domain';
import { Dropdown } from './Dropdown'
import { sessions } from '../../stores'
import { notify } from 'components/experimental/Toasts';
import { CurrentSessions } from '../../components/list/CurrentSessions';
import { PublishedPapers } from '../../components/list/PublishedPapers';
import { WordpressUser } from '../../models/User';

const DEFAULT_AUTHOR = 9;

export const DomainTests = () => {

    const { getPages, publish, getUser } = useWordpress();
    const [loading, setLoading] = useState(true);
    const [pages, setPages] = useState<Paper[]>([]);
    const [categories, setCategories] = useState([""]);
    const [title, setTitle] = useState("");
    const [contents, setContents] = useState("<h1>Test Header</h1><p>lorem ipsum</p>");
    const [user, setUser] = useState(createInstance(WordpressUser));

    const authorId = user.id;

    const { isOpen, onOpen, onClose } = useDisclosure();

    const initialRef = useRef();
    const finalRef = useRef();

    // let sessions = []
    // sessions.push(testSession);

    useEffect(() => {
        getPages(authorId)
            .then((records) => {
                console.log('records :>> ', records);
                let collection = mapToDto(records, Paper);
                setPages(collection);
                setLoading(false)
            })

        getUser(authorId)
            .then((results) => {
                results['yoast_head'] = '' // Try: https://blog.bitsrc.io/6-tricks-with-resting-and-spreading-javascript-objects-68d585bdc83
                console.log('current user :>> ', results);
                setUser(toDto(results, WordpressUser))
            })
    }, []);

    const onSubmit = async () => {
        onClose();
        await publish(new Paper(title, contents))
            .then(async (response) => {
                // console.log('wp paper :>> ', toDto(response, Session)) // @MP: For now, only maps 'content', 'slug' and 'title'
                // console.log('title :>> ', title);
                // console.log('contents :>> ', contents);
                // console.log('response.author :>> ', response.author);
                // console.log('response.id :>> ', response.id);
                // console.log('response :>> ', response);

                // CREATE SESSION:
                const document = await sessions.add({
                    authorId: response.author || DEFAULT_AUTHOR,
                    paperId: response.id,

                    date_modified: response.modified,
                    status: response.status,
                    contributors: [user.email || user.name],
                    code: response.content.rendered,
                    original: '',
                    excerpt: '',
                    title,
                })

                if (!document) {
                    notify(`Failed to create entry: ${title}`, 'warn')
                    return;
                }
                else {
                    notify(`New Paper created for: ${title}\n`, 'success')
                }

                return document;
            })
    }

    return (
        <Box
            height="100%"
        >
            <Stack>
                <Heading>
                    Testing WP Papers here!
                </Heading>
                <Stack spacing={4}>
                    <InputGroup>
                        <InputLeftAddon >&lt;Html/&gt;</InputLeftAddon>
                        <Input
                            ref={finalRef}
                            value={contents}
                            onChange={(event) => { setContents(event.target.value) }}
                            type="tel"
                            roundedLeft="0"
                            placeholder="<p>sample</p>" />
                    </InputGroup>
                </Stack>

                <Box>
                    <Button onClick={onOpen}>Submit Paper</Button>

                    <Modal
                        initialFocusRef={initialRef}
                        finalFocusRef={finalRef}
                        isOpen={isOpen}
                        onClose={onClose}
                    >
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>Save your Paper</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody pb={6}>
                                <FormControl>
                                    <FormLabel>Paper Title</FormLabel>
                                    <Input
                                        value={title}
                                        onChange={(event) => { setTitle(event.target.value) }}
                                        ref={initialRef} placeholder="paper-name-here" />
                                </FormControl>

                                <FormControl mt={4}>
                                    <FormLabel>Categories</FormLabel>
                                    <Input
                                        value={categories}
                                        onChange={(event) => { setCategories(event.target.value.split(',')) }}
                                        placeholder="e.g 'Chinese', 'Translations'" />
                                </FormControl>
                            </ModalBody>

                            <ModalFooter>
                                <Button
                                    onClick={onSubmit}
                                    variantColor="blue" mr={3}>
                                    Save
                                </Button>
                                <Button onClick={onClose}>Cancel</Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>

                </Box>

                {!!loading
                    ? <Spinner />
                    : <PublishedPapers entries={pages} title="Your Published Papers" />}

                <CurrentSessions entries={[]} title="Your Current Drafts" />
            </Stack>
        </Box >
    )
}

export default DomainTests;

