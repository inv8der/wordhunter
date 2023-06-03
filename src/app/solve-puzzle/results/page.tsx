'use client'

import { useMemo, useEffect, useState } from 'react'
import { useAppState } from '@/lib/context/app-state'
import Heading from '@/ui/typography/heading'
import Spinner from '@/ui/feedback/spinner'
import SolutionList from '@/components/solution-list'

export default function SolvePuzzleResults() {
  const [isLoading, setIsLoading] = useState(true)
  const [solutions, setSolutions] = useState<string[]>([])
  const { letterBank, threeLetterWordsAllowed } = useAppState()

  const wordhunter = useMemo(() => {
    if (global.Worker) {
      return new Worker(new URL('@/lib/workers/wordhunter', import.meta.url))
    }
  }, [])

  const [cols, rows] = useMemo(() => {
    const numSolutions = solutions.length
    const maxR = solutions.length < 40 ? 10 : 20
    let c = 1
    let r = 1

    for (c = 1; c <= 5; c += 1) {
      r = Math.ceil(numSolutions / c)
      if (r <= maxR) {
        break
      }
    }

    return [c, r]
  }, [solutions.length])

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
    <div className="text-center w-full">
      {isLoading ? (
        <Spinner
          thickness="4px"
          speed="0.65s"
          color="spiroDiscoBall"
          size="xl"
          className="mt-[20vh]"
        />
      ) : (
        <>
          <Heading size="lg" className="mb-6">
            Possible solutions
          </Heading>
          <p className="mb-6">
            {solutions.length === 1 ? (
              <>{solutions.length} word found that matches!</>
            ) : (
              <>{solutions.length} words found that match!</>
            )}
          </p>
          <SolutionList items={solutions} />
        </>
      )}
    </div>
  )
}
