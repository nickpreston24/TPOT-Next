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

const defaultStyle = {
    color: '#111',
    background: '#efe'
}

export const Post = ({ post = null, style = defaultStyle }) => {

    if (!post)
        return null;

    const { link, categories, image } = post || {};
    let excerpt = post?.excerpt?.rendered || post?.excerpt || ''
    let title = post?.title?.rendered || post?.title || ''

    return (
        <Box
            style={style}
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

                            {excerpt &&
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
                                    {excerpt || "No Excerpt"}
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

                            {title &&
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
                                    {`${title}`}
                                </Heading>}

                        </Flex>,

                    actions:
                        <Stack direction="row">
                            <Link
                                href={link}
                                isExternal
                                color="blue.100"
                            >
                                {`Read ${title}`}
                            </Link>
                            <FiExternalLink color="#eee"
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

export default Post;