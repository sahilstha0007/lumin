import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Checkout() {
  return (
    <div className="bg-white min-h-screen flex flex-col font-sans">
      <Navbar />
      <main className="flex-1 flex items-center justify-center pt-32 pb-24">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Secure Checkout</h1>
          <p className="text-slate-500">The gateway to complete your transaction awaits phase 3 implementation.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
