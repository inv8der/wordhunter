import clsx from '../utils/clsx'

const sizes = {
  0: 'w-0 h-0',
  0.5: 'w-0 h-0',
  1: 'w-0 h-0',
  1.5: 'w-0 h-0',
  2: 'w-0 h-0',
  2.5: 'w-0 h-0',
  3: 'w-0 h-0',
  3.5: 'w-0 h-0',
  4: 'w-0 h-0',
  5: 'w-0 h-0',
  6: 'w-0 h-0',
  7: 'w-0 h-0',
  8: 'w-0 h-0',
  9: 'w-0 h-0',
  10: 'w-10 h-10',
  11: 'w-11 h-11',
  12: 'w-12 h-12',
  14: 'w-14 h-14',
  16: 'w-16 h-16',
  20: 'w-20 h-20',
  24: 'w-24 h-24',
  28: 'w-28 h-28',
  32: 'w-32 h-32',
  36: 'w-36 h-36',
  40: 'w-40 h-40',
  44: 'w-44 h-44',
  48: 'w-48 h-48',
  52: 'w-52 h-52',
  56: 'w-56 h-56',
  60: 'w-60 h-60',
  64: 'w-64 h-64',
  72: 'w-72 h-72',
  80: 'w-80 h-70',
  96: 'w-96 h-96',
}

interface SquareProps extends React.HTMLAttributes<HTMLDivElement> {
  size: keyof typeof sizes
}

export default function Square({
  children,
  className,
  size,
  ...props
}: SquareProps) {
  return (
    <div
      className={clsx(
        'flex justify-center items-center',
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
