"use client";

import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ChevronRight } from "lucide-react";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  color: string;
  size: string;
};

// Maps URL slugs to actual DB category names, and provides metadata
const CATEGORY_MAP: Record<string, { name: string; description: string; banner: string }> = {
  shirts:      { name: "Shirts",      description: "Foundation pieces and elevated essentials — from crew tees to Oxford button-downs.", banner: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=1400&auto=format&fit=crop" },
  pants:       { name: "Pants",       description: "Tailored trousers, relaxed denim, and everything in between.", banner: "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=1400&auto=format&fit=crop" },
  outerwear:   { name: "Outerwear",   description: "Overcoats, bombers, and trucker jackets built for every season.", banner: "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=1400&auto=format&fit=crop" },
  shoes:       { name: "Shoes",       description: "Minimalist sneakers and Chelsea boots crafted from premium materials.", banner: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1400&auto=format&fit=crop" },
  accessories: { name: "Accessories", description: "Finishing touches — beanies, belts, and bags that complete the look.", banner: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?q=80&w=1400&auto=format&fit=crop" },
  tops:        { name: "Shirts",      description: "Tops, tees, and blouses for effortless layering.", banner: "https://images.unsplash.com/photo-1554568218-0f1715e72254?q=80&w=1400&auto=format&fit=crop" },
  denim:       { name: "Pants",       description: "Hand-finished denim in raw indigo and washed finishes.", banner: "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=1400&auto=format&fit=crop" },
  women:       { name: "",            description: "Curated elegance for the modern woman.", banner: "/images/category_women.png" },
  men:         { name: "",            description: "Refined essentials for the modern man.", banner: "/images/category_men.png" },
  kids:        { name: "",            description: "Playful yet polished pieces for little ones.", banner: "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?q=80&w=1400&auto=format&fit=crop" },
};

export default function CategoryPage() {
  const params = useParams();
  const slug = (params?.categoryId as string) || "";
  const categoryInfo = CATEGORY_MAP[slug.toLowerCase()];
  const displayName = slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [allCategories, setAllCategories] = useState<string[]>([]);

  useEffect(() => {
    // Fetch categories for the sidebar
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`)
      .then(res => res.json())
      .then(data => setAllCategories(data))
      .catch(console.error);
  }, []);

  useEffect(() => {
    setLoading(true);
    
    let url = `${process.env.NEXT_PUBLIC_API_URL}/products`;
    const params = new URLSearchParams();

    // If it's a top-level collection (Men/Women/Kids)
    if (["men", "women", "kids"].includes(slug.toLowerCase())) {
      params.append("gender", slug.toLowerCase());
    } 
    // Otherwise it's a specific category (Shirts, Pants, etc.)
    else if (categoryInfo?.name) {
      params.append("category", categoryInfo.name);
    }

    const queryString = params.toString();
    if (queryString) url += `?${queryString}`;

    fetch(url)
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [slug, categoryInfo]);

  return (
    <div className="bg-background min-h-screen flex flex-col font-sans">
      <Navbar />

      {/* Category Hero Banner */}
      <div className="relative h-72 md:h-96 w-full overflow-hidden">
        <img
          src={categoryInfo?.banner || "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1400&auto=format&fit=crop"}
          alt={displayName}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
        <div className="absolute bottom-8 left-0 right-0 max-w-7xl mx-auto px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-white/50 mb-4">
            <Link href="/" className="hover:text-white transition">Home</Link>
            <ChevronRight size={14} />
            <span className="text-white font-medium capitalize">{displayName}</span>
          </nav>
          <h1 className="text-4xl md:text-6xl font-black text-white capitalize">{displayName}</h1>
          <p className="text-white/60 text-lg mt-3 max-w-xl">
            {categoryInfo?.description || `Browse our ${displayName} collection.`}
          </p>
        </div>
      </div>

      <main className="flex-1 py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12">

            {/* Sidebar */}
            <aside className="lg:w-56 flex-shrink-0">
              <h3 className="font-black text-foreground uppercase tracking-widest text-xs mb-6">Categories</h3>
              <div className="flex lg:flex-col gap-2 overflow-x-auto no-scrollbar">
                {allCategories.map(cat => (
                  <Link
                    key={cat}
                    href={`/category/${cat.toLowerCase()}`}
                    className={`px-4 py-2.5 rounded-xl text-sm font-bold transition whitespace-nowrap ${
                      categoryInfo?.name === cat || slug.toLowerCase() === cat.toLowerCase()
                        ? "bg-foreground text-background"
                        : "bg-surface text-muted hover:bg-surface-hover hover:text-foreground"
                    }`}
                  >
                    {cat}
                  </Link>
                ))}
              </div>
            </aside>

            {/* Product Grid */}
            <div className="flex-1">
              <div className="flex justify-between items-center mb-8">
                <p className="text-muted text-sm">
                  {loading ? "Loading..." : `${products.length} product${products.length !== 1 ? "s" : ""}`}
                </p>
              </div>

              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[1, 2, 3, 4, 5, 6].map(n => (
                    <div key={n} className="space-y-4">
                      <div className="aspect-[3/4] bg-surface animate-pulse rounded-2xl"></div>
                      <div className="h-4 bg-surface animate-pulse rounded w-3/4"></div>
                      <div className="h-4 bg-surface animate-pulse rounded w-1/4"></div>
                    </div>
                  ))}
                </div>
              ) : products.length === 0 ? (
                <div className="text-center py-20 bg-surface rounded-3xl border border-dashed border-border">
                  <h3 className="text-xl font-bold text-foreground mb-2">No items in this category yet</h3>
                  <p className="text-muted mb-6">Check back soon or explore other collections.</p>
                  <Link href="/products" className="bg-foreground text-background font-bold px-8 py-3 rounded-full hover:-translate-y-1 transition-all shadow-lg inline-block">
                    View All Products
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                  {products.map(product => (
                    <Link href={`/products/${product.id}`} key={product.id} className="group cursor-pointer">
                      <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-5 shadow-sm group-hover:shadow-2xl transition-all duration-500">
                        <img
                          src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=600&auto=format&fit=crop"
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
                        <p className="text-muted text-sm line-clamp-2 mb-1">{product.description}</p>
                        <div className="flex justify-between items-center">
                          <p className="text-muted text-sm">{product.color} · {product.size}</p>
                          <p className="text-foreground font-extrabold">${Number(product.price).toFixed(2)}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
