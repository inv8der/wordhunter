import { forwardRef } from 'react'
import clsx from '../utils/clsx'
import Button, { type ButtonProps } from './button'

export interface IconButtonProps extends ButtonProps {
  icon?: React.ReactElement
  isRound?: boolean
  'aria-label': string
}

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (props, ref) => {
    const { children, icon, isRound, ...rest } = props
    const iconElement = icon ?? children

    return (
      <Button
        className={clsx('p-0', { 'rounded-full': isRound })}
        ref={ref}
        {...rest}
      >
        {iconElement}
      </Button>
    )
  }
)

IconButton.displayName = 'IconButton'

export default IconButton
