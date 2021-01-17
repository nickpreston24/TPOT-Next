import Router from 'next/router'
import { createContext, useContext, useState } from 'react'
import { CheckoutStatus } from '@constants/CheckoutStatus'
import { useWordpress } from '@hooks'
import { Paper } from '@models'
import { Session } from '@models'
import { checkoutSession, saveSession, updateSession } from '@stores/sessionsAPI'
import useLocalStorage from './useLocalStorage'

const context = createContext(null)

export const useSessions = () => {
  return useContext(context)
}

export const ProvideSessions = ({ children }) => {
  const sessions = useSessionProvider()
  return <context.Provider value={sessions}>{children}</context.Provider>
}

export enum Actions {
  Update = 'Update',
  Save = 'Save',
  Publish = 'Publish',
  Status = 'Status',
  New = 'New',
}

function useSessionProvider() {
  const [session, setSession] = useState(Session.create({}))
  const [user, _] = useLocalStorage<any>('user', '')
  const { publish } = useWordpress()
  const [error, setError] = useState('')

  const updatePaper = async (doc: string, session: Session) => {
    session.status = CheckoutStatus.CheckedOut
    await updateSession(doc as string, session).catch((error) => {
      console.error(error), setError(error)
    })
  }

  const savePaper = async (session: Session) => {
    if (!session) {
      console.warn('Null session')
      return
    }

    if (status === CheckoutStatus.FirstDraft || status === CheckoutStatus.Published) {
      return null
    }

    if (status == CheckoutStatus.NotStarted) {
      session.date_uploaded = new Date()
    }

    let id = await saveSession(session)

    if (!!id) {
      await checkoutSession(id).catch((error) => {
        console.error(error), setError(error)
      })
      Router.push('/scribe/edit/[doc]', `/scribe/edit/${id}`)
    }

    return id
  }

  const publishPaper = async (doc: string, session: Session) => {
    let code = session?.code

    let paper = new Paper({
      ...session,
      content: code,
      author: 10,
      categories: [],
      status: 'draft',
      id: session?.paperId || null,
    })

    publish(paper)
      .then(async (response) => {
        if (!response.id) {
          console.warn('No Paper Id came back from Wordpress')
          return
        }

        let sessionUpdate = {
          authorId: response.author || null,
          paperId: response.id,

          date_modified: response.modified,
          status: CheckoutStatus.FirstDraft,
          contributors: [user.email], //TODO: push and filter dups
          code: response.content ? response.content.rendered : '',
          original: '',
          excerpt: '',
          title: session.title,
        }

        await updateSession(doc as string, sessionUpdate)
      })
      .catch((error) => {
        console.error('error', error), setError(error)
      })
  }

  return {
    updatePaper,
    savePaper,
    publishPaper,
    session,
    setSession,
    error,
  }
}
