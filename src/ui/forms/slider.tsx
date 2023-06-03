import { createContext, useContext, useId, useMemo, useRef } from 'react'
import { machine, connect } from '@zag-js/slider'
import { useMachine, normalizeProps } from '@zag-js/react'
import clsx from '../utils/clsx'

interface SliderContextValue extends ReturnType<typeof connect> {
  orientation: 'horizontal' | 'vertical'
  size: 'sm' | 'md' | 'lg'
}

const SliderContext = createContext<SliderContextValue>({
  orientation: 'horizontal',
  size: 'md',
  isFocused: false,
  isDragging: false,
  value: 0,
  percent: 0,
  setValue: () => undefined,
  getPercentValue: () => 0,
  getValuePercent: () => 0,
  focus: () => undefined,
  increment: () => undefined,
  decrement: () => undefined,
  rootProps: {},
  labelProps: {},
  thumbProps: {},
  hiddenInputProps: {},
  outputProps: {},
  trackProps: {},
  rangeProps: {},
  controlProps: {},
  markerGroupProps: {},
  getMarkerProps: () => ({}),
})

const sizes = {
  horizontal: {
    sm: 'py-[calc((theme(spacing.2.5)_-_theme(spacing.0.5))_/_2))_/_2)]',
    md: 'py-[calc((theme(spacing.3.5)_-_theme(spacing.1))_/_2))_/_2)]',
    lg: 'py-[calc((theme(spacing.4)_-_theme(spacing.1))_/_2)]',
  },
  vertical: {
    sm: 'px-[calc((theme(spacing.2.5)_-_theme(spacing.0.5))_/_2)]',
    md: 'px-[calc((theme(spacing.3.5)_-_theme(spacing.1))_/_2)]',
    lg: 'px-[calc((theme(spacing.4)_-_theme(spacing.1))_/_2)]',
  },
}

// @todo: Add support for colorScheme/color
interface SliderProps {
  orientation?: 'horizontal' | 'vertical'
  size?: 'sm' | 'md' | 'lg'
  defaultValue?: number
  min?: number
  max?: number
  onChange?: (value: number) => void
  onChangeStart?: (value: number) => void
  onChangeEnd?: (value: number) => void
}

export default function Slider({
  children,
  orientation = 'horizontal',
  size = 'md',
  defaultValue,
  min,
  max,
  onChange,
  onChangeStart,
  onChangeEnd,
}: React.PropsWithChildren<SliderProps>) {
  const sliderId = useId()

  const onChangeRef = useRef(onChange)
  const onChangeStartRef = useRef(onChangeStart)
  const onChangeEndRef = useRef(onChangeEnd)
  onChangeRef.current = onChange
  onChangeStartRef.current = onChangeStart
  onChangeEndRef.current = onChangeEnd

  const [state, send] = useMachine(
    machine({
      id: sliderId,
      min,
      max,
      value: defaultValue,
      onChange({ value }) {
        onChangeRef.current?.(value)
      },
      onChangeStart({ value }) {
        onChangeStartRef.current?.(value)
      },
      onChangeEnd({ value }) {
        onChangeEndRef.current?.(value)
      },
    })
  )
  const slider = connect(state, send, normalizeProps)

  const contextValue = useMemo<SliderContextValue>(
    () => ({
      ...slider,
      orientation,
      size,
    }),
    [slider, orientation, size]
  )

  return (
    <SliderContext.Provider value={contextValue}>
      <div {...slider.rootProps}>
        <div
          className={clsx(
            'flex items-center relative cursor-pointer disabled:opacity-60 disabled:cursor-default disabled:pointer-events-none',
            {
              'h-full': orientation === 'vertical',
              'w-full': orientation === 'horizontal',
            },
            sizes[orientation][size]
          )}
          {...slider.controlProps}
        >
          {children}
        </div>
      </div>
    </SliderContext.Provider>
  )
}

export function useSlider(): SliderContextValue {
  return useContext(SliderContext)
}
