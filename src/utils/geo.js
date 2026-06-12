export const DEFAULT_CENTER = { lat: 41.3111, lng: 69.2797 }

const AREAS = [
  { keys: ['chilonzor'], lat: 41.2856, lng: 69.2034 },
  { keys: ['yunusobod'], lat: 41.3547, lng: 69.2862 },
  { keys: ['sergeli'], lat: 41.2205, lng: 69.2185 },
  { keys: ['mirzo', 'ulug'], lat: 41.3405, lng: 69.3342 },
  { keys: ['olmazor'], lat: 41.3102, lng: 69.2501 },
  { keys: ['yakkasaroy'], lat: 41.2935, lng: 69.2745 },
  { keys: ['shayxontohur', 'shayx'], lat: 41.3185, lng: 69.244 },
  { keys: ['mirobod'], lat: 41.2995, lng: 69.2705 },
  { keys: ['yashnobod'], lat: 41.2605, lng: 69.3305 },
  { keys: ['qibray'], lat: 41.3895, lng: 69.4705 },
  { keys: ['zangiota'], lat: 41.2205, lng: 69.1405 },
  { keys: ['boka'], lat: 40.8205, lng: 69.2005 },
  { keys: ['parkent'], lat: 41.2905, lng: 69.6805 },
  { keys: ['bostonliq', 'bostonliq'], lat: 41.5005, lng: 70.1005 },
  { keys: ['chorvoq'], lat: 41.5705, lng: 70.0105 },
  { keys: ['ohangaron'], lat: 40.9105, lng: 69.6405 },
]

function normalize(str) {
  return str.toLowerCase().replace(/[ʻʼ']/g, '').replace(/\s+/g, '')
}

function jitterFromId(id) {
  let h = 0
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) | 0
  return {
    lat: ((h % 200) - 100) / 8000,
    lng: (((h >> 8) % 200) - 100) / 8000,
  }
}

export function getListingCoords(listing) {
  const norm = normalize(listing.location)
  for (const area of AREAS) {
    if (area.keys.some((k) => norm.includes(normalize(k)))) {
      const j = jitterFromId(listing.id)
      return { lat: area.lat + j.lat, lng: area.lng + j.lng }
    }
  }
  const j = jitterFromId(listing.id)
  return { lat: DEFAULT_CENTER.lat + j.lat, lng: DEFAULT_CENTER.lng + j.lng }
}

export function getDistanceKm(from, to) {
  const R = 6371
  const dLat = ((to.lat - from.lat) * Math.PI) / 180
  const dLng = ((to.lng - from.lng) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((from.lat * Math.PI) / 180) *
      Math.cos((to.lat * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

export function formatDistance(km) {
  if (km < 1) return `${Math.round(km * 1000)} m`
  return `${km.toFixed(1)} km`
}

export function formatMapPrice(price) {
  const num = Number(String(price).replace(/[^0-9]/g, ''))
  if (!num) return price
  if (num >= 1_000_000) return `$${(num / 1_000_000).toFixed(1)}M`
  if (num >= 1000) return `$${Math.round(num / 1000)}k`
  return `$${num}`
}

export function sortListingsByDistance(listings, userPos) {
  return [...listings]
    .map((listing) => ({
      listing,
      distance: getDistanceKm(userPos, getListingCoords(listing)),
    }))
    .sort((a, b) => a.distance - b.distance)
}
