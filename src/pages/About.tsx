import React from 'react';
import ban1 from '@/assets/images/about.png';
import visionImg from '@/assets/images/vision.jpg';
import missionImg from '@/assets/images/mission.jpg';
import founderImg from '@/assets/images/founder.jpg';
import { motion } from 'framer-motion';
// import Timeline from '../components/Timeline';

// Consistent NurmaaCard for all cards on this page
const NurmaaCard: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div
    className={`
      bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border-2 border-[#FE49AF]/15
      p-6 md:p-8
      ${className}
    `}
  >
    {children}
  </div>
);

const egyptianGradient = 'bg-gradient-to-br from-[#EBEBD3] via-white to-[#FE49AF]';
const accentBorder = 'border-4 border-[#67246a]'

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: ({ delay: i * 0.15, duration: 0.7, type: 'spring' } as any)
  })
};

const About: React.FC = () => {
  return (
    <motion.div
      className="pb-16 min-h-screen bg-[#EBEBD3]"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
      }}
    >
      {/* Hero Section */}
      <motion.div
        className="relative overflow-hidden bg-gradient-to-br from-[#FE49AF]/30 via-[#EBEBD3] to-[#67246a]/10 pt-24 pb-12 sm:pt-32 sm:pb-16 md:pt-40 md:pb-20 lg:pt-48 lg:pb-28"
        variants={fadeInUp}
        custom={1}
      >
        {/* Background image for hero banner */}
        <div
          className="absolute inset-0 w-full h-full z-0"
          style={{
      backgroundImage: `url(${ban1})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.35,
            pointerEvents: 'none'
          }}
        ></div>
        {/* Decorative shapes */}
        <div className="absolute top-0 left-0 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 bg-[#FE49AF]/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 z-0"></div>
        <div className="absolute bottom-0 right-0 w-40 h-40 sm:w-56 sm:h-56 md:w-80 md:h-80 bg-[#67246a]/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 z-0"></div>
        {/* Centered content */}
            <div className="relative z-10 flex items-center justify-center min-h-[30vh] sm:min-h-[30vh] md:min-h-[20vh]">
          <div className="w-full max-w-lg sm:max-w-2xl md:max-w-4xl px-4 sm:px-6 lg:px-8 text-center mx-auto">
            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#67246a] tracking-wide mb-3 sm:mb-5 md:mb-7 font-serif drop-shadow-lg"
              variants={fadeInUp}
              custom={2}
            >
              Discover the Nurmaa Story
            </motion.h1>
            <motion.div
              className="w-16 sm:w-24 h-2 mx-auto bg-gradient-to-r from-[#FE49AF] to-[#67246a] rounded-full mb-4 sm:mb-6"
              variants={fadeInUp}
              custom={3}
            ></motion.div>
            <motion.p
              className="text-sm sm:text-base md:text-lg lg:text-xl text-[#121769] font-bold mb-2 sm:mb-4 drop-shadow"
              variants={fadeInUp}
              custom={4}
            >
              Ancient wisdom. Modern wellness. Crafted with care.
            </motion.p>
            <motion.p
              className="text-xs sm:text-sm md:text-base lg:text-lg text-[#121769] max-w-2xl mx-auto font-medium"
              variants={fadeInUp}
              custom={5}
            >
              From the heart of tradition to your hands, Nurmaa celebrates the beauty of natural ingredients and mindful living. Join us on a journey of transformation, protection, and life.
            </motion.p>
          </div>
        </div>
      </motion.div>

      <div className="nurmaa-container max-w-6xl mx-auto py-20">

        {/* Vision & Mission Section */}
        <motion.div
          className="relative flex flex-col gap-12 md:gap-20 mb-28"
          variants={fadeInUp}
          custom={5}
        >
          {/* Vision */}
          <NurmaaCard className="relative overflow-hidden flex flex-col lg:flex-row items-stretch shadow-2xl border-0 p-0">
            {/* Artistic background */}
            <div className="absolute -top-16 -left-16 w-72 h-72 bg-[#FE49AF]/20 rounded-full blur-2xl z-0"></div>
            <div className="flex-1 flex flex-col justify-center items-start z-10 p-8 md:p-12">
              <div className="flex items-center gap-3 mb-4">
                <span className="inline-block w-2 h-10 bg-gradient-to-b from-[#FE49AF] to-[#67246a] rounded"></span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#FE49AF] font-serif tracking-tight drop-shadow">Our Vision</h2>
              </div>
              <p className="text-[#121769] text-lg md:text-xl font-semibold mb-2">
                To inspire a world where wellness is rooted in nature, tradition, and conscious living.
              </p>
              <p className="text-[#67246a] text-base md:text-lg">
                We envision a future where every home embraces the healing power of natural ingredients, and every person feels empowered to live sustainably and mindfully.
              </p>
            </div>
            <div className="flex-1 flex items-center justify-center z-10 p-4 md:p-8">
              <div className="aspect-w-16 aspect-h-9 w-full overflow-hidden rounded-2xl shadow-lg border-4 border-[#FE49AF]/20">
                <img
                  src={visionImg}
                  alt="Our Vision - Holistic Natural Wellness"
                  className="rounded-2xl w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            </div>
          </NurmaaCard>
          {/* Mission */}
          <NurmaaCard className="relative overflow-hidden flex flex-col lg:flex-row-reverse items-stretch shadow-2xl border-0 p-0">
            {/* Artistic background */}
            <div className="absolute -bottom-16 -right-16 w-72 h-72 bg-[#67246a]/20 rounded-full blur-2xl z-0"></div>
            <div className="flex-1 flex flex-col justify-center items-start z-10 p-8 md:p-12">
              <div className="flex items-center gap-3 mb-4">
                <span className="inline-block w-2 h-10 bg-gradient-to-b from-[#67246a] to-[#FE49AF] rounded"></span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#67246a] font-serif tracking-tight drop-shadow">Our Mission</h2>
              </div>
              <p className="text-[#121769] text-lg md:text-xl font-semibold mb-2">
                To craft pure, sustainable products that nurture both people and planet.
              </p>
              <p className="text-[#67246a] text-base md:text-lg">
                We blend ancient wisdom with modern science, handmaking every Nurmaa product with care, transparency, and deep respect for nature.
              </p>
            </div>
            <div className="flex-1 flex items-center justify-center z-10 p-4 md:p-8">
              <div className="aspect-w-16 aspect-h-9 w-full overflow-hidden rounded-2xl shadow-lg border-4 border-[#67246a]/20">
                <img
                  src={missionImg}
                  alt="Our Mission - Handcrafted Pure Botanical Products"
                  className="rounded-2xl w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            </div>
          </NurmaaCard>
        </motion.div>
        {/* <Timeline /> */}

       {/* Egyptian Vertical Timeline with Water Flow */}


        {/* Founder Section */}
        <motion.div
          className="mt-24"
          variants={fadeInUp}
          custom={13}
        >
          <NurmaaCard className="flex flex-col md:flex-row-reverse items-center gap-10 relative overflow-hidden">
            {/* Decorative background shapes */}
            <div className="absolute -top-10 -right-10 w-48 h-48 bg-[#FE49AF]/20 rounded-full blur-2xl z-0"></div>
            <div className="absolute -bottom-10 -left-10 w-56 h-56 bg-[#67246a]/10 rounded-full blur-2xl z-0"></div>
            {/* Founder Image */}
            <div className="relative flex-shrink-0 flex justify-center items-center w-full md:w-1/3 z-10 py-4 md:py-0">
              <div className="w-48 h-48 sm:w-60 sm:h-60 rounded-2xl overflow-hidden border-4 border-[#FE49AF]/30 shadow-xl">
                <img
                  src={founderImg}
                  alt="Amina Rahman - Founder & Herbal Scientist"
                  className="rounded-2xl w-full h-full object-cover object-top transition-transform duration-500 hover:scale-105"
                />
              </div>
            </div>
            {/* Founder Info */}
            <div className="flex-1 flex flex-col justify-center items-start text-left z-10 px-8 py-8">
              <div className="mb-4 flex items-center gap-3">
                <span className="inline-block w-2 h-8 bg-gradient-to-b from-[#FE49AF] to-[#67246a] rounded"></span>
                <h2 className="text-3xl font-extrabold text-[#67246a] font-serif tracking-tight">Meet the Founder</h2>
              </div>
              <div className="mb-4">
                <p className="font-serif text-xl italic text-[#121769] mb-4">
                  “With a background in herbal science and a love for sustainable living, I founded Nurmaa to share the beauty of nature’s remedies with the world. Every product is a reflection of my commitment to purity, tradition, and mindful creation.”
                </p>
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div>
                    <div className="font-bold text-[#FE49AF] text-lg">Amina Rahman</div>
                    <div className="text-[#121769] text-sm">Founder & Herbal Scientist</div>
                  </div>
                  <div className="flex gap-2 mt-2 md:mt-0">
                    <span className="bg-[#FE49AF]/10 text-[#FE49AF] px-3 py-1 rounded-full text-xs font-medium border border-[#FE49AF]/30">#HerbalScience</span>
                    <span className="bg-[#67246a]/10 text-[#67246a] px-3 py-1 rounded-full text-xs font-medium border border-[#67246a]/30">#EcoWellness</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-4 w-full">
                <NurmaaCard className="flex-1 bg-gradient-to-br from-[#FE49AF]/10 to-[#67246a]/5 border border-[#FE49AF]/10 text-[#67246a] shadow-sm p-4">
                  <span className="font-bold">Expertise:</span> Herbal science, eco-friendly formulation, community wellness.
                </NurmaaCard>
                <NurmaaCard className="flex-1 bg-gradient-to-br from-[#67246a]/10 to-[#FE49AF]/5 border border-[#67246a]/10 text-[#121769] shadow-sm p-4">
                  <span className="font-bold">Belief:</span> Nature and science together can nurture a better world.
                </NurmaaCard>
              </div>
            </div>
          </NurmaaCard>
        </motion.div>

        {/* Values Section */}
        <motion.div className="mt-16 sm:mt-24 text-center" variants={fadeInUp} custom={14}>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-[#121769] font-serif">Our Values</h2>
          <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-[#FE49AF] to-[#67246a] mx-auto mb-8 sm:mb-12"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                icon: '𓂀', // Eye of Horus
                title: 'Protection',
                description: 'We safeguard your well-being and our environment, inspired by the ancient Eye of Horus.'
              },
              {
                icon: '𓆣', // Scarab
                title: 'Transformation',
                description: 'Like the scarab, we believe in renewal, growth, and positive change through nature.'
              },
              {
                icon: '☥', // Ankh
                title: 'Life',
                description: 'The ankh symbolizes life; we honor vitality and holistic wellness in all we do.'
              }
            ].map((value, idx) => (
                <motion.div
                key={idx}
                initial={{ opacity: 0, y: 60, scale: 0.85, rotate: -8 + idx * 8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={({
                  delay: 0.2 + idx * 0.18,
                  duration: 0.8,
                  type: 'spring',
                  bounce: 0.35
                } as any)}
              >
                <NurmaaCard className="flex flex-col items-center py-8 md:py-10 group relative overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-500">
                  {/* Animated glowing background blob */}
                  <span
                    className={`
                      absolute -top-10 -left-10 w-32 h-32 rounded-full
                      ${idx === 0 ? 'bg-[#FE49AF]/20' : idx === 1 ? 'bg-[#67246a]/20' : 'bg-[#EBEBD3]/40'}
                      blur-2xl z-0 animate-valueBlob
                    `}
                  ></span>
                  {/* Icon with pulse */}
                  <span className="relative z-10 mb-4">
                    <motion.span
                      initial={{ scale: 0.8, filter: 'blur(2px)' }}
                      whileInView={{ scale: 1.1, filter: 'blur(0px)' }}
                      transition={({
                          repeat: Infinity,
                          repeatType: 'reverse',
                          duration: 2.2 + idx * 0.3,
                          ease: 'easeInOut',
                          delay: 0.5 + idx * 0.2
                        } as any)}
                        className="inline-block"
                    >
                      <span className="text-5xl drop-shadow-lg">{value.icon}</span>
                    </motion.span>
                  </span>
                  <h3 className="text-xl font-bold mb-2 text-[#FE49AF] z-10">{value.title}</h3>
                  <p className="text-[#121769] z-10">{value.description}</p>
                </NurmaaCard>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default About;

/* Nurmaa orb pulse animation (add to your global CSS if not present):
@keyframes nurmaaPulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(254,73,175,0.18), 0 0 0 0 rgba(103,36,106,0.15);}
  50% { box-shadow: 0 0 32px 12px rgba(254,73,175,0.22), 0 0 24px 8px rgba(103,36,106,0.18);}
}
.animate-nurmaaPulse {
  animation: nurmaaPulse 2.8s cubic-bezier(0.4,0,0.2,1) infinite;
}
*/