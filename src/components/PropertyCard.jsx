import { Link } from 'react-router-dom'
import { Heart, MapPin, BedDouble, Maximize, Trees, Building2, Wifi } from 'lucide-react'
import { useFavorites } from '../context/FavoritesContext.jsx'
import './PropertyCard.css'

const FEATURE_ICONS = {
  rooms: BedDouble,
  area: Maximize,
  land: Trees,
  floor: Building2,
  wifi: Wifi,
}

export default function PropertyCard({ listing }) {
  const { id, tag, tagColor, img, title, price, unit, features, location, time } = listing
  const { favorites, toggleFavorite } = useFavorites()
  const isFavorite = !!favorites[id]

  return (
    <Link to={`/elon/${id}`} className="property-card">
      <div className="property-card-media">
        <img src={img} alt={title} />
        <span className="property-card-tag" style={{ background: tagColor }}>
          {tag}
        </span>
        <button
          className={`property-card-fav${isFavorite ? ' is-active' : ''}`}
          onClick={(e) => {
            e.preventDefault()
            toggleFavorite(id)
          }}
          aria-label="Sevimlilarga qo'shish"
        >
          <Heart
            size={18}
            strokeWidth={1.9}
            fill={isFavorite ? '#EF4444' : 'none'}
            color={isFavorite ? '#EF4444' : '#64748B'}
          />
        </button>
      </div>

      <div className="property-card-body">
        <div className="property-card-title">{title}</div>
        <div className="property-card-price">
          {price}
          <span className="property-card-unit">{unit}</span>
        </div>

        <div className="property-card-features">
          {features.map(([key, label]) => {
            const Icon = FEATURE_ICONS[key]
            return (
              <div key={key} className="property-card-feature">
                {Icon && <Icon size={14} strokeWidth={1.8} color="#94A3B8" />}
                {label}
              </div>
            )
          })}
        </div>

        <div className="property-card-meta">
          <div className="property-card-location">
            <MapPin size={13} strokeWidth={2} color="#CBD5E1" />
            {location}
          </div>
          <div className="property-card-time">{time}</div>
        </div>
      </div>
    </Link>
  )
}
