import { forwardRef } from 'react'
import clsx from '../utils/clsx'
import callAllHandlers from '../utils/call-all-handlers'
import { useSlider } from './slider'

const sizes = {
  sm: 'w-2.5 h-2.5',
  md: 'w-3.5 h-3.5',
  lg: 'w-4 h-4',
}

interface SliderThumbProps extends React.HTMLAttributes<HTMLDivElement> {}

const SliderThumb = forwardRef<HTMLDivElement, SliderThumbProps>(
  (props, ref) => {
    const { className, onBlur, onFocus, onKeyDown, ...rest } = props
    const { orientation, size, thumbProps, hiddenInputProps } = useSlider()

    delete thumbProps.style.transform

    return (
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <div
        className={clsx(
          'flex items-center justify-center absolute outline-none z-[1] rounded-full',
          'bg-white disabled:bg-gray-300 border border-solid border-transparent transition-transform duration-200',
          'shadow-[0_1px_3px_0_rgba(0_0_0_/_0.1),_0_1px_2px_0_rgba(0_0_0_/_0.06)] focus-visible:shadow-[0_0_0_3px_rgba(66_153_225_/_0.6)]',
          {
            '-translate-x-1/2 active:scale-[1.15]':
              orientation === 'horizontal',
            '-translate-y-1/2 active:scale-[1.15]': orientation === 'vertical',
          },
          sizes[size],
          className
        )}
        ref={ref}
        {...thumbProps}
        {...rest}
        onBlur={callAllHandlers(onBlur, thumbProps.onBlur)}
        onFocus={callAllHandlers(onFocus, thumbProps.onFocus)}
        onKeyDown={callAllHandlers(onKeyDown, thumbProps.onKeyDown)}
      >
        <input {...hiddenInputProps} />
      </div>
    )
  }
)

SliderThumb.displayName = 'SliderThumb'

export default SliderThumb
