'use client'

import { Box, Container } from '@chakra-ui/react'

export default function Main(props: { children: React.ReactNode }) {
  return (
    <Box as="main" w="100%" mt="0.5rem" pt={['56px', null, '60px']} pb="65px">
      <Container>{props.children}</Container>
    </Box>
  )
}
