export const CONVERSATIONS = [
  {
    id: 'conv-1',
    name: 'Dilnoza Yusupova',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=160&q=80&auto=format&fit=crop',
    listingTitle: 'Yakkasaroy, 2 xonali kvartira',
    online: true,
    unread: 2,
    messages: [
      { id: 1, from: 'them', text: 'Assalomu alaykum! Kvartira hali ham ijaraga beriladimi?', time: '09:14' },
      { id: 2, from: 'me', text: 'Vaalaykum assalom, ha hali bo\'sh', time: '09:16' },
      { id: 3, from: 'them', text: "Qachon ko'rishimiz mumkin?", time: '09:20' },
      { id: 4, from: 'them', text: "Ertaga soat 14:00 bo'sh vaqtingiz bormi?", time: '09:21' },
    ],
  },
  {
    id: 'conv-2',
    name: 'Bobur Toshmatov',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=160&q=80&auto=format&fit=crop',
    listingTitle: 'Qibray tumani, 10 sotix yer',
    online: false,
    unread: 0,
    messages: [
      { id: 1, from: 'them', text: 'Yer uchastkasi narxi kelishiladimi?', time: 'Kecha 18:02' },
      { id: 2, from: 'me', text: "Ozgina kelishish mumkin, qancha taklif qilasiz?", time: 'Kecha 18:10' },
      { id: 3, from: 'them', text: '$ 42 000 bo\'lsa qanday?', time: 'Kecha 18:25' },
    ],
  },
  {
    id: 'conv-3',
    name: 'Madina Rashidova',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=160&q=80&auto=format&fit=crop',
    listingTitle: 'Chimyon yoʻlida, 4 xonali dacha',
    online: true,
    unread: 0,
    messages: [
      { id: 1, from: 'me', text: "Salom, dacha haqida qo'shimcha rasm yubora olasizmi?", time: '2 kun oldin' },
      { id: 2, from: 'them', text: "Albatta, hoziroq yuboraman", time: '2 kun oldin' },
      { id: 3, from: 'them', text: "Rahmat, kutib turaman", time: '1 kun oldin' },
    ],
  },
]
