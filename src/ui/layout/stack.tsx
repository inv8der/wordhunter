import clsx from '../utils/clsx'

const spacings = {
  vertical: {
    0: '[&>*~*]:mt-0',
    0.5: '[&>*~*]:mt-0.5',
    1: '[&>*~*]:mt-1',
    1.5: '[&>*~*]:mt-1.5',
    2: '[&>*~*]:mt-2',
    2.5: '[&>*~*]:mt-2.5',
    3: '[&>*~*]:mt-3',
    3.5: '[&>*~*]:mt-3.5',
    4: '[&>*~*]:mt-4',
    5: '[&>*~*]:mt-5',
    6: '[&>*~*]:mt-6',
    7: '[&>*~*]:mt-7',
    8: '[&>*~*]:mt-8',
    9: '[&>*~*]:mt-9',
    10: '[&>*~*]:mt-10',
  },
  horizontal: {
    0: '[&>*~*]:ml-0',
    0.5: '[&>*~*]:ml-0.5',
    1: '[&>*~*]:ml-1',
    1.5: '[&>*~*]:ml-1.5',
    2: '[&>*~*]:ml-2',
    2.5: '[&>*~*]:ml-2.5',
    3: '[&>*~*]:ml-3',
    3.5: '[&>*~*]:ml-3.5',
    4: '[&>*~*]:ml-4',
    5: '[&>*~*]:ml-5',
    6: '[&>*~*]:ml-6',
    7: '[&>*~*]:ml-7',
    8: '[&>*~*]:ml-8',
    9: '[&>*~*]:ml-9',
    10: '[&>*~*]:ml-10',
  },
}

interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: 'horizontal' | 'vertical'
  spacing?: keyof typeof spacings.vertical
}

export default function Stack({
  children,
  className,
  direction = 'vertical',
  spacing = 1,
  ...props
}: StackProps) {
  return (
    <div
      className={clsx(
        'flex items-center',
        spacings[direction][spacing],
        {
          'flex-col': direction === 'vertical',
          'flex-row': direction === 'horizontal',
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
