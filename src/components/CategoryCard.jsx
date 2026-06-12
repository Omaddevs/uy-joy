import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import './CategoryCard.css'

export default function CategoryCard({ icon: Icon, color, bg, label, path, count, isActive, showArrow = false }) {
  return (
    <Link
      to={path}
      className={`category-card${isActive ? ' is-active' : ''}${showArrow ? ' category-card--detailed' : ''}`}
      aria-current={isActive ? 'page' : undefined}
    >
      <div className="category-icon" style={{ background: bg, color }}>
        <Icon size={22} strokeWidth={2} aria-hidden="true" />
      </div>
      <div className="category-body">
        <span className="category-title">{label}</span>
        <span className="category-count">{count} ta e'lon</span>
      </div>
      {showArrow && (
        <ChevronRight size={18} strokeWidth={2.2} className="category-card-arrow" aria-hidden="true" />
      )}
    </Link>
  )
}
