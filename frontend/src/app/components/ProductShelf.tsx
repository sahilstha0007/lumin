"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  color: string;
};

export default function ProductShelf({ title, endpoint }: { title: string, endpoint: string }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`);
        const data = await res.json();
        setProducts(data.slice(0, 4));
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, [endpoint]);

  return (
    <section className="bg-surface py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-3xl font-extrabold text-foreground tracking-tight">{title}</h2>
          <Link href="/shop" className="text-accent font-semibold hover:text-accent-hover transition flex items-center gap-1">
            Shop All <ArrowRight size={16}/>
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map(n => (
              <div key={n} className="flex-1 h-96 bg-surface-hover animate-pulse rounded-2xl"></div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="p-12 text-center text-muted bg-background rounded-2xl shadow-sm border border-border">
            No products matching this criteria. Add some products in the admin dashboard!
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map(product => (
              <Link href={`/products/${product.id}`} key={product.id} className="group block">
                <div className="relative aspect-[3/4] bg-surface-hover rounded-2xl overflow-hidden mb-4 shadow-sm group-hover:shadow-xl transition-shadow duration-300">
                  <img 
                    src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=400&auto=format&fit=crop" 
                    alt={product.name} 
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-background/90 backdrop-blur text-xs font-bold px-3 py-1 rounded-full text-foreground uppercase tracking-widest">
                    {product.category}
                  </div>
                </div>
                <h3 className="font-semibold text-lg text-foreground truncate">
                  {product.name}
                </h3>
                <div className="flex justify-between items-center mt-1">
                  <p className="text-muted">{product.color || "Standard"}</p>
                  <p className="font-bold text-foreground">${Number(product.price).toFixed(2)}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
