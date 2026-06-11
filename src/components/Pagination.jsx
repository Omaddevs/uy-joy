import { ChevronLeft, ChevronRight } from 'lucide-react'
import './Pagination.css'

export default function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <nav className="pagination" aria-label="Sahifalash">
      <button
        type="button"
        className="pagination-arrow"
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
        aria-label="Oldingi sahifa"
      >
        <ChevronLeft size={18} strokeWidth={2.2} />
      </button>

      {pages.map((p) => (
        <button
          key={p}
          type="button"
          className={`pagination-page${p === page ? ' is-active' : ''}`}
          onClick={() => onChange(p)}
        >
          {p}
        </button>
      ))}

      <button
        type="button"
        className="pagination-arrow"
        disabled={page === totalPages}
        onClick={() => onChange(page + 1)}
        aria-label="Keyingi sahifa"
      >
        <ChevronRight size={18} strokeWidth={2.2} />
      </button>
    </nav>
  )
}
