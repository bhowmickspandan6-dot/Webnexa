import React from 'react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenPolicy: (type: 'terms' | 'privacy') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenPolicy }) => {
  return (
    <footer className="bg-white border-t border-neutral-100 text-neutral-500 text-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-neutral-950 flex items-center justify-center text-white text-[10px] font-semibold">
              W
            </div>
            <span className="font-semibold text-neutral-950 tracking-tight">
              Webnexa
            </span>
          </div>

          {/* Minimal Navigation Links */}
          <div className="flex items-center gap-5 text-neutral-600">
            <button
              onClick={() => onNavigate('explore')}
              className="hover:text-neutral-950 transition-colors cursor-pointer"
            >
              Explore
            </button>
            <button
              onClick={() => onNavigate('categories')}
              className="hover:text-neutral-950 transition-colors cursor-pointer"
            >
              Categories
            </button>
            <button
              onClick={() => onOpenPolicy('terms')}
              className="hover:text-neutral-950 transition-colors cursor-pointer"
            >
              Terms
            </button>
            <button
              onClick={() => onOpenPolicy('privacy')}
              className="hover:text-neutral-950 transition-colors cursor-pointer"
            >
              Privacy
            </button>
          </div>

          {/* Copyright */}
          <div className="text-neutral-400">
            &copy; {new Date().getFullYear()} Webnexa. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
