import { Document } from 'firestorter'
import { inject, observer } from 'mobx-react'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import Dashboard from '../../../components/Dashboard'
import DocumentDetails from '../../../components/DocumentDetails'
import Router from 'next/router'

const Doc = ({ store }) => {

  const router = useRouter()
  const route = router.route
  const path = router.asPath

  // const message = 'Do you want to leave?';
  // const unsavedChanges = true

  // useEffect(() => {
  //   const routeChangeStart = (url) => {
  //     if (path !== url && unsavedChanges) {
  //       router.events.emit('routeChangeError')
  //       store.confirmSetAside(router, url)
  //         .then(() => router.push('/scribe/checkout', '/scribe/checkout'))
  //         .catch(() => router.push(route, path))
  //       throw new Error('Abort route change. This will not show up in production')
  //     }
  //   };

  //   const beforeunload = e => {
  //   };

  //   window.addEventListener('beforeunload', beforeunload);
  //   router.events.on('routeChangeStart', routeChangeStart);

  //   return () => {
  //     window.removeEventListener('beforeunload', beforeunload);
  //     router.events.off('routeChangeStart', routeChangeStart);
  //   };
  // }, [unsavedChanges]);


  const { doc } = router.query
  const { authUser } = store
  const document = authUser ? new Document(`sessions/${doc}`) : null

  if (document) {
    const { id, isLoading, data } = document
    return (
      <Dashboard title={`TPOT Scribe - Edit - ${doc}`}
        details={() => <DocumentDetails {...{ document }} />}
      >
        {isLoading
          ? <span>Loading...</span>
          : <Editor key={id} {...{ document }} />
        }
      </Dashboard>
    )
  }
  else {
    console.error("TPOT: no access, the store's initial props were not set by NextJS's router: \n\n authUser is", authUser)
    return (
      <Dashboard title={`TPOT Scribe - Edit - ${doc}`}
        details={<p>Error</p>}
      >
        <p>You don't have access to this page. This is a bug being worked on.</p>
      </Dashboard>
    )
  }
}



const Editor = observer(({ document }) => {
  const { data, id } = document
  const entries = data ? Object.entries(data) : []
  return (
    <>
      <h3>{`Now Editing: ${data.title}`}</h3>
      {data && entries.map((element, idx) => (
        <p key={idx}><b>{element[0]}</b>{`: ${element[1]}`}</p>

      ))}
    </>
  )
})



export default inject('store')(Doc)