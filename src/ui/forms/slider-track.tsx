import clsx from '../utils/clsx'
import { useSlider } from './slider'

const sizes = {
  horizontal: {
    sm: 'h-0.5 w-full',
    md: 'h-1 w-full',
    lg: 'h-1 w-full',
  },
  vertical: {
    sm: 'w-0.5 h-full',
    md: 'w-1 h-full',
    lg: 'w-1 h-full',
  },
}

interface SliderProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function SliderTrack({ children, className }: SliderProps) {
  const { orientation, size, trackProps } = useSlider()

  return (
    <div
      className={clsx(
        'overflow-hidden rounded-sm bg-gray-200 dark:bg-whiteAlpha-200 disabled:bg-gray-300 dark:disabled:bg-whiteAlpha-300',
        sizes[orientation][size],
        className
      )}
      {...trackProps}
    >
      {children}
    </div>
  )
}
