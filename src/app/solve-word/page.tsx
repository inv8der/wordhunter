'use client'

import { useCallback, useMemo } from 'react'
import NextLink from 'next/link'
import { useAppState } from '@/lib/context/app-state'
import useBoolean from '@/lib/hooks/use-boolean'
import Heading from '@/ui/typography/heading'
import Stack from '@/ui/layout/stack'
import Square from '@/ui/layout/square'
import Button from '@/ui/forms/button'
import Select from '@/ui/forms/select'
import Slider from '@/ui/forms/slider'
import SliderTrack from '@/ui/forms/slider-track'
import SliderFilledTrack from '@/ui/forms/slider-filled-track'
import SliderThumb from '@/ui/forms/slider-thumb'
import SliderMark from '@/ui/forms/slider-mark'
import Tooltip from '@/ui/overlay/tooltip'

export default function SolveWord() {
  const {
    letterBank,
    wordLength,
    wordPattern,
    updateWordLength,
    updateWordPattern,
  } = useAppState()

  const [sliderTooltipIsOpen, { on: showTooltip, off: hideTooltip }] =
    useBoolean()

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
    <div className="text-center">
      <Heading size="lg" className="mb-6">
        Stuck on a word?
      </Heading>
      <Stack direction="vertical" spacing={6} className="mb-16">
        <section>
          <p className="mb-2">How many letters is this word?</p>
          <Slider
            min={3}
            max={maxLetters}
            size="lg"
            defaultValue={wordLength}
            onChange={updateWordLength}
            onChangeStart={showTooltip}
            onChangeEnd={hideTooltip}
          >
            <SliderMark value={minLetters} className="ml-[-2.5ch] -mt-5">
              {minLetters}
            </SliderMark>
            <SliderMark value={maxLetters} className="ml-[2ch] -mt-5">
              {maxLetters}
            </SliderMark>
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <Tooltip
              color="spiroDiscoBall"
              hasArrow
              placement="top"
              isOpen={sliderTooltipIsOpen}
              label={wordLength}
              className="text-base"
            >
              <SliderThumb />
            </Tooltip>
          </Slider>
        </section>
        <section>
          <p className="mb-2">
            If you know the position of any of the letters, enter them below.
            This will help narrow down the results.
          </p>
          <Stack direction="horizontal" spacing={3} className="justify-center">
            {wordPattern.map((token, i) => (
              <Square key={`${token}-${i}`} size={10}>
                <Select
                  data-index={i}
                  value={token}
                  onChange={handleUpdatePattern}
                  placeholder="?"
                  hideIcon
                  className="uppercase text-center p-0 [text-align-last:center]"
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
              </Square>
            ))}
          </Stack>
        </section>
      </Stack>
      <NextLink href="/solve-word/results" passHref legacyBehavior>
        <Button color="seaGreen">Let&apos;s go!</Button>
      </NextLink>
    </div>
  )
}
