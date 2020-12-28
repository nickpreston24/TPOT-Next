import Box from '@chakra-ui/core/dist/Box';
import React, { FC, useState } from 'react';
import Heading from '@chakra-ui/core/dist/Heading';
import List, { ListItem } from '@chakra-ui/core/dist/List';
import Spinner from '@chakra-ui/core/dist/Spinner';
import Link from '@chakra-ui/core/dist/Link';
import Switch from '@chakra-ui/core/dist/Switch';
import { Paper } from 'models';

type Props = {
    papers: any[]
    loading: boolean
}

export const DeadLinks: FC<Props> = ({ papers, loading }) => {
    // console.log('papers :>> ', papers);
    if (!papers || papers.length == 0)
        return null;

    var regex = /href\s*=\s*(['"])(https?:\/\/.+?)\1/ig;
    let link;
    let links = [];

    papers.reduce((_, nextPaper) => {

        const html = nextPaper.content.rendered;

        while ((link = regex.exec(html)) !== null) {
            // links.push({ url: link[2], paper: nextPaper })
            links.push(link[2]);
        }

    }, links);

    // remove dups
    links = [...new Set(links)]

    // console.log('links :>> ', links);
    if (!links || links.length == 0)
        return <span>No dead Links found :)</span>;

    const [showDeadLinks, setShowDeadLinks] = useState(false);

    return (
        <Box width="full"
            background="orange"
        >

            <Box textAlign="center">
                <Heading>Dead Links</Heading>
            </Box>

            <Heading
                color="blue.400"
                size="sm">Show Only Dead Links</Heading>
            <Switch
                color="blue"
                background="transparent"
                onClick={() => setShowDeadLinks(true)}
            ></Switch>

            {loading
                ? <Spinner size="md" color="blue" />
                : <List>
                    {links
                        .filter(link => !link.includes("thepathoftruth.com"))
                        .map((link, id) => {
                            return (
                                <ListItem key={id}>
                                    <Link href={link}>{link}</Link>
                                </ListItem>
                            );
                        })}
                </List>}
        </Box>
    );
};

export default DeadLinks
