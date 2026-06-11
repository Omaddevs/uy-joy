export const REGIONS = [
  {
    id: 'toshkent',
    name: 'Toshkent',
    districts: [
      'Bektemir', 'Chilonzor', 'Mirzo Ulugʻbek', 'Mirobod', 'Olmazor',
      'Sergeli', 'Shayxontohur', 'Uchtepa', 'Yakkasaroy', 'Yashnobod', 'Yunusobod',
      'Bekobod', 'Boʻka', 'Boʻstonliq', 'Chinoz', 'Ohangaron',
      'Parkent', 'Qibray', 'Quyichirchiq', 'Yuqorichirchiq', 'Zangiota',
    ],
  },
  {
    id: 'andijon',
    name: 'Andijon',
    districts: [
      'Andijon shahri', 'Asaka', 'Baliqchi', 'Boʻz', 'Buloqboshi',
      'Izboskan', 'Jalaquduq', 'Xoʻjaobod', 'Qoʻrgʻontepa',
      'Marhamat', 'Oltinkoʻl', 'Paxtaobod', 'Shahrixon', 'Ulugʻnor', 'Xonobod',
    ],
  },
  {
    id: 'buxoro',
    name: 'Buxoro',
    districts: [
      'Buxoro shahri', 'Gʻijduvon', 'Jondor', 'Kogon', 'Olot',
      'Peshku', 'Qorakoʻl', 'Qorovulbozor', 'Romitan', 'Shofirkon', 'Vobkent',
    ],
  },
  {
    id: 'fargona',
    name: 'Fargʻona',
    districts: [
      'Fargʻona shahri', 'Margʻilon', 'Qoʻqon', 'Beshariq', 'Bogʻdod',
      'Buvayda', 'Dangʻara', 'Furqat', 'Quva', 'Rishton',
      'Soʻx', 'Toshloq', 'Uchkoʻprik', 'Yozyovon',
    ],
  },
  {
    id: 'jizzax',
    name: 'Jizzax',
    districts: [
      'Jizzax shahri', 'Arnasoy', 'Baxmal', 'Doʻstlik', 'Forish',
      'Gʻallaorol', 'Mirzachoʻl', 'Paxtakor', 'Zafarobod', 'Zarbdor', 'Zomin',
    ],
  },
  {
    id: 'xorazm',
    name: 'Xorazm',
    districts: [
      'Urganch', 'Xiva', 'Bogʻot', 'Gurlan', 'Hazorasp',
      'Qoʻshkoʻpir', 'Shovot', 'Yangiariq', 'Yangibozor',
    ],
  },
  {
    id: 'namangan',
    name: 'Namangan',
    districts: [
      'Namangan shahri', 'Chortoq', 'Chust', 'Kosonsoy', 'Mingbuloq',
      'Norin', 'Pop', 'Toʻraqoʻrgʻon', 'Uchqoʻrgʻon', 'Uychi', 'Yangiqoʻrgʻon',
    ],
  },
  {
    id: 'navoiy',
    name: 'Navoiy',
    districts: [
      'Navoiy shahri', 'Konimex', 'Karmana', 'Navbahor', 'Nurota',
      'Qiziltepa', 'Tomdi', 'Uchquduq', 'Xatirchi',
    ],
  },
  {
    id: 'qashqadaryo',
    name: 'Qashqadaryo',
    districts: [
      'Qarshi', 'Shahrisabz', 'Gʻuzor', 'Dehqonobod', 'Kasbi',
      'Kitob', 'Koson', 'Mirishkor', 'Muborak', 'Nishon', 'Chiroqchi', 'Yakkabogʻ',
    ],
  },
  {
    id: 'samarqand',
    name: 'Samarqand',
    districts: [
      'Samarqand shahri', 'Bulungʻur', 'Ishtixon', 'Jomboy', 'Kattaqoʻrgʻon',
      'Narpay', 'Nurobod', 'Oqdaryo', 'Pastdargʻom', 'Paxtachi',
      'Payariq', 'Qoʻshrabot', 'Toyloq', 'Urgut',
    ],
  },
  {
    id: 'sirdaryo',
    name: 'Sirdaryo',
    districts: [
      'Guliston', 'Boyovut', 'Mirzaobod', 'Oqoltin', 'Sardoba',
      'Sayxunobod', 'Sirdaryo', 'Xovos', 'Yangiyer', 'Shirin',
    ],
  },
  {
    id: 'surxondaryo',
    name: 'Surxondaryo',
    districts: [
      'Termiz', 'Angor', 'Bandixon', 'Boysun', 'Denov',
      'Jarqoʻrgʻon', 'Muzrabot', 'Oltinsoy', 'Qiziriq',
      'Qumqoʻrgʻon', 'Sariosiyo', 'Sherobod', 'Shoʻrchi', 'Uzun',
    ],
  },
]

export const REGION_BY_ID = Object.fromEntries(REGIONS.map((r) => [r.id, r]))
