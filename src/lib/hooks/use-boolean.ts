import { useState, useCallback } from 'react'

type InitialState = boolean | (() => boolean)

type HookResult = [
  boolean,
  {
    toggle: () => void
    on: () => void
    off: () => void
  }
]

export default function useBoolean(initialState?: InitialState): HookResult {
  const [flag, setFlag] = useState(initialState ?? false)

  const toggle = useCallback(() => {
    setFlag((nextState) => !nextState)
  }, [])

  const on = useCallback(() => {
    setFlag(true)
  }, [])

  const off = useCallback(() => {
    setFlag(false)
  }, [])

  return [flag, { toggle, on, off }]
}
