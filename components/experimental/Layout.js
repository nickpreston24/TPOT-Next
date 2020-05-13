// import { ZeitContainer, ZeitButton, ZeitCard } from './container.tsx'
import { SCRIBE, TPOT } from '../../constants/routes'
import { toast } from 'react-toastify'
import ZeitContainer from './ZeitContainer.tsx'
import ZeitCard from './ZeitCard.tsx'
import ZeitButton from './ZeitButton.tsx'


const notify = (message = '', mode = null) => {
    let toaster = !!mode ? toast[mode] : toast
    toaster(message, {
        position: 'bottom-left',
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
    })
}

export const LandingLayout = () => {
    return (
        <div className="grid">
            <ZeitContainer >
                <ZeitButton
                    text="Click here for Coffee!"
                    onClick={() => notify('Ping!')}
                    // backgroundColor="rgba(75, 0, 130, 1.0)"
                    color="rgba(0,161,225,.9)"
                />
                <br />
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