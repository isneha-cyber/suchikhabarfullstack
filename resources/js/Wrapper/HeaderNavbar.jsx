import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Link, usePage, router } from '@inertiajs/react';

// ─── CONSTANTS ────────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { name: 'मुख्य', route: '/category/मुख्य' },
  { name: 'समाचार', route: '/category/समाचार' },
  { name: 'अर्थतन्त्र', route: '/category/अर्थतन्त्र' },
  { name: 'अन्तर्राष्ट्रिय', route: '/category/अन्तर्राष्ट्रिय' },
  { name: 'खेलकुद', route: '/category/खेलकुद' },
  { name: 'मनोरञ्जन', route: '/category/मनोरञ्जन' },
  { name: 'कृषि', route: '/category/कृषि' },
  { name: 'स्वास्थ्य', route: '/category/स्वास्थ्य' },
  { name: 'धार्मिक', route: '/category/धार्मिक' },
  { name: 'विचार', route: '/category/विचार' }
];

// ─── DATE UTILITY FUNCTIONS ───────────────────────────────────────────────────
const getNepaliDate = () => {
  try {
    // This is a simplified version. In production, you might want to use
    // a proper Nepali date library like 'nepali-date-converter'
    const today = new Date();
    
    // Mock Nepali date conversion (you'll need to implement actual conversion)
    // For now, returning a formatted string with current date info
    const nepaliMonths = [
      'वैशाख', 'जेठ', 'असार', 'साउन', 'भदौ', 'असोज',
      'कार्तिक', 'मंसिर', 'पुष', 'माघ', 'फागुन', 'चैत्र'
    ];
    const nepaliWeekdays = [
      'आइतबार', 'सोमबार', 'मङ्गलबार', 'बुधबार',
      'बिहिबार', 'शुक्रबार', 'शनिबार'
    ];
    
    // Mock conversion (you'll need actual logic)
    const nepaliYear = today.getFullYear() + 56; // Approximate conversion
    const nepaliMonth = nepaliMonths[today.getMonth()];
    const nepaliDay = today.getDate().toString();
    const nepaliWeekday = nepaliWeekdays[today.getDay()];
    
    // Convert numbers to Nepali digits
    const toNepaliDigits = (num) => {
      const nepaliDigits = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
      return num.toString().split('').map(d => nepaliDigits[parseInt(d)] || d).join('');
    };
    
    return `${toNepaliDigits(today.getDate())} ${nepaliMonth} ${toNepaliDigits(nepaliYear)}, ${nepaliWeekday}`;
  } catch (error) {
    console.error('Error generating Nepali date:', error);
    return '०९ फागुन २०८२, आइतबार'; // Fallback date
  }
};

