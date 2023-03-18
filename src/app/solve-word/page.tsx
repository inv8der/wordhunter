'use client'

import { useCallback, useMemo } from 'react'
import {
  HStack,
  VStack,
  Heading,
  Text,
  Button,
  Box,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  Select,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { useAppState } from '@/lib/context/app-state'

export default function SolveWord() {
  const {
    letterBank,
    wordLength,
    wordPattern,
    updateWordLength,
    updateWordPattern,
  } = useAppState()

  const minLetters = 3
  const maxLetters = letterBank.length

  // TODO: Available letter can be a map of letters to available count
  const availableLetters = useMemo(() => {
    return wordPattern.reduce(
      (list, letter) => {
        const i = list.indexOf(letter)
        if (i >= 0) {
          list.splice(i, 1)
        }
        return list
      },
      [...letterBank]
    )
  }, [wordPattern])

  const handleUpdatePattern = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const letter = event.target.value
      const index = parseInt(event.target.dataset.index ?? '-1')
      wordPattern[index] = letter || '*'
      updateWordPattern(wordPattern.join(''))
    },
    [wordPattern]
  )

  return (
    <Box textAlign="center">
      <Heading size="lg" mb={6}>
        Stuck on a word?
      </Heading>
      <VStack spacing={6} mb={16}>
        <section>
          <Text marginBottom={2}>How many letters is this word?</Text>
          <Slider
            colorScheme="spiroDiscoBall"
            min={3}
            max={maxLetters}
            defaultValue={wordLength}
            onChange={updateWordLength}
          >
            <SliderMark value={minLetters} ml="-2.5ch" mt="-0.75rem">
              {minLetters}
            </SliderMark>
            <SliderMark value={maxLetters} ml="2ch" mt="-0.75rem">
              {maxLetters}
            </SliderMark>
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </section>
        <section>
          <Text marginBottom={2}>
            If you know the position of any of the letters, enter them below.
            This will help narrow down the results.
          </Text>
          <HStack spacing={3} justify="center">
            {wordPattern.map((token, i) => (
              <Select
                key={`${token}-${i}`}
                data-index={i}
                value={token}
                onChange={handleUpdatePattern}
                placeholder="?"
                variant="outline"
                iconSize="0"
                textTransform="uppercase"
                w={10}
                h={10}
                sx={{
                  padding: 0,
                  textAlign: 'center',
                  textAlignLast: 'center',
                }}
              >
                {letterBank.map((letter, j) => (
                  <option
                    key={`${letter}-${j}`}
                    value={letter}
                    disabled={!availableLetters.includes(letter)}
                  >
                    {letter.toUpperCase()}
                  </option>
                ))}
              </Select>
            ))}
          </HStack>
        </section>
      </VStack>
      <Button as={NextLink} href="/solve-word/results" colorScheme="seaGreen">
        Let's go!
      </Button>
    </Box>
  )
}
