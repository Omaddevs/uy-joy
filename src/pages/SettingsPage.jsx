import { useState } from 'react'
import { Bell, Globe, Lock, User, Check } from 'lucide-react'
import './ListingsPage.css'
import './SettingsPage.css'

const TABS = [
  { id: 'profile', label: 'Profil', icon: User },
  { id: 'security', label: 'Xavfsizlik', icon: Lock },
  { id: 'notifications', label: 'Bildirishnomalar', icon: Bell },
  { id: 'language', label: 'Til', icon: Globe },
]

export default function SettingsPage() {
  const [tab, setTab] = useState('profile')
  const [profile, setProfile] = useState({
    name: 'Akmal Karimov',
    phone: '+998 90 123 45 67',
    email: 'akmal.karimov@example.com',
    location: 'Toshkent, Chilonzor',
  })
  const [notifications, setNotifications] = useState({
    messages: true,
    favorites: true,
    promotions: false,
    weeklyDigest: true,
  })
  const [language, setLanguage] = useState('uz')
  const [saved, setSaved] = useState(false)

  const updateProfile = (key, value) => setProfile((p) => ({ ...p, [key]: value }))
  const toggleNotification = (key) => setNotifications((n) => ({ ...n, [key]: !n[key] }))

  const save = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2200)
  }

  return (
    <main className="main-content">
      <section className="listings-head">
        <div>
          <h1 className="listings-title">⚙️ Sozlamalar</h1>
          <p className="listings-subtitle">Profil va ilova sozlamalarini boshqaring</p>
        </div>
      </section>

      <div className="settings-layout">
        <nav className="settings-tabs card-surface">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              className={`settings-tab${tab === id ? ' is-active' : ''}`}
              onClick={() => setTab(id)}
            >
              <Icon size={18} strokeWidth={2} />
              {label}
            </button>
          ))}
        </nav>

        <div className="card-surface settings-content">
          {tab === 'profile' && (
            <>
              <h2 className="settings-section-title">Profil maʼlumotlari</h2>
              <div className="settings-avatar-row">
                <img
                  className="settings-avatar"
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&q=80&auto=format&fit=crop"
                  alt="Avatar"
                />
                <button className="settings-secondary-btn">Rasmni almashtirish</button>
              </div>
              <div className="settings-grid">
                <label className="settings-field">
                  <span>Ism familiya</span>
                  <input value={profile.name} onChange={(e) => updateProfile('name', e.target.value)} />
                </label>
                <label className="settings-field">
                  <span>Telefon raqam</span>
                  <input value={profile.phone} onChange={(e) => updateProfile('phone', e.target.value)} />
                </label>
                <label className="settings-field">
                  <span>Email</span>
                  <input value={profile.email} onChange={(e) => updateProfile('email', e.target.value)} />
                </label>
                <label className="settings-field">
                  <span>Manzil</span>
                  <input value={profile.location} onChange={(e) => updateProfile('location', e.target.value)} />
                </label>
              </div>
            </>
          )}

          {tab === 'security' && (
            <>
              <h2 className="settings-section-title">Xavfsizlik</h2>
              <div className="settings-grid">
                <label className="settings-field">
                  <span>Joriy parol</span>
                  <input type="password" placeholder="••••••••" />
                </label>
                <div />
                <label className="settings-field">
                  <span>Yangi parol</span>
                  <input type="password" placeholder="••••••••" />
                </label>
                <label className="settings-field">
                  <span>Yangi parolni tasdiqlang</span>
                  <input type="password" placeholder="••••••••" />
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
