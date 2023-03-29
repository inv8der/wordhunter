'use client'

import { useState, useEffect } from 'react'

export default function AppContainer(props: { children: React.ReactNode }) {
  const [shouldRender, setShouldRender] = useState(false)

  useEffect(() => {
    setShouldRender(true)
  }, [])

  return shouldRender ? <>{props.children}</> : null
}
