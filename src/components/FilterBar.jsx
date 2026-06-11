import { useEffect, useRef, useState } from 'react'
import { MapPin, LayoutGrid, Wallet, ChevronDown, Search, Check } from 'lucide-react'
import { REGIONS } from '../data/regions.js'
import { CATEGORIES } from '../data/categories.js'
import './FilterBar.css'

export const EMPTY_FILTERS = {
  regionId: '',
  districtId: '',
  categoryId: '',
  minPrice: '',
  maxPrice: '',
}

export default function FilterBar({ filters, onChange, onSearch, className = '' }) {
  const [open, setOpen] = useState(null)
  const rootRef = useRef(null)

  useEffect(() => {
    function handleClick(e) {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(null)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const toggle = (key) => setOpen((o) => (o === key ? null : key))
  const update = (patch) => onChange({ ...filters, ...patch })

  const region = REGIONS.find((r) => r.id === filters.regionId)
  const locationLabel = region
    ? filters.districtId
      ? `${region.name}, ${filters.districtId}`
      : region.name
    : 'Barchasi'

  const category = CATEGORIES.find((c) => c.id === filters.categoryId)
  const typeLabel = category ? category.label : 'Barchasi'

  const priceLabel =
    filters.minPrice || filters.maxPrice
      ? `${filters.minPrice || '0'} - ${filters.maxPrice || '∞'} $`
      : 'Istalgan'

  return (
    <div className={`filter-bar ${className}`} ref={rootRef}>
      <div className="filter-field">
        <button
          type="button"
          className={`filter-trigger${open === 'location' ? ' is-open' : ''}`}
          onClick={() => toggle('location')}
        >
          <MapPin size={18} strokeWidth={1.9} className="filter-trigger-icon" />
          <div className="filter-trigger-body">
            <div className="filter-trigger-label">Lokatsiya</div>
            <div className="filter-trigger-value">{locationLabel}</div>
          </div>
          <ChevronDown size={15} strokeWidth={2.2} className="filter-trigger-chevron" />
        </button>
        {open === 'location' && (
          <div className="filter-panel filter-panel-location">
            <div className="filter-panel-col">
              <div className="filter-panel-title">Viloyat</div>
              <div className="filter-panel-list">
                <button
                  type="button"
                  className={`filter-option${!filters.regionId ? ' is-active' : ''}`}
                  onClick={() => update({ regionId: '', districtId: '' })}
                >
                  Barchasi
                  {!filters.regionId && <Check size={14} strokeWidth={2.6} />}
                </button>
                {REGIONS.map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    className={`filter-option${filters.regionId === r.id ? ' is-active' : ''}`}
                    onClick={() => update({ regionId: r.id, districtId: '' })}
                  >
                    {r.name}
                    {filters.regionId === r.id && <Check size={14} strokeWidth={2.6} />}
                  </button>
                ))}
              </div>
            </div>
            {region && (
              <div className="filter-panel-col">
                <div className="filter-panel-title">Tuman</div>
                <div className="filter-panel-list">
                  <button
                    type="button"
                    className={`filter-option${!filters.districtId ? ' is-active' : ''}`}
                    onClick={() => update({ districtId: '' })}
                  >
                    Barchasi
                    {!filters.districtId && <Check size={14} strokeWidth={2.6} />}
                  </button>
                  {region.districts.map((d) => (
                    <button
                      key={d}
                      type="button"
                      className={`filter-option${filters.districtId === d ? ' is-active' : ''}`}
                      onClick={() => update({ districtId: d })}
                    >
                      {d}
                      {filters.districtId === d && <Check size={14} strokeWidth={2.6} />}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="filter-field">
        <button
          type="button"
          className={`filter-trigger${open === 'type' ? ' is-open' : ''}`}
          onClick={() => toggle('type')}
        >
          <LayoutGrid size={18} strokeWidth={1.9} className="filter-trigger-icon" />
          <div className="filter-trigger-body">
            <div className="filter-trigger-label">Narsa turi</div>
            <div className="filter-trigger-value">{typeLabel}</div>
          </div>
          <ChevronDown size={15} strokeWidth={2.2} className="filter-trigger-chevron" />
        </button>
        {open === 'type' && (
          <div className="filter-panel filter-panel-type">
            <button
              type="button"
              className={`filter-option${!filters.categoryId ? ' is-active' : ''}`}
              onClick={() => update({ categoryId: '' })}
            >
              Barchasi
              {!filters.categoryId && <Check size={14} strokeWidth={2.6} />}
            </button>
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                type="button"
                className={`filter-option${filters.categoryId === c.id ? ' is-active' : ''}`}
                onClick={() => update({ categoryId: c.id })}
              >
                {c.label}
                {filters.categoryId === c.id && <Check size={14} strokeWidth={2.6} />}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="filter-field">
        <button
          type="button"
          className={`filter-trigger${open === 'price' ? ' is-open' : ''}`}
          onClick={() => toggle('price')}
        >
          <Wallet size={18} strokeWidth={1.9} className="filter-trigger-icon" />
          <div className="filter-trigger-body">
            <div className="filter-trigger-label">Narxi</div>
            <div className="filter-trigger-value">{priceLabel}</div>
          </div>
          <ChevronDown size={15} strokeWidth={2.2} className="filter-trigger-chevron" />
        </button>
        {open === 'price' && (
          <div className="filter-panel filter-panel-price">
            <label className="filter-price-field">
              <span>Min, $</span>
              <input
                type="number"
                min="0"
                placeholder="0"
                value={filters.minPrice}
                onChange={(e) => update({ minPrice: e.target.value })}
              />
            </label>
            <label className="filter-price-field">
              <span>Max, $</span>
              <input
                type="number"
                min="0"
                placeholder="Istalgan"
                value={filters.maxPrice}
                onChange={(e) => update({ maxPrice: e.target.value })}
              />
            </label>
          </div>
        )}
      </div>

      <button type="button" className="filter-search-btn" onClick={onSearch}>
        <Search size={19} strokeWidth={2.2} />
        Qidirish
      </button>
    </div>
  )
}
