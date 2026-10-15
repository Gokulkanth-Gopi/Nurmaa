import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useAnimation, useInView, Variants } from 'framer-motion';
import { FiInstagram, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import logo from '@/assets/images/logo clr-01.png';

const Footer: React.FC = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <footer className="relative overflow-hidden pt-20 bg-gradient-to-b from-[#121769] to-[#0a0d3d]">
      {/* Gradient Wave */}
      <div className="absolute top-0 left-0 w-full overflow-hidden h-24 z-0">
        <svg
          viewBox="0 0 1200 120"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="footerWaveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#67246a" stopOpacity="0.7" />
              <stop offset="50%" stopColor="#FE49AF" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#67246a" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            fill="url(#footerWaveGradient)"
          />
        </svg>
      </div>

      <div className="relative z-10 container mx-auto py-12 px-6 md:px-8">
        <motion.div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12"
          initial="hidden"
          animate={controls}
          variants={containerVariants}
        >
          {/* Brand Section */}
          <motion.div variants={itemVariants} className="md:col-span-2">
            <Link
              to="/"
              className="flex items-center"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              style={{ alignItems: 'flex-start' }}
            >
              <motion.img
                src={logo}
                alt="Nurmaa Logo"
                className="h-20 w-auto drop-shadow-lg mb-0"
                style={{ display: 'block' }}
                whileHover={{ scale: 1.05 }}
              />
            </Link>
            <motion.p
              className="mt-3 text-[#EBEBD3]/90 text-sm md:text-base"
              whileHover={{ x: 3 }}
            >
              Handcrafted natural products for skin and body. Made with love and care.
            </motion.p>

            {/* Social Icons - Only Instagram, Email, WhatsApp */}
            <div className="mt-5 flex space-x-4">
              <motion.a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#EBEBD3] hover:text-[#FE49AF] transition-colors"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiInstagram className="h-5 w-5" />
              </motion.a>

              <motion.a
                href="mailto:info@nurmaa.com"
                className="text-[#EBEBD3] hover:text-[#FE49AF] transition-colors"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiMail className="h-5 w-5" />
              </motion.a>

              <motion.a
                href="https://wa.me/918870261911"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#EBEBD3] hover:text-[#FE49AF] transition-colors"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaWhatsapp className="h-5 w-5" />
              </motion.a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="mt-4 md:mt-0">
            <motion.h3
              className="text-lg font-semibold mb-4 text-[#EBEBD3]"
              whileHover={{ x: 3 }}
            >
              Quick Links
            </motion.h3>
            <ul className="space-y-2.5 text-[#EBEBD3]/90">
              {[
                { label: 'Home', to: '/' },
                { label: 'About', to: '/about' },
                { label: 'Products', to: '/products' },
                { label: 'Testimonials', to: '/testimonials' },
                { label: 'Cart', to: '/cart' },
                { label: 'Contact', to: '/contact' }
              ].map((link) => (
                <motion.li
                  key={link.label}
                  whileHover={{ x: 3 }}
                >
                  <Link
                    to={link.to}
                    className="text-sm md:text-base hover:text-[#FE49AF] transition-colors"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants} className="mt-4 md:mt-0">
            <motion.h3
              className="text-lg font-semibold mb-4 text-[#EBEBD3]"
              whileHover={{ x: 3 }}
            >
              Contact
            </motion.h3>
            <ul className="space-y-3 text-[#EBEBD3]/90">
              <motion.li
                className="flex items-start"
                whileHover={{ x: 3 }}
              >
                <FiMail className="h-4 w-4 mt-1 mr-2 text-[#FE49AF] flex-shrink-0" />
                <a href='mailto:info@nurmaa.com' className="text-sm md:text-base">info@nurmaa.com</a>
              </motion.li>
              <motion.li
                className="flex items-start"
                whileHover={{ x: 3 }}
              >
                <FaWhatsapp className="h-4 w-4 mt-1 mr-2 text-[#FE49AF] flex-shrink-0" />
                <a href='https://wa.me/918870261911' target="_blank" rel="noopener noreferrer" className="text-sm md:text-base hover:text-[#FE49AF] transition-colors">+91 8870261911</a>
              </motion.li>
              <motion.li
                className="flex items-start"
                whileHover={{ x: 3 }}
              >
                <FiPhone className="h-4 w-4 mt-1 mr-2 text-[#FE49AF] flex-shrink-0" />
                <a href="tel:+918870261911" className="text-sm md:text-base hover:text-[#FE49AF] transition-colors">+91 8870261911</a>
              </motion.li>
              <motion.li
                className="flex items-start"
                whileHover={{ x: 3 }}
              >
                <FiMapPin className="h-4 w-4 mt-1 mr-2 text-[#FE49AF] flex-shrink-0" />
                <span className="text-sm md:text-base">Nurmaa, Salem, TamilNadu - 636017</span>
              </motion.li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom Footer */}
        <motion.div
          className="mt-12 pt-6 border-t border-[#67246a]/30 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
        >
          <p className="text-xs md:text-sm text-[#EBEBD3]/70">
            © {new Date().getFullYear()} Nurmaa. All rights reserved.
          </p>
          <p className="text-xs md:text-sm text-[#EBEBD3]/70">Design and Developed by ZyncWeb Solutions</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;