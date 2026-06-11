import { NavLink } from 'react-router-dom'
import { Home, Search, Heart, FileText, User, LogIn } from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'
import './BottomNav.css'

const BASE_NAV_ITEMS = [
  { to: '/', label: 'Asosiy', icon: Home, end: true },
  { to: '/sotuv', label: 'Qidirish', icon: Search },
  { to: '/sevimlilar', label: 'Sevimlilar', icon: Heart },
  { to: '/elonlarim', label: "E'lonlarim", icon: FileText },
]

export default function BottomNav() {
  const { user } = useAuth()

  const NAV_ITEMS = [
    ...BASE_NAV_ITEMS,
    user
      ? { to: '/sozlamalar', label: 'Profil', icon: User }
      : { to: '/kirish', label: 'Kirish', icon: LogIn },
  ]

  return (
    <nav className="bottom-nav mobile-only">
      {NAV_ITEMS.map(({ to, label, icon: Icon, badge, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={({ isActive }) => `bottom-nav-link${isActive ? ' is-active' : ''}`}
        >
          <span className="bottom-nav-icon">
            <Icon size={22} strokeWidth={2} />
            {badge && <span className="bottom-nav-badge">{badge}</span>}
          </span>
          <span className="bottom-nav-label">{label}</span>
        </NavLink>
      ))}
    </nav>
  )
}
