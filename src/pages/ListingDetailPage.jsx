import { useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import {
  ArrowLeft,
  Heart,
  MapPin,
  Phone,
  MessageSquare,
  Star,
  BedDouble,
  Maximize,
  Trees,
  Building2,
  Wifi,
} from 'lucide-react'
import { useFavorites } from '../context/FavoritesContext.jsx'
import { LISTINGS_BY_ID } from '../data/listings.js'
import { CATEGORY_BY_ID } from '../data/categories.js'
import './ListingDetailPage.css'

const FEATURE_ICONS = {
  rooms: BedDouble,
  area: Maximize,
  land: Trees,
  floor: Building2,
  wifi: Wifi,
}

export default function ListingDetailPage() {
  const { id } = useParams()
  const listing = LISTINGS_BY_ID[id]
  const { favorites, toggleFavorite } = useFavorites()
  const [activeImg, setActiveImg] = useState(0)

  if (!listing) return <Navigate to="/" replace />

  const isFavorite = !!favorites[listing.id]
  const category = CATEGORY_BY_ID[listing.category]

  return (
    <main className="main-content">
      <Link to={category.path} className="detail-back">
        <ArrowLeft size={18} strokeWidth={2.2} />
        {category.label}ga qaytish
      </Link>

      <div className="detail-layout">
        <div className="detail-main">
          <div className="detail-gallery">
            <div className="detail-gallery-main">
              <img src={listing.images[activeImg]} alt={listing.title} />
              <span className="detail-tag" style={{ background: listing.tagColor }}>
                {listing.tag}
              </span>
              <button
                className={`detail-fav${isFavorite ? ' is-active' : ''}`}
                onClick={() => toggleFavorite(listing.id)}
                aria-label="Sevimlilarga qo'shish"
              >
                <Heart
                  size={20}
                  strokeWidth={1.9}
                  fill={isFavorite ? '#EF4444' : 'none'}
                  color={isFavorite ? '#EF4444' : '#64748B'}
                />
              </button>
            </div>
            {listing.images.length > 1 && (
              <div className="detail-gallery-thumbs">
                {listing.images.map((src, i) => (
                  <button
                    key={src}
                    className={`detail-thumb${i === activeImg ? ' is-active' : ''}`}
                    onClick={() => setActiveImg(i)}
                  >
                    <img src={src} alt="" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="detail-card">
            <h1 className="detail-title">{listing.title}</h1>
            <div className="detail-location">
              <MapPin size={15} strokeWidth={2} color="#94A3B8" />
              {listing.location}
              <span className="detail-time">{listing.time}</span>
            </div>

            <div className="detail-features">
              {listing.features.map(([key, label]) => {
                const Icon = FEATURE_ICONS[key]
                return (
                  <div key={key} className="detail-feature">
                    {Icon && <Icon size={18} strokeWidth={1.8} color="#4F46E5" />}
                    {label}
                  </div>
                )
              })}
            </div>

            <h2 className="detail-section-title">Tavsif</h2>
            <p className="detail-description">{listing.description}</p>
          </div>
        </div>

        <aside className="detail-sidebar">
          <div className="detail-card detail-price-card">
            <div className="detail-price">
              {listing.price}
              <span className="detail-price-unit">{listing.unit}</span>
            </div>
            <button className="detail-contact-btn">
              <Phone size={18} strokeWidth={2} />
              Telefon raqamni ko'rsatish
            </button>
            <button className="detail-message-btn">
              <MessageSquare size={18} strokeWidth={2} />
              Xabar yozish
            </button>
          </div>

          <div className="detail-card detail-seller-card">
            <h3 className="detail-card-title">E'lon beruvchi</h3>
            <div className="detail-seller">
              <img className="detail-seller-avatar" src={listing.seller.avatar} alt={listing.seller.name} />
              <div>
                <div className="detail-seller-name">{listing.seller.name}</div>
                <div className="detail-seller-rating">
                  <Star size={13} strokeWidth={0} fill="#F59E0B" />
                  {listing.seller.rating}
                </div>
              </div>
            </div>
            <div className="detail-seller-phone">{listing.seller.phone}</div>
          </div>
        </aside>
      </div>
    </main>
  )
}
