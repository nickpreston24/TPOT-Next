import {
  Box,
  Button,
  Flex,
  FormLabel,
  Heading,
  Icon,
  Input,
  Select,
  Stack,
  Tag,
  TagCloseButton,
  TagLabel,
  Text
} from '@chakra-ui/react'
import React, { useEffect } from 'react'

import Navbar from '@organisms/Navbar'
import PropTypes from 'prop-types'
import SplitBackground from '@molecules/SplitBackground'
import { layout as fullpageLayout } from '../FullpageLayout'
import { observer } from 'mobx-react-lite'
import { useDetailsModel } from '@hooks'

/* ////////////////////////////////////////////////////// */
/*                     MAIN COMPONENT                     */
/* ////////////////////////////////////////////////////// */

const DashboardLayout = ({ title, children }) => {
  useEffect(() => {
    console.log('dashboard mounted')
    return () => {
      console.log('dashboard unmounting')
    }
  }, [])

  return (
    <Flex
      h='100vh'
      w='100vw'
      pos='absolute'
      justify='center'
      style={{ WebkitTapHighlightColor: 'transparent' }}
    >
      <Stack
        h='100%'
        w='100%'
        // border='2px solid blue'
        overflow='hidden'
        maxW={1200}
        spacing={4}
        px={4}
      >
        <Box minH={{ base: 130, md: 150 }}>
          <Navbar bg='transparent' />
        </Box>
        <Box flexGrow={1} pos='relative'>
          <Stack spacing={4} direction='row'>
            <Box flexGrow={1}>
              <EditorPanel>{children}</EditorPanel>
            </Box>
            <Box w={350}>
              {/* Details
            <Input /> */}
              <DetailsPanel />
            </Box>
          </Stack>
          <DetailsToggle />
        </Box>
      </Stack>
      <SplitBackground />
    </Flex>
  )
}

DashboardLayout.propTypes = {
  /**
   * The input name of the component
   */
  name: PropTypes.string.isRequired
}

DashboardLayout.defaultProps = {
  name: 'Name'
}

export const layout = page =>
  fullpageLayout(<DashboardLayout>{page}</DashboardLayout>)

export default DashboardLayout

/* ////////////////////////////////////////////////////// */
/*                    OTHER COMPONENTS                    */
/* ////////////////////////////////////////////////////// */

const tagOptions = ['chinese', 'diabolical doctrine', 'salvation', 'faith']

const DetailsToggle = () => (
  <Flex
    right='-16px'
    top='8px'
    pos='absolute'
    w='45px'
    h='44px'
    bg='#29333ae0'
    bg='blue.500'
    justify='center'
    align='center'
    color='#9699a0'
    color='white'
    borderRadius='8px 0px 0px 8px'
    boxShadow='lg'
    display={{ base: 'flex', lg: 'none' }}
  >
    <Icon name='info' />
  </Flex>
)

const DetailsPanel = observer(() => {
  const model = useDetailsModel()

  return (
    <Stack
      spacing={4}
      borderRadius='lg'
      boxShadow='md'
      d={{ base: 'none', lg: 'block' }}
      boxSizing='border-box'
      p={6}
      h='100%'
      bg='white'
      color='gray.600'
    >
      <CardTitle />
      <Stack direction='row'>
        <Box width={1 / 2}>
          <FormLabel htmlFor='type'>Type</FormLabel>
          <Select
            id='type'
            value='translation'
            onChange={() => null}
            variant='filled'
          >
            <option value='letter'>Letter</option>
            <option value='translation'>Translation</option>
            <option value='biography'>Biography</option>
            <option value='page'>Generic</option>
          </Select>
        </Box>
        <Box width={1 / 2}>
          <FormLabel htmlFor='tags'>Tags</FormLabel>
          <Select
            id='type'
            defaultValue=''
            onChange={() => null}
            variant='filled'
          >
            <option value=''>Select...</option>
            <option value='translation'>Translation</option>
            <option value='biography'>Biography</option>
            <option value='page'>Generic</option>
          </Select>
        </Box>
      </Stack>
      <Box>
        {model.tags.map((tag, idx) => (
          <Tag
            key={idx}
            rounded='full'
            size='sm'
            colorScheme='teal'
            mr={1}
            mb={1}
          >
            <TagLabel>{tag}</TagLabel>
            <TagCloseButton />
          </Tag>
        ))}
      </Box>
      <Box>
        <FormLabel htmlFor='slug'>Slug</FormLabel>
        <Stack direction='row'>
          <Input
            id='slug'
            placeholder='name-of-paper'
            variant='filled'
            value={model.text}
            onChange={e => model.setText(e.target.value)}
          />
        </Stack>
      </Box>
      <Box>
        <Stack direction='row'>
          <FormLabel htmlFor='slug' flexGrow={1}>
            When live, the URL will be:
          </FormLabel>
          <Button size='xs'>Copy</Button>
        </Stack>
        <Box
          mt={1}
          rounded='full'
          transition='250ms background ease-in'
          _hover={{ bg: 'blue.100' }}
          _active={{ bg: 'blue.100' }}
        >
          <Text
            px={4}
            as='input'
            w='100%'
            outline='none'
            color='blue.500'
            bg='transparent'
            textDecor='underline'
            fontSize='sm'
            readOnly
            contentEditable
            isTruncated
            value='www.thepathoftruth.com/letters/name-of-paper.htm'
          />
        </Box>
      </Box>
      <Stack direction='row' pt={2} spacing={2}>
        <Button colorScheme='blue' w='50%'>
          Save
        </Button>
        <Button colorScheme='green' w='100%'>
          Submit for Review
        </Button>
      </Stack>
    </Stack>
  )
})

const CardTitle = ({ title, children }) => (
  <Stack pb={4}>
    <Stack direction='row'>
      <Heading size='md' mt={1} fontWeight={500}>
        Publish Details
      </Heading>
    </Stack>
    <Box h='2px' bg='gray.100' />
  </Stack>
)

const EditorPanel = ({ children }) => (
  <Stack
    spacing={4}
    borderRadius='lg'
    boxShadow='md'
    // d={{ base: "none", lg: "block" }}
    // boxSizing="border-box"
    w='100%'
    flexGrow={1}
    h='100%'
    p={6}
    // minW={{ base: 0, md: 350 }}
    h='100%'
    bg='white'
    color='gray.600'
  >
    <Stack pb={4}>
      <Stack direction='row'>
        <Heading size='md' mt={1} fontWeight={500}>
          Publish Details2
        </Heading>
      </Stack>
      <Box h='2px' bg='gray.100' />
      <Box>{children}</Box>
    </Stack>
  </Stack>
)
