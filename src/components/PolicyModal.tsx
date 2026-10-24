import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { X } from 'lucide-react';

interface PolicyModalProps {
  type: 'terms' | 'privacy' | null;
  onClose: () => void;
}

export const PolicyModal: React.FC<PolicyModalProps> = ({ type, onClose }) => {
  useEffect(() => {
    if (!type) return;
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
  }, [type, onClose]);

  if (!type) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        onClick={onClose}
        className="fixed inset-0 bg-neutral-950/40 backdrop-blur-xs cursor-pointer"
        aria-hidden="true"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 10 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white rounded-2xl w-full max-w-lg p-6 sm:p-7 shadow-xl overflow-hidden max-h-[85vh] flex flex-col border border-neutral-200 z-10"
      >
        <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
          <h3 className="text-base font-bold text-neutral-950">
            {type === 'terms' ? 'Terms of Service' : 'Privacy Policy'}
          </h3>
          <button
            onClick={onClose}
            className="p-1 text-neutral-400 hover:text-neutral-950 rounded transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="overflow-y-auto py-4 space-y-3 text-xs text-neutral-600 leading-relaxed">
          {type === 'terms' ? (
            <>
              <p>
                <strong>1. Digital Delivery:</strong> Webnexa provides digital website templates, UI kits, and design files. Source files are delivered directly upon order confirmation.
              </p>
              <p>
                <strong>2. Licensing:</strong> Each standard purchase grants a non-exclusive commercial license to use the product in one personal or client website project. Resale or redistribution of source files as a competing template is not permitted.
              </p>
              <p>
                <strong>3. Digital Sales:</strong> Because source code and digital files cannot be revoked once delivered, sales of digital goods are final. Please review specifications and preview assets prior to completing an order.
              </p>
            </>
          ) : (
            <>
              <p>
                <strong>1. Information Collection:</strong> Webnexa does not collect personal data, sell user information, or run advertising trackers on this storefront.
              </p>
              <p>
                <strong>2. Communication:</strong> Direct communication for order fulfillment takes place through WhatsApp and is protected by WhatsApp&apos;s standard encryption and privacy policies.
              </p>
              <p>
                <strong>3. Storage:</strong> This site uses browser session state solely to handle search queries, product navigation, and active filter selections.
              </p>
            </>
          )}
        </div>

        <div className="pt-3 border-t border-neutral-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-white bg-neutral-950 rounded-xl hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
};
