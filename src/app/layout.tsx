'use client'

import './globals.css'
import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider, Box, Container, VStack } from '@chakra-ui/react'
import { AppStateProvider } from '@/lib/context/app-state'
import theme from '@/lib/theme'
import LetterBank from '@/components/letter-bank'
import AppBar from '@/components/app-bar'

// export const metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CacheProvider>
          <ChakraProvider theme={theme}>
            <AppStateProvider>
              <Container as={VStack} p={0} maxW="container.md">
                <AppBar />
                <Box as="main" w="100%" pt={['56px', null, '60px']} pb="65px">
                  <Container>{props.children}</Container>
                </Box>
                <LetterBank />
              </Container>
            </AppStateProvider>
          </ChakraProvider>
        </CacheProvider>
      </body>
    </html>
  )
}
