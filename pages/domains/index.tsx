import { Heading, Button, Link, Box } from '@chakra-ui/core'
import { Session, toDto } from 'models';
import * as Routes from '../../constants/routes'

const sessionData = {
    status: "in-progress",
}

let sessionDto = toDto<Session>(sessionData, Session)
console.log('sessionDto :>> ', sessionDto);

let sessions = []
sessions.push(sessionData)
sessions.push({ slug: 'what-is-faith', status: "published" })

// // let sessionSet = toDtos(Session, sessions)
// // console.log('sessionDtoArray :>> ', sessionSet);

// let instance = createInstance<Session>(Session);
// instance.slug = 'new-paper'
// console.log('instance :>> ', instance);

// let traditionalInstance = new Session()
// traditionalInstance.slug = 'new-paper'
// console.log('new Session() :>> ', traditionalInstance);

{/* TypeError: Cannot use 'in' operator to search for 'gray' in undefined */ }
export const DomainTests = () => <div>
    <Heading>
        Testing domains here!
    </Heading>

    {/* <Box >
        <Button>Sample</Button>
    </Box> */}
    {/* <Button
        leftIcon='add'
        title="Go Home"
    >
        <Link href={Routes.LANDING}>
            <a>Portfolio</a>
        </Link>
    </Button> */}

    {/* <Button>
        <Link
            href={Routes.LANDING}
        >
        </Link>

    </Button> */}
</div>


export default DomainTests;