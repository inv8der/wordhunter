import clsx from '../utils/clsx'
import { useDrawer } from './drawer'

interface DrawerContentProps {}

const transitionStyles = {
  top: {
    initial: '',
    open: '',
    close: '',
  },
  right: {
    initial: '',
    open: '',
    close: '',
  },
  bottom: {
    initial:
      'fixed bottom-0 left-0 right-0 transition-transform translate-y-full',
    open: 'translate-y-0',
    close: 'translate-y-full',
  },
  left: {
    initial: '',
    open: '',
    close: '',
  },
}

export default function DrawerContent({
  children,
}: React.PropsWithChildren<DrawerContentProps>) {
  const { placement, transitionStatus, containerProps, contentProps } =
    useDrawer()

  //   (isFullHeight && { height: "100vh" }

  //   const transitionStyles = {
  //     position: 'fixed',
  //     bottom: 0,
  //     left: 0,
  //     right: 0,
  //   }

  delete containerProps.hidden
  delete contentProps.hidden

  return (
    <div
      className={clsx(
        'fixed left-0 top-0 w-screen h-screen flex z-[1400] justify-center'
      )}
      {...containerProps}
    >
      <div
        className={clsx(
          'flex flex-col relative w-full outline-none rouned-md z-[1400] max-h-screen text-inherit',
          'bg-white shadow-lg dark:bg-gray-700',
          transitionStyles[placement].initial,
          transitionStatus === 'open' && transitionStyles[placement].open,
          transitionStatus === 'close' && transitionStyles[placement].close
        )}
        {...contentProps}
      >
        {children}
      </div>
    </div>
  )
}
