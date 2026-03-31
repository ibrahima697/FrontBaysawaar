import { motion } from 'framer-motion';
import { Star, Check, Quote, Globe, TrendingUp, Users } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Fatou Diop',
    role: 'PDG, Senegal Exportations',
    content: "BAY SA WARR a radicalement changé notre approche du marché international. Leurs outils d'accompagnement nous ont permis de multiplier notre chiffre d'affaires par trois en 18 mois.",
    image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=300',
    impact: '+300% Revenu',
    impactIcon: TrendingUp,
    size: 'large'
  },
  {
    id: 2,
    name: 'Kwame Asante',
    role: 'Fondateur, Or de Ghana',
    content: "Une expertise inégalée pour le e-commerce africain. Nous touchons enfin nos clients en Europe et aux USA.",
    image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=300',
    impact: 'Market Global',
    impactIcon: Globe,
    size: 'small'
  },
  {
    id: 3,
    name: 'Amina Hassan',
    role: 'Dir. Spices de l\'Est',
    content: "L'écosystème parfait pour les PME en quête d'excellence. Le professionnalisme de l'équipe Fatou Fabira Dramé est exceptionnel.",
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300',
    impact: 'Excellence',
    impactIcon: Star,
    size: 'medium'
  },
  {
    id: 4,
    name: 'Ibrahim Touré',
    role: 'Ivory Crafts',
    content: "Plus qu'une plateforme, c'est un véritable partenaire de croissance stratégique.",
    image: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=300',
    impact: 'Networking 2.0',
    impactIcon: Users,
    size: 'small'
  }
];

const TestimonialCard = ({ testimonial, index }: { testimonial: typeof testimonials[0], index: number }) => {
  const isLarge = testimonial.size === 'large';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      viewport={{ once: true }}
      className={`relative group h-full rounded-[2.5rem] overflow-hidden p-8 sm:p-10 flex flex-col justify-between 
        ${isLarge ? 'md:col-span-2 md:row-span-2 bg-gray-950 text-white' : 'bg-white border border-gray-100 shadow-sm'}`}
    >
      {/* Decorative Background Elements for Dark Card */}
      {isLarge && (
        <>
          <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
            <Quote size={160} />
          </div>
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-green-500/10 rounded-full blur-[80px]" />
        </>
      )}

      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-8">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} className={isLarge ? 'fill-green-500 text-green-500' : 'fill-yellow-400 text-yellow-400'} />
            ))}
          </div>
          <div className={`text-[10px] font-black uppercase tracking-[0.2em] ${isLarge ? 'text-green-500' : 'text-gray-400'}`}>
            Témoignage Vérifié
          </div>
        </div>

        <blockquote className={`${isLarge ? 'text-2xl sm:text-3xl' : 'text-lg'} font-medium leading-relaxed italic mb-10`}>
          "{testimonial.content}"
        </blockquote>
      </div>

      <div className="relative z-10 flex items-end justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className="w-14 h-14 rounded-full object-cover ring-4 ring-offset-2 ring-transparent group-hover:ring-green-500 transition-all duration-500"
            />
            <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center ring-2 transition-transform duration-300 group-hover:scale-110
              ${isLarge ? 'bg-green-500 ring-gray-950' : 'bg-green-600 ring-white'}`}>
              <Check size={10} className="text-white" />
            </div>
          </div>
          <div>
            <div className={`font-black text-sm uppercase tracking-tight ${isLarge ? 'text-white' : 'text-gray-900'}`}>{testimonial.name}</div>
            <div className={`text-xs font-medium ${isLarge ? 'text-gray-400' : 'text-gray-500'}`}>{testimonial.role}</div>
          </div>
        </div>

        {/* Impact Badge */}
        <div className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-500 group-hover:scale-105
          ${isLarge ? 'bg-white/5 border-white/10 text-green-400' : 'bg-green-50 border-green-100 text-green-700'}`}>
          <testimonial.impactIcon size={12} strokeWidth={3} />
          <span className="text-[10px] font-black uppercase tracking-widest">{testimonial.impact}</span>
        </div>
      </div>

      {/* Hover visual effect for small cards */}
      {!isLarge && (
        <div className="absolute inset-[1px] rounded-[2.4rem] border-2 border-transparent group-hover:border-green-500/10 pointer-events-none transition-colors duration-500" />
      )}
    </motion.div>
  );
};

const TestimonialWall = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 auto-rows-[320px] md:auto-rows-[380px]">
      {testimonials.map((testimonial, index) => (
        <TestimonialCard key={testimonial.id} testimonial={testimonial} index={index} />
      ))}
      
      {/* Visual Accent Card / Call to Action Mini-Card */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        viewport={{ once: true }}
        className="hidden md:flex bg-gradient-to-br from-green-600 to-indigo-900 rounded-[2.5rem] p-10 flex-col justify-center items-center text-center text-white"
      >
        <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-xl">
          <TrendingUp size={32} />
        </div>
        <div className="text-xl font-black uppercase tracking-tighter mb-2">95% de satisfaction</div>
        <p className="text-white/70 text-xs font-medium leading-relaxed">
          Rejoignez plus de 10,000 membres qui transforment déjà l'économie africaine.
        </p>
      </motion.div>
    </div>
  );
};

export default TestimonialWall;
