import { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext(null)

const STORAGE_KEY = 'uytop_user'

const ADMIN_EMAIL = 'admin@uytop.uz'
const ADMIN_PASSWORD = 'admin123'

const DEFAULT_AVATAR =
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&q=80&auto=format&fit=crop'

function readStoredUser() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readStoredUser)

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    } else {
      localStorage.removeItem(STORAGE_KEY)
    }
  }, [user])

  const login = ({ email, password }) => {
    const normalizedEmail = email.trim().toLowerCase()
    const isAdmin = normalizedEmail === ADMIN_EMAIL && password === ADMIN_PASSWORD

    if (!normalizedEmail || !password) {
      throw new Error("Email va parolni kiriting")
    }
    if (password.length < 4) {
      throw new Error("Parol noto'g'ri")
    }

    const newUser = {
      name: isAdmin ? 'Admin' : normalizedEmail.split('@')[0].replace(/[._]/g, ' '),
      email: normalizedEmail,
      role: isAdmin ? 'admin' : 'user',
      phone: '',
      location: 'Toshkent',
      avatar: DEFAULT_AVATAR,
      password,
    }
    setUser(newUser)
    return newUser
  }

  const register = ({ name, email, password, phone }) => {
    const normalizedEmail = email.trim().toLowerCase()
    if (!name.trim() || !normalizedEmail || !password) {
      throw new Error("Barcha maydonlarni to'ldiring")
    }
    if (password.length < 6) {
      throw new Error("Parol kamida 6 ta belgidan iborat bo'lishi kerak")
    }

    const isAdmin = normalizedEmail === ADMIN_EMAIL
    const newUser = {
      name: name.trim(),
      email: normalizedEmail,
      role: isAdmin ? 'admin' : 'user',
      phone: phone || '',
      location: 'Toshkent',
      avatar: DEFAULT_AVATAR,
      password,
    }
    setUser(newUser)
    return newUser
  }

  const logout = () => setUser(null)

  const updateProfile = (patch) => setUser((u) => (u ? { ...u, ...patch } : u))

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
