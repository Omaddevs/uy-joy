import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, SlidersHorizontal } from 'lucide-react'
import PropertyCard from '../components/PropertyCard.jsx'
import FilterBar from '../components/FilterBar.jsx'
import Pagination from '../components/Pagination.jsx'
import { CATEGORY_BY_ID } from '../data/categories.js'
import { getListingsByCategory } from '../data/listings.js'
import { REGION_BY_ID } from '../data/regions.js'
import './ListingsPage.css'

const PAGE_SIZE = 4

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
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  const [query, setQuery] = useState(searchParams.get('q') || '')
  const [sort, setSort] = useState('new')
  const [page, setPage] = useState(1)
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    regionId: searchParams.get('viloyat') || '',
    districtId: searchParams.get('tuman') || '',
    categoryId: category,
    minPrice: searchParams.get('min') || '',
    maxPrice: searchParams.get('max') || '',
  })

  const listings = useMemo(() => {
    const region = filters.regionId ? REGION_BY_ID[filters.regionId] : null
    let result = allListings.filter((l) => {
      const haystack = `${l.title} ${l.location}`.toLowerCase()
      if (query.trim() && !haystack.includes(query.trim().toLowerCase())) return false
      if (region && !l.location.toLowerCase().includes(region.name.toLowerCase())) return false
      if (filters.districtId && !l.location.toLowerCase().includes(filters.districtId.toLowerCase())) return false
      const price = parsePrice(l.price)
      if (filters.minPrice && price < Number(filters.minPrice)) return false
      if (filters.maxPrice && price > Number(filters.maxPrice)) return false
      return true
    })
    if (sort === 'price-asc') {
      result = [...result].sort((a, b) => parsePrice(a.price) - parsePrice(b.price))
    } else if (sort === 'price-desc') {
      result = [...result].sort((a, b) => parsePrice(b.price) - parsePrice(a.price))
    }
    return result
  }, [allListings, query, sort, filters])

  useEffect(() => {
    setPage(1)
  }, [listings])

  const totalPages = Math.max(1, Math.ceil(listings.length / PAGE_SIZE))
  const pagedListings = listings.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const handleSearch = () => {
    const targetCategory = filters.categoryId || category
    const params = new URLSearchParams()
    if (filters.regionId) params.set('viloyat', filters.regionId)
    if (filters.districtId) params.set('tuman', filters.districtId)
    if (filters.minPrice) params.set('min', filters.minPrice)
    if (filters.maxPrice) params.set('max', filters.maxPrice)
    if (query.trim()) params.set('q', query.trim())

    if (targetCategory !== category) {
      navigate(`/${targetCategory}${params.toString() ? `?${params}` : ''}`)
      return
    }
    setSearchParams(params)
    setShowFilters(false)
  }

  return (
    <main className="main-content">
      <div className="listings-mobile-topbar mobile-only">
        <Link to="/" className="listings-back-btn" aria-label="Orqaga">
          <ArrowLeft size={20} strokeWidth={2.2} />
        </Link>
        <h1 className="listings-mobile-title">{info.label}</h1>
        <button className="listings-filter-btn" onClick={handleSearch}>
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
          <p className="listings-subtitle">{listings.length} ta e'lon topildi</p>
        </div>

        <div className="listings-controls">
          <input
            className="listings-search"
            placeholder="Qidirish (masalan: Chilonzor, 3 xonali)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            type="button"
            className={`listings-filter-toggle desktop-only${showFilters ? ' is-active' : ''}`}
            onClick={() => setShowFilters((s) => !s)}
          >
            <SlidersHorizontal size={16} strokeWidth={2} />
            Filtrlar
          </button>
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

      <div className="listings-filters-mobile mobile-only">
        <FilterBar filters={filters} onChange={setFilters} onSearch={handleSearch} className="compact" />
      </div>

      {showFilters && (
        <div className="listings-filters desktop-only" style={{ display: 'block' }}>
          <FilterBar filters={filters} onChange={setFilters} onSearch={handleSearch} />
        </div>
      )}

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

      {pagedListings.length > 0 ? (
        <div className="listings-grid">
          {pagedListings.map((listing) => (
            <PropertyCard key={listing.id} listing={listing} />
          ))}
        </div>
      ) : (
        <div className="listings-empty">
          <p>Hech narsa topilmadi. Boshqa so'rov yoki filtrlar bilan qidirib ko'ring.</p>
        </div>
      )}

      <Pagination page={page} totalPages={totalPages} onChange={setPage} />
    </main>
  )
}
