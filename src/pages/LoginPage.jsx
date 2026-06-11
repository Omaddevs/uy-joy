import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff, AlertCircle, LogIn } from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'
import './AuthPage.css'

export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    try {
      login({ email, password })
      navigate(from, { replace: true })
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="card-surface auth-card">
          <h1 className="auth-title">Tizimga kirish</h1>
          <p className="auth-subtitle">Eʻlon joylash, sevimlilarga qoʻshish va xabar yozish uchun hisobingizga kiring</p>

          {error && (
            <div className="auth-error">
              <AlertCircle size={16} strokeWidth={2.4} />
              {error}
            </div>
          )}

          <form className="auth-form" onSubmit={handleSubmit}>
            <label className="auth-field">
              <span>Email</span>
              <div className="auth-input-wrap">
                <Mail size={17} strokeWidth={2} className="auth-input-icon" />
                <input
                  type="email"
                  required
                  placeholder="email@misol.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </label>

            <label className="auth-field">
              <span>Parol</span>
              <div className="auth-input-wrap">
                <Lock size={17} strokeWidth={2} className="auth-input-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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

            <button type="submit" className="auth-submit-btn">
              <LogIn size={18} strokeWidth={2.2} style={{ marginRight: 8, verticalAlign: 'middle' }} />
              Kirish
            </button>
          </form>

          <div className="auth-divider">yoki</div>
          <div className="auth-hint">
            Demo admin hisob: <strong>admin@uytop.uz</strong> / <strong>admin123</strong> — Statistika bo'limini ko'rish uchun
          </div>

          <p className="auth-footer-text">
            Hisobingiz yo'qmi? <Link to="/royxatdan-otish" state={{ from: location.state?.from }}>Ro'yxatdan o'tish</Link>
          </p>
    </div>
  )
}
