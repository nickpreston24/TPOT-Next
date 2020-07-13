import { useState, FC, useRef, useEffect } from 'react';
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
    IconButton,
    ButtonGroup,
    Icon
} from '@chakra-ui/core'
import { ZeitLinkButton } from 'components/experimental/ZeitLinkButton';
import * as ROUTES from 'constants/routes'
import { Selector } from 'components/dialogs'
import UploadButton from 'components/buttons/UploadButton';
import { notify } from './experimental/Toasts';
import { useWordpress, useAuth } from 'hooks';
import { mapToDto, createInstance } from 'models/domain';
import { toDto, Paper, Session } from 'models';
import { WordpressUser } from 'models/User';
import { sessions } from 'stores';
import { getAuthorSessions, checkoutSession, updateSession } from 'stores/SessionStore';
import { disableMe } from './disableMe';
import Link from 'next/link';
import { useRouter } from 'next/router';


const uploadOptions = ['Drive', 'Google', 'Copy-paste']

const DEFAULT_AUTHOR = 9;

const messages = {
    Warn: 'No paper could be created as there was no response from Wordpress',
    Success: "Paper uploaded successfully!",
}


export const WordPressToolbar = (props) => {

    // Retrieve current session id:
    const router = useRouter();
    let doc = router.query.doc;

    // SessionStore functions:
    const { getHtml } = props;

    const { user: authUser } = useAuth();
    // const [disabled, setDisabled] = useState(true); // For whatever Components we wish to disable in prod: (use `disableMe(disabled)`)
    const [option, setOption] = useState(uploadOptions[0]);

    const initialRef = useRef();
    const finalRef = useRef();

    // const [loading, setLoading] = useState(true);
    const [paper, setPaper] = useState(createInstance(Paper))
    const [user, setUser] = useState(createInstance(WordpressUser));
    const [session, setSession] = useState(createInstance(Session))
    const [sessionSaved, setSessionSaved] = useState(true)

    const { isOpen, onOpen, onClose } = useDisclosure();

    // Wordpress support:
    const { publish, getPages, getUser, wpUsers } = useWordpress();

    useEffect(() => {
        // console.log('checking out doc :>> ', doc);
        checkoutSession(doc as string)
            .then((result) => setSession(result))

    }, []);

    const onSelectedMode = (selectedUploadMode) => setOption(selectedUploadMode);

    const onSave = async () => {

        setSessionSaved(false);
        let html = getHtml();

        let nextSession = Session.create(
            {
                authorId: session?.authorId || null,
                paperId: session?.paperId || null,

                date_modified: new Date(),
                status: 'checked-out',
                // contributors: authUser.email,
                title: session.title,
                date_uploaded: session?.date_uploaded || new Date(),
                code: html,
                slug: session?.slug || ''
            })

        if (!!authUser?.email)
            nextSession.lastContributor = authUser.email

        // if (!nextSession.date_uploaded)
        //     nextSession.date_uploaded = new Date()

        setSession(nextSession);
        console.log('user.email', authUser.email)


        console.log('nextSession', nextSession)

        updateSession(doc as string, nextSession)
            .then(() => {
                notify('Saved!', 'success')
                setSessionSaved(true);
            })
    }

    const onSubmit = async () => {
        onClose();

        let html = getHtml();

        const { title, code } = session;

        publish(new Paper(session.title, html))
            .then(async (response) => {
                // console.log('response :>> ', response);

                if (!response.id) {
                    console.warn(messages.Warn);
                    notify(messages.Warn);
                    return
                }

                let publishedSession = Session.create(response)

                // let sessionUpdate = {
                //     authorId: response.author || DEFAULT_AUTHOR,
                //     paperId: response.id,

                //     date_modified: response.modified,
                //     status: 'Published', //response.status,
                //     contributors: [user.email || user.name],
                //     code: response.content ? response.content.rendered : '',
                //     original: '',
                //     excerpt: '',
                //     title,
                // };

                // FYI:  This is a one-way street and it assumes we're not going to perform update()s,
                // at least for now.  Only way we can do proper updates is if we prevent users from committing the same draft.
                // We have Sessions as a stopgap (i.e. the checked-out state flag).
                console.log('published session :>> ', publishedSession);
                const document = await sessions.add(publishedSession)

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

            <ButtonGroup spacing={4}>
                <Button
                    onClick={onOpen}
                >
                    Publish
                </Button>

                {option === 'Drive' && <UploadButton>Load a Document</UploadButton>}

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
                                    console.log('cats', cats)

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