import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext.jsx'
import { FavoritesProvider } from './context/FavoritesContext.jsx'
import { NotificationsProvider } from './context/NotificationsContext.jsx'
import MainLayout from './layouts/MainLayout.jsx'
import AuthLayout from './layouts/AuthLayout.jsx'
import HomePage from './pages/HomePage.jsx'
import ListingsPage from './pages/ListingsPage.jsx'
import ListingDetailPage from './pages/ListingDetailPage.jsx'
import FavoritesPage from './pages/FavoritesPage.jsx'
import MyListingsPage from './pages/MyListingsPage.jsx'
import StatisticsPage from './pages/StatisticsPage.jsx'
import SettingsPage from './pages/SettingsPage.jsx'
import PostListingPage from './pages/PostListingPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import './App.css'

function RequireAuth({ children }) {
  const { user } = useAuth()
  const location = useLocation()
  if (!user) return <Navigate to="/kirish" state={{ from: location }} replace />
  return children
}

function RequireAdmin({ children }) {
  const { user } = useAuth()
  const location = useLocation()
  if (!user) return <Navigate to="/kirish" state={{ from: location }} replace />
  if (user.role !== 'admin') return <Navigate to="/" replace />
  return children
}

export default function App() {
  return (
    <AuthProvider>
      <FavoritesProvider>
      <NotificationsProvider>
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
              <Route
                path="/sevimlilar"
                element={
                  <RequireAuth>
                    <FavoritesPage />
                  </RequireAuth>
                }
              />
              <Route
                path="/elonlarim"
                element={
                  <RequireAuth>
                    <MyListingsPage />
                  </RequireAuth>
                }
              />
              <Route
                path="/statistika"
                element={
                  <RequireAdmin>
                    <StatisticsPage />
                  </RequireAdmin>
                }
              />
              <Route
                path="/sozlamalar"
                element={
                  <RequireAuth>
                    <SettingsPage />
                  </RequireAuth>
                }
              />
              <Route
                path="/elon-berish"
                element={
                  <RequireAuth>
                    <PostListingPage />
                  </RequireAuth>
                }
              />
            </Route>
            <Route element={<AuthLayout />}>
              <Route path="/kirish" element={<LoginPage />} />
              <Route path="/royxatdan-otish" element={<RegisterPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </NotificationsProvider>
      </FavoritesProvider>
    </AuthProvider>
  )
}
