import React, { FC } from 'react'
import Layout from '../layout/Dashboard'
import PageSpinner from '../../components/layout/PageSpinner'
import dynamic from 'next/dynamic'


const MyEditor = dynamic(() => import('../../packages/tpot-scribe-editor/MyEditor'), {
    ssr: false, loading: PageSpinner
  })

type PaperEditorTemplateProps = {
    editorProps?: Partial<any>
}

const Template: FC<PaperEditorTemplateProps> = ({
    editorProps = {}
}) => {

    const { currentDoc = null } = editorProps

    return (
        <Layout>
            <MyEditor doc={currentDoc} />
        </Layout>
    )
}

export default Template