import React, { useState } from 'react';
import { Button, Box } from '@material-ui/core';
import { ButtonLink } from 'components/experimental/ZeitLinkButton';
import * as ROUTES from '@routes'
import { Selector } from '@components/dialogs'

export const WordPressToolbar = (props) => {

    const onClose = (item) => {
        setOpen(false);
        console.log(item);    
    }
    const onSelected = (item) => console.log(item);
    const options = ['google', 'copy-paste', 'upload']
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

        <Selector
            open={open}
            options={options}
            onCloseFn={onClose}
            onSelectFn={onSelected}
        />
        <Button
            href={ROUTES.CHECKOUT}
            as={ROUTES.CHECKOUT}
            component={ButtonLink}
            onClick={getHtml}>Checkout a Document</Button>
    </Box>);
};
