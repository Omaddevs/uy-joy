import { Link } from 'react-router-dom'
import { MessageSquare, Heart, FileCheck2, Sparkles, CheckCheck, BellOff } from 'lucide-react'
import { useNotifications } from '../context/NotificationsContext.jsx'
import './NotificationsPanel.css'

const TYPE_ICONS = {
  message: { icon: MessageSquare, bg: 'var(--color-primary-soft)', color: 'var(--color-primary)' },
  favorite: { icon: Heart, bg: 'var(--color-danger-soft)', color: 'var(--color-danger)' },
  listing: { icon: FileCheck2, bg: 'var(--color-success-soft)', color: 'var(--color-success)' },
  system: { icon: Sparkles, bg: 'var(--color-purple-soft)', color: 'var(--color-purple)' },
}

export default function NotificationsPanel({ onClose }) {
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications()

  return (
    <div className="notifications-panel">
      <div className="notifications-panel-head">
        <h3>Bildirishnomalar</h3>
        {unreadCount > 0 && (
          <button className="notifications-mark-all" onClick={markAllAsRead}>
            <CheckCheck size={14} strokeWidth={2.4} />
            Barchasini o'qish
          </button>
        )}
      </div>

      {notifications.length > 0 ? (
        <div className="notifications-list">
          {notifications.map((n) => {
            const meta = TYPE_ICONS[n.type] || TYPE_ICONS.system
            const Icon = meta.icon
            return (
              <Link
                key={n.id}
                to={n.link || '#'}
                className={`notification-item${!n.read ? ' is-unread' : ''}`}
                onClick={() => {
                  markAsRead(n.id)
                  onClose?.()
                }}
              >
                <span className="notification-icon" style={{ background: meta.bg, color: meta.color }}>
                  <Icon size={17} strokeWidth={2} />
                </span>
                <span className="notification-body">
                  <span className="notification-title">{n.title}</span>
                  <span className="notification-text">{n.text}</span>
                  <span className="notification-time">{n.time}</span>
                </span>
                {!n.read && <span className="notification-dot" aria-hidden="true" />}
              </Link>
            )
          })}
        </div>
      ) : (
        <div className="notifications-empty">
          <BellOff size={28} strokeWidth={1.6} />
          Hozircha bildirishnomalar yo'q
        </div>
      )}
    </div>
  )
}
