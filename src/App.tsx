import React from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { MobileStickyBar } from './components/MobileStickyBar';
import { HomeView } from './views/HomeView';
import { ShopView } from './views/ShopView';
import { ProductDetailView } from './views/ProductDetailView';
import { CheckoutView } from './views/CheckoutView';
import { TrackOrderView } from './views/TrackOrderView';
import { AboutHeritageView } from './views/AboutHeritageView';
import { CheckCircle2 } from 'lucide-react';

const AppContent: React.FC = () => {
  const { currentView, toastMessage } = useCart();

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDF7] text-[#29150B] relative pb-16 md:pb-0">
      {/* Toast Notification Alert */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 animate-in slide-in-from-top-4 fade-in duration-300">
          <div className="bg-[#881337] text-white text-xs font-semibold px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2 border border-amber-300">
            <CheckCircle2 className="w-4 h-4 text-amber-300 flex-shrink-0" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Global Header */}
      <Header />

      {/* Main View Area */}
      <main className="flex-1">
        {currentView === 'home' && <HomeView />}
        {currentView === 'shop' && <ShopView />}
        {currentView === 'product' && <ProductDetailView />}
        {currentView === 'checkout' && <CheckoutView />}
        {currentView === 'track' && <TrackOrderView />}
        {currentView === 'about' && <AboutHeritageView />}
      </main>

      {/* Slide-over Cart Drawer */}
      <CartDrawer />

      {/* Mobile Sticky Action Bar */}
      <MobileStickyBar />

      {/* Global Heritage Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}
