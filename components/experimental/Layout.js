import ZeitContainer from './ZeitContainer.tsx'
import ZeitCard from './ZeitCard.tsx'
import { Box } from '@material-ui/core'
import { Row } from 'simple-flexbox'
import { SCRIBE, TPOT, LOGIN } from '@routes'
import { useAuth } from '@hooks'

const actionTexts = {
    checkout: 'Checking out a Document',
    login: 'Logging in',
}

const Layout = () => {

    const auth = useAuth();
    let isAuthenticated = !!auth?.user || false;

    console.log('authenticated? :>> ', isAuthenticated);

    let action = isAuthenticated ? actionTexts.checkout : actionTexts.login;

    return (

        <div className="grid">
            {/* <Box height="100%"> */}
            <p className="description">
                {`Get started by ${action}`}
            </p>
            <Row
                horizontal="center"
            >
                <ZeitContainer >
                    {!isAuthenticated &&
                        <ZeitCard
                            url={LOGIN}
                            title="Login"
                            text='Login to Toolbox'
                        />}
                    {/* <ZeitCard
                    url={ACCOUNT}
                    title="Account"
                    text='Go to your Account'
                /> */}
                    {isAuthenticated &&
                        <ZeitCard
                            url={SCRIBE}
                            title="Scribe"
                            text='Click here use the Letter Editor!'
                        />
                    }
                    <ZeitCard
                        url={TPOT}
                        title="TPOT"
                        text='The Path of Truth'
                    />
                </ZeitContainer>
                {/* </Box> */}
            </Row>
        </div>
    )
}

export default Layout;