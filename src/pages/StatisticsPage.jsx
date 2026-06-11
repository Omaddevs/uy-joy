import { Eye, Heart, PhoneCall, FileText, ArrowUp, ArrowDown, BarChart3 } from 'lucide-react'
import MarketStats from '../components/MarketStats.jsx'
import './ListingsPage.css'
import './StatisticsPage.css'

const SUMMARY = [
  { id: 'views', icon: Eye, label: "Jami ko'rishlar", value: '8 240', change: '+18%', up: true, color: '#4F46E5', bg: '#E8EEFF' },
  { id: 'listings', icon: FileText, label: "Faol e'lonlar", value: '3', change: '+1', up: true, color: '#F97316', bg: '#FFF1E6' },
  { id: 'calls', icon: PhoneCall, label: "Qo'ng'iroqlar", value: '5', change: '+2', up: true, color: '#16A34A', bg: '#E7F8EE' },
  { id: 'favorites', icon: Heart, label: 'Sevimliga qoʻshilgan', value: '12', change: '-3%', up: false, color: '#EF4444', bg: '#FDECEC' },
]

const MONTHLY_VIEWS = [
  { month: 'Yan', value: 320 },
  { month: 'Fev', value: 480 },
  { month: 'Mar', value: 410 },
  { month: 'Apr', value: 620 },
  { month: 'May', value: 740 },
  { month: 'Iyun', value: 980 },
]

const maxViews = Math.max(...MONTHLY_VIEWS.map((m) => m.value))

export default function StatisticsPage() {
  return (
    <main className="main-content">
      <section className="listings-head">
        <div>
          <h1 className="page-title">
            <span className="page-title-icon" style={{ background: 'var(--color-primary-soft-2)', color: 'var(--color-primary)' }}>
              <BarChart3 size={20} strokeWidth={2} />
            </span>
            Statistika
          </h1>
          <p className="listings-subtitle">Eʻlonlaringiz boʻyicha umumiy koʻrsatkichlar</p>
        </div>
      </section>

      <section className="stats-summary">
        {SUMMARY.map(({ id, icon: Icon, label, value, change, up, color, bg }) => (
          <div key={id} className="card-surface stats-summary-card">
            <div className="stats-summary-icon" style={{ background: bg }}>
              <Icon size={20} strokeWidth={2} color={color} />
            </div>
            <div className="stats-summary-value">{value}</div>
            <div className="stats-summary-label">{label}</div>
            <div className={`stats-summary-change${up ? ' is-up' : ' is-down'}`}>
              {up ? <ArrowUp size={12} strokeWidth={3} /> : <ArrowDown size={12} strokeWidth={3} />}
              {change}
            </div>
          </div>
        ))}
      </section>

      <section className="card-surface stats-chart-card">
        <h3 className="stats-chart-title">Oylik koʻrishlar dinamikasi</h3>
        <div className="stats-chart">
          {MONTHLY_VIEWS.map(({ month, value }) => (
            <div key={month} className="stats-bar-col">
              <div className="stats-bar" style={{ height: `${(value / maxViews) * 100}%` }}>
                <span className="stats-bar-value">{value}</span>
              </div>
              <div className="stats-bar-label">{month}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="stats-bottom">
        <MarketStats />
      </div>
    </main>
  )
}
