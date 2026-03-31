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
      scale: 0.8,
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
      scale: 0.8,
    }),
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto px-4 py-12">
      {/* Main Focus Area */}
      <div className="relative h-[450px] sm:h-[400px] flex items-center justify-center overflow-hidden lg:overflow-visible">
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
              opacity: { duration: 0.4 },
              scale: { duration: 0.4 }
            }}
            className="absolute w-full max-w-2xl bg-white rounded-[3rem] p-8 sm:p-12 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-gray-50 flex flex-col items-center text-center"
          >
            <div className="flex gap-1 mb-8">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} className="fill-yellow-400 text-yellow-400" />
              ))}
            </div>

            <blockquote className="text-xl sm:text-2xl font-medium text-gray-900 leading-relaxed mb-10 italic">
              "{testimonials[currentIndex].content}"
            </blockquote>

            <div className="flex flex-col items-center gap-4 mt-auto">
              <img
                src={testimonials[currentIndex].image}
                alt={testimonials[currentIndex].name}
                className="w-16 h-16 rounded-full object-cover ring-4 ring-green-50 shadow-xl"
              />
              <div>
                <div className="font-black text-gray-900 uppercase tracking-tighter">{testimonials[currentIndex].name}</div>
                <div className="text-sm font-bold text-green-600 uppercase tracking-[0.1em]">{testimonials[currentIndex].role}</div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Side Controls (Arrows) */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none lg:-mx-20">
          <button
            onClick={prev}
            className="pointer-events-auto w-14 h-14 rounded-full bg-white shadow-xl flex items-center justify-center text-gray-400 hover:text-green-600 hover:scale-110 transition-all border border-gray-50"
          >
            <ArrowLeft size={24} />
          </button>
          <button
            onClick={next}
            className="pointer-events-auto w-14 h-14 rounded-full bg-white shadow-xl flex items-center justify-center text-gray-400 hover:text-green-600 hover:scale-110 transition-all border border-gray-50"
          >
            <ArrowRight size={24} />
          </button>
        </div>
      </div>

      {/* Impact Indicators Section */}
      <motion.div 
        key={currentIndex + "-metrics"}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-16 grid grid-cols-2 lg:grid-cols-3 gap-8 items-center justify-center max-w-3xl mx-auto"
      >
        <div className="col-span-2 lg:col-span-1 text-center lg:text-left">
          <div className="text-4xl font-black text-gray-950 tracking-tighter leading-none mb-1">
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
                   <img key={i} src={t.image} className="w-10 h-10 rounded-full border-4 border-white object-cover" />
                 ))}
               </div>
               <div className="text-[11px] font-black uppercase text-gray-900">
                  +10k Membres
               </div>
            </div>
        </div>
      </motion.div>

      {/* Navigation Tracking Bar */}
      <div className="mt-12 flex justify-center gap-3">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setDirection(i > currentIndex ? 1 : -1);
              setCurrentIndex(i);
            }}
            className={`h-1.5 transition-all duration-500 rounded-full ${
              i === currentIndex ? 'w-12 bg-green-600' : 'w-4 bg-gray-200 hover:bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default TestimonialCarousel;
