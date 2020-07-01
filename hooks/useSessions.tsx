import React, { useState, useEffect, useContext, createContext } from "react";
// import { SessionStore } from '../stores'
import '@services/firebase'
import { Collection, Document } from 'firestorter'

const sessionsContext = createContext(null);

export const useSessions = () => useContext(sessionsContext)

// HOC:
export function ProvideSessions({ children }) {
    const sessions = useSessionsProvider();
    return <sessionsContext.Provider value={sessions}>{children}</sessionsContext.Provider>
}

type SessionType = {
    slug: string;
    docx: string;
};

async function useSessionsProvider() {

    const [sessions, setSessions] = useState(null);
    // console.log('sessions :>> ', sessions, sessions.docs.length);

    // useEffect(async () => {
    //     const collection = new Collection<Document<SessionType>>('sessions');
    //     collection.docs.forEach(doc=>{
    //         console.log('doc :>> ', doc.data.slug);
    //     })
    //     const s = await collection.fetch();
    //     setSessions(s);
    // }, []);
    
    return sessions;
}
