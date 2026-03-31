import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ArrowRight, ArrowLeft } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Fatou Diop',
    role: 'PDG, Senegal Exportations',
    content: "BAY SA WARR a radicalement changé notre approche du marché international. Leurs outils d'accompagnement nous ont permis de multiplier notre chiffre d'affaires par trois.",
    image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=300',
    metric: '+300% Revenu',
    metricLabel: 'Croissance annuelle',
  },
  {
    id: 2,
    name: 'Kwame Asante',
    role: 'Fondateur, Or de Ghana',
    content: "Une expertise inégalée pour le e-commerce africain. Nous touchons enfin nos clients en Europe et aux USA avec une logistique simplifiée.",
    image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=300',
    metric: '15 Pays',
    metricLabel: 'Expansion globale',
  },
  {
    id: 3,
    name: 'Amina Hassan',
    role: 'Dir. Spices de l\'Est',
    content: "L'écosystème parfait pour les PME en quête d'excellence. Le professionnalisme de l'équipe est exceptionnel et vraiment tourné vers l'impact.",
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300',
    metric: 'Excellence',
    metricLabel: 'Certification Qualité',
  },
];

const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const next = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95, // Reduced scale delta for smoother iOS transition
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95,
    }),
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto px-4 py-8 sm:py-12">
      {/* Main Focus Area */}
      <div className="relative min-h-[550px] sm:h-[450px] flex items-center justify-center overflow-hidden lg:overflow-visible">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.3 },
              scale: { duration: 0.3 }
            }}
            style={{ 
              WebkitBackfaceVisibility: 'hidden',
              backfaceVisibility: 'hidden',
              transform: 'translateZ(0)',
              willChange: 'transform, opacity'
            }}
            className="absolute w-full max-w-2xl bg-white rounded-[2rem] sm:rounded-[3rem] p-6 sm:p-12 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-gray-50 flex flex-col items-center text-center mx-auto"
          >
            <div className="flex gap-1 mb-6 sm:mb-8">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
              ))}
            </div>

            <blockquote className="text-lg sm:text-2xl font-medium text-gray-900 leading-relaxed mb-8 italic">
              "{testimonials[currentIndex].content}"
            </blockquote>

            <div className="flex flex-col items-center gap-4 mt-auto">
              <img
                src={testimonials[currentIndex].image}
                alt={testimonials[currentIndex].name}
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover ring-4 ring-green-50 shadow-xl"
              />
              <div>
                <div className="font-black text-gray-900 uppercase tracking-tighter text-sm sm:text-base">{testimonials[currentIndex].name}</div>
                <div className="text-[10px] sm:text-sm font-bold text-green-600 uppercase tracking-[0.1em]">{testimonials[currentIndex].role}</div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Side Controls (Arrows) - Hidden on very small screens, displayed below or on sides */}
        <div className="absolute inset-x-0 bottom-4 sm:top-1/2 sm:inset-y-auto sm:-translate-y-1/2 flex justify-center sm:justify-between items-center gap-8 sm:gap-0 pointer-events-none lg:-mx-20">
          <button
            onClick={prev}
            className="pointer-events-auto w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white shadow-xl flex items-center justify-center text-gray-400 hover:text-green-600 hover:scale-110 active:scale-95 transition-all border border-gray-50 bg-white/90 backdrop-blur-md"
          >
            <ArrowLeft size={20} />
          </button>
          <button
            onClick={next}
            className="pointer-events-auto w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white shadow-xl flex items-center justify-center text-gray-400 hover:text-green-600 hover:scale-110 active:scale-95 transition-all border border-gray-50 bg-white/90 backdrop-blur-md"
          >
            <ArrowRight size={20} />
          </button>
        </div>
      </div>

      {/* Impact Indicators Section */}
      <motion.div 
        key={currentIndex + "-metrics"}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-8 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-center justify-center max-w-3xl mx-auto"
      >
        <div className="text-center lg:text-left">
          <div className="text-3xl sm:text-4xl font-black text-gray-950 tracking-tighter leading-none mb-1">
            {testimonials[currentIndex].metric}
          </div>
          <div className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
            {testimonials[currentIndex].metricLabel}
          </div>
        </div>
        
        <div className="hidden lg:block h-px bg-gray-100" />
        
        <div className="flex flex-col items-center lg:items-end justify-center">
            <div className="flex items-center gap-3">
               <div className="flex -space-x-4">
                 {testimonials.map((t, i) => (
                   <img key={i} src={t.image} className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-4 border-white object-cover shadow-sm" alt="Thumbnail" />
                 ))}
               </div>
               <div className="text-[10px] sm:text-[11px] font-black uppercase text-gray-900 tracking-wider">
                  +10k Membres
               </div>
            </div>
        </div>
      </motion.div>

      {/* Navigation Tracking Bar */}
      <div className="mt-10 sm:mt-12 flex justify-center gap-2 sm:gap-3">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setDirection(i > currentIndex ? 1 : -1);
              setCurrentIndex(i);
            }}
            className={`h-1 sm:h-1.5 transition-all duration-500 rounded-full ${
              i === currentIndex ? 'w-8 sm:w-12 bg-green-600' : 'w-3 sm:w-4 bg-gray-200 hover:bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default TestimonialCarousel;
