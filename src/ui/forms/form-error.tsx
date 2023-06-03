import clsx from '../utils/clsx'
import { useFormControl } from './form-control'

interface FormErrorMessageProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function FormErrorMessage({
  children,
  className,
  ...props
}: React.PropsWithChildren<FormErrorMessageProps>) {
  const { isInvalid } = useFormControl()

  if (!isInvalid) {
    return null
  }

  return (
    <div
      className={clsx(
        'text-red-500 dark:text-red-300 mt-2 text-sm leading-tight',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
