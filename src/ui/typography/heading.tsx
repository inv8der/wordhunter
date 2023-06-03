import clsx from '../utils/clsx'

const sizes = {
  '4xl': 'text-6xl md:text-7xl',
  '3xl': 'text-5xl md:text-6xl',
  '2xl': 'text-4xl md:text-5xl',
  xl: 'text-3xl md:text-4xl',
  lg: 'text-2xl md:text-3xl',
  md: 'text-xl',
  sm: 'text-md',
  xs: 'text-sm',
}

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl'
}

export default function Heading({
  children,
  className,
  size = 'xl',
  ...props
}: React.PropsWithChildren<HeadingProps>) {
  return (
    <h2 className={clsx('font-bold', sizes[size], className)} {...props}>
      {children}
    </h2>
  )
}
