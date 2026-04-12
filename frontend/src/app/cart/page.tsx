"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";
import { useCart } from "../context/CartContext";
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShoppingCart } from "lucide-react";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();

  return (
    <div className="bg-background min-h-screen flex flex-col font-sans text-foreground">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight mb-12">My Selection</h1>

          {cart.length === 0 ? (
            <div className="text-center py-32 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
              <div className="flex justify-center mb-6">
                <div className="p-8 bg-white rounded-full shadow-sm">
                  <ShoppingBag size={48} className="text-slate-300" />
                </div>
              </div>
              <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
              <p className="text-slate-500 mb-8 max-w-sm mx-auto">
                Discover pieces that resonate with your style and add them here to continue your journey.
              </p>
              <Link href="/products" className="bg-slate-900 text-white font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition inline-block">
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              
              {/* Product List */}
              <div className="lg:col-span-2 space-y-8">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-6 pb-8 border-b border-slate-100 last:border-0 group">
                    <div className="relative w-32 h-40 bg-slate-100 rounded-2xl overflow-hidden shadow-sm flex-shrink-0">
                      <img 
                        src={item.image || "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=200&auto=format&fit=crop"} 
                        alt={item.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      />
                    </div>
                    
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-bold mb-1">{item.name}</h3>
                          <p className="text-slate-400 text-sm mb-4">
                            Size: <span className="text-slate-900 font-semibold">{item.size}</span> &bull; 
                            Color: <span className="text-slate-900 font-semibold capitalize">{item.color}</span>
                          </p>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="p-2 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>

                      <div className="flex justify-between items-end">
                        <div className="flex items-center gap-4 bg-slate-50 rounded-2xl p-1 border border-slate-100">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-10 h-10 flex items-center justify-center text-slate-600 hover:bg-white rounded-xl transition"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="font-bold text-slate-900 w-8 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-10 h-10 flex items-center justify-center text-slate-600 hover:bg-white rounded-xl transition"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-slate-400">Total</p>
                          <p className="text-xl font-black">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-slate-50 rounded-[32px] p-8 border border-slate-100 sticky top-32 shadow-sm">
                  <h2 className="text-xl font-black mb-8">Summary</h2>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between text-slate-500">
                      <span>Subtotal ({cartCount} items)</span>
                      <span className="text-slate-900 font-semibold">${cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-slate-500">
                      <span>Shipping</span>
                      <span className="text-emerald-500 font-bold uppercase text-xs tracking-widest mt-1">Complimentary</span>
                    </div>
                    <div className="flex justify-between text-slate-500">
                      <span>Estimated Tax</span>
                      <span className="text-slate-900 font-semibold">$0.00</span>
                    </div>
                    <div className="pt-4 border-t border-slate-200 flex justify-between">
                      <span className="text-slate-900 font-black text-lg">Order Total</span>
                      <span className="text-slate-900 font-black text-2xl">${cartTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  <Link href="/checkout" className="w-full flex items-center justify-center gap-3 bg-slate-900 text-white font-black py-5 rounded-3xl shadow-xl shadow-slate-900/10 hover:shadow-2xl hover:bg-slate-800 transition active:scale-[0.98] mb-4">
                    Checkout <ArrowRight size={20} />
                  </Link>

                  <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                    <span>Secure Payment Powered by</span>
                    <span className="text-slate-900">Lumin Guard</span>
                  </div>
                </div>
              </div>

            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
