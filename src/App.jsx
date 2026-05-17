// ZenDrama - Main App Component
// This file can be used for React/Vite projects uploaded via GitHub
// For Next.js deployment on Vercel, use the app/ directory structure

import React, { useState, useRef, useEffect } from 'react';

// Note: For local Next.js deployment, posters are in /public/posters/
// For standalone React app, you can host images on Bunny CDN and update URLs here
const POSTER_BASE_URL = ''; // e.g., 'https://yourcdn.b-cdn.net/posters' 

// Drama Data - Update poster URLs after uploading to Bunny CDN
const trendingDramas = [
  { id: "1", title: "Secret Love", poster: "/posters/poster-1.jpg", genre: "Romance", year: 2024, episodes: 40, rating: 9.2 },
  { id: "2", title: "Love Contract", poster: "/posters/poster-2.jpg", genre: "Romance", year: 2024, episodes: 36, rating: 8.8 },
  { id: "3", title: "Eternal Palace", poster: "/posters/poster-3.jpg", genre: "Historical", year: 2024, episodes: 50, rating: 9.0 },
  { id: "4", title: "Time Walker", poster: "/posters/poster-4.jpg", genre: "Fantasy", year: 2024, episodes: 45, rating: 8.9 },
  { id: "5", title: "Vengeance is Mine", poster: "/posters/poster-5.jpg", genre: "Thriller", year: 2024, episodes: 30, rating: 9.1 },
  { id: "6", title: "My Fake Boyfriend", poster: "/posters/poster-6.jpg", genre: "Comedy", year: 2024, episodes: 24, rating: 8.5 },
];

const newReleases = [
  { id: "7", title: "Dragon Warrior", poster: "/posters/poster-7.jpg", genre: "Action", year: 2024, episodes: 40 },
  { id: "8", title: "Dark Secrets", poster: "/posters/poster-8.jpg", genre: "Mystery", year: 2024, episodes: 28 },
  { id: "9", title: "First Love", poster: "/posters/poster-9.jpg", genre: "Romance", year: 2024, episodes: 24 },
  { id: "10", title: "The Empress", poster: "/posters/poster-10.jpg", genre: "Historical", year: 2024, episodes: 60 },
  { id: "11", title: "City of Dreams", poster: "/posters/poster-11.jpg", genre: "Urban", year: 2024, episodes: 32 },
  { id: "12", title: "Immortal Love", poster: "/posters/poster-12.jpg", genre: "Fantasy", year: 2024, episodes: 50 },
];

const exclusiveOriginals = [
  { id: "13", title: "Path to Immortality", poster: "/posters/poster-13.jpg", genre: "Fantasy", year: 2024, episodes: 55 },
  { id: "14", title: "Married by Contract", poster: "/posters/poster-14.jpg", genre: "Romance", year: 2024, episodes: 36 },
  { id: "15", title: "Reborn for Revenge", poster: "/posters/poster-15.jpg", genre: "Thriller", year: 2024, episodes: 40 },
  { id: "16", title: "Doctor's Heart", poster: "/posters/poster-16.jpg", genre: "Romance", year: 2024, episodes: 32 },
  { id: "17", title: "Accidentally in Love", poster: "/posters/poster-17.jpg", genre: "Comedy", year: 2024, episodes: 24 },
  { id: "18", title: "Agent X", poster: "/posters/poster-18.jpg", genre: "Action", year: 2024, episodes: 30 },
];

const featuredDrama = {
  id: "featured",
  title: "She's Back",
  poster: "/posters/hero-banner.jpg",
  genre: "Romance",
  year: 2024,
  episodes: 40,
  rating: 9.5,
  description: "After years abroad, she returns with a new identity to confront her past. Secrets unravel, old flames reignite, and nothing is as it seems."
};

// Icons
const PlayIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 5v14l11-7z"/>
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

const GridIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/>
  </svg>
);

const DownloadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7,10 12,15 17,10"/><line x1="12" x2="12" y1="15" y2="3"/>
  </svg>
);

const InfoIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>
  </svg>
);

const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/>
  </svg>
);

