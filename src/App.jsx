import { useState, useEffect, useRef } from "react";

// ─── АДАПТИВНОСТЬ ────────────────────────────────────────────────────────────
function useIsMobile() {
  const [mobile, setMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const h = () => setMobile(window.innerWidth < 768);
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);
  return mobile;
}

const C = {
  bg: "#08090d", card: "#111318", card2: "#1a1c24",
  accent: "#7c6af7", accentLight: "#a89cf8",
  red: "#e05b7f", text: "#f0eeff", textMuted: "#7a7a9a", textDim: "#3a3a5a",
  jade: "#3ecf8e", gold: "#f5c842",
};

// ─── ДАННЫЕ ──────────────────────────────────────────────────────────────────
const SERIES_DATA = [
  { id:14, title:"Охота за сокровищами", genre:"Приключения", episodes:116, freeEpisodes:7, cover:"https://wangwangzyimg.com/upload/vod/20250904-1/777df16eea650fb94f7c44efbeee6bb7.jpg", badge:"Новинка", trending:1, rating:9.1, desc:"Водитель экскаватора случайно находит загадочный металлический шар и получает сверхъестественную способность видеть сквозь любые предметы.", tags:["Фэнтези","Приключения","Суперспособности"] },
  { id:1,  title:"Тайный миллионер",     genre:"Романтика",   episodes:80,  freeEpisodes:7, cover:"https://picsum.photos/seed/mill/300/450",    badge:"Эксклюзив", trending:2, rating:9.2, desc:"Девушка из бедной семьи случайно встречает скрытного миллиардера...", tags:["CEO","Романтика"] },
  { id:2,  title:"Рождённый повелителем", genre:"Фэнтези",    episodes:96,  freeEpisodes:7, cover:"https://picsum.photos/seed/lord/300/450",    badge:"Эксклюзив", trending:4, rating:8.9, desc:"Древний правитель возрождается в современном мире с магическими силами...", tags:["Фэнтези","Месть"] },
  { id:3,  title:"Муж-гендиректор меня баловал", genre:"Романтика", episodes:68, freeEpisodes:7, cover:"https://picsum.photos/seed/ceo/300/450", badge:"Эксклюзив", trending:3, rating:9.5, desc:"Брак по договору превращается в настоящую любовь...", tags:["CEO","Романтика"] },
  { id:4,  title:"Тот самый мальчик",    genre:"Романтика",   episodes:72,  freeEpisodes:7, cover:"https://picsum.photos/seed/boy/300/450",    badge:"Хит", trending:5, rating:8.7, desc:"Первая любовь снова появляется спустя 10 лет...", tags:["Романтика","Драма"] },
  { id:5,  title:"Телефон для невесты",  genre:"Комедия",     episodes:58,  freeEpisodes:7, cover:"https://picsum.photos/seed/phone/300/450",  badge:"Эксклюзив", trending:6, rating:8.4, desc:"Случайный обмен телефонами меняет судьбы двух незнакомцев...", tags:["Комедия","Романтика"] },
  { id:6,  title:"Замуж за врага",       genre:"Драма",       episodes:84,  freeEpisodes:7, cover:"https://picsum.photos/seed/enemy/300/450",  badge:"Эксклюзив", trending:null, rating:9.1, desc:"Вынужденный союз с главным соперником семьи...", tags:["Драма","Месть"] },
  { id:7,  title:"Эвелин и Гари: Новая жизнь", genre:"Попаданчество", episodes:93, freeEpisodes:7, cover:"https://picsum.photos/seed/evelin/300/450", badge:"Хит", trending:null, rating:9.3, desc:"Современная женщина попадает в древний Китай...", tags:["Попаданчество","Фэнтези"] },
  { id:8,  title:"Двойная жизнь королевы бизнеса", genre:"Драма", episodes:76, freeEpisodes:7, cover:"https://picsum.photos/seed/queen2/300/450", badge:"Новинка", trending:null, rating:8.6, desc:"Успешная бизнес-леди скрывает тёмное прошлое...", tags:["Драма","CEO"] },
  { id:9,  title:"Твоё солнце",          genre:"Романтика",   episodes:62,  freeEpisodes:7, cover:"https://picsum.photos/seed/sun/300/450",    badge:"Эксклюзив", trending:null, rating:8.8, desc:"Слепая девушка и её тайный покровитель...", tags:["Романтика"] },
  { id:10, title:"Королева читает мои мысли", genre:"Фэнтези", episodes:88, freeEpisodes:7, cover:"https://picsum.photos/seed/mindread/300/450", badge:"Эксклюзив", trending:null, rating:9.0, desc:"Необычный дар превращает жизнь в настоящее испытание...", tags:["Фэнтези"] },
  { id:11, title:"Яков и Алина: Пять лет тайной любви", genre:"Романтика", episodes:70, freeEpisodes:7, cover:"https://picsum.photos/seed/yakov/300/450", badge:"Хит", trending:null, rating:9.4, desc:"Тайная любовь, скрытая от всего мира...", tags:["Романтика","Драма"] },
  { id:12, title:"Пленница", genre:"Триллер", episodes:65, freeEpisodes:7, cover:"https://picsum.photos/seed/plen/300/450", badge:"18+", trending:null, rating:8.5, desc:"Побег из золотой клетки богатого особняка...", tags:["Триллер","Драма"] },
];

const GENRES = ["Все","Романтика","Фэнтези","Драма","Комедия","Триллер","Попаданчество","Приключения"];
const TAGS = ["CEO/Миллиардер","Романтика","Фэнтези","Месть","Попаданчество","Суперспособности","Комедия","Триллер"];

const COINS_PACKAGES = [
  { id:1, coins:100,  price:"59 ₽",   bonus:"",           popular:false },
  { id:2, coins:300,  price:"149 ₽",  bonus:"+50 бонус",  popular:false },
  { id:3, coins:700,  price:"299 ₽",  bonus:"+150 бонус", popular:true  },
  { id:4, coins:1500, price:"599 ₽",  bonus:"+400 бонус", popular:false },
];
const VIP_PLANS = [
  { id:1, name:"Неделя",   price:"99 ₽",   period:"7 дней",   coins:1050, save:"",          popular:false },
  { id:2, name:"Месяц",    price:"299 ₽",  period:"30 дней",  coins:2100, save:"Скидка 25%", popular:true  },
  { id:3, name:"3 месяца", price:"699 ₽",  period:"90 дней",  coins:5000, save:"Скидка 35%", popular:false },
  { id:4, name:"Год",      price:"1990 ₽", period:"365 дней", coins:15000,save:"Скидка 45%", popular:false },
];

const BUNNY_CDN = "vz-433c2f1e-a5b.b-cdn.net";
const SUBS_CDN  = "https://zendrama-subs.b-cdn.net";

