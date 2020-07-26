import React, { FC } from 'react'
import Layout from '../layout/Dashboard'
import PageSpinner from '../../components/layout/PageSpinner'
import dynamic from 'next/dynamic'


const MyEditor = dynamic(() => import('../../packages/tpot-scribe-editor/MyEditor'), {
    loading: PageSpinner
  })

type PaperEditorTemplateProps = {

}

const Template: FC<PaperEditorTemplateProps> = ({
 
}) => {

    return (
        <Layout>
            <MyEditor />
        </Layout>
    )
}

export default Template