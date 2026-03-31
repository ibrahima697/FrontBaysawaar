import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PinterestCardProps {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  link: string;
  isExternal?: boolean;
  className?: string;
  index: number;
}

const PinterestCard = ({
  title,
  subtitle,
  description,
  image,
  link,
  isExternal = false,
  className = "",
  index
}: PinterestCardProps) => {
  const CardWrapper = isExternal ? 'a' : Link;
  const linkProps = isExternal ? { href: link, target: "_blank", rel: "noopener noreferrer" } : { to: link };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.21, 0.45, 0.32, 0.9] }}
      viewport={{ once: true }}
      className={`group relative overflow-hidden rounded-[2.5rem] shadow-medium hover:shadow-large transition-all duration-700 cursor-pointer ${className}`}
    >
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0">
        <motion.img
          whileHover={{ scale: 1.1, rotate: 1 }}
          transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
          src={image}
          alt={title}
          className="h-full w-full object-cover"
        />
        {/* Layered Overlays for Depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/30 to-transparent opacity-70 group-hover:opacity-85 transition-opacity duration-700" />
        <div className="absolute inset-0 bg-gray-950/20 group-hover:bg-transparent transition-colors duration-700" />
      </div>

      {/* Top Badge/Action - Floating Style */}
      <div className="absolute top-8 right-8 z-30 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
        <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-2xl border border-white/20 flex items-center justify-center text-white hover:bg-green-500 hover:border-green-400 transition-all duration-300 shadow-2xl">
          <ArrowRight size={24} className="-rotate-45" />
        </div>
      </div>

      {/* Content Area */}
      <div className="relative z-10 h-full flex flex-col justify-end p-8 sm:p-14">
        <motion.div
          className="space-y-4 transform group-hover:translate-y-[-10px] transition-transform duration-500"
        >
          {/* Subtitle - Overline style */}
          <div className="overflow-hidden">
            <motion.span 
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 + (index * 0.1) }}
              className="inline-block text-[10px] font-black tracking-[0.4em] uppercase text-green-400 mb-2 drop-shadow-sm"
            >
              {subtitle}
            </motion.span>
          </div>

          {/* Title - Bold & Impactful */}
          <h3 className="text-3xl sm:text-4xl font-black text-white leading-[1.1] tracking-tight drop-shadow-xl">
            {title}
          </h3>

          {/* Description - Mature/Minimalist */}
          <p className="text-gray-300/95 text-sm sm:text-base line-clamp-3 font-medium leading-relaxed max-w-sm group-hover:text-white transition-colors duration-500">
            {description}
          </p>
          
          {/* CTA Link */}
          <div className="pt-6">
            <CardWrapper
              {...(linkProps as any)}
              className="inline-flex items-center gap-4 text-white font-bold text-[10px] uppercase tracking-[0.2em] group/btn py-2"
            >
              <span className="relative">
                Explorer l'excellence
                <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-green-500 transform scale-x-0 group-hover/btn:scale-x-100 origin-left transition-transform duration-500" />
              </span>
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center backdrop-blur-md border border-white/10 group-hover/btn:bg-white group-hover/btn:text-gray-900 transition-all duration-300 shadow-xl">
                <ArrowRight size={14} />
              </div>
            </CardWrapper>
          </div>
        </motion.div>
      </div>

      {/* Inner Border Glow */}
      <div className="absolute inset-[1px] border border-white/5 rounded-[2.4rem] pointer-events-none z-20" />
      
      {/* Top gradient for readability */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/40 to-transparent z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
    </motion.div>
  );
};

export default PinterestCard;
