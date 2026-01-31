import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Search, Grid3X3, List } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import ProductFilters from '@/components/ProductFilters';
import ProductDetailModal from '@/components/ProductDetailModal';
import { products, searchProducts } from '@/data/products';
import { getProductImage } from '@/data/images';
import { Product, Category, ProductTag, DietFilter } from '@/types';
import { cn } from '@/lib/utils';

const Products: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // Filter states
  const [selectedCategories, setSelectedCategories] = useState<Category[]>(() => {
    const cat = searchParams.get('category');
    return cat ? [cat as Category] : [];
  });
  const [selectedTags, setSelectedTags] = useState<ProductTag[]>([]);
  const [minRating, setMinRating] = useState(0);
  const [dietFilter, setDietFilter] = useState<DietFilter>('all');

  // Update URL when search changes
  useEffect(() => {
    if (searchQuery) {
      setSearchParams({ search: searchQuery });
    }
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query) {
      setSearchParams({ search: query });
    } else {
      setSearchParams({});
    }
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedTags([]);
    setMinRating(0);
    setDietFilter('all');
    setSearchQuery('');
    setSearchParams({});
  };

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search filter
    if (searchQuery) {
      result = searchProducts(searchQuery);
    }

    // Category filter
    if (selectedCategories.length > 0) {
      result = result.filter(p => selectedCategories.includes(p.category));
    }

    // Rating filter
    if (minRating > 0) {
      result = result.filter(p => p.rating >= minRating);
    }

    // Tags filter
    if (selectedTags.length > 0) {
      result = result.filter(p => 
        selectedTags.some(tag => p.tags.includes(tag))
      );
    }

    // Veg / Non-Veg filter
    if (dietFilter === 'veg') {
      result = result.filter(p => p.isVeg);
    } else if (dietFilter === 'nonveg') {
      result = result.filter(p => !p.isVeg);
    }

    return result;
  }, [searchQuery, selectedCategories, minRating, selectedTags, dietFilter]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header onSearch={handleSearch} />

      <main className="flex-1">
        {/* Page Header */}
        <div className="bg-gradient-to-r from-accent to-secondary/50 py-8 md:py-12">
          <div className="container">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Our Products
            </h1>
            <p className="text-muted-foreground">
              Explore our wide range of authentic ready-mix products
            </p>
          </div>
        </div>

        <div className="container py-8">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            {/* Filters Sidebar */}
            <ProductFilters
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
              selectedTags={selectedTags}
              setSelectedTags={setSelectedTags}
              minRating={minRating}
              setMinRating={setMinRating}
              dietFilter={dietFilter}
              setDietFilter={setDietFilter}
              onClearFilters={clearFilters}
            />

            {/* Products Grid */}
            <div className="flex-1 min-w-0">
              {/* Search & Controls */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <div className="flex items-center gap-2">
                  <div
                    className="flex border border-border rounded-lg overflow-hidden"
                    role="group"
                    aria-label="View mode"
                    onClick={(e) => {
                      const target = e.target as HTMLElement;
                      const button = target.closest('button[data-view]');
                      if (button) {
                        e.preventDefault();
                        e.stopPropagation();
                        const mode = (button as HTMLButtonElement).dataset.view as 'grid' | 'list';
                        setViewMode(mode);
                      }
                    }}
                  >
                    <button
                      type="button"
                      data-view="grid"
                      className={cn(
                        "inline-flex items-center justify-center h-10 w-10 rounded-none border-0 bg-transparent cursor-pointer",
                        "hover:bg-accent hover:text-accent-foreground",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                        viewMode === 'grid' && "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
                      )}
                      aria-pressed={viewMode === 'grid'}
                      aria-label="Grid view"
                    >
                      <Grid3X3 className="h-4 w-4 shrink-0" />
                    </button>
                    <button
                      type="button"
                      data-view="list"
                      className={cn(
                        "inline-flex items-center justify-center h-10 w-10 rounded-none border-0 bg-transparent cursor-pointer",
                        "hover:bg-accent hover:text-accent-foreground",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                        viewMode === 'list' && "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
                      )}
                      aria-pressed={viewMode === 'list'}
                      aria-label="List view"
                    >
                      <List className="h-4 w-4 shrink-0" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Results count */}
              <p className="text-sm text-muted-foreground mb-6">
                Showing {filteredProducts.length} of {products.length} products
              </p>

              {/* Products */}
              {filteredProducts.length > 0 ? (
                <div className={cn(
                  "grid gap-4 sm:gap-6",
                  viewMode === 'grid' 
                    ? "grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
                    : "grid-cols-1"
                )}>
                  {filteredProducts.map(product => (
                    <ProductCard
                      key={product.id}
                      product={{ ...product, image: getProductImage(product.id) }}
                      onViewDetails={setSelectedProduct}
                      variant={viewMode}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
                    <Search className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">No products found</h3>
                  <p className="text-muted-foreground mb-6">
                    Try adjusting your filters or search query
                  </p>
                  <Button onClick={clearFilters}>Clear All Filters</Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <ProductDetailModal
        product={selectedProduct ? { ...selectedProduct, image: getProductImage(selectedProduct.id) } : null}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
};

export default Products;
