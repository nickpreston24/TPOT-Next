import { Box } from '@chakra-ui/react'

const FullpageLayout = ({ children }) => (
  <Box bg='gray.400' pos='absolute' h='100vh' w='100vw' overflow="hidden">
    <Box pos="relative" h="100%">{children}</Box>
    {/* {children} */}
  </Box>
)

export const layout = page => <FullpageLayout>{page}</FullpageLayout>

export default FullpageLayout
