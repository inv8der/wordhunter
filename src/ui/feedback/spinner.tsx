import clsx from '../utils/clsx'

interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: 'gray' | 'spiroDiscoBall' | 'seaGreen'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  thickness?: string
  speed?: string
  label?: string
}

const colors = {
  gray: 'border-t-gray-500 border-r-gray-500 dark:border-t-gray-200 dark:border-r-gray-200',
  spiroDiscoBall:
    'border-t-spiroDiscoBall-500 border-r-spiroDiscoBall-500 dark:border-t-spiroDiscoBall-200 dark:border-r-spiroDiscoBall-200',
  seaGreen:
    'border-t-seaGreen-500 border-r-seaGreen-500 dark:border-t-seaGreen-200 dark:border-r-seaGreen-200',
}

const sizes = {
  xs: 'w-3 h-3',
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
  xl: 'w-12 h-12',
}

export default function Spinner({
  className,
  style,
  color = 'gray',
  size = 'md',
  thickness = '3px',
  speed = '0.45s',
  label = 'Loading...',
  ...props
}: SpinnerProps) {
  const cssVars = {
    '--spinner-thickness': thickness,
    '--spinner-speed': speed,
  } as React.CSSProperties

  return (
    <div
      className={clsx(
        'inline-block border-[length:--spinner-thickness] border-solid rounded-full animate-spin [animation-duration:--spinner-speed] border-b-gray-200 border-l-gray-200 dark:border-b-whiteAlpha-300 dark:border-l-whiteAlpha-300',
        colors[color],
        sizes[size],
        className
      )}
      style={{ ...cssVars, ...style }}
      {...props}
    >
      {label && <span className="sr-only">{label}</span>}
    </div>
  )
}
