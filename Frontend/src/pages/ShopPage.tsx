import { useState, useEffect } from 'react';
import { Filter, ChevronDown, X } from 'lucide-react';
import { ProductCard } from '../components/ui/ProductCard';
import { Filters } from '../components/ui/Filters';
import { Breadcrumb } from '../components/ui/Breadcrumb';
import { products as staticProducts } from '../data/products'; // Fallback
import { Page, Product } from '../types';
import { useUI } from '../context/UIContext';

// Parse query params helper
interface ShopPageProps {
  onProductClick: (product: Product) => void;
  onNavigate: (page: Page) => void;
}
export function ShopPage({ onProductClick, onNavigate }: ShopPageProps) {
  const { filterOpen, setFilterOpen } = useUI();
  const [activeFilters, setActiveFilters] = useState({
    category: [] as string[],
    size: [] as string[],
    color: [] as string[],
    priceRange: ''
  });
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [showSortMenu, setShowSortMenu] = useState(false);

  // Handle Search & Category Events
  useEffect(() => {
    const updateSearch = () => {
      const params = new URLSearchParams(window.location.search);
      setSearchTerm(params.get('search') || '');
      const cat = params.get('category');
      if (cat) {
        setActiveFilters(prev => ({ ...prev, category: [cat] }));
      }
    };

    // Initial check
    updateSearch();

    // Listeners
    window.addEventListener('search-change', updateSearch);
    window.addEventListener('popstate', updateSearch);

    return () => {
      window.removeEventListener('search-change', updateSearch);
      window.removeEventListener('popstate', updateSearch);
    };
  }, []);

  // Fetch products from API
  useEffect(() => {
    fetch('http://localhost:3000/api/products')
      .then(res => res.json())
      .then(data => {
        // Parse colors/sizes if they are strings (from SQLite seed)
        const parsedData = data.map((p: any) => ({
          ...p,
          colors: typeof p.colors === 'string' ? JSON.parse(p.colors) : p.colors,
          sizes: typeof p.sizes === 'string' ? JSON.parse(p.sizes) : p.sizes,
          // Ensure images is an array
          images: p.imageUrl ? [p.imageUrl] : [],
          // Ensure ID is string
          id: p.id.toString()
        }));
        setProducts(parsedData);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch products", err);
        setProducts(staticProducts); // Fallback
        setLoading(false);
      });
  }, []);

  // Filter logic
  let filteredProducts = [...products];

  // Search Filter
  if (searchTerm) {
    const lowerTerm = searchTerm.toLowerCase();
    filteredProducts = filteredProducts.filter(p =>
      p.name.toLowerCase().includes(lowerTerm) ||
      p.description?.toLowerCase().includes(lowerTerm) ||
      p.category.toLowerCase().includes(lowerTerm)
    );
  }

  if (activeFilters.category.length > 0) {
    filteredProducts = filteredProducts.filter((p) =>
      activeFilters.category.includes(p.category)
    );
  }
  // Sort logic
  if (sortBy === 'price-low') {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'newest') {
    filteredProducts.sort(
      (a, b) => (b.newArrival ? 1 : 0) - (a.newArrival ? 1 : 0)
    );
  }
  const activeFilterCount =
    activeFilters.category.length +
    activeFilters.size.length +
    activeFilters.color.length + (
      activeFilters.priceRange ? 1 : 0);
  const clearAllFilters = () => {
    setActiveFilters({
      category: [],
      size: [],
      color: [],
      priceRange: ''
    });
  };
  return (
    <div className="w-full max-w-[1920px] mx-auto px-6 py-8 animate-fade-in">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          {
            label: 'All Products'
          }]
        }
        onNavigate={onNavigate} />


      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold uppercase tracking-tight flex items-center gap-3">
            {searchTerm ? (
              <>
                Search Results: "{searchTerm}"
                <button
                  onClick={() => {
                    const url = new URL(window.location.href);
                    url.searchParams.delete('search');
                    window.history.pushState({}, '', url);
                    window.dispatchEvent(new Event('search-change'));
                  }}
                  className="text-gray-400 hover:text-black transition-colors"
                >
                  <X size={24} />
                </button>
              </>
            ) : 'All Products'}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {loading ? 'Loading...' : `${filteredProducts.length} products`}
          </p>
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto">
          <button
            className="flex items-center gap-2 px-4 py-2 border border-gray-200 text-sm font-medium uppercase tracking-wide hover:border-black transition-colors md:hidden w-full justify-center relative"
            onClick={() => setFilterOpen(true)}>

            <Filter size={16} /> Filters
            {activeFilterCount > 0 &&
              <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
                {activeFilterCount}
              </span>
            }
          </button>

          <div className="relative ml-auto md:ml-0">
            <button
              className="flex items-center gap-2 text-sm font-medium uppercase tracking-wide hover:text-gray-600"
              onClick={() => setShowSortMenu(!showSortMenu)}>

              Sort By{' '}
              <ChevronDown
                size={16}
                className={`transition-transform ${showSortMenu ? 'rotate-180' : ''}`} />

            </button>
            {showSortMenu &&
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowSortMenu(false)} />

                <div className="absolute right-0 top-full pt-2 z-20">
                  <div className="bg-white border border-gray-100 shadow-xl py-2 w-44 flex flex-col">
                    <button
                      className={`px-4 py-2 text-left text-sm hover:bg-gray-50 ${sortBy === 'newest' ? 'font-medium' : ''}`}
                      onClick={() => {
                        setSortBy('newest');
                        setShowSortMenu(false);
                      }}>

                      Newest First
                    </button>
                    <button
                      className={`px-4 py-2 text-left text-sm hover:bg-gray-50 ${sortBy === 'price-low' ? 'font-medium' : ''}`}
                      onClick={() => {
                        setSortBy('price-low');
                        setShowSortMenu(false);
                      }}>

                      Price: Low to High
                    </button>
                    <button
                      className={`px-4 py-2 text-left text-sm hover:bg-gray-50 ${sortBy === 'price-high' ? 'font-medium' : ''}`}
                      onClick={() => {
                        setSortBy('price-high');
                        setShowSortMenu(false);
                      }}>

                      Price: High to Low
                    </button>
                  </div>
                </div>
              </>
            }
          </div>
        </div>
      </div>

      {/* Active Filters Pills */}
      {activeFilterCount > 0 &&
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="text-xs text-gray-500 uppercase tracking-wider">
            Active Filters:
          </span>
          {activeFilters.category.map((cat) =>
            <button
              key={cat}
              onClick={() =>
                setActiveFilters((prev) => ({
                  ...prev,
                  category: prev.category.filter((c) => c !== cat)
                }))
              }
              className="flex items-center gap-1 px-3 py-1 bg-gray-100 text-xs font-medium hover:bg-gray-200 transition-colors">

              {cat} <X size={12} />
            </button>
          )}
          {activeFilters.size.map((size) =>
            <button
              key={size}
              onClick={() =>
                setActiveFilters((prev) => ({
                  ...prev,
                  size: prev.size.filter((s) => s !== size)
                }))
              }
              className="flex items-center gap-1 px-3 py-1 bg-gray-100 text-xs font-medium hover:bg-gray-200 transition-colors">

              Size: {size} <X size={12} />
            </button>
          )}
          <button
            onClick={clearAllFilters}
            className="text-xs font-medium underline hover:text-gray-600 ml-2">

            Clear All
          </button>
        </div>
      }

      <div className="flex gap-12">
        {/* Desktop Sidebar */}
        <aside className="hidden md:block w-64 flex-shrink-0 sticky top-24 h-[calc(100vh-6rem)] overflow-y-auto">
          <Filters filters={activeFilters} onChange={setActiveFilters} />
        </aside>

        {/* Mobile Filter Drawer */}
        {filterOpen &&
          <div className="fixed inset-0 z-50 md:hidden">
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setFilterOpen(false)} />

            <div className="absolute inset-y-0 right-0 w-[80%] max-w-sm bg-white shadow-2xl animate-slide-in-right">
              <Filters
                filters={activeFilters}
                onChange={setActiveFilters}
                onClose={() => setFilterOpen(false)}
                isMobile />

            </div>
          </div>
        }

        {/* Product Grid */}
        <div className="flex-1">
          {filteredProducts.length === 0 ?
            <div className="text-center py-20">
              <p className="text-gray-500 mb-4">
                No products match your filters.
              </p>
              <button
                onClick={clearAllFilters}
                className="text-sm font-medium underline hover:text-gray-600">

                Clear all filters
              </button>
            </div> :

            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10 stagger-children">
              {filteredProducts.map((product) =>
                <ProductCard
                  key={product.id}
                  product={product}
                  onClick={() => onProductClick(product)}
                  onQuickAdd={() => onProductClick(product)} />

              )}
            </div>
          }
        </div>
      </div>
    </div>);

}