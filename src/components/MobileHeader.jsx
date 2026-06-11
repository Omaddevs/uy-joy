import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Home, MapPin, ChevronDown, Bell } from 'lucide-react'
import { useNotifications } from '../context/NotificationsContext.jsx'
import NotificationsPanel from './NotificationsPanel.jsx'
import './MobileHeader.css'

export default function MobileHeader() {
  const { unreadCount } = useNotifications()
  const [showNotifications, setShowNotifications] = useState(false)
  const notifRef = useRef(null)

  useEffect(() => {
    function handleClick(e) {
      if (notifRef.current && !notifRef.current.contains(e.target)) setShowNotifications(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <header className="mobile-header mobile-only">
      <Link to="/" className="mobile-header-logo">
        <div className="mobile-header-logo-icon">
          <Home size={18} strokeWidth={2} color="#fff" />
        </div>
        <span className="mobile-header-logo-text">
          Uy<span className="mobile-header-logo-accent">Top</span>
        </span>
      </Link>

      <div className="mobile-header-actions">
        <button className="mobile-header-location">
          <MapPin size={14} strokeWidth={2} color="#4F46E5" />
          Toshkent
          <ChevronDown size={14} strokeWidth={2} color="#94A3B8" />
        </button>
        <div className="mobile-header-notif-wrap" ref={notifRef}>
          <button
            className="mobile-header-bell"
            aria-label="Bildirishnomalar"
            onClick={() => setShowNotifications((s) => !s)}
          >
            <Bell size={19} strokeWidth={2} color="#475569" />
            {unreadCount > 0 && <span className="mobile-header-badge">{unreadCount}</span>}
          </button>
          {showNotifications && <NotificationsPanel onClose={() => setShowNotifications(false)} />}
        </div>
      </div>
    </header>
  )
}
