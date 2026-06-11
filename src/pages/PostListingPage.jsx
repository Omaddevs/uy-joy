import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Check, Image as ImageIcon, FilePlus, FilePen, ArrowLeft, RefreshCw } from 'lucide-react'
import { LISTINGS_BY_ID } from '../data/listings.js'
import { PROPERTY_TYPES, PROPERTY_TYPE_BY_ID, buildInitialDetails } from '../data/listingForms.js'
import { addPostedListing, getPostedListings, updatePostedListing } from '../data/postedListings.js'
import { useAuth } from '../context/AuthContext.jsx'
import './ListingsPage.css'
import './PostListingPage.css'

const UNITS = [
  { id: '', label: 'Sotuv narxi' },
  { id: ' / oy', label: 'Oylik ijara' },
  { id: ' / kun', label: 'Kunlik ijara' },
]

const GUESS_PROPERTY_TYPE = { sotuv: 'hovli', ijara: 'hovli', yer: 'yer', dacha: 'dacha', mexmonxona: 'mexmonxona' }

const PLACEHOLDER_IMAGE = 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80&auto=format&fit=crop'

function buildFreshState(propertyType, user) {
  const config = PROPERTY_TYPE_BY_ID[propertyType]
  return {
    propertyType,
    title: '',
    price: '',
    unit: '',
    location: user?.location || '',
    phone: user?.phone || '',
    image: '',
    description: '',
    descriptionTouched: false,
    details: buildInitialDetails(propertyType),
    category: config.category,
  }
}

