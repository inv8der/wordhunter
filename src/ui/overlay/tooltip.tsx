'use client'

import { useId, useState, useRef, Children, cloneElement } from 'react'
import {
  useFloating,
  useHover,
  useFocus,
  useDismiss,
  useRole,
  useInteractions,
  useTransitionStyles,
  useMergeRefs,
  autoUpdate,
  offset,
  flip,
  shift,
  arrow,
  FloatingPortal,
  FloatingArrow,
} from '@floating-ui/react'
import clsx from '../utils/clsx'

const colors = {
  gray: 'bg-gray-700 dark:bg-gray-300 text-whiteAlpha-900 dark:text-gray-900',
  spiroDiscoBall:
    'bg-spiroDiscoBall-500 dark:bg-spiroDiscoBall-200 text-white dark:text-gray-800 ',
  seaGreen:
    'bg-seaGreen-500 text-whiteAlpha-900 dark:bg-seaGreen-200 dark:text-gray-900 ',
}

const arrowColors = {
  gray: 'fill-gray-700 dark:fill-gray-300',
  spiroDiscoBall: 'fill-spiroDiscoBall-500 dark:fill-spiroDiscoBall-200',
  seaGreen: 'fill-seaGreen-500 dark:fill-seaGreen-200',
}

interface TooltipProps {
  className?: string
  color?: 'gray' | 'spiroDiscoBall' | 'seaGreen'
  label?: React.ReactNode
  placement?:
    | 'top'
    | 'top-start'
    | 'top-end'
    | 'right'
    | 'right-start'
    | 'right-end'
    | 'bottom'
    | 'bottom-start'
    | 'bottom-end'
    | 'left'
    | 'left-start'
    | 'left-end'
  hasArrow?: boolean
  openDelay?: number
  closeDelay?: number
  isOpen?: boolean
  onOpen?: () => void
  onClose?: () => void
}

export default function Tooltip({
  children,
  className,
  color = 'spiroDiscoBall',
  label = '',
  placement = 'top',
  hasArrow = false,
  openDelay = 0,
  closeDelay = 0,
  isOpen,
  onOpen,
  onClose,
}: React.PropsWithChildren<TooltipProps>) {
  const isControlled = isOpen !== undefined
  const arrowRef = useRef<SVGSVGElement>(null)

  const [uncontrolledIsOpen, setUncontrolledIsOpen] = useState(false)

  const { context, refs, floatingStyles } = useFloating({
    placement,
    open: isControlled ? isOpen : uncontrolledIsOpen,
    onOpenChange: isControlled
      ? (open) => (open ? onOpen?.() : onClose?.())
      : setUncontrolledIsOpen,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(12),
      flip({
        fallbackAxisSideDirection: 'start',
        padding: 5,
      }),
      shift({ padding: 5 }),
      arrow({ element: arrowRef }),
    ],
  })

  const { isMounted, styles: transitionStyles } = useTransitionStyles(context)

  const hover = useHover(context, {
    move: false,
    delay: {
      open: openDelay,
      close: closeDelay,
    },
    enabled: !isControlled,
  })
  const focus = useFocus(context, { enabled: !isControlled })
  const dismiss = useDismiss(context)
  const role = useRole(context, { role: 'tooltip' })

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    dismiss,
    role,
  ])

  const child = Children.only(children) as React.ReactElement & {
    ref?: React.Ref<any>
  }

  const trigger = cloneElement(
    child,
    getReferenceProps({
      ref: useMergeRefs(
        [child.ref, refs.setReference].filter(
          (ref): ref is React.Ref<any> => ref !== undefined
        )
      ),
      // 'aria-describedby': 'label-id',
      ...child.props,
    })
  )

  return (
    <>
      {trigger}
      {isMounted && (
        <FloatingPortal>
          <div
            ref={refs.setFloating}
            style={{ ...floatingStyles, ...transitionStyles }}
            className={clsx(
              'px-2 py-0.5 rounded-sm font-medium text-sm shadow-md max-w-xs z-[1800]',
              colors[color],
              className
            )}
            {...getFloatingProps()}
          >
            {hasArrow && (
              <FloatingArrow
                ref={arrowRef}
                context={context}
                className={clsx(arrowColors[color])}
              />
            )}
            <div>{label}</div>
          </div>
        </FloatingPortal>
      )}
    </>
  )
}
