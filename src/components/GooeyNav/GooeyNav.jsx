import { useEffect, useRef, useState } from 'react'
import './GooeyNav.css'

const GooeyNav = ({ items, activeIndex: controlledActiveIndex, initialActiveIndex = 0, onActiveChange }) => {
  const containerRef = useRef(null)
  const navRef = useRef(null)
  const sliderRef = useRef(null)
  const [internalActiveIndex, setInternalActiveIndex] = useState(initialActiveIndex)
  const activeIndex = typeof controlledActiveIndex === 'number' ? controlledActiveIndex : internalActiveIndex

  const updateSliderPosition = (index = activeIndex) => {
    const activeItem = navRef.current?.querySelectorAll('li')[index]
    if (!containerRef.current || !sliderRef.current || !activeItem) return

    const containerRect = containerRef.current.getBoundingClientRect()
    const itemRect = activeItem.getBoundingClientRect()

    sliderRef.current.style.setProperty('--slider-x', `${itemRect.left - containerRect.left}px`)
    sliderRef.current.style.setProperty('--slider-y', `${itemRect.top - containerRect.top}px`)
    sliderRef.current.style.setProperty('--slider-width', `${itemRect.width}px`)
    sliderRef.current.style.setProperty('--slider-height', `${itemRect.height}px`)
  }

  const setSelectedIndex = (index) => {
    if (typeof controlledActiveIndex !== 'number') {
      setInternalActiveIndex(index)
    }
    onActiveChange?.(index)
    updateSliderPosition(index)
  }

  const handleSelect = (event, index, item) => {
    event.preventDefault()
    setSelectedIndex(index)
    item.onClick?.(event)
  }

  const handleKeyDown = (event, index, item) => {
    if (event.key === ' ') {
      handleSelect(event, index, item)
    }
  }

  useEffect(() => {
    updateSliderPosition()

    const resizeObserver = new ResizeObserver(() => updateSliderPosition())
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current)
    }

    return () => resizeObserver.disconnect()
  }, [activeIndex])

  return (
    <div className="gooey-nav-container" ref={containerRef}>
      <span className="nav-active-slider" ref={sliderRef} aria-hidden="true" />
      <nav aria-label="主导航">
        <ul ref={navRef}>
          {items.map((item, index) => (
            <li key={item.href} className={activeIndex === index ? 'active' : ''}>
              <a
                href={item.href}
                onClick={(event) => handleSelect(event, index, item)}
                onKeyDown={(event) => handleKeyDown(event, index, item)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

export default GooeyNav
