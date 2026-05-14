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
  { id:13, title:"Власть и любовь",                     genre:"Романтика",     episodes:50, freeEpisodes:3, cover:"https://picsum.photos/seed/vlast/300/450",   badge:"Новинка",   trending:null, rating:9.3, desc:"Молодая девушка становится ассистентом могущественного CEO, скрывающего тайные чувства..." },
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
const VIDEO_MAP = { 13: { 1: "34a6f8cb-821b-43b5-940e-23c56cce2cef" } };
const SUBTITLES_MAP = {
  13: { 1: {
    ru: "https://zendrama-subs.b-cdn.net/seria_001_ru.srt",
    en: "https://zendrama-subs.b-cdn.net/seria_001_clean.srt",
  }}
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
  const subUrl = showSubs ? getSubtitleUrl(series.id, episode, subLang) : null;

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
