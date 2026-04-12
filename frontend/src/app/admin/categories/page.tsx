"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import { ArrowLeft, Package, Tag } from "lucide-react";

export default function AdminCategories() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [categories, setCategories] = useState<string[]>([]);
  const [productCounts, setProductCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && (!user || user.role !== "admin")) {
      router.push("/account/login");
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, prodRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`),
        ]);
        const cats = await catRes.json();
        const prods = await prodRes.json();

        setCategories(cats);

        // Count products per category
        const counts: Record<string, number> = {};
        prods.forEach((p: { category: string }) => {
          counts[p.category] = (counts[p.category] || 0) + 1;
        });
        setProductCounts(counts);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (authLoading || !user) return null;

  return (
    <div className="bg-background min-h-screen font-sans">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <Link href="/admin" className="inline-flex items-center gap-2 text-muted hover:text-foreground transition mb-8">
          <ArrowLeft size={18} /> Back to Dashboard
        </Link>

        <h1 className="text-3xl font-black text-foreground mb-2">Category Management</h1>
        <p className="text-muted mb-10">View and manage your product categories.</p>

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map(n => (
              <div key={n} className="h-20 bg-surface rounded-2xl animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {categories.map(cat => (
              <div key={cat} className="flex items-center justify-between p-6 bg-surface rounded-2xl border border-border hover:border-accent/30 transition group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                    <Tag className="text-accent" size={22} />
                  </div>
                  <div>
                    <h3 className="text-foreground font-bold text-lg">{cat}</h3>
                    <p className="text-muted text-sm">{productCounts[cat] || 0} products</p>
                  </div>
                </div>
                <Link
                  href={`/category/${cat.toLowerCase()}`}
                  className="text-accent font-bold text-sm opacity-0 group-hover:opacity-100 transition"
                >
                  View in Store →
                </Link>
              </div>
            ))}

            <div className="mt-8 p-6 bg-surface/50 border-2 border-dashed border-border rounded-2xl text-center">
              <p className="text-muted text-sm">
                Categories are automatically derived from your products. Add a product with a new category value to create one.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
