import { Heading, Button, Link, Box, ListItem, List, Text, Spinner, Input, Stack, InputGroup, InputLeftAddon, InputRightAddon, Select } from '@chakra-ui/core'
import { Session, toDto, createInstance, Paper } from 'models';
import * as Routes from '../../constants/routes'
import { useWordpress } from '../../hooks'
import { useState, useEffect, FC } from 'react';
// import { Dropdown } from './Dropdown' // question-outline error again!

const sessionData = {
    status: "in-progress",
    slug: 'what-is-faith',
    excerpt: "What is Faith?",
    title: 'What is Faith?',
    code: `
    <p>
    <span>
        <h1>What is Faith?</h1>
        <p>Now faith is confidence in what we hope for and assurance about what we do not see. </p>
    </span>
    </p>`
}
export class User {
    id: number;
    name: string;
    url: string;
    description: string;
    link: string;
    slug: string;
}

let sessionDto = toDto(sessionData, Session)
console.log('sessionDto :>> ', sessionDto);

export const DomainTests = () => {

    const { getUser, getAllUsers } = useWordpress();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(createInstance(User));
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // const user = await getUser(10)
        // getUser(10)
        //     .then((response) => {
        //         setUser(toDto(response, User))
        //         setLoading(false)
        //         // console.log('user :>> ', user);
        //     })

        getAllUsers()
            .then((records) => {
                setUsers(records.map((record) => toDto(record, User)));
                setLoading(false)
                console.log('users :>> ', users);
            })
    }, []);

    return (
        <Box
            height="100%"
        >
            <Stack>
                <Heading>
                    Testing domains here!
                </Heading>
                <Stack spacing={4}>
                    <InputGroup>
                        <InputLeftAddon>Username</InputLeftAddon>
                        <Input type="tel" roundedLeft="0" placeholder="user's wordpress name" />
                    </InputGroup>
                </Stack>
                <List>
                    <Text>
                        {sessionDto.toString()}
                    </Text>

                    {/* <Dropdown></Dropdown> */}

                    {!!loading
                        ? <Spinner />
                        : <UserList users={users} />}
                </List>
            </Stack>
        </Box >
    )
}

export default DomainTests;

type ListProps = {
    users: User[]
}

const UserList: FC<ListProps> = ({ users }) => {
    console.log('users :>> ', users);

    return (<List>
        {users.map((user, index) => {
            return (
                <div key={index}>
                    <h3>{user.name}</h3>
                    <b>{user.slug}</b>
                    <i>{user.description}</i>
                </div>
            )
        })}
    </List>)
}


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