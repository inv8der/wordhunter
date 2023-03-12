'use client'

import { useMemo, useEffect, useState } from 'react'
import { Box, Heading, Text, Flex, Spinner } from '@chakra-ui/react'
import { useAppState } from '@/lib/context/app-state'

export default function SolvePuzzleResults() {
  const [isLoading, setIsLoading] = useState(true)
  const [solutions, setSolutions] = useState<string[]>([])
  const { letterBank, threeLetterWordsAllowed } = useAppState()

  const wordhunter = useMemo(() => {
    if (global.Worker) {
      return new Worker(new URL('@/lib/workers/wordhunter', import.meta.url))
    }
  }, [])

  useEffect(() => {
    if (wordhunter) {
      const message = {
        command: 'solve-puzzle',
        args: [letterBank, threeLetterWordsAllowed],
      }
      wordhunter.postMessage(message)
    }
  }, [])

  useEffect(() => {
    if (wordhunter) {
      wordhunter.onmessage = (e: MessageEvent<string[]>) => {
        setIsLoading(false)
        setSolutions(e.data)
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
          emptyColor="gray.200"
          color="spiroDiscoBall.500"
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
            alignItems="center"
            mx="auto"
            maxH="calc(6 * 1.5rem)"
            maxW="calc(3 * 7ch)"
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
