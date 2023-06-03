import clsx from '../utils/clsx'
import { useDrawer } from './drawer'

interface DrawerBodyProps {}

export default function DrawerBody({
  children,
}: React.PropsWithChildren<DrawerBodyProps>) {
  const { descriptionProps } = useDrawer()

  return (
    <div
      className={clsx('px-6 py-2 flex-1 overflow-auto')}
      {...descriptionProps}
    >
      {children}
    </div>
  )
}
