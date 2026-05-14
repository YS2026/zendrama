import { useState, useEffect, useRef } from "react";

const C = {
  bg: "#08090d", card: "#111318", card2: "#1a1c24",
  accent: "#7c6af7", accentLight: "#a89cf8", accentGlow: "#7c6af720",
  red: "#e05b7f", text: "#f0eeff", textMuted: "#7a7a9a", textDim: "#3a3a5a",
  jade: "#3ecf8e",
};

const SERIES_DATA = [
  { id:1,  title:"Тайный миллионер",                   genre:"Романтика",     episodes:80, freeEpisodes:3, cover:"https://picsum.photos/seed/mill/300/450",    badge:"Эксклюзив", trending:1, rating:9.2, desc:"Девушка из бедной семьи случайно встречает скрытного миллиардера..." },
  { id:2,  title:"Рождённый повелителем",               genre:"Фэнтези",       episodes:96, freeEpisodes:3, cover:"https://picsum.photos/seed/lord/300/450",    badge:"Эксклюзив", trending:4, rating:8.9, desc:"Древний правитель возрождается в современном мире с магическими силами..." },
  { id:3,  title:"Муж-гендиректор меня баловал",        genre:"Романтика",     episodes:68, freeEpisodes:3, cover:"https://picsum.photos/seed/ceo/300/450",     badge:"Эксклюзив", trending:2, rating:9.5, desc:"Брак по договору превращается в настоящую любовь..." },
  { id:4,  title:"Тот самый мальчик",                   genre:"Романтика",     episodes:72, freeEpisodes:3, cover:"https://picsum.photos/seed/boy/300/450",     badge:"Эксклюзив", trending:5, rating:8.7, desc:"Первая любовь снова появляется спустя 10 лет..." },
  { id:5,  title:"Телефон для невесты",                 genre:"Комедия",       episodes:58, freeEpisodes:3, cover:"https://picsum.photos/seed/phone/300/450",   badge:"Эксклюзив", trending:6, rating:8.4, desc:"Случайный обмен телефонами меняет судьбы двух незнакомцев..." },
  { id:6,  title:"Замуж за врага",                      genre:"Драма",         episodes:84, freeEpisodes:3, cover:"https://picsum.photos/seed/enemy/300/450",   badge:"Эксклюзив", trending:3, rating:9.1, desc:"Вынужденный союз с главным соперником семьи..." },
  { id:7,  title:"Эвелин и Гари: Новая жизнь",          genre:"Попаданчество", episodes:93, freeEpisodes:3, cover:"https://picsum.photos/seed/evelin/300/450",  badge:"Хит",       trending:null, rating:9.3, desc:"Современная женщина попадает в древний Китай..." },
  { id:8,  title:"Двойная жизнь королевы бизнеса",      genre:"Драма",         episodes:76, freeEpisodes:3, cover:"https://picsum.photos/seed/queen2/300/450",  badge:"Новинка",   trending:null, rating:8.6, desc:"Успешная бизнес-леди скрывает тёмное прошлое..." },
  { id:9,  title:"Твоё солнце",                         genre:"Романтика",     episodes:62, freeEpisodes:3, cover:"https://picsum.photos/seed/sun/300/450",     badge:"Эксклюзив", trending:null, rating:8.8, desc:"Слепая девушка и её тайный покровитель..." },
  { id:10, title:"Королева читает мои мысли",           genre:"Фэнтези",       episodes:88, freeEpisodes:3, cover:"https://picsum.photos/seed/mindread/300/450",badge:"Эксклюзив", trending:null, rating:9.0, desc:"Необычный дар превращает жизнь в настоящее испытание..." },
  { id:11, title:"Яков и Алина: Пять лет тайной любви", genre:"Романтика",     episodes:70, freeEpisodes:3, cover:"https://picsum.photos/seed/yakov/300/450",   badge:"Хит",       trending:null, rating:9.4, desc:"Тайная любовь, скрытая от всего мира..." },
  { id:12, title:"Пленница",                            genre:"Триллер",       episodes:65, freeEpisodes:3, cover:"https://picsum.photos/seed/plen/300/450",    badge:"18+",       trending:null, rating:8.5, desc:"Побег из золотой клетки богатого особняка..." },
  { id:14, title:"Охота за сокровищами", genre:"Приключения", episodes:116, freeEpisodes:3, cover:"https://wangwangzyimg.com/upload/vod/20250904-1/777df16eea650fb94f7c44efbeee6bb7.jpg", badge:"Новинка", trending:null, rating:9.1, desc:"Водитель экскаватора случайно находит загадочный металлический шар и получает сверхъестественную способность видеть сквозь любые предметы. Так начинается его путь охотника за сокровищами..." },
];

const GENRES = ["Все","Романтика","Фэнтези","Драма","Комедия","Триллер","Попаданчество"];
const COINS_PACKAGES = [
  { id:1, coins:50,  price:"59 ₽",   bonus:"" },
  { id:2, coins:150, price:"149 ₽",  bonus:"+20 бонус" },
  { id:3, coins:350, price:"299 ₽",  bonus:"+50 бонус", popular:true },
  { id:4, coins:800, price:"599 ₽",  bonus:"+150 бонус" },
];
const VIP_PLANS = [
  { id:1, name:"Неделя", price:"99 ₽",   period:"7 дней",   save:"" },
  { id:2, name:"Месяц",  price:"299 ₽",  period:"30 дней",  save:"Экономия 25%", popular:true },
  { id:3, name:"Год",    price:"1990 ₽", period:"365 дней", save:"Экономия 45%" },
];
const LANGUAGES = [
  { code:"ru", flag:"🇷🇺", name:"Русский" },
  { code:"en", flag:"🇬🇧", name:"English" },
  { code:"th", flag:"🇹🇭", name:"ภาษาไทย" },
  { code:"zh", flag:"🇨🇳", name:"中文" },
  { code:"de", flag:"🇩🇪", name:"Deutsch" },
  { code:"fr", flag:"🇫🇷", name:"Français" },
];

