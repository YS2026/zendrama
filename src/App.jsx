import { useState, useEffect, useRef, useMemo, useCallback, memo } from "react";

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
  { id:13, title:"Власть и любовь",                     genre:"Романтика",     episodes:50, freeEpisodes:3, cover:"https://picsum.photos/seed/vlast/300/450",   badge:"Новинка",   trending:null, rating:9.3, desc:"Молодая девушка становится ассистентом могущественного CEO..." },
];

const GENRES = ["Все","Романтика","Фэнтези","Драма","Комедия","Триллер","Попаданчество"];
const COINS_PACKAGES = [ /* вставь свой оригинальный массив */ ];
const VIP_PLANS = [ /* вставь свой оригинальный массив */ ];
const LANGUAGES = [ /* вставь свой оригинальный массив */ ];

const VIDEO_MAP = { 13: { 1: "34a6f8cb-821b-43b5-940e-23c56cce2cef" } };
const SUBTITLES_MAP = {
  13: { 1: { ru: "https://zendrama-subs.b-cdn.net/seria_001_ru.srt", en: "https://zendrama-subs.b-cdn.net/seria_001_clean.srt" }}
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

const UI_TEXT = { /* вставь сюда весь свой оригинальный UI_TEXT */ };

const Ico = ({ d, size=22, color="currentColor", fill="none", sw=1.8 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"><path d={d}/></svg>
);
// ... все твои Ico*, ZenLogo, CoinIco, Badge — оставь как были

const SeriesCard = memo(({ series, onClick, watchHistory }) => { /* твой оригинальный SeriesCard */ });

// ==================== ИСПРАВЛЕННЫЙ ПЛЕЕР ====================
function Player({ series, episode, onClose, onNext, appLang, t }) {
  const videoRef = useRef(null);
  const hlsRef = useRef(null);
  const controlTimer = useRef(null);

  const [showControls, setShowControls] = useState(true);
  const [currentSub, setCurrentSub] = useState('');
  const [srtData, setSrtData] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('0:00');
  const [duration, setDuration] = useState('0:00');
  const [muted, setMuted] = useState(false);
  const [quality, setQuality] = useState('Auto');
  const [showQuality, setShowQuality] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showSubs, setShowSubs] = useState(true);
  const [subLang, setSubLang] = useLS('zd_sublang', appLang);
  const [showSubMenu, setShowSubMenu] = useState(false);

  const hlsUrl = getBunnyUrl(series.id, episode);
  const nextHlsUrl = getBunnyUrl(series.id, episode + 1);
  const subUrl = showSubs ? getSubtitleUrl(series.id, episode, subLang) : null;

  const fmt = (s) => !s||isNaN(s) ? '0:00' : `${Math.floor(s/60)}:${String(Math.floor(s%60)).padStart(2,'0')}`;

  const showCtrl = () => {
    setShowControls(true);
    clearTimeout(controlTimer.current);
    controlTimer.current = setTimeout(() => setShowControls(false), 3000);
  };

  useEffect(() => { showCtrl(); return () => clearTimeout(controlTimer.current); }, []);

  // HLS + максимальное качество сразу
  useEffect(() => {
    if (!hlsUrl || !videoRef.current) return;
    const video = videoRef.current;

    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = hlsUrl;
      video.load();
    } else if (window.Hls) {
      if (hlsRef.current) hlsRef.current.destroy();
      const hls = new window.Hls({ enableWorker: true, startLevel: -1, abrEwmaDefaultEstimate: 8000000 });
      hls.loadSource(hlsUrl);
      hls.attachMedia(video);
      hls.on(window.Hls.Events.MANIFEST_PARSED, () => {
        if (hls.levels?.length) hls.currentLevel = hls.levels.length - 1;
        video.play().catch(() => {});
      });
      hlsRef.current = hls;
    }

    return () => { if (hlsRef.current) hlsRef.current.destroy(); };
  }, [hlsUrl]);

  // Субтитры
  useEffect(() => {
    if (!subUrl) { setSrtData([]); return; }
    fetch(subUrl).then(r=>r.text()).then(text=>setSrtData(parseSRT(text))).catch(()=>{});
  }, [subUrl]);

  // Time + автопереход
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onTime = () => {
      const ct = video.currentTime;
      setProgress(ct/(video.duration||1));
      setCurrentTime(fmt(ct)); 
      setDuration(fmt(video.duration));
      const sub = srtData.find(s=>ct>=s.start&&ct<=s.end);
      setCurrentSub(sub?sub.text:'');
    };
    const onEnded = () => {
      if (nextHlsUrl) onNext();
      else onClose();
    };
    video.addEventListener('timeupdate', onTime);
    video.addEventListener('ended', onEnded);
    video.addEventListener('play', () => setIsPlaying(true));
    video.addEventListener('pause', () => setIsPlaying(false));
    return () => {
      video.removeEventListener('timeupdate', onTime);
      video.removeEventListener('ended', onEnded);
    };
  }, [srtData, nextHlsUrl, onNext, onClose]);

  // Вставь сюда весь свой оригинальный JSX контролов (top bar, center buttons, progress bar и т.д.)
  // Он полностью совместим.

  return (
    <div onClick={showCtrl} style={{ position:'fixed', inset:0, background:'#000', zIndex:200, overflow:'hidden' }}>
      <video ref={videoRef} style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'contain' }} playsInline preload="auto" />

      {currentSub && showSubs && (
        <div style={{ position:'absolute', bottom:'12%', left:'4%', right:'4%', textAlign:'center', zIndex:6, pointerEvents:'none' }}>
          <span style={{ color:'#fff', fontSize:24, fontWeight:800, lineHeight:1.4, textShadow:'0 0 10px #000' }}>{currentSub}</span>
        </div>
      )}

      {/* Твои контролы сюда */}
    </div>
  );
}

function SeriesModal({ series, onClose, vip, coins, setCoins, watchHistory, setWatchHistory, appLang, t }) {
  const [tab, setTab] = useState("episodes");
  const [playerEp, setPlayerEp] = useState(null);
  const [bookmarked, setBookmarked] = useLS(`bm_${series.id}`, false);

  const unlockedEps = vip ? series.episodes : (watchHistory[series.id] || series.freeEpisodes);

  const handleUnlock = (ep) => {
    if(coins<5){alert("Недостаточно монет!");return;}
    setCoins(coins-5);
    setWatchHistory({...watchHistory,[series.id]:Math.max(watchHistory[series.id]||0,ep)});
  };

  const handleWatch = (ep) => {
    setPlayerEp(ep);
    if(ep > (watchHistory[series.id]||0)) setWatchHistory({...watchHistory,[series.id]:ep});
  };

  if (playerEp) return (
    <Player 
      series={series} 
      episode={playerEp} 
      onClose={()=>setPlayerEp(null)} 
      onNext={() => {
        const next = playerEp + 1;
        if (next <= series.episodes) setPlayerEp(next);
        else setPlayerEp(null);
      }} 
      appLang={appLang} 
      t={t} 
    />
  );

  // ... весь остальной код SeriesModal как у тебя был
}

// ShopModal, LangPicker, App — оставь как в оригинале

export default function App() {
  // ... весь твой оригинальный код App
}
