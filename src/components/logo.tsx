import { Bungee } from 'next/font/google'
import Heading from '@/ui/typography/heading'

const bungee = Bungee({ weight: '400', subsets: ['latin'] })

export default function Logo() {
  return <Heading style={{ ...bungee.style }}>Wordhunter</Heading>
}
