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
import { usePrevious } from 'hooks';
import { checkoutSession, updateSession } from 'stores/sessionsAPI';
import Router, { useRouter } from 'next/router';
import { useObserver } from 'mobx-react';
import { CheckoutStatus } from 'constants/CheckoutStatus';
import { ROUTES } from 'constants/routes';
import { LanguageOptions } from '../constants';
import { UploadMode } from '../models/UploadMode';
import { useSessions } from 'hooks/useSessions';
import { Session } from 'models';

type ScribeToolbarProps = {
    getHtml: Function
}

export const ScribeToolbar: FC<ScribeToolbarProps> = (props) => {

    // Retrieve current session id:
    const router = useRouter();
    let doc = router.query.doc;

    const { isOpen, onOpen, onClose } = useDisclosure();

    // Session API functions:
    const { getHtml } = props;

    const {
        updatePaper,
        savePaper,
        session,
        publishPaper,
        setSession,
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

    // useEffect(() => {
    //     console.log('previous form :>> ', previousForm);
    //     console.log('current form :>> ', form);
    // }, [form]);


    /** Modal Refs */
    const initialRef = useRef();
    const finalRef = useRef();

    /**
     * Checkout on load if doc exists
     */
    useEffect(() => {
        console.log('doc :>> ', doc);

        // Setup the Reset of status on route change /edit/ => /checkout/:
        Router.events.on('routeChangeComplete', (url) => {
            if (!!doc && url === ROUTES.CHECKOUT || url === ROUTES.EDIT) {
                let update = session;
                update.status = CheckoutStatus.InProgress;
                // updatePaper(doc, update)
            }
        })

        // Checking out Session:
        if (!!doc && session.status !== CheckoutStatus.CheckedOut) {

            checkoutSession(doc as string)
                .then((result) => {

                    console.log('checking out your session:  ', result)

                    setSession(result)

                    updateForm({
                        ...form,
                        ...result,
                        categoriesText: result?.categories?.join(", ") || ''
                    })
                })
        }

        // New Session:
        if (!doc || !session.status) {
            updateForm(previousForm)
            console.log('creating new Paper!')
            // dispatchSession({ type: Actions.New, })
        }

    }, []);

    const onSubmit = (e) => {
        e.preventDefault();

        let nextSession = new Session({
            docId: doc as string,
            title: form.title,
            code: getHtml(),
            language: form.language,
            categories: form.categories,
        });

        switch (mode) {
            case 'Save':
                savePaper(nextSession)
                break;
            case 'Update':
                updatePaper(doc as string, nextSession)
                break;
            case 'Publish':
                // console.log('PUBLISH');
                publishPaper(doc as string, nextSession)
                break;
            default:
                break;
        }

        onClose();
    }

    const buttons = [
        { name: "Save", label: "Save your work as a Session", operation: 'Save' },
        { name: "Publish", label: "Publish your work to Wordpress", operation: 'Publish' },
    ]

    const [mode, setMode] = useState('Save');
    const [header, setHeader] = useState('My Header')

    const handleOnClick = operation => {
        console.log('operation :>> ', operation);

        switch (operation) {
            case 'Save':
                setHeader('Save Paper')
                console.log('session :>> ', session);
                console.log('doc :>> ', doc);
                if (!!doc && session.status === CheckoutStatus.CheckedOut)
                    setMode('Update');
                else setMode(operation)
                break;

            case 'Publish':
                setHeader('Publish Paper')
                setMode('Publish')

                break;
            default:
                break;
        }

        onOpen();
    }

    return (
        <Flex>
            <ButtonGroup spacing={8}>
                {buttons.map((button, index) => {
                    return (
                        <Tooltip
                            key={index}
                            aria-label={`${button.name}-tooltip`}
                            label={button.label}
                        >
                            <Button
                                onClick={() => handleOnClick(button.operation)}
                            >
                                {button.name}
                            </Button>
                        </Tooltip>)
                })}
            </ButtonGroup>

            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{header}</ModalHeader>
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
                            <LanguageDropdown
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

type Props = {
    session: Session
}
/** Shows the current status of Scribe in this toolbar
 * Meant only for DEBUG/Development mode.
*/
const ScribeDevStatusBar: FC<Props> = (props) => {
    // const { dirty, currentStatus, lastStatus, lastSession } = scribe;
    const { session } = props;
    return useObserver(() =>
        <Flex style={{ border: "1px #aaa solid" }} mb={2}>
            {/* <h1 style={{ marginRight: '10px' }}>{scribeStore.lastStatus || ''} =&gt; {scribeStore.currentStatus}</h1> */}
            <h1 style={{ marginRight: '10px' }}>{session.status}</h1>
            {/* <p>Dirty? {dirty ? "Yes" : "No"}</p> */}
            {/* {!!lastSession && <p>Id: {lastSession}</p>} */}
        </Flex>
    )
}

const LanguageDropdown = (props) => {

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