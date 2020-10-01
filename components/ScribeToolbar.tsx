import { useState, useRef, useEffect, FC } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
} from '@chakra-ui/core/dist/Modal'

import Flex from '@chakra-ui/core/dist/Flex'
import FormLabel from '@chakra-ui/core/dist/FormLabel'
import FormControl from '@chakra-ui/core/dist/FormControl'
import Input from '@chakra-ui/core/dist/Input'
import ButtonGroup from '@chakra-ui/core/dist/ButtonGroup'
import Button from '@chakra-ui/core/dist/Button'
import useDisclosure from '@chakra-ui/core/dist/useDisclosure'
import Select from '@chakra-ui/core/dist/Select';
import Tooltip from '@chakra-ui/core/dist/Tooltip';
// import { SelectControl } from '@chakra-ui/core/dist/Select'


import UploadButton from 'components/buttons/UploadButton';
import { useWordpress, useAuth } from 'hooks';
import { checkoutSession } from 'stores/sessionsAPI';
import Router, { useRouter } from 'next/router';
import React from 'react';
import { isDev } from 'helpers';

import { scribeStore } from '../stores'
import { useObserver } from 'mobx-react';
import { CheckoutStatus } from 'constants/CheckoutStatus';
import { ROUTES } from 'constants/routes';
import { LanguageOptions, Language } from '../constants';
import { UploadMode } from '../models/UploadMode';
import { useSessions } from 'hooks/useSessions';
import { Session } from 'models';


type ScribeToolbarProps = {
    getHtml: Function
}

// const scribeState = observable({
//     language: Language.English
// })

export const ScribeToolbar: FC<ScribeToolbarProps> = (props) => {

    // Retrieve current session id:
    const router = useRouter();
    let doc = router.query.doc;

    isDev() && console.log('doc id :>> ', doc);

    const { isOpen, onOpen, onClose } = useDisclosure();

    // Session API functions:
    const { getHtml } = props;

    const { updatePaper, savePaper } = useSessions();

    /** 
     * Form
     */
    const [form, updateForm] = useState<any>({
        language: Language.English,
        mode: UploadMode.Paste,
        title: '', //lastSession?.title || "",
        categoriesText: "",
    });

    /**
     * Updates the appropriate state prop by its field name from the 
     * form where 'name' is a prop on the target component
     */
    const updateField = (e) => {
        updateForm({ ...form, [e.target.name]: e.target.value });
    };


    /** Modal Refs */
    const initialRef = useRef();
    const finalRef = useRef();

    /**
     * Checkout on load if doc exists
     */
    useEffect(() => {

        console.log('form :>> ', form);
        isDev() && console.log('checking out doc :>> ', doc);

        // Setup the Reset of status on route change /edit/ => /checkout/:
        Router.events.on('routeChangeComplete', (url) => {
            if (url === ROUTES.CHECKOUT || url === ROUTES.EDIT)
                updatePaper({ doc })
        })

        if (!!doc) {
            checkoutSession(doc as string)
                .then((result) => {

                    updateForm({ title: result.title })

                    !!result.categories &&
                        updateForm({
                            categoriesText: result.categories?.join(", ") || ''
                        })

                    // setStatus(CheckoutStatus.CheckedOut)
                })
        }

        if (!doc) {
            // setStatus(CheckoutStatus.NotStarted)
        }

    }, []);

    const onSave = async () => {

        let session: Session = {
            docId: doc as string,
            title: form.title,
            status: CheckoutStatus.InProgress,
            code: getHtml(),
            language: form.language,
            categories: form.categories,
            date_modified: new Date(),
            date_uploaded: null,
            contributors: [],
        }

        savePaper(session);
        onOpen();
    }

    const onPublish = async () => {
        // setStatus(CheckoutStatus.FirstDraft)
        onOpen()
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        onClose();
        console.log('form :>> ', form);
    }

    return (
        <Flex>
            <ButtonGroup spacing={8}>
                <Tooltip
                    aria-label="publish-tooltip"
                    label="Publish a Draft to TPOT"
                >
                    <Button
                        onClick={onPublish}
                    >
                        Publish
                    </Button>
                </Tooltip>

                {(form.uploadOption === 'Drive' && isDev()) &&
                    <UploadButton
                        label="Load"
                    >
                        Load a Document
                    </UploadButton>
                }

                <Tooltip
                    aria-label="save-tooltip"
                    label="Save your work as a Session"
                >
                    <Button
                        onClick={onSave}
                    >
                        Save
                    </Button>

                </Tooltip>
            </ButtonGroup>

            {isDev() && <ScribeDevStatusBar />}
            {/* {isDev() && <SelectChip />} */}

            {/* Publish  */}

            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{"Save Paper"}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>

                        {/* Title */}
                        <FormControl
                            onSubmit={onSubmit}
                        >
                            <FormLabel>Title</FormLabel>
                            <Input
                                name="title"
                                value={form.title}
                                onChange={updateField}
                                ref={initialRef}
                                placeholder="paper-name-here"
                            />
                        </FormControl>

                        {/* Category */}
                        <FormControl>
                            <FormLabel>Categories</FormLabel>
                            <Input
                                name="categoriesText"
                                value={form.categoriesText}
                                onChange={updateField}
                                placeholder="e.g 'Chinese', 'Translations'" />
                        </FormControl>

                        {/* Language */}
                        <FormControl mt={4}>
                            <FormLabel>Language</FormLabel>

                            <LanguageSelect
                                name="language"
                                handleChange={updateField}
                            />
                        </FormControl>

                    </ModalBody>

                    <ModalFooter>
                        <Button
                            onClick={onSubmit}
                            variantColor="blue" mr={3}>
                            Submit
                                </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

        </Flex>
    )
};

/** Shows the current status of Scribe in this toolbar
 * Meant only for DEBUG/Development mode.
*/
const ScribeDevStatusBar: FC = () => {
    // const { dirty, currentStatus, lastStatus, lastSession } = scribe;
    return useObserver(() =>
        <Flex style={{ border: "1px #aaa solid" }} mb={2}>
            <h1 style={{ marginRight: '10px' }}>{scribeStore.lastStatus || ''} &gt; {scribeStore.currentStatus}</h1>
            {/* <p>Dirty? {dirty ? "Yes" : "No"}</p> */}
            {/* {!!lastSession && <p>Id: {lastSession}</p>} */}
        </Flex>
    )
}

const LanguageSelect = (props) => {

    const { handleChange } = props;

    return (
        <Select
            onChange={handleChange}
            placeholder="Choose a language"
        >
            {LanguageOptions.map((name, key) => <option key={key}>{name}</option>)}
        </Select>
    )
}

export default ScribeToolbar;


 // NOTE: We won't need wordpress users until much later in the special case where a published paper needs reviewed.

// console.log('wpUsers :>> ', wpUsers, authUser);

// let authorId = session.authorId;

// if (!!authorId) {

//     getUser(authorId)
//         .then((wpUser) => {
//             wpUser['yoast_head'] = '' // Try: https://blog.bitsrc.io/6-tricks-with-resting-and-spreading-javascript-objects-68d585bdc83
//             // console.log('current user :>> ', records);
//             setUser(toDto(wpUser, WordpressUser))
//         })

//      getPages(authorId)
//          .then((records) => {
//          // console.log('records :>> ', records);
//          let collection = mapToDto(records, Paper);
//          setPapers(collection);
//          setLoading(false)
//      })

//      getAuthorSessions(authorId)
//         .then((sessions) => {
//             console.log('session records', sessions)
//         })
// }

// console.log('authorId', authorId)