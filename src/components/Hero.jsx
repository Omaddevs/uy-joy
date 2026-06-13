import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Home, Key, Trees, Search } from 'lucide-react'
import FilterBar, { EMPTY_FILTERS } from './FilterBar.jsx'
import { useRegion } from '../context/RegionContext.jsx'
import './Hero.css'

const TABS = [
  { id: 'sotuv', label: 'Sotuv', icon: Home },
  { id: 'ijara', label: 'Ijara', icon: Key },
  { id: 'yer', label: 'Quruq yer', icon: Trees },
]

export default function Hero() {
  const { regionId } = useRegion()
  const [filters, setFilters] = useState({ ...EMPTY_FILTERS, regionId })
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    setFilters((prev) => ({ ...prev, regionId, districtId: '' }))
  }, [regionId])

  const handleSearch = () => {
    const category = filters.categoryId || 'sotuv'
    const params = new URLSearchParams()
    const activeRegion = filters.regionId || regionId
    if (activeRegion) params.set('viloyat', activeRegion)
    if (filters.districtId) params.set('tuman', filters.districtId)
    if (filters.minPrice) params.set('min', filters.minPrice)
    if (filters.maxPrice) params.set('max', filters.maxPrice)
    if (query.trim()) params.set('q', query.trim())
    const qs = params.toString()
    navigate(`/${category}${qs ? `?${qs}` : ''}`)
  }

  return (
    <section className="hero">
      <div className="hero-media">
        <img
          className="hero-bg"
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1400&q=80&auto=format&fit=crop"
          alt=""
        />
        <div className="hero-overlay" />
      </div>

      <div className="hero-text">
        <h1 className="hero-title">
          Orzuyingizdagi uyni biz bilan <span className="hero-title-accent">toping</span>
        </h1>
        <p className="hero-subtitle">
          Hovli, kvartira, quruq yer, dacha, mexmonxona va boshqa ko'plab mulklar
        </p>
      </div>

      <div className="hero-search-card">
        <div className="hero-tabs">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              className={`hero-tab${(filters.categoryId || 'sotuv') === id ? ' is-active' : ''}`}
              onClick={() => setFilters((f) => ({ ...f, categoryId: id }))}
            >
              <Icon size={17} strokeWidth={1.9} />
              {label}
            </button>
          ))}
        </div>

        <div className="hero-search-input-wrap mobile-only">
          <Search size={18} strokeWidth={2} color="#94A3B8" />
          <input
            className="hero-search-input"
            placeholder="Qidirish (masalan: Chilonzor, 3 xonali)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <FilterBar filters={filters} onChange={setFilters} onSearch={handleSearch} />
      </div>
    </section>
  )
}
