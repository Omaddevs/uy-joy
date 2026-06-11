import { Search, MapPin, ChevronDown, Heart, Bell } from 'lucide-react'
import './Header.css'

export default function Header() {
  return (
    <header className="header">
      <div className="header-search">
        <Search className="header-search-icon" size={19} strokeWidth={2} />
        <input
          className="header-search-input"
          placeholder="Qidirish (masalan: Toshkent, Chilonzor, 3 xonali)"
        />
        <div className="header-location">
          <MapPin size={15} strokeWidth={2} color="#4F46E5" />
          <span>Toshkent</span>
          <ChevronDown size={14} strokeWidth={2} color="#94A3B8" />
        </div>
      </div>

      <div className="header-actions">
        <button className="header-fav-btn">
          <Heart size={18} strokeWidth={1.9} color="#EF4444" />
          <span>Sevimlilar</span>
        </button>
        <button className="header-bell-btn">
          <Bell size={19} strokeWidth={1.9} color="#475569" />
          <span className="header-bell-badge">3</span>
        </button>
        <div className="header-profile">
          <div className="header-avatar">
            <img
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&q=80&auto=format&fit=crop"
              alt="Akmal"
            />
          </div>
          <span className="header-username">Akmal</span>
          <ChevronDown size={15} strokeWidth={2} color="#94A3B8" />
        </div>
      </div>
    </header>
  )
}
