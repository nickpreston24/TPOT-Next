import { SCRIBE, TPOT, ACCOUNT, HOME, LOGIN } from '../../constants/routes'
import ZeitContainer from './ZeitContainer.tsx'
import ZeitCard from './ZeitCard.tsx'
import { Box } from '@material-ui/core'

// import { useAuth } from '@hooks'

export const Layout = () => {

    // const auth = useAuth();
    // console.log('auth :>> ', auth);

    return (

        <div className="grid">
            <Box height="100%">
                <ZeitContainer >
                    <ZeitCard
                        url={LOGIN}
                        title="Login"
                        text='Login to Toolbox'
                    />
                    {/* <ZeitCard
                    url={ACCOUNT}
                    title="Account"
                    text='Go to your Account'
                /> */}
                    <ZeitCard
                        url={SCRIBE}
                        title="Scribe"
                        text='Click here use the Letter Editor!'
                    />
                    <ZeitCard
                        url={TPOT}
                        title="TPOT"
                        text='The Path of Truth'
                    />
                </ZeitContainer>
            </Box>
        </div>
    )
}