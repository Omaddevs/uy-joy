import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Mail, Lock, User, Phone, Eye, EyeOff, AlertCircle, UserPlus } from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'
import './AuthPage.css'

export default function RegisterPage() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'

  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirm: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  const update = (key, value) => setForm((f) => ({ ...f, [key]: value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    if (form.password !== form.confirm) {
      setError('Parollar mos kelmadi')
      return
    }
    try {
      register(form)
      navigate(from, { replace: true })
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="card-surface auth-card auth-card-wide">
          <h1 className="auth-title">Ro'yxatdan o'tish</h1>
          <p className="auth-subtitle">Bepul hisob yarating va UyTop imkoniyatlaridan to'liq foydalaning</p>

          {error && (
            <div className="auth-error">
              <AlertCircle size={16} strokeWidth={2.4} />
              {error}
            </div>
          )}

          <form className="auth-form" onSubmit={handleSubmit}>
            <label className="auth-field">
              <span>Ism familiya</span>
              <div className="auth-input-wrap">
                <User size={17} strokeWidth={2} className="auth-input-icon" />
                <input
                  required
                  placeholder="Mas: Akmal Karimov"
                  value={form.name}
                  onChange={(e) => update('name', e.target.value)}
                />
              </div>
            </label>

            <div className="auth-row-2">
              <label className="auth-field">
                <span>Email</span>
                <div className="auth-input-wrap">
                  <Mail size={17} strokeWidth={2} className="auth-input-icon" />
                  <input
                    type="email"
                    required
                    placeholder="email@misol.com"
                    value={form.email}
                    onChange={(e) => update('email', e.target.value)}
                  />
                </div>
              </label>

              <label className="auth-field">
                <span>Telefon</span>
                <div className="auth-input-wrap">
                  <Phone size={17} strokeWidth={2} className="auth-input-icon" />
                  <input
                    placeholder="+998 90 123 45 67"
                    value={form.phone}
                    onChange={(e) => update('phone', e.target.value)}
                  />
                </div>
              </label>
            </div>

            <div className="auth-row-2">
              <label className="auth-field">
                <span>Parol</span>
                <div className="auth-input-wrap">
                  <Lock size={17} strokeWidth={2} className="auth-input-icon" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Kamida 6 ta belgi"
                    value={form.password}
                    onChange={(e) => update('password', e.target.value)}
                  />
                  <button
                    type="button"
                    className="auth-input-toggle"
                    onClick={() => setShowPassword((s) => !s)}
                    aria-label={showPassword ? 'Parolni yashirish' : 'Parolni ko\'rsatish'}
                  >
                    {showPassword ? <EyeOff size={17} strokeWidth={2} /> : <Eye size={17} strokeWidth={2} />}
                  </button>
                </div>
              </label>

              <label className="auth-field">
                <span>Parolni tasdiqlang</span>
                <div className="auth-input-wrap">
                  <Lock size={17} strokeWidth={2} className="auth-input-icon" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••"
                    value={form.confirm}
                    onChange={(e) => update('confirm', e.target.value)}
                  />
                </div>
              </label>
            </div>

            <button type="submit" className="auth-submit-btn">
              <UserPlus size={18} strokeWidth={2.2} style={{ marginRight: 8, verticalAlign: 'middle' }} />
              Ro'yxatdan o'tish
            </button>
          </form>

          <p className="auth-footer-text">
            Hisobingiz bormi? <Link to="/kirish" state={{ from: location.state?.from }}>Tizimga kirish</Link>
          </p>
    </div>
  )
}
