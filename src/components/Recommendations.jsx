import ListingSection from './ListingSection.jsx'
import { LISTINGS } from '../data/listings.js'

export default function Recommendations() {
  return (
    <ListingSection
      title="Siz uchun tavsiya etamiz"
      listings={LISTINGS}
      viewAllTo="/kategoriyalar"
    />
  )
}
