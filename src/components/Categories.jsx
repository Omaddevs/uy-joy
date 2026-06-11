import { Link, useLocation } from 'react-router-dom'
import { CATEGORIES } from '../data/categories.js'
import { LISTINGS } from '../data/listings.js'
import './Categories.css'

export default function Categories() {
  const { pathname } = useLocation()

  return (
    <section>
      <div className="section-head">
        <h2 className="section-title">Kategoriyalar</h2>
        <a className="link-accent">Barchasini ko'rish</a>
      </div>
      <div className="categories-grid">
        {CATEGORIES.map(({ id, icon: Icon, color, bg, label, path }) => {
          const count = LISTINGS.filter((l) => l.category === id).length
          return (
            <Link
              key={id}
              to={path}
              className={`category-card${pathname === path ? ' is-active' : ''}`}
            >
              <div className="category-icon" style={{ background: bg, color }}>
                <Icon size={24} strokeWidth={2} />
              </div>
              <div className="category-title">{label}</div>
              <div className="category-count">{count} ta e'lon</div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
