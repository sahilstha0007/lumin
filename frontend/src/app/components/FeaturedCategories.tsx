import Link from "next/link";
import Image from "next/image";

export default function FeaturedCategories() {
  return (
    <section className="py-28 max-w-7xl mx-auto px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-black text-foreground tracking-tight mb-4">Shop Your Style</h2>
        <p className="text-muted text-lg max-w-md mx-auto">Curated collections designed for every version of you.</p>
      </div>

      {/* Two large featured cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Link href="/category/women" className="group relative h-[500px] rounded-[32px] overflow-hidden cursor-pointer block">
          <Image 
            src="/images/category_women.png" 
            alt="Women's Collection" 
            fill 
            className="object-cover transition-transform duration-1000 group-hover:scale-105" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
          <div className="absolute bottom-8 left-8 right-8">
            <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-[10px] font-bold tracking-[0.2em] uppercase mb-4">Collection</span>
            <h3 className="text-4xl font-black text-white mb-2">Women</h3>
            <p className="text-white/60 text-sm mb-4">Effortless elegance for the modern woman.</p>
            <span className="text-amber-400 font-bold text-sm group-hover:translate-x-2 inline-block transition-transform">Explore &rarr;</span>
          </div>
        </Link>

        <Link href="/category/men" className="group relative h-[500px] rounded-[32px] overflow-hidden cursor-pointer block">
          <Image 
            src="/images/category_men.png" 
            alt="Men's Collection" 
            fill 
            className="object-cover transition-transform duration-1000 group-hover:scale-105" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
          <div className="absolute bottom-8 left-8 right-8">
            <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-[10px] font-bold tracking-[0.2em] uppercase mb-4">Collection</span>
            <h3 className="text-4xl font-black text-white mb-2">Men</h3>
            <p className="text-white/60 text-sm mb-4">Refined essentials for the modern man.</p>
            <span className="text-amber-400 font-bold text-sm group-hover:translate-x-2 inline-block transition-transform">Explore &rarr;</span>
          </div>
        </Link>
      </div>

      {/* Four smaller category cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { title: "Tops", href: "/category/tops", image: "https://images.unsplash.com/photo-1554568218-0f1715e72254?q=80&w=600&auto=format&fit=crop" },
          { title: "Denim", href: "/category/denim", image: "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=600&auto=format&fit=crop" },
          { title: "Outerwear", href: "/category/outerwear", image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=600&auto=format&fit=crop" },
          { title: "Accessories", href: "/category/accessories", image: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?q=80&w=600&auto=format&fit=crop" },
        ].map((cat, i) => (
          <Link href={cat.href} key={i} className="group relative h-56 rounded-2xl overflow-hidden block">
            <Image src={cat.image} alt={cat.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <h3 className="text-xl font-black text-white tracking-wide">{cat.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
