import React, { FC } from 'react'
import Box from '@chakra-ui/core/dist/Box'
import Stack from '@chakra-ui/core/dist/Stack'
import Layout from '../layout/Dashboard'
import PageSpinner from '../../components/layout/PageSpinner'
import dynamic from 'next/dynamic'


const CheckoutTable = dynamic(() => import('../checkout/CheckoutTable'), {
    loading: PageSpinner
})

type CheckoutTemplateProps = {

}

const Template: FC<CheckoutTemplateProps> = ({

}) => {

    return (
        <Layout>
            <Stack p={4} align="center">
                <Box w="100%" maxW={960}>
                    <CheckoutTable />
                </Box>
            </Stack>
        </Layout>
    )
}

export default Template