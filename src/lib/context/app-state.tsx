'use client'

import {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
} from 'react'
import useBoolean from '../hooks/use-boolean'

interface AppStateContextValue {
  letterBank: string[]
  wordLength: number
  wordPattern: string[]
  threeLetterWordsAllowed: boolean
  updateLetterBank: (letters: string) => void
  updateWordLength: (length: number) => void
  updateWordPattern: (pattern: string) => void
  toggleThreeLetterWords: (enabled?: boolean) => void
  reset: () => void
}

export const AppStateContext = createContext<AppStateContextValue | undefined>(
  undefined
)

export function AppStateProvider(props: { children: React.ReactNode }) {
  const [letterBank, setLetterBank] = useState<string>('words')
  const [wordLength, setWordLength] = useState<number>(3)
  const [wordPattern, setWordPattern] = useState<string>('***')
  const [threeLetterWordsAllowed, threeLetterWords] = useBoolean()

  const updateWordLength = useCallback(
    (length: number) => {
      if (length !== wordLength) {
        setWordLength(length)
        setWordPattern(Array(length).fill('*').join(''))
      }
    },
    [wordLength]
  )

  const toggleThreeLetterWords = useCallback(
    (enabled?: boolean) => {
      switch (enabled) {
        case true:
          threeLetterWords.on()
          break
        case false:
          threeLetterWords.off()
          break
        default:
          threeLetterWords.toggle()
      }
    },
    [threeLetterWords]
  )

  const reset = useCallback(() => {
    setLetterBank('words')
    setWordLength(3)
    setWordPattern('***')
  }, [])

  const contextValue = useMemo<AppStateContextValue>(
    () => ({
      letterBank: letterBank.split(''),
      wordLength,
      wordPattern: wordPattern.split(''),
      threeLetterWordsAllowed,
      updateLetterBank: setLetterBank,
      updateWordLength,
      updateWordPattern: setWordPattern,
      toggleThreeLetterWords,
      reset,
    }),
    [
      letterBank,
      wordLength,
      wordPattern,
      threeLetterWordsAllowed,
      updateWordLength,
      toggleThreeLetterWords,
      reset,
    ]
  )

  return (
    <AppStateContext.Provider value={contextValue}>
      {props.children}
    </AppStateContext.Provider>
  )
}

export function useAppState() {
  const contextValue = useContext(AppStateContext)
  if (contextValue === undefined) {
    throw new Error('useAppState must be used within an AppStateProvider')
  }
  return contextValue
}