const BUNNY_LIBRARY_ID = "656045";
const VIDEO_MAP = {
  14: {
    1: "55fbff08-60a9-43a9-8b0c-d45d63d45fbd",
    2: "39d36704-db3a-439c-bb50-bb8fdba1d923",
    3: "976fcae1-feff-4c24-9c98-df364021f7a4",
    4: "4c8c2298-5912-4fc0-b787-57f033d75b30",
    5: "e2410fd8-193c-49a0-b745-1b45c5306505",
    6: "d6c3da3e-adc4-424c-baf5-bf0e897d66c3",
    7: "d5e8e631-4761-458a-ab9d-cda2ecf7bbe9",
    8: "814e9df3-1ad4-4f24-bec3-5f3bd73361da",
    9: "1e334e54-f698-4309-8df5-55431c97f1cd",
    10: "04c7e6f2-ab18-4584-94b6-5b4a56747cbd",
    11: "153222f6-0c5e-4e27-957a-9304a57686e6",
    12: "6877ab87-0c37-455c-baaa-8963710b6c0c",
    13: "85e6447e-e5ba-425b-9573-9d4b16a64978",
    14: "b3a64def-f482-4ec6-8bfb-0fbeb614dec0",
    15: "6f59eb73-d8c3-4334-94fd-09592bb96440",
    16: "14882687-3aba-4caa-ba05-eb86e7926773",
    17: "f64062f8-25fc-4e04-b93d-26073471af23",
    18: "73c670f9-0f9e-44b2-8251-af2218c80a67",
    19: "c2cd4d58-9512-4c5f-8f37-92c50eae95ab",
    20: "68ff2e91-984a-4def-b26e-a324bfdebb0e",
    21: "78aacad6-776d-44ac-a3eb-800cfd1df522",
    22: "862e7a2a-c717-4dd0-950d-6038ffc595f6",
    23: "05f3355f-4831-4f25-a0e2-afac92be2235",
    24: "ab865f68-bbac-4422-9333-134ba16b015b",
    25: "f3b4fa88-d1da-48ad-a9e5-1e666ce92d3b",
    26: "11352ee4-370a-462e-938e-67c2790cbc52",
    27: "3a0407fe-7744-4302-8e82-b10311aa25cd",
    28: "cb9b31b3-7ee5-4467-a959-5587defbeb3c",
    29: "fbe14628-d953-440c-8fde-be6775526b13",
    30: "dd0361cc-672a-4055-b0a4-d7ca0dfde730",
    31: "0b29dba0-4a61-4f6e-a67e-94b66b7d6571",
    32: "e20dd3f1-9bf7-404f-af08-058475a78db4",
    33: "d936d337-98ae-41eb-8e2c-0fb7ad084ae5",
    34: "7b25720c-8287-421a-a146-a5edf0c5c15d",
    35: "b1e63e15-4aa4-48f7-a0c0-e57d847dcd9c",
    36: "b6629760-34cd-4ec7-bab4-1a1447b5249e",
    37: "792b2a9d-90d6-4448-bb69-7af3afde6dbb",
    38: "37375ba3-0601-455f-8213-d7c506ddac1e",
    39: "0a190660-6fba-4589-9051-bae53e7d57ed",
    40: "d47aa1c0-8d2d-4945-962f-99ac39a31db0",
    41: "0a1deafa-e4e9-4208-8991-949ab52bf03b",
    42: "e07d6d4c-6d6f-42e9-946e-66b0e9bd4e35",
    43: "6c2303cd-03d1-4257-9e10-d9e8191dd1c8",
    44: "808be851-64f3-4de0-830d-da1993c8ad4a",
    45: "b086bdbb-5e86-4aaa-aed9-cc2152ea13e0",
    46: "7a30649c-f557-4d42-8a38-1afb194fb903",
    47: "fcbd21c7-b118-4796-8981-50aeede89e09",
    48: "a437a09e-a028-43ae-850e-d3addafb99d6",
    49: "2ec630a4-7d76-470e-a338-b01848d46e71",
    50: "a3e1d4be-430c-45a7-95d3-d231e28d0833",
    51: "928e74a3-2b87-48ef-896d-0b556578db59",
    52: "2944f1ff-2f6b-459f-9fb0-e436aab2cd27",
    53: "cfb458d3-be2a-4429-bf97-c124058dc103",
    54: "2d79ba23-8dd4-43d5-a4a3-43b48e9a316c",
    55: "388d2eef-2925-4413-a050-a25ac0da2475",
    56: "a2d17f41-b3cd-4281-a52a-49830896a240",
    57: "e73a56b4-b5a7-482c-9f16-ee00902ed362",
    58: "c2cf55cb-3c93-472e-8bfb-2f15d89cc3f9",
    59: "5f1dba20-902e-4f1d-b6f5-0655a13f5ec1",
    60: "84a3604f-0594-4947-8a52-0069dfb45cc6",
    61: "3c8b7fa9-69e9-4d35-8d4b-1972557a5dec",
    62: "8102aba8-95e2-4641-8c9e-a7aa13378299",
    63: "e841ee49-4726-4941-99cf-15a25b6be267",
    64: "0cd19aaa-f1e6-4e62-b68b-749fb59addd8",
    65: "48b04ed6-4ffd-43ae-aea4-30e931e066b0",
    66: "194cc049-e6cd-423c-81e0-2ba6d59c8d30",
    67: "e79f182c-6f36-4345-9ea6-85ecaa983004",
    68: "9d5ff911-6c3c-48d6-a026-e688b030e394",
    69: "abe4f94c-be2c-4db4-aa7e-2a2cae27503d",
    70: "915d5cf7-40e1-49dd-b949-fa157a871985",
    71: "bd40f2de-bb17-4a1b-b67c-ae9772d96525",
    72: "758fc8da-a253-4b45-9e3e-448e49c6ee19",
    73: "5ba09aaf-bccd-4f02-a066-77ff80c6ed5e",
    74: "d3945a56-4187-4942-a557-bb560545246e",
    75: "b3f27948-9bc0-4823-a404-a4740c8ca64f",
    76: "91095e11-d82d-4965-8066-0ee486a9b672",
    77: "90059efb-1e3d-4078-8e4b-13d784741e10",
    78: "c641fd3d-f226-4ce5-b904-b46f9b550ae2",
    79: "c92044ae-cf94-423d-84c9-f7d7edacc7b6",
    80: "5f087da7-8bdd-4104-9144-13a8a8a2dc4d",
    81: "1ec1b5cd-b672-4ea3-afe2-5b35744819de",
    82: "2ba34146-a990-43a7-8a9a-c2536ae4bd00",
    83: "07e1596f-e07f-4db4-ae4c-c1cf33b2f96c",
    84: "48381274-cddd-459b-b501-43cf1fa332e1",
    85: "a32035c6-cdd9-4103-9303-9c72992068c4",
    86: "324e75c0-3c85-460a-9172-d24efd1f329b",
    87: "6de10d3a-c388-47f0-9f69-31c112b85b09",
    88: "3b96b2e9-da51-4708-a332-0f586df32c0c",
    89: "5e6ffea8-8251-4440-9b76-40263a99f3d0",
    90: "7a6e9076-052a-4d41-8a1f-b4c41f540a7c",
    91: "104de060-bdb2-444f-a2bb-e550f59f9dc2",
    92: "111a61b6-e878-437b-a93d-7f44cfe26466",
    93: "23a32e13-41ee-45f2-83ab-aed996495e68",
    94: "7cf79dcb-b61a-4110-8acc-a0fd3f5cf355",
    95: "97ca7998-f2ee-439b-8d3b-e3ee09e10a1b",
    96: "6068a6a8-8647-488d-89d9-40d3a7eb761e",
    97: "9205e76d-cca7-435f-8fe5-d825d2fc6735",
    98: "647d5d38-2738-4744-87d6-9b2c87325b56",
    99: "0fdc39c6-4293-448c-80f7-43171b3c3b92",
    100: "92878904-50c3-44ac-b500-1cce30406014",
    101: "7c2b40aa-d2c8-4b64-bb78-d226a76ce8f5",
    102: "80be91ec-e618-4fac-8645-ecbf32889565",
    103: "b61aed00-275b-4208-8b42-7577dc790c26",
    104: "08027610-f889-44c5-b5d3-d075008ad6b3",
    105: "2261ccf9-0183-40d2-b4dc-8060a866862d",
    106: "6eb9f5bc-9dc1-4cf5-a200-feba94cf4148",
    107: "f15ee79f-b889-4281-a338-c4cf69b80ad8",
    108: "5f5d6f15-8d82-40cb-be8f-971268f9ef5f",
    109: "98572c10-b5b8-471d-970f-0f07f49ba9e7",
    110: "315436d9-7985-42c5-9331-14706f60d531",
    111: "4ec25e34-6690-4159-b4a9-66b71762cfd5",
    112: "c3d699aa-f693-4450-ba9b-564e756a3fdb",
    113: "74f198cd-5b2a-4a13-9a15-d607a4b9c100",
    114: "942aa36c-fd6d-4bca-91dc-69d9cd9656ff",
    115: "fd289203-4d75-4da1-9695-77fb2972e823",
    116: "8a7c5de3-bdcc-4da5-8268-6ece4affc002"
  }
};
const SUBTITLES_MAP = {
  14: {
    1: { ru: "https://zendrama-subs.b-cdn.net/okhota_ep001_ru.srt?v=3" },
    2: { ru: "https://zendrama-subs.b-cdn.net/okhota_ep002_ru.srt?v=3" },
    3: { ru: "https://zendrama-subs.b-cdn.net/okhota_ep003_ru.srt?v=3" },
    4: { ru: "https://zendrama-subs.b-cdn.net/okhota_ep004_ru.srt?v=3" },
    5: { ru: "https://zendrama-subs.b-cdn.net/okhota_ep005_ru.srt?v=3" },
    6: { ru: "https://zendrama-subs.b-cdn.net/okhota_ep006_ru.srt?v=3" },
    7: { ru: "https://zendrama-subs.b-cdn.net/okhota_ep007_ru.srt?v=3" },
    8: { ru: "https://zendrama-subs.b-cdn.net/okhota_ep008_ru.srt?v=3" },
    9: { ru: "https://zendrama-subs.b-cdn.net/okhota_ep009_ru.srt?v=3" },
    10: { ru: "https://zendrama-subs.b-cdn.net/okhota_ep010_ru.srt?v=3" },
    11: { ru: "https://zendrama-subs.b-cdn.net/okhota_ep011_ru.srt?v=3" },
    12: { ru: "https://zendrama-subs.b-cdn.net/okhota_ep012_ru.srt?v=3" },
    13: { ru: "https://zendrama-subs.b-cdn.net/okhota_ep013_ru.srt?v=3" },
    14: { ru: "https://zendrama-subs.b-cdn.net/okhota_ep014_ru.srt?v=3" },
    15: { ru: "https://zendrama-subs.b-cdn.net/okhota_ep015_ru.srt?v=3" },
    16: { ru: "https://zendrama-subs.b-cdn.net/okhota_ep016_ru.srt?v=3" },
    17: { ru: "https://zendrama-subs.b-cdn.net/okhota_ep017_ru.srt?v=3" },
    18: { ru: "https://zendrama-subs.b-cdn.net/okhota_ep018_ru.srt?v=3" },
    19: { ru: "https://zendrama-subs.b-cdn.net/okhota_ep019_ru.srt?v=3" },
    20: { ru: "https://zendrama-subs.b-cdn.net/okhota_ep020_ru.srt?v=3" },
    21: { ru: "https://zendrama-subs.b-cdn.net/okhota_ep021_ru.srt?v=3" },
    22: { ru: "https://zendrama-subs.b-cdn.net/okhota_ep022_ru.srt?v=3" },
    23: { ru: "https://zendrama-subs.b-cdn.net/okhota_ep023_ru.srt?v=3" },
    24: { ru: "https://zendrama-subs.b-cdn.net/okhota_ep024_ru.srt?v=3" },
    25: { ru: "https://zendrama-subs.b-cdn.net/okhota_ep025_ru.srt?v=3" },
    26: { ru: "https://zendrama-subs.b-cdn.net/okhota_ep026_ru.srt?v=3" },
    27: { ru: "https://zendrama-subs.b-cdn.net/okhota_ep027_ru.srt?v=3" },
    28: { ru: "https://zendrama-subs.b-cdn.net/okhota_ep028_ru.srt?v=3" },
    29: { ru: "https://zendrama-subs.b-cdn.net/okhota_ep029_ru.srt?v=3" },
    30: { ru: "https://zendrama-subs.b-cdn.net/okhota_ep030_ru.srt?v=3" },
    31: { ru: "https://zendrama-subs.b-cdn.net/okhota_ep031_ru.srt?v=3" },
    32: { ru: "https://zendrama-subs.b-cdn.net/okhota_ep032_ru.srt?v=3" },
    33: { ru: "https://zendrama-subs.b-cdn.net/okhota_ep033_ru.srt?v=3" },
    34: { ru: "https://zendrama-subs.b-cdn.net/okhota_ep034_ru.srt?v=3" },
    35: { ru: "https://zendrama-subs.b-cdn.net/okhota_ep035_ru.srt?v=3" },
    36: { ru: "https://zendrama-subs.b-cdn.net/okhota_ep036_ru.srt?v=3" },
    37: { ru: "https://zendrama-subs.b-cdn.net/okhota_ep037_ru.srt?v=3" },
    38: { ru: "https://zendrama-subs.b-cdn.net/okhota_ep038_ru.srt?v=3" },
    39: { ru: "https://zendrama-subs.b-cdn.net/okhota_ep039_ru.srt?v=3" },
    40: { ru: "https://zendrama-subs.b-cdn.net/okhota_ep040_ru.srt?v=3" },
    41: { ru: "https://zendrama-subs.b-cdn.net/okhota_ep041_ru.srt?v=3" },
    42: { ru: "https://zendrama-subs.b-cdn.net/okhota_ep042_ru.srt?v=3" },
    43: { ru: "https://zendrama-subs.b-cdn.net/okhota_ep043_ru.srt?v=3" },
    44: { ru: "https://zendrama-subs.b-cdn.net/okhota_ep044_ru.srt?v=3" },
    45: { ru: "https://zendrama-subs.b-cdn.net/okhota_ep045_ru.srt?v=3" },
    46: { ru: "https://zendrama-subs.b-cdn.net/okhota_ep046_ru.srt?v=3" },
    47: { ru: "https://zendrama-subs.b-cdn.net/okhota_ep047_ru.srt?v=3" },
    48: { ru: "https://zendrama-subs.b-cdn.net/okhota_ep048_ru.srt?v=3" },
    49: { ru: "https://zendrama-subs.b-cdn.net/okhota_ep049_ru.srt?v=3" },
    50: { ru: "https://zendrama-subs.b-cdn.net/okhota_ep050_ru.srt?v=3" },
    51: { ru: "https://zendrama-subs.b-cdn.net/okhota_ep051_ru.srt?v=3" },
    52: { ru: "https://zendrama-subs.b-cdn.net/okhota_ep052_ru.srt?v=3" },
    53: { ru: "https://zendrama-subs.b-cdn.net/okhota_ep053_ru.srt?v=3" },
    54: { ru: "https://zendrama-subs.b-cdn.net/okhota_ep054_ru.srt?v=3" },
    55: { ru: "https://zendrama-subs.b-cdn.net/okhota_ep055_ru.srt?v=3" },
    56: { ru: "https://zendrama-subs.b-cdn.net/okhota_ep056_ru.srt?v=3" },
    57: { ru: "https://zendrama-subs.b-cdn.net/okhota_ep057_ru.srt?v=3" },
    58: { ru: "https://zendrama-subs.b-cdn.net/okhota_ep058_ru.srt?v=3" },
    59: { ru: "https://zendrama-subs.b-cdn.net/okhota_ep059_ru.srt?v=3" },
    60: { ru: "https://zendrama-subs.b-cdn.net/okhota_ep060_ru.srt?v=3" },
    61: { ru: "https://zendrama-subs.b-cdn.net/okhota_ep061_ru.srt?v=3" },
    62: { ru: "https://zendrama-subs.b-cdn.net/okhota_ep062_ru.srt?v=3" },
    63: { ru: "https://zendrama-subs.b-cdn.net/okhota_ep063_ru.srt?v=3" },
    64: { ru: "https://zendrama-subs.b-cdn.net/okhota_ep064_ru.srt?v=3" },
    65: { ru: "https://zendrama-subs.b-cdn.net/okhota_ep065_ru.srt?v=3" },
    66: { ru: "https://zendrama-subs.b-cdn.net/okhota_ep066_ru.srt?v=3" },
    67: { ru: "https://zendrama-subs.b-cdn.net/okhota_ep067_ru.srt?v=3" },
    68: { ru: "https://zendrama-subs.b-cdn.net/okhota_ep068_ru.srt?v=3" },
    69: { ru: "https://zendrama-subs.b-cdn.net/okhota_ep069_ru.srt?v=3" },
    70: { ru: "https://zendrama-subs.b-cdn.net/okhota_ep070_ru.srt?v=3" },
    71: { ru: "https://zendrama-subs.b-cdn.net/okhota_ep071_ru.srt?v=3" },
    72: { ru: "https://zendrama-subs.b-cdn.net/okhota_ep072_ru.srt?v=3" },
    73: { ru: "https://zendrama-subs.b-cdn.net/okhota_ep073_ru.srt?v=3" },
    74: { ru: "https://zendrama-subs.b-cdn.net/okhota_ep074_ru.srt?v=3" },
    75: { ru: "https://zendrama-subs.b-cdn.net/okhota_ep075_ru.srt?v=3" },
    76: { ru: "https://zendrama-subs.b-cdn.net/okhota_ep076_ru.srt?v=3" },
    77: { ru: "https://zendrama-subs.b-cdn.net/okhota_ep077_ru.srt?v=3" },
    78: { ru: "https://zendrama-subs.b-cdn.net/okhota_ep078_ru.srt?v=3" },
    79: { ru: "https://zendrama-subs.b-cdn.net/okhota_ep079_ru.srt?v=3" },
    80: { ru: "https://zendrama-subs.b-cdn.net/okhota_ep080_ru.srt?v=3" },
    81: { ru: "https://zendrama-subs.b-cdn.net/okhota_ep081_ru.srt?v=3" },
    82: { ru: "https://zendrama-subs.b-cdn.net/okhota_ep082_ru.srt?v=3" },
    83: { ru: "https://zendrama-subs.b-cdn.net/okhota_ep083_ru.srt?v=3" },
    84: { ru: "https://zendrama-subs.b-cdn.net/okhota_ep084_ru.srt?v=3" },
    85: { ru: "https://zendrama-subs.b-cdn.net/okhota_ep085_ru.srt?v=3" },
    86: { ru: "https://zendrama-subs.b-cdn.net/okhota_ep086_ru.srt?v=3" },
    87: { ru: "https://zendrama-subs.b-cdn.net/okhota_ep087_ru.srt?v=3" },
    88: { ru: "https://zendrama-subs.b-cdn.net/okhota_ep088_ru.srt?v=3" },
    89: { ru: "https://zendrama-subs.b-cdn.net/okhota_ep089_ru.srt?v=3" },
    90: { ru: "https://zendrama-subs.b-cdn.net/okhota_ep090_ru.srt?v=3" },
    91: { ru: "https://zendrama-subs.b-cdn.net/okhota_ep091_ru.srt?v=3" },
    92: { ru: "https://zendrama-subs.b-cdn.net/okhota_ep092_ru.srt?v=3" },
    93: { ru: "https://zendrama-subs.b-cdn.net/okhota_ep093_ru.srt?v=3" },
    94: { ru: "https://zendrama-subs.b-cdn.net/okhota_ep094_ru.srt?v=3" },
    95: { ru: "https://zendrama-subs.b-cdn.net/okhota_ep095_ru.srt?v=3" },
    96: { ru: "https://zendrama-subs.b-cdn.net/okhota_ep096_ru.srt?v=3" },
    97: { ru: "https://zendrama-subs.b-cdn.net/okhota_ep097_ru.srt?v=3" },
    98: { ru: "https://zendrama-subs.b-cdn.net/okhota_ep098_ru.srt?v=3" },
    99: { ru: "https://zendrama-subs.b-cdn.net/okhota_ep099_ru.srt?v=3" },
    100: { ru: "https://zendrama-subs.b-cdn.net/okhota_ep100_ru.srt?v=3" },
    101: { ru: "https://zendrama-subs.b-cdn.net/okhota_ep101_ru.srt?v=3" },
    102: { ru: "https://zendrama-subs.b-cdn.net/okhota_ep102_ru.srt?v=3" },
    103: { ru: "https://zendrama-subs.b-cdn.net/okhota_ep103_ru.srt?v=3" },
    104: { ru: "https://zendrama-subs.b-cdn.net/okhota_ep104_ru.srt?v=3" },
    105: { ru: "https://zendrama-subs.b-cdn.net/okhota_ep105_ru.srt?v=3" },
    106: { ru: "https://zendrama-subs.b-cdn.net/okhota_ep106_ru.srt?v=3" },
    107: { ru: "https://zendrama-subs.b-cdn.net/okhota_ep107_ru.srt?v=3" },
    108: { ru: "https://zendrama-subs.b-cdn.net/okhota_ep108_ru.srt?v=3" },
    109: { ru: "https://zendrama-subs.b-cdn.net/okhota_ep109_ru.srt?v=3" },
    110: { ru: "https://zendrama-subs.b-cdn.net/okhota_ep110_ru.srt?v=3" },
    111: { ru: "https://zendrama-subs.b-cdn.net/okhota_ep111_ru.srt?v=3" },
    112: { ru: "https://zendrama-subs.b-cdn.net/okhota_ep112_ru.srt?v=3" },
    113: { ru: "https://zendrama-subs.b-cdn.net/okhota_ep113_ru.srt?v=3" },
    114: { ru: "https://zendrama-subs.b-cdn.net/okhota_ep114_ru.srt?v=3" },
    115: { ru: "https://zendrama-subs.b-cdn.net/okhota_ep115_ru.srt?v=3" },
    116: { ru: "https://zendrama-subs.b-cdn.net/okhota_ep116_ru.srt?v=3" }
  }
};

