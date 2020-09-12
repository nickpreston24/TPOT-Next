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
import Menu, { MenuButton, MenuList, MenuItem } from '@chakra-ui/core/dist/Menu';
// import { SelectControl } from '@chakra-ui/core/dist/Select'


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
import { CheckoutStatus } from 'constants/CheckoutStatus';
import { ROUTES, DOC, DOC2 } from 'constants/routes';
import { SelectChip } from './atoms';
import { LanguageOptions, Language } from '../constants';
import { observable, toJS } from 'mobx';

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

const scribeState = observable({
    language: Language
})

export const ScribeToolbar: FC<ScribeToolbarProps> = (props) => {

    // Retrieve current session id:
    const router = useRouter();
    let doc = router.query.doc;

    isDev() && console.log('doc id :>> ', doc);

    let { currentStatus, lastStatus
        , lastSession, setStatus } = scribeStore;

    // Session API functions:
    const { getHtml } = props;

    /* Wordpress support: */
    const { user: authUser } = useAuth();
    const { publish } = useWordpress();


    /** Scribe States: **/
    const { language } = scribeState;
    // const [mode, setMode] = useState(null);
    // const [paper, setPaper] = useState(createInstance(Paper))
    // const [session, setSession] = useState(createInstance(Session))

    /** Modal States: **/
    const [uploadOption] = useState(UploadMethod.Drive);
    const [title, setTitle] = useState(lastSession?.title || '')
    const [categoriesText, setCategoriesText] = useState('');

    /** Form */
    // const [title, setTitle] = useState(lastSession?.title || '')
    // const [categoriesText, setCategoriesText] = useState('');
    const [form, updateForm] = useState<any>({
        title: '',
        categoriesText: ''
    });
    const updateField = (e) => {
        console.log('e.target.value :>> ', e.target.value);
        updateForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(form);
    };

    const [wpCategories, setWpCategories] = useState([]);
    const { isOpen, onOpen, onClose } = useDisclosure();
    // const [language, setLanguage] = useState(Language.English);    
    // const [value, setValue] = React.useState(Language.English)

    const handleChange = (event: React.ChangeEvent<any>) => {
        console.log('event.target.value :>> ', event.target.value);
        scribeState.language = event.target.value;
        console.log('scribeState.language :>> ', scribeState.language);
    }

    /** Modal Refs */
    const initialRef = useRef();
    const finalRef = useRef();

    useEffect(() => {

        isDev() && console.log('checking out doc :>> ', doc);
        console.log(LanguageOptions)

        // Setup the Reset of status on route change /edit/ => /checkout/:
        Router.events.on('routeChangeComplete', (url) => {
            if (url === ROUTES.CHECKOUT || url === ROUTES.EDIT)
                updateSession(doc as string, { status: CheckoutStatus.InProgress })
        })

        if (!!doc) {
            checkoutSession(doc as string)
                .then((result) => {
                    // setTitle(result.title)
                    updateForm({ title: result.title })
                    isDev() && console.log('checked out session :>> ', result);
                    // !!result.categories && setCategoriesText(result.categories?.join(", ") || '')
                    !!result.categories && updateForm({ categoriesText: result.categories?.join(", ") || '' })
                    console.log('categories :>> ', form);
                    setStatus(CheckoutStatus.CheckedOut)
                })
        }
        if (!doc) {
            setStatus(CheckoutStatus.NotStarted)
        }
    }, []);


    // const handleTitleChange = async (event) => {
    //     setTitle(event.target.value);
    // }

    // const handleCategoryChange = async (event) => {
    //     setCategoriesText(event.target.value);
    // }

    const onSave = async () => {
        onOpen();
    }

    const onPublish = async () => {
        setStatus(CheckoutStatus.FirstDraft)
        onOpen()
    }

    const onSubmit = async () => {

        onClose();

        const createSession = () => Session
            .create({
                title: form.title,
                categories: form.categoriesText.trim().split(','), code: html, language: toJS(scribeState.language)
            })
            // .create({ title, categories: form.categoriesText.trim().split(','), code: html, language: toJS(scribeState.language) })
            .toJSON();

        let html = getHtml();

        isDev() && console.log('currentStatus :>> ', scribeStore.currentStatus);

        // Update an existing paper:
        if (currentStatus === CheckoutStatus.CheckedOut) {
            // WARNING: Firebase hates custom objects, so just use plain old JSON here:
            let sessionUpdate = createSession()

            isDev() && console.log('nextSession :>> ', sessionUpdate);
            sessionUpdate.date_modified = new Date();

            await updateSession(doc as string, sessionUpdate)

            notify("Updated session", "success")

            scribeStore.lastSession = sessionUpdate;
            scribeStore.dirty = false;
            return;
        }

        // Save a new paper:
        if (currentStatus == CheckoutStatus.NotStarted) {

            let nextSession = createSession();

            isDev() && console.log('nextSession :>> ', nextSession);
            nextSession.date_modified = new Date();
            let id = await saveSession(nextSession);
            setStatus(CheckoutStatus.CheckedOut)
            // dirty = false;

            notify("Saved session", "success")

            isDev() && console.log('created Session id :>> ', id);

            // let doc = DOC(id) as any;
            // console.log('doc :>> ', doc);
            // router.push({...doc})

            router.push('/scribe/edit/[doc]', `/scribe/edit/${id}`)
            // await checkoutSession(id)

            return;
        }

        // Publish a Paper {New | Existing} to Wordpress and send the updated Session to Firebase:
        if (lastStatus === CheckoutStatus.CheckedOut && currentStatus === CheckoutStatus.FirstDraft) {
            publish(new Paper(form.title, html))
                .then(async (response) => {
                    isDev() && console.log('response :>> ', response);

                    if (!response.id) {
                        console.warn(messages.WarnNoWPResponse);
                        notify(messages.WarnNoWPResponse, 'warn');
                        return
                    }

                    let sessionUpdate = {
                        authorId: response.author || null,
                        paperId: response.id,

                        date_modified: response.modified,
                        status: CheckoutStatus.FirstDraft,
                        contributors: [authUser.email], //TODO: push and filter dups
                        code: response.content ? response.content.rendered : '',
                        original: '',
                        excerpt: '',
                        title: form.title,
                    };

                    // FYI:  This is a one-way street and it assumes we're not going to perform update()s,
                    // at least for now.  Only way we can do proper updates is if we prevent users from committing the same draft.
                    // We have Sessions as a stopgap (i.e. the checked-out state flag).

                    console.log('published session :>> ', sessionUpdate);
                    await updateSession(doc as string, sessionUpdate)

                    scribeStore.lastSession = Session.create(sessionUpdate);

                    if (!document) {
                        notify(`Failed to create Session for: ${form.title}`, 'warn')
                        return;
                    }
                    else {
                        notify(`New Session created for: ${form.title}\n`, 'success')
                        // await updateSession(doc as string, { status: CheckoutStatus.FirstDraft })
                    }

                    return document;
                })
            return
        }
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

                {(uploadOption === 'Drive' && isDev()) &&
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
                    // isDisabled={!dirty} // FIXME: Can't update dirty @observable properly in ckeditor (it's late)
                    // leftIcon="save"  // FIXME: For some reason, I can't get this working.
                    >
                        Save
                    </Button>

                </Tooltip>
            </ButtonGroup>

            {/* {isDev() && <ScribeDevStatusBar />} */}
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
                    <ModalHeader>{currentStatus === CheckoutStatus.CheckedOut ? "Publish to Wordpress" : "Save Paper"}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>

                        {/* Title */}
                        <FormControl
                            // onSubmit={handleSubmit}
                        >
                            <FormLabel>Title</FormLabel>
                            <Input
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
                                value={form.categoriesText}
                                onChange={updateField}
                                placeholder="e.g 'Chinese', 'Translations'" />
                        </FormControl>

                        {/* Language */}
                        <FormControl mt={4}>
                            <FormLabel>Language</FormLabel>

                            <LanguageSelect handleChange={handleChange} />

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