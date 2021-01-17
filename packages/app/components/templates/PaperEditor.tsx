import dynamic from 'next/dynamic'
import React, { FC } from 'react'
import PageSpinner from '../../components/layout/PageSpinner'
import Layout from '../layout/Dashboard'

const ScribeEditor = dynamic(() => import('../../packages/tpot-scribe-editor/ScribeEditor'), {
  ssr: false,
  loading: PageSpinner,
})

type PaperEditorTemplateProps = {
  editorProps?: Partial<any>
}

const Template: FC<PaperEditorTemplateProps> = ({ editorProps = {} }) => {
  const { currentDoc = null } = editorProps

  return (
    <Layout>
      <ScribeEditor doc={currentDoc} />
    </Layout>
  )
}

export default Template