const VIDEO_MAP = {
  14: {
    1:"55fbff08-60a9-43a9-8b0c-d45d63d45fbd",2:"39d36704-db3a-439c-bb50-bb8fdba1d923",3:"976fcae1-feff-4c24-9c98-df364021f7a4",4:"4c8c2298-5912-4fc0-b787-57f033d75b30",5:"e2410fd8-193c-49a0-b745-1b45c5306505",6:"d6c3da3e-adc4-424c-baf5-bf0e897d66c3",7:"d5e8e631-4761-458a-ab9d-cda2ecf7bbe9",8:"814e9df3-1ad4-4f24-bec3-5f3bd73361da",9:"1e334e54-f698-4309-8df5-55431c97f1cd",10:"04c7e6f2-ab18-4584-94b6-5b4a56747cbd",11:"153222f6-0c5e-4e27-957a-9304a57686e6",12:"6877ab87-0c37-455c-baaa-8963710b6c0c",13:"85e6447e-e5ba-425b-9573-9d4b16a64978",14:"b3a64def-f482-4ec6-8bfb-0fbeb614dec0",15:"6f59eb73-d8c3-4334-94fd-09592bb96440",16:"14882687-3aba-4caa-ba05-eb86e7926773",17:"f64062f8-25fc-4e04-b93d-26073471af23",18:"73c670f9-0f9e-44b2-8251-af2218c80a67",19:"c2cd4d58-9512-4c5f-8f37-92c50eae95ab",20:"68ff2e91-984a-4def-b26e-a324bfdebb0e",21:"78aacad6-776d-44ac-a3eb-800cfd1df522",22:"862e7a2a-c717-4dd0-950d-6038ffc595f6",23:"05f3355f-4831-4f25-a0e2-afac92be2235",24:"ab865f68-bbac-4422-9333-134ba16b015b",25:"f3b4fa88-d1da-48ad-a9e5-1e666ce92d3b",26:"11352ee4-370a-462e-938e-67c2790cbc52",27:"3a0407fe-7744-4302-8e82-b10311aa25cd",28:"cb9b31b3-7ee5-4467-a959-5587defbeb3c",29:"fbe14628-d953-440c-8fde-be6775526b13",30:"dd0361cc-672a-4055-b0a4-d7ca0dfde730",31:"0b29dba0-4a61-4f6e-a67e-94b66b7d6571",32:"e20dd3f1-9bf7-404f-af08-058475a78db4",33:"d936d337-98ae-41eb-8e2c-0fb7ad084ae5",34:"7b25720c-8287-421a-a146-a5edf0c5c15d",35:"b1e63e15-4aa4-48f7-a0c0-e57d847dcd9c",36:"b6629760-34cd-4ec7-bab4-1a1447b5249e",37:"792b2a9d-90d6-4448-bb69-7af3afde6dbb",38:"37375ba3-0601-455f-8213-d7c506ddac1e",39:"0a190660-6fba-4589-9051-bae53e7d57ed",40:"d47aa1c0-8d2d-4945-962f-99ac39a31db0",41:"0a1deafa-e4e9-4208-8991-949ab52bf03b",42:"e07d6d4c-6d6f-42e9-946e-66b0e9bd4e35",43:"6c2303cd-03d1-4257-9e10-d9e8191dd1c8",44:"808be851-64f3-4de0-830d-da1993c8ad4a",45:"b086bdbb-5e86-4aaa-aed9-cc2152ea13e0",46:"7a30649c-f557-4d42-8a38-1afb194fb903",47:"fcbd21c7-b118-4796-8981-50aeede89e09",48:"a437a09e-a028-43ae-850e-d3addafb99d6",49:"2ec630a4-7d76-470e-a338-b01848d46e71",50:"a3e1d4be-430c-45a7-95d3-d231e28d0833",51:"928e74a3-2b87-48ef-896d-0b556578db59",52:"2944f1ff-2f6b-459f-9fb0-e436aab2cd27",53:"cfb458d3-be2a-4429-bf97-c124058dc103",54:"2d79ba23-8dd4-43d5-a4a3-43b48e9a316c",55:"388d2eef-2925-4413-a050-a25ac0da2475",56:"a2d17f41-b3cd-4281-a52a-49830896a240",57:"e73a56b4-b5a7-482c-9f16-ee00902ed362",58:"c2cf55cb-3c93-472e-8bfb-2f15d89cc3f9",59:"5f1dba20-902e-4f1d-b6f5-0655a13f5ec1",60:"84a3604f-0594-4947-8a52-0069dfb45cc6",61:"3c8b7fa9-69e9-4d35-8d4b-1972557a5dec",62:"8102aba8-95e2-4641-8c9e-a7aa13378299",63:"e841ee49-4726-4941-99cf-15a25b6be267",64:"0cd19aaa-f1e6-4e62-b68b-749fb59addd8",65:"48b04ed6-4ffd-43ae-aea4-30e931e066b0",66:"194cc049-e6cd-423c-81e0-2ba6d59c8d30",67:"e79f182c-6f36-4345-9ea6-85ecaa983004",68:"9d5ff911-6c3c-48d6-a026-e688b030e394",69:"abe4f94c-be2c-4db4-aa7e-2a2cae27503d",70:"915d5cf7-40e1-49dd-b949-fa157a871985",71:"bd40f2de-bb17-4a1b-b67c-ae9772d96525",72:"758fc8da-a253-4b45-9e3e-448e49c6ee19",73:"5ba09aaf-bccd-4f02-a066-77ff80c6ed5e",74:"d3945a56-4187-4942-a557-bb560545246e",75:"b3f27948-9bc0-4823-a404-a4740c8ca64f",76:"91095e11-d82d-4965-8066-0ee486a9b672",77:"90059efb-1e3d-4078-8e4b-13d784741e10",78:"c641fd3d-f226-4ce5-b904-b46f9b550ae2",79:"c92044ae-cf94-423d-84c9-f7d7edacc7b6",80:"5f087da7-8bdd-4104-9144-13a8a8a2dc4d",81:"1ec1b5cd-b672-4ea3-afe2-5b35744819de",82:"2ba34146-a990-43a7-8a9a-c2536ae4bd00",83:"07e1596f-e07f-4db4-ae4c-c1cf33b2f96c",84:"48381274-cddd-459b-b501-43cf1fa332e1",85:"a32035c6-cdd9-4103-9303-9c72992068c4",86:"324e75c0-3c85-460a-9172-d24efd1f329b",87:"6de10d3a-c388-47f0-9f69-31c112b85b09",88:"3b96b2e9-da51-4708-a332-0f586df32c0c",89:"5e6ffea8-8251-4440-9b76-40263a99f3d0",90:"7a6e9076-052a-4d41-8a1f-b4c41f540a7c",91:"104de060-bdb2-444f-a2bb-e550f59f9dc2",92:"111a61b6-e878-437b-a93d-7f44cfe26466",93:"23a32e13-41ee-45f2-83ab-aed996495e68",94:"7cf79dcb-b61a-4110-8acc-a0fd3f5cf355",95:"97ca7998-f2ee-439b-8d3b-e3ee09e10a1b",96:"6068a6a8-8647-488d-89d9-40d3a7eb761e",97:"9205e76d-cca7-435f-8fe5-d825d2fc6735",98:"647d5d38-2738-4744-87d6-9b2c87325b56",99:"0fdc39c6-4293-448c-80f7-43171b3c3b92",100:"92878904-50c3-44ac-b500-1cce30406014",101:"7c2b40aa-d2c8-4b64-bb78-d226a76ce8f5",102:"80be91ec-e618-4fac-8645-ecbf32889565",103:"b61aed00-275b-4208-8b42-7577dc790c26",104:"08027610-f889-44c5-b5d3-d075008ad6b3",105:"2261ccf9-0183-40d2-b4dc-8060a866862d",106:"6eb9f5bc-9dc1-4cf5-a200-feba94cf4148",107:"f15ee79f-b889-4281-a338-c4cf69b80ad8",108:"5f5d6f15-8d82-40cb-be8f-971268f9ef5f",109:"98572c10-b5b8-471d-970f-0f07f49ba9e7",110:"315436d9-7985-42c5-9331-14706f60d531",111:"4ec25e34-6690-4159-b4a9-66b71762cfd5",112:"c3d699aa-f693-4450-ba9b-564e756a3fdb",113:"74f198cd-5b2a-4a13-9a15-d607a4b9c100",114:"942aa36c-fd6d-4bca-91dc-69d9cd9656ff",115:"fd289203-4d75-4da1-9695-77fb2972e823",116:"8a7c5de3-bdcc-4da5-8268-6ece4affc002"
  }
};

const SUBTITLES_MAP = {
  14: Object.fromEntries(Array.from({length:116},(_,i)=>[i+1,{ru:`${SUBS_CDN}/okhota_ep${String(i+1).padStart(3,'0')}_ru.srt?v=3`}]))
};

// ─── ХЕЛПЕРЫ ─────────────────────────────────────────────────────────────────
function getBunnyUrl(sid,ep){const v=VIDEO_MAP[sid]?.[ep];return v?`https://${BUNNY_CDN}/${v}/playlist.m3u8`:null;}
function getSubUrl(sid,ep,lang){return SUBTITLES_MAP[sid]?.[ep]?.[lang]||null;}
function useLS(key,def){const[v,setV]=useState(()=>{try{const s=localStorage.getItem(key);return s?JSON.parse(s):def;}catch{return def;}});const set=x=>{setV(x);try{localStorage.setItem(key,JSON.stringify(x));}catch{}};return[v,set];}
function getDripEps(sid,base){try{const key=`zd_drip_${sid}`;const now=Date.now();const stored=localStorage.getItem(key);if(!stored){localStorage.setItem(key,JSON.stringify({lastVisit:now,bonus:0}));return base;}const state=JSON.parse(stored);let bonus=state.bonus||0;if((now-state.lastVisit)/3600000>=24){bonus+=3;localStorage.setItem(key,JSON.stringify({lastVisit:now,bonus}));}return base+bonus;}catch{return base;}}
function parseSRT(srt){return srt.trim().split(/\n\n+/).map(block=>{const lines=block.trim().split('\n');if(lines.length<3)return null;const t=lines[1].match(/(\d+):(\d+):(\d+)[,.](\d+) --> (\d+):(\d+):(\d+)[,.](\d+)/);if(!t)return null;return{start:+t[1]*3600+ +t[2]*60+ +t[3]+ +t[4]/1000,end:+t[5]*3600+ +t[6]*60+ +t[7]+ +t[8]/1000,text:lines.slice(2).join(' ').replace(/<[^>]+>/g,'')};}).filter(Boolean);}
function fmt(s){if(!s||isNaN(s))return'0:00';return`${Math.floor(s/60)}:${String(Math.floor(s%60)).padStart(2,'0')}`;}

// ─── ИКОНКИ ──────────────────────────────────────────────────────────────────
const Ico=({d,size=22,color="currentColor",fill="none",sw=1.8})=><svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"><path d={d}/></svg>;
const IcoHome=()=><Ico d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z M9 22V12h6v10"/>;
const IcoSearch=()=><Ico d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>;
const IcoUser=()=><Ico d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2 M12 11a4 4 0 100-8 4 4 0 000 8z"/>;
const IcoHeart=({f})=><Ico d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" fill={f?"currentColor":"none"}/>;
const IcoClose=()=><Ico d="M18 6L6 18M6 6l12 12"/>;
const IcoLock=()=><Ico d="M19 11H5a2 2 0 00-2 2v7a2 2 0 002 2h14a2 2 0 002-2v-7a2 2 0 00-2-2zM7 11V7a5 5 0 0110 0v4"/>;
const IcoCrown=()=><Ico d="M2 20h20M5 20L3 8l4.5 4L12 4l4.5 8L21 8l-2 12" color={C.gold}/>;
const IcoHistory=()=><Ico d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>;
const IcoBell=()=><Ico d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"/>;
const IcoGift=()=><Ico d="M20 12v10H4V12M22 7H2v5h20V7zM12 22V7M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z"/>;
const IcoChevronL=()=><Ico d="M15 18l-6-6 6-6"/>;
const IcoChevronR=()=><Ico d="M9 18l6-6-6-6"/>;

