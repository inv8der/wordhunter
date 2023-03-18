'use client'

import { useMemo, useEffect, useState } from 'react'
import {
  Box,
  Heading,
  Text,
  Flex,
  Spinner,
  useColorModeValue,
} from '@chakra-ui/react'
import { useAppState } from '@/lib/context/app-state'

export default function SolveWordResults() {
  const [isLoading, setIsLoading] = useState(true)
  const [solutions, setSolutions] = useState<string[]>([])
  const { letterBank, wordPattern } = useAppState()

  const spinnerColor = useColorModeValue(
    'spiroDiscoBall.500',
    'spiroDiscoBall.200'
  )
  const spinnerEmptyColor = useColorModeValue('gray.200', 'whiteAlpha.300')

  const wordhunter = useMemo(() => {
    if (global.Worker) {
      return new Worker(new URL('@/lib/workers/wordhunter', import.meta.url))
    }
  }, [])

  const [cols, rows] = useMemo(() => {
    const numSolutions = solutions.length
    switch (true) {
      case numSolutions <= 20:
        return [2, Math.ceil(numSolutions / 2)]
      case numSolutions <= 30:
        return [3, Math.ceil(numSolutions / 3)]
      case numSolutions <= 40:
        return [4, Math.ceil(numSolutions / 4)]
      default:
        return [5, Math.ceil(numSolutions / 5)]
    }
  }, [solutions.length])

  useEffect(() => {
    if (wordhunter) {
      const message = {
        command: 'solve-word',
        args: [letterBank, wordPattern.join('')],
      }
      wordhunter.postMessage(message)
    }
  }, [])

  useEffect(() => {
    if (wordhunter) {
      wordhunter.onmessage = (e: MessageEvent<string[]>) => {
        const results = e.data
        setIsLoading(false)
        setSolutions(results)
      }
    }
  }, [])

  return (
    <Box textAlign="center" w="100%">
      {isLoading ? (
        <Spinner
          mt="20vh"
          thickness="4px"
          speed="0.65s"
          emptyColor={spinnerEmptyColor}
          color={spinnerColor}
          size="xl"
        />
      ) : (
        <>
          <Heading size="lg" mb={6}>
            Possible solutions
          </Heading>
          <Text as="p" mb={6}>
            {solutions.length === 1 ? (
              <>{solutions.length} word found that matches!</>
            ) : (
              <>{solutions.length} words found that match!</>
            )}
          </Text>
          <Flex
            direction="column"
            mx="auto"
            maxH={`calc(${rows} * 1.5rem)`}
            maxW={`calc(${cols} * 7ch)`}
            flexWrap="wrap"
            textAlign="left"
          >
            {solutions.map((word) => (
              <Box key={word} w="7ch">
                {word}
              </Box>
            ))}
          </Flex>
        </>
      )}
    </Box>
  )
}
