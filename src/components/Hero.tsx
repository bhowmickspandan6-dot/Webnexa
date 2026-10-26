import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, ShoppingBag } from 'lucide-react';
import heroImage from '../assets/images/preview_hotel_website_1792855398655.jpg';

interface HeroProps {
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick }) => {
  const [heroImageLoaded, setHeroImageLoaded] = useState(false);
  const [heroImageError, setHeroImageError] = useState(false);

  return (
    <section className="relative pt-10 pb-16 md:pt-16 md:pb-22 border-b border-neutral-100 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Heading, Subtext, CTA, and 3-Feature Trust Row */}
          <div className="lg:col-span-6 space-y-6 text-left">
            {/* Pill Badge matching reference */}
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-100/90 border border-neutral-200/80 text-[11px] sm:text-xs font-bold text-neutral-800 tracking-wider uppercase"
            >
              <span>PREMIUM WEBSITE TEMPLATES</span>
            </motion.div>

            {/* Main Headline (refined fade-and-rise) */}
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl sm:text-5xl lg:text-[54px] xl:text-[58px] font-extrabold tracking-tight text-neutral-950 leading-[1.08] text-balance"
            >
              Websites Built for Your Next Big Idea.
            </motion.h1>

            {/* Subtitle Description */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="text-base sm:text-lg text-neutral-600 max-w-lg leading-relaxed text-pretty"
            >
              Discover beautifully crafted website templates for modern businesses and creators.
            </motion.p>

            {/* Primary CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="pt-2"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onExploreClick}
                className="inline-flex items-center justify-center gap-2 px-7 py-4 text-sm sm:text-base font-semibold text-white bg-neutral-950 hover:bg-neutral-800 active:scale-[0.98] rounded-xl transition-all shadow-md cursor-pointer group"
              >
                <span>Explore Collection</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </motion.button>
            </motion.div>

            {/* 3 Trust Features with staggered entrance */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.38, ease: [0.22, 1, 0.36, 1] }}
              className="pt-6 border-t border-neutral-100 grid grid-cols-1 sm:grid-cols-3 gap-5"
            >
              {/* Feature 1 */}
              <div className="flex items-start gap-2.5">
                <div className="p-1.5 rounded-lg text-neutral-950 shrink-0 mt-0.5">
                  <Sparkles className="w-5 h-5 text-neutral-900" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-neutral-950">Modern Designs</div>
                  <div className="text-[11px] sm:text-xs text-neutral-500 mt-0.5">Beautiful &amp; professional</div>
                </div>
              </div>

              {/* Feature 2: Premium Templates */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.44, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-start gap-2.5"
              >
                <div className="p-1.5 rounded-lg text-neutral-950 shrink-0 mt-0.5">
                  <Sparkles className="w-5 h-5 text-neutral-900" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-neutral-950">Premium Templates</div>
                  <div className="text-[11px] sm:text-xs text-neutral-500 mt-0.5">Stunning designs for every business</div>
                </div>
              </motion.div>

              {/* Feature 3: New Arrivals */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-start gap-2.5"
              >
                <div className="p-1.5 rounded-lg text-neutral-950 shrink-0 mt-0.5">
                  <ShoppingBag className="w-5 h-5 text-neutral-900" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-neutral-950">New Arrivals</div>
                  <div className="text-[11px] sm:text-xs text-neutral-500 mt-0.5">Discover our latest designs</div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Column: Genuine Laptop & Mobile Preview Composition with smooth fade-up & hover zoom */}
          <div className="lg:col-span-6 relative w-full flex items-center justify-center pt-4 lg:pt-0">
            <motion.div
              initial={{ opacity: 0, y: 22, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-xl group"
            >
              {/* Laptop Frame */}
              <div className="relative rounded-2xl bg-neutral-900 p-2 sm:p-2.5 shadow-2xl border border-neutral-800 transition-all duration-500 group-hover:shadow-3xl">
                {/* Laptop Camera notch */}
                <div className="w-2 h-2 rounded-full bg-neutral-700 mx-auto mb-1.5" />

                {/* Laptop Screen Content */}
                <div className="relative aspect-[16/10] bg-neutral-950 rounded-lg overflow-hidden border border-neutral-800">
                  {heroImageError ? (
                    <div className="w-full h-full bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900 text-white p-6 flex flex-col justify-between">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">Featured Showcase</span>
                        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-white/10 text-white">Live Ready</span>
                      </div>
                      <div className="my-auto py-4">
                        <div className="text-2xl font-extrabold text-white tracking-tight">Luxury Resort &amp; Hotel</div>
                        <div className="text-sm text-neutral-400 mt-1">Multi-page static responsive template</div>
                      </div>
                      <div className="flex items-center justify-between text-xs text-neutral-400 border-t border-white/10 pt-3">
                        <span>Webnexa Catalog</span>
                        <span className="text-white font-medium">100% Static HTML/CSS/JS</span>
                      </div>
                    </div>
                  ) : (
                    <>
                      <img
                        src={heroImage}
                        alt="Featured Luxury Template Preview"
                        referrerPolicy="no-referrer"
                        onLoad={() => setHeroImageLoaded(true)}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          if (target.src !== window.location.origin + '/images/hotel-resort.jpg') {
                            target.src = '/images/hotel-resort.jpg';
                          } else {
                            setHeroImageError(true);
                            setHeroImageLoaded(true);
                          }
                        }}
                        className={`w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03] ${
                          heroImageLoaded ? 'opacity-100' : 'opacity-0'
                        }`}
                      />
                      {!heroImageLoaded && (
                        <div className="absolute inset-0 bg-neutral-900 animate-pulse" />
                      )}
                    </>
                  )}
                  {/* Subtle glass reflection */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
                </div>

                {/* Laptop Base Stand */}
                <div className="h-3 sm:h-3.5 bg-neutral-300 rounded-b-xl mx-auto -mb-2 shadow-md flex items-center justify-center">
                  <div className="w-12 h-1 bg-neutral-400 rounded-full" />
                </div>
              </div>

              {/* Overlapping Mobile Smartphone Mockup on Right */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="absolute -bottom-6 -right-3 sm:-right-6 w-36 sm:w-44 md:w-48 rounded-[28px] sm:rounded-[32px] bg-neutral-950 p-1.5 sm:p-2 shadow-2xl border-2 sm:border-3 border-neutral-700/80 z-20 group-hover:-translate-y-1 transition-transform duration-500"
              >
                {/* Phone Speaker & Dynamic Island */}
                <div className="w-10 sm:w-12 h-2 rounded-full bg-neutral-800 mx-auto mb-1.5" />

                {/* Mobile Screen Display */}
                <div className="relative aspect-[9/16] rounded-[22px] sm:rounded-[24px] overflow-hidden bg-neutral-900 border border-neutral-800">
                  <img
                    src={heroImage}
                    alt="Mobile responsive preview"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      if (target.src !== window.location.origin + '/images/hotel-resort.jpg') {
                        target.src = '/images/hotel-resort.jpg';
                      }
                    }}
                    className="w-full h-full object-cover object-center"
                  />
                  {/* Bottom bar indicator */}
                  <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-10 h-0.5 bg-white/70 rounded-full" />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
