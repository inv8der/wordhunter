'use client'

import { useEffect, useState, useRef } from 'react'
import { useAppState } from '@/lib/context/app-state'
import Heading from '@/ui/typography/heading'
import Spinner from '@/ui/feedback/spinner'
import SolutionList from '@/components/solution-list'
import { Wordhunter } from '@/lib/wordhunter'

export default function SolveWordResults() {
  const [isLoading, setIsLoading] = useState(true)
  const [solutions, setSolutions] = useState<string[]>([])
  const { letterBank, wordPattern } = useAppState()

  const wordhunterRef = useRef<Wordhunter>()
  if (!wordhunterRef.current) {
    wordhunterRef.current = new Wordhunter()
  }

  useEffect(() => {
    async function solveWord() {
      const wordhunter = wordhunterRef.current
      if (wordhunter) {
        setIsLoading(true)
        const result = await wordhunter.solveWord(
          letterBank,
          wordPattern.join('')
        )
        setSolutions(result)
        setIsLoading(false)
      }
    }

    solveWord()
  }, [letterBank, wordPattern])

  return (
    <div className="w-full text-center">
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
