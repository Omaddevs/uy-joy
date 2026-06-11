import { NavLink } from 'react-router-dom'
import { Home, Search, Heart, MessageSquare, User } from 'lucide-react'
import './BottomNav.css'

const NAV_ITEMS = [
  { to: '/', label: 'Asosiy', icon: Home, end: true },
  { to: '/sotuv', label: 'Qidirish', icon: Search },
  { to: '/sevimlilar', label: 'Sevimlilar', icon: Heart },
  { to: '/xabarlar', label: 'Xabarlar', icon: MessageSquare, badge: 2 },
  { to: '/sozlamalar', label: 'Profil', icon: User },
]

export default function BottomNav() {
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
