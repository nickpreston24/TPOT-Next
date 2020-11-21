import { Card } from '../../../components/atoms'
import Box from '@chakra-ui/core/dist/Box'
import Flex from '@chakra-ui/core/dist/Flex'
import Badge from '@chakra-ui/core/dist/Badge'
import Link from '@chakra-ui/core/dist/Link'
import Image from '@chakra-ui/core/dist/Image'
import Heading from '@chakra-ui/core/dist/Heading'
import { FiExternalLink } from 'react-icons/fi'
import React from 'react'
import Stack from '@chakra-ui/core/dist/Stack'
import { Router, useRouter } from 'next/router'

export const Post = ({ post }) => {

    const router = useRouter();

    if (!post)
        return null;

    const { excerpt, title, link, categories, image } = post || {};

    // console.log('post :>> ', post);

    // const { categories: allCategories } = useWordpress();
    // console.log('allCategories :>> ', allCategories);
    return (

        <Box
            // style={{ background: "linear-gradient(to left, #ff34d7, #2bc0e4)" }}
            style={{ background: "linear-gradient(to left, #722, #f31)" }}
            mb={10}
            p={4}
            borderRadius="25px"
            verticalAlign="center"
            margin={2}
        >
            <Card>
                {{
                    content:
                        <Flex
                            align="center"
                            mt={4}
                            mb={4}
                        >
                            <Flex align="flex-end">
                                {categories &&
                                    categories.map(category => {
                                        let { id, name } = category;
                                        // <Link href={} isExternal></Link>
                                        return <Badge key={id} variant="outline" variantColor="red">{name}</Badge>
                                    })
                                }
                            </Flex>

                            {excerpt.rendered &&
                                <Box
                                    width="full"

                                    flexWrap="wrap"
                                    // align="center"
                                    // alignContent='center'
                                    color="blue.200"
                                    // color="#2bc0e4"
                                    // fontWeight="semibold"
                                    letterSpacing="wide"
                                    fontSize="md"
                                // textTransform="uppercase"
                                // ml="2"
                                >
                                    {excerpt.rendered || "No Excerpt"}
                                </Box>
                            }
                        </Flex>,
                    media:
                        <Flex
                            rounded="md"
                            flex="shrink"
                        >
                            {image &&
                                <Image
                                    size="200px"
                                    alt={title}
                                    src={image}
                                    objectFit="cover"
                                    rounded="lg"
                                // borderRadius="25"
                                // height="100%"
                                >
                                </Image>
                            }

                            {title.rendered &&
                                <Heading
                                    ml={10}
                                    textAlign="center"
                                    color="#fff"
                                    size="sm"
                                    fontSize="3rem"
                                    letterSpacing="2px"
                                    textTransform="uppercase"
                                    border="3px #fff solid"
                                // transform="translate(0%, 50%)"
                                >
                                    {title.rendered}
                                </Heading>}

                        </Flex>,

                    actions:
                        <Stack direction="row">
                            <Link
                                href={link}
                                isExternal
                                color="blue.100"
                            >
                                {`Read ${title.rendered}`}
                            </Link>
                            <FiExternalLink color="#eee"
                            // onClick={() => router.push(link)}
                            >
                                {/* <Link
                                    href={link}
                                    isExternal
                                    color="blue.100"
                                /> */}
                            </FiExternalLink>
                        </Stack>
                }}
            </Card>

        </Box>

    );
};

// const Post = () => {
//     return (
//         <div>
//             <h3 style={{ marginBottom: "0" }}><b>{title?.rendered}</b></h3>
//             {/* <a href={link}></a> */}
//             {excerpt && (
//                 <i dangerouslySetInnerHTML={{ __html: excerpt?.rendered }}></i>
//             )}
//         </div>
//     );
// }

export default Post;