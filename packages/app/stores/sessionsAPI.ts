import '../services/firebase'
import { Collection, Document } from 'firestorter'
import { Session } from '../models'
import { toJS } from 'mobx';
import { CheckoutStatus } from '../constants/CheckoutStatus';
import { IDocumentOptions } from 'firestorter/lib/Types';
import { isDev } from '../helpers';

const DEFAULT_AUTHOR = 9;
const queryLimit = 10;

export type SessionDocument = Document<Session>;

export type Sessions = Collection<SessionDocument>;

export const sessions = new Collection<SessionDocument>("sessions");

export const unlockSession = async (id: string) => {
    let options = { mode: 'off' } as IDocumentOptions
    let document = new Document(`sessions/${id}`, options);
    await document.fetch()

    if (document.hasData) {
        await document.update({
            status: CheckoutStatus.InProgress
        })
    }
}

/**Saves a new Session */
export const saveSession = async (session: any | Session): Promise<string> => {
    // let options = { mode: 'off' } as IDocumentOptions
    if (!session.slug) {
        console.warn(`No slug was provided for session ${session.title}`)
        return null;
    }

    let document = new Document(`sessions/${session.slug}`);
    await document.fetch()

    // Collision detection
    if (!!document.hasData) {
        console.warn(`Duplicate Session ${session.title} could not be created by Firestorter`)
        return null;
    }

    let currentSession = toJS(document.data);

    Object.assign(currentSession, session)
    await document.set(currentSession as object)
    return document.ref.id as string
}

export const checkoutSession = async (id: string) => {
    let options = { mode: 'off' } as IDocumentOptions
    let document = new Document(`sessions/${id}`, options);
    await document.fetch()

    if (!document.hasData) {
        console.warn(`Session with id ${id} could not be checked out by Firestorter`)
        return null;
    }

    let session = toJS(document.data as Session);
    session.status = CheckoutStatus.CheckedOut

    await document.update(session as object)

    return session;
}

/** Updates and existing Session */
export const updateSession = async (id: string, session: any | Session): Promise<Session | object> => {


    let options = { mode: 'off' } as IDocumentOptions
    let document = new Document(`sessions/${id}`, options);
    await document.fetch()

    if (!document.hasData) {
        console.warn(`Session with id ${id} could not be updated by Firestorter`)
        return null;
    }

    let currentSession = toJS(document.data);

    session.date_modified = new Date()
    Object.assign(currentSession, session)

    await document.update(currentSession)
        .catch(console.error);

    return session;
}

export const removeSession = async (id: string) => {
    let document = new Document(`sessions/${id}`)
    await document.delete()
}

export const getAuthorSessions = async (author: number) => {
    sessions.query = (ref) => {
        return author ?
            ref.where('author', '==', author).limit(queryLimit)
            : undefined;
    }
}