// ZenDrama - Main App Component
// This file can be used for React/Vite projects uploaded via GitHub
// For Next.js deployment on Vercel, use the app/ directory structure

import React, { useState, useRef } from 'react';

// Drama Data
const trendingDramas = [
  { id: "1", title: "Eternal Love", poster: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=450&fit=crop", genre: "Romance", year: 2024, episodes: 50, rating: 9.2 },
  { id: "2", title: "Hidden Secrets", poster: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=300&h=450&fit=crop", genre: "Mystery", year: 2024, episodes: 24, rating: 8.8 },
  { id: "3", title: "CEO's Contract", poster: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=450&fit=crop", genre: "Romance", year: 2024, episodes: 36, rating: 8.5 },
  { id: "4", title: "Time Traveler", poster: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=300&h=450&fit=crop", genre: "Fantasy", year: 2024, episodes: 40, rating: 9.0 },
  { id: "5", title: "Royal Dynasty", poster: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=300&h=450&fit=crop", genre: "Historical", year: 2024, episodes: 60, rating: 9.1 },
  { id: "6", title: "Urban Dreams", poster: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=450&fit=crop", genre: "Urban", year: 2024, episodes: 30, rating: 8.7 },
];

const newReleases = [
  { id: "7", title: "Moonlight Sonata", poster: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&h=450&fit=crop", genre: "Romance", year: 2024, episodes: 24 },
  { id: "8", title: "Corporate Wars", poster: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=450&fit=crop", genre: "Urban", year: 2024, episodes: 40 },
  { id: "9", title: "Supernatural Academy", poster: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=300&h=450&fit=crop", genre: "Fantasy", year: 2024, episodes: 36 },
  { id: "10", title: "Revenge Protocol", poster: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=450&fit=crop", genre: "Thriller", year: 2024, episodes: 28 },
  { id: "11", title: "Second Chance", poster: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300&h=450&fit=crop", genre: "Romance", year: 2024, episodes: 32 },
  { id: "12", title: "Dynasty Rising", poster: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=300&h=450&fit=crop", genre: "Historical", year: 2024, episodes: 45 },
];

const exclusiveOriginals = [
  { id: "13", title: "The Phoenix", poster: "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=300&h=450&fit=crop", genre: "Action", year: 2024, episodes: 20 },
  { id: "14", title: "Silent Whispers", poster: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=300&h=450&fit=crop", genre: "Mystery", year: 2024, episodes: 16 },
  { id: "15", title: "Parallel Hearts", poster: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=300&h=450&fit=crop", genre: "Sci-Fi", year: 2024, episodes: 24 },
  { id: "16", title: "Jade Empire", poster: "https://images.unsplash.com/photo-1496440737103-cd596325d314?w=300&h=450&fit=crop", genre: "Historical", year: 2024, episodes: 50 },
  { id: "17", title: "Neon Nights", poster: "https://images.unsplash.com/photo-1514315384763-ba401779410f?w=300&h=450&fit=crop", genre: "Urban", year: 2024, episodes: 30 },
  { id: "18", title: "Dragon's Legacy", poster: "https://images.unsplash.com/photo-1464863979621-258859e62245?w=300&h=450&fit=crop", genre: "Fantasy", year: 2024, episodes: 40 },
];

const featuredDrama = {
  id: "featured",
  title: "Reborn in Another World",
  poster: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1920&h=800&fit=crop",
  genre: "Fantasy",
  year: 2024,
  episodes: 40,
  rating: 9.5,
  description: "After an unexpected accident, a modern woman wakes up in an ancient kingdom with no memory of her past. Now she must navigate palace intrigue, forbidden love, and discover the truth about her mysterious reincarnation."
};

// Icons
const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/>
  </svg>
);

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
  </svg>
);

const PlayIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 5v14l11-7z"/>
  </svg>
);

const InfoIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>
  </svg>
);

const ChevronLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m15 18-6-6 6-6"/>
  </svg>
);

const ChevronRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m9 18 6-6-6-6"/>
  </svg>
);

const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
  </svg>
);

const GlobeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>
  </svg>
);

const HomeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/>
  </svg>
);

const FilmIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="18" height="18" x="3" y="3" rx="2"/><path d="M7 3v18"/><path d="M3 7.5h4"/><path d="M3 12h18"/><path d="M3 16.5h4"/><path d="M17 3v18"/><path d="M17 7.5h4"/><path d="M17 16.5h4"/>
  </svg>
);

const DownloadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7,10 12,15 17,10"/><line x1="12" x2="12" y1="15" y2="3"/>
  </svg>
);

const InfoIconNav = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>
  </svg>
);

// Styles
const styles = {
  app: {
    minHeight: '100vh',
    backgroundColor: '#0a0a0a',
    color: '#fafafa',
    fontFamily: 'system-ui, -apple-system, sans-serif',
  },
  header: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 50,
    backgroundColor: 'rgba(10, 10, 10, 0.95)',
    backdropFilter: 'blur(8px)',
    borderBottom: '1px solid rgba(255,255,255,0.1)',
  },
  headerContent: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '0 16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '64px',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    textDecoration: 'none',
    color: 'inherit',
  },
  logoIcon: {
    width: '32px',
    height: '32px',
    borderRadius: '8px',
    backgroundColor: '#f97316',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: '18px',
    color: '#0a0a0a',
  },
  logoText: {
    fontSize: '20px',
    fontWeight: 'bold',
  },
  nav: {
    display: 'flex',
    alignItems: 'center',
    gap: '32px',
  },
  navLink: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#a1a1aa',
    textDecoration: 'none',
    transition: 'color 0.2s',
  },
  navLinkActive: {
    color: '#f97316',
  },
  headerActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  iconButton: {
    background: 'none',
    border: 'none',
    color: '#a1a1aa',
    cursor: 'pointer',
    padding: '8px',
    borderRadius: '8px',
  },
  languageButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    background: 'none',
    border: 'none',
    color: '#a1a1aa',
    cursor: 'pointer',
    fontSize: '14px',
  },
  hero: {
    position: 'relative',
    width: '100%',
    height: '600px',
    overflow: 'hidden',
  },
  heroBackground: {
    position: 'absolute',
    inset: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  heroGradient: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(to right, #0a0a0a, rgba(10,10,10,0.8), transparent), linear-gradient(to top, #0a0a0a, transparent)',
  },
  heroContent: {
    position: 'relative',
    zIndex: 10,
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '0 16px',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  heroInfo: {
    maxWidth: '500px',
  },
  hotBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    marginBottom: '16px',
  },
  badge: {
    padding: '2px 8px',
    fontSize: '12px',
    fontWeight: '600',
    backgroundColor: '#f97316',
    color: '#0a0a0a',
    borderRadius: '4px',
  },
  heroTitle: {
    fontSize: 'clamp(28px, 5vw, 48px)',
    fontWeight: 'bold',
    marginBottom: '12px',
    lineHeight: 1.2,
  },
  heroDescription: {
    fontSize: '14px',
    color: '#a1a1aa',
    marginBottom: '24px',
    lineHeight: 1.6,
  },
  heroMeta: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    fontSize: '14px',
    color: '#a1a1aa',
    marginBottom: '24px',
  },
  heroActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  button: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 24px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s',
    border: 'none',
  },
  primaryButton: {
    backgroundColor: '#f97316',
    color: '#0a0a0a',
  },
  outlineButton: {
    backgroundColor: 'transparent',
    color: '#fafafa',
    border: '1px solid rgba(255,255,255,0.2)',
  },
  section: {
    padding: '24px 0',
  },
  sectionContainer: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '0 16px',
  },
  sectionHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '16px',
  },
  sectionTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
  },
  carouselNav: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  carouselButton: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    border: '1px solid rgba(255,255,255,0.2)',
    background: 'transparent',
    color: '#fafafa',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  carousel: {
    display: 'flex',
    gap: '12px',
    overflowX: 'auto',
    scrollBehavior: 'smooth',
    paddingBottom: '8px',
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
  },
  card: {
    flexShrink: 0,
    width: '160px',
    cursor: 'pointer',
  },
  cardPoster: {
    position: 'relative',
    aspectRatio: '2/3',
    borderRadius: '8px',
    overflow: 'hidden',
    marginBottom: '8px',
    backgroundColor: '#1a1a1a',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.3s',
  },
  cardRating: {
    position: 'absolute',
    top: '8px',
    right: '8px',
    padding: '2px 6px',
    backgroundColor: 'rgba(0,0,0,0.7)',
    backdropFilter: 'blur(4px)',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: '500',
    color: '#facc15',
  },
  cardTitle: {
    fontSize: '14px',
    fontWeight: '500',
    marginBottom: '4px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  cardGenre: {
    display: 'inline-block',
    padding: '2px 8px',
    fontSize: '12px',
    backgroundColor: '#1a1a1a',
    color: '#a1a1aa',
    borderRadius: '4px',
  },
  footer: {
    backgroundColor: 'rgba(26,26,26,0.5)',
    borderTop: '1px solid rgba(255,255,255,0.1)',
    marginTop: 'auto',
  },
  footerContent: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '40px 16px',
  },
  footerGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '32px',
  },
  footerTitle: {
    fontSize: '14px',
    fontWeight: '600',
    marginBottom: '16px',
  },
  footerLink: {
    display: 'block',
    fontSize: '14px',
    color: '#a1a1aa',
    textDecoration: 'none',
    marginBottom: '8px',
  },
  socialLinks: {
    display: 'flex',
    gap: '12px',
  },
  socialIcon: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    backgroundColor: '#1a1a1a',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#a1a1aa',
    textDecoration: 'none',
  },
  appButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 12px',
    backgroundColor: '#1a1a1a',
    borderRadius: '8px',
    marginBottom: '8px',
    textDecoration: 'none',
    color: 'inherit',
  },
  copyright: {
    marginTop: '40px',
    paddingTop: '24px',
    borderTop: '1px solid rgba(255,255,255,0.1)',
    textAlign: 'center',
    fontSize: '12px',
    color: '#a1a1aa',
  },
  mobileNav: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 50,
    backgroundColor: 'rgba(10, 10, 10, 0.95)',
    backdropFilter: 'blur(8px)',
    borderTop: '1px solid rgba(255,255,255,0.1)',
  },
  mobileNavContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: '64px',
  },
  mobileNavItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px',
    padding: '8px 12px',
    color: '#a1a1aa',
    textDecoration: 'none',
    fontSize: '10px',
    fontWeight: '500',
  },
  mobileNavItemActive: {
    color: '#f97316',
  },
};