// CSS-in-JS Styles
const createStyles = (isMobile) => ({
  // Global
  app: {
    minHeight: '100vh',
    backgroundColor: '#0a0a0a',
    color: '#fafafa',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    paddingBottom: isMobile ? '80px' : 0,
  },
  
  // Header
  header: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 50,
    backgroundColor: 'rgba(10, 10, 10, 0.95)',
    backdropFilter: 'blur(12px)',
    borderBottom: '1px solid rgba(255,255,255,0.08)',
  },
  headerContent: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '0 16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '56px',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
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
    fontWeight: '700',
    letterSpacing: '-0.5px',
  },
  nav: {
    display: 'flex',
    alignItems: 'center',
    gap: '32px',
  },
  navLink: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#71717a',
    textDecoration: 'none',
    transition: 'color 0.2s',
  },
  navLinkActive: {
    color: '#f97316',
  },
  headerActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  iconButton: {
    background: 'transparent',
    border: 'none',
    color: '#71717a',
    cursor: 'pointer',
    padding: '8px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  languageButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    background: 'transparent',
    border: 'none',
    color: '#71717a',
    cursor: 'pointer',
    fontSize: '14px',
    padding: '8px 12px',
    borderRadius: '8px',
  },

  // Hero
  hero: {
    position: 'relative',
    width: '100%',
    height: isMobile ? '450px' : '600px',
    overflow: 'hidden',
    marginTop: '56px',
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
    background: 'linear-gradient(to right, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.6) 50%, transparent 100%), linear-gradient(to top, #0a0a0a 0%, transparent 50%, rgba(0,0,0,0.3) 100%)',
  },
  heroContent: {
    position: 'relative',
    zIndex: 10,
    height: '100%',
    display: 'flex',
    alignItems: 'flex-end',
    paddingBottom: isMobile ? '32px' : '64px',
  },
  heroInner: {
    maxWidth: '1400px',
    width: '100%',
    margin: '0 auto',
    padding: '0 16px',
  },
  heroInfo: {
    maxWidth: '480px',
  },
  hotBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '12px',
  },
  badge: {
    padding: '4px 10px',
    fontSize: '11px',
    fontWeight: '700',
    backgroundColor: '#f97316',
    color: '#0a0a0a',
    borderRadius: '4px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  heroTitle: {
    fontSize: isMobile ? '32px' : '52px',
    fontWeight: '800',
    marginBottom: '16px',
    lineHeight: 1.1,
    letterSpacing: '-1px',
    color: '#ffffff',
  },
  playButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '14px 28px',
    borderRadius: '8px',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
    border: 'none',
    backgroundColor: '#f97316',
    color: '#0a0a0a',
    transition: 'transform 0.2s, background-color 0.2s',
  },
  slideIndicators: {
    position: 'absolute',
    bottom: '24px',
    right: '24px',
    display: 'flex',
    gap: '6px',
  },
  slideIndicator: {
    height: '3px',
    borderRadius: '2px',
    backgroundColor: 'rgba(255,255,255,0.4)',
  },
  slideIndicatorActive: {
    width: '32px',
    backgroundColor: '#ffffff',
  },

  // Section
  section: {
    padding: '32px 0',
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
    marginBottom: '20px',
  },
  sectionTitle: {
    fontSize: '20px',
    fontWeight: '700',
    letterSpacing: '-0.3px',
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
    border: '1px solid rgba(255,255,255,0.15)',
    background: 'rgba(255,255,255,0.05)',
    color: '#fafafa',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s',
  },
  carousel: {
    display: 'flex',
    gap: '14px',
    overflowX: 'auto',
    scrollBehavior: 'smooth',
    paddingBottom: '8px',
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
  },

  // Card
  card: {
    flexShrink: 0,
    width: isMobile ? '140px' : '170px',
    cursor: 'pointer',
  },
  cardPoster: {
    position: 'relative',
    aspectRatio: '2/3',
    borderRadius: '10px',
    overflow: 'hidden',
    marginBottom: '10px',
    backgroundColor: '#1a1a1a',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.3s ease',
  },
  cardOverlay: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 50%)',
    opacity: 0,
    transition: 'opacity 0.3s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardPlayButton: {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    backgroundColor: 'rgba(249, 115, 22, 0.9)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transform: 'scale(0.8)',
    transition: 'transform 0.3s',
  },
  cardRating: {
    position: 'absolute',
    top: '8px',
    right: '8px',
    padding: '3px 8px',
    backgroundColor: 'rgba(0,0,0,0.75)',
    backdropFilter: 'blur(4px)',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: '600',
    color: '#facc15',
  },
  cardTitle: {
    fontSize: '14px',
    fontWeight: '500',
    marginBottom: '6px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    color: '#fafafa',
  },
  cardGenre: {
    display: 'inline-block',
    padding: '3px 10px',
    fontSize: '11px',
    backgroundColor: 'rgba(255,255,255,0.08)',
    color: '#a1a1aa',
    borderRadius: '4px',
  },

  // Footer
  footer: {
    backgroundColor: 'rgba(20,20,20,0.6)',
    borderTop: '1px solid rgba(255,255,255,0.08)',
    marginTop: '40px',
  },
  footerContent: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '48px 16px',
  },
  footerGrid: {
    display: 'grid',
    gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
    gap: '32px',
  },
  footerTitle: {
    fontSize: '14px',
    fontWeight: '600',
    marginBottom: '16px',
    color: '#fafafa',
  },
  footerLink: {
    display: 'block',
    fontSize: '14px',
    color: '#71717a',
    textDecoration: 'none',
    marginBottom: '10px',
    transition: 'color 0.2s',
  },
  socialLinks: {
    display: 'flex',
    gap: '12px',
  },
  socialIcon: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    backgroundColor: 'rgba(255,255,255,0.08)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#71717a',
    textDecoration: 'none',
    fontSize: '14px',
  },
  appStoreButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '10px 16px',
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: '8px',
    marginBottom: '10px',
    textDecoration: 'none',
    color: 'inherit',
    transition: 'background-color 0.2s',
  },
  copyright: {
    marginTop: '40px',
    paddingTop: '24px',
    borderTop: '1px solid rgba(255,255,255,0.08)',
    textAlign: 'center',
    fontSize: '12px',
    color: '#52525b',
  },

  // Mobile Nav
  mobileNav: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 50,
    backgroundColor: 'rgba(10, 10, 10, 0.98)',
    backdropFilter: 'blur(12px)',
    borderTop: '1px solid rgba(255,255,255,0.08)',
  },
  mobileNavContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: '64px',
    maxWidth: '400px',
    margin: '0 auto',
  },
  mobileNavItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px',
    padding: '8px 16px',
    color: '#52525b',
    textDecoration: 'none',
    fontSize: '10px',
    fontWeight: '500',
    transition: 'color 0.2s',
  },
  mobileNavItemActive: {
    color: '#f97316',
  },
});

