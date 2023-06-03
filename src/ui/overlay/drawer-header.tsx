import clsx from '../utils/clsx'
import { useDrawer } from './drawer'

interface DrawerHeaderProps {}

// px: "6",
// py: "4",
// fontSize: "xl",
// fontWeight: "semibold",

export default function DrawerHeader({
  children,
}: React.PropsWithChildren<DrawerHeaderProps>) {
  const { titleProps } = useDrawer()

  return (
    <div
      className={clsx('flex-0 px-6 py-4 text-xl font-semibold')}
      {...titleProps}
    >
      {children}
    </div>
  )
}
