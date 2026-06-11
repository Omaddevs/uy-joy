const STORAGE_KEY = 'uytop_posted_listings'

export function getPostedListings() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveAll(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

export function addPostedListing(entry) {
  const items = getPostedListings()
  items.unshift(entry)
  saveAll(items)
  return entry
}

export function updatePostedListing(id, patch) {
  const items = getPostedListings().map((item) => (item.id === id ? { ...item, ...patch } : item))
  saveAll(items)
}

export function removePostedListing(id) {
  saveAll(getPostedListings().filter((item) => item.id !== id))
}
