import React, { useState, useEffect } from 'react';
import clientImg from '@/assets/images/client.png';
import { motion, AnimatePresence } from 'framer-motion';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  image: string;
  text: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    role: 'Skincare Enthusiast',
    image: clientImg,
    text: 'The vitamin C serum transformed my skin in just two weeks! My complexion is brighter and more even than ever before.',
    rating: 5
  },
  {
    id: '2',
    name: 'Sam Wilson',
    role: 'Organic Lifestyle Blogger',
    image: clientImg,
    text: 'Finally found a brand that aligns with my values. The ingredients are clean and the results speak for themselves.',
    rating: 5
  },
  {
    id: '3',
    name: 'Taylor Chen',
    role: 'Beauty Editor',
    image: clientImg,
    text: 'As someone who tests hundreds of products, I can confidently say these formulations are exceptional.',
    rating: 4
  },
  {
    id: '4',
    name: 'Jordan Smith',
    role: 'Dermatologist',
    image: clientImg,
    text: 'I recommend these products to my patients because they combine clinical efficacy with natural ingredients.',
    rating: 5
  }
];

const COLORS = {
  primary: '#121769',
  accent: '#67246A',
  highlight: '#FE49AF',
  bg: '#EBEBD3',
};

const TestimonialCard = ({ testimonial, active }: { testimonial: Testimonial, active: boolean }) => {
  return (
    <motion.div
      className={`relative p-8 rounded-2xl ${active ? 'bg-white shadow-2xl' : 'bg-[#EBEBD3] shadow-md'}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: active ? 1 : 0.6,
        y: active ? 0 : 10,
        scale: active ? 1 : 0.95
      }}
      transition={{ duration: 0.5 }}
    >
      {/* Floating bubbles decoration */}
      {active && (
        <>
          <motion.div 
            className="absolute -top-3 -left-3 w-6 h-6 rounded-full"
            style={{ background: COLORS.highlight, opacity: 0.3 }}
            animate={{
              y: [0, -5, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 4,
              repeat: Infinity
            }}
          />
          <motion.div 
            className="absolute -bottom-2 -right-2 w-4 h-4 rounded-full"
            style={{ background: COLORS.primary, opacity: 0.3 }}
            animate={{
              y: [0, 5, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: 1
            }}
          />
        </>
      )}
      <div className="flex items-center mb-6">
        <motion.div 
          className="relative mr-4"
          whileHover={{ rotate: 2 }}
        >
          <img 
            src={testimonial.image} 
            alt={testimonial.name}
            className="w-14 h-14 rounded-full object-cover border-2"
            style={{ borderColor: COLORS.bg }}
          />
          <motion.div 
            className="absolute -bottom-1 -right-1 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
            style={{ background: COLORS.highlight }}
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            {testimonial.rating}
          </motion.div>
        </motion.div>
        <div>
          <h4 className="font-bold text-lg" style={{ color: COLORS.primary }}>{testimonial.name}</h4>
          <p className="text-sm" style={{ color: COLORS.accent }}>{testimonial.role}</p>
        </div>
      </div>
      <motion.p 
        className="mb-6 relative pl-6"
        style={{ color: COLORS.primary }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <svg 
          className="absolute top-0 left-0 h-5 w-5"
          style={{ color: COLORS.highlight, opacity: 0.5 }}
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
        {testimonial.text}
      </motion.p>
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <motion.svg
            key={i}
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            style={{ color: i < testimonial.rating ? COLORS.highlight : COLORS.bg }}
            viewBox="0 0 20 20"
            fill="currentColor"
            whileHover={{ scale: 1.3 }}
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </motion.svg>
        ))}
      </div>
    </motion.div>
  );
};

const TestimonialsGrid = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 px-4" style={{ background: `linear-gradient(to bottom, ${COLORS.bg}, #fff)` }}>
      <div className="max-w-6xl mx-auto">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
          
              Real People,
          
              Real Results
            
          </h2>
          <p className="max-w-2xl mx-auto" style={{ color: COLORS.accent }}>
            Don't just take our word for it—here's what our community has to say
          </p>
        </motion.div>

        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              onClick={() => setActiveIndex(index)}
              whileHover={{ y: -5 }}
              className="cursor-pointer"
            >
              <div className="flex items-center p-4 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-medium">{testimonial.name}</h4>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-4 w-4 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-200'}`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="relative min-h-[300px] sm:min-h-[270px] md:h-72 lg:h-80">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ type: 'spring', damping: 20 }}
              className="absolute inset-0"
            >
              <TestimonialCard 
                testimonial={testimonials[activeIndex]} 
                active={true} 
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center mt-8">
          <div className="inline-flex space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className="focus:outline-none"
                aria-label={`View testimonial ${index + 1}`}
              >
                <motion.div
                  animate={{ 
                    width: activeIndex === index ? 24 : 12,
                    backgroundColor: activeIndex === index ? COLORS.highlight : COLORS.bg
                  }}
                  transition={{ type: 'spring', stiffness: 500 }}
                  className="h-2 rounded-full"
                  whileHover={{ backgroundColor: COLORS.accent }}
                />
              </button>
            ))}
          </div>
        </div>

        <motion.div 
          className="mt-16 rounded-xl shadow-lg p-8 text-center max-w-4xl mx-auto"
          style={{ background: '#fff' }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-2xl font-bold mb-4" style={{ color: COLORS.primary }}>Join Our Community</h3>
          <p className="mb-6" style={{ color: COLORS.accent }}>
            Thousands of satisfied customers can't be wrong. Try our products today and experience the difference.
          </p>
            <motion.button
            className="px-8 py-3 rounded-full font-medium shadow-md"
            style={{ background: `linear-gradient(to right, ${COLORS.highlight}, ${COLORS.accent})`, color: '#fff' }}
            whileHover={{ scale: 1.05, boxShadow: `0 5px 15px ${COLORS.highlight}66` }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.href = '/products'}
            >
            Shop Now
            </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsGrid;