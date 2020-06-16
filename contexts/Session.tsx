import { createContext } from 'react'
import SessionStore from '../stores/SessionStore'
// import SessionStore from '@stores/SessionStore'

export const SessionContext = createContext<SessionStore>({} as SessionStore)
export const SessionProvider = SessionContext.Provider;