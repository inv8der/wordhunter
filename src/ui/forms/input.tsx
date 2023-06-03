import { useRef, forwardRef } from 'react'
import clsx from '../utils/clsx'
import { useFormControl } from './form-control'

const sizes = {
  xs: 'text-xs px-2 h-6 rounded-sm',
  sm: 'text-sm px-3 h-8 rounded-sm',
  md: 'text-md px-4 h-10 rounded-md',
  lg: 'text-lg px-4 h-12 rounded-md',
}

const colors = {
  gray: 'focus-visible:border-gray-500 focus-visible:shadow-[0_0_0_1px_theme(colors.gray.500)] dark:focus-visible:border-gray-300 dark:focus-visible:shadow-[0_0_0_1px_theme(colors.gray.300)]',
  spiroDiscoBall:
    'focus-visible:border-spiroDiscoBall-500 focus-visible:shadow-[0_0_0_1px_theme(colors.spiroDiscoBall.500)] dark:focus-visible:border-spiroDiscoBall-300 dark:focus-visible:shadow-[0_0_0_1px_theme(colors.spiroDiscoBall.300)]',
  seaGreen:
    'focus-visible:border-seaGreen-500 focus-visible:shadow-[0_0_0_1px_theme(colors.seaGreen.500)] dark:focus-visible:border-seaGreen-300 dark:focus-visible:shadow-[0_0_0_1px_theme(colors.seaGreen.300)]',
}

// const _colors = {
//   outline: {
//     gray: 'border border-solid border-inherit bg-inherit hover:border-gray-300 dark:hover-whiteAlpha-400 read-only:shadow-none read-only:select-all',
//   },
//   filled: {
//     gray: 'border-2 border-solid border-transparent bg-gray-100 dark:bg-whiteAlpha-50 hover:bg-gray-200 dark:hover:bg-whiteAlpha-100 read-only:shadow-none read-only:select-all',
//   },
//   flushed: {
//     gray: 'border-b border-solid border-inherit rounded-none px-0 bg-transparent read-only:shadow-none read-only:select-all',
//   },
// }

export interface InputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'size' | 'disabled' | 'readOnly' | 'required'
  > {
  size?: 'lg' | 'md' | 'sm' | 'xs'
  color?: 'gray' | 'spiroDiscoBall' | 'seaGreen'
  isDisabled?: boolean
  isInvalid?: boolean
  isReadOnly?: boolean
  isRequired?: boolean
  htmlSize?: React.InputHTMLAttributes<HTMLInputElement>['size']
}

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    className,
    type = 'text',
    size = 'md',
    color = 'spiroDiscoBall',
    isDisabled,
    isInvalid,
    isReadOnly,
    isRequired,
    htmlSize,
    ...rest
  } = props

  const control = useFormControl()

  return (
    <input
      className={clsx(
        'w-full min-w-0 outline-none relative appearance-none transition duration-200 disabled:opacity-40 disabled:cursor-not-allowed',
        'border border-solid border-inherit bg-inherit hover:[&:not(:focus-visible)]:[&:not(:disabled)]:border-gray-300 dark:hover:[&:not(:focus-visible)]:[&:not(:disabled)]:border-whiteAlpha-400 read-only:shadow-none read-only:select-all focus-visible:z-[1]',
        'aria-invalid:border-red-500 aria-invalid:shadow-[0_0_0_1px_theme(colors.red.500)] dark:aria-invalid:border-red-300 dark:aria-invalid:shadow-[0_0_0_1px_theme(colors.red.300)]',
        colors[color],
        sizes[size]
      )}
      type={type}
      disabled={isDisabled ?? control.isDisabled}
      readOnly={isReadOnly ?? control.isReadOnly}
      required={isRequired ?? control.isRequired}
      aria-required={isRequired ?? control.isRequired}
      aria-invalid={isInvalid ?? control.isInvalid}
      size={htmlSize}
      ref={ref}
      {...rest}
    />
  )
})

Input.displayName = 'Input'

export default Input
