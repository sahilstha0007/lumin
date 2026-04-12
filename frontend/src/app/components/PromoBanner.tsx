import Image from "next/image";
import Link from "next/link";

export default function PromoBanner() {
  return (
    <section className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        <div className="relative rounded-[40px] overflow-hidden min-h-[400px] flex items-center">
          <Image 
            src="/images/promo_banner.png" 
            alt="Seasonal Essentials" 
            fill 
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-amber-900/80 to-amber-700/40"></div>
          
          <div className="relative z-10 p-12 md:p-20 max-w-xl">
            <span className="text-amber-200 text-xs font-black tracking-[0.3em] uppercase mb-4 block">Limited Time</span>
            <h2 className="text-4xl md:text-6xl font-black text-white leading-[0.95] mb-6">
              The Essentials<br/>Edit.
            </h2>
            <p className="text-white/70 text-lg mb-8 leading-relaxed">
              Our most-loved everyday pieces, thoughtfully bundled at an exclusive price.
            </p>
            <Link href="/products" className="inline-flex items-center gap-2 bg-white text-slate-900 font-black px-8 py-4 rounded-full hover:-translate-y-1 transition-all shadow-xl">
              Shop Essentials <span>&rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
