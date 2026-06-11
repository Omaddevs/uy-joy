import { ChevronDown, ArrowUp, ArrowDown } from 'lucide-react'
import './MarketStats.css'

const STATS = [
  {
    id: 'sotuv',
    title: 'Sotuvdagi uylar',
    count: '12 456 ta',
    points: '2,20 12,16 22,18 32,10 42,12 56,4',
    color: '#16A34A',
    change: '12%',
    up: true,
  },
  {
    id: 'ijara',
    title: 'Ijara',
    count: '8 742 ta',
    points: '2,16 12,18 22,12 32,14 42,9 56,11',
    color: '#3B82F6',
    change: '8%',
    up: true,
  },
  {
    id: 'yer',
    title: 'Quruq yerlar',
    count: '5 315 ta',
    points: '2,18 12,14 22,16 32,8 42,10 56,3',
    color: '#F59E0B',
    change: '15%',
    up: true,
  },
  {
    id: 'dacha',
    title: 'Dachalar',
    count: '2 156 ta',
    points: '2,8 12,11 22,9 32,14 42,13 56,19',
    color: '#EF4444',
    change: '3%',
    up: false,
  },
]

export default function MarketStats() {
  return (
    <section className="card-surface market-stats">
      <div className="market-stats-head">
        <h3 className="market-stats-title">Bozor statistikasi</h3>
        <div className="market-stats-region">
          <span>Toshkent</span>
          <ChevronDown size={13} strokeWidth={2.2} color="#94A3B8" />
        </div>
      </div>

      <div className="market-stats-list">
        {STATS.map(({ id, title, count, points, color, change, up }) => (
          <div key={id} className="market-stat">
            <div className="market-stat-info">
              <div className="market-stat-title">{title}</div>
              <div className="market-stat-count">{count}</div>
            </div>
            <svg width="58" height="26" viewBox="0 0 58 26" fill="none">
              <polyline
                points={points}
                stroke={color}
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className={`market-stat-change${up ? ' is-up' : ' is-down'}`}>
              {up ? (
                <ArrowUp size={12} strokeWidth={3} />
              ) : (
                <ArrowDown size={12} strokeWidth={3} />
              )}
              {change}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
