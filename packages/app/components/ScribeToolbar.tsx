import React, { useState, useRef, useEffect, FC } from 'react';
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
import { usePrevious, useWordpress } from '../hooks';
import { checkoutSession } from '../stores/sessionsAPI';
import { useRouter } from 'next/router';
import { CheckoutStatus } from '../constants/CheckoutStatus';
import { LanguageOptions } from '../constants';
import { UploadMode } from '../models/UploadMode';
import { useSessions } from '../hooks/useSessions';
import { Session } from '../models';
import { notify } from './Toasts';
import { MultiSelect } from './molecules/list';

type ScribeToolbarProps = {
    getHtml: Function,
    setHtml: Function,
}

export const ScribeToolbar: FC<ScribeToolbarProps> = (props) => {

    // Retrieve current session id:
    const router = useRouter();
    let doc = router.query.doc;

    const { isOpen, onOpen, onClose } = useDisclosure();

    // CK Editor functions:
    const { getHtml, setHtml } = props;

    // Session API functions:
    const {
        updatePaper,
        savePaper,
        session,
        publishPaper,
        setSession,
    } = useSessions();

    const { categories, loading, wpUsers } = useWordpress();


    /** 
     * Form
     */
    const [form, updateForm] = useState<any>({
        title: "",
        // categoriesText: "",
        categories: [],
        language: null,
        mode: UploadMode.Paste,
        doc: null,
    });

    // DO NOT DELETE
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

    /** Modal Refs */
    const initialRef = useRef();
    const finalRef = useRef();

    /**
     * Checkout on load if doc exists
     */
    useEffect(() => {

        // Checking out Session:
        if (!!doc && session.status !== CheckoutStatus.CheckedOut) {
            checkoutSession(doc as string)
                .then((result) => {

                    setSession(result)

                    updateForm({
                        ...form,
                        ...result,
                    })

                    setHtml(result.code);
                })
        }

        // New Session:
        if (!doc || !session.status) {
            updateForm(previousForm)
        }

    }, []);

    const onSubmit = (e) => {
        e.preventDefault();
        let html = getHtml();
        let nextSession = new Session({
            ...session,
            docId: doc as string,
            title: form.title,
            code: html,
            language: form.language,
            categories: form.categories,
        });

        switch (mode) {
            case 'Save':
                savePaper(nextSession)
                    .then(() => { notify("Saved Session!", "success") })
                break;
            case 'Update':
                updatePaper(doc as string, nextSession)
                    .then(() => { notify("Updated Paper!", "success") })
                break;
            case 'Publish':
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

        switch (operation) {
            case 'Save':
                setHeader('Save Paper')

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
                                isDisabled={!!session?.status && session.status !== CheckoutStatus.NotStarted}
                                onChange={updateField}
                                placeholder="paper name here" />
                        </FormControl>

                        <FormControl>

                            <FormLabel>Categories</FormLabel>

                            <MultiSelect
                                selectedOptions={form.categories}
                                options={categories.map(c => c.name)}
                                mode="dropdown"
                                initial="--"
                                onChange={(set) => {
                                    updateForm({
                                        ...form,
                                        categories: set
                                    })
                                }}
                            />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Language</FormLabel>
                            <LanguageDropdown
                                name="language"
                                value={form.language}
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

type LanguageDropdownProps = {
    name: string,
    placeholder?: string,
    onChange: (event: any) => void,
    value: string | number | readonly string[],
}

const LanguageDropdown: FC<LanguageDropdownProps> = (props) => {

    const { onChange, name, placeholder, value } = props;

    return (
        <Select
            onChange={onChange}
            name={name}
            placeholder={placeholder}
            value={value}
        >
            {LanguageOptions.map((name, key) => <option key={key}>{name}</option>)}
        </Select>
    )
}

export default ScribeToolbar;