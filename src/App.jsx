import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { FavoritesProvider } from './context/FavoritesContext.jsx'
import MainLayout from './layouts/MainLayout.jsx'
import HomePage from './pages/HomePage.jsx'
import ListingsPage from './pages/ListingsPage.jsx'
import ListingDetailPage from './pages/ListingDetailPage.jsx'
import FavoritesPage from './pages/FavoritesPage.jsx'
import MyListingsPage from './pages/MyListingsPage.jsx'
import MessagesPage from './pages/MessagesPage.jsx'
import StatisticsPage from './pages/StatisticsPage.jsx'
import SettingsPage from './pages/SettingsPage.jsx'
import PostListingPage from './pages/PostListingPage.jsx'
import './App.css'

export default function App() {
  return (
    <FavoritesProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/sotuv" element={<ListingsPage category="sotuv" />} />
            <Route path="/ijara" element={<ListingsPage category="ijara" />} />
            <Route path="/yer" element={<ListingsPage category="yer" />} />
            <Route path="/dacha" element={<ListingsPage category="dacha" />} />
            <Route path="/mexmonxona" element={<ListingsPage category="mexmonxona" />} />
            <Route path="/elon/:id" element={<ListingDetailPage />} />
            <Route path="/sevimlilar" element={<FavoritesPage />} />
            <Route path="/elonlarim" element={<MyListingsPage />} />
            <Route path="/xabarlar" element={<MessagesPage />} />
            <Route path="/statistika" element={<StatisticsPage />} />
            <Route path="/sozlamalar" element={<SettingsPage />} />
            <Route path="/elon-berish" element={<PostListingPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </FavoritesProvider>
  )
}
