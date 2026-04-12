"use client";

import Link from "next/link";
import { Search, ShoppingCart, User, Menu, X, Sun, Moon, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useTheme } from "../context/ThemeContext";

const NAV_LINKS = [
  { label: "Women", href: "/category/women" },
  { label: "Men", href: "/category/men" },
  { label: "Kids", href: "/category/kids" },
  { label: "New In", href: "/products" },
];

export default function Navbar({ transparent = false }: { transparent?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { user } = useAuth();
  const { cartCount } = useCart();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // Navbar is only see-through when `transparent` prop is true AND user hasn't scrolled
  const isTransparent = transparent && !scrolled;

  return (
    <>
      {/* ─── Main Nav Bar ─── */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${
        isTransparent
          ? "bg-transparent py-5" 
          : "bg-background/85 backdrop-blur-xl shadow-sm border-b border-border py-3"
      }`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
          
          {/* Left: Hamburger (mobile) + Desktop Links */}
          <div className="flex items-center gap-8">
            <button 
              onClick={() => setMobileOpen(true)}
              className={`lg:hidden transition ${!isTransparent ? "text-foreground" : "text-white drop-shadow-md"} hover:text-accent`}
            >
              <Menu size={24} />
            </button>

            <div className="hidden lg:flex items-center gap-8 font-medium text-sm tracking-wide uppercase">
              {NAV_LINKS.map(link => (
                <Link 
                  key={link.href}
                  href={link.href} 
                  className={`relative py-1 transition group ${
                    !isTransparent 
                      ? "text-foreground/70 hover:text-foreground" 
                      : "text-white/80 hover:text-white drop-shadow-md"
                  }`}
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></span>
                </Link>
              ))}
            </div>
          </div>

          {/* Center: Logo */}
          <Link href="/" className={`text-2xl md:text-3xl font-black tracking-[-0.08em] transition ${
            !isTransparent ? "text-foreground" : "text-white drop-shadow-md"
          }`}>
            LUMIN
          </Link>

          {/* Right: Icons */}
          <div className={`flex items-center gap-2 sm:gap-4 ${!isTransparent ? "text-foreground" : "text-white drop-shadow-md"}`}>
            
            {/* Search */}
            <button 
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 rounded-full hover:bg-foreground/5 hover:text-accent transition"
            >
              <Search size={18} />
            </button>

            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-foreground/5 hover:text-accent transition"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* User */}
            {user ? (
              <Link 
                href={user.role === "admin" ? "/admin" : "/account"} 
                className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-foreground/5 hover:bg-foreground/10 text-sm font-bold transition"
              >
                <div className="w-6 h-6 rounded-full bg-accent/20 text-accent flex items-center justify-center text-xs font-black">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="max-w-[80px] truncate">{user.name.split(" ")[0]}</span>
              </Link>
            ) : (
              <Link href="/account/login" className="p-2 rounded-full hover:bg-foreground/5 hover:text-accent transition">
                <User size={18} />
              </Link>
            )}

            {/* Cart */}
            <Link href="/cart" className="p-2 rounded-full hover:bg-foreground/5 hover:text-accent transition relative">
              <ShoppingCart size={18} />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-accent text-white text-[9px] font-black min-w-[18px] h-[18px] flex items-center justify-center rounded-full shadow-md">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* ─── Expandable Search Bar ─── */}
        <div className={`overflow-hidden transition-all duration-300 ${searchOpen ? "max-h-20 mt-4" : "max-h-0"}`}>
          <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={16} />
              <input 
                type="text" 
                placeholder="Search the collection..."
                className="w-full bg-surface border border-border rounded-2xl pl-11 pr-4 py-3 text-sm text-foreground placeholder:text-muted focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition"
                autoFocus={searchOpen}
              />
            </div>
          </div>
        </div>
      </nav>

      {/* ─── Mobile Drawer Overlay ─── */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] transition-opacity duration-300 ${
          mobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileOpen(false)}
      />

      {/* ─── Mobile Drawer ─── */}
      <div className={`fixed top-0 left-0 h-full w-80 bg-background z-[70] shadow-2xl transition-transform duration-500 ease-out ${
        mobileOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <Link href="/" className="text-2xl font-black tracking-[-0.08em] text-foreground" onClick={() => setMobileOpen(false)}>
              LUMIN
            </Link>
            <button onClick={() => setMobileOpen(false)} className="p-2 rounded-full hover:bg-surface text-muted hover:text-foreground transition">
              <X size={20} />
            </button>
          </div>

          {/* Links */}
          <div className="flex-1 py-6 overflow-y-auto">
            {NAV_LINKS.map(link => (
              <Link 
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-between px-6 py-4 text-lg font-bold text-foreground hover:bg-surface transition"
              >
                {link.label}
                <ChevronRight size={18} className="text-muted" />
              </Link>
            ))}

            <hr className="my-4 border-border mx-6" />

            {user ? (
              <Link 
                href={user.role === "admin" ? "/admin" : "/account"}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 px-6 py-4 text-foreground font-bold hover:bg-surface transition"
              >
                <div className="w-10 h-10 rounded-full bg-accent/20 text-accent flex items-center justify-center font-black">
                  {user.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm">{user.name}</p>
                  <p className="text-xs text-muted capitalize">{user.role}</p>
                </div>
              </Link>
            ) : (
              <>
                <Link href="/account/login" onClick={() => setMobileOpen(false)} className="flex items-center justify-between px-6 py-4 text-foreground font-bold hover:bg-surface transition">
                  Sign In <ChevronRight size={18} className="text-muted" />
                </Link>
                <Link href="/account/register" onClick={() => setMobileOpen(false)} className="flex items-center justify-between px-6 py-4 text-foreground font-bold hover:bg-surface transition">
                  Create Account <ChevronRight size={18} className="text-muted" />
                </Link>
              </>
            )}
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-border">
            <button 
              onClick={toggleTheme}
              className="w-full flex items-center justify-between px-4 py-3 bg-surface rounded-2xl text-foreground font-medium hover:bg-surface-hover transition"
            >
              <span className="text-sm">{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
