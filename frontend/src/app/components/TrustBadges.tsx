import { Truck, RefreshCw, ShieldCheck, Leaf } from "lucide-react";

const badges = [
  { icon: Truck, title: "Free Shipping", desc: "On orders over $150" },
  { icon: RefreshCw, title: "30-Day Returns", desc: "Hassle-free exchanges" },
  { icon: ShieldCheck, title: "Secure Payment", desc: "Encrypted transactions" },
  { icon: Leaf, title: "Sustainable", desc: "Ethically sourced materials" },
];

export default function TrustBadges() {
  return (
    <section className="py-20 border-y border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {badges.map((badge, i) => (
            <div key={i} className="flex flex-col items-center text-center group">
              <div className="w-16 h-16 rounded-2xl bg-surface flex items-center justify-center mb-4 group-hover:bg-accent/10 transition-colors duration-300">
                <badge.icon className="text-accent" size={28} />
              </div>
              <h3 className="font-black text-foreground text-sm mb-1">{badge.title}</h3>
              <p className="text-muted text-xs">{badge.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
