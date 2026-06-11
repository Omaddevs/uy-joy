import { Home, Building2, Trees, Mountain, Hotel } from 'lucide-react'

const YESNO = ['Bor', "Yo'q"]

const line = (label, value, unit = '') => (value ? `${label}: ${value}${unit}\n` : '')
const lineYesNo = (label, value) => (value ? `${label}: ${value}\n` : '')

export const PROPERTY_TYPES = [
  {
    id: 'hovli',
    label: 'Hovli uy',
    icon: Home,
    color: '#16A34A',
    bg: '#E7F8EE',
    category: 'sotuv',
    fields: [
      { key: 'landArea', label: 'Yer maydoni', placeholder: 'Mas: 6', suffix: ' sotix', type: 'text' },
      { key: 'rooms', label: 'Xonalar soni', placeholder: 'Mas: 4', suffix: ' ta', type: 'text' },
      { key: 'bathroom', label: 'Hammom', type: 'toggle' },
      { key: 'toilet', label: 'Hojatxona', type: 'toggle' },
      { key: 'gas', label: 'Gaz', type: 'toggle' },
      { key: 'electricity', label: 'Elektr (svet)', type: 'toggle' },
      { key: 'water', label: 'Suv', type: 'toggle' },
      { key: 'sewerage', label: 'Kanalizatsiya', type: 'toggle' },
      { key: 'heating', label: 'Isitish tizimi', placeholder: "Mas: Gaz katyol, pech", type: 'text' },
      { key: 'renovation', label: "Ta'mir holati", placeholder: "Mas: Yevro ta'mir", type: 'text' },
      { key: 'amenities', label: "Qo'shimcha qulayliklar", placeholder: "Mas: Wi-Fi, mebel, texnika, podval, bog'", type: 'textarea' },
      { key: 'credit', label: 'Kredit (Ipoteka)', type: 'toggle' },
      { key: 'creditTerms', label: 'Kredit shartlari', placeholder: 'Shartlarini yozing', type: 'text', showIf: (d) => d.credit === 'Bor' },
    ],
    buildDescription: (form) => {
      const d = form.details
      return (
        `🏡 HOVLI UY ${form.unit ? 'IJARAGA BERILADI' : 'SOTILADI'}!\n` +
        line('📍 Manzil', form.location) +
        line('📐 Yer maydoni', d.landArea, ' sotix') +
        line('🚪 Xonalar soni', d.rooms, ' ta') +
        `🏠 Uy haqida ma'lumot:\n` +
        lineYesNo('• 🛁 Hammom', d.bathroom) +
        lineYesNo('• 🚽 Hojatxona', d.toilet) +
        lineYesNo('• 🔥 Gaz', d.gas) +
        lineYesNo('• 💡 Elektr (svet)', d.electricity) +
        lineYesNo('• 💧 Suv', d.water) +
        lineYesNo('• 🚰 Kanalizatsiya', d.sewerage) +
        line('• ♨️ Isitish tizimi', d.heating) +
        line("🛠 Ta'mir holati", d.renovation) +
        (d.amenities ? `➕ Qo'shimcha qulayliklar:\n${d.amenities}\n` : '') +
        line('💰 Narxi', form.price, form.unit ? ` $${form.unit}` : ' $') +
        lineYesNo('💳 Kredit (Ipoteka)', d.credit) +
        (d.credit === 'Bor' && d.creditTerms ? `(Shartlari: ${d.creditTerms})\n` : '') +
        line('📞 Bog\'lanish uchun', form.phone)
      ).trim()
    },
  },
  {
    id: 'kvartira',
    label: 'Kvartira',
    icon: Building2,
    color: '#4F46E5',
    bg: '#E8EEFF',
    category: 'sotuv',
    fields: [
      { key: 'floor', label: 'Qavat / Bino', placeholder: 'Mas: 5/9', type: 'text' },
      { key: 'area', label: 'Maydon', placeholder: 'Mas: 65', suffix: ' m²', type: 'text' },
      { key: 'rooms', label: 'Xonalar soni', placeholder: 'Mas: 3', suffix: ' ta', type: 'text' },
      { key: 'renovation', label: 'Remont holati', placeholder: "Mas: Yevro remont", type: 'text' },
      { key: 'heating', label: 'Isitish', placeholder: 'Mas: Markazlashgan', type: 'text' },
      { key: 'electricity', label: 'Svet', type: 'toggle' },
      { key: 'water', label: 'Suv', type: 'toggle' },
      { key: 'gas', label: 'Gaz', type: 'toggle' },
      { key: 'elevator', label: 'Lift', type: 'toggle' },
      { key: 'documents', label: 'Hujjatlari', placeholder: "Mas: Tex pasport, notarial", type: 'text' },
      { key: 'paymentType', label: "To'lov turi", type: 'select', options: ['Naqd', 'Kredit', 'Subsidiya'] },
      { key: 'extra', label: "Qo'shimcha ma'lumot", placeholder: "Jihozlar, ta'mir sifati, lokatsiya afzalliklari, yaqin infratuzilma", type: 'textarea' },
    ],
    buildDescription: (form) => {
      const d = form.details
      return (
        `🏢 KVARTIRA ${form.unit ? 'IJARAGA BERILADI' : 'SOTILADI'}!\n\n` +
        line('📍 Manzil', form.location) +
        line('🏢 Qavat / Bino', d.floor) +
        line('📐 Maydon', d.area, ' m²') +
        line('🚪 Xonalar soni', d.rooms, ' ta') +
        line('✨ Remont holati', d.renovation) +
        line('♨️ Isitish', d.heating) +
        lineYesNo('💡 Svet', d.electricity) +
        lineYesNo('💦 Suv', d.water) +
        lineYesNo('🔥 Gaz', d.gas) +
        lineYesNo('🛗 Lift', d.elevator) +
        line('📄 Hujjatlari', d.documents) +
        '\n' +
        line('💰 Narxi', form.price, form.unit ? ` $${form.unit}` : ' $') +
        line('💸 To\'lov turi', d.paymentType) +
        (d.extra ? `\nℹ️ Qo'shimcha ma'lumot:\n${d.extra}\n` : '') +
        '\n' +
        line('📞 Telefon', form.phone)
      ).trim()
    },
  },
  {
    id: 'yer',
    label: 'Quruq yer',
    icon: Trees,
    color: '#16A34A',
    bg: '#E7F8EE',
    category: 'yer',
    fields: [
      { key: 'landArea', label: 'Yer maydoni', placeholder: 'Mas: 8', suffix: ' sotix', type: 'text' },
      { key: 'landType', label: 'Yer turi', type: 'select', options: ['Tomorqa', "Qishloq xo'jaligi", 'Qurilish uchun', 'Tijorat'] },
      { key: 'electricity', label: 'Elektr (svet)', type: 'toggle' },
      { key: 'water', label: 'Suv', type: 'toggle' },
      { key: 'gas', label: 'Gaz', type: 'toggle' },
      { key: 'documents', label: 'Hujjatlari', placeholder: "Mas: Davlat akti", type: 'text' },
      { key: 'amenities', label: "Qo'shimcha ma'lumot", placeholder: 'Yo\'lga yaqinligi, relyefi va h.k.', type: 'textarea' },
      { key: 'credit', label: 'Kredit (Bo\'lib to\'lash)', type: 'toggle' },
      { key: 'creditTerms', label: 'Kredit shartlari', placeholder: 'Shartlarini yozing', type: 'text', showIf: (d) => d.credit === 'Bor' },
    ],
    buildDescription: (form) => {
      const d = form.details
      return (
        `🌳 QURUQ YER SOTILADI!\n` +
        line('📍 Manzil', form.location) +
        line('📐 Yer maydoni', d.landArea, ' sotix') +
        line('🗺 Yer turi', d.landType) +
        lineYesNo('💡 Elektr (svet)', d.electricity) +
        lineYesNo('💧 Suv', d.water) +
        lineYesNo('🔥 Gaz', d.gas) +
        line('📄 Hujjatlari', d.documents) +
        (d.amenities ? `➕ Qo'shimcha ma'lumot:\n${d.amenities}\n` : '') +
        line('💰 Narxi', form.price, ' $') +
        lineYesNo('💳 Kredit', d.credit) +
        (d.credit === 'Bor' && d.creditTerms ? `(Shartlari: ${d.creditTerms})\n` : '') +
        line("📞 Bog'lanish uchun", form.phone)
      ).trim()
    },
  },
  {
    id: 'dacha',
    label: 'Dacha',
    icon: Mountain,
    color: '#F97316',
    bg: '#FFF1E6',
    category: 'dacha',
    fields: [
      { key: 'landArea', label: 'Yer maydoni', placeholder: 'Mas: 4', suffix: ' sotix', type: 'text' },
      { key: 'rooms', label: 'Xonalar soni', placeholder: 'Mas: 3', suffix: ' ta', type: 'text' },
      { key: 'bathroom', label: 'Hammom', type: 'toggle' },
      { key: 'gas', label: 'Gaz', type: 'toggle' },
      { key: 'electricity', label: 'Elektr (svet)', type: 'toggle' },
      { key: 'water', label: 'Suv', type: 'toggle' },
      { key: 'heating', label: 'Isitish tizimi', placeholder: 'Mas: Pech', type: 'text' },
      { key: 'renovation', label: "Ta'mir holati", placeholder: "Mas: O'rtacha", type: 'text' },
      { key: 'amenities', label: "Qo'shimcha qulayliklar", placeholder: "Mas: Bog', basseyn, mangal, beshik", type: 'textarea' },
      { key: 'credit', label: 'Kredit (Ipoteka)', type: 'toggle' },
      { key: 'creditTerms', label: 'Kredit shartlari', placeholder: 'Shartlarini yozing', type: 'text', showIf: (d) => d.credit === 'Bor' },
    ],
    buildDescription: (form) => {
      const d = form.details
      return (
        `🏕 DACHA ${form.unit ? 'IJARAGA BERILADI' : 'SOTILADI'}!\n` +
        line('📍 Manzil', form.location) +
        line('📐 Yer maydoni', d.landArea, ' sotix') +
        line('🚪 Xonalar soni', d.rooms, ' ta') +
        lineYesNo('🛁 Hammom', d.bathroom) +
        lineYesNo('🔥 Gaz', d.gas) +
        lineYesNo('💡 Elektr (svet)', d.electricity) +
        lineYesNo('💧 Suv', d.water) +
        line('♨️ Isitish tizimi', d.heating) +
        line("🛠 Ta'mir holati", d.renovation) +
        (d.amenities ? `➕ Qo'shimcha qulayliklar:\n${d.amenities}\n` : '') +
        line('💰 Narxi', form.price, form.unit ? ` $${form.unit}` : ' $') +
        lineYesNo('💳 Kredit (Ipoteka)', d.credit) +
        (d.credit === 'Bor' && d.creditTerms ? `(Shartlari: ${d.creditTerms})\n` : '') +
        line("📞 Bog'lanish uchun", form.phone)
      ).trim()
    },
  },
  {
    id: 'mexmonxona',
    label: 'Mexmonxona',
    icon: Hotel,
    color: '#7C3AED',
    bg: '#F0EBFF',
    category: 'mexmonxona',
    fields: [
      { key: 'rooms', label: 'Xonalar / joylar soni', placeholder: 'Mas: 2 xona, 4 joy', type: 'text' },
      { key: 'area', label: 'Maydon', placeholder: 'Mas: 40', suffix: ' m²', type: 'text' },
      { key: 'wifi', label: 'Wi-Fi', type: 'toggle' },
      { key: 'parking', label: 'Parking', type: 'toggle' },
      { key: 'breakfast', label: 'Nonushta', type: 'toggle' },
      { key: 'airConditioning', label: 'Konditsioner', type: 'toggle' },
      { key: 'paymentType', label: "To'lov turi", type: 'select', options: ['Naqd', 'Karta', 'Naqd / Karta'] },
      { key: 'amenities', label: "Qo'shimcha ma'lumot", placeholder: 'Manzara, infratuzilma va h.k.', type: 'textarea' },
    ],
    buildDescription: (form) => {
      const d = form.details
      return (
        `🏨 MEXMONXONA ${form.unit.includes('kun') ? 'KUNLIK IJARAGA BERILADI' : 'IJARAGA BERILADI'}!\n` +
        line('📍 Manzil', form.location) +
        line('🚪 Xonalar / joylar soni', d.rooms) +
        line('📐 Maydon', d.area, ' m²') +
        lineYesNo('📶 Wi-Fi', d.wifi) +
        lineYesNo('🚗 Parking', d.parking) +
        lineYesNo('🍳 Nonushta', d.breakfast) +
        lineYesNo('❄️ Konditsioner', d.airConditioning) +
        line('💰 Narxi', form.price, form.unit ? ` $${form.unit}` : ' $') +
        line("💸 To'lov turi", d.paymentType) +
        (d.amenities ? `➕ Qo'shimcha ma'lumot:\n${d.amenities}\n` : '') +
        line('📞 Telefon', form.phone)
      ).trim()
    },
  },
]

export const PROPERTY_TYPE_BY_ID = Object.fromEntries(PROPERTY_TYPES.map((p) => [p.id, p]))

export function buildInitialDetails(propertyType) {
  const config = PROPERTY_TYPE_BY_ID[propertyType]
  if (!config) return {}
  return Object.fromEntries(
    config.fields.map((f) => [f.key, f.type === 'toggle' ? "Yo'q" : ''])
  )
}

export const TOGGLE_OPTIONS = YESNO
