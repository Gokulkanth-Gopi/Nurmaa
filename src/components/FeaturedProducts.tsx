// FeaturedProducts.tsx
import React, { useRef, useState, lazy, Suspense, useEffect } from 'react';
import { Link } from 'react-router-dom';
const ProductCard = lazy(() => import('@/components/ProductCard'));
import { Product } from '@/lib/types';
import { motion, useInView } from 'framer-motion';
import { FaFire } from 'react-icons/fa';
import bg1 from '@/assets/images/feature.png';
import bg2 from '@/assets/images/bg2.png';
import bg3 from '@/assets/images/bg3.png';
// product images as imports for bundler optimization
import granolaImg from '@/assets/images/Nurmaa product image/granola.webp';
import sproutedRagiImg from '@/assets/images/Nurmaa product image/Sprouted Ragi/Sprouted Ragi 500gm.webp';
import kambuImg from '@/assets/images/Nurmaa product image/Kambu Puttu Mix.webp';
import ceramideImg from '@/assets/images/Nurmaa product image/Ceramide Moisturizer.webp';
 // Import your light background image

const featuredProducts: Product[] = [
  {
    id: '15',
    name: 'Ceramide Moisturizer',
    category: 'skincare',
    description: 'Our Ceramide Moisturizer restores skin barrier and locks in moisture with ceramides and shea butter for smoother, hydrated skin.',
    price: 320,
    image: ceramideImg,
    rating: 4.6,
    featured: true
  },
  {
    id: '2',
    name: 'Sprouted Ragi Powder',
    category: 'food',
    description: "Sprouted Ragi Powder – Naturally Nutritious & Wholesome Carefully prepared from 100% whole ragi grains, our Sprouted Ragi Powder is a powerhouse of nutrition. The grains are traditionally sprouted to enhance bioavailability, gently dried, and finely milled to preserve their natural goodness. Rich in calcium, iron, and dietary fiber, sprouted ragi supports strong bones, aids digestion, and helps maintain healthy blood sugar levels. This gluten-free superfood is perfect for porridge, dosa, health drinks, or baking. Ideal for growing children, fitness enthusiasts, and anyone seeking a healthy alternative to refined flours.",
    price: 80,
    image: sproutedRagiImg,
    rating: 5.0,
    featured: true
  },
  {
    id: '3',
    name: 'Kambu Puttu Mix',
    category: 'food',
    description: "Rekindle the flavors of your grandmother’s kitchen with our Kambu Puttu Mix, made from premium pearl millet (kambu) blended with a touch of cardamom and natural salt. This wholesome puttu mix is stone-ground and prepared in small batches to retain its natural aroma, fiber, and nutritional richness. Just steam the mix and enjoy it hot with jaggery, grated coconut, or a drizzle of ghee for a delicious and satisfying meal. It’s a perfect, quick-fix breakfast or evening tiffin that’s both filling and gut-friendly.",
    price: 110,
    image: kambuImg,
    rating: 4.6,
    featured: true
  }
];

const FeaturedProducts: React.FC<{ onQuickPurchase?: (product: Product) => void }> = ({ onQuickPurchase }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.1 });
  const [mobileIndex, setMobileIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const autoPlayRef = useRef<number | null>(null);
  const resumeTimeoutRef = useRef<number | null>(null);
  const isMountedRef = useRef(true);

  // autoplay only on mobile (max-width: 640px)
  useEffect(() => {
    isMountedRef.current = true;
    const mq = typeof window !== 'undefined' ? window.matchMedia('(max-width: 640px)') : null;

    function startAutoPlay() {
      if (autoPlayRef.current) return;
      autoPlayRef.current = window.setInterval(() => {
        setMobileIndex((prev) => (prev + 1) % featuredProducts.length);
      }, 4000);
    }

    function stopAutoPlay() {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
        autoPlayRef.current = null;
      }
    }

    function handleVisibility() {
      if (document.hidden) stopAutoPlay();
      else if (!isPaused && mq && mq.matches) startAutoPlay();
    }

    if (mq && mq.matches && !isPaused) startAutoPlay();

    const mqListener = (e: MediaQueryListEvent) => {
      if (e.matches && !isPaused) startAutoPlay();
      else stopAutoPlay();
    };

    if (mq && 'addEventListener' in mq) mq.addEventListener('change', mqListener);
    else if (mq && 'addListener' in mq) (mq as any).addListener(mqListener);

    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      isMountedRef.current = false;
      stopAutoPlay();
      if (mq && 'removeEventListener' in mq) mq.removeEventListener('change', mqListener);
      else if (mq && 'removeListener' in mq) (mq as any).removeListener(mqListener);
      document.removeEventListener('visibilitychange', handleVisibility);
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    };
  }, [isPaused]);

  // Mobile swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
    // pause autoplay while interacting
    setIsPaused(true);
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = null;
    }
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
      resumeTimeoutRef.current = null;
    }
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX !== null) {
      const diffX = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(diffX) > 40) {
        if (diffX > 0) setMobileIndex((prev) => (prev - 1 + featuredProducts.length) % featuredProducts.length);
        else setMobileIndex((prev) => (prev + 1) % featuredProducts.length);
      }
    }
    setTouchStartX(null);
    // resume autoplay after short idle
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = window.setTimeout(() => {
      setIsPaused(false);
    }, 3000);
  };

  return (
    <motion.section 
      ref={ref}
      className="relative py-16 md:py-24"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      style={{
          backgroundImage: `url(${bg1})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'scroll', // changed from fixed to scroll for better performance
          backgroundRepeat: 'no-repeat'
        }}
    >
      {/* Semi-transparent overlay to ensure text readability */}
      <div 
        className="absolute inset-0 opacity-50" 
        style={{ background: 'linear-gradient(to right, #1b024b, #4a0124)' }}
      ></div>
      <div className="relative z-10 max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#EBEBD3] mb-3 sm:mb-4">
            Featured Products
          </h2>
          <p className="text-base sm:text-lg text-[#ffffff] max-w-2xl mx-auto">
            Discover our premium selection of natural products
          </p>
        </div>
        {/* Desktop grid */}
        <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <Suspense fallback={
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="bg-[#fff] rounded-xl p-4 animate-pulse h-64" />
              ))}
            </div>
          }>
            {featuredProducts.map((product) => (
              <ProductCard 
                key={product.id}
                product={product} 
                onQuickPurchase={onQuickPurchase}
              />
            ))}
          </Suspense>
        </div>
        {/* Mobile slider */}
        <div className="sm:hidden w-full flex flex-col items-center">
          <div
            className="w-full flex justify-center items-center relative"
            style={{ minHeight: 280 }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div className="w-full max-w-[280px] mx-auto">
              <Suspense fallback={<div className="bg-white rounded-xl p-4 animate-pulse h-64" />}>
                <ProductCard 
                  product={featuredProducts[mobileIndex]} 
                  onQuickPurchase={onQuickPurchase}
                />
              </Suspense>
            </div>
            {/* Slide dots */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2 mt-2">
              {featuredProducts.map((_, idx) => (
                <button
                  key={idx}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${mobileIndex === idx ? 'bg-[#EBEBD3]' : 'bg-[#EBEBD3] opacity-50'}`}
                  onClick={() => setMobileIndex(idx)}
                  aria-label={`Go to slide ${idx+1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
     
    </motion.section>
  );
};

export default FeaturedProducts;
