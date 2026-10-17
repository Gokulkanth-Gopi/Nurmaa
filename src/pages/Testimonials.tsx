import React, { useState, useEffect } from 'react';
// removed next/head import (not a Next.js app)
import { motion, AnimatePresence } from 'framer-motion';
import client from '@/assets/images/client.png';
import testimonialBanner from '@/assets/images/testimonial.png';

const Testimonials: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [currentTestimonial, setCurrentTestimonial] = useState<number>(0);
  const [autoSlide, setAutoSlide] = useState<boolean>(true);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'CEO, Bloom Cosmetics',
      category: 'clients',
      content: 'Working with this team transformed our digital presence. Our sales increased by 140% within just three months of launching our new platform!',
      rating: 5,
      image: client, // <-- FIX: assign the imported client image here
      highlight: '140% sales growth'
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Marketing Director, TechNova',
      category: 'partners',
      content: 'The attention to detail and creative solutions provided were exceptional. They understood our vision perfectly and delivered beyond expectations.',
      rating: 5,
      image: '/images/testimonials/michael.jpg',
      highlight: 'Exceeded expectations'
    },
    {
      id: 3,
      name: 'Emma Rodriguez',
      role: 'Founder, Petal & Stem',
      category: 'clients',
      content: 'From concept to execution, the process was seamless. Our customers love the new experience and engagement has never been higher.',
      rating: 4,
      image: '/images/testimonials/emma.jpg',
      highlight: 'Seamless execution'
    },
    {
      id: 4,
      name: 'David Kim',
      role: 'Product Manager, Lumina',
      category: 'partners',
      content: 'Their innovative approach solved challenges we had struggled with for years. The collaboration was productive from day one.',
      rating: 5,
      image: '/images/testimonials/david.jpg',
      highlight: 'Solved key challenges'
    },
    {
      id: 5,
      name: 'Priya Patel',
      role: 'Creative Director, Hue Studios',
      category: 'clients',
      content: 'The team brought fresh ideas while respecting our brand identity. The final product was both beautiful and highly functional.',
      rating: 5,
      image: '/images/testimonials/priya.jpg',
      highlight: 'Brand-aligned design'
    },
    {
      id: 6,
      name: 'James Wilson',
      role: 'CTO, Nova Systems',
      category: 'partners',
      content: 'Technical excellence combined with outstanding communication. We completed the project ahead of schedule with zero compromises on quality.',
      rating: 4,
      image: '/images/testimonials/james.jpg',
      highlight: 'Ahead of schedule'
    }
  ];

  const filteredTestimonials = activeCategory === 'all' 
    ? testimonials 
    : testimonials.filter(t => t.category === activeCategory);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => 
      prev === filteredTestimonials.length - 1 ? 0 : prev + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => 
      prev === 0 ? filteredTestimonials.length - 1 : prev - 1
    );
  };

  // Auto-slide effect
  useEffect(() => {
    if (!autoSlide || isHovered) return;

    const interval = setInterval(() => {
      nextTestimonial();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentTestimonial, autoSlide, isHovered, filteredTestimonials.length]);

  return (
    <>
      {/* Set document title/meta for SPA (not using next/head) */}
      {typeof document !== 'undefined' && (() => {
        try {
          document.title = 'Testimonials | Our Happy Clients';
          let m = document.querySelector('meta[name="description"]');
          if (!m) {
            m = document.createElement('meta');
            m.setAttribute('name', 'description');
            document.head.appendChild(m);
          }
          m.setAttribute('content', 'Hear what our clients and partners say about working with us');
        } catch (e) {
          // ignore in non-browser environments
        }
      })()}

      <div className="min-h-screen bg-gradient-to-b from-[#EBEBD3] to-white">
        {/* Enhanced Hero Section with Testimonial Banner Background */}
        <section className="relative overflow-hidden py-24 sm:py-32 px-4 sm:px-6 testimonials-hero-mobile-mt bg-[#121769]">
          {/* Testimonial Banner Background Image */}
          <div 
            className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat z-0"
            style={{
              backgroundImage: `url(${testimonialBanner})`,
            }}
          />
          {/* Gradient Overlay for Brand Harmony & Text Legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#121769]/85 via-[#67246a]/75 to-[#121769]/85 z-0" />
          
          {/* Ambient Lighting Accents */}
          <div className="absolute inset-0 opacity-30 pointer-events-none z-0">
            <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-[#FE49AF] mix-blend-screen filter blur-3xl opacity-70 animate-blob"></div>
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#67246a] mix-blend-screen filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-0 left-1/2 w-64 h-64 rounded-full bg-[#121769] mix-blend-screen filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
          </div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-2xl xs:text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight"
            >
                Voices of Trust
             
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-base xs:text-lg sm:text-xl md:text-2xl text-[#EBEBD3] max-w-3xl mx-auto"
            >
              Discover what our clients and partners say about their experiences working with us.
            </motion.p>
            
            {/* Decorative elements */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-12 flex justify-center space-x-4"
            >
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-3 h-3 rounded-full bg-white opacity-30"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3
                  }}
                />
              ))}
            </motion.div>
          </div>
        </section>

        {/* Enhanced Testimonials Carousel */}
        <section className="py-4 sm:py-8">
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative">
              {/* Navigation Arrows - Enhanced */}
              <button 
                onClick={prevTestimonial}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 rounded-full bg-white shadow-lg items-center justify-center text-[#67246a] hover:bg-[#EBEBD3] transition-all duration-300 hidden md:flex group"
                aria-label="Previous testimonial"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button 
                onClick={nextTestimonial}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 rounded-full bg-white shadow-lg items-center justify-center text-[#67246a] hover:bg-[#EBEBD3] transition-all duration-300 hidden md:flex group"
                aria-label="Next testimonial"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Auto-slide toggle */}
              <div className="flex justify-center mb-6">
                <button
                  onClick={() => setAutoSlide(!autoSlide)}
                  className="flex items-center gap-1 text-sm text-[#67246a] hover:text-[#121769] transition-colors"
                >
                  <div className={`w-10 h-5 rounded-full flex items-center transition-colors duration-300 ${autoSlide ? 'bg-[#FE49AF]' : 'bg-gray-300'}`}>
                    <div className={`w-4 h-4 rounded-full bg-white shadow-md transform transition-transform duration-300 ${autoSlide ? 'translate-x-6' : 'translate-x-1'}`} />
                  </div>
                  Auto-slide {autoSlide ? 'ON' : 'OFF'}
                </button>
              </div>

              {/* Enhanced Testimonial Cards */}
              <div 
                className="relative h-[560px] xs:h-[520px] sm:h-[480px] md:h-[400px]"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <AnimatePresence mode="wait">
                  {filteredTestimonials.map((testimonial, index) => (
                    index === currentTestimonial && (
                      <motion.div
                        key={testimonial.id}
                        initial={{ opacity: 0, x: index > currentTestimonial ? 100 : -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: index < currentTestimonial ? 100 : -100 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0"
                      >
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-12 items-center">
                          {/* Testimonial Content */}
                          <div className="order-2 md:order-1">
                            <div className="bg-white p-4 xs:p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl shadow-xl relative overflow-hidden group">
                              {/* Decorative corner accent */}
                              <div className="absolute top-0 right-0 w-24 h-24 bg-[#FE49AF] opacity-5 rounded-bl-full transform translate-x-12 -translate-y-12"></div>
                              
                              <div className="absolute -top-6 -left-6 w-12 h-12 rounded-full bg-gradient-to-r from-[#FE49AF] to-[#67246a] flex items-center justify-center shadow-md">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                              </div>
                              
                              <p className="text-base xs:text-lg md:text-xl text-gray-700 mb-6 xs:mb-8 leading-relaxed relative">
                                <span className="absolute -left-2 -top-4 text-4xl xs:text-5xl text-[#EBEBD3] font-serif">"</span>
                                {testimonial.content}
                              </p>
                              
                              <div className="flex items-center justify-between flex-wrap gap-2 xs:gap-4">
                                <div>
                                  <h3 className="text-base xs:text-lg md:text-xl font-bold text-gray-900">{testimonial.name}</h3>
                                  <p className="text-xs xs:text-sm text-[#67246a]">{testimonial.role}</p>
                                </div>
                                <div className="flex items-center flex-wrap gap-2 xs:gap-4">
                                  <div className="flex mr-2 xs:mr-4">
                                    {[...Array(5)].map((_, i) => (
                                      <svg
                                        key={i}
                                        xmlns="http://www.w3.org/2000/svg"
                                        className={`h-4 w-4 xs:h-5 xs:w-5 ${i < testimonial.rating ? 'text-amber-400' : 'text-gray-300'}`}
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                      >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                      </svg>
                                    ))}
                                  </div>
                                  <span className="px-2 py-1 rounded-full bg-[#EBEBD3] text-[#67246a] text-xs font-medium">
                                    {testimonial.highlight}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* Testimonial Image */}
                          <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="order-1 md:order-2 flex justify-center"
                          >
                            <div className="relative group">
                              <div className="w-32 h-32 xs:w-40 xs:h-40 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white shadow-2xl relative">
                                <img
                                  src={testimonial.image || client}
                                  alt={testimonial.name}
                                  onError={(e) => {
                                    e.currentTarget.onerror = null;
                                    e.currentTarget.src = client;
                                  }}
                                  className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                              </div>
                              <div className="absolute -bottom-4 -right-4 xs:-bottom-6 xs:-right-6 bg-gradient-to-r from-[#FE49AF] to-[#67246a] text-white px-3 xs:px-4 py-1 xs:py-2 rounded-full shadow-lg group-hover:scale-105 transition-transform duration-300 text-xs xs:text-sm">
                                {testimonial.category === 'clients' ? 'Client' : 'Partner'}
                              </div>
                            </div>
                          </motion.div>
                        </div>
                      </motion.div>
                    )
                  ))}
                </AnimatePresence>
              </div>
              {/* Mobile Navigation Dots */}
              <div className="flex justify-center mt-8 xs:mt-12 space-x-2 md:hidden">
                {filteredTestimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 xs:w-4 xs:h-4 rounded-full transition-all duration-300 relative ${
                      index === currentTestimonial ? 'bg-gradient-to-r from-[#FE49AF] to-[#67246a] w-6 xs:w-8' : 'bg-[#EBEBD3]'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  >
                    {index === currentTestimonial && (
                      <motion.span 
                        className="absolute inset-0 rounded-full bg-gradient-to-r from-[#FE49AF] to-[#67246a]"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Grid Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-16"
            >
              More <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FE49AF] to-[#67246a]">Testimonials</span>
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className={`h-full p-6 rounded-2xl shadow-md transition-all duration-300 hover:shadow-xl ${
                    index % 3 === 0 ? 'bg-gradient-to-br from-[#EBEBD3] to-white' : 
                    index % 3 === 1 ? 'bg-gradient-to-br from-[#EBEBD3]/50 to-white' : 
                    'bg-gradient-to-br from-[#EBEBD3]/30 to-white'
                  }`}>
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#FE49AF] to-[#67246a] flex items-center justify-center text-white font-bold mr-4">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">{testimonial.name}</h3>
                        <p className="text-sm text-[#67246a]">{testimonial.role}</p>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 mb-4 relative">
                      <span className="absolute -left-2 -top-2 text-3xl text-[#EBEBD3] font-serif">"</span>
                      {testimonial.content.length > 120 
                        ? `${testimonial.content.substring(0, 120)}...` 
                        : testimonial.content}
                    </p>
                    
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            xmlns="http://www.w3.org/2000/svg"
                            className={`h-5 w-5 ${i < testimonial.rating ? 'text-amber-400' : 'text-gray-300'}`}
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        testimonial.category === 'clients' 
                          ? 'bg-[#EBEBD3] text-[#67246a]' 
                          : 'bg-[#121769]/10 text-[#121769]'
                      }`}>
                        {testimonial.category === 'clients' ? 'Client' : 'Partner'}
                      </span>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <span className="text-sm font-medium text-[#FE49AF]">
                        {testimonial.highlight}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced Stats Section */}
        <section className="py-16 bg-gradient-to-r from-[#67246a] via-[#FE49AF] to-[#121769] text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[url('/images/dot-pattern.png')]"></div>
          </div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              {[
          { value: 98, suffix: '%', label: 'Client Satisfaction', description: 'Based on post-project surveys', decimals: 0 },
          { value: 150, suffix: '+', label: 'Projects Completed', description: 'Across various industries', decimals: 0 },
          { value: 5.0, suffix: '', label: 'Average Rating', description: 'From all client reviews', decimals: 1 }
              ].map((stat, index) => {
          const [count, setCount] = React.useState(0);
          const ref = React.useRef<HTMLDivElement>(null);
          const [hasAnimated, setHasAnimated] = React.useState(false);

          React.useEffect(() => {
            function handleScroll() {
              if (!ref.current || hasAnimated) return;
              const rect = ref.current.getBoundingClientRect();
              if (rect.top < window.innerHeight && rect.bottom > 0) {
                let start = 0;
                let end = stat.value;
                let duration = 1500; // ms
                let startTimestamp: number | null = null;

                function step(timestamp: number) {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const current = start + (end - start) * progress;
            setCount(Number(current.toFixed(stat.decimals)));
            if (progress < 1) {
              requestAnimationFrame(step);
            }
                }

                requestAnimationFrame(step);
                setHasAnimated(true);
              }
            }

            window.addEventListener('scroll', handleScroll);
            handleScroll(); // in case already in view

            return () => window.removeEventListener('scroll', handleScroll);
            // eslint-disable-next-line
          }, [hasAnimated]);

          return (
            <motion.div 
              key={stat.label}
              ref={ref}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-6"
            >
              <motion.div
                className="text-4xl md:text-5xl font-bold mb-4"
                animate={{
            scale: [1, 1.05, 1],
                }}
                transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.3
                }}
              >
                {count}
                {stat.suffix}
              </motion.div>
              <h3 className="text-xl font-medium">{stat.label}</h3>
              <p className="text-[#EBEBD3] mt-2">{stat.description}</p>
            </motion.div>
          );
              })}
            </div>
          </div>
        </section>

        {/* Enhanced CTA Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white p-8 md:p-12 rounded-3xl shadow-xl relative overflow-hidden"
            >
              {/* Decorative elements */}
              <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-[#EBEBD3] opacity-20 blur-3xl"></div>
              <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-[#121769]/20 blur-3xl"></div>
              
              <div className="relative z-10 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Ready to join our happy clients?
                </h2>
                <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                  Let's create something amazing together. Get in touch with our team today to discuss your project.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <motion.a
                    href="/contact"
                    className="px-8 py-4 rounded-full bg-gradient-to-r from-[#67246a] to-[#121769] text-white font-medium shadow-lg hover:shadow-xl transition-all relative overflow-hidden group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="relative z-10">Contact Us</span>
                    <span className="absolute inset-0 bg-gradient-to-r from-[#67246a] to-[#FE49AF] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  </motion.a>
                  <motion.a
                    href="/portfolio"
                    className="px-8 py-4 rounded-full bg-white text-[#67246a] font-medium border-2 border-[#EBEBD3] hover:bg-[#EBEBD3] transition-all relative overflow-hidden group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="relative z-10">View Our Work</span>
                    <span className="absolute inset-0 bg-[#EBEBD3] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>

      <style>
        {`
          @keyframes blob {
            0% {
              transform: translate(0px, 0px) scale(1);
            }
            33% {
              transform: translate(30px, -50px) scale(1.1);
            }
            66% {
              transform: translate(-20px, 20px) scale(0.9);
            }
            100% {
              transform: translate(0px, 0px) scale(1);
            }
          }
          .animate-blob {
            animation: blob 7s infinite;
          }
          .animation-delay-2000 {
            animation-delay: 2s;
          }
          .animation-delay-4000 {
            animation-delay: 4s;
          }
          @media (max-width: 640px) {
            .testimonials-hero-mobile-mt {
              margin-top: 4rem !important;
            }
          }
        `}
      </style>
    </>
  );
};

export default Testimonials;