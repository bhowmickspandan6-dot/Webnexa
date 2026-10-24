export interface Product {
  id: string;
  name: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  price: number; // in USD
  image: string;
  features: string[];
}

export type SortOption = 'featured' | 'price-low' | 'price-high' | 'name-asc';
