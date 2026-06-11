import { useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Bell, Globe, Lock, User, Check, Settings, LogOut, AlertCircle } from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'
import './ListingsPage.css'
import './SettingsPage.css'

const TABS = [
  { id: 'profile', label: 'Profil', icon: User },
  { id: 'security', label: 'Xavfsizlik', icon: Lock },
  { id: 'notifications', label: 'Bildirishnomalar', icon: Bell },
  { id: 'language', label: 'Til', icon: Globe },
]

const DEFAULT_NOTIFICATIONS = {
  messages: true,
  favorites: true,
  promotions: false,
  weeklyDigest: true,
}

export default function SettingsPage() {
  const { user, updateProfile, logout } = useAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const initialTab = TABS.some((t) => t.id === searchParams.get('tab')) ? searchParams.get('tab') : 'profile'
  const [tab, setTab] = useState(initialTab)
  const fileInputRef = useRef(null)

  const [profile, setProfile] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    email: user?.email || '',
    location: user?.location || '',
    avatar: user?.avatar || '',
  })
  const [passwords, setPasswords] = useState({ current: '', next: '', confirm: '' })
  const [notifications, setNotifications] = useState(user?.notifications || DEFAULT_NOTIFICATIONS)
  const [language, setLanguage] = useState(user?.language || 'uz')

  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  const updateProfileField = (key, value) => setProfile((p) => ({ ...p, [key]: value }))
  const toggleNotification = (key) => setNotifications((n) => ({ ...n, [key]: !n[key] }))

  const handleAvatarPick = () => fileInputRef.current?.click()

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      const dataUrl = reader.result
      setProfile((p) => ({ ...p, avatar: dataUrl }))
      updateProfile({ avatar: dataUrl })
    }
    reader.readAsDataURL(file)
  }

  const showSaved = () => {
    setSaved(true)
    setError('')
    setTimeout(() => setSaved(false), 2200)
  }

  const save = () => {
    if (tab === 'profile') {
      updateProfile({
        name: profile.name,
        phone: profile.phone,
        email: profile.email,
        location: profile.location,
        avatar: profile.avatar,
      })
      showSaved()
      return
    }

    if (tab === 'security') {
      if (!passwords.current || !passwords.next || !passwords.confirm) {
        setError("Barcha parol maydonlarini to'ldiring")
        return
      }
      if (user?.password && passwords.current !== user.password) {
        setError("Joriy parol noto'g'ri")
        return
      }
      if (passwords.next.length < 6) {
        setError("Yangi parol kamida 6 ta belgidan iborat bo'lishi kerak")
        return
      }
      if (passwords.next !== passwords.confirm) {
        setError("Yangi parollar mos kelmadi")
        return
      }
      updateProfile({ password: passwords.next })
      setPasswords({ current: '', next: '', confirm: '' })
      showSaved()
      return
    }

    if (tab === 'notifications') {
      updateProfile({ notifications })
      showSaved()
      return
    }

    if (tab === 'language') {
      updateProfile({ language })
      showSaved()
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <main className="main-content">
      <section className="listings-head">
        <div>
          <h1 className="page-title">
            <span className="page-title-icon" style={{ background: '#F1F3F7', color: 'var(--color-text-muted)' }}>
              <Settings size={20} strokeWidth={2} />
            </span>
            Sozlamalar
          </h1>
          <p className="listings-subtitle">Profil va ilova sozlamalarini boshqaring</p>
        </div>
      </section>

      <div className="settings-layout">
        <nav className="settings-tabs card-surface">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              className={`settings-tab${tab === id ? ' is-active' : ''}`}
              onClick={() => {
                setTab(id)
                setError('')
                setSaved(false)
              }}
            >
              <Icon size={18} strokeWidth={2} />
              {label}
            </button>
          ))}
          <button className="settings-tab settings-tab-logout" onClick={handleLogout}>
            <LogOut size={18} strokeWidth={2} />
            Chiqish
          </button>
        </nav>

        <button className="settings-mobile-logout mobile-only" onClick={handleLogout}>
          <LogOut size={17} strokeWidth={2} />
          Chiqish
        </button>

        <div className="card-surface settings-content">
          {tab === 'profile' && (
            <>
              <h2 className="settings-section-title">Profil maʼlumotlari</h2>
              <div className="settings-avatar-row">
                <img
                  className="settings-avatar"
                  src={profile.avatar || 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&q=80&auto=format&fit=crop'}
                  alt="Avatar"
                />
                <button className="settings-secondary-btn" onClick={handleAvatarPick}>Rasmni almashtirish</button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={handleAvatarChange}
                />
              </div>
              <div className="settings-grid">
                <label className="settings-field">
                  <span>Ism familiya</span>
                  <input value={profile.name} onChange={(e) => updateProfileField('name', e.target.value)} />
                </label>
                <label className="settings-field">
                  <span>Telefon raqam</span>
                  <input value={profile.phone} onChange={(e) => updateProfileField('phone', e.target.value)} />
                </label>
                <label className="settings-field">
                  <span>Email</span>
                  <input value={profile.email} onChange={(e) => updateProfileField('email', e.target.value)} />
                </label>
                <label className="settings-field">
                  <span>Manzil</span>
                  <input value={profile.location} onChange={(e) => updateProfileField('location', e.target.value)} />
                </label>
              </div>
            </>
          )}

          {tab === 'security' && (
            <>
              <h2 className="settings-section-title">Xavfsizlik</h2>
              {error && (
                <div className="settings-alert is-error">
                  <AlertCircle size={16} strokeWidth={2.2} />
                  {error}
                </div>
              )}
              <div className="settings-grid">
                <label className="settings-field">
                  <span>Joriy parol</span>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={passwords.current}
                    onChange={(e) => setPasswords((p) => ({ ...p, current: e.target.value }))}
                  />
                </label>
                <div />
                <label className="settings-field">
                  <span>Yangi parol</span>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={passwords.next}
                    onChange={(e) => setPasswords((p) => ({ ...p, next: e.target.value }))}
                  />
                </label>
                <label className="settings-field">
                  <span>Yangi parolni tasdiqlang</span>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={passwords.confirm}
                    onChange={(e) => setPasswords((p) => ({ ...p, confirm: e.target.value }))}
                  />
                </label>
              </div>
            </>
          )}

          {tab === 'notifications' && (
            <>
              <h2 className="settings-section-title">Bildirishnomalar</h2>
              <div className="settings-toggle-list">
                <ToggleRow
                  title="Yangi xabarlar"
                  text="Sizga yangi xabar kelganda bildirishnoma olish"
                  checked={notifications.messages}
                  onChange={() => toggleNotification('messages')}
                />
                <ToggleRow
                  title="Sevimlilar yangilanishi"
                  text="Saqlangan eʻlon narxi oʻzgarganda xabar berish"
                  checked={notifications.favorites}
                  onChange={() => toggleNotification('favorites')}
                />
                <ToggleRow
                  title="Aksiya va takliflar"
                  text="UyTop tomonidan maxsus takliflar haqida xabarlar"
                  checked={notifications.promotions}
                  onChange={() => toggleNotification('promotions')}
                />
                <ToggleRow
                  title="Haftalik hisobot"
                  text="Eʻlonlaringiz statistikasi boʻyicha haftalik xulosa"
                  checked={notifications.weeklyDigest}
                  onChange={() => toggleNotification('weeklyDigest')}
                />
              </div>
            </>
          )}

          {tab === 'language' && (
            <>
              <h2 className="settings-section-title">Til</h2>
              <div className="settings-language-list">
                {[
                  { id: 'uz', label: "O'zbekcha" },
                  { id: 'ru', label: 'Русский' },
                  { id: 'en', label: 'English' },
                ].map((lang) => (
                  <label key={lang.id} className="settings-language-item">
                    <input
                      type="radio"
                      name="language"
                      checked={language === lang.id}
                      onChange={() => setLanguage(lang.id)}
                    />
                    {lang.label}
                  </label>
                ))}
              </div>
            </>
          )}

          <div className="settings-footer">
            <button className="settings-save-btn" onClick={save}>
              {saved ? <Check size={18} strokeWidth={2.4} /> : null}
              {saved ? 'Saqlandi' : 'Saqlash'}
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}

function ToggleRow({ title, text, checked, onChange }) {
  return (
    <label className="settings-toggle-row">
      <div>
        <div className="settings-toggle-title">{title}</div>
        <div className="settings-toggle-text">{text}</div>
      </div>
      <span className={`settings-switch${checked ? ' is-on' : ''}`}>
        <input type="checkbox" checked={checked} onChange={onChange} />
        <span className="settings-switch-knob" />
      </span>
    </label>
  )
}
