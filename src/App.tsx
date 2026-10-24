import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Product, SortOption } from './types';
import { PRODUCTS } from './data/catalog';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CategoryNav } from './components/CategoryNav';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { Footer } from './components/Footer';
import { PolicyModal } from './components/PolicyModal';
import { Search, FilterX } from 'lucide-react';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | 'All'>('All');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [activePolicy, setActivePolicy] = useState<'terms' | 'privacy' | null>(null);
  const [activeNavSection, setActiveNavSection] = useState<'home' | 'explore' | 'categories'>('home');

  const catalogRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);

  // Sync URL ?product=id with modal state
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('product');
    if (productId) {
      const found = PRODUCTS.find((p) => p.id === productId);
      if (found) {
        setActiveProduct(found);
      }
    }
  }, []);

  const handleOpenProductDetails = (product: Product) => {
    setActiveProduct(product);
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set('product', product.id);
    window.history.pushState({}, '', newUrl.toString());
  };

  const handleCloseProductDetails = () => {
    setActiveProduct(null);
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.delete('product');
    window.history.pushState({}, '', newUrl.toString());
  };

  const handleNavigate = (sectionId: string) => {
    if (sectionId === 'home') {
      setActiveNavSection('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (sectionId === 'explore') {
      setActiveNavSection('explore');
      catalogRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else if (sectionId === 'categories') {
      setActiveNavSection('categories');
      categoriesRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Filtered & Sorted products
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.features.some((f) => f.toLowerCase().includes(q))
      );
    }

    if (selectedCategory !== 'All') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name-asc') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [searchQuery, selectedCategory, sortBy]);

  return (
    <div className="min-h-screen bg-white text-neutral-900 flex flex-col font-sans selection:bg-neutral-950 selection:text-white">
      {/* Header matching reference */}
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onNavigate={handleNavigate}
        activeSection={activeNavSection}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section matching reference */}
        <Hero
          onExploreClick={() => {
            handleNavigate('explore');
          }}
        />

        {/* Catalog Section */}
        <section
          ref={catalogRef}
          id="explore"
          className="py-12 sm:py-16 bg-white"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Category Navigation with icon pills & Featured Templates Header */}
            <div ref={categoriesRef} id="categories" className="mb-8">
              <CategoryNav
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                sortBy={sortBy}
                onSortChange={setSortBy}
              />
            </div>

            {/* Active search / filter indicator */}
            {(searchQuery || selectedCategory !== 'All') && (
              <div className="mb-6 flex items-center justify-between text-xs sm:text-sm text-neutral-600 pb-2 border-b border-neutral-100">
                <div className="flex items-center gap-2">
                  <span>Showing {filteredProducts.length} template{filteredProducts.length === 1 ? '' : 's'}</span>
                  {searchQuery && (
                    <span className="font-medium text-neutral-900">for &ldquo;{searchQuery}&rdquo;</span>
                  )}
                  {selectedCategory !== 'All' && (
                    <span className="font-medium text-neutral-900">in {selectedCategory}</span>
                  )}
                </div>

                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                  }}
                  className="inline-flex items-center gap-1.5 font-semibold text-neutral-900 hover:text-neutral-600 transition-colors cursor-pointer"
                >
                  <FilterX className="w-3.5 h-3.5" />
                  <span>Reset filters</span>
                </button>
              </div>
            )}

            {/* Products Grid: 4 Columns on desktop, 2 on tablet, 1 on mobile (matching reference) */}
            {filteredProducts.length > 0 ? (
              <motion.div
                key={`${selectedCategory}-${sortBy}-${searchQuery}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
              >
                {filteredProducts.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    index={index}
                    onViewDetails={handleOpenProductDetails}
                  />
                ))}
              </motion.div>
            ) : (
              /* Empty Search State */
              <div className="py-20 text-center max-w-sm mx-auto">
                <div className="w-12 h-12 rounded-full bg-neutral-100 text-neutral-400 flex items-center justify-center mx-auto mb-3">
                  <Search className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-neutral-950">No templates found</h3>
                <p className="mt-1 text-xs text-neutral-500 leading-relaxed">
                  No matching templates were found for &ldquo;{searchQuery}&rdquo;. Try adjusting your search query or reset filters.
                </p>
                <div className="mt-4">
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('All');
                    }}
                    className="px-4 py-2 bg-neutral-950 text-white rounded-xl text-xs font-semibold hover:bg-neutral-800 transition-colors cursor-pointer"
                  >
                    Clear Search
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Footer matching reference styling */}
      <Footer
        onNavigate={handleNavigate}
        onOpenPolicy={setActivePolicy}
      />

      {/* Product Details Modal Dialog */}
      <AnimatePresence>
        {activeProduct && (
          <ProductDetailModal
            product={activeProduct}
            onClose={handleCloseProductDetails}
          />
        )}
      </AnimatePresence>

      {/* Legal Policy Modal */}
      <AnimatePresence>
        {activePolicy && (
          <PolicyModal
            type={activePolicy}
            onClose={() => setActivePolicy(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
