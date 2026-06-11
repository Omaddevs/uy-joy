import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Home, Key, Trees, MapPin, LayoutGrid, ChevronDown, Search } from 'lucide-react'
import './Hero.css'

const TABS = [
  { id: 'sotuv', label: 'Sotuv', icon: Home },
  { id: 'ijara', label: 'Ijara', icon: Key },
  { id: 'yer', label: 'Quruq yer', icon: Trees },
]

export default function Hero() {
  const [tab, setTab] = useState('sotuv')
  const navigate = useNavigate()

  return (
    <section className="hero">
      <img
        className="hero-bg"
        src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1400&q=80&auto=format&fit=crop"
        alt=""
      />
      <div className="hero-overlay" />

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
              className={`hero-tab${tab === id ? ' is-active' : ''}`}
              onClick={() => setTab(id)}
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
          />
        </div>

        <div className="hero-filters">
          <div className="hero-filter">
            <MapPin size={18} strokeWidth={1.9} color="#94A3B8" />
            <div className="hero-filter-body">
              <div className="hero-filter-label">Lokatsiya</div>
              <div className="hero-filter-value">Toshkent</div>
            </div>
            <ChevronDown size={15} strokeWidth={2.2} color="#CBD5E1" />
          </div>

          <div className="hero-filter">
            <LayoutGrid size={18} strokeWidth={1.9} color="#94A3B8" />
            <div className="hero-filter-body">
              <div className="hero-filter-label">Narsa turi</div>
              <div className="hero-filter-value">Barchasi</div>
            </div>
            <ChevronDown size={15} strokeWidth={2.2} color="#CBD5E1" />
          </div>

          <div className="hero-filter">
            <div className="hero-filter-body">
              <div className="hero-filter-label">Narxi: Min</div>
              <div className="hero-filter-value hero-filter-placeholder">Istalgan</div>
            </div>
            <ChevronDown size={15} strokeWidth={2.2} color="#CBD5E1" />
          </div>

          <div className="hero-filter">
            <div className="hero-filter-body">
              <div className="hero-filter-label">Narxi: Max</div>
              <div className="hero-filter-value hero-filter-placeholder">Istalgan</div>
            </div>
            <ChevronDown size={15} strokeWidth={2.2} color="#CBD5E1" />
          </div>

          <button className="hero-search-btn desktop-only" onClick={() => navigate(`/${tab}`)}>
            <Search size={19} strokeWidth={2.2} />
            Qidirish
          </button>
        </div>

        <button className="hero-search-btn-mobile mobile-only" onClick={() => navigate(`/${tab}`)}>
          <Search size={19} strokeWidth={2.2} />
          Qidirish
        </button>
      </div>
    </section>
  )
}
