import { ArrowUp, FileText, Heart, History, ChevronRight } from 'lucide-react'
import './QuickActions.css'

const ACTIONS = [
  {
    id: 'publish',
    icon: ArrowUp,
    iconColor: '#4F46E5',
    iconBg: 'var(--color-primary-soft-2)',
    title: "E'lon berish",
    text: 'Mulkingizni sotish yoki ijaraga berish',
  },
  {
    id: 'my-listings',
    icon: FileText,
    iconColor: '#F97316',
    iconBg: 'var(--color-orange-soft)',
    title: "E'lonlarim",
    text: "Joylashtirgan e'lonlaringiz",
  },
  {
    id: 'favorites',
    icon: Heart,
    iconColor: '#EF4444',
    iconBg: 'var(--color-danger-soft)',
    title: 'Sevimlilar',
    text: "Saqlangan e'lonlaringiz",
  },
  {
    id: 'history',
    icon: History,
    iconColor: '#4F46E5',
    iconBg: 'var(--color-primary-soft-2)',
    title: "So'nggi ko'rganlar",
    text: "Ko'rgan e'lonlaringiz tarixi",
  },
]

export default function QuickActions() {
  return (
    <section className="card-surface quick-actions">
      <h3 className="quick-actions-title">Tezkor amallar</h3>
      <div className="quick-actions-list">
        {ACTIONS.map(({ id, icon: Icon, iconColor, iconBg, title, text }) => (
          <div key={id} className="quick-action">
            <div className="quick-action-icon" style={{ background: iconBg }}>
              <Icon size={20} strokeWidth={2} color={iconColor} />
            </div>
            <div className="quick-action-body">
              <div className="quick-action-title">{title}</div>
              <div className="quick-action-text">{text}</div>
            </div>
            <ChevronRight size={17} strokeWidth={2.2} color="#CBD5E1" />
          </div>
        ))}
      </div>
    </section>
  )
}
