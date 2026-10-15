'use client';
import React, { useState } from 'react';
import { toast } from '@/hooks/use-toast';
// Not using next/head in this SPA
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

// helper to render icons without passing className props (avoids IconBaseProps mismatch)
const IconWrapper: React.FC<{ Comp: any; color?: string; size?: number; className?: string }> = ({ Comp, color, size = 20, className = '' }) => (
  <span className={className} style={{ display: 'inline-flex', width: size, height: size, color }}>
    <Comp />
  </span>
);

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Use FormSubmit (static form endpoint) or a backend endpoint
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch('https://script.google.com/macros/s/AKfycbzRZQ7021tg2kgIE98UeEfiZdfgbGhSENt1_CVkP4IajBs1kTX_-BB4ml4fXAXbHyMn/exec', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          secret: 'nurmaaSecret2025',
        }),
      });
      const result = await response.json();
      if (result.result === 'success') {
        toast({
          title: "Message Received",
          description: "Thank you for contacting us. Our team will respond within 24 hours.",
          duration: 5000,
        });
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        throw new Error('Failed to send');
      }
    } catch (error) {
      toast({
        title: "Delivery Failed",
        description: "Your message couldn't be sent. Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "How soon can I expect a response?",
      answer: "We typically respond to all inquiries within 24 hours during business days (Monday-Friday). For urgent matters, please call our support line."
    },
    {
      question: "What information should I include in my message?",
      answer: "Please include as much detail as possible about your inquiry, including any relevant account information, order numbers, or specific questions you have."
    },
    {
      question: "Do you offer phone support?",
      answer: "Yes! Our phone support is available from 9AM to 5PM EST. You can reach us at +91 8870261911."
    },
    {
      question: "Where are you located?",
      answer: "Our headquarters are located at Nurmaa, Salem, TamilNadu - 636017. We also have remote teams across multiple time zones."
    },
    {
      question: "Can I schedule a meeting with your team?",
      answer: "Absolutely! After submitting your contact information, our team will reach out to schedule a meeting at your convenience."
    }
  ];

  return (
    <>
      {/* SPA-friendly title/meta (no next/head) */}
      {typeof document !== 'undefined' && (() => {
        try {
          document.title = 'Contact | Nurmaa';
          let m = document.querySelector('meta[name="description"]');
          if (!m) {
            m = document.createElement('meta');
            m.setAttribute('name', 'description');
            document.head.appendChild(m);
          }
          m.setAttribute('content', 'Connect with our team for inquiries, support, and partnerships');
        } catch (e) {}
      })()}

      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="min-h-screen bg-gradient-to-br from-[#ebebd3] to-[#fff] py-12 md:py-16 px-4 sm:px-6 lg:px-8 mt-[60px]"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <motion.h1
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#121769] mb-4"
            >
              Get in Touch
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-base md:text-lg text-[#67246a] max-w-2xl mx-auto"
            >
              Have questions or want to work together? We'd love to hear from you.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden border border-[#ebebd3]"
            >
              <div className="p-8 sm:p-10">
              <h2 className="text-2xl font-bold text-[#121769] mb-6">Send us a message</h2>
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  setIsSubmitting(true);
                  try {
                    const response = await fetch('https://script.google.com/macros/s/AKfycbzim0-G9WzJwtcZki3hYrHHPzmApTkeSaCVGQh1Mzoup4Sv2GPfOp1yDGN12jGRSnB9/exec', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                        ...formData,
                        secret: 'nurmaaSecret2025',
                      }),
                    });
                    const result = await response.json();
                    if (result.result === 'success') {
                      toast({
                        title: "Message Received",
                        description: "Thank you for contacting us. Our team will respond within 24 hours.",
                        duration: 5000,
                      });
                      setFormData({
                        name: '',
                        email: '',
                        subject: '',
                        message: ''
                      });
                    } else {
                      throw new Error('Failed to send');
                    }
                  } catch (error) {
                    toast({
                      title: "Delivery Failed",
                      description: "Your message couldn't be sent. Please try again or contact us directly.",
                      variant: "destructive",
                    });
                  } finally {
                    setIsSubmitting(false);
                  }
                }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 gap-6">
                {['name', 'email', 'subject'].map((field) => (
                  <div key={field}>
                  <label htmlFor={field} className="block text-sm font-medium text-[#67246a] mb-1 capitalize">
                    {field} <span className="text-[#fe49af]">*</span>
                  </label>
                  <input
                    type={field === 'email' ? 'email' : 'text'}
                    id={field}
                    name={field}
                    value={(formData as any)[field]}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-[#ebebd3] rounded-lg focus:ring-2 focus:ring-[#fe49af] focus:border-[#fe49af] transition text-[#121769] placeholder-[#67246a]/60 bg-[#ebebd3]/30"
                    placeholder={`Your ${field}`}
                  />
                  </div>
                ))}
                </div>

                <div>
                <label htmlFor="message" className="block text-sm font-medium text-[#67246a] mb-1">
                  Message <span className="text-[#fe49af]">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-[#ebebd3] rounded-lg focus:ring-2 focus:ring-[#fe49af] focus:border-[#fe49af] transition text-[#121769] placeholder-[#67246a]/60 bg-[#ebebd3]/30 resize-none"
                  placeholder="How can we help you?"
                />
                </div>

                <div>
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-[#fe49af] to-[#121769] text-white font-bold py-3 px-6 rounded-lg hover:from-[#121769] hover:to-[#fe49af] focus:outline-none focus:ring-2 focus:ring-[#fe49af] focus:ring-offset-2 transition-transform transform hover:scale-105 disabled:opacity-70"
                >
                  {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                  ) : (
                  'Send Message'
                  )}
                </motion.button>
                </div>
              </form>
              </div>
            </motion.div>

            {/* Contact Info & FAQ */}
            <div className="space-y-8">
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden border border-[#ebebd3]"
              >
                <div className="p-8 sm:p-10">
                  <h2 className="text-2xl font-bold text-[#121769] mb-6">Contact Information</h2>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 bg-[#ebebd3] rounded-lg p-3">
                        <IconWrapper Comp={FiMail} color="#121769" size={20} />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-[#67246a]">Email</h3>
                        <a href='mailto:gokulkanthgk@gmail.com' className="text-[#121769]">gokulkanthgk@gmail.com</a>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex-shrink-0 bg-[#ebebd3] rounded-lg p-3">
                        <IconWrapper Comp={FiPhone} color="#fe49af" size={20} />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-[#67246a]">Phone</h3>
                        <a href="tel:+918870261911" className="text-[#121769] hover:underline">+91 8870261911</a>
                        <p className="text-[#67246a]">Mon-Fri: 9AM-5PM EST</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex-shrink-0 bg-[#ebebd3] rounded-lg p-3">
                        <IconWrapper Comp={FaWhatsapp} color="#25D366" size={20} />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-[#67246a]">WhatsApp</h3>
                        <a href="https://wa.me/918870261911" target="_blank" rel="noopener noreferrer" className="text-[#121769] hover:underline">+91 8870261911</a>
                        <p className="text-[#67246a]">Instant orders & support</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex-shrink-0 bg-[#ebebd3] rounded-lg p-3">
                        <IconWrapper Comp={FiMapPin} color="#67246a" size={20} />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-[#67246a]">Address</h3>
                        <p className="text-[#121769]">Nurmaa, Salem,</p>
                        <p className="text-[#121769]">TamilNadu - 636017</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* FAQ */}
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden border border-[#ebebd3]"
              >
                <div className="p-8 sm:p-10">
                  <h2 className="text-2xl font-bold text-[#121769] mb-6">Frequently Asked Questions</h2>
                  <div className="space-y-4">
                    {faqs.map((faq, index) => (
                      <div key={index} className="border-b border-[#ebebd3] pb-4 last:border-b-0 last:pb-0">
                        <button
                          onClick={() => toggleFaq(index)}
                          className="flex justify-between items-center w-full text-left focus:outline-none"
                        >
                          <h3 className="text-lg font-medium text-[#67246a] hover:text-[#fe49af] transition">
                            {faq.question}
                          </h3>
                          <IconWrapper Comp={FiChevronDown} color="#fe49af" size={18} className={`transition-transform ${activeFaq === index ? 'transform rotate-180' : ''}`} />
                        </button>
                        <AnimatePresence>
                          {activeFaq === index && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <p className="mt-2 text-[#121769]">{faq.answer}</p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>
    </>
  );
};

export default Contact;