const ZenLogo=({size=26})=><svg width={size*3.4} height={size} viewBox="0 0 96 28" fill="none"><circle cx="14" cy="14" r="12" stroke={C.accent} strokeWidth="1.5"/><path d="M14 6C14 6 8 10 8 14C8 18 14 22 14 22C14 22 20 18 20 14C20 10 14 6 14 6Z" fill={C.accent} opacity="0.3"/><path d="M14 8C14 8 10 12 10 16" stroke={C.accentLight} strokeWidth="1" strokeLinecap="round"/><path d="M14 8C14 8 18 12 18 16" stroke={C.accentLight} strokeWidth="1" strokeLinecap="round"/><circle cx="14" cy="16" r="2" fill={C.accent}/><text x="30" y="19" fontFamily="system-ui,sans-serif" fontWeight="700" fontSize="14" fill={C.text} letterSpacing="0.5">Zen</text><text x="56" y="19" fontFamily="system-ui,sans-serif" fontWeight="300" fontSize="14" fill={C.accentLight} letterSpacing="0.5">Drama</text></svg>;
const CoinIco=({size=15})=><svg width={size} height={size} viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill={C.gold}/><text x="12" y="16" textAnchor="middle" fontSize="10" fill="#1a1200" fontWeight="bold">₽</text></svg>;

function Badge({text}){
  const map={"Эксклюзив":{bg:"#1e1a40",color:C.accentLight},"Хит":{bg:"#3a1225",color:"#f472b6"},"Новинка":{bg:"#0d2e20",color:C.jade},"18+":{bg:"#2a1a2e",color:"#c084fc"}};
  const s=map[text]||{bg:"#1e1e2a",color:C.textMuted};
  return <span style={{background:s.bg,color:s.color,fontSize:10,fontWeight:700,padding:"2px 7px",borderRadius:4,letterSpacing:0.5}}>{text}</span>;
}

