import Stack from '@chakra-ui/core/dist/Stack';
import React, { } from 'react';
import Search from './Search';

const Wordpress = () => {

    // useEffect(() => {
    // getPageBySlug('chinese/index.htm')
    //     .then((response) => {
    //         console.log('response :>> ', response);
    //     })

    // search('chinese')
    //     .then((response) => {
    //         console.log('response :>> ', response);
    //     })
    // }, []);

    return (
        <Stack>
            <Search />

            {/* <ChineseIndex /> */}

            {/* <CategoryList /> */}

            {/* <div>
                Hello, nothing is here yet... please go <Link href="/">Home</Link>
            </div> */}
        </Stack>
    );
}

export default Wordpress;
