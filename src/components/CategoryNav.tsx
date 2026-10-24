import React from 'react';
import { SortOption } from '../types';
import {
  LayoutGrid,
  Briefcase,
  Store,
  Heart,
  Plane,
  GraduationCap,
  ShoppingCart,
  Calendar,
  SlidersHorizontal,
} from 'lucide-react';

interface CategoryNavProps {
  selectedCategory: string | 'All';
  onSelectCategory: (category: string | 'All') => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
}

export const CategoryNav: React.FC<CategoryNavProps> = ({
  selectedCategory,
  onSelectCategory,
  sortBy,
  onSortChange,
}) => {
  const categoriesWithIcons = [
    { name: 'All Templates', value: 'All', icon: LayoutGrid },
    { name: 'Business & Corporate', value: 'Business & Corporate', icon: Briefcase },
    { name: 'Local Business', value: 'Local Business', icon: Store },
    { name: 'Healthcare', value: 'Healthcare', icon: Heart },
    { name: 'Travel & Hospitality', value: 'Travel & Hospitality', icon: Plane },
    { name: 'Education', value: 'Education', icon: GraduationCap },
    { name: 'E-commerce', value: 'E-commerce', icon: ShoppingCart },
    { name: 'Events & Personal', value: 'Events & Personal', icon: Calendar },
    { name: 'Utility Tools', value: 'Utility Tools', icon: SlidersHorizontal },
  ];

  return (
    <div className="space-y-8">
      {/* Horizontally Scrollable Category Pills with Icons */}
      <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none max-w-full">
        {categoriesWithIcons.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.value === 'All'
              ? selectedCategory === 'All'
              : selectedCategory === item.value;

          return (
            <button
              key={item.value}
              onClick={() => onSelectCategory(item.value)}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer shrink-0 border active:scale-[0.98] ${
                isActive
                  ? 'bg-neutral-950 text-white border-neutral-950 shadow-xs'
                  : 'bg-white text-neutral-800 border-neutral-200/90 hover:border-neutral-300 hover:bg-neutral-50'
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{item.name}</span>
            </button>
          );
        })}
      </div>

      {/* Section Header Row: "Featured Templates" & "Sort by" */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pt-2">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 tracking-tight">
            Featured Templates
          </h2>
          <p className="mt-1 text-sm text-neutral-500">
            Handpicked templates for every idea.
          </p>
        </div>

        {/* Sort Selector Dropdown */}
        <div className="flex items-center gap-2.5 text-xs sm:text-sm shrink-0 self-start sm:self-auto">
          <label htmlFor="sort-select" className="text-neutral-500 font-medium">
            Sort by:
          </label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            className="px-3 py-1.5 text-xs sm:text-sm font-semibold bg-white hover:bg-neutral-50 text-neutral-900 rounded-xl border border-neutral-200/90 focus:border-neutral-900 focus:outline-none transition-colors cursor-pointer"
          >
            <option value="featured">Featured First</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name-asc">Alphabetical (A–Z)</option>
          </select>
        </div>
      </div>
    </div>
  );
};
