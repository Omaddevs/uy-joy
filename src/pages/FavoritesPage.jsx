import { Heart } from 'lucide-react'
import PropertyCard from '../components/PropertyCard.jsx'
import { useFavorites } from '../context/FavoritesContext.jsx'
import { LISTINGS } from '../data/listings.js'
import './ListingsPage.css'
import './FavoritesPage.css'

export default function FavoritesPage() {
  const { favorites } = useFavorites()
  const items = LISTINGS.filter((l) => favorites[l.id])

  return (
    <main className="main-content">
      <section className="listings-head">
        <div>
          <h1 className="listings-title">❤️ Sevimlilar</h1>
          <p className="listings-subtitle">{items.length} ta saqlangan e'lon</p>
        </div>
      </section>

      {items.length > 0 ? (
        <div className="listings-grid">
          {items.map((listing) => (
            <PropertyCard key={listing.id} listing={listing} />
          ))}
        </div>
      ) : (
        <div className="favorites-empty">
          <Heart size={40} strokeWidth={1.5} color="#CBD5E1" />
          <p>Hozircha sevimli e'lonlar yo'q.</p>
          <p className="favorites-empty-hint">
            Yoqqan e'lonlarni yurak belgisi orqali shu yerga qo'shing.
          </p>
        </div>
      )}
    </main>
  )
}
