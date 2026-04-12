"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Edit2, Trash2, Box, Tag, LogOut, ArrowLeft } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  sku: string;
  category: string;
  size: string;
  color: string;
  stock: number;
};

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || user.role !== 'admin')) {
      router.push("/account/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user?.role === 'admin') fetchProducts();
  }, [user]);

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoadingProducts(false);
    }
  };

  const deleteProduct = async (id: number) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`, {
        method: "DELETE",
      });
      fetchProducts();
    } catch (error) {
      console.error("Failed to delete:", error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex justify-between items-center pb-6 border-b border-slate-800">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Inventory Dashboard
            </h1>
            <p className="text-slate-400 mt-2 text-sm">Manage your modern apparel collection.</p>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white transition flex items-center gap-2">
              <ArrowLeft size={16}/> View Storefront
            </Link>
            <button onClick={logout} className="p-2.5 rounded-full bg-slate-900 border border-slate-800 text-rose-500 hover:bg-rose-500 hover:text-white transition">
              <LogOut size={18}/>
            </button>
            <Link
              href="/admin/products/new"
              className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-5 py-2.5 rounded-full font-bold transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] transform hover:-translate-y-1"
            >
              <Plus size={20} />
              Add Product
            </Link>
          </div>
        </div>

        {loading || loadingProducts ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-32 rounded-2xl border border-dashed border-slate-800 bg-slate-900/50 backdrop-blur-sm">
            <Box size={48} className="mx-auto mb-4 text-slate-600" />
            <h3 className="text-xl font-medium text-slate-300">No products found</h3>
            <p className="text-slate-500 mt-2">Get started by creating your first product.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="group relative bg-slate-900 rounded-2xl p-6 border border-slate-800 hover:border-slate-700 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-2 px-3 py-1 bg-slate-800 rounded-full text-xs font-medium text-emerald-400">
                    <Tag size={12} />
                    {product.category}
                  </div>
                  <div className="flex bg-slate-950 rounded-lg overflow-hidden border border-slate-800">
                    <Link
                      href={`/admin/products/edit/${product.id}`}
                      className="p-2 text-slate-400 hover:text-cyan-400 hover:bg-slate-800 transition-colors"
                    >
                      <Edit2 size={16} />
                    </Link>
                    <button
                      onClick={() => deleteProduct(product.id)}
                      className="p-2 text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h2 className="text-xl font-bold text-white truncate" title={product.name}>
                      {product.name}
                    </h2>
                    <p className="text-sm font-mono text-slate-500 mt-1">SKU: {product.sku}</p>
                  </div>

                  <p className="text-sm text-slate-400 line-clamp-2 min-h-[40px]">
                    {product.description || "No description provided."}
                  </p>

                  <div className="flex justify-between items-end pt-4 border-t border-slate-800/50">
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Price</p>
                      <p className="text-2xl font-bold text-emerald-400">${product.price}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Details</p>
                      <p className="text-sm text-slate-300">
                        {product.color} • {product.size}
                      </p>
                      <p className={`text-xs mt-1 font-medium ${product.stock > 10 ? 'text-cyan-500' : 'text-rose-500'}`}>
                        {product.stock} in stock
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
