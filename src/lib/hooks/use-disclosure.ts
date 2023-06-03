import { useState, useCallback } from 'react'

export default function useDisclosure(initialState?: boolean) {
  const [isOpen, setOpen] = useState(initialState ?? false)

  const onOpen = useCallback(() => {
    setOpen(true)
  }, [])

  const onClose = useCallback(() => {
    setOpen(false)
  }, [])

  const onToggle = useCallback(() => {
    setOpen((nextState) => !nextState)
  }, [])

  return { isOpen, onOpen, onClose, onToggle }
}
