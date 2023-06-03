'use client'

import { useRouter, usePathname } from 'next/navigation'
import NextLink from 'next/link'
import { RiArrowLeftLine, RiRestartLine } from 'react-icons/ri'
import Spacer from '@/ui/layout/spacer'
import IconButton from '@/ui/forms/icon-button'
import Logo from './logo'

export default function AppBar() {
  const router = useRouter()
  const pathname = usePathname()
  const isIndexPage = pathname === '/'

  return (
    <header className="flex justify-center fixed top-0 z-[1000] w-full p-2 bg-white dark:bg-gray-800">
      <div className="flex-1 flex justify-start">
        {!isIndexPage && (
          <IconButton
            onClick={router.back}
            aria-label="back"
            icon={<RiArrowLeftLine fontSize={18} />}
            variant="ghost"
            size="sm"
          />
        )}
      </div>
      <Spacer />
      <div className="flex-0">
        <Logo />
      </div>
      <Spacer />
      <div className="flex-1 flex justify-end">
        {!isIndexPage && (
          <NextLink href="/" passHref legacyBehavior>
            <IconButton
              aria-label="restart"
              icon={<RiRestartLine fontSize={18} />}
              variant="ghost"
              size="sm"
            />
          </NextLink>
        )}
      </div>
    </header>
  )
}