// Components
function Header({ isMobile }) {
  const styles = createStyles(isMobile);
  
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
            <button style={styles.iconButton}>
              <MenuIcon />
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

function HeroBanner({ drama, isMobile }) {
  const styles = createStyles(isMobile);
  
  return (
    <section style={styles.hero}>
      <div style={{...styles.heroBackground, backgroundImage: `url(${drama.poster})`}}>
        <div style={styles.heroGradient} />
      </div>
      <div style={styles.heroContent}>
        <div style={styles.heroInner}>
          <div style={styles.heroInfo}>
            <div style={styles.hotBadge}>
              <span style={styles.badge}>Hot</span>
            </div>
            <h1 style={styles.heroTitle}>{drama.title}</h1>
            <button style={styles.playButton}>
              <PlayIcon /> Play
            </button>
          </div>
        </div>
      </div>
      <div style={styles.slideIndicators}>
        <div style={{...styles.slideIndicator, ...styles.slideIndicatorActive}} />
        <div style={{...styles.slideIndicator, width: '8px'}} />
        <div style={{...styles.slideIndicator, width: '8px'}} />
        <div style={{...styles.slideIndicator, width: '8px'}} />
      </div>
    </section>
  );
}

function DramaCard({ drama, isMobile }) {
  const [isHovered, setIsHovered] = useState(false);
  const styles = createStyles(isMobile);
  
  return (
    <div 
      style={styles.card}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={styles.cardPoster}>
        <img 
          src={drama.poster} 
          alt={drama.title} 
          style={{
            ...styles.cardImage,
            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
          }} 
        />
        <div style={{
          ...styles.cardOverlay,
          opacity: isHovered ? 1 : 0,
        }}>
          <div style={{
            ...styles.cardPlayButton,
            transform: isHovered ? 'scale(1)' : 'scale(0.8)',
          }}>
            <PlayIcon />
          </div>
        </div>
        {drama.rating && (
          <div style={styles.cardRating}>★ {drama.rating}</div>
        )}
      </div>
      <h3 style={styles.cardTitle}>{drama.title}</h3>
      <span style={styles.cardGenre}>{drama.genre}</span>
    </div>
  );
}

function DramaCarousel({ title, dramas, isMobile }) {
  const scrollRef = useRef(null);
  const styles = createStyles(isMobile);

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
            <button 
              style={styles.carouselButton} 
              onClick={() => scroll('left')}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'}
            >
              <ChevronLeftIcon />
            </button>
            <button 
              style={styles.carouselButton} 
              onClick={() => scroll('right')}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'}
            >
              <ChevronRightIcon />
            </button>
          </div>
        </div>
        <div 
          ref={scrollRef} 
          style={{
            ...styles.carousel,
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {dramas.map((drama) => (
            <DramaCard key={drama.id} drama={drama} isMobile={isMobile} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer({ isMobile }) {
  const styles = createStyles(isMobile);
  
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
            <a href="#" style={styles.appStoreButton}>
              <span>🍎</span>
              <div>
                <div style={{fontSize: '10px', color: '#71717a'}}>Download on the</div>
                <div style={{fontWeight: '600', fontSize: '14px'}}>App Store</div>
              </div>
            </a>
            <a href="#" style={styles.appStoreButton}>
              <span>▶️</span>
              <div>
                <div style={{fontSize: '10px', color: '#71717a'}}>Get it on</div>
                <div style={{fontWeight: '600', fontSize: '14px'}}>Google Play</div>
              </div>
            </a>
          </div>
        </div>
        <div style={styles.copyright}>
          © 2026 ZenDrama. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

function MobileNav({ isMobile }) {
  if (!isMobile) return null;
  const styles = createStyles(isMobile);
  
  return (
    <nav style={styles.mobileNav}>
      <div style={styles.mobileNavContent}>
        <a href="/" style={{...styles.mobileNavItem, ...styles.mobileNavItemActive}}>
          <HomeIcon />
          <span>Home</span>
        </a>
        <a href="/genres" style={styles.mobileNavItem}>
          <GridIcon />
          <span>Genres</span>
        </a>
        <a href="/search" style={styles.mobileNavItem}>
          <SearchIcon />
          <span>Search</span>
        </a>
        <a href="/download" style={styles.mobileNavItem}>
          <DownloadIcon />
          <span>Download</span>
        </a>
        <a href="/about" style={styles.mobileNavItem}>
          <InfoIcon />
          <span>About</span>
        </a>
      </div>
    </nav>
  );
}

// Main App
export default function App() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const styles = createStyles(isMobile);

  return (
    <div style={styles.app}>
      <Header isMobile={isMobile} />
      
      <main>
        <HeroBanner drama={featuredDrama} isMobile={isMobile} />
        <DramaCarousel title="Trending Now" dramas={trendingDramas} isMobile={isMobile} />
        <DramaCarousel title="New Releases" dramas={newReleases} isMobile={isMobile} />
        <DramaCarousel title="Exclusive Originals" dramas={exclusiveOriginals} isMobile={isMobile} />
      </main>

      <Footer isMobile={isMobile} />
      <MobileNav isMobile={isMobile} />
      
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { background-color: #0a0a0a; }
        ::-webkit-scrollbar { width: 8px; height: 8px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #333; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: #444; }
        .carousel::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}