function getBunnyUrl(seriesId, episode) {
  const v = VIDEO_MAP[seriesId]?.[episode];
  return v ? `https://vz-433c2f1e-a5b.b-cdn.net/${v}/playlist.m3u8` : null;
}
function getSubtitleUrl(seriesId, episode, langCode) {
  return SUBTITLES_MAP[seriesId]?.[episode]?.[langCode] || null;
}
function useLS(key, def) {
  const [v, setV] = useState(() => { try { const s = localStorage.getItem(key); return s ? JSON.parse(s) : def; } catch { return def; } });
  const set = (x) => { setV(x); try { localStorage.setItem(key, JSON.stringify(x)); } catch {} };
  return [v, set];
}
function detectLanguage() {
  try { const s = localStorage.getItem("zd_lang"); if (s) return s; const b = navigator.language?.split("-")[0]||"ru"; return LANGUAGES.find(l=>l.code===b)?b:"ru"; } catch { return "ru"; }
}

const UI_TEXT = {
  ru: { home:"Главная", watch:"Смотреть", profile:"Профиль", search:"Найти сериал...", trending:"🔥 В тренде", all:"⭐ Все сериалы", continueW:"▶ Продолжить", episodes:"Серии", desc:"Описание", series:"серий", free:"бесплатно", premium:"Premium", wallet:"Мой кошелёк", topup:"Пополнить", history:"История просмотров", bookmarks:"Закладки", bonuses:"Центр бонусов", subtitles:"Субтитры", off:"Выкл", language:"Язык", episode:"Серия", next:"Следующая серия →", shop:"Магазин", coins:"Монеты", connect:"Подключить →" },
  en: { home:"Home", watch:"Watch", profile:"Profile", search:"Search series...", trending:"🔥 Trending", all:"⭐ All Series", continueW:"▶ Continue", episodes:"Episodes", desc:"Description", series:"episodes", free:"free", premium:"Premium", wallet:"My Wallet", topup:"Top Up", history:"Watch History", bookmarks:"Bookmarks", bonuses:"Bonus Center", subtitles:"Subtitles", off:"Off", language:"Language", episode:"Episode", next:"Next Episode →", shop:"Shop", coins:"Coins", connect:"Subscribe →" },
  th: { home:"หน้าหลัก", watch:"ดู", profile:"โปรไฟล์", search:"ค้นหาซีรีส์...", trending:"🔥 ยอดนิยม", all:"⭐ ทั้งหมด", continueW:"▶ ดูต่อ", episodes:"ตอน", desc:"คำอธิบาย", series:"ตอน", free:"ฟรี", premium:"พรีเมียม", wallet:"กระเป๋า", topup:"เติม", history:"ประวัติ", bookmarks:"บุ๊กมาร์ก", bonuses:"โบนัส", subtitles:"คำบรรยาย", off:"ปิด", language:"ภาษา", episode:"ตอนที่", next:"ตอนถัดไป →", shop:"ร้านค้า", coins:"เหรียญ", connect:"สมัคร →" },
  zh: { home:"首页", watch:"观看", profile:"我的", search:"搜索...", trending:"🔥 热门", all:"⭐ 全部", continueW:"▶ 继续", episodes:"集数", desc:"简介", series:"集", free:"免费", premium:"会员", wallet:"钱包", topup:"充值", history:"历史", bookmarks:"收藏", bonuses:"奖励", subtitles:"字幕", off:"关闭", language:"语言", episode:"第", next:"下一集 →", shop:"商城", coins:"金币", connect:"订阅 →" },
  de: { home:"Startseite", watch:"Ansehen", profile:"Profil", search:"Serie suchen...", trending:"🔥 Trends", all:"⭐ Alle", continueW:"▶ Weiter", episodes:"Folgen", desc:"Beschreibung", series:"Folgen", free:"kostenlos", premium:"Premium", wallet:"Wallet", topup:"Aufladen", history:"Verlauf", bookmarks:"Lesezeichen", bonuses:"Bonus", subtitles:"Untertitel", off:"Aus", language:"Sprache", episode:"Folge", next:"Nächste →", shop:"Shop", coins:"Münzen", connect:"Abonnieren →" },
  fr: { home:"Accueil", watch:"Regarder", profile:"Profil", search:"Chercher...", trending:"🔥 Tendances", all:"⭐ Toutes", continueW:"▶ Continuer", episodes:"Épisodes", desc:"Description", series:"épisodes", free:"gratuit", premium:"Premium", wallet:"Portefeuille", topup:"Recharger", history:"Historique", bookmarks:"Favoris", bonuses:"Bonus", subtitles:"Sous-titres", off:"Désactivé", language:"Langue", episode:"Épisode", next:"Suivant →", shop:"Boutique", coins:"Pièces", connect:"S'abonner →" },
};

