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
import UploadButton from 'components/buttons/UploadButton';
import { usePrevious } from 'hooks';
import { checkoutSession } from 'stores/sessionsAPI';
import Router, { useRouter } from 'next/router';
import React from 'react';
import { isDev } from 'helpers';

import { scribeStore } from '../stores'
import { useObserver } from 'mobx-react';
import { CheckoutStatus } from 'constants/CheckoutStatus';
import { ROUTES } from 'constants/routes';
import { LanguageOptions } from '../constants';
import { UploadMode } from '../models/UploadMode';
import { useSessions, Actions } from 'hooks/useSessions';
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

    const { isOpen, onOpen, onClose } = useDisclosure();

    // Session API functions:
    const { getHtml } = props;

    const {
        updatePaper,
        dispatchSession,
    } = useSessions();

    /** 
     * Form
     */
    const [form, updateForm] = useState<any>({
        title: "",
        categoriesText: "",
        language: null,
        mode: UploadMode.Paste,
        doc: null,
    });

    const previousForm = usePrevious(form);

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

    useEffect(() => {
        console.log('previous form :>> ', previousForm);
        console.log('current form :>> ', form);
    }, [form]);


    /** Modal Refs */
    const initialRef = useRef();
    const finalRef = useRef();

    /**
     * Checkout on load if doc exists
     */
    useEffect(() => {



        // Setup the Reset of status on route change /edit/ => /checkout/:
        Router.events.on('routeChangeComplete', (url) => {
            if (!!doc &&
                url === ROUTES.CHECKOUT || url === ROUTES.EDIT) {
                updatePaper({ doc })
            }
        })

        // Checking out Session:
        if (!!doc) {

            checkoutSession(doc as string)
                .then((result) => {

                    dispatchSession({
                        type: Actions.Status,
                        payload: { status: CheckoutStatus.CheckedOut }
                    })

                    updateForm({
                        ...form,
                        ...result,
                        categoriesText: result?.categories?.join(", ") || ''
                    })
                })
        }

        // New Session:
        if (!doc) {

            // set last form contents:
            updateForm(previousForm)

            dispatchSession({
                type: Actions.Status,
                payload: { status: CheckoutStatus.NotStarted }
            })
        }

    }, []);

    const onSubmit = (e) => {
        e.preventDefault();

        // isDev() && console.log('form :>> ', form);

        // Get the fields from the form

        const session = new Session({
            docId: doc as string,
            title: form.title,
            code: getHtml(),
            language: form.language,
            categories: form.categories,
        });

        console.log('session (onsubmit) - form :>> ', session);
        // console.log('form  (on submit):>> ', form);

        // Post changed to hook's internal state:
        dispatchSession({ type: Actions.Save, payload: { session: session } })

        onClose();
    }

    return (
        <Flex>
            <ButtonGroup spacing={8}>
                <Tooltip
                    aria-label="publish-tooltip"
                    label="Publish a Draft to TPOT"
                >
                    <Button
                        onClick={onOpen}
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
                        onClick={onOpen}
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

                        <FormControl>
                            <FormLabel>Title</FormLabel>
                            <Input
                                name="title"
                                value={form.title}
                                onChange={updateField}
                                placeholder="paper name here" />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Categories</FormLabel>
                            <Input
                                name="categoriesText"
                                value={form.categoriesText}
                                onChange={updateField}
                                placeholder="e.g 'Chinese', 'Translations'" />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Language</FormLabel>
                            <Dropdown
                                name="language"
                                onChange={updateField}
                                placeholder="Choose a language"
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
            <h1 style={{ marginRight: '10px' }}>{scribeStore.lastStatus || ''} =&gt; {scribeStore.currentStatus}</h1>
            {/* <p>Dirty? {dirty ? "Yes" : "No"}</p> */}
            {/* {!!lastSession && <p>Id: {lastSession}</p>} */}
        </Flex>
    )
}

const Dropdown = (props) => {

    const { onChange, name, placeholder } = props;

    return (
        <Select
            onChange={onChange}
            name={name}
            placeholder={placeholder}
        >
            {LanguageOptions.map((name, key) => <option key={key}>{name}</option>)}
        </Select>
    )
}

export default ScribeToolbar;