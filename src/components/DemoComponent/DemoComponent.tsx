import { useState } from 'react'

type Props = {
  initialCount?: number
}

export function DemoComponent({ initialCount = 0 }: Props) {
  const [count, setCount] = useState(initialCount)

  return <button onClick={() => setCount((v) => v + 1)}>Click here to count: {count}</button>
}
