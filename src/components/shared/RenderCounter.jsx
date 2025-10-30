import { useRef, useEffect } from 'react'

export function RenderCounter({ testId }) {
  const renderCount = useRef(0)

  useEffect(() => {
    renderCount.current++
  })

  return (
    <div
      className="render-counter"
      data-testid={testId}
    >
      Renders: {renderCount.current}
    </div>
  )
}
