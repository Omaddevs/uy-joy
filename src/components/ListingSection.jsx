import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import PropertyCard from './PropertyCard.jsx'
import './ListingSection.css'

export default function ListingSection({
  title,
  listings,
  viewAllTo,
  pageSize = 4,
  icon: Icon,
  iconBg,
  iconColor,
}) {
  const items = listings.slice(0, pageSize)
  if (items.length === 0) return null

  return (
    <section className="listing-section">
      <div className="section-head">
        <h2 className="section-title listing-section-title">
          {Icon && (
            <span className="listing-section-icon" style={{ background: iconBg, color: iconColor }}>
              <Icon size={18} strokeWidth={2} aria-hidden="true" />
            </span>
          )}
          {title}
        </h2>
        {viewAllTo && (
          <Link to={viewAllTo} className="listing-section-view-all link-accent">
            Barchasini ko'rish
            <ChevronRight size={16} strokeWidth={2.4} aria-hidden="true" />
          </Link>
        )}
      </div>

      <div className="listing-section-grid">
        {items.map((listing) => (
          <PropertyCard key={listing.id} listing={listing} />
        ))}
      </div>
    </section>
  )
}
