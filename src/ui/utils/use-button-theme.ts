import { useMemo } from 'react'
import clsx from './clsx'

const sizes = {
  lg: 'h-12 min-w-[theme(spacing.12)] text-lg px-6',
  md: 'h-10 min-w-[theme(spacing.10)] text-md px-4',
  sm: 'h-8 min-w-[theme(spacing.8)] text-sm px-3',
  xs: 'h-6 min-w-[theme(spacing.6)] text-xs px-2',
}

type ThemingProps = {
  color: 'gray' | 'spiroDiscoBall' | 'seaGreen'
  size: 'lg' | 'md' | 'sm' | 'xs'
  variant: 'ghost' | 'outline' | 'solid' | 'link'
  isActive: boolean
  isDisabled: boolean
}

export default function useButtonTheme({
  color,
  size,
  variant,
  isActive,
  isDisabled,
}: ThemingProps) {
  const isInteractive = !isDisabled && !isActive

  const variantGhost = useMemo(() => {
    const colors = {
      gray: clsx(
        'text-inherit dark:text-whiteAlpha-900',
        isInteractive &&
          'hover:bg-gray-100 dark:hover:bg-whiteAlpha-200 active:bg-gray-200 dark:active:bg-whiteAlpha-300',
        isActive && 'bg-gray-200 dark:bg-whiteAlpha-300'
      ),
      spiroDiscoBall: clsx(
        'text-spiroDiscoBall-600 dark:text-spiroDiscoBall-200',
        isInteractive &&
          'hover:bg-spiroDiscoBall-50 dark:hover:bg-spiroDiscoBall-200/[.12] active:bg-spiroDiscoBall-100 dark:active:bg-spiroDiscoBall-200/[.24]',
        isActive && 'bg-spiroDiscoBall-100 dark:bg-spiroDiscoBall-200/[.24]'
      ),
      seaGreen: clsx(
        'text-seaGreen-600 dark:text-seaGreen-200',
        isInteractive &&
          'hover:bg-seaGreen-50 dark:hover:bg-seaGreen-200/[.12] active:bg-seaGreen-100 dark:active:bg-seaGreen-200/[.24]',
        isActive && 'bg-seaGreen-100 dark:bg-seaGreen-200/[.24]'
      ),
    }
    return clsx('bg-transparent', colors[color])
  }, [color, isActive, isInteractive])

  const variantOutline = useMemo(() => {
    const colors = {
      gray: 'border-gray-200 dark:border-whiteAlpha-300 text-inherit dark:text-whiteAlpha-900',
      spiroDiscoBall:
        'border-current text-spiroDiscoBall-600 dark:text-spiroDiscoBall-200',
      seaGreen: 'border-current text-seaGreen-600 dark:text-seaGreen-200',
    }
    return clsx('border border-solid', colors[color], variantGhost)
  }, [color, variantGhost])

  const variantSolid = useMemo(() => {
    const colors = {
      gray: clsx(
        'bg-gray-100 dark:bg-whiteAlpha-200',
        isInteractive &&
          'hover:bg-gray-200 dark:hover:bg-whiteAlpha-300 active:bg-gray-300 dark:active:bg-whiteAlpha-400',
        isActive && 'bg-gray-300 bg-whiteAlpha-400'
      ),
      spiroDiscoBall: clsx(
        'text-white dark:text-gray-800 bg-spiroDiscoBall-500 dark:bg-spiroDiscoBall-200',
        isInteractive &&
          'hover:bg-spiroDiscoBall-600 dark:hover:bg-spiroDiscoBall-300 active:bg-spiroDiscoBall-700 dark:active:bg-spiroDiscoBall-400',
        isActive && 'bg-spiroDiscoBall-700 dark:bg-spiroDiscoBall-400'
      ),
      seaGreen: clsx(
        'text-white dark:text-gray-800 bg-seaGreen-500 dark:bg-seaGreen-200',
        isInteractive &&
          'hover:bg-seaGreen-600 dark:hover:bg-seaGreen-300 active:bg-seaGreen-700 dark:active:bg-seaGreen-400',
        isActive && 'bg-seaGreen-700 dark:bg-seaGreen-400'
      ),
    }
    return colors[color]
  }, [color, isActive, isInteractive])

  const variantLink = useMemo(() => {
    const colors = {
      gray: clsx(
        'text-gray-500 dark:text-gray-200',
        isInteractive && 'active:text-gray-700 dark:active:text-gray-500',
        isActive && 'text-gray-700 dark:text-gray-500'
      ),
      spiroDiscoBall: clsx(
        'text-spiroDiscoBall-500 dark:text-spiroDiscoBall-200',
        isInteractive &&
          'active:text-spiroDiscoBall-700 dark:active:text-spiroDiscoBall-500',
        isActive && 'text-spiroDiscoBall-700 dark:text-spiroDiscoBall-500'
      ),
      seaGreen: clsx(
        'text-seaGreen-500 dark:text-seaGreen-200',
        isInteractive &&
          'active:text-seaGreen-700 dark:active:text-seaGreen-500',
        isActive && 'text-seaGreen-700 dark:text-seaGreen-500'
      ),
    }
    return clsx(
      'px-0 h-auto leading-[normal] align-baseline',
      isInteractive ? 'hover:no-underline' : 'hover:underline',
      colors[color]
    )
  }, [color, isActive, isInteractive])

  return clsx(
    'inline-flex appearance-none items-center justify-center select-none relative whitespace-nowrap align-middle outline-none leading-tight rounded-md font-semibold transition duration-200',
    sizes[size],
    isDisabled
      ? 'opacity-40 cursor-not-allowed shadow-none'
      : 'focus:outline-none focus-visible:ring',
    {
      [variantGhost]: variant === 'ghost',
      [variantOutline]: variant === 'outline',
      [variantSolid]: variant === 'solid',
      [variantLink]: variant === 'link',
    }
  )
}
