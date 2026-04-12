"use client";

import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useParams, useRouter } from "next/navigation";
import { useCart } from "../../context/CartContext";
import { ShoppingBag, Star, Share2, Heart, Check, ArrowLeft, ShieldCheck, Truck, RefreshCw } from "lucide-react";
import Link from "next/link";

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

export default function ProductDetail() {
  const params = useParams();
  const router = useRouter();
  const id = params?.productId;
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState("");
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!id) return;
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`);
        if (!res.ok) throw new Error("Product not found");
        const data = await res.json();
        setProduct(data);
        setSelectedSize(data.size);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      color: product.color,
      size: selectedSize || product.size,
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=600&auto=format&fit=crop"
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (loading) {
    return (
    <div className="bg-background min-h-screen flex flex-col font-sans">
        <Navbar />
        <div className="flex-1 flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
    <div className="bg-background min-h-screen flex flex-col font-sans">
        <Navbar />
        <div className="flex-1 flex flex-col justify-center items-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <Link href="/products" className="text-amber-600 font-bold hover:underline">Back to Catalog</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen flex flex-col font-sans">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm text-muted mb-12">
            <Link href="/" className="hover:text-foreground transition">Home</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-foreground transition">Shop</Link>
            <span>/</span>
            <span className="text-foreground font-medium">{product.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Product Image Gallery */}
            <div className="space-y-6">
              <div className="relative aspect-[3/4] bg-surface rounded-[40px] overflow-hidden shadow-2xl group">
                <img 
                  src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop" 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <button className="absolute top-6 right-6 p-4 bg-background/80 backdrop-blur-md rounded-full text-foreground shadow-xl hover:bg-background transition-colors">
                  <Heart size={20} />
                </button>
              </div>
            </div>

            {/* Product Info */}
            <div className="flex flex-col">
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-accent/10 text-accent text-[10px] font-black tracking-widest uppercase rounded-full border border-accent/20 mb-6">
                  {product.category}
                </span>
                <h1 className="text-4xl md:text-5xl font-black text-foreground tracking-tight leading-tight mb-4">
                  {product.name}
                </h1>
                <div className="flex items-center gap-4 mb-8">
                  <div className="flex text-amber-500">
                    {[1, 2, 3, 4, 5].map(s => <Star key={s} size={16} fill="currentColor" />)}
                  </div>
                  <span className="text-muted text-sm">(124 customer reviews)</span>
                </div>
              </div>

              <div className="text-4xl font-black text-foreground mb-8">${Number(product.price).toFixed(2)}</div>

              <p className="text-muted leading-relaxed text-lg mb-10">
                {product.description || "The piece that completes your silhouette. Crafted with precision and an obsession for detail, this essential piece embodies the LUMIN philosophy of modern minimalism."}
              </p>

              {/* Variant Selectors */}
              <div className="space-y-8 mb-12">
                <div>
                  <h3 className="font-bold text-foreground uppercase tracking-widest text-xs mb-4">Select Size</h3>
                  <div className="flex flex-wrap gap-3">
                    {["XS", "S", "M", "L", "XL"].map(size => (
                      <button 
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`w-14 h-14 rounded-2xl font-bold flex items-center justify-center transition border-2 ${
                          selectedSize === size 
                            ? "bg-foreground text-background border-foreground ring-4 ring-foreground/10" 
                            : "border-border text-muted hover:border-muted"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-foreground uppercase tracking-widest text-xs mb-4">Color</h3>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full border-4 border-foreground/10 shadow-sm" style={{ backgroundColor: product.color?.toLowerCase() || 'black' }}></div>
                    <span className="text-foreground/70 font-medium capitalize">{product.color || "Standard"}</span>
                  </div>
                </div>
              </div>

              {/* CTA Actions */}
              <div className="flex gap-4 mb-10">
                <button 
                  onClick={handleAddToCart}
                  disabled={added}
                  className={`flex-1 flex items-center justify-center gap-3 py-5 rounded-3xl font-black text-lg transition-all shadow-xl hover:-translate-y-1 active:scale-95 ${
                    added 
                    ? "bg-emerald-500 text-white shadow-emerald-500/20" 
                    : "bg-foreground text-background shadow-foreground/20 hover:opacity-90"
                  }`}
                >
                  {added ? <><Check size={24} /> Added to Cart</> : <><ShoppingBag size={24} /> Add to Cart</>}
                </button>
                <button className="p-5 bg-surface border border-border rounded-3xl text-muted hover:bg-surface-hover transition">
                  <Share2 size={24} />
                </button>
              </div>

              {/* Confidence Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 border-t border-border">
                <div className="flex items-center gap-3">
                  <Truck className="text-accent" size={20} />
                  <div>
                    <h4 className="text-[10px] font-black uppercase text-foreground">Complimentary</h4>
                    <p className="text-[10px] text-muted tracking-wide font-medium">Standard Shipping</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <RefreshCw className="text-accent" size={20} />
                  <div>
                    <h4 className="text-[10px] font-black uppercase text-foreground">30 Day</h4>
                    <p className="text-[10px] text-muted tracking-wide font-medium">Frictionless Returns</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <ShieldCheck className="text-accent" size={20} />
                  <div>
                    <h4 className="text-[10px] font-black uppercase text-foreground">Authentic</h4>
                    <p className="text-[10px] text-muted tracking-wide font-medium">Quality Guaranteed</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
