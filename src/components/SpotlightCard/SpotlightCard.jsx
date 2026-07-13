import { useRef } from 'react'

import './SpotlightCard.css'

export default function SpotlightCard({
  children,
  className = '',
  spotlightColor = 'rgba(255, 255, 255, 0.25)',
  ...props
}) {
  const divRef = useRef(null)

  const handleMouseMove = (event) => {
    const card = divRef.current
    if (!card) return

    const rect = card.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    card.style.setProperty('--mouse-x', `${x}px`)
    card.style.setProperty('--mouse-y', `${y}px`)
    card.style.setProperty('--spotlight-color', spotlightColor)
  }

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      className={`card-spotlight ${className}`.trim()}
      {...props}
    >
      {children}
    </div>
  )
}
