import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Navigation, Search } from 'lucide-react'
import SearchMap from '../components/SearchMap.jsx'
import { LISTINGS } from '../data/listings.js'
import { CATEGORIES } from '../data/categories.js'
import { DEFAULT_CENTER, formatDistance, sortListingsByDistance } from '../utils/geo.js'
import './SearchMapPage.css'

export default function SearchMapPage() {
  const [mounted, setMounted] = useState(false)
  const [userPos, setUserPos] = useState(null)
  const [locating, setLocating] = useState(true)
  const [locationError, setLocationError] = useState(false)
  const [activeId, setActiveId] = useState(null)
  const [category, setCategory] = useState('all')
  const [query, setQuery] = useState('')
  const [locateTrigger, setLocateTrigger] = useState(0)

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    if (!navigator.geolocation) {
      setUserPos(DEFAULT_CENTER)
      setLocating(false)
      setLocationError(true)
      return
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserPos({ lat: pos.coords.latitude, lng: pos.coords.longitude })
        setLocating(false)
      },
      () => {
        setUserPos(DEFAULT_CENTER)
        setLocating(false)
        setLocationError(true)
      },
      { enableHighAccuracy: true, timeout: 10000 },
    )
  }, [])

  const filteredListings = useMemo(() => {
    let result = LISTINGS
    if (category !== 'all') result = result.filter((l) => l.category === category)
    if (query.trim()) {
      const q = query.trim().toLowerCase()
      result = result.filter(
        (l) =>
          l.title.toLowerCase().includes(q) ||
          l.location.toLowerCase().includes(q),
      )
    }
    return result
  }, [category, query])

  const sortedListings = useMemo(() => {
    if (!userPos) return filteredListings.map((listing) => ({ listing, distance: null }))
    return sortListingsByDistance(filteredListings, userPos)
  }, [filteredListings, userPos])

  const handleLocate = () => {
    if (!navigator.geolocation) return
    setLocating(true)
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserPos({ lat: pos.coords.latitude, lng: pos.coords.longitude })
        setLocating(false)
        setLocationError(false)
        setLocateTrigger((t) => t + 1)
      },
      () => {
        setLocating(false)
        setLocationError(true)
      },
      { enableHighAccuracy: true, timeout: 10000 },
    )
  }

  return (
    <main className="main-content search-map-page">
      <section className="search-map-head">
        <div>
          <h1 className="page-title search-map-title">
            <span className="page-title-icon" style={{ background: 'var(--color-primary-soft)', color: 'var(--color-primary)' }}>
              <Search size={22} strokeWidth={2} />
            </span>
            Qidirish
          </h1>
          <p className="search-map-subtitle">
            {locating
              ? 'Joylashuvingiz aniqlanmoqda...'
              : `${sortedListings.length} ta uy yaqin atrofda`}
            {locationError && !locating && ' · Toshkent markazi asosida'}
          </p>
        </div>
        <button type="button" className="search-map-locate-btn" onClick={handleLocate} disabled={locating}>
          <Navigation size={16} strokeWidth={2.2} />
          {locating ? 'Aniqlanmoqda...' : 'Mening joyim'}
        </button>
      </section>

      <div className="search-map-toolbar">
        <div className="search-map-input-wrap">
          <Search size={17} strokeWidth={2} color="#94A3B8" />
          <input
            className="search-map-input"
            placeholder="Hudud yoki uy nomi..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="search-map-filters">
          <button
            type="button"
            className={`search-map-filter${category === 'all' ? ' is-active' : ''}`}
            onClick={() => setCategory('all')}
          >
            Barchasi
          </button>
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              type="button"
              className={`search-map-filter${category === c.id ? ' is-active' : ''}`}
              onClick={() => setCategory(c.id)}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <div className="search-map-layout">
        <div className="search-map-canvas">
          {mounted && userPos ? (
            <SearchMap
              listings={filteredListings}
              userPos={userPos}
              activeId={activeId}
              onSelect={setActiveId}
              locateTrigger={locateTrigger}
            />
          ) : (
            <div className="search-map-skeleton" aria-hidden="true" />
          )}
        </div>

        <aside className="search-map-sidebar">
          <h2 className="search-map-sidebar-title">Yaqin atrofdagi uylar</h2>
          <ul className="search-map-list">
            {sortedListings.map(({ listing, distance }) => (
              <li key={listing.id}>
                <Link
                  to={`/elon/${listing.id}`}
                  className={`search-map-list-item${activeId === listing.id ? ' is-active' : ''}`}
                  onMouseEnter={() => setActiveId(listing.id)}
                  onFocus={() => setActiveId(listing.id)}
                >
                  <img src={listing.img} alt="" className="search-map-list-img" />
                  <div className="search-map-list-body">
                    <div className="search-map-list-price">
                      {listing.price}
                      {listing.unit}
                    </div>
                    <div className="search-map-list-title">{listing.title}</div>
                    <div className="search-map-list-meta">
                      <MapPin size={12} strokeWidth={2} />
                      {listing.location}
                      {distance != null && (
                        <span className="search-map-list-distance">{formatDistance(distance)}</span>
                      )}
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          {sortedListings.length === 0 && (
            <p className="search-map-empty">Hech narsa topilmadi.</p>
          )}
        </aside>
      </div>
    </main>
  )
}
