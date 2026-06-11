import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Eye, Pencil, Trash2, Plus, Calendar, FileText, Clock } from 'lucide-react'
import { MY_LISTINGS, STATUS_LABELS } from '../data/myListings.js'
import { getPostedListings, removePostedListing } from '../data/postedListings.js'
import './ListingsPage.css'
import './FavoritesPage.css'
import './MyListingsPage.css'

export default function MyListingsPage() {
  const [mockItems, setMockItems] = useState(MY_LISTINGS)
  const [postedItems, setPostedItems] = useState(() => getPostedListings())

  const removeMock = (id) => setMockItems((prev) => prev.filter((item) => item.id !== id))
  const removePosted = (id) => {
    removePostedListing(id)
    setPostedItems((prev) => prev.filter((item) => item.id !== id))
  }

  const allItems = [...postedItems, ...mockItems]
  const approvedItems = allItems.filter((item) => item.status === 'active')
  const pendingItems = allItems.filter((item) => item.status === 'pending')

  return (
    <main className="main-content">
      <section className="listings-head">
        <div>
          <h1 className="page-title">
            <span className="page-title-icon" style={{ background: 'var(--color-orange-soft)', color: 'var(--color-orange)' }}>
              <FileText size={20} strokeWidth={2} />
            </span>
            Mening e'lonlarim
          </h1>
          <p className="listings-subtitle">{approvedItems.length} ta tasdiqlangan e'lon</p>
        </div>
        <Link to="/elon-berish" className="my-listings-add-btn">
          <Plus size={18} strokeWidth={2.2} />
          Yangi e'lon
        </Link>
      </section>

      {approvedItems.length > 0 ? (
        <div className="my-listings-list">
          {approvedItems.map((item) => (
            <ListingRow
              key={item.id}
              item={item}
              isPosted={postedItems.includes(item)}
              onRemove={postedItems.includes(item) ? removePosted : removeMock}
            />
          ))}
        </div>
      ) : (
        <div className="favorites-empty">
          <p>Hozircha tasdiqlangan e'lonlaringiz yo'q.</p>
          <Link to="/elon-berish" className="link-accent">
            Birinchi e'loningizni joylashtiring
          </Link>
        </div>
      )}

      {pendingItems.length > 0 && (
        <>
          <h2 className="my-listings-section-title">
            <Clock size={17} strokeWidth={2.2} />
            Tekshirilmoqda
          </h2>
          <div className="my-listings-list">
            {pendingItems.map((item) => (
              <ListingRow
                key={item.id}
                item={item}
                isPosted={postedItems.includes(item)}
                onRemove={postedItems.includes(item) ? removePosted : removeMock}
              />
            ))}
          </div>
        </>
      )}
    </main>
  )
}

function ListingRow({ item, isPosted, onRemove }) {
  const { id, status, views, date, listing } = item
  const statusInfo = STATUS_LABELS[status]
  const Media = isPosted ? 'div' : Link
  const Title = isPosted ? 'div' : Link
  const linkProps = isPosted ? {} : { to: `/elon/${id}` }

  return (
    <div className="my-listing-row">
      <Media {...linkProps} className="my-listing-media">
        <img src={listing.img} alt={listing.title} />
      </Media>

      <div className="my-listing-body">
        <Title {...linkProps} className="my-listing-title">
          {listing.title}
        </Title>
        <div className="my-listing-price">
          {listing.price}
          <span>{listing.unit}</span>
        </div>
        <div className="my-listing-meta">
          <span className="my-listing-status" style={{ background: statusInfo.bg, color: statusInfo.color }}>
            {statusInfo.label}
          </span>
          <span className="my-listing-meta-item">
            <Eye size={14} strokeWidth={2} /> {views} ko'rish
          </span>
          <span className="my-listing-meta-item">
            <Calendar size={14} strokeWidth={2} /> {date}
          </span>
        </div>
      </div>

      <div className="my-listing-actions">
        <Link to={`/elon-berish?edit=${id}`} className="my-listing-action">
          <Pencil size={16} strokeWidth={2} />
          Tahrirlash
        </Link>
        <button className="my-listing-action my-listing-action-danger" onClick={() => onRemove(id)}>
          <Trash2 size={16} strokeWidth={2} />
          O'chirish
        </button>
      </div>
    </div>
  )
}
