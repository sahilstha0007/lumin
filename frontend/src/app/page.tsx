import Navbar from "./components/Navbar";
import HeroBanner from "./components/HeroBanner";
import FeaturedCategories from "./components/FeaturedCategories";
import ProductShelf from "./components/ProductShelf";
import BrandSpotlight from "./components/BrandSpotlight";
import PromoBanner from "./components/PromoBanner";
import Newsletter from "./components/Newsletter";
import TrustBadges from "./components/TrustBadges";
import Footer from "./components/Footer";

export default function Storefront() {
  return (
    <div className="bg-background min-h-screen font-sans overflow-x-hidden">
      <Navbar transparent />
      <main>
        <HeroBanner />
        <Marquee />
        <FeaturedCategories />
        <ProductShelf title="Trending Right Now" endpoint="/products" />
        <PromoBanner />
        <BrandSpotlight />
        <ProductShelf title="New Arrivals" endpoint="/products" />
        <TrustBadges />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}

function Marquee() {
  return (
    <div className="bg-foreground text-background overflow-hidden py-3">
      <div className="animate-marquee whitespace-nowrap flex gap-12 text-xs font-bold tracking-[0.3em] uppercase">
        {[...Array(3)].map((_, i) => (
          <span key={i} className="flex gap-12">
            <span>Free Shipping On Orders Over $150</span>
            <span className="text-accent">★</span>
            <span>New Fall Collection Just Dropped</span>
            <span className="text-accent">★</span>
            <span>Sustainable Materials — Always</span>
            <span className="text-accent">★</span>
            <span>30-Day Hassle-Free Returns</span>
            <span className="text-accent">★</span>
          </span>
        ))}
      </div>
    </div>
  );
}
