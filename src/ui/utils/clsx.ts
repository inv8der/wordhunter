import _clsx from 'clsx'
import { twMerge } from 'tailwind-merge'

const clsx: typeof _clsx = (...args) => {
  return twMerge(_clsx(...args))
}

export default clsx
