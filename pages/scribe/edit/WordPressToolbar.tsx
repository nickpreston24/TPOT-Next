import React, { useState, FC } from 'react';
import { Button, Box } from '@material-ui/core';
import { ButtonLink } from 'components/experimental/ZeitLinkButton';
import * as ROUTES from 'constants/routes'
import { Selector } from 'components/dialogs'
import UploadButton from 'components/buttons/UploadButton';

const WordPressToolbar = (props) => {

    const onClose = (item) => {
        setOpen(false);
        console.log(item);
    }

    const onSelected = (selectedOption) => {
        // console.log('selectedOption :>> ', selectedOption);
        setoption(selectedOption)
    };

    // TODO: Use simple enum string values:
    const uploadOptions = ['Drive', 'Google', 'Copy-paste']
    const [option, setoption] = useState(uploadOptions[1]);
    const [open, setOpen] = useState(false);

    // console.log('props :>> ', props);
    const { getHtml } = props;
    return (<Box
        height="100%"
    >
        <Button onClick={getHtml}>Get Editor HTML (dev)</Button>
        <Button onClick={getHtml}>Publish</Button>
        {/* <Button onClick={getHtml}>Upload a Document</Button> */}
        <Button
            onClick={() => setOpen(true)}
        >
            Upload a Document
        </Button>

        {option === 'Drive' && <UploadButton />}

        <Selector
            title="Choose an Upload Option"
            open={open}
            options={uploadOptions}
            onCloseFn={onClose}
            onSelectFn={onSelected}
        ></Selector>

        <Button
            href={ROUTES.CHECKOUT}
            as={ROUTES.CHECKOUT}
            component={ButtonLink}
            onClick={getHtml}>Checkout a Document</Button>
    </Box>);
};


export default WordPressToolbar;