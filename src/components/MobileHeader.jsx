import { Link } from 'react-router-dom'
import { Home, MapPin, ChevronDown, Bell } from 'lucide-react'
import './MobileHeader.css'

export default function MobileHeader() {
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
        <button className="mobile-header-bell" aria-label="Bildirishnomalar">
          <Bell size={19} strokeWidth={2} color="#475569" />
          <span className="mobile-header-badge">3</span>
        </button>
      </div>
    </header>
  )
}
