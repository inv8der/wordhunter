import NextLink from 'next/link'
import clsx from '../utils/clsx'

interface LinkProps extends React.ComponentProps<typeof NextLink> {
  isExternal?: boolean
}

export default function Link({
  children,
  className,
  isExternal = false,
  onClick,
  ...props
}: LinkProps) {
  return (
    <NextLink
      className={clsx(
        'transition duration-150 ease-out cursor-pointer no-underline outline-none text-inherit hover:underline focus-visible:ring',
        className
      )}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener' : undefined}
      {...props}
    >
      {children}
    </NextLink>
  )
}
