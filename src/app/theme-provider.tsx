'use client'

import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import theme from '@/lib/theme'

export default function ThemeProvider(props: { children: React.ReactNode }) {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript
        type="cookie"
        initialColorMode={theme.config.initialColorMode}
      />
      {props.children}
    </ChakraProvider>
  )
}
