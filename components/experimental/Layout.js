import { SCRIBE, TPOT, ACCOUNT, HOME, LOGIN } from '../../constants/routes'
import ZeitContainer from './ZeitContainer.tsx'
import ZeitCard from './ZeitCard.tsx'

// import { useAuth } from '@hooks'

export const LandingLayout = () => {

    // const auth = useAuth();
    // console.log('auth :>> ', auth);

    return (

        <div className="grid">
            <ZeitContainer >
                <ZeitCard
                    url="home"
                    title="Home"
                    text='Go Home'
                />
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
        </div>
    )
}