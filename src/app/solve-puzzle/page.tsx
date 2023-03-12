'use client'

import { useCallback, useState } from 'react'
import {
  VStack,
  Heading,
  Text,
  Button,
  ButtonGroup,
  useBoolean,
  Box,
} from '@chakra-ui/react'

export default function SolvePuzzle() {
  const [
    areThreeLetterWordsAllowed,
    { on: allowThreeLetterWords, off: restrictThreeLetterWords },
  ] = useBoolean()

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
            onClick={allowThreeLetterWords}
            {...(areThreeLetterWordsAllowed
              ? solidButtonStyles
              : outlineButtonStyles)}
          >
            Yes
          </Button>
          <Button
            colorScheme="spiroDiscoBall"
            onClick={restrictThreeLetterWords}
            {...(areThreeLetterWordsAllowed
              ? outlineButtonStyles
              : solidButtonStyles)}
          >
            No
          </Button>
        </ButtonGroup>
      </Box>
      <Button colorScheme="seaGreen">Let's go!</Button>
    </Box>
  )
}
