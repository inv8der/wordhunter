import clsx from '../utils/clsx'
import { useSlider } from './slider'

interface SliderFilledTrackProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function SliderFilledTrack({
  className,
}: SliderFilledTrackProps) {
  const { orientation, rangeProps } = useSlider()

  return (
    <div
      className={clsx(
        'bg-spiroDiscoBall-500 dark:bg-spiroDiscoBall-200',
        {
          'h-[inherit]': orientation === 'horizontal',
          'w-[inherit]': orientation === 'vertical',
        },
        className
      )}
      {...rangeProps}
    />
  )
}
