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
      <div className="premium-banner-emoji-house">🏠</div>
      <div className="premium-banner-emoji-rocket">🚀</div>
    </section>
  )
}
