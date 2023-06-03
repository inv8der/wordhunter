import { useMemo } from 'react'

interface Props {
  items: string[]
}

export default function SolutionList({ items }: Props) {
  const [cols, rows] = useMemo(() => {
    const numSolutions = items.length
    const maxR = items.length < 40 ? 10 : 15
    let c = 1
    let r = 1

    for (c = 1; c <= 5; c += 1) {
      r = Math.ceil(numSolutions / c)
      if (r <= maxR) {
        break
      }
    }

    return [c, r]
  }, [items.length])

  const cssVars = {
    '--solution-list-rows': rows,
    '--solution-list-cols': cols,
  } as React.CSSProperties

  return (
    <div
      className="flex flex-col flex-wrap mx-auto text-left max-h-[calc(var(--solution-list-rows)_*_1.5rem)] max-w-[calc(var(--solution-list-cols)_*_7ch)]"
      style={cssVars}
    >
      {items.map((word) => (
        <div key={word} className="w-[7ch]">
          {word}
        </div>
      ))}
    </div>
  )
}
