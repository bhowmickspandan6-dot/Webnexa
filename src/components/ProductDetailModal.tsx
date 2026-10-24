import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Product } from '../types';
import { buildWhatsAppPurchaseUrl } from '../utils/whatsapp';
import { formatPriceUSD } from '../utils/currency';
import { X, MessageCircle, Check } from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
}) => {
  const [modalImageLoaded, setModalImageLoaded] = useState(false);
  const [modalImageError, setModalImageError] = useState(false);

  // Reset image state when product changes
  useEffect(() => {
    setModalImageLoaded(false);
    setModalImageError(false);
  }, [product?.id]);

  // Lock background scroll when modal is open
  useEffect(() => {
    if (!product) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [product, onClose]);

  if (!product) return null;

  const whatsAppUrl = buildWhatsAppPurchaseUrl(product);

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-product-title"
    >
      {/* Dimmed Backdrop with smooth fade */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        onClick={onClose}
        className="fixed inset-0 bg-neutral-950/50 backdrop-blur-xs cursor-pointer"
        aria-hidden="true"
      />

      {/* Modal Dialog Card with refined scale & rise entrance */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 12 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white rounded-2xl w-full max-w-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col my-auto border border-neutral-200 z-10"
      >
        {/* Top Bar with Category & Close button */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100 bg-white sticky top-0 z-10">
          <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
            {product.category}
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-neutral-950 hover:bg-neutral-100 rounded-lg transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
          {/* Authentic Preview Image */}
          <div className="relative aspect-[16/10] sm:aspect-[16/9] bg-neutral-100 rounded-xl overflow-hidden border border-neutral-200/80 shadow-xs">
            {modalImageError ? (
              <div className="w-full h-full bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900 text-white p-6 sm:p-8 flex flex-col justify-between select-none relative overflow-hidden">
                <div
                  className="absolute inset-0 opacity-[0.08]"
                  style={{
                    backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
                    backgroundSize: '16px 16px',
                  }}
                />
                <div className="relative z-10 flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider px-2.5 py-1 rounded bg-white/10 text-neutral-300">
                    {product.category}
                  </span>
                  <span className="text-xs font-semibold text-neutral-400">Webnexa Verified</span>
                </div>
                <div className="relative z-10 my-auto py-4">
                  <div className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
                    {product.name}
                  </div>
                  <div className="text-xs sm:text-sm text-neutral-400 mt-1.5 max-w-lg">
                    Production-Ready Static Website Template (HTML5, CSS3, JavaScript)
                  </div>
                </div>
                <div className="relative z-10 flex items-center justify-between pt-3 border-t border-white/10 text-xs text-neutral-400">
                  <span>Zero Server Configuration Required</span>
                  <span className="font-semibold text-white">{formatPriceUSD(product.price)}</span>
                </div>
              </div>
            ) : (
              <>
                <img
                  src={product.image}
                  alt={`${product.name} website template preview`}
                  referrerPolicy="no-referrer"
                  onLoad={() => setModalImageLoaded(true)}
                  onError={() => {
                    setModalImageError(true);
                    setModalImageLoaded(true);
                  }}
                  className={`w-full h-full object-cover object-top transition-all duration-500 hover:scale-[1.02] ${
                    modalImageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                />
                {!modalImageLoaded && (
                  <div className="absolute inset-0 bg-neutral-100 animate-pulse" />
                )}
              </>
            )}
          </div>

          {/* Product Title and Price */}
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-neutral-100 pb-5">
            <div>
              <h2 id="modal-product-title" className="text-2xl sm:text-3xl font-bold text-neutral-950 tracking-tight">
                {product.name}
              </h2>
              <p className="mt-2 text-sm text-neutral-600 leading-relaxed max-w-xl">
                {product.shortDescription}
              </p>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-neutral-950 tabular-nums shrink-0 mt-2 sm:mt-0">
              {formatPriceUSD(product.price)}
            </div>
          </div>

          {/* Key Features List */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900">
              Key Features
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {product.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-700">
                  <div className="w-4 h-4 rounded-full bg-neutral-100 text-neutral-900 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Purchase Button with interactive microinteraction */}
          <div className="pt-2">
            <motion.a
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.15 }}
              href={whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm font-semibold text-white bg-neutral-950 hover:bg-neutral-800 rounded-xl transition-colors shadow-xs text-center cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Buy on WhatsApp — {formatPriceUSD(product.price)}</span>
            </motion.a>
            <p className="text-[11px] text-neutral-400 text-center mt-2 leading-normal">
              Clicking opens a pre-filled WhatsApp chat with the template details. The owner will confirm and provide delivery instructions directly.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