// Components
function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header style={styles.header}>
      <div style={styles.headerContent}>
        <a href="/" style={styles.logo}>
          <div style={styles.logoIcon}>Z</div>
          {!isMobile && <span style={styles.logoText}>ZenDrama</span>}
        </a>

        {!isMobile && (
          <nav style={styles.nav}>
            <a href="/" style={{...styles.navLink, ...styles.navLinkActive}}>Home</a>
            <a href="/genres" style={styles.navLink}>Genres</a>
            <a href="/download" style={styles.navLink}>Download</a>
            <a href="/about" style={styles.navLink}>About Us</a>
          </nav>
        )}

        <div style={styles.headerActions}>
          {!isMobile && (
            <>
              <button style={styles.iconButton}><SearchIcon /></button>
              <button style={styles.languageButton}>
                <GlobeIcon /> English
              </button>
            </>
          )}
          {isMobile && (
            <button style={styles.iconButton} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

function HeroBanner({ drama }) {
  return (
    <section style={styles.hero}>
      <div style={{...styles.heroBackground, backgroundImage: `url(${drama.poster})`}}>
        <div style={styles.heroGradient} />
      </div>
      <div style={styles.heroContent}>
        <div style={styles.heroInfo}>
          <div style={styles.hotBadge}>
            <span style={styles.badge}>Hot</span>
            <span>🔥</span>
          </div>
          <h1 style={styles.heroTitle}>{drama.title}</h1>
          {drama.description && (
            <p style={styles.heroDescription}>{drama.description}</p>
          )}
          <div style={styles.heroMeta}>
            {drama.year && <span>{drama.year}</span>}
            {drama.episodes && <span>{drama.episodes} Episodes</span>}
            {drama.rating && <span>★ {drama.rating}</span>}
          </div>
          <div style={styles.heroActions}>
            <button style={{...styles.button, ...styles.primaryButton}}>
              <PlayIcon /> Play
            </button>
            <button style={{...styles.button, ...styles.outlineButton}}>
              <InfoIcon /> More Info
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function DramaCard({ drama }) {
  return (
    <div style={styles.card}>
      <div style={styles.cardPoster}>
        <img src={drama.poster} alt={drama.title} style={styles.cardImage} />
        {drama.rating && (
          <div style={styles.cardRating}>★ {drama.rating}</div>
        )}
      </div>
      <h3 style={styles.cardTitle}>{drama.title}</h3>
      <span style={styles.cardGenre}>{drama.genre}</span>
    </div>
  );
}

function DramaCarousel({ title, dramas }) {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const amount = direction === 'left' ? -400 : 400;
    scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
  };

  return (
    <section style={styles.section}>
      <div style={styles.sectionContainer}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>{title}</h2>
          <div style={styles.carouselNav}>
            <button style={styles.carouselButton} onClick={() => scroll('left')}>
              <ChevronLeftIcon />
            </button>
            <button style={styles.carouselButton} onClick={() => scroll('right')}>
              <ChevronRightIcon />
            </button>
          </div>
        </div>
        <div ref={scrollRef} style={styles.carousel}>
          {dramas.map((drama) => (
            <DramaCard key={drama.id} drama={drama} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.footerContent}>
        <div style={styles.footerGrid}>
          <div>
            <h3 style={styles.footerTitle}>About</h3>
            <a href="/terms" style={styles.footerLink}>User Agreement</a>
            <a href="/privacy" style={styles.footerLink}>Privacy Policy</a>
            <a href="/faq" style={styles.footerLink}>FAQ</a>
          </div>
          <div>
            <h3 style={styles.footerTitle}>Contact us</h3>
            <a href="mailto:support@zendramas.org" style={styles.footerLink}>
              support@zendramas.org
            </a>
          </div>
          <div>
            <h3 style={styles.footerTitle}>Community</h3>
            <div style={styles.socialLinks}>
              <a href="#" style={styles.socialIcon}>f</a>
              <a href="#" style={styles.socialIcon}>▶</a>
              <a href="#" style={styles.socialIcon}>📷</a>
              <a href="#" style={styles.socialIcon}>𝕏</a>
            </div>
          </div>
          <div>
            <h3 style={styles.footerTitle}>Download App</h3>
            <a href="#" style={styles.appButton}>
              <span>🍎</span>
              <div>
                <div style={{fontSize: '10px', color: '#a1a1aa'}}>Download on the</div>
                <div style={{fontSize: '12px', fontWeight: '600'}}>App Store</div>
              </div>
            </a>
            <a href="#" style={styles.appButton}>
              <span>▶</span>
              <div>
                <div style={{fontSize: '10px', color: '#a1a1aa'}}>Get it on</div>
                <div style={{fontSize: '12px', fontWeight: '600'}}>Google Play</div>
              </div>
            </a>
          </div>
        </div>
        <div style={styles.copyright}>
          © {new Date().getFullYear()} ZenDrama. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

function MobileNav() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!isMobile) return null;

  const navItems = [
    { icon: HomeIcon, label: 'Home', active: true },
    { icon: FilmIcon, label: 'Genres' },
    { icon: SearchIcon, label: 'Search' },
    { icon: DownloadIcon, label: 'Download' },
    { icon: InfoIconNav, label: 'About' },
  ];

  return (
    <>
      <nav style={styles.mobileNav}>
        <div style={styles.mobileNavContent}>
          {navItems.map((item) => (
            <a
              key={item.label}
              href="#"
              style={{
                ...styles.mobileNavItem,
                ...(item.active ? styles.mobileNavItemActive : {}),
              }}
            >
              <item.icon />
              <span>{item.label}</span>
            </a>
          ))}
        </div>
      </nav>
      <div style={{ height: '64px' }} />
    </>
  );
}

// Main App
export default function App() {
  return (
    <div style={styles.app}>
      <Header />
      
      <main style={{ paddingTop: '64px' }}>
        <HeroBanner drama={featuredDrama} />
        
        <div>
          <DramaCarousel title="Trending Now" dramas={trendingDramas} />
          <DramaCarousel title="New Releases" dramas={newReleases} />
          <DramaCarousel title="Exclusive Originals" dramas={exclusiveOriginals} />
        </div>
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}
