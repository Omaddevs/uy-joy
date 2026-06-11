import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, SlidersHorizontal, MapPin, BedDouble, Wallet } from 'lucide-react'
import PropertyCard from '../components/PropertyCard.jsx'
import { CATEGORY_BY_ID } from '../data/categories.js'
import { getListingsByCategory } from '../data/listings.js'
import './ListingsPage.css'

function parsePrice(price) {
  return Number(String(price).replace(/[^0-9]/g, '')) || 0
}

const SORT_OPTIONS = [
  { id: 'new', label: 'Eng yangi' },
  { id: 'price-asc', label: 'Arzon narx' },
  { id: 'price-desc', label: 'Qimmat narx' },
]

export default function ListingsPage({ category }) {
  const info = CATEGORY_BY_ID[category]
  const allListings = useMemo(() => getListingsByCategory(category), [category])
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState('new')

  const listings = useMemo(() => {
    let result = allListings.filter((l) =>
      `${l.title} ${l.location}`.toLowerCase().includes(query.toLowerCase())
    )
    if (sort === 'price-asc') {
      result = [...result].sort((a, b) => parsePrice(a.price) - parsePrice(b.price))
    } else if (sort === 'price-desc') {
      result = [...result].sort((a, b) => parsePrice(b.price) - parsePrice(a.price))
    }
    return result
  }, [allListings, query, sort])

  return (
    <main className="main-content">
      <div className="listings-mobile-topbar mobile-only">
        <Link to="/" className="listings-back-btn" aria-label="Orqaga">
          <ArrowLeft size={20} strokeWidth={2.2} />
        </Link>
        <h1 className="listings-mobile-title">{info.label}</h1>
        <button className="listings-filter-btn">
          <SlidersHorizontal size={15} strokeWidth={2.2} />
          Filtr
        </button>
      </div>

      <section className="listings-head">
        <div className="desktop-only" style={{ display: 'block' }}>
          <h1 className="page-title">
            <span className="page-title-icon" style={{ background: info.bg, color: info.color }}>
              <info.icon size={22} strokeWidth={2} />
            </span>
            {info.label}
          </h1>
          <p className="listings-subtitle">{allListings.length} ta e'lon topildi</p>
        </div>

        <div className="listings-controls">
          <input
            className="listings-search"
            placeholder="Nomi yoki manzil bo'yicha qidirish"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="listings-sort desktop-only">
            <SlidersHorizontal size={16} strokeWidth={2} color="#94A3B8" />
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      <div className="listings-chips mobile-only">
        <button className="listings-chip">
          <MapPin size={14} strokeWidth={2.2} />
          Toshkent
        </button>
        <button className="listings-chip">
          <BedDouble size={14} strokeWidth={2.2} />
          Xonalar
        </button>
        <button className="listings-chip">
          <Wallet size={14} strokeWidth={2.2} />
          Narxi
        </button>
        <button className="listings-chip listings-chip-icon" aria-label="Filtrlar">
          <SlidersHorizontal size={15} strokeWidth={2.2} />
        </button>
      </div>

      <div className="listings-count-row mobile-only">
        <span className="listings-count-text">{listings.length} ta e'lon topildi</span>
        <div className="listings-sort listings-sort-mobile">
          <span>Saralash:</span>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.id} value={opt.id}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {listings.length > 0 ? (
        <div className="listings-grid">
          {listings.map((listing) => (
            <PropertyCard key={listing.id} listing={listing} />
          ))}
        </div>
      ) : (
        <div className="listings-empty">
          <p>Hech narsa topilmadi. Boshqa so'rov bilan qidirib ko'ring.</p>
        </div>
      )}
    </main>
  )
}
