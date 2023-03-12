'use client'

import { Bungee } from 'next/font/google'
import { Heading } from '@chakra-ui/react'

const bungee = Bungee({ weight: '400', subsets: ['latin'] })

export default function Logo() {
  return <Heading className={bungee.className}>Wordhunter</Heading>
}
