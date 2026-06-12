import { useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { MapContainer, TileLayer, Marker, Popup, CircleMarker, useMap } from 'react-leaflet'
import L from 'leaflet'
import { formatMapPrice, getListingCoords } from '../utils/geo.js'
import 'leaflet/dist/leaflet.css'
import './SearchMap.css'

function FitBounds({ points }) {
  const map = useMap()

  useEffect(() => {
    if (points.length < 1) return
    const bounds = L.latLngBounds(points.map((p) => [p.lat, p.lng]))
    map.fitBounds(bounds, { padding: [48, 48], maxZoom: 13 })
  }, [points, map])

  return null
}

function RecenterMap({ position, trigger }) {
  const map = useMap()

  useEffect(() => {
    if (position && trigger > 0) {
      map.flyTo([position.lat, position.lng], 13, { duration: 0.8 })
    }
  }, [trigger, position, map])

  return null
}

function createPriceIcon(price, isActive) {
  return L.divIcon({
    className: '',
    html: `<div class="map-price-pin${isActive ? ' is-active' : ''}">${formatMapPrice(price)}</div>`,
    iconAnchor: [0, 0],
  })
}

export default function SearchMap({ listings, userPos, activeId, onSelect, locateTrigger = 0 }) {
  const points = useMemo(() => {
    const listingPoints = listings.map(getListingCoords)
    return userPos ? [userPos, ...listingPoints] : listingPoints
  }, [listings, userPos])

  const center = userPos ? [userPos.lat, userPos.lng] : [41.3111, 69.2797]

  return (
    <MapContainer center={center} zoom={11} className="search-map" scrollWheelZoom>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <FitBounds points={points} />
      {userPos && <RecenterMap position={userPos} trigger={locateTrigger} />}

      {userPos && (
        <CircleMarker
          center={[userPos.lat, userPos.lng]}
          radius={9}
          pathOptions={{ color: '#4F46E5', fillColor: '#4F46E5', fillOpacity: 1, weight: 3 }}
        />
      )}

      {listings.map((listing) => {
        const coords = getListingCoords(listing)
        const isActive = activeId === listing.id
        return (
          <Marker
            key={listing.id}
            position={[coords.lat, coords.lng]}
            icon={createPriceIcon(listing.price, isActive)}
            eventHandlers={{
              click: () => onSelect(listing.id),
            }}
          >
            <Popup className="map-popup" closeButton={false}>
              <div className="map-popup-card">
                <img src={listing.img} alt="" className="map-popup-img" />
                <div className="map-popup-body">
                  <div className="map-popup-price">
                    {listing.price}
                    {listing.unit}
                  </div>
                  <div className="map-popup-title">{listing.title}</div>
                  <div className="map-popup-location">{listing.location}</div>
                  <Link to={`/elon/${listing.id}`} className="map-popup-link">
                    Batafsil ko'rish
                  </Link>
                </div>
              </div>
            </Popup>
          </Marker>
        )
      })}
    </MapContainer>
  )
}
