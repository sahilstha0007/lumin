import Link from "next/link";
import Image from "next/image";

export default function HeroBanner() {
  return (
    <div className="relative h-screen w-full flex items-center justify-start bg-slate-900 overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        <Image 
          src="/images/hero_banner_fashion_1775929680075.png" 
          alt="LUMIN Fall Collection Hero"
          fill
          priority
          className="object-cover object-center opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full mb-8 border border-white/20">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
            <span className="text-white/90 text-xs font-bold tracking-[0.2em] uppercase">Fall Collection 2026</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black text-white leading-[0.9] mb-8 tracking-tight">
            Shine<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-500">Brighter.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-white/70 mb-12 max-w-lg leading-relaxed">
            Shine brighter with every outfit. Discover precision tailoring and modern essentials designed to illuminate your everyday style.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/products" className="group bg-white text-slate-900 hover:bg-amber-50 font-black px-10 py-5 rounded-full transition-all shadow-2xl shadow-white/10 hover:-translate-y-1 text-center">
              Shop the Collection
              <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">&rarr;</span>
            </Link>
            <Link href="/about-us" className="bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 font-bold px-10 py-5 rounded-full transition-all hover:-translate-y-1 text-center">
              Our Story
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40">
        <span className="text-[10px] tracking-[0.3em] uppercase font-bold">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-white/40 to-transparent animate-pulse"></div>
      </div>
    </div>
  );
}
