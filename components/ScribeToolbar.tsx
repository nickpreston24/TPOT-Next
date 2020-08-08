import { useState, useRef, useEffect, FC } from 'react';
import {
    ModalOverlay,
    Modal,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    FormControl,
    FormLabel,
    Input,
    ModalFooter,
    useDisclosure,
    Button,
    ButtonGroup,
    Flex,
} from '@chakra-ui/core'
import UploadButton from 'components/buttons/UploadButton';
import { notify } from './Toasts';
import { useWordpress, useAuth } from 'hooks';
import { Paper, Session } from 'models';
import { checkoutSession, updateSession, saveSession } from 'stores/sessionsAPI';
import Router, { useRouter } from 'next/router';
import React from 'react';
import { isDev } from 'helpers';

import { scribeStore } from '../stores'
import { useObserver } from 'mobx-react';
import { ScribeStore } from 'stores/ScribeStore';
import { CheckoutStatus } from 'constants/CheckoutStatus';
import { ROUTES } from 'constants/routes';

const UploadMethod = {
    Drive: 'Drive',
    Google: 'Google',
    Paste: 'Paste'
}

const messages = {
    WarnNoWPResponse: 'No paper could be created as there was no response from Wordpress',
    Success: "Paper uploaded successfully!",
}

type ScribeToolbarProps = {
    // scribe: ScribeStore
    getHtml: Function
}

export const ScribeToolbar: FC<ScribeToolbarProps> = (props) => {

    // Retrieve current session id:
    const router = useRouter();
    let doc = router.query.doc;

    isDev() && console.log('doc :>> ', doc);

    let { dirty, currentStatus, lastStatus, lastSession, setStatus } = scribeStore;

    // Session API functions:
    const { getHtml } = props;

    /* Wordpress support: */
    const { user: authUser } = useAuth();
    const { publish } = useWordpress();


    /** Scribe States: **/
    // const [mode, setMode] = useState(null);
    // const [paper, setPaper] = useState(createInstance(Paper))
    // const [session, setSession] = useState(createInstance(Session))

    /** Modal States: **/
    const [uploadOption] = useState(UploadMethod.Drive);
    const [title, setTitle] = useState(lastSession?.title || '')
    const [categoriesText, setCategoriesText] = useState('');
    const { isOpen, onOpen, onClose } = useDisclosure();

    /** Modal Refs */
    const initialRef = useRef();
    const finalRef = useRef();


    useEffect(() => {

        isDev() && console.log('checking out doc :>> ', doc);

        // Setup the Reset of status on route change /edit/ => /checkout/:
        Router.events.on('routeChangeComplete', (url) => {
            if (url === ROUTES.CHECKOUT || url === ROUTES.EDIT)
                updateSession(doc as string, { status: CheckoutStatus.InProgress })
        })

        if (!!doc) {
            checkoutSession(doc as string)
                .then((result) => {
                    setTitle(result.title)
                    isDev() && console.log('checked out session :>> ', result);
                    !!result.categories && setCategoriesText(result.categories?.join(", ") || '')

                    setStatus(CheckoutStatus.CheckedOut)
                })
        }
        if (!doc) {
            setStatus(CheckoutStatus.NotStarted)
        }
    }, []);


    const handleTitleChange = async (event) => {
        setTitle(event.target.value);
    }

    const handleCategoryChange = async (event) => {
        setCategoriesText(event.target.value);
    }

    const onSave = async () => {
        onOpen();
    }

    const onPublish = async () => {
        // scribeStore.currentStatus = CheckoutStatus.FirstDraft
        // scribeStore.lastStatus = CheckoutStatus.CheckedOut
        setStatus(CheckoutStatus.FirstDraft)
        onOpen()
    }

    const onSubmit = async () => {

        onClose();

        let html = getHtml();

        isDev() && console.log('currentStatus :>> ', scribeStore.currentStatus);

        // Update an existing paper:
        if (currentStatus === CheckoutStatus.CheckedOut) {
            // WARNING: Firebase hates custom objects, so just use plain old JSON here:
            let sessionUpdate = Session
                .create({ title, categories: categoriesText.trim().split(','), code: html })
                .toJSON()

            isDev() && console.log('nextSession :>> ', sessionUpdate);
            sessionUpdate.date_modified = new Date();

            await updateSession(doc as string, sessionUpdate)

            notify("Updated session")

            scribeStore.lastSession = sessionUpdate;
            scribeStore.dirty = false;
            return;
        }

        // Save a new paper:
        if (currentStatus == CheckoutStatus.NotStarted) {

            let nextSession = Session
                .create({ title, categories: categoriesText.trim().split(','), code: html })
                .toJSON()

            isDev() && console.log('nextSession :>> ', nextSession);
            nextSession.date_modified = new Date();
            await saveSession(nextSession)
            setStatus(CheckoutStatus.CheckedOut)
            dirty = false;

            notify("Saved session")

            // scribeStore.lastSession = nextSession;


            return;
        }

        // Publish a Paper {New | Existing} to Wordpress and send the updated Session to Firebase:
        if (lastStatus === CheckoutStatus.CheckedOut && currentStatus === CheckoutStatus.FirstDraft) {
            publish(new Paper(title, html))
                .then(async (response) => {
                    // console.log('response :>> ', response);

                    if (!response.id) {
                        console.warn(messages.WarnNoWPResponse);
                        notify(messages.WarnNoWPResponse);
                        return
                    }

                    let sessionUpdate = {
                        authorId: response.author || null,
                        paperId: response.id,

                        date_modified: response.modified,
                        status: 'Published', //response.status,
                        contributors: [authUser.email], //TODO: push and filter dups
                        code: response.content ? response.content.rendered : '',
                        original: '',
                        excerpt: '',
                        title,
                    };

                    // FYI:  This is a one-way street and it assumes we're not going to perform update()s,
                    // at least for now.  Only way we can do proper updates is if we prevent users from committing the same draft.
                    // We have Sessions as a stopgap (i.e. the checked-out state flag).

                    // console.log('published session :>> ', publishedSession);
                    await updateSession(doc as string, sessionUpdate)

                    scribeStore.lastSession = Session.create(sessionUpdate);

                    if (!document) {
                        notify(`Failed to create Session for: ${title}`, 'warn')
                        return;
                    }
                    else {
                        notify(`New Session created for: ${title}\n`, 'success')
                    }

                    return document;
                })
            return
        }
    }

    return (
        <Flex>
            <ButtonGroup spacing={8}>
                {isDev() && <Button
                    onClick={onPublish}
                >
                    Publish
                </Button>}

                {(uploadOption === 'Drive' && isDev()) &&
                    <UploadButton>Load a Document</UploadButton>}

                <Button
                    ml={8}
                    onClick={onSave}
                // isDisabled={!dirty} // FIXME: Can't update dirty @observable properly in ckeditor (it's late)
                // leftIcon="save"  // FIXME: For some reason, I can't get this working.
                >
                    Save
                </Button>
            </ButtonGroup>

            {isDev() && <ScribeDevStatusBar />}

            {/* Publish  */}

            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{currentStatus === CheckoutStatus.CheckedOut ? "Publish to Wordpress" : "Save Paper"}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Title</FormLabel>
                            <Input
                                value={title}
                                onChange={handleTitleChange}
                                ref={initialRef}
                                placeholder="paper-name-here"
                            />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Categories</FormLabel>
                            <Input
                                value={categoriesText}
                                onChange={handleCategoryChange}
                                placeholder="e.g 'Chinese', 'Translations'" />
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

// type ScribeDevStatusBarProps = {
//     scribe: ScribeStore
// }

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