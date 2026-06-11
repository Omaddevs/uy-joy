import { Home, Rocket } from 'lucide-react'
import './PremiumBanner.css'

export default function PremiumBanner() {
  return (
    <section className="premium-banner">
      <div className="premium-banner-content">
        <h3 className="premium-banner-title">Premium e'lon — ko'proq mijoz!</h3>
        <p className="premium-banner-text">
          E'loningizni boshqalardan ajrating va tezroq sotuvga chiqing.
        </p>
        <button className="premium-banner-btn">Premiumga o'tish</button>
      </div>
      <div className="premium-banner-icon-house">
        <Home size={64} strokeWidth={1.5} />
      </div>
      <div className="premium-banner-icon-rocket">
        <Rocket size={30} strokeWidth={1.8} />
      </div>
    </section>
  )
}
