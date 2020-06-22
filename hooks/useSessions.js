import React, { useState, useEffect, useContext, createContext } from "react";
import SessionStore from '@stores/SessionStore'

const sessionsContext = createContext();

export const useSessions = () => {
    return useContext(sessionsContext);
}

// HOC:
export function ProvideSessions({ children }) {
    console.log('provide sessions () ')

    const sessionsData = useSessionsProvider();
    return <sessionsContext.Provider value={sessionsData}>{children}</sessionsContext.Provider>
}

function useSessionsProvider() {

    const [sessionStore, setSessionStore] = useState(null);

    console.info('initializing sessions provider')

    // Initialize the store
    useEffect(() => {

        const store = new SessionStore();

        console.info('session store initialized :>> ', !!store);
        if (!!store)
            setSessionStore(store)
        else
            setSessionStore(null)

        return () => {
            //TODO: Unsubscribe from firestorter Collection, if necessary.
            // i.e. store.sessions.unsubscribe() or something.
        };
    }, []);

    // Pass back only the good stuff:
    const { sessions } = sessionStore || { sessions: [] };
    return sessions;
}
