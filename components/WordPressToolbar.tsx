import { useState, useRef, useEffect, FC } from 'react';
import {
    Box,
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
} from '@chakra-ui/core'
import UploadButton from 'components/buttons/UploadButton';
import { notify } from './experimental/Toasts';
import { useWordpress, useAuth } from 'hooks';
import { createInstance } from 'models/domain';
import { Paper, Session } from 'models';
import { WordpressUser } from 'models/User';
import { sessions } from 'stores';
import { checkoutSession, updateSession } from 'stores/SessionStore';
import { useRouter } from 'next/router';
import React from 'react';
import { render } from 'react-dom';
import { isDev } from 'helpers';

const UploadMethod = {
    Drive: 'Drive',
    Google: 'Google',
    Paste: 'Paste'
}

// const SaveMode = {
//     New: 'New',
//     Update: 'Update',
//     Publish: 'Publish'
// }

const messages = {
    Warn: 'No paper could be created as there was no response from Wordpress',
    Success: "Paper uploaded successfully!",
}

const EditMode = {
    New: 1,
    CheckedOut: 2,
    Draft: 3, //Assumes I can find wpapi's method for making papers with status = 'draft' - MP
    Published: 4
}

export const WordPressToolbar = (props) => {

    // Retrieve current session id:
    const router = useRouter();
    let doc = router.query.doc;
    isDev() && console.log('doc :>> ', doc);

    const [editMode, setEditMode] = useState(EditMode.New);

    // SessionStore functions:
    const { getHtml } = props;

    const { user: authUser } = useAuth();
    // const [disabled, setDisabled] = useState(true); // For whatever Components we wish to disable in prod: (use `disableMe(disabled)`)
    const [uploadOption] = useState(UploadMethod.Drive);

    const initialRef = useRef();
    const finalRef = useRef();

    // const [loading, setLoading] = useState(true);
    // const [user, setUser] = useState(createInstance(WordpressUser));

    const [title, setTitle] = useState(null)
    const [paper] = useState(createInstance(Paper))
    const [session, setSession] = useState(createInstance(Session))
    const [sessionSaved, setSessionSaved] = useState(true)
    // const [saveMode, setSaveMode] = useState(SaveMode.New);

    const { isOpen, onOpen, onClose } = useDisclosure();

    // Wordpress support:
    const { publish } = useWordpress();

    useEffect(() => {
        // console.log('checking out doc :>> ', doc);
        if (!!doc) {
            checkoutSession(doc as string)
                .then((result) => setSession(result))
            setEditMode(EditMode.CheckedOut)
        }
        if (!doc) {
            setEditMode(EditMode.New)
        }
    }, []);

    const onSave = async () => {

        setSessionSaved(false);

        let html = getHtml();

        let nextSession = createInstance(Session);

        if (editMode === EditMode.CheckedOut) {
            nextSession = Session.create(
                {
                    authorId: session?.authorId || null,
                    paperId: session?.paperId || null,

                    date_modified: new Date(),
                    status: 'checked-out',
                    // contributors: authUser.email,
                    title: session?.title || '',
                    date_uploaded: session?.date_uploaded || new Date(),
                    code: html,
                    slug: session?.slug || ''
                })
        }
        else if (editMode === EditMode.New) {
            nextSession = Session.create(
                {
                    authorId: session?.authorId || null,
                    paperId: session?.paperId || null,

                    date_modified: new Date(),
                    status: 'not-started',
                    // contributors: authUser.email,
                    title: title,
                    date_uploaded: session?.date_uploaded || new Date(),
                    code: html,
                    slug: session?.slug || ''
                })
        }

        if (!!authUser?.email)
            nextSession.lastContributor = authUser.email

        setSession(nextSession);
        // console.log('user.email', authUser.email)
        // console.log('nextSession', nextSession)

        updateSession(doc as string, nextSession)
            .then(() => {
                notify('Paper Saved!', 'success')
                setSessionSaved(true);
            })
    }

    const onSubmit = async () => {
        onClose();

        let html = getHtml();

        const { title } = session;

        publish(new Paper(session.title, html))
            .then(async (response) => {
                // console.log('response :>> ', response);

                if (!response.id) {
                    console.warn(messages.Warn);
                    notify(messages.Warn);
                    return
                }

                // let publishedSession = Session.create(response)
                // let publishedSession = Object.assign()

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

                if (!document) {
                    notify(`Failed to create Session for: ${title}`, 'warn')
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
            <ButtonGroup spacing={8}>
                <Button
                    onClick={onOpen}
                >
                    Publish
                </Button>

                {uploadOption === 'Drive' &&
                    <UploadButton>Load a Document</UploadButton>}

                <Button
                    onClick={onSave}
                    isLoading={!sessionSaved}
                // leftIcon="save"  // For some reason, I can't get this working.
                >
                    Save
                </Button>

            </ButtonGroup>

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
                                value={session?.title || ''}
                                onChange={(event) => {
                                    let title = event.target.value
                                    let updated = session;
                                    updated.title = title;
                                    setSession(updated)
                                }}
                                ref={initialRef} placeholder="paper-name-here" />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Categories</FormLabel>
                            <Input
                                value={paper.categories}
                                onChange={(event) => {
                                    let cats = event.target.value.split(',');
                                    // console.log('cats', cats)

                                    // let updated = paper
                                }}
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

        </Box>
    )
};

export default WordPressToolbar;


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