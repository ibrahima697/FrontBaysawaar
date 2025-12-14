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
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${color} p-8 text-white shadow-xl`}
    >
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
            <Icon size={28} />
          </div>
          <div>
            <h3 className="text-2xl font-bold">{title}</h3>
            <p className="text-white/80">{subtitle}</p>
          </div>
        </div>

        <p className="text-lg mb-8 leading-relaxed">{description}</p>

        <div className="mb-6">
          {children}
        </div>

        <Link
          to={ctaLink}
          state={ctaState}
          className="inline-flex items-center gap-2 bg-white text-gray-900 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
        >
          {ctaText}
        </Link>
      </div>
    </motion.div>
  );
};

export default ActivityCard;
