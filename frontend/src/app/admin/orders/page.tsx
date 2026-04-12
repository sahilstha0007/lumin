import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function Page() {
  return (
    <div className="bg-background min-h-screen flex flex-col font-sans">
      <Navbar />
      <main className="flex-1 flex items-center justify-center pt-32 pb-24">
        <div className="text-center max-w-2xl mx-auto px-6">
          <h1 className="text-4xl font-extrabold text-foreground mb-4">Order Management</h1>
          <p className="text-muted">This page is under construction. Check back soon.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
