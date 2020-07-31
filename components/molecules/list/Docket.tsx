import { Heading, List } from '@chakra-ui/core';
import { Paper } from 'models';
import { FC, ReactChild, ReactNode } from 'react';
import { Find } from 'models/domain';

export type ListProps<T> = { entries: T[]; title?: string; };

// TODO: Build a Slotted template below with:
// 1. A custom <List> render Component as a Slot, <ul> by default
// 2. A second Component that renders how a given TEntry is supposed to look.  
//      That could be a Card, a Radio, animated React spring Component?  Who knows.
// 3. Map and return.
// 4. List anything, as you see fit.

export type Props = {
    children: Slots | ReactChild
}

type Slots = {
    list: ReactNode //The List Component.
    paint: ReactNode // The render (prop?) of an individual entry.
    entries: any[] // Could be typed, but we don't care, as this is a shell.
}

// Validation for any Slotted Component
const isObject = <T extends object>(value: any): value is T => typeof value === 'object' && typeof value !== 'function' && value != undefined
const areNamedSlots = (children: any): children is Slots => isObject(children) && 'content' in children

// I like the name
export const Docket: FC<Props> = (props) => {

    const { children } = props;

    if (!children)
        throw new Error('Children are required for this component.');

    if (areNamedSlots(children)) {

        const { entries, list, paint } = children;

        const Records = entries.map((entry) => {
            return (
                <div className="docket">
                    <div className="docket-list">{list}</div>
                    <div className="docket-paint">{paint}</div>
                </div >
            )
        })

        return <div>{Records}</div>
    } else
        return <div className="section">{children}</div>;
}