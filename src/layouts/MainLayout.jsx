import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar.jsx'
import Header from '../components/Header.jsx'
import MobileHeader from '../components/MobileHeader.jsx'
import BottomNav from '../components/BottomNav.jsx'

export default function MainLayout() {
  return (
    <div className="app-shell">
      <div className="desktop-only" style={{ display: 'contents' }}>
        <Sidebar />
      </div>

      <div className="main-column">
        <div className="desktop-only" style={{ display: 'contents' }}>
          <Header />
        </div>
        <MobileHeader />

        <div className="content-row">
          <Outlet />
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
