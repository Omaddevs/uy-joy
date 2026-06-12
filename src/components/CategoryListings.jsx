import ListingSection from './ListingSection.jsx'
import { CATEGORIES } from '../data/categories.js'
import { getListingsByCategory } from '../data/listings.js'

export default function CategoryListings() {
  return (
    <>
      {CATEGORIES.map(({ id, label, icon, bg, color, path }) => (
        <ListingSection
          key={id}
          title={label}
          icon={icon}
          iconBg={bg}
          iconColor={color}
          listings={getListingsByCategory(id)}
          viewAllTo={path}
        />
      ))}
    </>
  )
}
