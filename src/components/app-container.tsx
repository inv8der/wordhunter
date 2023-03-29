'use client'

import { useState, useEffect } from 'react'

export default function AppContainer(props: { children: React.ReactNode }) {
  const [visibility, setVisibility] = useState<'visible' | 'hidden'>('hidden')

  useEffect(() => {
    setVisibility('visible')
  }, [])

  return <div style={{ visibility }}>{props.children}</div>
}
