import clsx from 'clsx'

interface CenterProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function Center({ children, className, ...props }: CenterProps) {
  return (
    <div
      className={clsx('flex justify-center items-center', className)}
      {...props}
    >
      {children}
    </div>
  )
}