const getEnglishDate = () => {
  const today = new Date();
  return today.toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

// ─── SEARCH MODAL COMPONENT ───────────────────────────────────────────────────
const SearchModal = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState([]);
  const modalRef = useRef(null);
  const inputRef = useRef(null);
  const overlayRef = useRef(null);

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved).slice(0, 5));
    }
  }, []);

  // Animation effect when modal opens/closes
  useEffect(() => {
    if (!modalRef.current || !overlayRef.current) return;

    if (isOpen) {
      // Focus input when modal opens
      setTimeout(() => inputRef.current?.focus(), 100);

      gsap.to(overlayRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out',
        pointerEvents: 'auto'
      });
      gsap.fromTo(modalRef.current,
        { y: -50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: 'power3.out' }
      );
    } else {
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.2,
        ease: 'power2.in',
        pointerEvents: 'none'
      });
      gsap.to(modalRef.current, {
        y: -50,
        opacity: 0,
        duration: 0.2,
        ease: 'power2.in'
      });
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    // Save to recent searches
    const updatedSearches = [
      searchQuery,
      ...recentSearches.filter(s => s !== searchQuery)
    ].slice(0, 5);
    
    setRecentSearches(updatedSearches);
    localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));

    // Navigate to search results
    router.visit(`/search?q=${encodeURIComponent(searchQuery)}`);
    onClose();
  };

  const handleRecentClick = (query) => {
    setSearchQuery(query);
    router.visit(`/search?q=${encodeURIComponent(query)}`);
    onClose();
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        ref={overlayRef}
        onClick={onClose}
        className="fixed inset-0 bg-black/60 z-[60]"
        style={{ opacity: 0, pointerEvents: 'none' }}
      />
      
      <div
        ref={modalRef}
        className="fixed left-1/2 top-1/4 -translate-x-1/2 w-full max-w-lg z-[70] bg-white rounded-lg shadow-2xl"
        style={{ opacity: 0 }}
      >
        <div className="p-5">
          <form onSubmit={handleSearch} className="flex items-center gap-3">
            <SearchIcon size={20} />
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="खोज्नुहोस्..."
              className="flex-1 text-base outline-none border-none bg-transparent text-[#1c1711] placeholder:text-[#a09488]"
            />
            <button
              type="button"
              onClick={onClose}
              className="text-[#a09488] hover:text-[#1c1711] transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </form>
        </div>

        {/* Recent Searches */}
        {recentSearches.length > 0 && (
          <div className="border-t border-[rgba(28,23,17,0.08)] p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-[#a09488] uppercase tracking-wider">
                भर्खरको खोजी
              </span>
              <button
                onClick={clearRecentSearches}
                className="text-xs text-[#a09488] hover:text-[#8B0000] transition-colors"
              >
                सबै हटाउनुहोस्
              </button>
            </div>
            <div className="space-y-2">
              {recentSearches.map((query, index) => (
                <button
                  key={index}
                  onClick={() => handleRecentClick(query)}
                  className="flex items-center gap-2 w-full text-left text-sm text-[#1c1711] hover:text-[#8B0000] transition-colors group"
                >
                  <span className="text-[#a09488] text-xs">⌘</span>
                  <span>{query}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Search Tips */}
        <div className="border-t border-[rgba(28,23,17,0.08)] bg-[#faf9f8] p-4 rounded-b-lg">
          <div className="flex items-center gap-4 text-xs text-[#a09488]">
            <span className="flex items-center gap-1">
              <span className="px-1.5 py-0.5 bg-white rounded border border-[rgba(28,23,17,0.1)] text-[10px]">↵</span>
              खोजी गर्नुहोस्
            </span>
            <span className="flex items-center gap-1">
              <span className="px-1.5 py-0.5 bg-white rounded border border-[rgba(28,23,17,0.1)] text-[10px]">esc</span>
              बन्द गर्नुहोस्
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

// ─── LOGO COMPONENT ────────────────────────────────────────────────────────────
const Logo = ({ className = 'h-9 sm:h-10' }) => {
  const [imgError, setImgError] = useState(false);
  return (
    <Link href="/" className="flex items-center gap-2 no-underline flex-shrink-0">
      {!imgError ? (
        <img
          src="/images/logo.png"
          alt="Shuchikhabar"
          className={`${className} w-auto object-contain`}
          onError={() => setImgError(true)}
        />
      ) : (
        <span className="flex flex-col leading-none">
          <span className="font-['Playfair_Display'] text-[1.6rem] font-bold text-[#1c1711] tracking-tight leading-none">
            शुचि<span className="text-[#8B0000]">खबर</span>
            <span className="inline-block w-1.5 h-1.5 bg-[#c9a84c] rounded-full ml-0.5 align-middle -translate-y-0.5" />
          </span>
          <span className="text-[0.48rem] tracking-[0.18em] text-[#a09488] uppercase mt-0.5">Best Newsportal in Nepal</span>
        </span>
      )}
    </Link>
  );
};

// ─── SEARCH ICON ───────────────────────────────────────────────────────────────
const SearchIcon = ({ size = 13, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

// ─── HAMBURGER ─────────────────────────────────────────────────────────────────
const HamburgerIcon = ({ open }) => (
  <div className="flex flex-col justify-center items-center w-5 h-5 gap-[5px]">
    <span
      className="block h-[1.5px] bg-[#1c1711] transition-all duration-300 ease-in-out origin-center"
      style={{
        width: '18px',
        transform: open ? 'translateY(6.5px) rotate(45deg)' : 'none',
      }}
    />
    <span
      className="block h-[1.5px] bg-[#1c1711] transition-all duration-300 ease-in-out"
      style={{
        width: '14px',
        opacity: open ? 0 : 1,
        transform: open ? 'scaleX(0)' : 'scaleX(1)',
      }}
    />
    <span
      className="block h-[1.5px] bg-[#1c1711] transition-all duration-300 ease-in-out origin-center"
      style={{
        width: '18px',
        transform: open ? 'translateY(-6.5px) rotate(-45deg)' : 'none',
      }}
    />
  </div>
);

// ─── MOBILE DRAWER ─────────────────────────────────────────────────────────────
const MobileDrawer = ({ open, activeNav, setActiveNav, onClose }) => {
  const drawerRef = useRef(null);
  const overlayRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    if (!drawerRef.current) return;

    if (open) {
      gsap.to(overlayRef.current, { opacity: 1, duration: 0.25, ease: 'power2.out', pointerEvents: 'auto' });
      gsap.fromTo(drawerRef.current,
        { x: '-100%', opacity: 0.6 },
        { x: '0%', opacity: 1, duration: 0.35, ease: 'power3.out' }
      );
      gsap.fromTo(itemsRef.current,
        { x: -20, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.3, stagger: 0.045, delay: 0.15, ease: 'power2.out' }
      );
    } else {
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.2, ease: 'power2.in', pointerEvents: 'none' });
      gsap.to(drawerRef.current, { x: '-100%', opacity: 0.6, duration: 0.25, ease: 'power2.in' });
    }
  }, [open]);

  const handleNavClick = (index) => {
    setActiveNav(index);
    onClose();
  };

  return (
    <>
      <div
        ref={overlayRef}
        onClick={onClose}
        className="fixed inset-0 bg-black/40 z-40"
        style={{ opacity: 0, pointerEvents: 'none' }}
      />
      <div
        ref={drawerRef}
        className="fixed top-0 left-0 h-full z-50 bg-white shadow-2xl flex flex-col"
        style={{ width: '72vw', maxWidth: '300px', transform: 'translateX(-100%)' }}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-[rgba(28,23,17,0.1)]">
          <Logo className="h-8" />
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center text-[#1c1711] bg-transparent border-none cursor-pointer">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="flex flex-col py-3 overflow-y-auto flex-1">
          {NAV_ITEMS.map((item, i) => (
            <Link
              key={i}
              href={item.route}
              ref={el => itemsRef.current[i] = el}
              onClick={() => handleNavClick(i)}
              className={`text-left px-6 py-3 text-[0.85rem] font-medium tracking-wide transition-colors border-none bg-transparent cursor-pointer relative ${
                activeNav === i
                  ? 'text-[#8B0000] bg-[rgba(139,0,0,0.04)]'
                  : 'text-[#1c1711] hover:text-[#8B0000] hover:bg-[rgba(139,0,0,0.03)]'
              }`}
            >
              {activeNav === i && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-[#8B0000] rounded-r" />
              )}
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="px-6 py-4 border-t border-[rgba(28,23,17,0.08)]">
          <span className="text-[0.6rem] tracking-[0.12em] text-[#a09488] uppercase">
            {getNepaliDate()}
          </span>
          <br />
          <span className="text-[0.6rem] text-[#c0b8b0]">{getEnglishDate()}</span>
        </div>
      </div>
    </>
  );
};

// ─── MAIN COMPONENT ────────────────────────────────────────────────────────────
const HeaderNavbar = () => {
  const { url } = usePage();
  const [activeNav, setActiveNav] = useState(-1);
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  const headerRef = useRef(null);
  const stickyNavRef = useRef(null);
  const prevScrollY = useRef(0);

  // ── Determine active nav based on current route ────────────────────────────
  useEffect(() => {
    const currentPath = url.split('?')[0];
    const activeIndex = NAV_ITEMS.findIndex(item => currentPath === item.route);
    setActiveNav(activeIndex !== -1 ? activeIndex : -1);
  }, [url]);

  // ── Scroll logic ──────────────────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 64);
      prevScrollY.current = currentY;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ── GSAP: animate header out / in ─────────────────────────────────────────
  useEffect(() => {
    if (!headerRef.current) return;
    if (scrolled) {
      gsap.to(headerRef.current, {
        y: -80,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
      });
    } else {
      gsap.to(headerRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.35,
        ease: 'power2.out',
      });
    }
  }, [scrolled]);

  // ── GSAP: animate sticky nav appearing ────────────────────────────────────
  useEffect(() => {
    if (!stickyNavRef.current) return;
    if (scrolled) {
      gsap.fromTo(stickyNavRef.current,
        { y: -10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.3, ease: 'power2.out' }
      );
    }
  }, [scrolled]);

  // Keyboard shortcut for search (Cmd+K or Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchModalOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const nepaliDate = getNepaliDate();
  const englishDate = getEnglishDate();

  return (
    <>
      {/* ── HEADER (visible only at top) ──────────────────────────────────── */}
      <header
        ref={headerRef}
        className="sticky top-0 z-50 bg-white border-b border-[rgba(28,23,17,0.1)] shadow-sm hidden md:block"
        style={{ willChange: 'transform, opacity' }}
      >
        <div className="flex items-center justify-between px-4 sm:px-6 lg:px-12 h-[60px] sm:h-[68px]">
          <Logo />
          <div className="flex flex-col items-end gap-0.5">
            <span className="text-[0.66rem] text-[#a09488] tracking-wide hidden md:block leading-none">
              {nepaliDate} &nbsp;|&nbsp; {englishDate}
            </span>
            <div className="flex gap-2 items-center mt-0.5">
              <button
                onClick={() => setSearchModalOpen(true)}
                className="w-8 h-8 border border-[rgba(28,23,17,0.12)] hover:border-[#1c1711] transition-colors flex items-center justify-center bg-transparent cursor-pointer flex-shrink-0"
                aria-label="Search"
              >
                <SearchIcon />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── NAVBAR ────────────────────────────────────────────────────────── */}
      <nav
        ref={stickyNavRef}
        className={`
          z-40 bg-white border-b border-[rgba(28,23,17,0.1)]
          ${scrolled
            ? 'fixed top-0 left-0 right-0 shadow-md'
            : 'sticky top-[60px] sm:top-[68px] md:top-0 md:relative border-t border-[rgba(28,23,17,0.08)]'}
          ${!scrolled ? 'md:shadow-none' : ''}
        `}
        style={{ willChange: 'transform, opacity' }}
      >
        {/* ── DESKTOP NAV ─────────────────────────────────────────── */}
        <div className="hidden md:flex items-center justify-between px-6 lg:px-12 h-[54px]">
          {/* Left: Logo (only when scrolled) */}
          {scrolled && (
            <div className="mr-4 flex-shrink-0">
              <Logo className="h-10" />
            </div>
          )}

          {/* Center/Right: Nav items and search */}
          <div className={`flex items-center gap-5 ${scrolled ? 'flex-1 justify-end' : 'w-full justify-center'}`}>
            <div className="flex items-center overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
              {NAV_ITEMS.map((item, i) => (
                <Link
                  key={i}
                  href={item.route}
                  className={`px-3 lg:px-4 py-2.5 text-[0.7rem] lg:text-[0.85rem] font-medium tracking-wide whitespace-nowrap relative transition-colors border-none bg-transparent cursor-pointer flex-shrink-0 ${
                    activeNav === i ? 'text-[#8B0000]' : 'text-[#1c1711] hover:text-[#8B0000]'
                  }`}
                >
                  {item.name}
                  {activeNav === i && activeNav !== -1 && (
                    <span className="absolute bottom-0 left-3 lg:left-4 right-3 lg:right-4 h-[2px] bg-[#8B0000]" />
                  )}
                </Link>
              ))}
            </div>
            {scrolled && (
              <button
                onClick={() => setSearchModalOpen(true)}
                className="w-8 h-8 border border-[rgba(28,23,17,0.12)] hover:border-[#1c1711] transition-colors flex items-center justify-center bg-transparent cursor-pointer flex-shrink-0 ml-4"
                aria-label="Search"
              >
                <SearchIcon />
              </button>
            )}
          </div>
        </div>

        {/* ── MOBILE NAV ──────────────────────────────────────────── */}
        <div className="flex md:hidden items-center justify-between px-4 h-[52px] sm:mb-0 mb-4">
          {/* Left: Logo */}
          <Logo className="h-8" />
          
          {/* Right: Search + Hamburger */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSearchModalOpen(true)}
              className="w-8 h-8 flex items-center justify-center bg-transparent border-none cursor-pointer text-[#1c1711]"
              aria-label="Search"
            >
              <SearchIcon size={15} />
            </button>
            
            {/* Only show hamburger button when drawer is closed */}
            {!drawerOpen && (
              <button
                className="w-8 h-8 flex items-center justify-center bg-transparent border-none cursor-pointer"
                onClick={() => setDrawerOpen(prev => !prev)}
                aria-label="Toggle menu"
              >
                <HamburgerIcon open={drawerOpen} />
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* ── MOBILE DRAWER ─────────────────────────────────────────────────── */}
      <MobileDrawer
        open={drawerOpen}
        activeNav={activeNav}
        setActiveNav={setActiveNav}
        onClose={() => setDrawerOpen(false)}
      />

      {/* ── SEARCH MODAL ──────────────────────────────────────────────────── */}
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
      />
    </>
  );
};

export default HeaderNavbar;