import Hero from '../components/Hero.jsx'
import Categories from '../components/Categories.jsx'
import Recommendations from '../components/Recommendations.jsx'
import TrustBadges from '../components/TrustBadges.jsx'
import RightSidebar from '../components/RightSidebar.jsx'

export default function HomePage() {
  return (
    <>
      <main className="main-content">
        <Hero />
        <Categories />
        <Recommendations />
        <TrustBadges />
      </main>

      <RightSidebar />
    </>
  )
}
