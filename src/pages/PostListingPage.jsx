import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Check, Image as ImageIcon, Wifi } from 'lucide-react'
import { CATEGORIES } from '../data/categories.js'
import { LISTINGS_BY_ID } from '../data/listings.js'
import './ListingsPage.css'
import './PostListingPage.css'

const UNITS = [
  { id: '', label: 'Sotuv narxi' },
  { id: ' / oy', label: 'Oylik ijara' },
  { id: ' / kun', label: 'Kunlik ijara' },
]

const FEATURE_FIELDS = [
  { key: 'rooms', label: 'Xonalar soni', placeholder: 'Mas: 3 xona' },
  { key: 'area', label: 'Maydon', placeholder: 'Mas: 85 m²' },
  { key: 'land', label: 'Yer maydoni', placeholder: 'Mas: 2 sotix' },
  { key: 'floor', label: 'Qavat', placeholder: 'Mas: 4/9 qavat' },
]

function buildInitialState(editingListing) {
  if (!editingListing) {
    return {
      category: 'sotuv',
      title: '',
      price: '',
      unit: '',
      location: '',
      description: '',
      image: '',
      features: { rooms: '', area: '', land: '', floor: '' },
      wifi: false,
    }
  }

  const featureMap = Object.fromEntries(editingListing.features || [])
  return {
    category: editingListing.category,
    title: editingListing.title,
    price: editingListing.price.replace(/[^\d.]/g, ''),
    unit: editingListing.unit || '',
    location: editingListing.location,
    description: editingListing.description,
    image: editingListing.img || '',
    features: {
      rooms: featureMap.rooms || '',
      area: featureMap.area || '',
      land: featureMap.land || '',
      floor: featureMap.floor || '',
    },
    wifi: Boolean(featureMap.wifi),
  }
}

export default function PostListingPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const editId = searchParams.get('edit')
  const editingListing = editId ? LISTINGS_BY_ID[editId] : null

  const [form, setForm] = useState(() => buildInitialState(editingListing))
  const [submitted, setSubmitted] = useState(false)

  const update = (key, value) => setForm((f) => ({ ...f, [key]: value }))
  const updateFeature = (key, value) =>
    setForm((f) => ({ ...f, features: { ...f.features, [key]: value } }))

  const handleSubmit = (e) => {
    e.preventDefault()
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
            {editingListing ? "E'lon yangilandi!" : "E'lon joylandi!"}
          </h2>
          <p className="post-success-text">Sizni "Mening e'lonlarim" sahifasiga yo'naltiramiz...</p>
        </div>
      </main>
    )
  }

  return (
    <main className="main-content">
      <section className="listings-head">
        <div>
          <h1 className="listings-title">{editingListing ? "✏️ E'lonni tahrirlash" : "📝 E'lon berish"}</h1>
          <p className="listings-subtitle">
            {editingListing ? "E'lon ma'lumotlarini yangilang" : "Mulkingiz haqida to'liq ma'lumot kiriting"}
          </p>
        </div>
      </section>

      <form className="card-surface post-form" onSubmit={handleSubmit}>
        <h2 className="post-section-title">Asosiy ma'lumotlar</h2>
        <div className="post-grid">
          <label className="post-field post-field-full">
            <span>Sarlavha</span>
            <input
              required
              placeholder="Mas: Chilonzor tumani, 4 xonali hovli"
              value={form.title}
              onChange={(e) => update('title', e.target.value)}
            />
          </label>

          <label className="post-field">
            <span>Kategoriya</span>
            <select value={form.category} onChange={(e) => update('category', e.target.value)}>
              {CATEGORIES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.emoji} {c.label}
                </option>
              ))}
            </select>
          </label>

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

          <label className="post-field">
            <span>Narx ($)</span>
            <input
              required
              type="number"
              min="0"
              placeholder="Mas: 150000"
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
        </div>

        <h2 className="post-section-title">Xususiyatlar</h2>
        <div className="post-grid">
          {FEATURE_FIELDS.map(({ key, label, placeholder }) => (
            <label key={key} className="post-field">
              <span>{label}</span>
              <input
                placeholder={placeholder}
                value={form.features[key]}
                onChange={(e) => updateFeature(key, e.target.value)}
              />
            </label>
          ))}
          <label className="post-field post-checkbox-field">
            <input
              type="checkbox"
              checked={form.wifi}
              onChange={(e) => update('wifi', e.target.checked)}
            />
            <Wifi size={16} strokeWidth={2} />
            <span>Wi-Fi mavjud</span>
          </label>
        </div>

        <h2 className="post-section-title">Tavsif va rasm</h2>
        <div className="post-grid">
          <label className="post-field post-field-full">
            <span>Tavsif</span>
            <textarea
              required
              rows={5}
              placeholder="Mulk haqida batafsil ma'lumot yozing..."
              value={form.description}
              onChange={(e) => update('description', e.target.value)}
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
            {editingListing ? "Saqlash" : "E'lonni joylash"}
          </button>
        </div>
      </form>
    </main>
  )
}
