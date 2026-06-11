import { LISTINGS_BY_ID } from './listings.js'

export const MY_LISTINGS = [
  { id: 'sotuv-1', status: 'active', views: 482, date: '2026-06-08' },
  { id: 'ijara-3', status: 'pending', views: 96, date: '2026-06-10' },
  { id: 'dacha-1', status: 'active', views: 215, date: '2026-06-05' },
  { id: 'yer-2', status: 'archived', views: 1024, date: '2026-05-22' },
].map((entry) => ({ ...entry, listing: LISTINGS_BY_ID[entry.id] }))

export const STATUS_LABELS = {
  active: { label: 'Faol', color: '#16A34A', bg: '#E7F8EE' },
  pending: { label: 'Tekshirilmoqda', color: '#F59E0B', bg: '#FEF6E7' },
  archived: { label: 'Arxivlangan', color: '#94A3B8', bg: '#F1F3F7' },
}
