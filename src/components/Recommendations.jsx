import { ChevronRight } from 'lucide-react'
import PropertyCard from './PropertyCard.jsx'
import { LISTINGS } from '../data/listings.js'
import './Recommendations.css'

export default function Recommendations() {
  const recommended = LISTINGS.slice(0, 4)

  return (
    <section className="recommendations">
      <div className="section-head">
        <h2 className="section-title">Siz uchun tavsiya etamiz</h2>
        <a className="link-accent">Barchasini ko'rish</a>
      </div>

      <div className="recommendations-grid">
        {recommended.map((listing) => (
          <PropertyCard key={listing.id} listing={listing} />
        ))}
      </div>

      <button className="recommendations-arrow" aria-label="Keyingisi">
        <ChevronRight size={18} strokeWidth={2.2} color="#4F46E5" />
      </button>
    </section>
  )
}
