import clsx from '../utils/clsx'
import { useDrawer } from './drawer'

interface DrawerOverlayProps {}

export default function DrawerOverlay(props: DrawerOverlayProps) {
  const { backdropProps } = useDrawer()

  return (
    <div
      className={clsx(
        'fixed left-0 top-0 w-screen h-screen bg-blackAlpha-600 z-[1400]'
      )}
      {...backdropProps}
    />
  )
}
