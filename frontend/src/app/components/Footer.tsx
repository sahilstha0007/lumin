import Link from "next/link";
import { Share2, Mail, Globe, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border pt-20 pb-10 font-sans">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          <div className="space-y-4">
            <h3 className="text-2xl font-extrabold tracking-tighter text-foreground mb-6">LUMIN</h3>
            <p className="text-muted text-sm leading-relaxed max-w-xs">
              Shine brighter with every outfit. Precision design and sustainable materials for those who illuminate every room they enter.
            </p>
            <div className="flex gap-4 pt-4">
              <a href="#" className="text-muted hover:text-accent transition"><Globe size={20}/></a>
              <a href="#" className="text-muted hover:text-accent transition"><MessageCircle size={20}/></a>
              <a href="#" className="text-muted hover:text-accent transition"><Share2 size={20}/></a>
              <a href="#" className="text-muted hover:text-accent transition"><Mail size={20}/></a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-foreground mb-6 uppercase tracking-wider text-sm">Shop</h4>
            <ul className="space-y-4 text-muted text-sm">
              <li><Link href="/category/women" className="hover:text-accent transition">Women&apos;s Collection</Link></li>
              <li><Link href="/category/men" className="hover:text-accent transition">Men&apos;s Collection</Link></li>
              <li><Link href="/category/accessories" className="hover:text-accent transition">Accessories</Link></li>
              <li><Link href="/sale" className="text-rose-500 hover:text-rose-600 font-medium transition">Sale Event</Link></li>
              <li><Link href="/lookbook" className="hover:text-accent transition">Lookbook</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-foreground mb-6 uppercase tracking-wider text-sm">Support</h4>
            <ul className="space-y-4 text-muted text-sm">
              <li><Link href="/faq" className="hover:text-accent transition">FAQ</Link></li>
              <li><Link href="/shipping" className="hover:text-accent transition">Shipping &amp; Returns</Link></li>
              <li><Link href="/contact" className="hover:text-accent transition">Contact Us</Link></li>
              <li><Link href="/track" className="hover:text-accent transition">Track Order</Link></li>
              <li><Link href="/size-guide" className="hover:text-accent transition">Size Guide</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-foreground mb-6 uppercase tracking-wider text-sm">Company</h4>
            <ul className="space-y-4 text-muted text-sm">
              <li><Link href="/about" className="hover:text-accent transition">About Us</Link></li>
              <li><Link href="/careers" className="hover:text-accent transition">Careers</Link></li>
              <li><Link href="/sustainability" className="hover:text-accent transition">Sustainability</Link></li>
              <li><Link href="/terms" className="hover:text-accent transition">Terms of Service</Link></li>
              <li><Link href="/privacy" className="hover:text-accent transition">Privacy Policy</Link></li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted text-sm">
            &copy; 2026 LUMIN Fashion Studio. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <div className="h-8 w-12 bg-surface rounded border border-border flex items-center justify-center text-[10px] font-bold text-muted">VISA</div>
            <div className="h-8 w-12 bg-surface rounded border border-border flex items-center justify-center text-[10px] font-bold text-muted">MC</div>
            <div className="h-8 w-12 bg-surface rounded border border-border flex items-center justify-center text-[10px] font-bold text-muted">AMEX</div>
            <div className="h-8 w-12 bg-surface rounded border border-border flex items-center justify-center text-[10px] font-bold text-muted">PAYPAL</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
