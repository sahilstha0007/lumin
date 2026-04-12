import Image from "next/image";
import Link from "next/link";

export default function BrandSpotlight() {
  return (
    <section className="py-28 bg-surface">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-[4/5] rounded-[40px] overflow-hidden shadow-2xl">
            <Image 
              src="/images/lookbook_brand_1775929699853.png" 
              alt="The LUMIN Lookbook" 
              fill 
              className="object-cover" 
            />
          </div>
          
          <div className="lg:pl-8">
            <span className="text-accent text-xs font-black tracking-[0.3em] uppercase mb-6 block">The LUMIN Ethos</span>
            <h2 className="text-4xl md:text-5xl font-black text-foreground leading-[1.1] mb-8 tracking-tight">
              Where Precision<br/>Meets Purpose.
            </h2>
            <p className="text-muted text-lg leading-relaxed mb-6">
              Every garment we create begins with a single question: does this deserve a place in someone&apos;s story? We partner exclusively with artisans who share our obsession with detail.
            </p>
            <p className="text-muted text-lg leading-relaxed mb-10">
              From Italian mills to Japanese dye houses, our materials are sourced with intention — because sustainability isn&apos;t a feature, it&apos;s a foundation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/about-us" className="bg-foreground text-background font-black px-8 py-4 rounded-full hover:-translate-y-1 transition-all shadow-lg text-center">
                Our Story
              </Link>
              <Link href="/products" className="border-2 border-border text-foreground font-bold px-8 py-4 rounded-full hover:bg-surface-hover transition-all text-center">
                View Lookbook
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
