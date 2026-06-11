import { NavLink } from 'react-router-dom'
import {
  Home,
  Key,
  Trees,
  Mountain,
  Building,
  Heart,
  FileText,
  MessageSquare,
  BarChart3,
  Settings,
  Plus,
} from 'lucide-react'
import './Sidebar.css'

const NAV_ITEMS = [
  { to: '/', label: 'Asosiy', icon: Home, end: true },
  { to: '/sotuv', label: 'Sotuvdagi uylar', icon: Home },
  { to: '/ijara', label: 'Ijara', icon: Key },
  { to: '/yer', label: 'Quruq yerlar', icon: Trees },
  { to: '/dacha', label: 'Dachalar', icon: Mountain },
  { to: '/mexmonxona', label: 'Mexmonxonalar', icon: Building },
  { to: '/sevimlilar', label: 'Sevimlilar', icon: Heart },
  { to: '/elonlarim', label: "Mening e'lonlarim", icon: FileText },
  { to: '/xabarlar', label: 'Xabarlar', icon: MessageSquare, badge: 2 },
  { to: '/statistika', label: 'Statistika', icon: BarChart3 },
  { to: '/sozlamalar', label: 'Sozlamalar', icon: Settings },
]

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <NavLink to="/" className="sidebar-logo">
        <div className="sidebar-logo-icon">
          <Home size={22} strokeWidth={2} color="#fff" />
        </div>
        <span className="sidebar-logo-text">
          Uy<span className="sidebar-logo-accent">Top</span>
        </span>
      </NavLink>

      <nav className="sidebar-nav">
        {NAV_ITEMS.map(({ to, label, icon: Icon, badge, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) => `sidebar-link${isActive ? ' is-active' : ''}`}
          >
            {({ isActive }) => (
              <>
                {isActive && <span className="sidebar-link-indicator" />}
                <Icon size={20} strokeWidth={1.9} />
                <span className="sidebar-link-label">{label}</span>
                {badge && <span className="sidebar-link-badge">{badge}</span>}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-cta">
        <NavLink to="/elon-berish" className="sidebar-publish-btn">
          <Plus size={18} strokeWidth={2.2} />
          E'lon berish
        </NavLink>
      </div>

      <div className="sidebar-app-promo">
        <p className="sidebar-app-promo-title">UyTop ilovasini yuklab oling</p>
        <p className="sidebar-app-promo-text">
          Qidiruv va e'lon joylashni yanada osonlashtiring.
        </p>
        <div className="sidebar-store-buttons">
          <div className="sidebar-store-btn">
            <span className="sidebar-store-icon">▶</span>
            <div>
              <div className="sidebar-store-caption">GET IT ON</div>
              <div className="sidebar-store-name">Google Play</div>
            </div>
          </div>
          <div className="sidebar-store-btn">
            <span className="sidebar-store-icon"></span>
            <div>
              <div className="sidebar-store-caption">Download on the</div>
              <div className="sidebar-store-name">App Store</div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}
