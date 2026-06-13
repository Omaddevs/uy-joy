import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, Heart, Bell, LogIn, UserPlus, ChevronDown } from 'lucide-react'
import RegionPicker from './RegionPicker.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { useNotifications } from '../context/NotificationsContext.jsx'
import NotificationsPanel from './NotificationsPanel.jsx'
import ProfileMenu from './ProfileMenu.jsx'
import './Header.css'

export default function Header() {
  const { user } = useAuth()
  const { unreadCount } = useNotifications()
  const navigate = useNavigate()
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const notifRef = useRef(null)
  const profileRef = useRef(null)

  useEffect(() => {
    function handleClick(e) {
      if (notifRef.current && !notifRef.current.contains(e.target)) setShowNotifications(false)
      if (profileRef.current && !profileRef.current.contains(e.target)) setShowProfile(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <header className="header">
      <div className="header-search">
        <Search className="header-search-icon" size={19} strokeWidth={2} />
        <input
          className="header-search-input"
          placeholder="Qidirish (masalan: Toshkent, Chilonzor, 3 xonali)"
        />
        <RegionPicker buttonClassName="header-location" />
      </div>

      <div className="header-actions">
        <Link to="/sevimlilar" className="header-fav-btn">
          <Heart size={18} strokeWidth={1.9} color="#EF4444" />
          <span>Sevimlilar</span>
        </Link>
        <div className="header-notif-wrap" ref={notifRef}>
          <button
            className="header-bell-btn"
            onClick={() => setShowNotifications((s) => !s)}
            aria-label="Bildirishnomalar"
          >
            <Bell size={19} strokeWidth={1.9} color="#475569" />
            {unreadCount > 0 && <span className="header-bell-badge">{unreadCount}</span>}
          </button>
          {showNotifications && <NotificationsPanel onClose={() => setShowNotifications(false)} />}
        </div>
        {user ? (
          <div className="header-profile-wrap" ref={profileRef}>
            <button className="header-profile" onClick={() => setShowProfile((s) => !s)}>
              <div className="header-avatar">
                <img src={user.avatar} alt={user.name} />
              </div>
              <span className="header-username">{user.name}</span>
              <ChevronDown size={15} strokeWidth={2} color="#94A3B8" />
            </button>
            {showProfile && <ProfileMenu onClose={() => setShowProfile(false)} />}
          </div>
        ) : (
          <div className="header-auth-buttons">
            <button className="header-login-btn" onClick={() => navigate('/kirish')}>
              <LogIn size={16} strokeWidth={2.2} />
              Kirish
            </button>
            <button className="header-register-btn" onClick={() => navigate('/royxatdan-otish')}>
              <UserPlus size={16} strokeWidth={2.2} />
              Ro'yxatdan o'tish
            </button>
          </div>
        )}
      </div>
    </header>
  )
}
