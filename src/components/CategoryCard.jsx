import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import CategoryIllustration from './CategoryIllustration.jsx'
import './CategoryCard.css'

export default function CategoryCard({
  id,
  icon: Icon,
  color,
  bg,
  label,
  path,
  count,
  isActive,
  showArrow = false,
  bento = false,
}) {
  return (
    <Link
      to={path}
      data-category={id}
      className={`category-card${isActive ? ' is-active' : ''}${showArrow ? ' category-card--detailed' : ''}${bento ? ' category-card--bento' : ''}`}
      aria-current={isActive ? 'page' : undefined}
    >
      <div className="category-icon" style={{ background: bg, color }}>
        <Icon size={22} strokeWidth={2} aria-hidden="true" />
      </div>

      <span className="category-title">{label}</span>
      <span className="category-count">{count} ta e'lon</span>

      {bento && (
        <div className="category-bento-art" aria-hidden="true">
          <span className="category-bento-blob" />
          <span className="category-bento-icon">
            <CategoryIllustration categoryId={id} />
          </span>
        </div>
      )}

      {showArrow && (
        <ChevronRight size={18} strokeWidth={2.2} className="category-card-arrow" aria-hidden="true" />
      )}
    </Link>
  )
}
