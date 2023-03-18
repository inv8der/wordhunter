'use client'

import { useRouter, usePathname } from 'next/navigation'
import NextLink from 'next/link'
import {
  Flex,
  Spacer,
  Box,
  IconButton,
  useColorModeValue,
} from '@chakra-ui/react'
import { RiArrowLeftLine, RiRestartLine } from 'react-icons/ri'
import Logo from './logo'

export default function AppBar() {
  const router = useRouter()
  const pathname = usePathname()
  const isIndexPage = pathname === '/'

  const bgColor = useColorModeValue('white', 'gray.800')

  return (
    <Flex
      as="header"
      className="app-bar"
      justify="center"
      position="fixed"
      top={0}
      zIndex={1000}
      bgColor={bgColor}
      w="100%"
      p={2}
    >
      <Flex flex={1} justifyContent="flex-start">
        {!isIndexPage && (
          <IconButton
            onClick={router.back}
            aria-label="back"
            icon={<RiArrowLeftLine fontSize={18} />}
            variant="ghost"
            size="sm"
          />
        )}
      </Flex>
      <Spacer />
      <Box flex={0}>
        <Logo />
      </Box>
      <Spacer />
      <Flex flex={1} justifyContent="flex-end">
        {!isIndexPage && (
          <IconButton
            as={NextLink}
            href="/"
            aria-label="restart"
            icon={<RiRestartLine fontSize={18} />}
            variant="ghost"
            size="sm"
          />
        )}
      </Flex>
    </Flex>
  )
}
