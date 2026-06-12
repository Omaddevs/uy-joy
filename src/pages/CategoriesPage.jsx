import { Link, useLocation } from 'react-router-dom'
import { ArrowLeft, LayoutGrid } from 'lucide-react'
import CategoryCard from '../components/CategoryCard.jsx'
import { CATEGORIES } from '../data/categories.js'
import { LISTINGS } from '../data/listings.js'
import './CategoriesPage.css'
import './ListingsPage.css'

export default function CategoriesPage() {
  const { pathname } = useLocation()
  const totalListings = LISTINGS.length

  return (
    <main className="main-content">
      <div className="listings-mobile-topbar mobile-only">
        <Link to="/" className="listings-back-btn" aria-label="Orqaga">
          <ArrowLeft size={20} strokeWidth={2.2} />
        </Link>
        <h1 className="listings-mobile-title">Kategoriyalar</h1>
        <span className="categories-page-topbar-spacer" aria-hidden="true" />
      </div>

      <section className="categories-page-head">
        <div className="desktop-only" style={{ display: 'block' }}>
          <h1 className="page-title">
            <span className="page-title-icon" style={{ background: 'var(--color-primary-soft)', color: 'var(--color-primary)' }}>
              <LayoutGrid size={22} strokeWidth={2} />
            </span>
            Kategoriyalar
          </h1>
          <p className="listings-subtitle">
            {CATEGORIES.length} ta kategoriya · {totalListings} ta e'lon
          </p>
        </div>
        <p className="categories-page-subtitle mobile-only">
          {CATEGORIES.length} ta kategoriya · {totalListings} ta e'lon
        </p>
      </section>

      <div className="categories-page-grid">
        {CATEGORIES.map((category) => {
          const count = LISTINGS.filter((l) => l.category === category.id).length
          return (
            <CategoryCard
              key={category.id}
              {...category}
              count={count}
              isActive={pathname === category.path}
              showArrow
            />
          )
        })}
      </div>
    </main>
  )
}
