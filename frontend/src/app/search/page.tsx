"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function SearchContent() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";
  return (
    <div className="text-center">
      <h1 className="text-4xl font-extrabold text-foreground mb-4">Search Results</h1>
      <p className="text-muted">{q ? `Showing results for "${q}"` : "Enter a search term to find products."}</p>
    </div>
  );
}

export default function SearchPage() {
  return (
    <div className="bg-background min-h-screen flex flex-col font-sans">
      <Navbar />
      <main className="flex-1 flex items-center justify-center pt-32 pb-24">
        <Suspense fallback={<div className="text-muted">Loading...</div>}>
          <SearchContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
