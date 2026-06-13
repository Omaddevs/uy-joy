import { createContext, useContext, useState } from 'react'
import { REGION_BY_ID } from '../data/regions.js'

const STORAGE_KEY = 'uytop-region'

const RegionContext = createContext(null)

function readStoredRegion() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored && REGION_BY_ID[stored]) return stored
  } catch {
    /* ignore */
  }
  return 'toshkent'
}

export function RegionProvider({ children }) {
  const [regionId, setRegionIdState] = useState(readStoredRegion)

  const setRegionId = (id) => {
    if (!REGION_BY_ID[id]) return
    setRegionIdState(id)
    try {
      localStorage.setItem(STORAGE_KEY, id)
    } catch {
      /* ignore */
    }
  }

  const region = REGION_BY_ID[regionId] ?? REGION_BY_ID.toshkent

  return (
    <RegionContext.Provider value={{ regionId, region, setRegionId }}>
      {children}
    </RegionContext.Provider>
  )
}

export function useRegion() {
  const ctx = useContext(RegionContext)
  if (!ctx) throw new Error('useRegion must be used within RegionProvider')
  return ctx
}
