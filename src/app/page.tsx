'use client'

import NextLink from 'next/link'
import { VStack, Heading, Text, Button, Box } from '@chakra-ui/react'

export default function App() {
  return (
    <Box textAlign="center">
      <Heading size="lg" mb={6}>
        Hey, there! 👋
      </Heading>
      <Text as="p" mb={6}>
        Stuck on a Wordscapes<sup>TM</sup> puzzle? I can help with that. Just
        add your letters to the bank below and select one of the following
        options.
      </Text>
      <VStack spacing={3}>
        <Button as={NextLink} href="/solve-word" colorScheme="spiroDiscoBall">
          I'm stuck on a word
        </Button>
        <Button as={NextLink} href="/solve-puzzle" colorScheme="spiroDiscoBall">
          Gimme all solutions
        </Button>
      </VStack>
    </Box>
  )
}
