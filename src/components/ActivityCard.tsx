import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ActivityCardProps {
  title: string;
  subtitle: string;
  description: string;
  icon: LucideIcon;
  color: string;
  children: React.ReactNode;
  ctaText?: string;
  ctaLink?: string;
  ctaState?: any;
}

const ActivityCard = ({
  title,
  subtitle,
  description,
  icon: Icon,
  color,
  children,
  ctaText = "En savoir plus",
  ctaLink = "#",
  ctaState
}: ActivityCardProps) => {
  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="group relative"
    >
      {/* Main Glass Container */}
      <div className={`relative h-full bg-white/40 backdrop-blur-xl rounded-[2.5rem] border border-gray-100 p-8 md:p-10 shadow-2xl transition-all duration-500 group-hover:-translate-y-4`}>

        {/* Decorative Elaborated Accents */}
        <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${color} opacity-[0.03] rounded-bl-[5rem] group-hover:opacity-[0.08] transition-opacity`} />
        <div className={`absolute top-8 right-8 w-2 h-2 rounded-full bg-gradient-to-r ${color} opacity-20 group-hover:scale-150 transition-transform`} />

        {/* Inner Border Glow */}
        <div className="absolute inset-[1px] rounded-[2.4rem] border border-white/60 pointer-events-none" />

        <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-center gap-6 mb-8 text-center md:text-left">
            {/* Layered Icon Housing */}
            <div className="relative w-16 h-16 mx-auto md:mx-0 shrink-0">
              <div className={`absolute inset-0 bg-gradient-to-br ${color} rounded-2xl blur-lg opacity-20 group-hover:opacity-40 transition-opacity`} />
              <div className={`relative w-full h-full rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center text-white shadow-lg transform group-hover:rotate-6 transition-transform`}>
                <Icon size={28} strokeWidth={2.5} />
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-black text-gray-900 mb-1 leading-tight">{title}</h3>
              <p className={`text-xs font-black uppercase tracking-[0.2em] text-gray-400`}>{subtitle}</p>
            </div>
          </div>

          <p className="text-gray-600 font-medium mb-10 leading-relaxed text-center md:text-left">
            {description}
          </p>

          <div className="mb-10 text-gray-900">
            {children}
          </div>

          <Link
            to={ctaLink}
            state={ctaState}
            className={`inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-gray-900/10 group/btn relative overflow-hidden`}
          >
            <div className={`absolute inset-0 bg-gradient-to-r ${color} opacity-0 group-hover/btn:opacity-10 transition-opacity`} />
            <span className="relative z-10">{ctaText}</span>
          </Link>
        </div>
      </div>

      {/* Background Accent Glow */}
      <div className={`absolute -inset-1 bg-gradient-to-br ${color} rounded-[2.8rem] blur-2xl opacity-0 group-hover:opacity-[0.08] transition-opacity -z-10`} />
    </motion.div>
  );
};

export default ActivityCard;
