'use client'

import NextLink from 'next/link'
import { useAppState } from '@/lib/context/app-state'
import Stack from '@/ui/layout/stack'
import Heading from '@/ui/typography/heading'
import Button from '@/ui/forms/button'

export default function SolvePuzzle() {
  const { threeLetterWordsAllowed, toggleThreeLetterWords } = useAppState()

  return (
    <div className="text-center">
      <Heading size="lg" className="mb-6">
        Need all solutions?
      </Heading>
      <section className="mb-16">
        <p className="mb-2">Are 3 letter words allowed?</p>
        <Stack direction="horizontal" spacing={2} className="justify-center">
          <Button
            color="spiroDiscoBall"
            onClick={() => toggleThreeLetterWords(true)}
            variant={threeLetterWordsAllowed ? 'solid' : 'outline'}
            isActive={threeLetterWordsAllowed}
            className={
              threeLetterWordsAllowed
                ? 'border border-solid border-transparent'
                : ''
            }
          >
            Yes
          </Button>
          <Button
            color="spiroDiscoBall"
            onClick={() => toggleThreeLetterWords(false)}
            variant={threeLetterWordsAllowed ? 'outline' : 'solid'}
            isActive={!threeLetterWordsAllowed}
            className={
              !threeLetterWordsAllowed
                ? 'border border-solid border-transparent'
                : ''
            }
          >
            No
          </Button>
        </Stack>
      </section>
      <NextLink href="/solve-puzzle/results" passHref legacyBehavior>
        <Button color="seaGreen">Let&apos;s go!</Button>
      </NextLink>
    </div>
  )
}
