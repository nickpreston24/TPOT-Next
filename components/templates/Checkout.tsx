import React, { FC, ReactNode } from 'react'
import Box from '@chakra-ui/core/dist/Box'
import Layout from '../layout/Dashboard'
import PageSpinner from '../../components/layout/PageSpinner'
import dynamic from 'next/dynamic'
// import SplashScreen from '../svg/SittingAtComputer'

const CheckoutTable = dynamic(() => import('../checkout/CheckoutTable'), {
    loading: PageSpinner
})

type CheckoutTemplateProps = {

}

const Template: FC<CheckoutTemplateProps> = ({
 
}) => {

    return (
        <Layout>
            <CheckoutTable />
        </Layout>
    )
}

export default Template