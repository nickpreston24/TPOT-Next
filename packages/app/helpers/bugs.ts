import { useFirestoreQuery, useLocalStorage } from "../hooks";
import { store } from "../services/firebase/firebase";
import isDev from "./environment";

export enum BugType {
    WARNING = 'warning', // Somewhat annoying, but not immediately needing fix.
    ERROR = 'error', // Critical, needs tracking
    INFO = "info" // Non-Critical, but needs tracking.
}

/* Bugs API */

const searchByEmailAsync = async (search) => {
    const snapshot = await store.collection('users')
        .where('email', 'array-contains', search.toLowerCase())
        .orderBy('lastName')
        .get();
    return snapshot.docs.slice(0, 1)
}

export const getAllBugsAsync = async (search) => {
    const snapshot = await store.collection('bugs')
        .where('isDeleted', '==', false)
        .orderBy('created')
        .get();
    return snapshot.docs
}

/** Ultimate Logger function */
export async function Log(
    message: string, // Message. Duh.
    options: any, // Any special options to store like user's name, push notification dates, etc.
    id: string = null // specific id, if updating the bug.
) {
    const ref = store.collection('bugs')
    const [authUser, setUser] = useLocalStorage('user', '')
    let email = (authUser as any)?.email;
    isDev() && console.log(message)

    let user = await searchByEmailAsync(email) as any;

    let bug = {
        ...options,
        email: email || '',
        // username: (authUser as any)?.displayName || '', // TODO: This is authUser content.  We want User.ts model's name, which will come from Collection('users')
        username: !!user.lastName ? user?.lastName || '' + ',' + user?.firstName || '' : null,
        created: Date.now(),
        send: null,
        isDeleted: false,
        type: !!options.type ? options?.type : BugType.INFO,
        message
    } as Bug;

    if (!id) {
        ref.add(bug)
            .then(() => {
                console.info('Successfully added Bug to firestore bugs database')
            })
            .catch((e) => console.error('Could not create new Bug the bugs database' + e))
    }
    else {
        ref
            .doc(id)
            .set(bug)
            .then(() => {
                console.info(`Successfully updated Bug ${id?.toString()} to firestore bugs database`)
            })
            .catch((e) => console.error('Could not create new Bug the bugs database' + e))
    }
}

// Note: this can be an MST model down the road - MP
export type Bug = {
    type: BugType,
    message: string,
    send: Date,
    username: string,
    email: string,
    created: Date,
    isDeleted: boolean,
}