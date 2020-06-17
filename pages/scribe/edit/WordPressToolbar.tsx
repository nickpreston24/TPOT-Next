import React from 'react';
import { Button, Box } from '@material-ui/core';
import { ButtonLink } from 'components/experimental/ZeitLinkButton';
import * as ROUTES from '@routes'

export const WordPressToolbar = (props) => {
    console.log('props :>> ', props);
    const { getHtml } = props;
    return (<Box
        height="100%"
    >
        <Button onClick={getHtml}>Get Editor HTML (dev)</Button>
        <Button onClick={getHtml}>Publish</Button>
        <Button onClick={getHtml}>Upload a Document</Button>
        <Button
            href={ROUTES.CHECKOUT}
            as={ROUTES.CHECKOUT}
            component={ButtonLink}
            onClick={getHtml}>Checkout a Document</Button>
    </Box>);
};
