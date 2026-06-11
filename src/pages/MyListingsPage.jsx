import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Eye, Pencil, Trash2, Plus, Calendar } from 'lucide-react'
import { MY_LISTINGS, STATUS_LABELS } from '../data/myListings.js'
import './ListingsPage.css'
import './FavoritesPage.css'
import './MyListingsPage.css'

export default function MyListingsPage() {
  const [items, setItems] = useState(MY_LISTINGS)

  const remove = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  return (
    <main className="main-content">
      <section className="listings-head">
        <div>
          <h1 className="listings-title">📄 Mening e'lonlarim</h1>
          <p className="listings-subtitle">{items.length} ta e'lon joylashtirilgan</p>
        </div>
        <Link to="/elon-berish" className="my-listings-add-btn">
          <Plus size={18} strokeWidth={2.2} />
          Yangi e'lon
        </Link>
      </section>

      {items.length > 0 ? (
        <div className="my-listings-list">
          {items.map(({ id, status, views, date, listing }) => {
            const statusInfo = STATUS_LABELS[status]
            return (
              <div key={id} className="my-listing-row">
                <Link to={`/elon/${id}`} className="my-listing-media">
                  <img src={listing.img} alt={listing.title} />
                </Link>

                <div className="my-listing-body">
                  <Link to={`/elon/${id}`} className="my-listing-title">
                    {listing.title}
                  </Link>
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
                  <button className="my-listing-action my-listing-action-danger" onClick={() => remove(id)}>
                    <Trash2 size={16} strokeWidth={2} />
                    O'chirish
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="favorites-empty">
          <p>Hozircha e'lonlaringiz yo'q.</p>
          <Link to="/elon-berish" className="link-accent">
            Birinchi e'loningizni joylashtiring
          </Link>
        </div>
      )}
    </main>
  )
}
