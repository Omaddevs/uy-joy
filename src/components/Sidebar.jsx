import { NavLink, useNavigate } from 'react-router-dom'
import {
  Home,
  Key,
  Trees,
  Mountain,
  Building2,
  Hotel,
  Heart,
  FileText,
  BarChart3,
  Settings,
  Plus,
  LogOut,
  ShieldCheck,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'
import './Sidebar.css'

const BASE_NAV_ITEMS = [
  { to: '/', label: 'Asosiy', icon: Home, end: true },
  { to: '/sotuv', label: 'Sotuvdagi uylar', icon: Building2 },
  { to: '/ijara', label: 'Ijara', icon: Key },
  { to: '/yer', label: 'Quruq yerlar', icon: Trees },
  { to: '/dacha', label: 'Dachalar', icon: Mountain },
  { to: '/mexmonxona', label: 'Mexmonxonalar', icon: Hotel },
  { to: '/sevimlilar', label: 'Sevimlilar', icon: Heart },
  { to: '/elonlarim', label: "Mening e'lonlarim", icon: FileText },
  { to: '/sozlamalar', label: 'Sozlamalar', icon: Settings },
]

const ADMIN_NAV_ITEM = { to: '/statistika', label: 'Statistika', icon: BarChart3 }

export default function Sidebar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const navItems =
    user?.role === 'admin'
      ? [...BASE_NAV_ITEMS.slice(0, -1), ADMIN_NAV_ITEM, BASE_NAV_ITEMS[BASE_NAV_ITEMS.length - 1]]
      : BASE_NAV_ITEMS

  const handleLogout = () => {
    logout()
    navigate('/')
  }

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
        {navItems.map(({ to, label, icon: Icon, badge, end }) => (
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

      {user ? (
        <div className="sidebar-account">
          <div className="sidebar-account-card">
            <NavLink to="/sozlamalar" className="sidebar-account-link">
              <img className="sidebar-account-avatar" src={user.avatar} alt={user.name} />
              <div className="sidebar-account-body">
                <div className="sidebar-account-name">
                  {user.name}
                  {user.role === 'admin' && <ShieldCheck size={14} strokeWidth={2.4} color="var(--color-primary)" />}
                </div>
                <div className="sidebar-account-email">{user.email}</div>
              </div>
            </NavLink>
          </div>
          <button className="sidebar-logout-btn" onClick={handleLogout}>
            <LogOut size={17} strokeWidth={2} />
            Chiqish
          </button>
        </div>
      ) : (
        <div className="sidebar-account">
          <button className="sidebar-login-btn" onClick={() => navigate('/kirish')}>
            <LogOut size={17} strokeWidth={2} />
            Tizimga kirish
          </button>
        </div>
      )}
    </aside>
  )
}
