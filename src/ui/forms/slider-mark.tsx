import clsx from '../utils/clsx'
import { useSlider } from './slider'

interface SliderMarkProps extends React.HTMLAttributes<HTMLSpanElement> {
  value: number
}

export default function SliderMark({
  children,
  className,
  value,
}: SliderMarkProps) {
  const { getMarkerProps } = useSlider()
  const markerProps = getMarkerProps({ value })

  return (
    <span className={clsx('top-full', className)} {...markerProps}>
      {children}
    </span>
  )
}
