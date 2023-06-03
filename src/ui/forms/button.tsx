import { forwardRef } from 'react'
import clsx from '../utils/clsx'
import useButtonTheme from '../utils/use-button-theme'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: 'gray' | 'spiroDiscoBall' | 'seaGreen'
  size?: 'lg' | 'md' | 'sm' | 'xs'
  variant?: 'ghost' | 'outline' | 'solid' | 'link'
  isActive?: boolean
  isDisabled?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    children,
    className,
    color = 'gray',
    size = 'md',
    type = 'button',
    variant = 'solid',
    isActive = false,
    isDisabled = false,
    ...rest
  } = props

  const buttonTheme = useButtonTheme({
    color,
    size,
    variant,
    isActive,
    isDisabled,
  })
  return (
    <button
      className={clsx(buttonTheme, className)}
      type={type}
      disabled={isDisabled}
      ref={ref}
      {...rest}
    >
      {children}
    </button>
  )
})

Button.displayName = 'Button'

export default Button
