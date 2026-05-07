import { useState } from "react";

const C = {
  bg: "#08090d",
  card: "#111318",
  card2: "#1a1c24",
  accent: "#7c6af7",       // фиолетовый — zen/азия
  accentLight: "#a89cf8",
  accentGlow: "#7c6af720",
  red: "#e05b7f",
  text: "#f0eeff",
  textMuted: "#7a7a9a",
  textDim: "#3a3a5a",
  jade: "#3ecf8e",         // нефритовый — азиатский акцент
};

const SERIES_DATA = [
  { id:1, title:"Тайный миллионер", genre:"Романтика", episodes:80, freeEpisodes:3, cover:"https://picsum.photos/seed/mill/300/450", badge:"Эксклюзив", trending:1, rating:9.2, desc:"Девушка из бедной семьи случайно встречает скрытного миллиардера..." },
  { id:2, title:"Рождённый повелителем", genre:"Фэнтези", episodes:96, freeEpisodes:3, cover:"https://picsum.photos/seed/lord/300/450", badge:"Эксклюзив", trending:4, rating:8.9, desc:"Древний правитель возрождается в современном мире с магическими силами..." },
  { id:3, title:"Муж-гендиректор меня баловал", genre:"Романтика", episodes:68, freeEpisodes:3, cover:"https://picsum.photos/seed/ceo/300/450", badge:"Эксклюзив", trending:2, rating:9.5, desc:"Брак по договору превращается в настоящую любовь..." },
  { id:4, title:"Тот самый мальчик", genre:"Романтика", episodes:72, freeEpisodes:3, cover:"https://picsum.photos/seed/boy/300/450", badge:"Эксклюзив", trending:5, rating:8.7, desc:"Первая любовь снова появляется спустя 10 лет..." },
  { id:5, title:"Телефон для невесты", genre:"Комедия", episodes:58, freeEpisodes:3, cover:"https://picsum.photos/seed/phone/300/450", badge:"Эксклюзив", trending:6, rating:8.4, desc:"Случайный обмен телефонами меняет судьбы двух незнакомцев..." },
  { id:6, title:"Замуж за врага", genre:"Драма", episodes:84, freeEpisodes:3, cover:"https://picsum.photos/seed/enemy/300/450", badge:"Эксклюзив", trending:3, rating:9.1, desc:"Вынужденный союз с главным соперником семьи..." },
  { id:7, title:"Эвелин и Гари: Новая жизнь", genre:"Попаданчество", episodes:93, freeEpisodes:3, cover:"https://picsum.photos/seed/evelin/300/450", badge:"Хит", trending:null, rating:9.3, desc:"Современная женщина попадает в древний Китай..." },
  { id:8, title:"Двойная жизнь королевы бизнеса", genre:"Драма", episodes:76, freeEpisodes:3, cover:"https://picsum.photos/seed/queen2/300/450", badge:"Новинка", trending:null, rating:8.6, desc:"Успешная бизнес-леди скрывает тёмное прошлое..." },
  { id:9, title:"Твоё солнце", genre:"Романтика", episodes:62, freeEpisodes:3, cover:"https://picsum.photos/seed/sun/300/450", badge:"Эксклюзив", trending:null, rating:8.8, desc:"Слепая девушка и её тайный покровитель..." },
  { id:10, title:"Королева читает мои мысли", genre:"Фэнтези", episodes:88, freeEpisodes:3, cover:"https://picsum.photos/seed/mindread/300/450", badge:"Эксклюзив", trending:null, rating:9.0, desc:"Необычный дар превращает жизнь в настоящее испытание..." },
  { id:11, title:"Яков и Алина: Пять лет тайной любви", genre:"Романтика", episodes:70, freeEpisodes:3, cover:"https://picsum.photos/seed/yakov/300/450", badge:"Хит", trending:null, rating:9.4, desc:"Тайная любовь, скрытая от всего мира..." },
  { id:12, title:"Пленница", genre:"Триллер", episodes:65, freeEpisodes:3, cover:"https://picsum.photos/seed/plen/300/450", badge:"18+", trending:null, rating:8.5, desc:"Побег из золотой клетки богатого особняка..." },
];

const GENRES = ["Все", "Романтика", "Фэнтези", "Драма", "Комедия", "Триллер", "Попаданчество"];

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

