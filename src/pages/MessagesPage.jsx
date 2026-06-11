import { useState } from 'react'
import { Send, Search, MessageSquare } from 'lucide-react'
import { CONVERSATIONS } from '../data/conversations.js'
import './ListingsPage.css'
import './MessagesPage.css'

export default function MessagesPage() {
  const [conversations, setConversations] = useState(CONVERSATIONS)
  const [activeId, setActiveId] = useState(CONVERSATIONS[0].id)
  const [draft, setDraft] = useState('')

  const active = conversations.find((c) => c.id === activeId)

  const send = () => {
    const text = draft.trim()
    if (!text) return
    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeId
          ? {
              ...c,
              unread: 0,
              messages: [
                ...c.messages,
                { id: c.messages.length + 1, from: 'me', text, time: 'hozir' },
              ],
            }
          : c
      )
    )
    setDraft('')
  }

  const selectConversation = (id) => {
    setActiveId(id)
    setConversations((prev) => prev.map((c) => (c.id === id ? { ...c, unread: 0 } : c)))
  }

  return (
    <main className="main-content">
      <section className="listings-head">
        <div>
          <h1 className="page-title">
            <span className="page-title-icon" style={{ background: 'var(--color-primary-soft-2)', color: 'var(--color-primary)' }}>
              <MessageSquare size={20} strokeWidth={2} />
            </span>
            Xabarlar
          </h1>
          <p className="listings-subtitle">{conversations.length} ta suhbat</p>
        </div>
      </section>

      <div className="messages-layout card-surface">
        <div className="messages-list">
          <div className="messages-search">
            <Search size={16} strokeWidth={2} color="#94A3B8" />
            <input placeholder="Suhbatlardan qidirish" />
          </div>
          {conversations.map((c) => (
            <button
              key={c.id}
              className={`messages-item${c.id === activeId ? ' is-active' : ''}`}
              onClick={() => selectConversation(c.id)}
            >
              <div className="messages-avatar-wrap">
                <img src={c.avatar} alt={c.name} />
                {c.online && <span className="messages-online-dot" />}
              </div>
              <div className="messages-item-body">
                <div className="messages-item-name">{c.name}</div>
                <div className="messages-item-listing">{c.listingTitle}</div>
                <div className="messages-item-preview">
                  {c.messages[c.messages.length - 1].text}
                </div>
              </div>
              {c.unread > 0 && <span className="messages-unread">{c.unread}</span>}
            </button>
          ))}
        </div>

        <div className="messages-chat">
          <div className="messages-chat-head">
            <img src={active.avatar} alt={active.name} className="messages-chat-avatar" />
            <div>
              <div className="messages-chat-name">{active.name}</div>
              <div className="messages-chat-listing">{active.listingTitle}</div>
            </div>
          </div>

          <div className="messages-chat-body">
            {active.messages.map((m) => (
              <div key={m.id} className={`messages-bubble-row${m.from === 'me' ? ' is-me' : ''}`}>
                <div className="messages-bubble">
                  {m.text}
                  <span className="messages-bubble-time">{m.time}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="messages-chat-input">
            <input
              placeholder="Xabar yozing..."
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && send()}
            />
            <button onClick={send} aria-label="Yuborish">
              <Send size={18} strokeWidth={2.2} />
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
