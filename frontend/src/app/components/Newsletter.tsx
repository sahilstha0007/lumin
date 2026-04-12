"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
      setTimeout(() => setSubmitted(false), 4000);
    }
  };

  return (
    <section className="py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="relative bg-foreground rounded-[40px] p-12 md:p-20 overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
          
          <div className="relative z-10 max-w-2xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-black text-background leading-tight mb-4">
              Join the LUMIN World
            </h2>
            <p className="text-background/50 text-lg mb-10">
              Be the first to discover new collections, get exclusive offers, and receive style inspiration straight to your inbox.
            </p>
            
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <input 
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="flex-1 px-6 py-4 rounded-full bg-background/10 border border-background/20 text-background placeholder:text-background/30 focus:ring-2 focus:ring-accent focus:border-accent outline-none transition text-sm"
              />
              <button 
                type="submit"
                disabled={submitted}
                className={`px-8 py-4 rounded-full font-black text-sm flex items-center justify-center gap-2 transition-all hover:-translate-y-1 ${
                  submitted 
                    ? "bg-emerald-500 text-white" 
                    : "bg-accent text-foreground shadow-xl shadow-accent/20 hover:shadow-2xl"
                }`}
              >
                {submitted ? <><Check size={18} /> Subscribed!</> : <>Subscribe <ArrowRight size={16} /></>}
              </button>
            </form>
            
            <p className="text-background/30 text-xs mt-6">No spam, ever. Unsubscribe anytime.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
