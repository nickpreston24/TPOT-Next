// import { ZeitContainer, ZeitButton, ZeitCard } from './container.tsx'
import { SCRIBE, TPOT } from '../../constants/routes'
import { toast } from 'react-toastify'
import ZeitContainer from './ZeitContainer.tsx'
import ZeitCard from './ZeitCard.tsx'

import { Paper } from '../../models/paper'
const paper = new Paper('Test')

const dto = { title: 'CookieS!', url: 'http://thepathoftruth.com', color: 'umbrella' }
paper.deserialize(dto)
console.log(paper)

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