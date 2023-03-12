'use client'

import { Box, Heading, Text, Button, ButtonGroup } from '@chakra-ui/react'
import NextLink from 'next/link'
import { useAppState } from '@/lib/context/app-state'

export default function SolvePuzzle() {
  const { threeLetterWordsAllowed, toggleThreeLetterWords } = useAppState()

  const solidButtonStyles = {
    variant: 'solid',
    border: '1px solid',
    borderColor: 'spiroDiscoBall.400',
    _hover: {
      bgColor: 'spiroDiscoBall.600',
      borderColor: 'spiroDiscoBall.600',
    },
    _active: {
      bgColor: 'spiroDiscoBall.700',
      borderColor: 'spiroDiscoBall.700',
    },
  }

  const outlineButtonStyles = {
    variant: 'outline',
  }

  return (
    <Box textAlign="center">
      <Heading size="lg" mb={6}>
        Need all solutions?
      </Heading>
      <Box as="section" mb={16}>
        <Text marginBottom={2}>Are 3 letter words allowed?</Text>
        <ButtonGroup spacing={2}>
          <Button
            colorScheme="spiroDiscoBall"
            onClick={() => toggleThreeLetterWords(true)}
            {...(threeLetterWordsAllowed
              ? solidButtonStyles
              : outlineButtonStyles)}
          >
            Yes
          </Button>
          <Button
            colorScheme="spiroDiscoBall"
            onClick={() => toggleThreeLetterWords(false)}
            {...(threeLetterWordsAllowed
              ? outlineButtonStyles
              : solidButtonStyles)}
          >
            No
          </Button>
        </ButtonGroup>
      </Box>
      <Button as={NextLink} href="/solve-puzzle/results" colorScheme="seaGreen">
        Let's go!
      </Button>
    </Box>
  )
}
