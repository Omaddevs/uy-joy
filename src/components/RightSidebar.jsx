import QuickActions from './QuickActions.jsx'
import MarketStats from './MarketStats.jsx'
import PremiumBanner from './PremiumBanner.jsx'
import './RightSidebar.css'

export default function RightSidebar() {
  return (
    <aside className="right-sidebar">
      <QuickActions />
      <MarketStats />
      <PremiumBanner />
    </aside>
  )
}
