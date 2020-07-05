import { useState, FC, useRef, useEffect } from 'react';
import { Box, ModalOverlay, Modal, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, Input, ModalFooter, useDisclosure, Button } from '@chakra-ui/core'
import { ZeitLinkButton } from 'components/experimental/ZeitLinkButton';
import * as ROUTES from 'constants/routes'
import { Selector } from 'components/dialogs'
import UploadButton from 'components/buttons/UploadButton';
import { notify } from './experimental/Toasts';
import { useWordpress, useAuth } from 'hooks';
import { mapToDto, createInstance } from 'models/domain';
import { toDto, Paper } from 'models';
import { WordpressUser } from 'models/User';
import { sessions } from 'stores';
import { refStructEnhancer } from 'mobx/lib/internal';
import { disableMe } from './disableMe';
import Link from 'next/link';

const uploadOptions = ['Drive', 'Google', 'Copy-paste']

const DEFAULT_AUTHOR = 9;

export const WordPressToolbar = (props) => {

    const { getHtml } = props;

    const [uploaderOpen, setUploaderOpen] = useState(false);
    // const { user: authUser } = useAuth();
    // console.log('authUser :>> ', authUser);  //TODO: Get the wordpress author off of this user.

    const [disabled, setDisabled] = useState(true); // For whatever we wish to disable in prod.

    const { getPages, publish, getUser } = useWordpress();
    const [option, setOption] = useState(uploadOptions[1]);

    const initialRef = useRef();
    const finalRef = useRef();

    const [loading, setLoading] = useState(true);
    const [pages, setPages] = useState<Paper[]>([]);
    const [categories, setCategories] = useState([""]);
    const [title, setTitle] = useState("");
    const [contents, setContents] = useState("<h1>Test Header</h1><p>lorem ipsum</p>");
    const [user, setUser] = useState(createInstance(WordpressUser));
    const { isOpen, onOpen, onClose } = useDisclosure();

    user.id = user.id || DEFAULT_AUTHOR; //TODO: Search firebase for authUser's wp.author id.
    const authorId = user.id;
    // console.log('user.id :>> ', user.id);

    useEffect(() => {
        if (!!authorId) {

            getPages(authorId)
                .then((records) => {
                    // console.log('records :>> ', records);
                    let collection = mapToDto(records, Paper);
                    setPages(collection);
                    setLoading(false)
                })

            getUser(authorId)
                .then((records) => {
                    records['yoast_head'] = '' // Try: https://blog.bitsrc.io/6-tricks-with-resting-and-spreading-javascript-objects-68d585bdc83
                    // console.log('current user :>> ', records);
                    setUser(toDto(records, WordpressUser))
                })
        }
    }, []);


    const onSelected = (selectedOption) => setOption(selectedOption);

    const onSubmit = async () => {
        onClose();

        setContents(getHtml())
        console.log('contents :>> ', contents);
        console.log('title :>> ', title);

        publish(new Paper(title, contents))
            .then(async (response) => {
                // console.log('wp paper :>> ', toDto(response, Session)) // @MP: For now, only maps 'content', 'slug' and 'title'
                // console.log('title :>> ', title);
                // console.log('contents :>> ', contents);
                // console.log('response.author :>> ', response.author);
                // console.log('response.id :>> ', response.id);
                console.log('response :>> ', response);

                if (!response.id) {
                    console.warn('No paper could be created as there was no response from Wordpress')
                    return
                }
                
                // CREATE SESSION:
                const document = await sessions.add({
                    authorId: response.author || DEFAULT_AUTHOR,
                    paperId: response.id,

                    date_modified: response.modified,
                    status: response.status,
                    contributors: [user.email || user.name],
                    code: response.content ? response.content.rendered : '',
                    original: '',
                    excerpt: '',
                    title,
                })

                if (!document) {
                    notify(`Failed to create Seesion for: ${title}`, 'warn')
                    return;
                }
                else {
                    notify(`New Session created for: ${title}\n`, 'success')
                }

                return document;
            })
    }

    return (
        <Box>

            <Button
                onClick={onOpen}
            >Publish
                </Button>

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

            {/* TODO: @MP - Upgrade this to be a chakra-ui Modal */}
            <Button
                onClick={() => { }}
                style={disableMe(disabled)}
            >
                Load a Document
            </Button>

            {option === 'Drive' && <UploadButton />}

            <Selector
                title="Choose an Upload Option"
                open={uploaderOpen}
                options={uploadOptions}
                onCloseFn={onClose}
                onSelectFn={onSelected}
            ></Selector>
        </Box>
    )
};




export default WordPressToolbar;