const Ico = ({ d, size=22, color="currentColor", fill="none", sw=1.8 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"><path d={d}/></svg>
);
const IcoHome     = () => <Ico d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z M9 22V12h6v10"/>;
const IcoPlay     = () => <Ico d="M5 3l14 9-14 9V3z" fill="currentColor" color="currentColor"/>;
const IcoUser     = () => <Ico d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2 M12 11a4 4 0 100-8 4 4 0 000 8z"/>;
const IcoSearch   = () => <Ico d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>;
const IcoClose    = () => <Ico d="M18 6L6 18M6 6l12 12"/>;
const IcoLock     = () => <Ico d="M19 11H5a2 2 0 00-2 2v7a2 2 0 002 2h14a2 2 0 002-2v-7a2 2 0 00-2-2zM7 11V7a5 5 0 0110 0v4"/>;
const IcoCrown    = () => <Ico d="M2 20h20M5 20L3 8l4.5 4L12 4l4.5 8L21 8l-2 12" color={C.accent}/>;
const IcoHistory  = () => <Ico d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>;
const IcoBookmark = ({f}) => <Ico d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" fill={f?"currentColor":"none"}/>;

const ZenLogo = ({ size=28 }) => (
  <svg width={size*3.2} height={size} viewBox="0 0 96 28" fill="none">
    <circle cx="14" cy="14" r="12" stroke={C.accent} strokeWidth="1.5"/>
    <path d="M14 6 C14 6 8 10 8 14 C8 18 14 22 14 22 C14 22 20 18 20 14 C20 10 14 6 14 6Z" fill={C.accent} opacity="0.3"/>
    <path d="M14 8 C14 8 10 12 10 16" stroke={C.accentLight} strokeWidth="1" strokeLinecap="round"/>
    <path d="M14 8 C14 8 18 12 18 16" stroke={C.accentLight} strokeWidth="1" strokeLinecap="round"/>
    <circle cx="14" cy="16" r="2" fill={C.accent}/>
    <text x="30" y="19" fontFamily="system-ui,sans-serif" fontWeight="700" fontSize="14" fill={C.text} letterSpacing="0.5">Zen</text>
    <text x="56" y="19" fontFamily="system-ui,sans-serif" fontWeight="300" fontSize="14" fill={C.accentLight} letterSpacing="0.5">Drama</text>
  </svg>
);

const CoinIco = () => (
  <svg width={15} height={15} viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" fill={C.accent}/>
    <text x="12" y="16" textAnchor="middle" fontSize="10" fill="#fff" fontWeight="bold">円</text>
  </svg>
);

function Badge({ text }) {
  const map = { "Эксклюзив":{ bg:"#1e1a40", color:C.accentLight }, "Хит":{ bg:"#3a1225", color:"#f472b6" }, "Новинка":{ bg:"#0d2e20", color:C.jade }, "18+":{ bg:"#2a1a2e", color:"#c084fc" } };
  const s = map[text]||{ bg:"#1e1e2a", color:C.textMuted };
  return <span style={{ background:s.bg, color:s.color, fontSize:10, fontWeight:700, padding:"2px 7px", borderRadius:4, letterSpacing:0.5 }}>{text}</span>;
}

function SeriesCard({ series, onClick, watchHistory }) {
  const prog = watchHistory[series.id];
  const pct = prog ? Math.round((prog/series.episodes)*100) : 0;
  return (
    <div onClick={() => onClick(series)} style={{ cursor:"pointer", borderRadius:10, overflow:"hidden", background:C.card, transition:"transform 0.18s" }}
      onMouseEnter={e => e.currentTarget.style.transform="scale(1.03)"}
      onMouseLeave={e => e.currentTarget.style.transform="scale(1)"}
    >
      <div style={{ position:"relative", aspectRatio:"2/3" }}>
        <img src={series.cover} alt={series.title} style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }}/>
        <div style={{ position:"absolute", top:6, left:6 }}><Badge text={series.badge}/></div>
        <div style={{ position:"absolute", bottom:0, left:0, right:0, background:"linear-gradient(transparent,rgba(8,9,13,0.95))", padding:"22px 8px 8px" }}>
          <div style={{ color:C.text, fontSize:12, fontWeight:700, lineHeight:1.3 }}>{series.title}</div>
        </div>
        {prog && <div style={{ position:"absolute", bottom:0, left:0, right:0, height:3, background:"#1e1e2a" }}>
          <div style={{ height:"100%", width:`${pct}%`, background:C.accent }}/>
        </div>}
      </div>
      <div style={{ padding:"5px 8px 8px", fontSize:11, color:C.textMuted }}>{series.genre} · {series.episodes} сер.</div>
    </div>
  );
}

function EpRow({ ep, isLocked, coins, onUnlock, onWatch }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:12, padding:"10px 16px", borderBottom:`1px solid ${C.card2}` }}>
      <div style={{ width:38, height:38, borderRadius:8, background:isLocked?"#1a1c24":`${C.accent}18`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
        {isLocked ? <IcoLock/> : <span style={{ color:C.accent, fontWeight:700 }}>{ep}</span>}
      </div>
      <div style={{ flex:1 }}>
        <div style={{ color:isLocked?C.textMuted:C.text, fontSize:14 }}>Серия {ep}</div>
        <div style={{ color:C.textDim, fontSize:11 }}>~2 мин</div>
      </div>
      {isLocked ? (
        <button onClick={() => onUnlock(ep)} style={{ background:C.accent, color:"#fff", border:"none", borderRadius:20, padding:"5px 14px", fontSize:12, fontWeight:700, cursor:"pointer", display:"flex", alignItems:"center", gap:4 }}>
          <CoinIco/> 5
        </button>
      ) : (
        <button onClick={() => onWatch(ep)} style={{ background:"transparent", border:`1px solid ${C.accent}`, color:C.accent, borderRadius:20, padding:"5px 14px", fontSize:12, cursor:"pointer" }}>
          ▶ Смотреть
        </button>
      )}
    </div>
  );
}

