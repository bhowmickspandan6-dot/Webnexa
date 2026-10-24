import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ShoppingCart, ArrowRight, LayoutGrid, Sparkles, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onNavigate: (sectionId: string) => void;
  activeSection?: string;
  savedCount?: number;
  onOpenSaved?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  onSearchChange,
  onNavigate,
  activeSection = 'home',
  savedCount = 0,
  onOpenSaved,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Lock background scroll when the menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  // Handle Escape key to close menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && menuOpen) {
        setMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen]);

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMenuOpen(false);
  };

  const navMenuItems = [
    { id: 'home', label: 'Home', desc: 'Featured collections and highlights' },
    { id: 'explore', label: 'Explore Templates', desc: 'Browse all static website templates' },
    { id: 'categories', label: 'Categories', desc: 'Filter by industry and business type' },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200/80 transition-colors"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 md:gap-8 h-20">
            {/* Left: Brand Logo & Wordmark + Nav Links */}
            <div className="flex items-center gap-8 shrink-0">
              {/* Logo with gentle reveal & hover scale */}
              <motion.button
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => handleLinkClick('home')}
                className="flex items-center gap-3 text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 rounded-lg cursor-pointer"
                aria-label="Webnexa Home"
              >
                <div className="w-9 h-9 rounded-xl bg-neutral-950 flex items-center justify-center text-white font-extrabold text-base tracking-tight shadow-xs transition-transform duration-300 group-hover:scale-105 group-active:scale-95">
                  W
                </div>
                <span className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-950 transition-colors group-hover:text-neutral-800">
                  Webnexa
                </span>
              </motion.button>

              {/* Desktop Navigation Links with animated active indicator */}
              <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-neutral-700">
                <button
                  onClick={() => handleLinkClick('home')}
                  className={`relative py-2 transition-colors duration-200 cursor-pointer hover:text-neutral-950 ${
                    activeSection === 'home' ? 'text-neutral-950 font-bold' : ''
                  }`}
                >
                  <span>Home</span>
                  {activeSection === 'home' && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-neutral-950 rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
                <button
                  onClick={() => handleLinkClick('explore')}
                  className={`relative py-2 transition-colors duration-200 cursor-pointer hover:text-neutral-950 ${
                    activeSection === 'explore' ? 'text-neutral-950 font-bold' : ''
                  }`}
                >
                  <span>Explore</span>
                  {activeSection === 'explore' && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-neutral-950 rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
                <button
                  onClick={() => handleLinkClick('categories')}
                  className={`relative py-2 transition-colors duration-200 cursor-pointer hover:text-neutral-950 ${
                    activeSection === 'categories' ? 'text-neutral-950 font-bold' : ''
                  }`}
                >
                  <span>Categories</span>
                  {activeSection === 'categories' && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-neutral-950 rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              </nav>
            </div>

            {/* Center-Right: Search Field with smooth focus & shadow animation */}
            <div className="hidden sm:flex items-center flex-1 max-w-md mx-2">
              <div className="relative w-full group">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 group-focus-within:text-neutral-950 transition-colors pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder="Search websites, templates, designs..."
                  className="w-full pl-10 pr-9 py-2 text-xs sm:text-sm bg-neutral-100/80 hover:bg-neutral-100 focus:bg-white text-neutral-900 placeholder:text-neutral-500 rounded-xl border border-transparent focus:border-neutral-300 focus:ring-2 focus:ring-neutral-950/5 focus:outline-none transition-all duration-200 shadow-2xs focus:shadow-sm"
                />
                {searchQuery && (
                  <button
                    onClick={() => onSearchChange('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 cursor-pointer p-0.5 rounded transition-colors"
                    aria-label="Clear search"
                  >
                    <span className="text-xs font-bold leading-none">&times;</span>
                  </button>
                )}
              </div>
            </div>

            {/* Right Action Icons: Shopping Cart & Animated Three-Line Hamburger */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              {/* Cart Button with gentle bounce/scale on click */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.15 }}
                onClick={() => onOpenSaved ? onOpenSaved() : handleLinkClick('explore')}
                className="relative p-2.5 text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100 rounded-xl transition-colors cursor-pointer"
                aria-label="View collection"
                title="View Collection"
              >
                <ShoppingCart className="w-5 h-5" />
                {savedCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-neutral-950 text-white text-[10px] font-bold flex items-center justify-center shadow-xs"
                  >
                    {savedCount}
                  </motion.span>
                )}
              </motion.button>

              {/* Top-Right Three-Line Menu Button with smooth Morph-to-X Animation */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="relative w-11 h-11 flex flex-col items-center justify-center rounded-xl text-neutral-800 hover:text-neutral-950 hover:bg-neutral-100/90 active:scale-95 transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950"
                aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={menuOpen}
              >
                <span className="sr-only">Toggle Menu</span>
                <div className="w-5 h-4 relative flex flex-col justify-between">
                  {/* Top Line: Rotates to form top half of X */}
                  <span
                    className={`w-5 h-0.5 bg-neutral-900 rounded-full transition-all duration-300 origin-center ${
                      menuOpen ? 'translate-y-[7px] rotate-45 bg-neutral-950' : ''
                    }`}
                  />
                  {/* Middle Line: Fades out and shrinks */}
                  <span
                    className={`w-5 h-0.5 bg-neutral-900 rounded-full transition-all duration-200 ${
                      menuOpen ? 'opacity-0 scale-x-0' : 'opacity-100'
                    }`}
                  />
                  {/* Bottom Line: Rotates to form bottom half of X */}
                  <span
                    className={`w-5 h-0.5 bg-neutral-900 rounded-full transition-all duration-300 origin-center ${
                      menuOpen ? '-translate-y-[7px] -rotate-45 bg-neutral-950' : ''
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>

          {/* Mobile Search Row (visible only on tiny viewports) */}
          <div className="sm:hidden pb-3">
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search websites, templates..."
                className="w-full pl-10 pr-8 py-2 text-sm bg-neutral-100/90 text-neutral-900 placeholder:text-neutral-500 rounded-xl border border-transparent focus:border-neutral-300 focus:bg-white focus:outline-none transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 text-xs font-bold"
                  aria-label="Clear search"
                >
                  &times;
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.header>

      {/* Top-Right Menu Overlay & Animated Drawer Panel */}
      <AnimatePresence>
        {menuOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            {/* Dimmed Backdrop with smooth fade */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => setMenuOpen(false)}
              className="absolute inset-0 bg-neutral-950/40 backdrop-blur-xs"
            />

            {/* Slide-in Menu Panel */}
            <motion.div
              initial={{ x: '100%', opacity: 0.8 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="absolute top-0 right-0 w-full max-w-md h-full bg-white shadow-2xl flex flex-col z-10 border-l border-neutral-100 overflow-y-auto"
            >
              {/* Drawer Top Header */}
              <div className="p-6 border-b border-neutral-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-neutral-950 flex items-center justify-center text-white font-extrabold text-sm shadow-xs">
                    W
                  </div>
                  <span className="text-lg font-bold text-neutral-950">Webnexa Navigation</span>
                </div>

                {/* Close Button that mirrors hamburger close */}
                <button
                  onClick={() => setMenuOpen(false)}
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-neutral-500 hover:text-neutral-950 hover:bg-neutral-100 transition-colors cursor-pointer"
                  aria-label="Close navigation menu"
                >
                  <div className="w-5 h-5 relative flex items-center justify-center">
                    <span className="w-5 h-0.5 bg-neutral-900 rounded-full rotate-45 absolute" />
                    <span className="w-5 h-0.5 bg-neutral-900 rounded-full -rotate-45 absolute" />
                  </div>
                </button>
              </div>

              {/* Staggered Navigation Items */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <nav className="space-y-3">
                  <div className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-2">
                    Menu
                  </div>
                  {navMenuItems.map((item, index) => (
                    <motion.button
                      key={item.id}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.3,
                        delay: 0.08 + index * 0.06,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      onClick={() => handleLinkClick(item.id)}
                      className="w-full p-4 text-left rounded-xl hover:bg-neutral-50 border border-transparent hover:border-neutral-200/80 transition-all duration-200 group cursor-pointer flex items-center justify-between"
                    >
                      <div>
                        <div className="text-base font-bold text-neutral-900 group-hover:text-neutral-950">
                          {item.label}
                        </div>
                        <div className="text-xs text-neutral-500 mt-0.5">
                          {item.desc}
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-neutral-950 group-hover:translate-x-1 transition-all" />
                    </motion.button>
                  ))}
                </nav>

                {/* Bottom Drawer Feature Card */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-8 pt-6 border-t border-neutral-100 space-y-4"
                >
                  <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200/80 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-neutral-900">
                      <Sparkles className="w-4 h-4 text-neutral-900" />
                      <span>Ready-to-Deploy Templates</span>
                    </div>
                    <p className="text-xs text-neutral-600 leading-relaxed">
                      Clean static website templates built for speed and responsive modern design.
                    </p>
                  </div>

                  <div className="text-[11px] text-neutral-400 text-center">
                    &copy; {new Date().getFullYear()} Webnexa. Fast, clean digital design.
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
