import { useState, useCallback, useEffect, useRef } from 'react'
import { useParams, Link, Navigate, useNavigate, useLocation } from 'react-router-dom'
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Heart,
  MapPin,
  Phone,
  PhoneCall,
  Star,
  BedDouble,
  Maximize,
  Trees,
  Building2,
  Wifi,
  Send,
  User,
} from 'lucide-react'
import { useFavorites } from '../context/FavoritesContext.jsx'
import { useAuth } from '../context/AuthContext.jsx'
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

const INITIAL_COMMENTS = [
  {
    id: 1,
    name: 'Sardor Aliyev',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=160&q=80&auto=format&fit=crop',
    text: "Joylashuvi juda qulay ekan, qo'shni hududlarni ko'rib chiqdim. Narxi haqida kelishish mumkinmi?",
    time: '2 kun oldin',
  },
  {
    id: 2,
    name: 'Nilufar Saidova',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=160&q=80&auto=format&fit=crop',
    text: "Rasmlar haqiqiy holatga mos keladimi? Ko'rgani borish mumkinmi?",
    time: '1 kun oldin',
  },
]

export default function ListingDetailPage() {
  const { id } = useParams()
  const listing = LISTINGS_BY_ID[id]
  const { favorites, toggleFavorite } = useFavorites()
  const { user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [activeImg, setActiveImg] = useState(0)
  const [showPhone, setShowPhone] = useState(false)
  const [comments, setComments] = useState(INITIAL_COMMENTS)
  const [commentDraft, setCommentDraft] = useState('')
  const thumbsRef = useRef(null)

  const imageCount = listing?.images?.length ?? 0
  const hasMultipleImages = imageCount > 1

  const goToPrev = useCallback(() => {
    setActiveImg((i) => (i === 0 ? imageCount - 1 : i - 1))
  }, [imageCount])

  const goToNext = useCallback(() => {
    setActiveImg((i) => (i === imageCount - 1 ? 0 : i + 1))
  }, [imageCount])

  useEffect(() => {
    if (!hasMultipleImages) return
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') goToPrev()
      if (e.key === 'ArrowRight') goToNext()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [hasMultipleImages, goToPrev, goToNext])

  useEffect(() => {
    const activeThumb = thumbsRef.current?.querySelector('.detail-thumb.is-active')
    activeThumb?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
  }, [activeImg])

  if (!listing) return <Navigate to="/" replace />

  const isFavorite = !!favorites[listing.id]
  const category = CATEGORY_BY_ID[listing.category]

  const requireAuth = () => {
    if (user) return true
    navigate('/kirish', { state: { from: location } })
    return false
  }

  const handleFavorite = () => {
    if (!requireAuth()) return
    toggleFavorite(listing.id)
  }

  const handleCall = () => {
    if (!requireAuth()) return
    setShowPhone(true)
    window.location.href = `tel:${listing.seller.phone.replace(/[^\d+]/g, '')}`
  }

  const handleAddComment = (e) => {
    e.preventDefault()
    if (!requireAuth()) return
    const text = commentDraft.trim()
    if (!text) return
    setComments((prev) => [
      ...prev,
      { id: prev.length + 1, name: user.name, avatar: user.avatar, text, time: 'hozir' },
    ])
    setCommentDraft('')
  }

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
              <img
                key={activeImg}
                src={listing.images[activeImg]}
                alt={`${listing.title} — ${activeImg + 1}/${imageCount}`}
              />
              <span className="detail-tag" style={{ background: listing.tagColor }}>
                {listing.tag}
              </span>
              <button
                className={`detail-fav${isFavorite ? ' is-active' : ''}`}
                onClick={handleFavorite}
                aria-label="Sevimlilarga qo'shish"
              >
                <Heart
                  size={20}
                  strokeWidth={1.9}
                  fill={isFavorite ? '#EF4444' : 'none'}
                  color={isFavorite ? '#EF4444' : '#64748B'}
                />
              </button>
              {hasMultipleImages && (
                <>
                  <button
                    type="button"
                    className="detail-gallery-nav detail-gallery-nav--prev"
                    onClick={goToPrev}
                    aria-label="Oldingi rasm"
                  >
                    <ChevronLeft size={22} strokeWidth={2.2} aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    className="detail-gallery-nav detail-gallery-nav--next"
                    onClick={goToNext}
                    aria-label="Keyingi rasm"
                  >
                    <ChevronRight size={22} strokeWidth={2.2} aria-hidden="true" />
                  </button>
                  <span className="detail-gallery-counter" aria-live="polite">
                    {activeImg + 1} / {imageCount}
                  </span>
                </>
              )}
            </div>
            {hasMultipleImages && (
              <div className="detail-gallery-thumbs" ref={thumbsRef}>
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

            <h2 className="detail-section-title">Sharhlar ({comments.length})</h2>
            <div className="detail-comments">
              {comments.map((c) => (
                <div key={c.id} className="detail-comment">
                  <img className="detail-comment-avatar" src={c.avatar} alt={c.name} />
                  <div className="detail-comment-body">
                    <div className="detail-comment-head">
                      <span className="detail-comment-name">{c.name}</span>
                      <span className="detail-comment-time">{c.time}</span>
                    </div>
                    <p className="detail-comment-text">{c.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <form className="detail-comment-form" onSubmit={handleAddComment}>
              <div className="detail-comment-form-avatar">
                {user ? <img src={user.avatar} alt={user.name} /> : <User size={18} strokeWidth={2} />}
              </div>
              <input
                placeholder={user ? 'Sharh yozing...' : "Sharh yozish uchun tizimga kiring"}
                value={commentDraft}
                onChange={(e) => setCommentDraft(e.target.value)}
              />
              <button type="submit" aria-label="Yuborish">
                <Send size={17} strokeWidth={2.2} />
              </button>
            </form>
          </div>
        </div>

        <aside className="detail-sidebar">
          <div className="detail-card detail-price-card">
            <div className="detail-price">
              {listing.price}
              <span className="detail-price-unit">{listing.unit}</span>
            </div>
            <button className="detail-contact-btn" onClick={() => setShowPhone(true)}>
              <Phone size={18} strokeWidth={2} />
              {showPhone ? listing.seller.phone : "Telefon raqamni ko'rsatish"}
            </button>
            <button className="detail-message-btn" onClick={handleCall}>
              <PhoneCall size={18} strokeWidth={2} />
              Qo'ng'iroq qilish
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
