import { cloneElement } from 'react'
import clsx from '../utils/clsx'

interface SelectProps
  extends Omit<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    'size' | 'disabled' | 'readOnly' | 'required'
  > {
  size?: 'lg' | 'md' | 'sm' | 'xs'
  color?: 'gray' | 'spiroDiscoBall' | 'seaGreen'
  isDisabled?: boolean
  isInvalid?: boolean
  isReadOnly?: boolean
  isRequired?: boolean
  hideIcon?: boolean
}

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

// const sizes = {
//   xs: {
//     ...inputTheme.sizes?.xs,
//     field: {
//       ...inputTheme.sizes?.xs.field,
//       ...iconSpacing,
//     },
//     icon: {
//       insetEnd: '1',
//     },
//   },
//   sm: {
//     ...inputTheme.sizes?.sm,
//     field: {
//       ...inputTheme.sizes?.sm.field,
//       ...iconSpacing,
//     },
//   },
//   md: {
//     ...inputTheme.sizes?.md,
//     field: {
//       ...inputTheme.sizes?.md.field,
//       ...iconSpacing,
//     },
//   },
//   lg: {
//     ...inputTheme.sizes?.lg,
//     field: {
//       ...inputTheme.sizes?.lg.field,
//       ...iconSpacing,
//     },
//   },
// }

export default function Select({
  children,
  className,
  placeholder,
  color = 'spiroDiscoBall',
  size = 'md',
  isDisabled = false,
  isInvalid = false,
  isReadOnly = false,
  isRequired = false,
  hideIcon = false,
  ...props
}: SelectProps) {
  return (
    <div className={clsx('w-full h-fit relative')}>
      <select
        className={clsx(
          'w-full min-w-0 outline-none relative appearance-none transition duration-200 disabled:opacity-40 disabled:cursor-not-allowed focus:z-[unset]',
          'border border-solid border-inherit bg-inherit hover:[&:not(:focus-visible)]:[&:not(:disabled)]:border-gray-300 dark:hover:[&:not(:focus-visible)]:[&:not(:disabled)]:border-whiteAlpha-400 read-only:shadow-none read-only:select-all focus-visible:z-[1]',
          'aria-invalid:border-red-500 aria-invalid:shadow-[0_0_0_1px_theme(colors.red.500)] dark:aria-invalid:border-red-300 dark:aria-invalid:shadow-[0_0_0_1px_theme(colors.red.300)]',
          { 'pe-8': !hideIcon },
          colors[color],
          sizes[size],
          className
        )}
        {...props}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {children}
      </select>

      {!hideIcon && (
        <SelectIcon
          data-disabled={isDisabled}
          className={clsx(
            'w-6 h-full text-currentColor text-xl disabled:opacity-50',
            { 'end-1': size === 'xs' }
          )}
        />
      )}

      {/* <SelectIcon
            data-disabled={dataAttr(ownProps.disabled)}
            {...((iconColor || color) && { color: iconColor || color })}
            __css={styles.icon}
            {...(iconSize && { fontSize: iconSize })}
          >
            {icon}
          </SelectIcon> */}
    </div>
  )
}

// const SelectIcon: React.FC<PropsOf<'svg'>> = (props) => (
//   <svg viewBox="0 0 24 24" {...props}>
//     <path
//       fill="currentColor"
//       d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"
//     />
//   </svg>
// )

function SelectIcon({
  className,
  ...props
}: React.SVGAttributes<HTMLOrSVGElement>) {
  return (
    <div
      className={clsx(
        'absolute inline-flex items-center justify-center pointer-events-none end-2 top-1/2 -translate-y-1/2',
        className
      )}
      {...props}
    >
      <svg
        role="presentation"
        focusable={false}
        aria-hidden="true"
        style={{
          width: '1em',
          height: '1em',
          color: 'currentColor',
        }}
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"
        />
      </svg>
    </div>
  )
}