function useLS(key, def) {
  const [v, setV] = useState(() => { try { const s = localStorage.getItem(key); return s ? JSON.parse(s) : def; } catch { return def; } });
  const set = (x) => { setV(x); try { localStorage.setItem(key, JSON.stringify(x)); } catch {} };
  return [v, set];
}

// ─── Icons ────────────────────────────────────────────────────────────────────
const Ico = ({ d, size=22, color="currentColor", fill="none", sw=1.8 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
    <path d={d}/>
  </svg>
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

// ─── ZenDrama Logo SVG ────────────────────────────────────────────────────────
const ZenLogo = ({ size = 28 }) => (
  <svg width={size * 3.2} height={size} viewBox="0 0 96 28" fill="none">
    {/* Lotus / zen circle icon */}
    <circle cx="14" cy="14" r="12" stroke={C.accent} strokeWidth="1.5"/>
    <path d="M14 6 C14 6 8 10 8 14 C8 18 14 22 14 22 C14 22 20 18 20 14 C20 10 14 6 14 6Z" fill={C.accent} opacity="0.3"/>
    <path d="M14 8 C14 8 10 12 10 16" stroke={C.accentLight} strokeWidth="1" strokeLinecap="round"/>
    <path d="M14 8 C14 8 18 12 18 16" stroke={C.accentLight} strokeWidth="1" strokeLinecap="round"/>
    <circle cx="14" cy="16" r="2" fill={C.accent}/>
    {/* Text */}
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

// ─── Badge ────────────────────────────────────────────────────────────────────
function Badge({ text }) {
  const map = {
    "Эксклюзив": { bg:"#1e1a40", color:C.accentLight },
    "Хит":       { bg:"#3a1225", color:"#f472b6" },
    "Новинка":   { bg:"#0d2e20", color:C.jade },
    "18+":       { bg:"#2a1a2e", color:"#c084fc" },
  };
  const s = map[text] || { bg:"#1e1e2a", color:C.textMuted };
  return <span style={{ background:s.bg, color:s.color, fontSize:10, fontWeight:700, padding:"2px 7px", borderRadius:4, letterSpacing:0.5 }}>{text}</span>;
}

// ─── Series Card ──────────────────────────────────────────────────────────────
function SeriesCard({ series, onClick, watchHistory }) {
  const prog = watchHistory[series.id];
  const pct = prog ? Math.round((prog / series.episodes) * 100) : 0;
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

// ─── Episode Row ──────────────────────────────────────────────────────────────
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

// ─── Player ───────────────────────────────────────────────────────────────────
function Player({ series, episode, onClose, onNext }) {
  return (
    <div style={{ position:"fixed", inset:0, background:"#000", zIndex:100, display:"flex", flexDirection:"column" }}>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"12px 16px", position:"absolute", top:0, left:0, right:0, zIndex:10, background:"linear-gradient(#000a,transparent)" }}>
        <button onClick={onClose} style={{ background:"none", border:"none", color:"#fff", cursor:"pointer" }}><IcoClose/></button>
        <span style={{ color:"#fff", fontSize:13 }}>{series.title} — Серия {episode}</span>
        <div style={{ width:22 }}/>
      </div>
      <div style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", background:"#0a0b10", position:"relative" }}>
        <div style={{ textAlign:"center" }}>
          <div style={{ fontSize:56, marginBottom:12 }}>🎬</div>
          <div style={{ color:C.textMuted, fontSize:14 }}>Видеоплеер</div>
          <div style={{ color:C.textDim, fontSize:11, marginTop:4 }}>Подключите Bunny.net или Cloudflare Stream</div>
        </div>
        <div style={{ position:"absolute", bottom:60, left:16, right:16, background:"rgba(0,0,0,0.85)", borderRadius:14, padding:16 }}>
          <div style={{ color:"#fff", fontSize:13, marginBottom:8 }}>Серия {episode} из {series.episodes}</div>
          <div style={{ background:"#1e1e2a", borderRadius:4, height:4, marginBottom:14 }}>
            <div style={{ width:"30%", height:"100%", background:C.accent, borderRadius:4 }}/>
          </div>
          <button onClick={onNext} style={{ width:"100%", background:C.accent, color:"#fff", border:"none", borderRadius:10, padding:"11px", fontSize:14, fontWeight:700, cursor:"pointer" }}>
            Следующая серия →
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Series Modal ─────────────────────────────────────────────────────────────
function SeriesModal({ series, onClose, vip, coins, setCoins, watchHistory, setWatchHistory }) {
  const [tab, setTab] = useState("episodes");
  const [playerEp, setPlayerEp] = useState(null);
  const [bookmarked, setBookmarked] = useLS(`bm_${series.id}`, false);

  function handleUnlock(ep) {
    if (coins < 5) { alert("Недостаточно монет! Пополни кошелёк."); return; }
    setCoins(coins - 5);
    setWatchHistory({ ...watchHistory, [series.id]: Math.max(watchHistory[series.id] || series.freeEpisodes, ep) });
  }
  function handleWatch(ep) {
    setPlayerEp(ep);
    if (ep > (watchHistory[series.id] || 0)) setWatchHistory({ ...watchHistory, [series.id]: ep });
  }

  if (playerEp) return (
    <Player series={series} episode={playerEp} onClose={() => setPlayerEp(null)}
      onNext={() => {
        const next = playerEp + 1;
        if (next > series.episodes) return;
        const unl = vip ? series.episodes : (watchHistory[series.id] || series.freeEpisodes);
        next <= unl ? setPlayerEp(next) : setPlayerEp(null);
      }}/>
  );

  const unlockedEps = vip ? series.episodes : (watchHistory[series.id] || series.freeEpisodes);

  return (
    <div style={{ position:"fixed", inset:0, background:C.bg, zIndex:50, overflowY:"auto" }}>
      {/* Hero */}
      <div style={{ position:"relative", height:300 }}>
        <img src={series.cover} alt={series.title} style={{ width:"100%", height:"100%", objectFit:"cover" }}/>
        <div style={{ position:"absolute", inset:0, background:`linear-gradient(transparent 20%, ${C.bg})` }}/>
        <button onClick={onClose} style={{ position:"absolute", top:16, left:16, background:"rgba(0,0,0,0.6)", border:"none", color:"#fff", borderRadius:"50%", width:36, height:36, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer" }}><IcoClose/></button>
        <button onClick={() => setBookmarked(!bookmarked)} style={{ position:"absolute", top:16, right:16, background:"rgba(0,0,0,0.6)", border:"none", color:bookmarked?C.accent:"#fff", borderRadius:"50%", width:36, height:36, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer" }}><IcoBookmark f={bookmarked}/></button>
      </div>

      <div style={{ padding:"0 16px 32px" }}>
        <div style={{ display:"flex", gap:8, marginBottom:8, flexWrap:"wrap", alignItems:"center" }}>
          <Badge text={series.badge}/>
          <span style={{ color:C.textMuted, fontSize:12 }}>{series.genre}</span>
          <span style={{ color:"#fbbf24", fontSize:12 }}>★ {series.rating}</span>
        </div>
        <h2 style={{ color:C.text, fontSize:21, fontWeight:800, margin:"0 0 8px" }}>{series.title}</h2>
        <p style={{ color:C.textMuted, fontSize:13, margin:"0 0 14px", lineHeight:1.65 }}>{series.desc}</p>
        <div style={{ color:C.textDim, fontSize:12, marginBottom:18 }}>{series.episodes} серий · Первые {series.freeEpisodes} бесплатно</div>

        <button onClick={() => handleWatch(watchHistory[series.id] || 1)} style={{ width:"100%", background:C.accent, color:"#fff", border:"none", borderRadius:12, padding:"13px", fontSize:15, fontWeight:800, cursor:"pointer", marginBottom:22, display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
          ▶ {watchHistory[series.id] ? `Продолжить с серии ${watchHistory[series.id]}` : "Смотреть"}
        </button>

        <div style={{ display:"flex", borderBottom:`1px solid ${C.card2}` }}>
          {["episodes","info"].map(t => (
            <button key={t} onClick={() => setTab(t)} style={{ flex:1, background:"none", border:"none", color:tab===t?C.accent:C.textMuted, borderBottom:tab===t?`2px solid ${C.accent}`:"2px solid transparent", padding:"10px", fontSize:14, cursor:"pointer", fontWeight:tab===t?700:400 }}>
              {t==="episodes"?"Серии":"Описание"}
            </button>
          ))}
        </div>

        {tab==="episodes" && (
          <>
            {!vip && (
              <div style={{ background:`${C.accent}12`, border:`1px solid ${C.accent}30`, borderRadius:10, padding:"12px 16px", margin:"12px 0", display:"flex", alignItems:"center", gap:12 }}>
                <IcoCrown/>
                <div style={{ flex:1 }}>
                  <div style={{ color:C.accent, fontWeight:700, fontSize:13 }}>ZenDrama Premium — безлимитно</div>
                  <div style={{ color:C.textMuted, fontSize:11 }}>От 99 ₽/неделю</div>
                </div>
              </div>
            )}
            {Array.from({ length:series.episodes }, (_,i)=>i+1).map(ep => (
              <EpRow key={ep} ep={ep} isLocked={ep > unlockedEps} coins={coins} onUnlock={handleUnlock} onWatch={handleWatch}/>
            ))}
          </>
        )}
        {tab==="info" && (
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

// ─── Shop Modal ───────────────────────────────────────────────────────────────
function ShopModal({ coins, setCoins, vip, setVip, onClose }) {
  const [tab, setTab] = useState("vip");
  return (
    <div style={{ position:"fixed", inset:0, background:C.bg, zIndex:50, overflowY:"auto" }}>
      <div style={{ padding:"16px 16px 0", display:"flex", alignItems:"center", gap:12 }}>
        <button onClick={onClose} style={{ background:"none", border:"none", color:"#fff", cursor:"pointer" }}><IcoClose/></button>
        <h2 style={{ color:C.text, fontSize:18, fontWeight:800, margin:0 }}>Магазин</h2>
      </div>

      <div style={{ display:"flex", margin:"16px", borderRadius:10, overflow:"hidden", background:C.card }}>
        {["vip","coins"].map(t => (
          <button key={t} onClick={() => setTab(t)} style={{ flex:1, padding:"10px", background:tab===t?C.accent:"transparent", color:tab===t?"#fff":C.textMuted, border:"none", fontWeight:700, fontSize:14, cursor:"pointer" }}>
            {t==="vip"?"👑 Premium":"🪙 Монеты"}
          </button>
        ))}
      </div>

      <div style={{ padding:"0 16px 32px" }}>
        {tab==="vip" && (
          <>
            <div style={{ background:`${C.accent}15`, border:`1px solid ${C.accent}35`, borderRadius:16, padding:20, marginBottom:22 }}>
              <div style={{ color:C.accent, fontSize:17, fontWeight:800, marginBottom:10 }}>👑 ZenDrama Premium</div>
              {["Безлимитный просмотр всех серий","Без рекламы","Ранняя загрузка новинок","Ежедневные Premium-баллы"].map(f => (
                <div key={f} style={{ color:C.textMuted, fontSize:13, display:"flex", gap:8, marginBottom:5 }}>
                  <span style={{ color:C.jade }}>✓</span> {f}
                </div>
              ))}
            </div>
            {VIP_PLANS.map(plan => (
              <div key={plan.id} onClick={() => { setVip(true); onClose(); alert(`Premium "${plan.name}" подключён!`); }} style={{ background:plan.popular?`${C.accent}12`:C.card, border:`${plan.popular?2:1}px solid ${plan.popular?C.accent:C.card2}`, borderRadius:12, padding:"14px 16px", marginBottom:12, display:"flex", alignItems:"center", cursor:"pointer" }}>
                <div style={{ flex:1 }}>
                  <div style={{ color:C.text, fontWeight:700, fontSize:15 }}>
                    {plan.name}
                    {plan.popular && <span style={{ background:C.red, color:"#fff", fontSize:10, padding:"2px 7px", borderRadius:4, marginLeft:8 }}>Популярно</span>}
                  </div>
                  <div style={{ color:C.textMuted, fontSize:12 }}>{plan.period}{plan.save ? ` · ${plan.save}` : ""}</div>
                </div>
                <div style={{ color:C.accent, fontWeight:800, fontSize:18 }}>{plan.price}</div>
              </div>
            ))}
          </>
        )}
        {tab==="coins" && (
          <>
            <div style={{ background:C.card, borderRadius:12, padding:16, marginBottom:18, display:"flex", alignItems:"center", gap:14 }}>
              <CoinIco/>
              <div>
                <div style={{ color:C.textMuted, fontSize:12 }}>Ваш баланс</div>
                <div style={{ color:C.accent, fontWeight:800, fontSize:22 }}>{coins} монет</div>
              </div>
            </div>
            <div style={{ color:C.textMuted, fontSize:12, marginBottom:12 }}>1 серия = 5 монет · 1 монета ≈ 0.17 ₽</div>
            {COINS_PACKAGES.map(pkg => (
              <div key={pkg.id} onClick={() => { setCoins(coins + pkg.coins); alert(`+${pkg.coins} монет добавлено!`); }} style={{ background:pkg.popular?`${C.accent}12`:C.card, border:`${pkg.popular?2:1}px solid ${pkg.popular?C.accent:C.card2}`, borderRadius:12, padding:"14px 16px", marginBottom:12, display:"flex", alignItems:"center", cursor:"pointer" }}>
                <div style={{ flex:1 }}>
                  <div style={{ color:C.text, fontWeight:700, fontSize:15 }}>
                    🪙 {pkg.coins} монет
                    {pkg.popular && <span style={{ background:C.red, color:"#fff", fontSize:10, padding:"2px 7px", borderRadius:4, marginLeft:8 }}>Выгодно</span>}
                  </div>
                  {pkg.bonus && <div style={{ color:C.jade, fontSize:12 }}>{pkg.bonus}</div>}
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

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [tab, setTab] = useState("home");
  const [selected, setSelected] = useState(null);
  const [showShop, setShowShop] = useState(false);
  const [searchQ, setSearchQ] = useState("");
  const [genre, setGenre] = useState("Все");
  const [coins, setCoins] = useLS("zd_coins", 9);
  const [vip, setVip] = useLS("zd_vip", false);
  const [history, setHistory] = useLS("zd_history", {});

  const filtered = SERIES_DATA.filter(s =>
    (genre === "Все" || s.genre === genre) &&
    s.title.toLowerCase().includes(searchQ.toLowerCase())
  );
  const trending = [...SERIES_DATA].filter(s => s.trending).sort((a,b) => a.trending - b.trending);
  const continueList = SERIES_DATA.filter(s => Object.keys(history).map(Number).includes(s.id));

  return (
    <div style={{ background:C.bg, minHeight:"100vh", maxWidth:430, margin:"0 auto", fontFamily:"system-ui,sans-serif", paddingBottom:70, color:C.text }}>

      {selected && <SeriesModal series={selected} onClose={() => setSelected(null)} vip={vip} coins={coins} setCoins={setCoins} watchHistory={history} setWatchHistory={setHistory}/>}
      {showShop && <ShopModal coins={coins} setCoins={setCoins} vip={vip} setVip={setVip} onClose={() => setShowShop(false)}/>}

      {/* ── HOME ─────────────────────────────────────────────────────────── */}
      {tab === "home" && (
        <div>
          {/* Header */}
          <div style={{ padding:"14px 16px 10px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
            <ZenLogo size={26}/>
            <div style={{ display:"flex", gap:10, alignItems:"center" }}>
              {vip && <div style={{ color:C.accent, fontSize:11, fontWeight:700, background:`${C.accent}15`, borderRadius:20, padding:"4px 10px", border:`1px solid ${C.accent}35` }}>👑 Premium</div>}
              <button onClick={() => setShowShop(true)} style={{ background:C.accent, color:"#fff", border:"none", borderRadius:20, padding:"5px 13px", fontSize:12, fontWeight:700, cursor:"pointer", display:"flex", alignItems:"center", gap:4 }}>
                <CoinIco/> {coins}
              </button>
            </div>
          </div>

          {/* Search */}
          <div style={{ margin:"0 16px 14px", position:"relative" }}>
            <div style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)", color:C.textMuted }}><IcoSearch/></div>
            <input value={searchQ} onChange={e => setSearchQ(e.target.value)} placeholder="Найти сериал..."
              style={{ width:"100%", background:C.card, border:`1px solid ${C.card2}`, borderRadius:10, padding:"10px 12px 10px 44px", color:C.text, fontSize:14, outline:"none", boxSizing:"border-box" }}/>
          </div>

          {/* Genres */}
          <div style={{ display:"flex", gap:8, padding:"0 16px 16px", overflowX:"auto", scrollbarWidth:"none" }}>
            {GENRES.map(g => (
              <button key={g} onClick={() => setGenre(g)} style={{ background:genre===g?C.accent:`${C.accent}15`, color:genre===g?"#fff":C.accentLight, border:`1px solid ${genre===g?C.accent:C.accent+"30"}`, borderRadius:20, padding:"6px 14px", fontSize:12, fontWeight:genre===g?700:400, cursor:"pointer", whiteSpace:"nowrap", flexShrink:0 }}>{g}</button>
            ))}
          </div>

          {!searchQ && genre === "Все" && (
            <>
              {/* Trending */}
              <div style={{ padding:"0 16px 10px", color:C.text, fontSize:15, fontWeight:700 }}>🔥 В тренде</div>
              <div style={{ display:"flex", gap:10, padding:"0 16px 20px", overflowX:"auto", scrollbarWidth:"none" }}>
                {trending.map(s => (
                  <div key={s.id} onClick={() => setSelected(s)} style={{ flexShrink:0, width:120, cursor:"pointer" }}>
                    <div style={{ position:"relative", borderRadius:10, overflow:"hidden", aspectRatio:"2/3" }}>
                      <img src={s.cover} alt={s.title} style={{ width:"100%", height:"100%", objectFit:"cover" }}/>
                      <div style={{ position:"absolute", top:6, left:6, width:22, height:22, background:C.accent, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontWeight:900, fontSize:12 }}>{s.trending}</div>
                      <div style={{ position:"absolute", bottom:0, left:0, right:0, background:"linear-gradient(transparent,rgba(8,9,13,0.95))", padding:"18px 6px 6px" }}>
                        <div style={{ color:C.text, fontSize:11, fontWeight:700 }}>{s.title}</div>
                      </div>
                    </div>
                    <div style={{ color:C.textMuted, fontSize:10, marginTop:4 }}>{s.genre}</div>
                  </div>
                ))}
              </div>

              {/* Continue */}
              {continueList.length > 0 && (
                <>
                  <div style={{ padding:"0 16px 10px", color:C.text, fontSize:15, fontWeight:700 }}>▶ Продолжить</div>
                  <div style={{ display:"flex", gap:10, padding:"0 16px 20px", overflowX:"auto", scrollbarWidth:"none" }}>
                    {continueList.map(s => {
                      const ep = history[s.id] || 0;
                      const pct = Math.round((ep / s.episodes) * 100);
                      return (
                        <div key={s.id} onClick={() => setSelected(s)} style={{ flexShrink:0, width:120, cursor:"pointer" }}>
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
              <div style={{ padding:"0 16px 10px", color:C.text, fontSize:15, fontWeight:700 }}>⭐ Все сериалы</div>
            </>
          )}

          {/* Grid */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10, padding:"0 16px" }}>
            {filtered.map(s => <SeriesCard key={s.id} series={s} onClick={setSelected} watchHistory={history}/>)}
          </div>
        </div>
      )}

      {/* ── WATCH ────────────────────────────────────────────────────────── */}
      {tab === "watch" && (
        <div style={{ padding:16 }}>
          <h2 style={{ color:C.text, fontSize:18, fontWeight:800, margin:"0 0 16px" }}>Смотреть</h2>
          {continueList.length === 0 ? (
            <div style={{ textAlign:"center", color:C.textMuted, marginTop:80 }}>
              <div style={{ fontSize:48, marginBottom:12 }}>📺</div>
              <div>История просмотров пуста</div>
              <div style={{ fontSize:12, marginTop:4 }}>Начните смотреть любой сериал</div>
            </div>
          ) : continueList.map(s => {
            const ep = history[s.id] || 0;
            const pct = Math.round((ep / s.episodes) * 100);
            return (
              <div key={s.id} onClick={() => setSelected(s)} style={{ display:"flex", gap:12, marginBottom:14, cursor:"pointer", background:C.card, borderRadius:10, overflow:"hidden" }}>
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

      {/* ── PROFILE ──────────────────────────────────────────────────────── */}
      {tab === "profile" && (
        <div style={{ padding:16 }}>
          <h2 style={{ color:C.text, fontSize:18, fontWeight:800, margin:"0 0 20px" }}>Профиль</h2>

          {!vip ? (
            <div onClick={() => setShowShop(true)} style={{ background:`${C.accent}12`, border:`1px solid ${C.accent}35`, borderRadius:14, padding:16, marginBottom:16, cursor:"pointer" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <div>
                  <div style={{ color:C.accent, fontWeight:800, fontSize:15 }}>👑 ZenDrama Premium</div>
                  <div style={{ color:C.textMuted, fontSize:12, marginTop:2 }}>Безлимитный доступ ко всем сериалам</div>
                </div>
                <div style={{ background:C.accent, color:"#fff", borderRadius:20, padding:"6px 14px", fontSize:12, fontWeight:700 }}>Подключить →</div>
              </div>
              <div style={{ display:"flex", gap:14, marginTop:12, flexWrap:"wrap" }}>
                {["Безлимитный просмотр","Без рекламы","Ранняя загрузка","Premium-баллы"].map(f => (
                  <div key={f} style={{ color:C.textMuted, fontSize:11 }}><span style={{ color:C.jade }}>✓</span> {f}</div>
                ))}
              </div>
            </div>
          ) : (
            <div style={{ background:`${C.accent}15`, border:`2px solid ${C.accent}`, borderRadius:14, padding:16, marginBottom:16 }}>
              <div style={{ color:C.accent, fontWeight:800, fontSize:15 }}>👑 Premium активен</div>
              <div style={{ color:C.textMuted, fontSize:12 }}>Безлимитный доступ ко всем сериалам</div>
            </div>
          )}

          {/* Wallet */}
          <div style={{ background:C.card, borderRadius:14, padding:16, marginBottom:16 }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
              <div style={{ color:C.text, fontWeight:700 }}>Мой кошелёк</div>
              <button onClick={() => setShowShop(true)} style={{ background:C.accent, color:"#fff", border:"none", borderRadius:20, padding:"5px 14px", fontSize:12, fontWeight:700, cursor:"pointer" }}>Пополнить</button>
            </div>
            <div style={{ display:"flex", gap:24 }}>
              <div>
                <div style={{ color:C.accent, fontSize:22, fontWeight:800 }}>{coins}</div>
                <div style={{ color:C.textMuted, fontSize:12 }}>🪙 Монеты</div>
              </div>
              <div>
                <div style={{ color:C.text, fontSize:22, fontWeight:800 }}>0</div>
                <div style={{ color:C.textMuted, fontSize:12 }}>🎟 Бонусы</div>
              </div>
            </div>
          </div>

          {[
            { icon:<IcoHistory/>, label:"История просмотров", count:continueList.length },
            { icon:<IcoBookmark f={false}/>, label:"Закладки" },
            { icon:<IcoCrown/>, label:"Центр бонусов" },
          ].map(item => (
            <div key={item.label} style={{ background:C.card, borderRadius:12, padding:"14px 16px", marginBottom:10, display:"flex", alignItems:"center", gap:12, cursor:"pointer" }}>
              <div style={{ color:C.textMuted }}>{item.icon}</div>
              <div style={{ flex:1, color:C.text, fontSize:14 }}>{item.label}</div>
              {item.count !== undefined && <span style={{ background:C.accent, color:"#fff", borderRadius:20, padding:"2px 8px", fontSize:11, fontWeight:700 }}>{item.count}</span>}
              <span style={{ color:C.textDim }}>›</span>
            </div>
          ))}
        </div>
      )}

      {/* ── Bottom Nav ───────────────────────────────────────────────────── */}
      <div style={{ position:"fixed", bottom:0, left:"50%", transform:"translateX(-50%)", width:"100%", maxWidth:430, background:"#0d0e14", borderTop:`1px solid ${C.card2}`, display:"flex" }}>
        {[
          { id:"home",    icon:<IcoHome/>,  label:"Главная" },
          { id:"watch",   icon:<IcoPlay/>,  label:"Смотреть" },
          { id:"profile", icon:<IcoUser/>,  label:"Профиль" },
        ].map(item => (
          <button key={item.id} onClick={() => setTab(item.id)} style={{ flex:1, background:"none", border:"none", padding:"10px 0 8px", color:tab===item.id?C.accent:C.textMuted, cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center", gap:3 }}>
            {item.icon}
            <span style={{ fontSize:10 }}>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
