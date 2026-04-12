"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AccountDashboard() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/account/login");
    }
  }, [user, loading, router]);

  if (loading || !user) return null;

  return (
    <div className="bg-white min-h-screen flex flex-col font-sans">
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 pt-32 pb-24">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-8">My Account</h1>
        <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Welcome back, {user.name}</h2>
          <p className="text-slate-600 mb-8">Role: {user.role}</p>
          
          <button onClick={logout} className="bg-rose-100 text-rose-600 hover:bg-rose-200 font-bold px-6 py-2.5 rounded-full transition">
            Sign Out
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
