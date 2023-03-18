'use client'

import {
  Box,
  Heading,
  Text,
  Button,
  ButtonGroup,
  useColorModeValue,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { useAppState } from '@/lib/context/app-state'

export default function SolvePuzzle() {
  const { threeLetterWordsAllowed, toggleThreeLetterWords } = useAppState()

  const solidBorderColor = useColorModeValue(
    'spiroDiscoBall.500',
    'spiroDiscoBall.200'
  )
  const solidHoverColor = useColorModeValue(
    'spiroDiscoBall.600',
    'spiroDiscoBall.300'
  )
  const solidActiveColor = useColorModeValue(
    'spiroDiscoBall.700',
    'spiroDiscoBall.400'
  )

  const solidButtonStyles = {
    variant: 'solid',
    border: '1px solid',
    borderColor: solidBorderColor,
    _hover: {
      bgColor: solidHoverColor,
      borderColor: solidHoverColor,
    },
    _active: {
      bgColor: solidActiveColor,
      borderColor: solidActiveColor,
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
