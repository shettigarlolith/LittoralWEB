import React from 'react';
import { Category, ProductTag, DietFilter } from '@/types';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Star, X, SlidersHorizontal, Leaf, Beef } from 'lucide-react';
import { categories, allTags } from '@/data/products';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

interface ProductFiltersProps {
  selectedCategories: Category[];
  setSelectedCategories: (categories: Category[]) => void;
  selectedTags: ProductTag[];
  setSelectedTags: (tags: ProductTag[]) => void;
  minRating: number;
  setMinRating: (rating: number) => void;
  dietFilter: DietFilter;
  setDietFilter: (diet: DietFilter) => void;
  onClearFilters: () => void;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({
  selectedCategories,
  setSelectedCategories,
  selectedTags,
  setSelectedTags,
  minRating,
  setMinRating,
  dietFilter,
  setDietFilter,
  onClearFilters,
}) => {
  const hasActiveFilters = 
    selectedCategories.length > 0 || 
    selectedTags.length > 0 || 
    minRating > 0 || 
    dietFilter !== 'all';

  const toggleCategory = (category: Category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const toggleTag = (tag: ProductTag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Clear Filters */}
      {hasActiveFilters && (
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onClearFilters}
          className="w-full text-destructive hover:text-destructive hover:bg-destructive/10"
        >
          <X className="h-4 w-4 mr-2" />
          Clear All Filters
        </Button>
      )}

      {/* Veg / Non-Veg */}
      <div>
        <h3 className="font-semibold text-foreground mb-3">Veg / Non-Veg</h3>
        <div className="flex flex-wrap gap-2">
          {(['all', 'veg', 'nonveg'] as const).map(diet => (
            <Button
              key={diet}
              variant={dietFilter === diet ? 'default' : 'outline'}
              size="sm"
              onClick={() => setDietFilter(diet)}
              className="gap-1.5 capitalize"
            >
              {diet === 'all' && 'All'}
              {diet === 'veg' && <><Leaf className="h-3.5 w-3" /> Veg</>}
              {diet === 'nonveg' && <><Beef className="h-3.5 w-3" /> Non-Veg</>}
            </Button>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div>
        <h3 className="font-semibold text-foreground mb-3">Categories</h3>
        <div className="space-y-2">
          {categories.map(category => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={category}
                checked={selectedCategories.includes(category)}
                onCheckedChange={() => toggleCategory(category)}
              />
              <Label 
                htmlFor={category} 
                className="text-sm cursor-pointer text-foreground"
              >
                {category}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Rating */}
      <div className="min-w-0">
        <h3 className="font-semibold text-foreground mb-3">Minimum Rating</h3>
        <div className="flex flex-wrap gap-2">
          {[0, 3, 3.5, 4, 4.5].map(rating => (
            <Button
              key={rating}
              variant={minRating === rating ? "default" : "outline"}
              size="sm"
              onClick={() => setMinRating(rating)}
              className="flex items-center gap-1 shrink-0"
            >
              {rating === 0 ? 'All' : (
                <>
                  {rating}
                  <Star className="h-3 w-3 fill-current shrink-0" />
                </>
              )}
            </Button>
          ))}
        </div>
      </div>

      {/* Tags */}
      <div>
        <h3 className="font-semibold text-foreground mb-3">Tags</h3>
        <div className="flex flex-wrap gap-2">
          {allTags.map(tag => (
            <Button
              key={tag}
              variant={selectedTags.includes(tag) ? "default" : "outline"}
              size="sm"
              onClick={() => toggleTag(tag)}
              className="text-xs"
            >
              {tag}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-64 shrink-0">
        <div className="sticky top-24 bg-card rounded-xl border border-border p-5">
          <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            <SlidersHorizontal className="h-5 w-5" />
            Filters
          </h2>
          <FilterContent />
        </div>
      </div>

      {/* Mobile Filter Sheet */}
      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              Filters
              {hasActiveFilters && (
                <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                  !
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80 overflow-y-auto">
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2">
                <SlidersHorizontal className="h-5 w-5" />
                Filters
              </SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              <FilterContent />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default ProductFilters;
