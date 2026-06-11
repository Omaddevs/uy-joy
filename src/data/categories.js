import { Building2, Key, Trees, Mountain, Hotel } from 'lucide-react'

export const CATEGORIES = [
  { id: 'sotuv', label: 'Sotuvdagi uylar', icon: Building2, color: '#16A34A', bg: '#E7F8EE', path: '/sotuv' },
  { id: 'ijara', label: 'Ijara', icon: Key, color: '#4F46E5', bg: '#E8EEFF', path: '/ijara' },
  { id: 'yer', label: 'Quruq yerlar', icon: Trees, color: '#16A34A', bg: '#E7F8EE', path: '/yer' },
  { id: 'dacha', label: 'Dachalar', icon: Mountain, color: '#F97316', bg: '#FFF1E6', path: '/dacha' },
  { id: 'mexmonxona', label: 'Mexmonxonalar', icon: Hotel, color: '#7C3AED', bg: '#F0EBFF', path: '/mexmonxona' },
]

export const CATEGORY_BY_ID = Object.fromEntries(CATEGORIES.map((c) => [c.id, c]))
