"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";
import { Filter, ChevronDown, SlidersHorizontal, Search } from "lucide-react";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  gender: string;
  color: string;
};

const CATEGORIES = ["All", "Shirts", "Pants", "Outerwear", "Shoes", "Accessories"];
const GENDERS = ["All", "Men", "Women", "Unisex"];
const SORT_OPTIONS = [
  { label: "Newest", value: "newest" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
];

export default function Catalog() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeGender, setActiveGender] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
        const data = await res.json();
        setProducts(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  const filteredProducts = products
    .filter((p) => (activeCategory === "All" ? true : p.category === activeCategory))
    .filter((p) => (activeGender === "All" ? true : p.gender.toLowerCase() === activeGender.toLowerCase()))
    .filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "price_asc") return a.price - b.price;
      if (sortBy === "price_desc") return b.price - a.price;
      return b.id - a.id; // newest (descending ID)
    });

  return (
    <div className="bg-background min-h-screen flex flex-col font-sans">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-24">
        {/* Page Header */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-12">
          <h1 className="text-4xl font-extrabold text-foreground tracking-tight mb-2">The Collection</h1>
          <p className="text-muted text-lg max-w-2xl">
            Explore our curated selection of modern apparel, designed for the contemporary seeker of style.
          </p>
        </div>

        {/* Filters & Sorting Sticky Bar */}
        <div className="sticky top-14 z-40 bg-background/80 backdrop-blur-xl border-y border-border mb-12">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4 flex flex-col md:flex-row justify-between items-center gap-6">
            
            {/* Categories */}
            <div className="flex flex-col gap-4 w-full">
              <div className="flex gap-2 overflow-x-auto no-scrollbar w-full">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap transition ${
                      activeCategory === cat 
                        ? "bg-foreground text-background shadow-lg" 
                        : "bg-surface text-muted hover:bg-surface-hover hover:text-foreground"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              
              <div className="flex gap-2 overflow-x-auto no-scrollbar w-full">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted self-center mr-2">Collection:</span>
                {GENDERS.map((gender) => (
                  <button
                    key={gender}
                    onClick={() => setActiveGender(gender)}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition ${
                      activeGender === gender 
                        ? "bg-accent text-foreground shadow-md" 
                        : "bg-surface text-muted hover:bg-surface-hover hover:text-foreground"
                    }`}
                  >
                    {gender}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4 w-full md:w-auto">
              {/* Search Bar */}
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={16} />
                <input 
                  type="text" 
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-surface border border-border rounded-full text-sm text-foreground placeholder:text-muted focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition"
                />
              </div>

              {/* Sort Dropdown */}
              <div className="relative group">
                <button className="flex items-center gap-2 px-4 py-2 bg-surface border border-border rounded-full text-sm font-medium text-foreground hover:border-muted">
                  <SlidersHorizontal size={16} />
                  <span>Sort by: {SORT_OPTIONS.find(o => o.value === sortBy)?.label}</span>
                  <ChevronDown size={14} />
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-background border border-border rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 overflow-hidden">
                  {SORT_OPTIONS.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setSortBy(option.value)}
                      className="w-full text-left px-4 py-3 text-sm hover:bg-surface transition text-foreground"
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                <div key={n} className="space-y-4">
                  <div className="aspect-[3/4] bg-surface animate-pulse rounded-2xl"></div>
                  <div className="h-4 bg-surface animate-pulse rounded w-3/4"></div>
                  <div className="h-4 bg-surface animate-pulse rounded w-1/4"></div>
                </div>
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-surface rounded-3xl border border-dashed border-border">
              <h3 className="text-xl font-bold text-foreground mb-2">No items found</h3>
              <p className="text-muted">Try adjusting your filters or search terms.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
              {filteredProducts.map((product) => (
                <Link href={`/products/${product.id}`} key={product.id} className="group cursor-pointer">
                  <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-5 shadow-sm group-hover:shadow-2xl transition-all duration-500">
                    <img 
                      src={`https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=600&auto=format&fit=crop`} 
                      alt={product.name} 
                      className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500"></div>
                    <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-black tracking-widest text-foreground uppercase">
                      {product.category}
                    </div>
                  </div>
                  <div className="space-y-1 px-1">
                    <h3 className="text-foreground font-bold tracking-tight text-lg group-hover:text-accent transition-colors">
                      {product.name}
                    </h3>
                    <div className="flex justify-between items-center">
                      <p className="text-muted text-sm">{product.color || "Standard"}</p>
                      <p className="text-foreground font-extrabold">${Number(product.price).toFixed(2)}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
