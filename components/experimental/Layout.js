import { ZeitCard } from './ZeitCard'
import * as ROUTES from '../../constants/routes'

export const LandingLayout = () => {
    return (
        <div className="grid">
            <ZeitCard
                url={ROUTES.SCRIBE}
                title="Scribe"
                text='Click here use the Letter Editor!'
            />
            <ZeitCard
                url={ROUTES.TPOT}
                title="TPOT"
                text='The Path of Truth'
            />
        </div>
    )
}