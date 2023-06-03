import clsx from '../utils/clsx'
import { useDrawer } from './drawer'

interface DrawerFooterProps {}

export default function DrawerFooter({
  children,
}: React.PropsWithChildren<DrawerFooterProps>) {
  const {} = useDrawer()

  return (
    <div className={clsx('px-6 py-4 flex items-center justify-end')}>
      {children}
    </div>
  )
}
