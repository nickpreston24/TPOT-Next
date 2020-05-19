import { SCRIBE, TPOT } from '../../constants/routes'
import { toast } from 'react-toastify'
import ZeitContainer from './ZeitContainer.tsx'
import ZeitCard from './ZeitCard.tsx'

// import { scriptureParser, Scripture } from '../../models/'

// let multilineText = `
// Here is the kicker: He did this so that we could be and do the same. He would have no less from us. He does not expect us to express this love in our own power or understanding. We are in need of the Savior exactly because we are wholly inadequate to the task of being like God, sold out to serving ourselves. We can only look to the Lord Jesus Christ, by the grace of God, and put our trust in Him to change us as we obey Him. That is the fruit of Christ’s love, planted in His death, and raised up in the human being in which He has conceived Himself, those called and chosen by God through Christ.

// “In this is love, not that we loved God, but that He loved us and sent His Son to be the propitiation concerning our sins” (1 John 4:10 MKJV).

// “And we have seen and testify that the Father sent the Son to be the Savior of the world. Whoever shall confess that Jesus is the Son of God, God dwells in him and he in God. And we have known and believed the love that God has in us. God is love, and he who abides in love abides in God, and God in him. In this is our love made perfect, that we may have boldness in the day of judgment, that as He is, so also we are in this world” (1 John 4:14-17 MKJV).
// `

// let singleLineText = '“Every way of a man is right in his own eyes, but the LORD weighs the hearts” (Proverbs 21:2 HNV).'

// /** Scripture Dto test
//  *  FIX?? :>> This will parse text files, but not string literals, so beware!
//  */
// let scripture = scriptureParser.parse(singleLineText)

// console.log('scripture :>> ', scripture)

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