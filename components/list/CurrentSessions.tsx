import { Heading, List } from '@chakra-ui/core';
import { Session } from 'models';
import { FC } from 'react';
import { ListProps } from "./ListProps";
import { observer } from 'mobx-react';
export const CurrentSessions: FC<ListProps<Session>> = observer(({ entries: sessions, title }) => {
    return (<List>
        {title && <Heading size='md'>{title}</Heading>}
        {sessions.map((session, index) => {
            const { paperId, status, title, excerpt, slug } = session;
            // console.log('title :>> ', title);
            console.log('session :>> ', session);
            return (
                <div key={index}>
                    <h2><b>{title}</b>
                        Id: {paperId} <i>{excerpt}</i>
                        <b>{slug}</b>
                    </h2>
                </div>
            );
        })}
    </List>);
});
