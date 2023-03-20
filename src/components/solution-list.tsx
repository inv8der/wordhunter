'use client'

import { useMemo } from 'react'
import { Flex, Box } from '@chakra-ui/react'

interface Props {
  items: string[]
}

export default function SolutionList({ items }: Props) {
  const [cols, rows] = useMemo(() => {
    const numSolutions = items.length
    const maxR = items.length < 40 ? 10 : 15
    let c = 1
    let r = 1

    for (c = 1; c <= 5; c += 1) {
      r = Math.ceil(numSolutions / c)
      if (r <= maxR) {
        break
      }
    }

    return [c, r]
  }, [items.length])

  return (
    <Flex
      direction="column"
      mx="auto"
      maxH={`calc(${rows} * 1.5rem)`}
      maxW={`calc(${cols} * 7ch)`}
      flexWrap="wrap"
      textAlign="left"
    >
      {items.map((word) => (
        <Box key={word} w="7ch">
          {word}
        </Box>
      ))}
    </Flex>
  )
}
