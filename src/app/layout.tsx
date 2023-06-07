import './globals.css'

import { AppStateProvider } from '@/lib/context/app-state'
import LetterBank from '@/components/letter-bank'
import AppBar from '@/components/app-bar'
import Main from '@/components/main'

export const metadata = {
  title: 'Wordhunter',
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppStateProvider>
          <AppBar />
          <Main>{props.children}</Main>
          <LetterBank />
        </AppStateProvider>
      </body>
    </html>
  )
}
