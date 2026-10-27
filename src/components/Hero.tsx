import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, ShoppingBag } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState('/assets/aistudio/file_00000000764081fa9fd67cb4e81883ca_1857b10b.png');

  return (
    <section className="relative overflow-hidden bg-neutral-950">
      {/* Upper Photographic Hero Canvas with Clean Text-Free Workspace */}
      <div className="relative min-h-[520px] sm:min-h-[580px] lg:min-h-[640px] flex items-center justify-start overflow-hidden">
        {/* Background Clean Workspace Image Layer (Text-free) */}
        <div className="absolute inset-0 z-0">
          <img
            src={imageSrc}
            alt="Webnexa modern workspace with laptop template showcase"
            onLoad={() => setImageLoaded(true)}
            onError={() => {
              if (imageSrc !== '/images/hero-workspace.png') {
                setImageSrc('/images/hero-workspace.png');
              }
            }}
            className={`w-full h-full object-cover object-[70%_center] sm:object-[65%_center] md:object-[75%_center] lg:object-[60%_center] transition-opacity duration-700 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </div>

        {/* Subtle Dark Overlay for crisp text legibility while revealing the rich workspace ambiance */}
        <div className="absolute inset-0 z-1 bg-gradient-to-r from-neutral-950/85 via-neutral-950/60 to-neutral-950/20 sm:from-neutral-950/80 sm:via-neutral-950/50 sm:to-transparent pointer-events-none" />
        <div className="absolute inset-0 z-1 bg-neutral-950/30 pointer-events-none" />

        {/* Hero Content Container: Exactly one badge, heading, description, and CTA button */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <div className="max-w-xl lg:max-w-2xl space-y-6 text-left">
            {/* Pill Badge */}
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-900/80 border border-white/20 text-[11px] sm:text-xs font-bold text-white tracking-widest uppercase backdrop-blur-md shadow-xs">
                PREMIUM WEBSITE TEMPLATES
              </span>
            </motion.div>

            {/* Exactly One Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl sm:text-5xl lg:text-[54px] xl:text-[60px] font-extrabold tracking-tight text-white leading-[1.08] text-balance drop-shadow-md"
            >
              Websites Built for Your Next Big Idea.
            </motion.h1>

            {/* Exactly One Subtitle Description */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="text-base sm:text-lg text-neutral-200 max-w-lg leading-relaxed text-pretty drop-shadow-sm font-normal"
            >
              Discover beautifully crafted website templates for modern businesses and creators.
            </motion.p>

            {/* Exactly One Primary CTA Button */}
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
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 sm:py-4 text-sm sm:text-base font-semibold text-white bg-black hover:bg-neutral-900 active:scale-[0.98] rounded-xl border border-neutral-700/80 transition-all shadow-xl cursor-pointer group"
              >
                <span>Explore Collection</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Trust Feature Strip below the photo, matching the reference screenshot */}
      <div className="relative z-10 bg-white border-b border-neutral-200/80 py-7 sm:py-9">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Feature 1: Modern Designs */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-start gap-3.5"
            >
              <div className="p-2 rounded-xl bg-neutral-100/80 text-neutral-950 shrink-0 border border-neutral-200/60 mt-0.5">
                <Sparkles className="w-5 h-5 text-neutral-900" />
              </div>
              <div>
                <div className="text-sm sm:text-base font-bold text-neutral-950 tracking-tight">
                  Modern Designs
                </div>
                <div className="text-xs sm:text-sm text-neutral-500 mt-0.5 font-normal">
                  Beautiful &amp; professional
                </div>
              </div>
            </motion.div>

            {/* Feature 2: Premium Templates */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-start gap-3.5"
            >
              <div className="p-2 rounded-xl bg-neutral-100/80 text-neutral-950 shrink-0 border border-neutral-200/60 mt-0.5">
                <Sparkles className="w-5 h-5 text-neutral-900" />
              </div>
              <div>
                <div className="text-sm sm:text-base font-bold text-neutral-950 tracking-tight">
                  Premium Templates
                </div>
                <div className="text-xs sm:text-sm text-neutral-500 mt-0.5 font-normal">
                  Stunning designs for every business
                </div>
              </div>
            </motion.div>

            {/* Feature 3: New Arrivals */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.49, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-start gap-3.5"
            >
              <div className="p-2 rounded-xl bg-neutral-100/80 text-neutral-950 shrink-0 border border-neutral-200/60 mt-0.5">
                <ShoppingBag className="w-5 h-5 text-neutral-900" />
              </div>
              <div>
                <div className="text-sm sm:text-base font-bold text-neutral-950 tracking-tight">
                  New Arrivals
                </div>
                <div className="text-xs sm:text-sm text-neutral-500 mt-0.5 font-normal">
                  Fresh templates added regularly
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
