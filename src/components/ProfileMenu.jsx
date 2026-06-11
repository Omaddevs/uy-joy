import { Link, useNavigate } from 'react-router-dom'
import { User, Lock, Bell, Globe, LogOut } from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'
import './ProfileMenu.css'

const MENU_ITEMS = [
  { tab: 'profile', label: 'Profil', icon: User },
  { tab: 'security', label: 'Xavfsizlik', icon: Lock },
  { tab: 'notifications', label: 'Bildirishnomalar', icon: Bell },
  { tab: 'language', label: 'Til', icon: Globe },
]

export default function ProfileMenu({ onClose }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    onClose?.()
    navigate('/')
  }

  return (
    <div className="profile-menu">
      <div className="profile-menu-head">
        <img className="profile-menu-avatar" src={user.avatar} alt={user.name} />
        <div className="profile-menu-info">
          <div className="profile-menu-name">{user.name}</div>
          <div className="profile-menu-email">{user.email}</div>
        </div>
      </div>

      <div className="profile-menu-list">
        {MENU_ITEMS.map(({ tab, label, icon: Icon }) => (
          <Link key={tab} to={`/sozlamalar?tab=${tab}`} className="profile-menu-item" onClick={onClose}>
            <Icon size={17} strokeWidth={2} />
            {label}
          </Link>
        ))}
      </div>

      <button className="profile-menu-logout" onClick={handleLogout}>
        <LogOut size={17} strokeWidth={2} />
        Chiqish
      </button>
    </div>
  )
}
