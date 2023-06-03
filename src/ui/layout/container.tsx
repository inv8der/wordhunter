import clsx from '../utils/clsx'

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  centerContent?: boolean
}

export default function Container({
  children,
  className,
  centerContent = false,
  ...props
}: ContainerProps) {
  return (
    <div
      className={clsx(
        'w-full mx-auto max-w-prose px-4',
        { 'flex flex-col items-center': centerContent },
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
