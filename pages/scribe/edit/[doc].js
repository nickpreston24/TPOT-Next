import React from 'react'
import { useRouter } from 'next/router'
import { Document } from 'firestorter'
import Dashboard from '../../../components/Dashboard'
import { observer, inject } from 'mobx-react'


const Doc = ({ store }) => {
  const router = useRouter()
  const { doc } = router.query
  const { authUser } = store
  const document = authUser ? new Document(`sessions/${doc}`) : null
  if (document) {
    const { id, isLoading, data } = document
    return (
      <Dashboard title={`TPOT Scribe - Edit - ${doc}`}
        details={<p>test</p>}
      >
        {isLoading
          ? <span>Loading...</span>
          : <Editor key={id} {...{ document }} />
        }
      </Dashboard>
    )
  } else {
    console.error("TPOT: no access, the store's initial props were not set by NextJS's router: \n\n authUser is", authUser)
    return (
      <Dashboard title={`TPOT Scribe - Edit - ${doc}`}
      details={<p>test</p>}
    >
     <p>You don't have access to this page. This is a bug being worked on.</p>
    </Dashboard>
    )
  }
}

export default inject('store')(Doc)

const Editor = observer(({ document }) => {
  const { data, id } = document
  const entries = data ? Object.entries(data) : []
  return (
    <>
      <h3>{`Now Editing: ${id}`}</h3>
      {data && entries.map((element, idx) => (
        <p key={idx}><b>{element[0]}</b>{`: ${element[1]}`}</p>
      ))}
    </>
  )
});