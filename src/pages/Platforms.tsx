import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Globe, ShoppingCart, BookOpen, Facebook, Instagram, Linkedin, ExternalLink, Users, TrendingUp, Shield, Zap, Youtube, X, CheckCircle, ArrowRight } from 'lucide-react';
import { useState } from 'react';

const Platforms = () => {
  const [showComingSoon, setShowComingSoon] = useState(false);
  const navigate = useNavigate();

  const platforms = [
    {
      id: 'fipa',
      title: 'Plateforme FIPA',
      subtitle: 'Excellence Africaine',
      description: 'Le carrefour d’élite connectant les producteurs locaux au marché mondial.',
      icon: Globe,
      color: 'from-green-500 to-emerald-600',
      glow: 'shadow-green-500/20',
      accent: 'text-green-600',
      features: ['Catalogue Global 10K+', 'Fournisseurs Vérifiés', 'Facilitation Export'],
      stats: [{ label: 'Pays', value: '25' }, { label: 'Produits', value: '10K+' }],
      link: '/events',
      action: 'navigate'
    },
    {
      id: 'ecommerce',
      title: 'Site E-commerce',
      subtitle: 'Vente en ligne',
      description: 'Notre plateforme de vente en ligne pour les produits africains.',
      icon: ShoppingCart,
      color: 'from-blue-500 to-cyan-600',
      glow: 'shadow-blue-500/20',
      accent: 'text-blue-600',
      features: ['Boutiques Perso', 'Paiements Sécurisés', 'Logistique Intégrée'],
      stats: [{ label: 'Magasins', value: '1.2K+' }, { label: 'Score HT', value: '4.9/5' }],
      link: '#',
      action: 'coming-soon'
    },
    {
      id: 'blog',
      title: 'Blog & Actualités',
      subtitle: 'Veille Stratégique',
      description: 'Soyez informé de nos activités à travers notre blog et nos actualités.',
      icon: BookOpen,
      color: 'from-purple-500 to-indigo-600',
      glow: 'shadow-purple-500/20',
      accent: 'text-purple-600',
      features: ['Actualités', 'Success Stories', 'Voyages et visites'],
      stats: [{ label: 'Articles', value: '500+' }, { label: 'Lecteurs', value: '25K+' }],
      link: '/blog',
      action: 'navigate'
    }
  ];

  const handlePlatformClick = (platform: typeof platforms[0]) => {
    if (platform.action === 'coming-soon') {
      setShowComingSoon(true);
    } else {
      navigate(platform.link);
    }
  };

  const socialPlatforms = [
    {
      name: 'Facebook',
      icon: Facebook,
      description: 'Rejoignez notre communauté de leaders d\'affaires africains',
      followers: '2,2K+',
      color: 'bg-blue-600',
      link: 'https://www.facebook.com/baysawarr'
    },
    {
      name: 'Instagram',
      icon: Instagram,
      description: 'Histoires visuelles de réussite des entreprises africaines',
      followers: '100+',
      color: 'bg-pink-600',
      link: 'https://www.instagram.com/plateforme_bay_sa_war/?fbclid=IwY2xjawMWgrlleHRuA2FlbQIxMABicmlkETFIM0Q1RkpEUlBXYWtkTm1MAR49Io3FB650UIqas5PzCal3eudmDsKiNqHWJxD9tz95S2bpzLjDEOctol4Jqg_aem_vyO-Noh6CZKOFMJkKb7TVA#'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      description: 'Réseau professionnel pour la croissance des affaires',
      followers: '100+',
      color: 'bg-blue-700',
      link: 'https://www.linkedin.com/in/plateforme-bay-sa-waar-3a899737b/'
    },
    {
      name: 'Youtube',
      icon: Youtube,
      description: 'Rejoignez notre chaîne YouTube pour des vidéos de qualité',
      followers: '500+',
      color: 'bg-red-600',
      link: 'https://www.youtube.com/@fabiratv2023'
    },

  ];

  const benefits = [
    {
      icon: Users,
      title: 'Accès communauté',
      description: 'Connectez-vous avec des milliers de leaders d\'affaires et d\'entrepreneurs africains'
    },
    {
      icon: TrendingUp,
      title: 'Analytiques de croissance',
      description: 'Suivez vos performances avec des outils de suivi et de reporting détaillés'
    },
    {
      icon: Shield,
      title: 'Transactions sécurisées',
      description: 'Sécurité bancaire pour toutes les transactions et protection des données'
    },
    {
      icon: Zap,
      title: 'Setup rapide',
      description: 'Démarrez en quelques minutes avec notre processus d\'onboarding simplifié'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen "
    >
      {/* Hero Section */}
      <section className="relative pt-16 pb-12 sm:py-20 md:py-24 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(https://res.cloudinary.com/drxouwbms/image/upload/v1755949759/Screenshot_2025-08-23_at_11_41_05_1_-Picsart-AiImageEnhancer_kfsp1y.png)' }}>
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
              Nos <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">Plateformes</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-3xl mx-auto mb-6 sm:mb-8 px-2 sm:px-0">
              Des solutions numériques exhaustives conçues pour équiper les entreprises africaines et les connecter avec les opportunités mondiales.
            </p>
            <Link
              to="/enrollments"
              className="inline-flex items-center space-x-2 bg-green-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold hover:bg-green-700 transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base"
            >
              <span>Démarrer dès aujourd'hui</span>
              <ExternalLink size={18} className="sm:w-5 sm:h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Plateformes Clés - Elaborated Glassmorphism */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Animated Background Ambience */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-green-100/20 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-blue-100/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '3s' }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 tracking-tighter uppercase">
              Écosystème <span className="text-green-600">Premium</span>
            </h2>
            <p className="text-lg text-gray-500 font-medium max-w-xl mx-auto">
              Des outils puissants distillés pour votre succès.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {platforms.map((platform, index) => (
              <motion.div
                key={platform.id}
                initial={{ y: 40, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="group relative"
              >
                {/* Main Card Structure */}
                <div className={`h-full bg-white/40 backdrop-blur-xl rounded-[2.5rem] border border-gray-100 p-10 shadow-2xl transition-all duration-500 group-hover:-translate-y-4 hover:shadow-green-900/5 relative overflow-hidden ${platform.glow}`}>

                  {/* Elaborated: Decorative Corner Accent */}
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${platform.color} opacity-[0.03] rounded-bl-[5rem] group-hover:opacity-[0.08] transition-opacity`} />
                  <div className={`absolute top-8 right-8 w-2 h-2 rounded-full bg-gradient-to-r ${platform.color} opacity-20 group-hover:scale-150 transition-transform`} />

                  {/* Elaborated: Inner Border Glow Effect */}
                  <div className={`absolute inset-[1px] rounded-[2.4rem] border border-white/50 pointer-events-none`} />

                  {/* Icon with Dynamic Glow & Layered Container */}
                  <div className="relative mb-8 group-hover:rotate-3 transition-transform duration-500 flex justify-center md:justify-start">
                    <div className={`absolute -inset-2 bg-gradient-to-br ${platform.color} rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity`} />
                    <div className={`relative w-20 h-20 rounded-3xl bg-gradient-to-br ${platform.color} flex items-center justify-center text-white shadow-lg`}>
                      <platform.icon size={36} strokeWidth={2.5} />
                    </div>
                  </div>

                  <div className="mb-6 text-center md:text-left">
                    <h3 className="text-2xl font-black text-gray-900 mb-1 leading-tight">{platform.title}</h3>
                    <p className={`text-[10px] font-black uppercase tracking-[0.2em] ${platform.accent}`}>{platform.subtitle}</p>
                  </div>

                  <p className="text-gray-500 text-sm leading-relaxed mb-8 font-medium text-center md:text-left">
                    {platform.description}
                  </p>

                  <div className="space-y-3 mb-10">
                    {platform.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-3 justify-center md:justify-start">
                        <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${platform.color} shadow-sm shadow-current`} />
                        <span className="text-[11px] font-bold text-gray-800 tracking-wide uppercase opacity-80">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => handlePlatformClick(platform)}
                    className="w-full py-5 rounded-2xl bg-gray-900 text-white font-black text-xs uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group/btn relative overflow-hidden shadow-xl"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-r ${platform.color} opacity-0 group-hover/btn:opacity-10 transition-opacity`} />
                    <span className="relative z-10">{platform.action === 'coming-soon' ? 'Bientôt' : 'Explorer'}</span>
                    <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform relative z-10" />
                  </button>
                </div>
                {/* Visual Accent Glow Backdrop */}
                <div className={`absolute -inset-1 bg-gradient-to-br ${platform.color} rounded-[2.8rem] blur-2xl opacity-0 group-hover:opacity-[0.12] transition-opacity -z-10`} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits - Elaborated Bento */}


      {/* Social Media - Elaborated Communities */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-black text-gray-900 mb-16 uppercase tracking-tighter">Nos réseaux sociaux</h2>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {socialPlatforms.map((social, index) => (
              <motion.a
                key={social.name}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -8, scale: 1.02 }}
                className="relative group p-10 rounded-[3rem] bg-gray-50/50 border border-transparent hover:bg-white hover:border-gray-200 transition-all duration-500 overflow-hidden"
              >
                {/* Elaborated: Individual Brand Gradient Glow */}
                <div className={`absolute -bottom-10 -right-10 w-40 h-40 ${social.color} opacity-0 group-hover:opacity-[0.08] rounded-full blur-3xl transition-all duration-700`} />

                {/* Complex Icon Plate */}
                <div className="relative w-20 h-20 mx-auto mb-8">
                  <div className={`absolute inset-0 ${social.color} rounded-[2rem] blur-xl opacity-20 group-hover:opacity-40 animate-pulse`} />
                  <div className={`relative w-full h-full rounded-[2rem] ${social.color} flex items-center justify-center text-white shadow-xl transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-3`}>
                    <social.icon size={32} strokeWidth={2.5} />
                  </div>
                </div>

                <div className="relative z-10">
                  <h3 className="text-xl font-black text-gray-900 mb-2">{social.name}</h3>
                  <div className="inline-block px-4 py-1.5 rounded-full bg-white border border-gray-100 shadow-sm text-[10px] font-black uppercase tracking-[0.25em] text-gray-400 group-hover:text-gray-900 group-hover:border-gray-200 transition-all">
                    {social.followers} Followers
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Coming Soon Modal - Elaborated Tech-Look */}
      <AnimatePresence>
        {showComingSoon && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowComingSoon(false)}
              className="absolute inset-0 bg-gray-900/95 backdrop-blur-2xl"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-white rounded-[3.5rem] shadow-[0_30px_100px_rgba(0,0,0,0.3)] overflow-hidden max-w-md w-full p-12 text-center border border-white/20"
            >
              {/* Pattern Accent */}
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600" />

              <button
                onClick={() => setShowComingSoon(false)}
                className="absolute top-8 right-8 p-3 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors text-gray-400"
              >
                <X size={20} />
              </button>

              <div className="mb-10 text-center relative">
                <div className="relative w-28 h-28 mx-auto mb-10">
                  <div className="absolute inset-0 bg-green-500/10 rounded-[2.5rem] animate-ping opacity-20" />

                </div>

                <h2 className="text-4xl font-black text-gray-900 mb-4 tracking-tighter uppercase">
                  Soon <span className="text-green-600 underline decoration-4 underline-offset-8 decoration-green-100">Impact</span>
                </h2>
                <p className="text-gray-500 font-bold text-sm leading-relaxed px-2 uppercase tracking-widest opacity-60">
                  Le futur du commerce africain arrive
                </p>
              </div>

              <div className="space-y-4">
                <button
                  onClick={() => setShowComingSoon(false)}
                  className="w-full py-6 rounded-3xl bg-gray-900 text-white font-black text-xs uppercase tracking-[0.3em] hover:bg-green-600 transition-all shadow-2xl shadow-gray-900/20 transform hover:-translate-y-1 active:translate-y-0"
                >
                  Alertez-moi
                </button>
                <p className="text-[9px] font-black text-gray-300 uppercase tracking-[0.4em]">Stay Powered • Stay Ready</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Platforms;