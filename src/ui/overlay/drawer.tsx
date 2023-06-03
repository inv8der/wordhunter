import { useId, useMemo, useContext, createContext } from 'react'
import { machine, connect } from '@zag-js/dialog'
import { useMachine, normalizeProps, Portal } from '@zag-js/react'
import {
  useFloating,
  useTransitionStatus,
  useMergeRefs,
} from '@floating-ui/react'

interface DrawerContextValue extends ReturnType<typeof connect> {
  placement: 'top' | 'right' | 'bottom' | 'left'
  transitionStatus: 'unmounted' | 'initial' | 'open' | 'close'
}

const DrawerContext = createContext<DrawerContextValue>({
  placement: 'right',
  transitionStatus: 'unmounted',
  isOpen: false,
  open: () => undefined,
  close: () => undefined,
  triggerProps: {},
  backdropProps: {},
  containerProps: {},
  contentProps: {},
  titleProps: {},
  descriptionProps: {},
  closeTriggerProps: {},
})

interface DrawerProps {
  isOpen?: boolean
  onClose?: () => void
  onOpen?: () => void
  placement: 'top' | 'right' | 'bottom' | 'left'
}

export default function Drawer({
  children,
  placement = 'right',
  isOpen,
  onOpen,
  onClose,
}: React.PropsWithChildren<DrawerProps>) {
  const drawerId = useId()

  const { refs, context: floatingContext } = useFloating({
    open: isOpen,
    placement,
  })
  const { isMounted, status: transitionStatus } =
    useTransitionStatus(floatingContext)

  const [state, send] = useMachine(machine({ id: drawerId }), {
    context: {
      open: isOpen,
      onClose() {
        if (!isOpen) {
          drawer.open()
        } else {
          onClose?.()
        }
      },
      onOpen() {
        if (isOpen) {
          drawer.close()
        } else {
          onOpen?.()
        }
      },
    },
  })

  const drawer = connect(state, send, normalizeProps)

  const contextValue = useMemo<DrawerContextValue>(
    () => ({
      ...drawer,
      containerProps: {
        ...drawer.containerProps,
        ref: refs.setFloating,
      },
      placement,
      transitionStatus,
    }),
    [drawer, refs, placement, transitionStatus]
  )

  return (
    <DrawerContext.Provider value={contextValue}>
      {isMounted && <Portal>{children}</Portal>}
    </DrawerContext.Provider>
  )
}

export function useDrawer() {
  return useContext(DrawerContext)
}
