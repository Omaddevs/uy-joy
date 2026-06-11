export const CATEGORIES = [
  { id: 'sotuv', label: 'Sotuvdagi uylar', emoji: '🏠', path: '/sotuv' },
  { id: 'ijara', label: 'Ijara', emoji: '🔑', path: '/ijara' },
  { id: 'yer', label: 'Quruq yerlar', emoji: '🌳', path: '/yer' },
  { id: 'dacha', label: 'Dachalar', emoji: '🏡', path: '/dacha' },
  { id: 'mexmonxona', label: 'Mexmonxonalar', emoji: '🏢', path: '/mexmonxona' },
]

export const CATEGORY_BY_ID = Object.fromEntries(CATEGORIES.map((c) => [c.id, c]))
