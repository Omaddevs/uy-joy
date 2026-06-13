import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { MapPin, LayoutGrid, Wallet, ChevronDown, Search, Check, X } from 'lucide-react'
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

const PANEL_TITLES = {
  location: 'Lokatsiya',
  type: 'Narsa turi',
  price: 'Narxi',
}

function PanelHeader({ title, onClose }) {
  return (
    <div className="filter-panel-header">
      <span className="filter-panel-header-title">{title}</span>
      <button type="button" className="filter-panel-close" onClick={onClose} aria-label="Yopish">
        <X size={18} strokeWidth={2.2} />
      </button>
    </div>
  )
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(max-width: 900px)').matches,
  )
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 900px)')
    const onChange = (e) => setIsMobile(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return isMobile
}

export default function FilterBar({ filters, onChange, onSearch, className = '' }) {
  const [open, setOpen] = useState(null)
  const rootRef = useRef(null)
  const mobileLayerRef = useRef(null)
  const isMobile = useIsMobile()

  useEffect(() => {
    function handleClick(e) {
      const inRoot = rootRef.current?.contains(e.target)
      const inMobile = mobileLayerRef.current?.contains(e.target)
      if (!inRoot && !inMobile) setOpen(null)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  useEffect(() => {
    if (!open || !isMobile) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open, isMobile])

  const toggle = (key) => setOpen((o) => (o === key ? null : key))
  const close = () => setOpen(null)
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

  const locationPanel = (
    <div className="filter-panel filter-panel-location" role="dialog" aria-label={PANEL_TITLES.location}>
      <PanelHeader title={PANEL_TITLES.location} onClose={close} />
      <div className="filter-panel-body filter-panel-location-body">
        <div className="filter-panel-col">
          <div className="filter-panel-title">Viloyat</div>
          <div className="filter-panel-list">
            <button
              type="button"
              className={`filter-option${!filters.regionId ? ' is-active' : ''}`}
              onClick={() => update({ regionId: '', districtId: '' })}
            >
              <span className="filter-option-text">Barchasi</span>
              {!filters.regionId && <Check size={14} strokeWidth={2.6} />}
            </button>
            {REGIONS.map((r) => (
              <button
                key={r.id}
                type="button"
                className={`filter-option${filters.regionId === r.id ? ' is-active' : ''}`}
                onClick={() => update({ regionId: r.id, districtId: '' })}
              >
                <span className="filter-option-text">{r.name}</span>
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
                <span className="filter-option-text">Barchasi</span>
                {!filters.districtId && <Check size={14} strokeWidth={2.6} />}
              </button>
              {region.districts.map((d) => (
                <button
                  key={d}
                  type="button"
                  className={`filter-option${filters.districtId === d ? ' is-active' : ''}`}
                  onClick={() => { update({ districtId: d }); close() }}
                >
                  <span className="filter-option-text">{d}</span>
                  {filters.districtId === d && <Check size={14} strokeWidth={2.6} />}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )

  const typePanel = (
    <div className="filter-panel filter-panel-type" role="dialog" aria-label={PANEL_TITLES.type}>
      <PanelHeader title={PANEL_TITLES.type} onClose={close} />
      <div className="filter-panel-body">
        <button
          type="button"
          className={`filter-option${!filters.categoryId ? ' is-active' : ''}`}
          onClick={() => { update({ categoryId: '' }); close() }}
        >
          <span className="filter-option-text">Barchasi</span>
          {!filters.categoryId && <Check size={14} strokeWidth={2.6} />}
        </button>
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            type="button"
            className={`filter-option${filters.categoryId === c.id ? ' is-active' : ''}`}
            onClick={() => { update({ categoryId: c.id }); close() }}
          >
            <span className="filter-option-text">{c.label}</span>
            {filters.categoryId === c.id && <Check size={14} strokeWidth={2.6} />}
          </button>
        ))}
      </div>
    </div>
  )

  const pricePanel = (
    <div className="filter-panel filter-panel-price" role="dialog" aria-label={PANEL_TITLES.price}>
      <PanelHeader title={PANEL_TITLES.price} onClose={close} />
      <div className="filter-panel-body filter-panel-price-body">
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
    </div>
  )

  const mobileOverlay =
    isMobile &&
    open &&
    createPortal(
      <div className="filter-mobile-layer" ref={mobileLayerRef}>
        <div className="filter-backdrop" onClick={close} aria-hidden="true" />
        {open === 'location' && locationPanel}
        {open === 'type' && typePanel}
        {open === 'price' && pricePanel}
      </div>,
      document.body,
    )

  return (
    <div className={`filter-bar${open ? ' is-open' : ''} ${className}`} ref={rootRef}>
      {mobileOverlay}

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
        {open === 'location' && !isMobile && locationPanel}
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
        {open === 'type' && !isMobile && typePanel}
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
        {open === 'price' && !isMobile && pricePanel}
      </div>

      <button type="button" className="filter-search-btn" onClick={onSearch}>
        <Search size={19} strokeWidth={2.2} />
        Qidirish
      </button>
    </div>
  )
}
