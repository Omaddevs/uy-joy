import { Link, Outlet } from 'react-router-dom'
import { Home, ShieldCheck, Heart, MessageSquare, TrendingUp } from 'lucide-react'
import '../pages/AuthPage.css'
import './AuthLayout.css'

const FEATURES = [
  { icon: ShieldCheck, text: "Ishonchli sotuvchilar va tekshirilgan e'lonlar" },
  { icon: Heart, text: "Yoqqan e'lonlarni saqlang va kuzatib boring" },
  { icon: MessageSquare, text: "Sotuvchilar bilan to'g'ridan-to'g'ri yozishing" },
  { icon: TrendingUp, text: "Narxlar o'zgarishidan birinchi bo'lib xabardor bo'ling" },
]

export default function AuthLayout() {
  return (
    <div className="auth-screen">
      <aside className="auth-screen-brand">
        <Link to="/" className="auth-screen-logo">
          <div className="auth-logo-icon">
            <Home size={20} strokeWidth={2} />
          </div>
          <span className="auth-logo-text">
            Uy<span className="auth-logo-accent">Top</span>
          </span>
        </Link>

        <div className="auth-screen-brand-content">
          <h2>Orzuyingizdagi uyni topishning eng qulay yo'li</h2>
          <p>Minglab uy, kvartira, dacha va tijorat obyektlari — bir joyda.</p>
          <ul className="auth-screen-features">
            {FEATURES.map(({ icon: Icon, text }) => (
              <li key={text}>
                <span className="auth-screen-feature-icon">
                  <Icon size={16} strokeWidth={2.2} />
                </span>
                {text}
              </li>
            ))}
          </ul>
        </div>

        <div className="auth-screen-glow auth-screen-glow-1" />
        <div className="auth-screen-glow auth-screen-glow-2" />
      </aside>

      <main className="auth-screen-form">
        <Link to="/" className="auth-screen-mobile-logo">
          <div className="auth-logo-icon">
            <Home size={18} strokeWidth={2} />
          </div>
          <span className="auth-logo-text">
            Uy<span className="auth-logo-accent">Top</span>
          </span>
        </Link>

        <div className="auth-wrap">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
