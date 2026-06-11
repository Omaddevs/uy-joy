import { ShieldCheck, Search, Lock, Headset } from 'lucide-react'
import './TrustBadges.css'

const BADGES = [
  {
    id: 'trust',
    icon: ShieldCheck,
    iconColor: '#16A34A',
    iconBg: 'var(--color-success-soft)',
    title: 'Ishonchli platforma',
    text: "E'lonlar tekshiriladi",
  },
  {
    id: 'search',
    icon: Search,
    iconColor: '#4F46E5',
    iconBg: 'var(--color-primary-soft-2)',
    title: 'Tez va oson qidiruv',
    text: 'Kerakli mulkni topish oson',
  },
  {
    id: 'secure',
    icon: Lock,
    iconColor: '#7C3AED',
    iconBg: 'var(--color-purple-soft)',
    title: 'Xavfsiz bitimlar',
    text: 'Xavfsizlik bizning ustuvorligimiz',
  },
  {
    id: 'support',
    icon: Headset,
    iconColor: '#EF4444',
    iconBg: 'var(--color-danger-soft)',
    title: "24/7 qo'llab-quvvatlash",
    text: 'Har doim siz uchun',
  },
]

export default function TrustBadges() {
  return (
    <section className="trust-badges">
      {BADGES.map(({ id, icon: Icon, iconColor, iconBg, title, text }) => (
        <div key={id} className="trust-badge">
          <div className="trust-badge-icon" style={{ background: iconBg }}>
            <Icon size={21} strokeWidth={2} color={iconColor} />
          </div>
          <div>
            <div className="trust-badge-title">{title}</div>
            <div className="trust-badge-text">{text}</div>
          </div>
        </div>
      ))}
    </section>
  )
}