function parseSRT(srt) {
  const blocks = srt.trim().split(/\n\n+/);
  return blocks.map(block => {
    const lines = block.trim().split('\n');
    if (lines.length < 3) return null;
    const time = lines[1].match(/(\d+):(\d+):(\d+)[,.](\d+) --> (\d+):(\d+):(\d+)[,.](\d+)/);
    if (!time) return null;
    const start = +time[1]*3600 + +time[2]*60 + +time[3] + +time[4]/1000;
    const end   = +time[5]*3600 + +time[6]*60 + +time[7] + +time[8]/1000;
    const text = lines.slice(2).join(' ').replace(/<[^>]+>/g,'');
    return { start, end, text };
  }).filter(Boolean);
}

function Player({ series, episode, onClose, onNext, appLang, t }) {
  const videoRef     = useRef(null);
  const hlsRef       = useRef(null);
  const controlTimer = useRef(null);

  const [showControls, setShowControls] = useState(true);
  const [currentSub,   setCurrentSub]   = useState('');
  const [srtData,      setSrtData]       = useState([]);
  const [isPlaying,    setIsPlaying]     = useState(false);
  const [progress,     setProgress]      = useState(0);
  const [currentTime,  setCurrentTime]   = useState('0:00');
  const [duration,     setDuration]      = useState('0:00');
  const [muted,        setMuted]         = useState(false);
  const [quality,      setQuality]       = useState('Auto');
  const [showQuality,  setShowQuality]   = useState(false);
  const [isFullscreen, setIsFullscreen]  = useState(false);
  const [showSubs,     setShowSubs]      = useState(true);
  const [subLang,      setSubLang]       = useLS('zd_sublang', appLang);
  const [showSubMenu,  setShowSubMenu]   = useState(false);

  const hlsUrl = getBunnyUrl(series.id, episode);
  const nextHlsUrl = getBunnyUrl(series.id, episode + 1);
  const subUrl = showSubs ? getSubtitleUrl(series.id, episode, subLang) : null;

  // Preload следующей серии
  useEffect(() => {
    if (!nextHlsUrl) return;
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'fetch';
    link.href = nextHlsUrl;
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
    return () => { try { document.head.removeChild(link); } catch {} };
  }, [nextHlsUrl]);

  function fmt(s) { if(!s||isNaN(s)) return '0:00'; return `${Math.floor(s/60)}:${String(Math.floor(s%60)).padStart(2,'0')}`; }

  function toggleFullscreen() {
    const el = document.documentElement;
    if (!document.fullscreenElement) { el.requestFullscreen?.()||el.webkitRequestFullscreen?.(); setIsFullscreen(true); }
    else { document.exitFullscreen?.()||document.webkitExitFullscreen?.(); setIsFullscreen(false); }
  }

  useEffect(() => {
    document.body.style.overflow='hidden'; document.body.style.position='fixed'; document.body.style.width='100%';
    return () => { document.body.style.overflow=''; document.body.style.position=''; document.body.style.width=''; };
  }, []);

  useEffect(() => {
    if (!hlsUrl||!videoRef.current) return;
    const video = videoRef.current;
    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = hlsUrl; video.play().catch(()=>{});
    } else {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/hls.js/1.4.10/hls.min.js';
      script.onload = () => {
        if (window.Hls?.isSupported()) {
          const hls = new window.Hls({ enableWorker:false });
          hls.loadSource(hlsUrl); hls.attachMedia(video);
          hls.on(window.Hls.Events.MANIFEST_PARSED, () => video.play().catch(()=>{}));
          hlsRef.current = hls;
        }
      };
      document.head.appendChild(script);
    }
    return () => { if(hlsRef.current){hlsRef.current.destroy();hlsRef.current=null;} };
  }, [hlsUrl]);

  useEffect(() => {
    if (!subUrl) { setSrtData([]); setCurrentSub(''); return; }
    fetch(subUrl).then(r=>r.text()).then(text=>setSrtData(parseSRT(text))).catch(()=>{});
  }, [subUrl]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onTime = () => {
      const ct = video.currentTime;
      setProgress(ct/(video.duration||1));
      setCurrentTime(fmt(ct)); setDuration(fmt(video.duration));
      const sub = srtData.find(s=>ct>=s.start&&ct<=s.end);
      setCurrentSub(sub?sub.text:'');
    };
    const onEnded = () => { onNext(); };
    video.addEventListener('timeupdate', onTime);
    video.addEventListener('play', ()=>setIsPlaying(true));
    video.addEventListener('pause', ()=>setIsPlaying(false));
    video.addEventListener('ended', onEnded);
    return () => {
      video.removeEventListener('timeupdate', onTime);
      video.removeEventListener('ended', onEnded);
    };
  }, [srtData]);

  function showCtrl() {
    setShowControls(true);
    clearTimeout(controlTimer.current);
    controlTimer.current = setTimeout(()=>setShowControls(false), 3000);
  }
  useEffect(() => { showCtrl(); return ()=>clearTimeout(controlTimer.current); }, []);

  function togglePlay() { const v=videoRef.current; if(!v) return; v.paused?v.play():v.pause(); showCtrl(); }

  const glassBtn = (size=44) => ({
    width:size, height:size, borderRadius:"50%", border:"none", cursor:"pointer",
    background:"radial-gradient(circle at 35% 35%, rgba(255,255,255,0.35), rgba(255,255,255,0.08))",
    backdropFilter:"blur(12px)", WebkitBackdropFilter:"blur(12px)",
    boxShadow:"0 4px 20px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.4), inset 0 -1px 1px rgba(0,0,0,0.3)",
    color:"#fff", display:"flex", alignItems:"center", justifyContent:"center",
  });

  const glassPill = {
    background:"radial-gradient(circle at 35% 35%, rgba(255,255,255,0.3), rgba(0,0,0,0.4))",
    backdropFilter:"blur(12px)", WebkitBackdropFilter:"blur(12px)",
    boxShadow:"0 4px 16px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.3)",
    border:"none", color:"#fff", borderRadius:10, padding:"5px 10px",
    fontSize:11, fontWeight:700, cursor:"pointer",
  };

  return (
    <div onClick={showCtrl} style={{ position:"fixed", inset:0, background:"#000", zIndex:200, overflow:"hidden" }}>
      {hlsUrl ? (
        <video ref={videoRef} style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"contain" }} playsInline webkit-playsinline="true" preload="auto" poster={`https://vz-433c2f1e-a5b.b-cdn.net/${VIDEO_MAP[series.id]?.[episode]}/thumbnail.jpg`}/>
      ) : (
        <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column" }}>
          <div style={{ fontSize:56 }}>🎬</div>
          <div style={{ color:C.textMuted, fontSize:14, marginTop:12 }}>Видео скоро появится</div>
        </div>
      )}

      {currentSub && showSubs && (
        <div style={{ position:"absolute", bottom:"12%", left:"4%", right:"4%", textAlign:"center", zIndex:6, pointerEvents:"none" }}>
          <span style={{ color:"#fff", fontSize:24, fontWeight:800, lineHeight:1.4, fontFamily:"-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif", textShadow:"0 0 10px #000,0 0 10px #000,0 0 10px #000,1px 1px 0 #000,-1px -1px 0 #000,1px -1px 0 #000,-1px 1px 0 #000" }}>
            {currentSub}
          </span>
        </div>
      )}

      <div style={{ position:"absolute", inset:0, zIndex:10, opacity:showControls?1:0, transition:"opacity 0.3s", pointerEvents:showControls?"auto":"none" }}>
        <div style={{ position:"absolute", top:0, left:0, right:0, background:"linear-gradient(rgba(0,0,0,0.7),transparent)", padding:"16px", display:"flex", alignItems:"center", gap:12 }}>
          <button onClick={e=>{e.stopPropagation();onClose();}} style={{...glassBtn(40),flexShrink:0}}><IcoClose/></button>
          <span style={{ color:"#fff", fontSize:13, fontWeight:600 }}>{series.title} — {t.episode} {episode}</span>
        </div>

        <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", display:"flex", alignItems:"center", gap:28 }}>
          <button onClick={e=>{e.stopPropagation();const v=videoRef.current;if(v)v.currentTime=Math.max(0,v.currentTime-10);showCtrl();}} style={{...glassBtn(54),flexDirection:"column",gap:1,fontSize:11,fontWeight:700}}>
            <span style={{fontSize:20,lineHeight:1}}>↺</span><span>10</span>
          </button>
          <button onClick={e=>{e.stopPropagation();togglePlay();}} style={{ width:70,height:70,borderRadius:"50%",border:"none",cursor:"pointer",fontSize:26,color:"#fff", background:"radial-gradient(circle at 35% 30%, rgba(255,255,255,0.45), rgba(124,106,247,0.6))", backdropFilter:"blur(16px)",WebkitBackdropFilter:"blur(16px)", boxShadow:"0 6px 30px rgba(124,106,247,0.6), inset 0 2px 2px rgba(255,255,255,0.5)", display:"flex",alignItems:"center",justifyContent:"center" }}>
            {isPlaying?"⏸":"▶"}
          </button>
          <button onClick={e=>{e.stopPropagation();const v=videoRef.current;if(v)v.currentTime=Math.min(v.duration||999,v.currentTime+10);showCtrl();}} style={{...glassBtn(54),flexDirection:"column",gap:1,fontSize:11,fontWeight:700}}>
            <span style={{fontSize:20,lineHeight:1}}>↻</span><span>10</span>
          </button>
        </div>

        <div style={{ position:"absolute", bottom:90, right:16, display:"flex", flexDirection:"column", alignItems:"center", gap:10 }}>
          <div style={{ position:"relative" }}>
            <button onClick={e=>{e.stopPropagation();setShowQuality(v=>!v);setShowSubMenu(false);showCtrl();}} style={glassPill}>{quality}</button>
            {showQuality && (
              <div style={{ position:"absolute", bottom:36, right:0, background:"rgba(10,10,20,0.97)", borderRadius:10, overflow:"hidden", boxShadow:"0 4px 20px rgba(0,0,0,0.6)", border:"1px solid rgba(255,255,255,0.1)", minWidth:80 }}>
                {["Auto","1080p","720p","480p"].map(q => (
                  <div key={q} onClick={e=>{e.stopPropagation();setQuality(q);setShowQuality(false);showCtrl();}} style={{ padding:"8px 16px", color:quality===q?C.accent:"#fff", fontSize:13, cursor:"pointer", background:quality===q?`${C.accent}18`:"transparent" }}>{q}</div>
                ))}
              </div>
            )}
          </div>

          <div style={{ position:"relative" }}>
            <button onClick={e=>{e.stopPropagation();setShowSubMenu(v=>!v);setShowQuality(false);showCtrl();}} style={{ ...glassPill, background:showSubs?"radial-gradient(circle at 35% 35%, rgba(124,106,247,0.6), rgba(124,106,247,0.3))":"radial-gradient(circle at 35% 35%, rgba(255,255,255,0.3), rgba(0,0,0,0.4))" }}>
              CC {showSubs ? LANGUAGES.find(l=>l.code===subLang)?.flag : ''}
            </button>
            {showSubMenu && (
              <div style={{ position:"absolute", bottom:36, right:0, background:"rgba(10,10,20,0.97)", borderRadius:10, overflow:"hidden", boxShadow:"0 4px 20px rgba(0,0,0,0.6)", border:"1px solid rgba(255,255,255,0.1)", minWidth:150 }}>
                <div onClick={e=>{e.stopPropagation();setShowSubs(false);setShowSubMenu(false);showCtrl();}} style={{ padding:"8px 16px", color:!showSubs?C.accent:"#fff", fontSize:13, cursor:"pointer", display:"flex", alignItems:"center", gap:8 }}>
                  🚫 {t.off}
                </div>
                {LANGUAGES.map(lang => {
                  const hasUrl = !!getSubtitleUrl(series.id, episode, lang.code);
                  return (
                    <div key={lang.code} onClick={e=>{if(!hasUrl)return;e.stopPropagation();setSubLang(lang.code);setShowSubs(true);setShowSubMenu(false);showCtrl();}} style={{ padding:"8px 16px", color:showSubs&&subLang===lang.code?C.accent:hasUrl?"#fff":C.textDim, fontSize:13, cursor:hasUrl?"pointer":"default", display:"flex", alignItems:"center", gap:8, background:showSubs&&subLang===lang.code?`${C.accent}18`:"transparent" }}>
                      {lang.flag} {lang.name} {!hasUrl&&<span style={{fontSize:10,color:C.textDim}}>(скоро)</span>}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <button onClick={e=>{e.stopPropagation();setMuted(v=>{const nm=!v;if(videoRef.current)videoRef.current.muted=nm;return nm;});showCtrl();}} style={{...glassBtn(44),fontSize:18}}>{muted?"🔇":"🔊"}</button>
          <button onClick={e=>{e.stopPropagation();toggleFullscreen();showCtrl();}} style={{...glassBtn(44),fontSize:18}}>{isFullscreen?"⤡":"⤢"}</button>
        </div>

        <div style={{ position:"absolute", bottom:80, left:16, right:16 }}>
          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
            <span style={{ color:"rgba(255,255,255,0.8)", fontSize:12 }}>{currentTime}</span>
            <span style={{ color:"rgba(255,255,255,0.5)", fontSize:12 }}>{duration}</span>
          </div>
          <div style={{ height:3, background:"rgba(255,255,255,0.2)", borderRadius:2, cursor:"pointer" }}
            onClick={e=>{e.stopPropagation();const rect=e.currentTarget.getBoundingClientRect();const pct=(e.clientX-rect.left)/rect.width;const v=videoRef.current;if(v)v.currentTime=pct*v.duration;}}>
            <div style={{ width:`${progress*100}%`, height:"100%", background:C.accent, borderRadius:2, position:"relative" }}>
              <div style={{ position:"absolute", right:-4, top:-3, width:9, height:9, borderRadius:"50%", background:"#fff", boxShadow:`0 0 6px ${C.accent}` }}/>
            </div>
          </div>
        </div>

        <div style={{ position:"absolute", bottom:0, left:0, right:0, background:"linear-gradient(transparent,rgba(0,0,0,0.8))", padding:"30px 16px 20px" }}>
          <button onClick={e=>{e.stopPropagation();onNext();}} style={{ width:"100%", background:C.accent, color:"#fff", border:"none", borderRadius:10, padding:"13px", fontSize:15, fontWeight:700, cursor:"pointer" }}>{t.next}</button>
        </div>
      </div>
    </div>
  );
}

function LangPicker({ current, onSelect, onClose, t }) {
  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.7)", zIndex:200, display:"flex", alignItems:"flex-end" }}>
      <div style={{ width:"100%", background:C.card, borderRadius:"20px 20px 0 0", padding:"20px 16px 32px" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
          <div style={{ color:C.text, fontWeight:800, fontSize:16 }}>{t.language}</div>
          <button onClick={onClose} style={{ background:"none", border:"none", color:C.textMuted, cursor:"pointer" }}><IcoClose/></button>
        </div>
        {LANGUAGES.map(lang => (
          <div key={lang.code} onClick={()=>{onSelect(lang.code);onClose();}} style={{ display:"flex", alignItems:"center", gap:14, padding:"12px 8px", borderRadius:10, cursor:"pointer", marginBottom:4, background:current===lang.code?`${C.accent}18`:"transparent", border:`1px solid ${current===lang.code?C.accent:"transparent"}` }}>
            <span style={{ fontSize:24 }}>{lang.flag}</span>
            <span style={{ color:C.text, fontSize:15 }}>{lang.name}</span>
            {current===lang.code&&<span style={{ marginLeft:"auto", color:C.accent }}>✓</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

function SeriesModal({ series, onClose, vip, coins, setCoins, watchHistory, setWatchHistory, appLang, t }) {
  const [tab, setTab] = useState("episodes");
  const [playerEp, setPlayerEp] = useState(null);
  const [bookmarked, setBookmarked] = useLS(`bm_${series.id}`, false);

  useEffect(() => { document.body.style.overflow="hidden"; return ()=>{ document.body.style.overflow=""; }; }, []);

  function handleUnlock(ep) {
    if(coins<5){alert("Недостаточно монет!");return;}
    setCoins(coins-5);
    setWatchHistory({...watchHistory,[series.id]:Math.max(watchHistory[series.id]||series.freeEpisodes,ep)});
  }
  function handleWatch(ep) {
    setPlayerEp(ep);
    if(ep>(watchHistory[series.id]||0)) setWatchHistory({...watchHistory,[series.id]:ep});
  }

  if(playerEp) return (
    <Player series={series} episode={playerEp} onClose={()=>setPlayerEp(null)} appLang={appLang} t={t}
      onNext={()=>{
        const next=playerEp+1;
        if(next>series.episodes)return;
        const unl=vip?series.episodes:(watchHistory[series.id]||series.freeEpisodes);
        next<=unl?setPlayerEp(next):setPlayerEp(null);
      }}/>
  );

  const unlockedEps = vip?series.episodes:(watchHistory[series.id]||series.freeEpisodes);

  return (
    <div style={{ position:"fixed", inset:0, background:C.bg, zIndex:50, overflowY:"auto" }}>
      <div style={{ position:"relative", height:300 }}>
        <img src={series.cover} alt={series.title} style={{ width:"100%", height:"100%", objectFit:"cover" }}/>
        <div style={{ position:"absolute", inset:0, background:`linear-gradient(transparent 20%,${C.bg})` }}/>
        <button onClick={onClose} style={{ position:"absolute", top:16, left:16, background:"rgba(0,0,0,0.6)", border:"none", color:"#fff", borderRadius:"50%", width:36, height:36, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer" }}><IcoClose/></button>
        <button onClick={()=>setBookmarked(!bookmarked)} style={{ position:"absolute", top:16, right:16, background:"rgba(0,0,0,0.6)", border:"none", color:bookmarked?C.accent:"#fff", borderRadius:"50%", width:36, height:36, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer" }}><IcoBookmark f={bookmarked}/></button>
      </div>
      <div style={{ padding:"0 16px 32px" }}>
        <div style={{ display:"flex", gap:8, marginBottom:8, flexWrap:"wrap", alignItems:"center" }}>
          <Badge text={series.badge}/>
          <span style={{ color:C.textMuted, fontSize:12 }}>{series.genre}</span>
          <span style={{ color:"#fbbf24", fontSize:12 }}>★ {series.rating}</span>
        </div>
        <h2 style={{ color:C.text, fontSize:21, fontWeight:800, margin:"0 0 8px" }}>{series.title}</h2>
        <p style={{ color:C.textMuted, fontSize:13, margin:"0 0 14px", lineHeight:1.65 }}>{series.desc}</p>
        <div style={{ color:C.textDim, fontSize:12, marginBottom:18 }}>{series.episodes} {t.series} · Первые {series.freeEpisodes} {t.free}</div>
        <button onClick={()=>handleWatch(watchHistory[series.id]||1)} style={{ width:"100%", background:C.accent, color:"#fff", border:"none", borderRadius:12, padding:"13px", fontSize:15, fontWeight:800, cursor:"pointer", marginBottom:22, display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
          ▶ {watchHistory[series.id]?`Продолжить с серии ${watchHistory[series.id]}`:"Смотреть"}
        </button>
        <div style={{ display:"flex", borderBottom:`1px solid ${C.card2}` }}>
          {["episodes","info"].map(tb=>(
            <button key={tb} onClick={()=>setTab(tb)} style={{ flex:1, background:"none", border:"none", color:tab===tb?C.accent:C.textMuted, borderBottom:tab===tb?`2px solid ${C.accent}`:"2px solid transparent", padding:"10px", fontSize:14, cursor:"pointer", fontWeight:tab===tb?700:400 }}>
              {tb==="episodes"?t.episodes:t.desc}
            </button>
          ))}
        </div>
        {tab==="episodes"&&(
          <>
            {!vip&&(
              <div style={{ background:`${C.accent}12`, border:`1px solid ${C.accent}30`, borderRadius:10, padding:"12px 16px", margin:"12px 0", display:"flex", alignItems:"center", gap:12 }}>
                <IcoCrown/>
                <div style={{ flex:1 }}>
                  <div style={{ color:C.accent, fontWeight:700, fontSize:13 }}>ZenDrama {t.premium}</div>
                  <div style={{ color:C.textMuted, fontSize:11 }}>От 99 ₽/неделю</div>
                </div>
              </div>
            )}
            {Array.from({length:series.episodes},(_,i)=>i+1).map(ep=>(
              <EpRow key={ep} ep={ep} isLocked={ep>unlockedEps} coins={coins} onUnlock={handleUnlock} onWatch={handleWatch}/>
            ))}
          </>
        )}
        {tab==="info"&&(
          <div style={{ padding:"16px 0", color:C.textMuted, fontSize:14, lineHeight:1.8 }}>
            <div style={{ marginBottom:10 }}><strong style={{ color:C.text }}>Жанр:</strong> {series.genre}</div>
            <div style={{ marginBottom:10 }}><strong style={{ color:C.text }}>Серий:</strong> {series.episodes}</div>
            <div style={{ marginBottom:10 }}><strong style={{ color:C.text }}>Рейтинг:</strong> ★ {series.rating}</div>
            <div><strong style={{ color:C.text }}>Описание:</strong><br/>{series.desc}</div>
          </div>
        )}
      </div>
    </div>
  );
}

function ShopModal({ coins, setCoins, vip, setVip, onClose, t }) {
  const [tab, setTab] = useState("vip");
  return (
    <div style={{ position:"fixed", inset:0, background:C.bg, zIndex:50, overflowY:"auto" }}>
      <div style={{ padding:"16px 16px 0", display:"flex", alignItems:"center", gap:12 }}>
        <button onClick={onClose} style={{ background:"none", border:"none", color:"#fff", cursor:"pointer" }}><IcoClose/></button>
        <h2 style={{ color:C.text, fontSize:18, fontWeight:800, margin:0 }}>{t.shop}</h2>
      </div>
      <div style={{ display:"flex", margin:"16px", borderRadius:10, overflow:"hidden", background:C.card }}>
        {["vip","coins"].map(tb=>(
          <button key={tb} onClick={()=>setTab(tb)} style={{ flex:1, padding:"10px", background:tab===tb?C.accent:"transparent", color:tab===tb?"#fff":C.textMuted, border:"none", fontWeight:700, fontSize:14, cursor:"pointer" }}>
            {tb==="vip"?`👑 ${t.premium}`:`🪙 ${t.coins}`}
          </button>
        ))}
      </div>
      <div style={{ padding:"0 16px 32px" }}>
        {tab==="vip"&&(
          <>
            <div style={{ background:`${C.accent}15`, border:`1px solid ${C.accent}35`, borderRadius:16, padding:20, marginBottom:22 }}>
              <div style={{ color:C.accent, fontSize:17, fontWeight:800, marginBottom:10 }}>👑 ZenDrama {t.premium}</div>
              {["Безлимитный просмотр","Без рекламы","Ранняя загрузка","Premium-баллы"].map(f=>(
                <div key={f} style={{ color:C.textMuted, fontSize:13, display:"flex", gap:8, marginBottom:5 }}><span style={{ color:C.jade }}>✓</span>{f}</div>
              ))}
            </div>
            {VIP_PLANS.map(plan=>(
              <div key={plan.id} onClick={()=>{setVip(true);onClose();alert(`Premium "${plan.name}" подключён!`);}} style={{ background:plan.popular?`${C.accent}12`:C.card, border:`${plan.popular?2:1}px solid ${plan.popular?C.accent:C.card2}`, borderRadius:12, padding:"14px 16px", marginBottom:12, display:"flex", alignItems:"center", cursor:"pointer" }}>
                <div style={{ flex:1 }}>
                  <div style={{ color:C.text, fontWeight:700, fontSize:15 }}>{plan.name}{plan.popular&&<span style={{ background:C.red, color:"#fff", fontSize:10, padding:"2px 7px", borderRadius:4, marginLeft:8 }}>Популярно</span>}</div>
                  <div style={{ color:C.textMuted, fontSize:12 }}>{plan.period}{plan.save?` · ${plan.save}`:""}</div>
                </div>
                <div style={{ color:C.accent, fontWeight:800, fontSize:18 }}>{plan.price}</div>
              </div>
            ))}
          </>
        )}
        {tab==="coins"&&(
          <>
            <div style={{ background:C.card, borderRadius:12, padding:16, marginBottom:18, display:"flex", alignItems:"center", gap:14 }}>
              <CoinIco/>
              <div>
                <div style={{ color:C.textMuted, fontSize:12 }}>Ваш баланс</div>
                <div style={{ color:C.accent, fontWeight:800, fontSize:22 }}>{coins} монет</div>
              </div>
            </div>
            {COINS_PACKAGES.map(pkg=>(
              <div key={pkg.id} onClick={()=>{setCoins(coins+pkg.coins);alert(`+${pkg.coins} монет!`);}} style={{ background:pkg.popular?`${C.accent}12`:C.card, border:`${pkg.popular?2:1}px solid ${pkg.popular?C.accent:C.card2}`, borderRadius:12, padding:"14px 16px", marginBottom:12, display:"flex", alignItems:"center", cursor:"pointer" }}>
                <div style={{ flex:1 }}>
                  <div style={{ color:C.text, fontWeight:700, fontSize:15 }}>🪙 {pkg.coins} монет{pkg.popular&&<span style={{ background:C.red, color:"#fff", fontSize:10, padding:"2px 7px", borderRadius:4, marginLeft:8 }}>Выгодно</span>}</div>
                  {pkg.bonus&&<div style={{ color:C.jade, fontSize:12 }}>{pkg.bonus}</div>}
                </div>
                <div style={{ color:C.accent, fontWeight:800, fontSize:18 }}>{pkg.price}</div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default function App() {
  const [tab, setTab]           = useState("home");
  const [selected, setSelected] = useState(null);
  const [showShop, setShowShop] = useState(false);
  const [showLangPicker, setShowLangPicker] = useState(false);
  const [searchQ, setSearchQ]   = useState("");
  const [genre, setGenre]       = useState("Все");
  const [coins, setCoins]       = useLS("zd_coins", 9);
  const [vip, setVip]           = useLS("zd_vip", false);
  const [history, setHistory]   = useLS("zd_history", {});
  const [appLang, setAppLang]   = useLS("zd_lang", detectLanguage());

  const t = UI_TEXT[appLang]||UI_TEXT.ru;
  useEffect(()=>{ setGenre("Все"); }, [appLang]);

  const filtered = SERIES_DATA.filter(s=>s.title.toLowerCase().includes(searchQ.toLowerCase()));
  const trending = [...SERIES_DATA].filter(s=>s.trending).sort((a,b)=>a.trending-b.trending);
  const continueList = SERIES_DATA.filter(s=>Object.keys(history).map(Number).includes(s.id));

  return (
    <div style={{ background:C.bg, minHeight:"100vh", maxWidth:430, margin:"0 auto", fontFamily:"system-ui,sans-serif", paddingBottom:70, color:C.text }}>
      {showLangPicker&&<LangPicker current={appLang} onSelect={setAppLang} onClose={()=>setShowLangPicker(false)} t={t}/>}
      {selected&&<SeriesModal series={selected} onClose={()=>setSelected(null)} vip={vip} coins={coins} setCoins={setCoins} watchHistory={history} setWatchHistory={setHistory} appLang={appLang} t={t}/>}
      {showShop&&<ShopModal coins={coins} setCoins={setCoins} vip={vip} setVip={setVip} onClose={()=>setShowShop(false)} t={t}/>}

      {tab==="home"&&(
        <div>
          <div style={{ padding:"14px 16px 10px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
            <ZenLogo size={26}/>
            <div style={{ display:"flex", gap:10, alignItems:"center" }}>
              <button onClick={()=>setShowLangPicker(true)} style={{ background:C.card, border:`1px solid ${C.card2}`, borderRadius:20, padding:"5px 10px", fontSize:13, cursor:"pointer" }}>
                {LANGUAGES.find(l=>l.code===appLang)?.flag}
              </button>
              {vip&&<div style={{ color:C.accent, fontSize:11, fontWeight:700, background:`${C.accent}15`, borderRadius:20, padding:"4px 10px", border:`1px solid ${C.accent}35` }}>👑 {t.premium}</div>}
              <button onClick={()=>setShowShop(true)} style={{ background:C.accent, color:"#fff", border:"none", borderRadius:20, padding:"5px 13px", fontSize:12, fontWeight:700, cursor:"pointer", display:"flex", alignItems:"center", gap:4 }}>
                <CoinIco/> {coins}
              </button>
            </div>
          </div>

          <div style={{ margin:"0 16px 14px", position:"relative" }}>
            <div style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)", color:C.textMuted }}><IcoSearch/></div>
            <input value={searchQ} onChange={e=>setSearchQ(e.target.value)} placeholder={t.search} style={{ width:"100%", background:C.card, border:`1px solid ${C.card2}`, borderRadius:10, padding:"10px 12px 10px 44px", color:C.text, fontSize:14, outline:"none", boxSizing:"border-box" }}/>
          </div>

          <div style={{ display:"flex", gap:8, padding:"0 16px 16px", overflowX:"auto", scrollbarWidth:"none" }}>
            {GENRES.map(g=>(
              <button key={g} onClick={()=>setGenre(g)} style={{ background:genre===g?C.accent:`${C.accent}15`, color:genre===g?"#fff":C.accentLight, border:`1px solid ${genre===g?C.accent:C.accent+"30"}`, borderRadius:20, padding:"6px 14px", fontSize:12, fontWeight:genre===g?700:400, cursor:"pointer", whiteSpace:"nowrap", flexShrink:0 }}>{g}</button>
            ))}
          </div>

          {!searchQ&&(
            <>
              <div style={{ padding:"0 16px 10px", color:C.text, fontSize:15, fontWeight:700 }}>{t.trending}</div>
              <div style={{ display:"flex", gap:10, padding:"0 16px 20px", overflowX:"auto", scrollbarWidth:"none" }}>
                {trending.map(s=>(
                  <div key={s.id} onClick={()=>setSelected(s)} style={{ flexShrink:0, width:120, cursor:"pointer" }}>
                    <div style={{ position:"relative", borderRadius:10, overflow:"hidden", aspectRatio:"2/3" }}>
                      <img src={s.cover} alt={s.title} style={{ width:"100%", height:"100%", objectFit:"cover" }}/>
                      <div style={{ position:"absolute", top:6, left:6, width:22, height:22, background:C.accent, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontWeight:900, fontSize:12 }}>{s.trending}</div>
                      <div style={{ position:"absolute", bottom:0, left:0, right:0, background:"linear-gradient(transparent,rgba(8,9,13,0.95))", padding:"18px 6px 6px" }}>
                        <div style={{ color:C.text, fontSize:11, fontWeight:700 }}>{s.title}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {continueList.length>0&&(
                <>
                  <div style={{ padding:"0 16px 10px", color:C.text, fontSize:15, fontWeight:700 }}>{t.continueW}</div>
                  <div style={{ display:"flex", gap:10, padding:"0 16px 20px", overflowX:"auto", scrollbarWidth:"none" }}>
                    {continueList.map(s=>{
                      const ep=history[s.id]||0;
                      const pct=Math.round((ep/s.episodes)*100);
                      return (
                        <div key={s.id} onClick={()=>setSelected(s)} style={{ flexShrink:0, width:120, cursor:"pointer" }}>
                          <div style={{ position:"relative", borderRadius:10, overflow:"hidden", aspectRatio:"2/3" }}>
                            <img src={s.cover} alt={s.title} style={{ width:"100%", height:"100%", objectFit:"cover" }}/>
                            <div style={{ position:"absolute", bottom:0, left:0, right:0, background:"linear-gradient(transparent,rgba(8,9,13,0.95))", padding:"18px 6px 6px" }}>
                              <div style={{ color:C.text, fontSize:10, fontWeight:700 }}>{s.title}</div>
                              <div style={{ color:C.accent, fontSize:10 }}>Сер. {ep}/{s.episodes}</div>
                            </div>
                            <div style={{ position:"absolute", bottom:0, left:0, right:0, height:3, background:"#1e1e2a" }}>
                              <div style={{ height:"100%", width:`${pct}%`, background:C.accent }}/>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
              <div style={{ padding:"0 16px 10px", color:C.text, fontSize:15, fontWeight:700 }}>{t.all}</div>
            </>
          )}

          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10, padding:"0 16px" }}>
            {filtered.map(s=><SeriesCard key={s.id} series={s} onClick={setSelected} watchHistory={history}/>)}
          </div>
        </div>
      )}

      {tab==="watch"&&(
        <div style={{ padding:16 }}>
          <h2 style={{ color:C.text, fontSize:18, fontWeight:800, margin:"0 0 16px" }}>{t.watch}</h2>
          {continueList.length===0?(
            <div style={{ textAlign:"center", color:C.textMuted, marginTop:80 }}>
              <div style={{ fontSize:48, marginBottom:12 }}>📺</div>
              <div>История просмотров пуста</div>
            </div>
          ):continueList.map(s=>{
            const ep=history[s.id]||0;
            const pct=Math.round((ep/s.episodes)*100);
            return (
              <div key={s.id} onClick={()=>setSelected(s)} style={{ display:"flex", gap:12, marginBottom:14, cursor:"pointer", background:C.card, borderRadius:10, overflow:"hidden" }}>
                <div style={{ position:"relative", width:90, flexShrink:0 }}>
                  <img src={s.cover} alt={s.title} style={{ width:90, height:130, objectFit:"cover", display:"block" }}/>
                  <div style={{ position:"absolute", bottom:0, left:0, right:0, height:3, background:"#1e1e2a" }}>
                    <div style={{ height:"100%", width:`${pct}%`, background:C.accent }}/>
                  </div>
                </div>
                <div style={{ padding:"12px 12px 12px 0", flex:1 }}>
                  <div style={{ color:C.text, fontWeight:700, fontSize:14, marginBottom:4 }}>{s.title}</div>
                  <div style={{ color:C.accent, fontSize:12 }}>Серия {ep} из {s.episodes}</div>
                  <div style={{ color:C.textMuted, fontSize:11, marginTop:4 }}>{s.genre}</div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {tab==="profile"&&(
        <div style={{ padding:16 }}>
          <h2 style={{ color:C.text, fontSize:18, fontWeight:800, margin:"0 0 20px" }}>{t.profile}</h2>
          {!vip?(
            <div onClick={()=>setShowShop(true)} style={{ background:`${C.accent}12`, border:`1px solid ${C.accent}35`, borderRadius:14, padding:16, marginBottom:16, cursor:"pointer" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <div>
                  <div style={{ color:C.accent, fontWeight:800, fontSize:15 }}>👑 ZenDrama {t.premium}</div>
                  <div style={{ color:C.textMuted, fontSize:12, marginTop:2 }}>Безлимитный доступ</div>
                </div>
                <div style={{ background:C.accent, color:"#fff", borderRadius:20, padding:"6px 14px", fontSize:12, fontWeight:700 }}>{t.connect}</div>
              </div>
            </div>
          ):(
            <div style={{ background:`${C.accent}15`, border:`2px solid ${C.accent}`, borderRadius:14, padding:16, marginBottom:16 }}>
              <div style={{ color:C.accent, fontWeight:800, fontSize:15 }}>👑 Premium активен</div>
            </div>
          )}
          <div style={{ background:C.card, borderRadius:14, padding:16, marginBottom:16 }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
              <div style={{ color:C.text, fontWeight:700 }}>{t.wallet}</div>
              <button onClick={()=>setShowShop(true)} style={{ background:C.accent, color:"#fff", border:"none", borderRadius:20, padding:"5px 14px", fontSize:12, fontWeight:700, cursor:"pointer" }}>{t.topup}</button>
            </div>
            <div style={{ display:"flex", gap:24 }}>
              <div><div style={{ color:C.accent, fontSize:22, fontWeight:800 }}>{coins}</div><div style={{ color:C.textMuted, fontSize:12 }}>🪙 {t.coins}</div></div>
              <div><div style={{ color:C.text, fontSize:22, fontWeight:800 }}>0</div><div style={{ color:C.textMuted, fontSize:12 }}>🎟 Бонусы</div></div>
            </div>
          </div>
          {[
            { icon:<IcoHistory/>, label:t.history, count:continueList.length },
            { icon:<IcoBookmark f={false}/>, label:t.bookmarks },
            { icon:<IcoCrown/>, label:t.bonuses },
            { icon:<span style={{fontSize:18}}>{LANGUAGES.find(l=>l.code===appLang)?.flag}</span>, label:t.language, action:()=>setShowLangPicker(true) },
          ].map(item=>(
            <div key={item.label} onClick={item.action} style={{ background:C.card, borderRadius:12, padding:"14px 16px", marginBottom:10, display:"flex", alignItems:"center", gap:12, cursor:"pointer" }}>
              <div style={{ color:C.textMuted }}>{item.icon}</div>
              <div style={{ flex:1, color:C.text, fontSize:14 }}>{item.label}</div>
              {item.count!==undefined&&<span style={{ background:C.accent, color:"#fff", borderRadius:20, padding:"2px 8px", fontSize:11, fontWeight:700 }}>{item.count}</span>}
              <span style={{ color:C.textDim }}>›</span>
            </div>
          ))}
        </div>
      )}

      <div style={{ position:"fixed", bottom:0, left:"50%", transform:"translateX(-50%)", width:"100%", maxWidth:430, background:"#0d0e14", borderTop:`1px solid ${C.card2}`, display:"flex" }}>
        {[
          { id:"home",    icon:<IcoHome/>,  label:t.home },
          { id:"watch",   icon:<IcoPlay/>,  label:t.watch },
          { id:"profile", icon:<IcoUser/>,  label:t.profile },
        ].map(item=>(
          <button key={item.id} onClick={()=>setTab(item.id)} style={{ flex:1, background:"none", border:"none", padding:"10px 0 8px", color:tab===item.id?C.accent:C.textMuted, cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center", gap:3 }}>
            {item.icon}
            <span style={{ fontSize:10 }}>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