// ─── ПЛЕЕР ───────────────────────────────────────────────────────────────────
function Player({series,episode,onClose,onNext,unlockedEps}){
  const videoRef=useRef(null),hlsRef=useRef(null),timerRef=useRef(null),onNextRef=useRef(onNext);
  useEffect(()=>{onNextRef.current=onNext;},[onNext]);
  const[showCtrl,setShowCtrl]=useState(true),[isPlaying,setIsPlaying]=useState(false),[progress,setProgress]=useState(0),[curTime,setCurTime]=useState('0:00'),[dur,setDur]=useState('0:00'),[muted,setMuted]=useState(false),[showSubs,setShowSubs]=useState(true),[srtData,setSrtData]=useState([]),[currentSub,setCurrentSub]=useState(''),[showNextBanner,setShowNextBanner]=useState(false),[countdown,setCountdown]=useState(5),[isFS,setIsFS]=useState(false);
  const hlsUrl=getBunnyUrl(series.id,episode),nextHlsUrl=getBunnyUrl(series.id,episode+1),subUrl=showSubs?getSubUrl(series.id,episode,'ru'):null,hasNext=episode<series.episodes&&episode<unlockedEps;
  useEffect(()=>{document.body.style.overflow='hidden';document.body.style.position='fixed';document.body.style.width='100%';return()=>{document.body.style.overflow='';document.body.style.position='';document.body.style.width='';};},[]);
  useEffect(()=>{if(!nextHlsUrl)return;const link=document.createElement('link');link.rel='preload';link.as='fetch';link.href=nextHlsUrl;link.crossOrigin='anonymous';document.head.appendChild(link);return()=>{try{document.head.removeChild(link);}catch{}};},[nextHlsUrl]);
  useEffect(()=>{if(!hlsUrl||!videoRef.current)return;const video=videoRef.current;setShowNextBanner(false);setCountdown(5);setProgress(0);setCurTime('0:00');if(video.canPlayType('application/vnd.apple.mpegurl')){video.src=hlsUrl;video.load();video.play().catch(()=>{});}else{if(hlsRef.current){hlsRef.current.destroy();hlsRef.current=null;}const init=()=>{if(window.Hls?.isSupported()){const hls=new window.Hls({enableWorker:false,startLevel:-1,abrEwmaDefaultEstimate:5000000});hls.loadSource(hlsUrl);hls.attachMedia(video);hls.on(window.Hls.Events.MANIFEST_PARSED,(_,d)=>{hls.currentLevel=d.levels.length-1;video.play().catch(()=>{});});hlsRef.current=hls;}};if(window.Hls){init();}else{const s=document.createElement('script');s.src='https://cdnjs.cloudflare.com/ajax/libs/hls.js/1.4.10/hls.min.js';s.onload=init;document.head.appendChild(s);}}return()=>{if(hlsRef.current){hlsRef.current.destroy();hlsRef.current=null;}};},[hlsUrl]);
  useEffect(()=>{if(!subUrl){setSrtData([]);setCurrentSub('');return;}fetch(subUrl).then(r=>r.text()).then(t=>setSrtData(parseSRT(t))).catch(()=>{});},[subUrl]);
  useEffect(()=>{const video=videoRef.current;if(!video)return;const onTime=()=>{const ct=video.currentTime;setProgress(ct/(video.duration||1));setCurTime(fmt(ct));setDur(fmt(video.duration));setCurrentSub(srtData.find(s=>ct>=s.start&&ct<=s.end)?.text||'');};const onEnded=()=>{if(hasNext){setShowNextBanner(true);setCountdown(5);}else onNextRef.current();};video.addEventListener('timeupdate',onTime);video.addEventListener('play',()=>setIsPlaying(true));video.addEventListener('pause',()=>setIsPlaying(false));video.addEventListener('ended',onEnded);return()=>{video.removeEventListener('timeupdate',onTime);video.removeEventListener('ended',onEnded);};},[srtData,hasNext]);
  useEffect(()=>{if(!showNextBanner)return;if(countdown<=0){onNextRef.current();return;}const t=setTimeout(()=>setCountdown(c=>c-1),1000);return()=>clearTimeout(t);},[showNextBanner,countdown]);
  function touch(){setShowCtrl(true);clearTimeout(timerRef.current);timerRef.current=setTimeout(()=>setShowCtrl(false),3000);}
  useEffect(()=>{touch();return()=>clearTimeout(timerRef.current);},[]);
  function togglePlay(){const v=videoRef.current;if(!v)return;v.paused?v.play():v.pause();touch();}
  function toggleFS(){if(!document.fullscreenElement){document.documentElement.requestFullscreen?.();setIsFS(true);}else{document.exitFullscreen?.();setIsFS(false);}}
  const btn=(size=44)=>({width:size,height:size,borderRadius:'50%',border:'none',cursor:'pointer',background:'rgba(255,255,255,0.15)',backdropFilter:'blur(10px)',color:'#fff',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0});
  return(
    <div onClick={touch} style={{position:'fixed',inset:0,background:'#000',zIndex:500,overflow:'hidden'}}>
      {hlsUrl?<video ref={videoRef} style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'contain'}} playsInline webkit-playsinline="true" preload="auto" poster={`https://${BUNNY_CDN}/${VIDEO_MAP[series.id]?.[episode]}/thumbnail.jpg`}/>:<div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column'}}><div style={{fontSize:56}}>🎬</div><div style={{color:C.textMuted,fontSize:14,marginTop:12}}>Видео скоро появится</div></div>}
      {showNextBanner&&<div style={{position:'absolute',inset:0,background:'rgba(0,0,0,0.9)',zIndex:50,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:20}}><div style={{color:'rgba(255,255,255,0.5)',fontSize:12,letterSpacing:3,textTransform:'uppercase'}}>Следующая серия</div><div style={{color:'#fff',fontSize:80,fontWeight:900,lineHeight:1}}>{countdown}</div><div style={{color:C.accentLight,fontSize:15,fontWeight:600}}>{series.title} — Серия {episode+1}</div><button onClick={e=>{e.stopPropagation();setShowNextBanner(false);onNextRef.current();}} style={{background:C.accent,color:'#fff',border:'none',borderRadius:14,padding:'16px 48px',fontSize:17,fontWeight:800,cursor:'pointer',marginTop:8}}>▶ Смотреть</button><button onClick={e=>{e.stopPropagation();setShowNextBanner(false);onClose();}} style={{background:'transparent',color:'rgba(255,255,255,0.35)',border:'1px solid rgba(255,255,255,0.15)',borderRadius:10,padding:'10px 32px',fontSize:13,cursor:'pointer'}}>Выйти</button></div>}
      {currentSub&&showSubs&&<div style={{position:'absolute',bottom:'14%',left:'4%',right:'4%',textAlign:'center',zIndex:6,pointerEvents:'none'}}><span style={{color:'#fff',fontSize:22,fontWeight:800,lineHeight:1.4,textShadow:'0 0 8px #000,0 0 8px #000,1px 1px 0 #000,-1px -1px 0 #000'}}>{currentSub}</span></div>}
      <div style={{position:'absolute',inset:0,zIndex:10,opacity:showCtrl?1:0,transition:'opacity 0.3s',pointerEvents:showCtrl?'auto':'none'}}>
        <div style={{position:'absolute',top:0,left:0,right:0,background:'linear-gradient(rgba(0,0,0,0.7),transparent)',padding:'16px',display:'flex',alignItems:'center',gap:12}}>
          <button onClick={e=>{e.stopPropagation();onClose();}} style={{...btn(40)}}><IcoClose/></button>
          <span style={{color:'#fff',fontSize:14,fontWeight:600,flex:1,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{series.title} — Серия {episode}</span>
        </div>
        <div style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',display:'flex',alignItems:'center',gap:28}}>
          <button onClick={e=>{e.stopPropagation();const v=videoRef.current;if(v)v.currentTime=Math.max(0,v.currentTime-10);touch();}} style={{...btn(54),flexDirection:'column',gap:2,fontSize:11,fontWeight:700}}><span style={{fontSize:20}}>↺</span><span>10</span></button>
          <button onClick={e=>{e.stopPropagation();togglePlay();}} style={{width:72,height:72,borderRadius:'50%',border:'none',cursor:'pointer',fontSize:28,color:'#fff',background:'rgba(124,106,247,0.8)',backdropFilter:'blur(16px)',display:'flex',alignItems:'center',justifyContent:'center'}}>{isPlaying?'⏸':'▶'}</button>
          <button onClick={e=>{e.stopPropagation();const v=videoRef.current;if(v)v.currentTime=Math.min(v.duration||999,v.currentTime+10);touch();}} style={{...btn(54),flexDirection:'column',gap:2,fontSize:11,fontWeight:700}}><span style={{fontSize:20}}>↻</span><span>10</span></button>
        </div>
        <div style={{position:'absolute',bottom:100,right:16,display:'flex',flexDirection:'column',gap:12}}>
          <button onClick={e=>{e.stopPropagation();setShowSubs(v=>!v);touch();}} style={{...btn(44),fontSize:11,fontWeight:700,background:showSubs?'rgba(124,106,247,0.6)':'rgba(255,255,255,0.15)'}}>CC</button>
          <button onClick={e=>{e.stopPropagation();setMuted(v=>{const nm=!v;if(videoRef.current)videoRef.current.muted=nm;return nm;});touch();}} style={{...btn(44),fontSize:18}}>{muted?'🔇':'🔊'}</button>
          <button onClick={e=>{e.stopPropagation();toggleFS();touch();}} style={{...btn(44),fontSize:18}}>{isFS?'⤡':'⤢'}</button>
        </div>
        <div style={{position:'absolute',bottom:78,left:16,right:16}}>
          <div style={{display:'flex',justifyContent:'space-between',marginBottom:6}}><span style={{color:'rgba(255,255,255,0.7)',fontSize:12}}>{curTime}</span><span style={{color:'rgba(255,255,255,0.4)',fontSize:12}}>{dur}</span></div>
          <div style={{height:3,background:'rgba(255,255,255,0.2)',borderRadius:2,cursor:'pointer'}} onClick={e=>{e.stopPropagation();const r=e.currentTarget.getBoundingClientRect();const v=videoRef.current;if(v)v.currentTime=((e.clientX-r.left)/r.width)*v.duration;}}>
            <div style={{width:`${progress*100}%`,height:'100%',background:C.accent,borderRadius:2,position:'relative'}}><div style={{position:'absolute',right:-4,top:-3,width:9,height:9,borderRadius:'50%',background:'#fff',boxShadow:`0 0 6px ${C.accent}`}}/></div>
          </div>
        </div>
        <div style={{position:'absolute',bottom:0,left:0,right:0,background:'linear-gradient(transparent,rgba(0,0,0,0.85))',padding:'28px 16px 20px'}}>
          {hasNext?<button onClick={e=>{e.stopPropagation();onNextRef.current();}} style={{width:'100%',background:C.accent,color:'#fff',border:'none',borderRadius:10,padding:'13px',fontSize:15,fontWeight:700,cursor:'pointer'}}>Следующая серия →</button>:<div style={{textAlign:'center',color:C.textMuted,fontSize:13}}>Последняя доступная серия</div>}
        </div>
      </div>
    </div>
  );
}

// ─── КАРТОЧКА ────────────────────────────────────────────────────────────────
function SeriesCard({series,onClick,watchHistory,desktop=false}){
  const ep=watchHistory[series.id]||0,pct=ep?Math.round((ep/series.episodes)*100):0;
  const w=desktop?160:undefined;
  return(
    <div onClick={()=>onClick(series)} style={{cursor:'pointer',borderRadius:10,overflow:'hidden',background:C.card,transition:'transform 0.18s',width:w,flexShrink:desktop?0:undefined}} onMouseEnter={e=>e.currentTarget.style.transform='scale(1.04)'} onMouseLeave={e=>e.currentTarget.style.transform='scale(1)'}>
      <div style={{position:'relative',aspectRatio:'2/3'}}>
        <img src={series.cover} alt={series.title} style={{width:'100%',height:'100%',objectFit:'cover',display:'block'}}/>
        <div style={{position:'absolute',top:6,left:6}}><Badge text={series.badge}/></div>
        {series.trending&&<div style={{position:'absolute',top:6,right:6,width:22,height:22,background:C.accent,borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontWeight:900,fontSize:11}}>{series.trending}</div>}
        <div style={{position:'absolute',bottom:0,left:0,right:0,background:'linear-gradient(transparent,rgba(8,9,13,0.95))',padding:'20px 8px 8px'}}><div style={{color:C.text,fontSize:12,fontWeight:700,lineHeight:1.3}}>{series.title}</div></div>
        {ep>0&&<div style={{position:'absolute',bottom:0,left:0,right:0,height:3,background:'#1e1e2a'}}><div style={{height:'100%',width:`${pct}%`,background:C.accent}}/></div>}
      </div>
      <div style={{padding:'5px 8px 8px',fontSize:11,color:C.textMuted}}>{series.genre} · {series.episodes} сер.</div>
    </div>
  );
}

// ─── СТРАНИЦА СЕРИАЛА ─────────────────────────────────────────────────────────
function SeriesPage({series,onClose,vip,coins,setCoins,watchHistory,setWatchHistory,isMobile}){
  const[tab,setTab]=useState('episodes'),[playerEp,setPlayerEp]=useState(null),[liked,setLiked]=useLS(`zd_like_${series.id}`,false);
  useEffect(()=>{document.body.style.overflow='hidden';return()=>{document.body.style.overflow='';};},[]);
  useEffect(()=>{const url=getBunnyUrl(series.id,1);if(!url)return;const link=document.createElement('link');link.rel='preload';link.as='fetch';link.href=url;link.crossOrigin='anonymous';document.head.appendChild(link);return()=>{try{document.head.removeChild(link);}catch{}};},[series.id]);
  const dripEps=getDripEps(series.id,series.freeEpisodes),unlockedEps=vip?series.episodes:Math.max(watchHistory[series.id]||0,dripEps),lastWatched=watchHistory[series.id]||0;
  function unlock(ep){if(coins<5){alert('Недостаточно монет!');return;}setCoins(coins-5);setWatchHistory({...watchHistory,[series.id]:Math.max(lastWatched,ep)});}
  function watch(ep){setPlayerEp(ep);if(ep>lastWatched)setWatchHistory({...watchHistory,[series.id]:ep});}
  if(playerEp)return<Player series={series} episode={playerEp} onClose={()=>setPlayerEp(null)} unlockedEps={unlockedEps} onNext={()=>{const next=playerEp+1;if(next>series.episodes)return;if(next<=unlockedEps){setWatchHistory({...watchHistory,[series.id]:next});setPlayerEp(next);}else setPlayerEp(null);}}/>;
  return(
    <div style={{position:'fixed',inset:0,background:C.bg,zIndex:200,overflowY:'auto'}}>
      {/* Hero */}
      <div style={{position:'relative',height:isMobile?300:500}}>
        <img src={series.cover} alt={series.title} style={{width:'100%',height:'100%',objectFit:'cover',display:'block'}}/>
        <div style={{position:'absolute',inset:0,background:`linear-gradient(transparent 20%, rgba(8,9,13,0.7) 60%, ${C.bg})`}}/>
        <button onClick={onClose} style={{position:'absolute',top:16,left:16,background:'rgba(0,0,0,0.5)',border:'none',color:'#fff',borderRadius:'50%',width:40,height:40,display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',zIndex:2}}><IcoClose/></button>
        <button onClick={()=>setLiked(!liked)} style={{position:'absolute',top:16,right:16,background:'rgba(0,0,0,0.5)',border:'none',color:liked?C.red:'#fff',borderRadius:'50%',width:40,height:40,display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',zIndex:2}}><IcoHeart f={liked}/></button>
        {!isMobile&&(
          <div style={{position:'absolute',bottom:40,left:60,zIndex:2}}>
            <div style={{display:'flex',gap:8,marginBottom:10,flexWrap:'wrap'}}><Badge text={series.badge}/><span style={{color:'rgba(255,255,255,0.7)',fontSize:13}}>{series.genre}</span><span style={{color:C.gold,fontSize:13}}>★ {series.rating}</span></div>
            <h1 style={{color:'#fff',fontSize:36,fontWeight:900,margin:'0 0 12px',maxWidth:600}}>{series.title}</h1>
            <p style={{color:'rgba(255,255,255,0.7)',fontSize:14,maxWidth:560,lineHeight:1.6,marginBottom:20}}>{series.desc}</p>
            <div style={{display:'flex',gap:12}}>
              <button onClick={()=>watch(lastWatched||1)} style={{background:C.accent,color:'#fff',border:'none',borderRadius:10,padding:'12px 32px',fontSize:15,fontWeight:800,cursor:'pointer'}}>▶ {lastWatched>0?`Продолжить с серии ${lastWatched}`:'Смотреть'}</button>
              <button onClick={()=>setLiked(!liked)} style={{background:'rgba(255,255,255,0.1)',color:'#fff',border:'1px solid rgba(255,255,255,0.2)',borderRadius:10,padding:'12px 24px',fontSize:14,cursor:'pointer',backdropFilter:'blur(10px)'}}>♡ В избранное</button>
            </div>
          </div>
        )}
      </div>
      <div style={{padding:isMobile?'0 16px 100px':'0 60px 60px',maxWidth:isMobile?undefined:1400,margin:'0 auto'}}>
        {isMobile&&<>
          <div style={{display:'flex',gap:8,marginBottom:8,flexWrap:'wrap',alignItems:'center',paddingTop:12}}><Badge text={series.badge}/><span style={{color:C.textMuted,fontSize:12}}>{series.genre}</span><span style={{color:C.gold,fontSize:12}}>★ {series.rating}</span></div>
          <h2 style={{color:C.text,fontSize:20,fontWeight:800,margin:'0 0 8px'}}>{series.title}</h2>
          <button onClick={()=>watch(lastWatched||1)} style={{width:'100%',background:C.accent,color:'#fff',border:'none',borderRadius:12,padding:'14px',fontSize:15,fontWeight:800,cursor:'pointer',marginBottom:16,marginTop:8}}>▶ {lastWatched>0?`Продолжить с серии ${lastWatched}`:'Смотреть'}</button>
        </>}
        {!vip&&<div style={{background:`${C.accent}12`,border:`1px solid ${C.accent}30`,borderRadius:10,padding:'10px 14px',marginBottom:16,display:'flex',alignItems:'center',gap:10}}><IcoGift/><div><div style={{color:C.accent,fontWeight:700,fontSize:13}}>Бесплатно {dripEps} серий</div><div style={{color:C.textMuted,fontSize:11}}>+3 новых серии каждые 24 часа</div></div></div>}
        <div style={{display:'flex',borderBottom:`1px solid ${C.card2}`,marginBottom:8}}>{['episodes','info'].map(t=><button key={t} onClick={()=>setTab(t)} style={{background:'none',border:'none',color:tab===t?C.accent:C.textMuted,borderBottom:tab===t?`2px solid ${C.accent}`:'2px solid transparent',padding:'10px 20px',fontSize:14,cursor:'pointer',fontWeight:tab===t?700:400}}>{t==='episodes'?'Серии':'О сериале'}</button>)}</div>
        {tab==='episodes'&&<div style={{display:isMobile?'block':'grid',gridTemplateColumns:isMobile?undefined:'repeat(auto-fill,minmax(300px,1fr))',gap:isMobile?0:8}}>
          {!vip&&<div style={{background:`${C.accent}10`,border:`1px solid ${C.accent}25`,borderRadius:10,padding:'12px 14px',marginBottom:12,display:'flex',alignItems:'center',gap:12,gridColumn:isMobile?undefined:'1 / -1'}}><IcoCrown/><div style={{flex:1}}><div style={{color:C.gold,fontWeight:700,fontSize:13}}>ZenDrama Premium — все серии</div><div style={{color:C.textMuted,fontSize:11}}>От 99 ₽/нед</div></div></div>}
          {Array.from({length:series.episodes},(_,i)=>i+1).map(ep=>{const locked=ep>unlockedEps;return(
            <div key={ep} style={{display:'flex',alignItems:'center',gap:12,padding:'10px 8px',borderBottom:`1px solid ${C.card2}40`}}>
              <div style={{width:40,height:40,borderRadius:8,background:locked?C.card2:`${C.accent}18`,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>{locked?<IcoLock/>:<span style={{color:C.accent,fontWeight:700,fontSize:13}}>{ep}</span>}</div>
              <div style={{flex:1}}><div style={{color:locked?C.textMuted:C.text,fontSize:14}}>Серия {ep}</div><div style={{color:C.textDim,fontSize:11}}>~2 мин</div></div>
              {locked?<button onClick={()=>unlock(ep)} style={{background:C.accent,color:'#fff',border:'none',borderRadius:20,padding:'5px 14px',fontSize:12,fontWeight:700,cursor:'pointer',display:'flex',alignItems:'center',gap:4}}><CoinIco/> 5</button>:<button onClick={()=>watch(ep)} style={{background:'transparent',border:`1px solid ${C.accent}`,color:C.accent,borderRadius:20,padding:'5px 14px',fontSize:12,cursor:'pointer'}}>▶</button>}
            </div>
          );})}
        </div>}
        {tab==='info'&&<div style={{padding:'16px 0',maxWidth:600}}><p style={{color:C.textMuted,fontSize:14,lineHeight:1.8,marginBottom:16}}>{series.desc}</p><div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>{[['Жанр',series.genre],['Серий',series.episodes],['Рейтинг',`★ ${series.rating}`],['Доступно',`${unlockedEps} из ${series.episodes}`]].map(([k,v])=><div key={k} style={{background:C.card,borderRadius:10,padding:'12px'}}><div style={{color:C.textDim,fontSize:11,marginBottom:4}}>{k}</div><div style={{color:C.text,fontWeight:700,fontSize:14}}>{v}</div></div>)}</div></div>}
      </div>
    </div>
  );
}

// ─── МАГАЗИН ─────────────────────────────────────────────────────────────────
function Shop({coins,setCoins,vip,setVip,onClose,isMobile}){
  const[tab,setTab]=useState('vip');
  return(
    <div style={{position:'fixed',inset:0,background:C.bg,zIndex:300,overflowY:'auto'}}>
      <div style={{padding:'16px 20px',display:'flex',alignItems:'center',gap:12,borderBottom:`1px solid ${C.card2}`}}>
        <button onClick={onClose} style={{background:'none',border:'none',color:C.text,cursor:'pointer'}}><IcoClose/></button>
        <span style={{color:C.text,fontWeight:800,fontSize:18}}>Магазин</span>
        <div style={{marginLeft:'auto',display:'flex',alignItems:'center',gap:8,background:C.card,borderRadius:20,padding:'6px 14px'}}><CoinIco size={18}/><span style={{color:C.gold,fontWeight:700}}>{coins}</span></div>
      </div>
      <div style={{maxWidth:800,margin:'0 auto',padding:'24px 20px 60px'}}>
        <div style={{display:'flex',background:C.card,borderRadius:10,overflow:'hidden',marginBottom:24}}>{['vip','coins','bonus'].map(t=><button key={t} onClick={()=>setTab(t)} style={{flex:1,padding:'12px',background:tab===t?C.accent:'transparent',color:tab===t?'#fff':C.textMuted,border:'none',fontWeight:700,fontSize:14,cursor:'pointer'}}>{t==='vip'?'👑 Premium':t==='coins'?'🪙 Монеты':'🎁 Бонусы'}</button>)}</div>
        {tab==='vip'&&<><div style={{background:`${C.gold}12`,border:`1px solid ${C.gold}40`,borderRadius:16,padding:24,marginBottom:24}}><div style={{color:C.gold,fontSize:20,fontWeight:800,marginBottom:14}}>👑 ZenDrama Premium</div><div style={{display:'grid',gridTemplateColumns:isMobile?'1fr':'1fr 1fr',gap:8}}>{['Все серии без ограничений','Без рекламы','HD качество','Монеты каждый день'].map(f=><div key={f} style={{color:C.textMuted,fontSize:13,display:'flex',gap:8}}><span style={{color:C.jade}}>✓</span>{f}</div>)}</div></div><div style={{display:'grid',gridTemplateColumns:isMobile?'1fr':'1fr 1fr',gap:12}}>{VIP_PLANS.map(plan=><div key={plan.id} onClick={()=>{setVip(true);onClose();alert(`Premium "${plan.name}" подключён!`);}} style={{background:plan.popular?`${C.accent}12`:C.card,border:`${plan.popular?2:1}px solid ${plan.popular?C.accent:C.card2}`,borderRadius:12,padding:'20px',cursor:'pointer',position:'relative'}}>{plan.popular&&<span style={{position:'absolute',top:-10,left:'50%',transform:'translateX(-50%)',background:C.red,color:'#fff',fontSize:10,padding:'2px 10px',borderRadius:10,fontWeight:700,whiteSpace:'nowrap'}}>Популярно</span>}<div style={{color:C.text,fontWeight:700,fontSize:16,marginBottom:4}}>{plan.name}</div><div style={{color:C.textMuted,fontSize:12,marginBottom:8}}>{plan.period} · +{plan.coins} монет</div>{plan.save&&<div style={{color:C.jade,fontSize:12,marginBottom:8}}>{plan.save}</div>}<div style={{color:C.accent,fontWeight:800,fontSize:24}}>{plan.price}</div></div>)}</div></>}
        {tab==='coins'&&<div style={{display:'grid',gridTemplateColumns:isMobile?'1fr':'1fr 1fr',gap:12}}>{COINS_PACKAGES.map(pkg=><div key={pkg.id} onClick={()=>{setCoins(coins+pkg.coins);alert(`+${pkg.coins} монет!`);}} style={{background:pkg.popular?`${C.accent}12`:C.card,border:`${pkg.popular?2:1}px solid ${pkg.popular?C.accent:C.card2}`,borderRadius:12,padding:'20px',cursor:'pointer',display:'flex',alignItems:'center',gap:16}}><CoinIco size={40}/><div style={{flex:1}}><div style={{color:C.text,fontWeight:700,fontSize:16}}>{pkg.coins} монет</div>{pkg.bonus&&<div style={{color:C.jade,fontSize:13}}>{pkg.bonus}</div>}</div><div style={{color:C.accent,fontWeight:800,fontSize:20}}>{pkg.price}</div></div>)}</div>}
        {tab==='bonus'&&<div style={{display:'grid',gridTemplateColumns:isMobile?'1fr':'1fr 1fr',gap:16}}><div style={{background:C.card,borderRadius:12,padding:24,textAlign:'center'}}><div style={{fontSize:48,marginBottom:12}}>📅</div><div style={{color:C.text,fontWeight:700,fontSize:16,marginBottom:8}}>Ежедневный чекин</div><div style={{color:C.textMuted,fontSize:13,marginBottom:16}}>+10 монет каждый день</div><button onClick={()=>{setCoins(coins+10);alert('+10 монет!');}} style={{background:C.accent,color:'#fff',border:'none',borderRadius:10,padding:'12px 32px',fontSize:14,fontWeight:700,cursor:'pointer'}}>Получить 10 монет</button></div><div style={{background:C.card,borderRadius:12,padding:24,textAlign:'center'}}><div style={{fontSize:48,marginBottom:12}}>📺</div><div style={{color:C.text,fontWeight:700,fontSize:16,marginBottom:8}}>Смотри рекламу</div><div style={{color:C.textMuted,fontSize:13,marginBottom:16}}>+5 монет за просмотр</div><button onClick={()=>{setCoins(coins+5);alert('+5 монет!');}} style={{background:C.card2,color:C.accentLight,border:`1px solid ${C.accent}`,borderRadius:10,padding:'12px 32px',fontSize:14,fontWeight:700,cursor:'pointer'}}>Смотреть</button></div></div>}
      </div>
    </div>
  );
}

// ─── ГОРИЗОНТАЛЬНЫЙ РЯД С КНОПКАМИ ПРОКРУТКИ ─────────────────────────────────
function HScrollRow({title,children}){
  const ref=useRef(null);
  return(
    <div style={{marginBottom:40}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16,padding:'0 60px'}}>
        <div style={{color:C.text,fontSize:20,fontWeight:700}}>{title}</div>
        <div style={{display:'flex',gap:8}}>
          <button onClick={()=>ref.current?.scrollBy({left:-400,behavior:'smooth'})} style={{background:C.card,border:`1px solid ${C.card2}`,color:C.text,borderRadius:'50%',width:36,height:36,display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer'}}><IcoChevronL/></button>
          <button onClick={()=>ref.current?.scrollBy({left:400,behavior:'smooth'})} style={{background:C.card,border:`1px solid ${C.card2}`,color:C.text,borderRadius:'50%',width:36,height:36,display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer'}}><IcoChevronR/></button>
        </div>
      </div>
      <div ref={ref} style={{display:'flex',gap:16,overflowX:'auto',scrollbarWidth:'none',padding:'0 60px',scrollBehavior:'smooth'}}>
        {children}
      </div>
    </div>
  );
}

// ─── ДЕСКТОПНАЯ ГЛАВНАЯ ───────────────────────────────────────────────────────
function DesktopHome({onSelect,genre,setGenre,watchHistory,continueList,history,coins,setCoins,setShowShop,vip}){
  const featured=SERIES_DATA[0];
  const [bannerIdx,setBannerIdx]=useState(0);
  const banners=SERIES_DATA.filter(s=>s.trending).slice(0,5);
  const current=banners[bannerIdx];
  useEffect(()=>{const t=setInterval(()=>setBannerIdx(i=>(i+1)%banners.length),5000);return()=>clearInterval(t);},[]);

  const filtered=genre==='Все'?SERIES_DATA:SERIES_DATA.filter(s=>s.genre===genre);
  const trending=SERIES_DATA.filter(s=>s.trending).sort((a,b)=>a.trending-b.trending);

  return(
    <div style={{paddingBottom:60}}>
      {/* Большой баннер */}
      <div style={{position:'relative',height:'70vh',minHeight:500,overflow:'hidden',cursor:'pointer'}} onClick={()=>onSelect(current)}>
        <img src={current.cover} alt={current.title} style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:'top',transition:'opacity 0.5s'}}/>
        <div style={{position:'absolute',inset:0,background:'linear-gradient(90deg, rgba(8,9,13,0.9) 40%, transparent 80%), linear-gradient(transparent 40%, rgba(8,9,13,0.8))'}}/>
        <div style={{position:'absolute',bottom:'15%',left:60,maxWidth:600,zIndex:2}}>
          <div style={{display:'flex',gap:8,marginBottom:12}}><Badge text={current.badge}/><span style={{color:'rgba(255,255,255,0.7)',fontSize:13}}>{current.genre}</span><span style={{color:C.gold,fontSize:13}}>★ {current.rating}</span></div>
          <h1 style={{color:'#fff',fontSize:48,fontWeight:900,margin:'0 0 16px',lineHeight:1.1}}>{current.title}</h1>
          <p style={{color:'rgba(255,255,255,0.7)',fontSize:15,lineHeight:1.7,marginBottom:24}}>{current.desc}</p>
          <div style={{display:'flex',gap:12}}>
            <button onClick={e=>{e.stopPropagation();onSelect(current);}} style={{background:C.accent,color:'#fff',border:'none',borderRadius:10,padding:'14px 36px',fontSize:16,fontWeight:800,cursor:'pointer'}}>▶ Смотреть</button>
            <button style={{background:'rgba(255,255,255,0.1)',color:'#fff',border:'1px solid rgba(255,255,255,0.3)',borderRadius:10,padding:'14px 28px',fontSize:15,cursor:'pointer',backdropFilter:'blur(10px)'}}>+ Подробнее</button>
          </div>
        </div>
        {/* Точки */}
        <div style={{position:'absolute',bottom:24,left:'50%',transform:'translateX(-50%)',display:'flex',gap:8,zIndex:2}}>
          {banners.map((_,i)=><div key={i} onClick={e=>{e.stopPropagation();setBannerIdx(i);}} style={{width:i===bannerIdx?24:8,height:8,borderRadius:4,background:i===bannerIdx?C.accent:'rgba(255,255,255,0.4)',cursor:'pointer',transition:'all 0.3s'}}/>)}
        </div>
      </div>

      {/* Жанры */}
      <div style={{display:'flex',gap:10,padding:'28px 60px 0',overflowX:'auto',scrollbarWidth:'none'}}>
        {GENRES.map(g=><button key={g} onClick={()=>setGenre(g)} style={{background:genre===g?C.accent:`${C.accent}15`,color:genre===g?'#fff':C.accentLight,border:`1px solid ${genre===g?C.accent:C.accent+'30'}`,borderRadius:20,padding:'8px 18px',fontSize:13,fontWeight:genre===g?700:400,cursor:'pointer',whiteSpace:'nowrap',flexShrink:0}}>{g}</button>)}
      </div>

      {/* Продолжить */}
      {continueList.length>0&&(
        <HScrollRow title="▶ Продолжить просмотр">
          {continueList.map(s=><SeriesCard key={s.id} series={s} onClick={onSelect} watchHistory={watchHistory} desktop/>)}
        </HScrollRow>
      )}

      {/* В тренде */}
      <div style={{margin:'32px 0 0'}}>
        <HScrollRow title="🔥 В тренде сейчас">
          {trending.map(s=><SeriesCard key={s.id} series={s} onClick={onSelect} watchHistory={watchHistory} desktop/>)}
        </HScrollRow>
      </div>

      {/* Все сериалы */}
      <div style={{padding:'0 60px'}}>
        <div style={{color:C.text,fontSize:20,fontWeight:700,marginBottom:20}}>⭐ {genre==='Все'?'Все сериалы':genre}</div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(160px,1fr))',gap:16}}>
          {filtered.map(s=><SeriesCard key={s.id} series={s} onClick={onSelect} watchHistory={watchHistory}/>)}
        </div>
      </div>
    </div>
  );
}

// ─── МОБИЛЬНАЯ ГЛАВНАЯ ────────────────────────────────────────────────────────
function MobileHome({onSelect,genre,setGenre,watchHistory,continueList,history}){
  const featured=SERIES_DATA[0];
  const trending=SERIES_DATA.filter(s=>s.trending).sort((a,b)=>a.trending-b.trending);
  const filtered=SERIES_DATA.filter(s=>genre==='Все'||s.genre===genre);
  return(
    <div>
      {/* Баннер */}
      <div onClick={()=>onSelect(featured)} style={{margin:'0 16px 20px',borderRadius:16,overflow:'hidden',cursor:'pointer',position:'relative',height:200}}>
        <img src={featured.cover} alt={featured.title} style={{width:'100%',height:'100%',objectFit:'cover'}}/>
        <div style={{position:'absolute',inset:0,background:'linear-gradient(transparent 20%,rgba(0,0,0,0.85))'}}/>
        <div style={{position:'absolute',bottom:0,left:0,right:0,padding:'16px'}}><div style={{display:'flex',gap:6,marginBottom:6}}><Badge text={featured.badge}/><span style={{color:'rgba(255,255,255,0.7)',fontSize:11}}>{featured.genre}</span></div><div style={{color:'#fff',fontWeight:800,fontSize:18,marginBottom:8}}>{featured.title}</div><button style={{background:C.accent,color:'#fff',border:'none',borderRadius:8,padding:'7px 18px',fontSize:13,fontWeight:700,cursor:'pointer'}}>▶ Смотреть</button></div>
      </div>
      {/* Жанры */}
      <div style={{display:'flex',gap:8,padding:'0 16px 16px',overflowX:'auto',scrollbarWidth:'none'}}>{GENRES.map(g=><button key={g} onClick={()=>setGenre(g)} style={{background:genre===g?C.accent:`${C.accent}15`,color:genre===g?'#fff':C.accentLight,border:`1px solid ${genre===g?C.accent:C.accent+'30'}`,borderRadius:20,padding:'6px 14px',fontSize:12,fontWeight:genre===g?700:400,cursor:'pointer',whiteSpace:'nowrap',flexShrink:0}}>{g}</button>)}</div>
      {/* Продолжить */}
      {continueList.length>0&&<><div style={{padding:'0 16px 10px',color:C.text,fontSize:15,fontWeight:700}}>▶ Продолжить</div><div style={{display:'flex',gap:10,padding:'0 16px 20px',overflowX:'auto',scrollbarWidth:'none'}}>{continueList.map(s=>{const ep=history[s.id]||0,pct=Math.round((ep/s.episodes)*100);return(<div key={s.id} onClick={()=>onSelect(s)} style={{flexShrink:0,width:120,cursor:'pointer'}}><div style={{position:'relative',borderRadius:10,overflow:'hidden',aspectRatio:'2/3'}}><img src={s.cover} alt={s.title} style={{width:'100%',height:'100%',objectFit:'cover'}}/><div style={{position:'absolute',bottom:0,left:0,right:0,background:'linear-gradient(transparent,rgba(8,9,13,0.95))',padding:'18px 6px 6px'}}><div style={{color:C.text,fontSize:10,fontWeight:700}}>{s.title}</div><div style={{color:C.accent,fontSize:10}}>Сер. {ep}/{s.episodes}</div></div><div style={{position:'absolute',bottom:0,left:0,right:0,height:3,background:'#1e1e2a'}}><div style={{height:'100%',width:`${pct}%`,background:C.accent}}/></div></div></div>);})}</div></>}
      {/* В тренде */}
      {genre==='Все'&&<><div style={{padding:'0 16px 10px',color:C.text,fontSize:15,fontWeight:700}}>🔥 В тренде</div><div style={{display:'flex',gap:10,padding:'0 16px 20px',overflowX:'auto',scrollbarWidth:'none'}}>{trending.map(s=><div key={s.id} onClick={()=>onSelect(s)} style={{flexShrink:0,width:120,cursor:'pointer'}}><div style={{position:'relative',borderRadius:10,overflow:'hidden',aspectRatio:'2/3'}}><img src={s.cover} alt={s.title} style={{width:'100%',height:'100%',objectFit:'cover'}}/><div style={{position:'absolute',top:6,left:6,width:22,height:22,background:C.accent,borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontWeight:900,fontSize:11}}>{s.trending}</div><div style={{position:'absolute',bottom:0,left:0,right:0,background:'linear-gradient(transparent,rgba(8,9,13,0.95))',padding:'18px 6px 6px'}}><div style={{color:C.text,fontSize:11,fontWeight:700}}>{s.title}</div></div></div></div>)}</div></>}
      <div style={{padding:'0 16px 10px',color:C.text,fontSize:15,fontWeight:700}}>⭐ Все сериалы</div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:10,padding:'0 16px'}}>{filtered.map(s=><SeriesCard key={s.id} series={s} onClick={onSelect} watchHistory={watchHistory}/>)}</div>
    </div>
  );
}

// ─── ПОИСК ───────────────────────────────────────────────────────────────────
function SearchPage({onSelect,watchHistory,isMobile}){
  const[q,setQ]=useState(''),[activeTag,setActiveTag]=useState(null);
  const results=SERIES_DATA.filter(s=>(!q||s.title.toLowerCase().includes(q.toLowerCase()))&&(!activeTag||(s.tags||[]).includes(activeTag)));
  const pad=isMobile?'16px':'60px';
  return(
    <div style={{padding:`24px ${pad} 80px`}}>
      <div style={{position:'relative',marginBottom:20,maxWidth:600}}>
        <div style={{position:'absolute',left:14,top:'50%',transform:'translateY(-50%)',color:C.textMuted}}><IcoSearch/></div>
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Найти сериал..." autoFocus style={{width:'100%',background:C.card,border:`1px solid ${C.card2}`,borderRadius:12,padding:'13px 14px 13px 46px',color:C.text,fontSize:15,outline:'none',boxSizing:'border-box'}}/>
        {q&&<button onClick={()=>setQ('')} style={{position:'absolute',right:14,top:'50%',transform:'translateY(-50%)',background:'none',border:'none',color:C.textMuted,cursor:'pointer',fontSize:18}}>✕</button>}
      </div>
      <div style={{display:'flex',gap:8,flexWrap:'wrap',marginBottom:24}}>
        {TAGS.map(tag=><button key={tag} onClick={()=>setActiveTag(activeTag===tag?null:tag)} style={{background:activeTag===tag?C.accent:`${C.accent}15`,color:activeTag===tag?'#fff':C.accentLight,border:`1px solid ${activeTag===tag?C.accent:C.accent+'30'}`,borderRadius:20,padding:'6px 16px',fontSize:13,cursor:'pointer'}}>{tag}</button>)}
      </div>
      {(q||activeTag)?<><div style={{color:C.textMuted,fontSize:13,marginBottom:16}}>Найдено: {results.length}</div><div style={{display:'grid',gridTemplateColumns:isMobile?'1fr 1fr 1fr':'repeat(auto-fill,minmax(160px,1fr))',gap:isMobile?10:16}}>{results.map(s=><SeriesCard key={s.id} series={s} onClick={onSelect} watchHistory={watchHistory}/>)}</div></>:<><div style={{color:C.text,fontSize:18,fontWeight:700,marginBottom:16}}>🔥 В тренде</div><div style={{display:'grid',gridTemplateColumns:isMobile?'1fr 1fr 1fr':'repeat(auto-fill,minmax(160px,1fr))',gap:isMobile?10:16}}>{SERIES_DATA.filter(s=>s.trending).sort((a,b)=>a.trending-b.trending).map(s=><SeriesCard key={s.id} series={s} onClick={onSelect} watchHistory={watchHistory}/>)}</div></>}
    </div>
  );
}

// ─── ГЛАВНЫЙ КОМПОНЕНТ ────────────────────────────────────────────────────────
export default function App(){
  const isMobile=useIsMobile();
  const[tab,setTab]=useState('home'),[selected,setSelected]=useState(null),[showShop,setShowShop]=useState(false),[genre,setGenre]=useState('Все'),[coins,setCoins]=useLS('zd_coins',9),[vip,setVip]=useLS('zd_vip',false),[history,setHistory]=useLS('zd_history',{});
  const continueList=SERIES_DATA.filter(s=>Object.keys(history).map(Number).includes(s.id));

  // Десктоп — полноэкранный
  if(!isMobile){
    return(
      <div style={{background:C.bg,minHeight:'100vh',color:C.text,fontFamily:'system-ui,sans-serif'}}>
        {selected&&<SeriesPage series={selected} onClose={()=>setSelected(null)} vip={vip} coins={coins} setCoins={setCoins} watchHistory={history} setWatchHistory={setHistory} isMobile={false}/>}
        {showShop&&<Shop coins={coins} setCoins={setCoins} vip={vip} setVip={setVip} onClose={()=>setShowShop(false)} isMobile={false}/>}
        {/* Навбар десктоп */}
        <div style={{position:'sticky',top:0,zIndex:100,background:'rgba(8,9,13,0.95)',backdropFilter:'blur(20px)',borderBottom:`1px solid ${C.card2}`,padding:'0 60px',display:'flex',alignItems:'center',gap:40,height:64}}>
          <ZenLogo size={28}/>
          <div style={{display:'flex',gap:8}}>
            {[{id:'home',label:'Главная'},{id:'search',label:'Поиск'},{id:'history',label:'История'}].map(item=>(
              <button key={item.id} onClick={()=>setTab(item.id)} style={{background:tab===item.id?`${C.accent}20`:'none',border:'none',color:tab===item.id?C.accent:C.textMuted,borderRadius:8,padding:'8px 16px',fontSize:14,fontWeight:tab===item.id?700:400,cursor:'pointer'}}>{item.label}</button>
            ))}
          </div>
          <div style={{marginLeft:'auto',display:'flex',gap:12,alignItems:'center'}}>
            {vip&&<div style={{color:C.gold,fontSize:12,fontWeight:700,background:`${C.gold}15`,borderRadius:20,padding:'5px 12px',border:`1px solid ${C.gold}35`}}>👑 Premium</div>}
            <button onClick={()=>setShowShop(true)} style={{background:'none',border:`1px solid ${C.card2}`,color:C.textMuted,borderRadius:8,padding:'8px 16px',fontSize:14,cursor:'pointer',display:'flex',alignItems:'center',gap:6}}><IcoGift/> Магазин</button>
            <button onClick={()=>setShowShop(true)} style={{background:C.accent,color:'#fff',border:'none',borderRadius:20,padding:'8px 18px',fontSize:13,fontWeight:700,cursor:'pointer',display:'flex',alignItems:'center',gap:6}}><CoinIco/> {coins}</button>
            <button onClick={()=>setTab('profile')} style={{background:C.card,border:`1px solid ${C.card2}`,color:C.text,borderRadius:'50%',width:38,height:38,display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer'}}><IcoUser/></button>
          </div>
        </div>

        {/* Контент десктоп */}
        {tab==='home'&&<DesktopHome onSelect={setSelected} genre={genre} setGenre={setGenre} watchHistory={history} continueList={continueList} history={history} coins={coins} setCoins={setCoins} setShowShop={setShowShop} vip={vip}/>}
        {tab==='search'&&<SearchPage onSelect={setSelected} watchHistory={history} isMobile={false}/>}
        {tab==='history'&&(
          <div style={{padding:'40px 60px'}}>
            <h2 style={{color:C.text,fontSize:24,fontWeight:800,marginBottom:24}}>История просмотров</h2>
            {continueList.length===0?<div style={{textAlign:'center',color:C.textMuted,marginTop:80}}><div style={{fontSize:64,marginBottom:16}}>📺</div><div style={{fontSize:18}}>История пуста</div></div>:(
              <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(160px,1fr))',gap:16}}>
                {continueList.map(s=><SeriesCard key={s.id} series={s} onClick={setSelected} watchHistory={history}/>)}
              </div>
            )}
          </div>
        )}
        {tab==='profile'&&(
          <div style={{padding:'40px 60px',maxWidth:800}}>
            <h2 style={{color:C.text,fontSize:24,fontWeight:800,marginBottom:24}}>Профиль</h2>
            {!vip?<div onClick={()=>setShowShop(true)} style={{background:`${C.gold}10`,border:`1px solid ${C.gold}30`,borderRadius:16,padding:24,marginBottom:20,cursor:'pointer',display:'flex',justifyContent:'space-between',alignItems:'center'}}><div><div style={{color:C.gold,fontWeight:800,fontSize:18}}>👑 ZenDrama Premium</div><div style={{color:C.textMuted,fontSize:14,marginTop:4}}>Безлимитный доступ ко всем сериалам</div></div><button style={{background:C.accent,color:'#fff',border:'none',borderRadius:10,padding:'12px 28px',fontSize:14,fontWeight:700,cursor:'pointer'}}>Подключить</button></div>:<div style={{background:`${C.gold}15`,border:`2px solid ${C.gold}`,borderRadius:16,padding:24,marginBottom:20}}><div style={{color:C.gold,fontWeight:800,fontSize:18}}>👑 Premium активен</div></div>}
            <div style={{background:C.card,borderRadius:16,padding:24,display:'flex',alignItems:'center',gap:24}}><CoinIco size={48}/><div><div style={{color:C.textMuted,fontSize:13}}>Ваш баланс</div><div style={{color:C.gold,fontWeight:800,fontSize:32}}>{coins} монет</div></div><button onClick={()=>setShowShop(true)} style={{marginLeft:'auto',background:C.accent,color:'#fff',border:'none',borderRadius:10,padding:'12px 28px',fontSize:14,fontWeight:700,cursor:'pointer'}}>Пополнить</button></div>
          </div>
        )}
      </div>
    );
  }

  // Мобильный — как раньше
  return(
    <div style={{background:C.bg,minHeight:'100vh',maxWidth:430,margin:'0 auto',fontFamily:'system-ui,sans-serif',paddingBottom:70,color:C.text}}>
      {selected&&<SeriesPage series={selected} onClose={()=>setSelected(null)} vip={vip} coins={coins} setCoins={setCoins} watchHistory={history} setWatchHistory={setHistory} isMobile={true}/>}
      {showShop&&<Shop coins={coins} setCoins={setCoins} vip={vip} setVip={setVip} onClose={()=>setShowShop(false)} isMobile={true}/>}
      {/* Мобильный хедер */}
      <div style={{padding:'14px 16px 10px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <ZenLogo size={26}/>
        <div style={{display:'flex',gap:10,alignItems:'center'}}>
          {vip&&<div style={{color:C.gold,fontSize:11,fontWeight:700,background:`${C.gold}15`,borderRadius:20,padding:'4px 10px',border:`1px solid ${C.gold}35`}}>👑</div>}
          <button onClick={()=>setShowShop(true)} style={{background:C.accent,color:'#fff',border:'none',borderRadius:20,padding:'5px 13px',fontSize:12,fontWeight:700,cursor:'pointer',display:'flex',alignItems:'center',gap:5}}><CoinIco/> {coins}</button>
        </div>
      </div>
      {tab==='home'&&<MobileHome onSelect={setSelected} genre={genre} setGenre={setGenre} watchHistory={history} continueList={continueList} history={history}/>}
      {tab==='search'&&<SearchPage onSelect={setSelected} watchHistory={history} isMobile={true}/>}
      {tab==='history'&&<div style={{padding:'16px 16px 100px'}}><h2 style={{color:C.text,fontSize:18,fontWeight:800,margin:'0 0 16px'}}>История</h2>{continueList.length===0?<div style={{textAlign:'center',color:C.textMuted,marginTop:80}}><div style={{fontSize:48,marginBottom:12}}>📺</div><div>История пуста</div></div>:continueList.map(s=>{const ep=history[s.id]||0,pct=Math.round((ep/s.episodes)*100);return(<div key={s.id} onClick={()=>setSelected(s)} style={{display:'flex',gap:12,marginBottom:14,cursor:'pointer',background:C.card,borderRadius:10,overflow:'hidden'}}><div style={{position:'relative',width:90,flexShrink:0}}><img src={s.cover} alt={s.title} style={{width:90,height:130,objectFit:'cover',display:'block'}}/><div style={{position:'absolute',bottom:0,left:0,right:0,height:3,background:'#1e1e2a'}}><div style={{height:'100%',width:`${pct}%`,background:C.accent}}/></div></div><div style={{padding:'12px 12px 12px 0',flex:1}}><div style={{color:C.text,fontWeight:700,fontSize:14,marginBottom:4}}>{s.title}</div><div style={{color:C.accent,fontSize:12}}>Серия {ep} из {s.episodes}</div><div style={{color:C.textMuted,fontSize:11,marginTop:4}}>{s.genre}</div></div></div>);})}</div>}
      {tab==='profile'&&<div style={{padding:'16px 16px 100px'}}><h2 style={{color:C.text,fontSize:18,fontWeight:800,margin:'0 0 20px'}}>Профиль</h2>{!vip?<div onClick={()=>setShowShop(true)} style={{background:`${C.gold}10`,border:`1px solid ${C.gold}30`,borderRadius:14,padding:16,marginBottom:16,cursor:'pointer'}}><div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}><div><div style={{color:C.gold,fontWeight:800,fontSize:15}}>👑 ZenDrama Premium</div><div style={{color:C.textMuted,fontSize:12,marginTop:2}}>Безлимитный доступ</div></div><div style={{background:C.accent,color:'#fff',borderRadius:20,padding:'6px 14px',fontSize:12,fontWeight:700}}>Подключить</div></div></div>:<div style={{background:`${C.gold}15`,border:`2px solid ${C.gold}`,borderRadius:14,padding:16,marginBottom:16}}><div style={{color:C.gold,fontWeight:800,fontSize:15}}>👑 Premium активен</div></div>}<div style={{background:C.card,borderRadius:14,padding:16,marginBottom:16}}><div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:14}}><div style={{color:C.text,fontWeight:700,fontSize:15}}>Кошелёк</div><button onClick={()=>setShowShop(true)} style={{background:C.accent,color:'#fff',border:'none',borderRadius:20,padding:'5px 14px',fontSize:12,fontWeight:700,cursor:'pointer'}}>Пополнить</button></div><div style={{display:'flex',gap:6,alignItems:'center'}}><CoinIco size={20}/><span style={{color:C.gold,fontSize:22,fontWeight:800}}>{coins}</span><span style={{color:C.textMuted,fontSize:12,marginLeft:4}}>монет</span></div></div></div>}
      {/* Мобильный навбар */}
      <div style={{position:'fixed',bottom:0,left:'50%',transform:'translateX(-50%)',width:'100%',maxWidth:430,background:'#0d0e14',borderTop:`1px solid ${C.card2}`,display:'flex'}}>
        {[{id:'home',icon:<IcoHome/>,label:'Главн��я'},{id:'search',icon:<IcoSearch/>,label:'Поиск'},{id:'history',icon:<IcoHistory/>,label:'История'},{id:'profile',icon:<IcoUser/>,label:'Профиль'}].map(item=><button key={item.id} onClick={()=>setTab(item.id)} style={{flex:1,background:'none',border:'none',padding:'10px 0 8px',color:tab===item.id?C.accent:C.textMuted,cursor:'pointer',display:'flex',flexDirection:'column',alignItems:'center',gap:3}}>{item.icon}<span style={{fontSize:10}}>{item.label}</span></button>)}
      </div>
    </div>
  );
}
