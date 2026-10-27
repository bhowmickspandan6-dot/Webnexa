import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Product } from '../types';
import { buildWhatsAppPurchaseUrl } from '../utils/whatsapp';
import { formatPriceINR } from '../utils/currency';
import { Eye, MessageCircle } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  index?: number;
  onViewDetails: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  index = 0,
  onViewDetails,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const whatsAppUrl = buildWhatsAppPurchaseUrl(product);
  const shouldReduceMotion = useReducedMotion();
  const easeTransition = [0.22, 1, 0.36, 1] as const;

  // Staggered column delay: gives a natural left-to-right cadence per row (max 0.25s)
  const cardDelay = shouldReduceMotion ? 0 : Math.min((index % 4) * 0.07, 0.25);

  // Motion variants for container and internal element micro-stagger
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 20,
      scale: shouldReduceMotion ? 1 : 0.98,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: shouldReduceMotion ? 0.01 : 0.42,
        delay: cardDelay,
        ease: easeTransition,
        when: 'beforeChildren',
        staggerChildren: shouldReduceMotion ? 0 : 0.045,
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: shouldReduceMotion ? 1 : 0.97 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: shouldReduceMotion ? 0.01 : 0.38,
        ease: easeTransition,
      },
    },
  };

  const textGroupVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 8 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.01 : 0.32,
        ease: easeTransition,
      },
    },
  };

  const priceVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 6 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.01 : 0.3,
        ease: easeTransition,
      },
    },
  };

  const buttonsVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 6 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.01 : 0.3,
        ease: easeTransition,
      },
    },
  };

  return (
    <motion.article
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.12, margin: '80px 0px' }}
      whileHover={shouldReduceMotion ? {} : { y: -6 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="group flex flex-col bg-white rounded-2xl border border-neutral-200/90 hover:border-neutral-400/80 shadow-xs hover:shadow-xl transition-shadow duration-300 overflow-hidden text-left will-change-transform"
    >
      {/* 1. Preview Image (animates first) */}
      <motion.div
        variants={imageVariants}
        className="relative aspect-[16/10] bg-neutral-100 overflow-hidden cursor-pointer"
        onClick={() => onViewDetails(product)}
      >
        {imageError ? (
          <div className="w-full h-full bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900 text-white p-5 flex flex-col justify-between select-none relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-500">
            <div
              className="absolute inset-0 opacity-[0.08]"
              style={{
                backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
                backgroundSize: '14px 14px',
              }}
            />
            <div className="relative z-10 flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-white/10 text-neutral-300">
                {product.category}
              </span>
              <span className="text-[10px] font-semibold text-neutral-400">Webnexa</span>
            </div>
            <div className="relative z-10 my-auto py-2">
              <div className="text-sm sm:text-base font-bold text-white tracking-tight leading-snug">
                {product.name}
              </div>
              <div className="text-[11px] text-neutral-400 mt-1">
                Static HTML5 / CSS3 / Vanilla JS
              </div>
            </div>
            <div className="relative z-10 flex items-center justify-between pt-2 border-t border-white/10 text-[11px] text-neutral-400">
              <span>Ready to Deploy</span>
              <span className="font-semibold text-white">{formatPriceINR(product.price)}</span>
            </div>
          </div>
        ) : (
          <>
            <img
              src={product.image}
              alt={`${product.name} template preview`}
              referrerPolicy="no-referrer"
              onLoad={() => setImageLoaded(true)}
              onError={() => {
                setImageError(true);
                setImageLoaded(true);
              }}
              className={`w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04] ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              loading="lazy"
            />
            {!imageLoaded && (
              <div className="absolute inset-0 bg-neutral-100 animate-pulse" />
            )}
          </>
        )}
      </motion.div>

      {/* Content Area with internal staggered reveals */}
      <div className="flex flex-col flex-1 p-5 sm:p-6">
        {/* 2. Category & Title */}
        <motion.div variants={textGroupVariants}>
          <div className="text-xs sm:text-sm font-medium text-neutral-500 mb-1.5 transition-colors group-hover:text-neutral-700">
            {product.category}
          </div>

          <h3
            onClick={() => onViewDetails(product)}
            className="text-lg sm:text-xl font-bold text-neutral-950 hover:text-neutral-700 transition-colors cursor-pointer line-clamp-1"
            title={product.name}
          >
            {product.name}
          </h3>
        </motion.div>

        {/* 3. Short Description */}
        <motion.p
          variants={textGroupVariants}
          className="mt-2 text-xs sm:text-sm text-neutral-600 line-clamp-2 leading-relaxed flex-1"
        >
          {product.shortDescription}
        </motion.p>

        {/* 4. Price in INR */}
        <motion.div
          variants={priceVariants}
          className="mt-4 pt-4 border-t border-neutral-100"
        >
          <div className="text-xl sm:text-2xl font-extrabold text-neutral-950 tabular-nums">
            {formatPriceINR(product.price)}
          </div>
        </motion.div>

        {/* 5. Action Buttons (animate last) */}
        <motion.div
          variants={buttonsVariants}
          className="mt-4 grid grid-cols-2 gap-2.5"
        >
          <motion.button
            whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
            whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
            transition={{ duration: 0.15 }}
            onClick={() => onViewDetails(product)}
            className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 text-xs sm:text-sm font-semibold text-neutral-800 bg-neutral-100 hover:bg-neutral-200/90 active:scale-[0.98] rounded-xl transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900"
          >
            <Eye className="w-4 h-4 text-neutral-700" />
            <span>View Details</span>
          </motion.button>

          <motion.a
            whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
            whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
            transition={{ duration: 0.15 }}
            href={whatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 text-xs sm:text-sm font-semibold text-white bg-neutral-950 hover:bg-neutral-800 active:scale-[0.98] rounded-xl transition-colors cursor-pointer shadow-xs whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900"
            title={`Buy ${product.name} on WhatsApp`}
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Buy on WhatsApp</span>
          </motion.a>
        </motion.div>
      </div>
    </motion.article>
  );
};
