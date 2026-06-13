import { useEffect, useRef, useState } from 'react'
import { MapPin, ChevronDown, Check } from 'lucide-react'
import { useRegion } from '../context/RegionContext.jsx'
import { REGIONS } from '../data/regions.js'
import './RegionPicker.css'

export default function RegionPicker({ buttonClassName = '' }) {
  const { regionId, region, setRegionId } = useRegion()
  const [open, setOpen] = useState(false)
  const rootRef = useRef(null)

  useEffect(() => {
    if (!open) return
    function handleClick(e) {
      if (!rootRef.current?.contains(e.target)) setOpen(false)
    }
    function handleKey(e) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    document.addEventListener('keydown', handleKey)
    return () => {
      document.removeEventListener('mousedown', handleClick)
      document.removeEventListener('keydown', handleKey)
    }
  }, [open])

  return (
    <div className={`region-picker${open ? ' is-open' : ''}`} ref={rootRef}>
      <button
        type="button"
        className={buttonClassName}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label="Viloyatni tanlash"
      >
        <MapPin size={15} strokeWidth={2} color="#4F46E5" aria-hidden="true" />
        <span>{region.name}</span>
        <ChevronDown size={14} strokeWidth={2} color="#94A3B8" className="region-picker-chevron" aria-hidden="true" />
      </button>

      {open && (
        <div className="region-picker-panel" role="listbox" aria-label="Viloyatlar">
          {REGIONS.map((item) => (
            <button
              key={item.id}
              type="button"
              role="option"
              aria-selected={regionId === item.id}
              className={`region-picker-option${regionId === item.id ? ' is-active' : ''}`}
              onClick={() => {
                setRegionId(item.id)
                setOpen(false)
              }}
            >
              <span>{item.name}</span>
              {regionId === item.id && <Check size={14} strokeWidth={2.6} aria-hidden="true" />}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