export default function PostListingPage() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [searchParams] = useSearchParams()
  const editId = searchParams.get('edit')

  const editingPosted = editId ? getPostedListings().find((p) => p.id === editId) : null
  const editingMock = !editingPosted && editId ? LISTINGS_BY_ID[editId] : null

  const initialForm = editingPosted
    ? editingPosted.form
    : editingMock
      ? (() => {
          const propertyType = GUESS_PROPERTY_TYPE[editingMock.category] || 'hovli'
          const config = PROPERTY_TYPE_BY_ID[propertyType]
          return {
            propertyType,
            title: editingMock.title,
            price: (editingMock.price || '').replace(/[^\d.]/g, ''),
            unit: editingMock.unit || '',
            location: editingMock.location,
            phone: user?.phone || '',
            image: editingMock.img || '',
            description: editingMock.description || '',
            descriptionTouched: true,
            details: buildInitialDetails(propertyType),
            category: config.category,
          }
        })()
      : null

  const [form, setForm] = useState(initialForm)
  const [submitted, setSubmitted] = useState(false)
  const isEditing = Boolean(editingPosted || editingMock)

  const config = form ? PROPERTY_TYPE_BY_ID[form.propertyType] : null

  const regenerateDescription = (next) => {
    if (next.descriptionTouched) return next
    const cfg = PROPERTY_TYPE_BY_ID[next.propertyType]
    return { ...next, description: cfg.buildDescription(next) }
  }

  const selectPropertyType = (id) => {
    setForm(buildFreshState(id, user))
  }

  const update = (key, value) => {
    setForm((f) => regenerateDescription({ ...f, [key]: value }))
  }

  const updateDetail = (key, value) => {
    setForm((f) => regenerateDescription({ ...f, details: { ...f.details, [key]: value } }))
  }

  const handleDescriptionChange = (value) => {
    setForm((f) => ({ ...f, description: value, descriptionTouched: true }))
  }

  const handleRegenerateClick = () => {
    setForm((f) => {
      const cfg = PROPERTY_TYPE_BY_ID[f.propertyType]
      return { ...f, description: cfg.buildDescription(f), descriptionTouched: false }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const id = editingPosted ? editingPosted.id : `posted-${Date.now()}`
    const entry = {
      id,
      status: editingPosted ? editingPosted.status : 'pending',
      date: editingPosted ? editingPosted.date : new Date().toISOString().slice(0, 10),
      views: editingPosted ? editingPosted.views : 0,
      form,
      listing: {
        id,
        category: form.category,
        propertyType: form.propertyType,
        tag: 'Tekshirilmoqda',
        tagColor: '#F59E0B',
        img: form.image || PLACEHOLDER_IMAGE,
        title: form.title,
        price: `$${form.price}`,
        unit: form.unit,
        location: form.location,
        time: 'hozir',
        description: form.description,
        details: form.details,
        seller: {
          name: user?.name || '',
          avatar: user?.avatar || '',
          phone: form.phone,
          rating: 5,
        },
        features: [],
      },
    }

    if (editingPosted) {
      updatePostedListing(id, entry)
    } else {
      addPostedListing(entry)
    }

    setSubmitted(true)
    setTimeout(() => navigate('/elonlarim'), 1200)
  }

  if (submitted) {
    return (
      <main className="main-content">
        <div className="card-surface post-success">
          <div className="post-success-icon">
            <Check size={32} strokeWidth={2.6} />
          </div>
          <h2 className="post-success-title">
            {isEditing ? "E'lon yangilandi!" : "E'lon joylandi!"}
          </h2>
          <p className="post-success-text">
            {isEditing
              ? "Sizni \"Mening e'lonlarim\" sahifasiga yo'naltiramiz..."
              : "E'loningiz admin tomonidan tekshirilgach, sayt bo'ylab ko'rinadi. Holatini \"Mening e'lonlarim\" boʻlimida kuzating."}
          </p>
        </div>
      </main>
    )
  }

  if (!form) {
    return (
      <main className="main-content">
        <section className="listings-head">
          <div>
            <h1 className="page-title">
              <span className="page-title-icon" style={{ background: 'var(--color-primary-soft-2)', color: 'var(--color-primary)' }}>
                <FilePlus size={20} strokeWidth={2} />
              </span>
              E'lon berish
            </h1>
            <p className="listings-subtitle">Mulk turini tanlang</p>
          </div>
        </section>

        <div className="post-type-grid">
          {PROPERTY_TYPES.map(({ id, label, icon: Icon, color, bg }) => (
            <button key={id} type="button" className="post-type-card" onClick={() => selectPropertyType(id)}>
              <span className="post-type-icon" style={{ background: bg, color }}>
                <Icon size={26} strokeWidth={1.9} />
              </span>
              <span className="post-type-label">{label}</span>
            </button>
          ))}
        </div>
      </main>
    )
  }

  return (
    <main className="main-content">
      <section className="listings-head">
        <div>
          <h1 className="page-title">
            <span className="page-title-icon" style={{ background: 'var(--color-primary-soft-2)', color: 'var(--color-primary)' }}>
              {isEditing ? <FilePen size={20} strokeWidth={2} /> : <FilePlus size={20} strokeWidth={2} />}
            </span>
            {isEditing ? "E'lonni tahrirlash" : `E'lon berish — ${config.label}`}
          </h1>
          <p className="listings-subtitle">Mulkingiz haqida to'liq ma'lumot kiriting</p>
        </div>
        {!isEditing && (
          <button type="button" className="post-back-btn" onClick={() => setForm(null)}>
            <ArrowLeft size={16} strokeWidth={2.2} />
            Mulk turini almashtirish
          </button>
        )}
      </section>

      <form className="card-surface post-form" onSubmit={handleSubmit}>
        <h2 className="post-section-title">Asosiy ma'lumotlar</h2>
        <div className="post-grid">
          <label className="post-field post-field-full">
            <span>Sarlavha</span>
            <input
              required
              placeholder={`Mas: ${config.label} - ${form.location || 'Toshkent'}`}
              value={form.title}
              onChange={(e) => update('title', e.target.value)}
            />
          </label>

          {form.propertyType !== 'yer' && (
            <label className="post-field">
              <span>E'lon turi</span>
              <select value={form.unit} onChange={(e) => update('unit', e.target.value)}>
                {UNITS.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.label}
                  </option>
                ))}
              </select>
            </label>
          )}

          <label className="post-field">
            <span>Narx ($)</span>
            <input
              required
              type="number"
              min="0"
              placeholder="Mas: 45000"
              value={form.price}
              onChange={(e) => update('price', e.target.value)}
            />
          </label>

          <label className="post-field">
            <span>Manzil</span>
            <input
              required
              placeholder="Mas: Toshkent, Chilonzor"
              value={form.location}
              onChange={(e) => update('location', e.target.value)}
            />
          </label>

          <label className="post-field">
            <span>Telefon</span>
            <input
              required
              placeholder="+998 90 123 45 67"
              value={form.phone}
              onChange={(e) => update('phone', e.target.value)}
            />
          </label>
        </div>

        <h2 className="post-section-title">Mulk xususiyatlari</h2>
        <div className="post-grid">
          {config.fields.map((field) => {
            if (field.showIf && !field.showIf(form.details)) return null
            const value = form.details[field.key]

            if (field.type === 'toggle') {
              return (
                <div key={field.key} className="post-field">
                  <span>{field.label}</span>
                  <div className="post-toggle">
                    {['Bor', "Yo'q"].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        className={`post-toggle-btn${value === opt ? ' is-active' : ''}`}
                        onClick={() => updateDetail(field.key, opt)}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )
            }

            if (field.type === 'select') {
              return (
                <label key={field.key} className="post-field">
                  <span>{field.label}</span>
                  <select value={value} onChange={(e) => updateDetail(field.key, e.target.value)}>
                    <option value="">Tanlang</option>
                    {field.options.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </label>
              )
            }

            if (field.type === 'textarea') {
              return (
                <label key={field.key} className="post-field post-field-full">
                  <span>{field.label}</span>
                  <textarea
                    rows={3}
                    placeholder={field.placeholder}
                    value={value}
                    onChange={(e) => updateDetail(field.key, e.target.value)}
                  />
                </label>
              )
            }

            return (
              <label key={field.key} className="post-field">
                <span>{field.label}{field.suffix ? ` (${field.suffix.trim()})` : ''}</span>
                <input
                  placeholder={field.placeholder}
                  value={value}
                  onChange={(e) => updateDetail(field.key, e.target.value)}
                />
              </label>
            )
          })}
        </div>

        <h2 className="post-section-title">Tavsif va rasm</h2>
        <div className="post-grid">
          <label className="post-field post-field-full">
            <div className="post-field-label-row">
              <span>Tavsif (avtomatik to'ldiriladi, tahrirlash mumkin)</span>
              <button type="button" className="post-regenerate-btn" onClick={handleRegenerateClick}>
                <RefreshCw size={13} strokeWidth={2.2} />
                Avtomatik to'ldirish
              </button>
            </div>
            <textarea
              required
              rows={10}
              value={form.description}
              onChange={(e) => handleDescriptionChange(e.target.value)}
            />
          </label>

          <label className="post-field post-field-full">
            <span>Rasm URL</span>
            <div className="post-image-row">
              <ImageIcon size={18} strokeWidth={2} color="#94A3B8" />
              <input
                placeholder="https://..."
                value={form.image}
                onChange={(e) => update('image', e.target.value)}
              />
            </div>
          </label>

          {form.image && (
            <div className="post-field-full post-image-preview">
              <img src={form.image} alt="Oldindan ko'rish" />
            </div>
          )}
        </div>

        <div className="post-footer">
          <button type="button" className="post-cancel-btn" onClick={() => navigate(-1)}>
            Bekor qilish
          </button>
          <button type="submit" className="post-submit-btn">
            {isEditing ? 'Saqlash' : "E'lonni joylash"}
          </button>
        </div>
      </form>
    </main>
  )
}
