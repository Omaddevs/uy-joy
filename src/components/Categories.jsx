import { Link, useLocation } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import CategoryCard from './CategoryCard.jsx'
import { CATEGORIES } from '../data/categories.js'
import { LISTINGS } from '../data/listings.js'
import './Categories.css'

export default function Categories() {
  const { pathname } = useLocation()

  return (
    <section className="categories" aria-labelledby="categories-title">
      <div className="section-head">
        <h2 id="categories-title" className="section-title">Kategoriyalar</h2>
        <Link to="/kategoriyalar" className="categories-view-all link-accent">
          Barchasini ko'rish
          <ChevronRight size={16} strokeWidth={2.4} aria-hidden="true" />
        </Link>
      </div>

      <div className="categories-scroll">
        <div className="categories-grid">
          {CATEGORIES.map((category) => {
            const count = LISTINGS.filter((l) => l.category === category.id).length
            return (
              <CategoryCard
                key={category.id}
                {...category}
                count={count}
                isActive={pathname === category.path}
                bento
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}
