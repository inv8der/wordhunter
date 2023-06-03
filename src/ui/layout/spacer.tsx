import clsx from '../utils/clsx'

interface SpacerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {}

export default function Spacer({ className, ...props }: SpacerProps) {
  return (
    <div
      className={clsx('flex-1 self-stretch justify-self-stretch', className)}
      {...props}
    />
  )
}
