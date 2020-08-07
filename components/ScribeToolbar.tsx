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
import { createInstance } from 'models/domain';
import { Paper, Session } from 'models';
import { checkoutSession, updateSession, saveSession } from 'stores/SessionStore';
import { useRouter } from 'next/router';
import React from 'react';
import { isDev } from 'helpers';

import { scribeStore } from '../stores'
import { useObserver } from 'mobx-react';
import { ScribeStore } from 'stores/ScribeStore';
import { CheckoutStatus } from 'constants/CheckoutStatus';

const UploadMethod = {
    Drive: 'Drive',
    Google: 'Google',
    Paste: 'Paste'
}

const messages = {
    Warn: 'No paper could be created as there was no response from Wordpress',
    Success: "Paper uploaded successfully!",
}

export const ScribeToolbar = (props) => {

    // Retrieve current session id:
    const router = useRouter();
    let doc = router.query.doc;

    isDev() && console.log('doc :>> ', doc);

    const [mode, setMode] = useState(null);

    // SessionStore functions:
    const { getHtml } = props;

    const { user: authUser } = useAuth();
    const [uploadOption] = useState(UploadMethod.Drive);

    const initialRef = useRef();
    const finalRef = useRef();

    // const [disabled, setDisabled] = useState(true); // For whatever Components we wish to disable in prod: (use `disableMe(disabled)`)
    // const [loading, setLoading] = useState(true);
    // const [user, setUser] = useState(createInstance(WordpressUser));

    const [title] = useState(null)
    const [paper] = useState(createInstance(Paper))
    const [session, setSession] = useState(createInstance(Session))
    const [sessionSaved, setSessionSaved] = useState(true)

    const { isOpen, onOpen, onClose } = useDisclosure();

    // Wordpress support:
    const { publish } = useWordpress();

    useEffect(() => {
        isDev() && console.log('checking out doc :>> ', doc);

        if (!!doc) {
            checkoutSession(doc as string)
                .then((result) => setSession(result))
            setMode(CheckoutStatus.CheckedOut)
        }
        if (!doc) {
            setMode(CheckoutStatus.NotStarted)
        }
    }, []);


    const onSubmit = async () => {

        onClose();

        let html = getHtml();

        const { title } = session;

        if (mode === CheckoutStatus.NotStarted) {
            //TODO: Call  CreateSession
            return;
        }

        if (mode === CheckoutStatus.CheckedOut) {
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
            return
        }
    }

    return (
        <Flex>
            <ButtonGroup spacing={8}>
                <Button
                    onClick={() => {
                        setMode(CheckoutStatus.CheckedOut)
                        onOpen()
                    }}
                >
                    Publish
                </Button>

                {(uploadOption === 'Drive' && isDev()) &&
                    <UploadButton>Load a Document</UploadButton>}

                <Button
                    ml={8}
                    // onClick={onSave}
                    onClick={() => {
                        onSubmit()
                        onOpen()
                    }}
                    isLoading={!sessionSaved}
                // leftIcon="save"  // FIXME: For some reason, I can't get this working.
                >
                    Save
                </Button>
            </ButtonGroup>

            {isDev() && <ScribeStatusBar scribe={scribeStore}></ScribeStatusBar>}

            {/* Publish  */}

            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Publish your Paper to Wordpress</ModalHeader>
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
                                ref={initialRef}
                                placeholder="paper-name-here"
                            />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Categories</FormLabel>
                            <Input
                                value={paper.categories}
                                onChange={(event) => {
                                    let chunks = event.target.value.split(',');
                                    isDev() && console.log('categories :>>', chunks)
                                    let updated = session;
                                    // updated.categories = chunks; //FIXME:
                                    setSession(updated);
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

        </Flex>
    )
};


type Props = {
    scribe: ScribeStore
}

/** Shows the current status of Scribe in this toolbar
 * Meant only for DEBUG.
*/
const ScribeStatusBar: FC<Props> = ({ scribe }) => {
    return useObserver(() =>
        <div style={{ border: "1px #aaa solid" }}>
            <h1>Status: {scribe.lastStatus}</h1>
            <p>Dirty? {scribe.dirty ? "Yes" : "No"}</p>
            {!!scribe.lastSession && <p>Id: {scribe.lastSession}</p>}
        </div>
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