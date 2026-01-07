import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Globe, ShoppingCart, BookOpen, Facebook, Instagram, Linkedin, ExternalLink, Users, TrendingUp, Shield, Zap, Youtube, X } from 'lucide-react';
import { useState } from 'react';

const Platforms = () => {
  const [showComingSoon, setShowComingSoon] = useState(false);
  const navigate = useNavigate();

  const platforms = [
    {
      id: 'fipa',
      title: 'Plateforme FIPA',
      subtitle: 'Foire des Produits Africains',
      description: 'Marché complet connectant les producteurs africains avec des acheteurs mondiaux. Découvrez des produits africains authentiques et connectez-vous avec des fournisseurs vérifiés.',
      icon: Globe,
      color: 'from-green-500 to-emerald-600',
      features: [
        'Catalogue de produits avec 10 000+ annonces',
        'Annuaire des fournisseurs vérifiés',
        'Services de facilitation du commerce',
        'Programmes de garantie de la qualité ',
        'Support multilingue',
        'Expérience mobile optimisée'
      ],
      stats: [
        { label: 'Produits actifs', value: '10 000+' },
        { label: 'Fournisseurs', value: '500+' },
        { label: 'Pays', value: '25' },
        { label: 'Visiteurs mensuels', value: '50K+' }
      ],
      link: '/events',
      action: 'navigate'
    },
    {
      id: 'ecommerce',
      title: 'Solutions e-commerce',
      subtitle: 'Outils de commerce numérique complets',
      description: 'Plateforme e-commerce conçue pour les entreprises africaines. Créez votre présence en ligne avec notre suite complète d\'outils numériques.',
      icon: ShoppingCart,
      color: 'from-blue-500 to-cyan-600',
      features: [
        'Constructeur de magasins en ligne personnalisés',
        'Traitement de paiement sécurisé',
        'Système de gestion d\'inventaire',
        'Suivi des commandes et livraison',
        'Outils de marketing digital',
        'Soutien client 24h/24'
      ],
      stats: [
        { label: 'Magasins actifs', value: '1,200+' },
        { label: 'Transactions', value: '$2M+' },
        { label: 'Taux de réussite', value: '99,8%' },
        { label: 'Note de satisfaction', value: '4,9/5' }
      ],
      link: '#',
      action: 'coming-soon'
    },
    {
      id: 'blog',
      title: 'Blog des Affaires & Actualités',
      subtitle: 'Tendances, analyses et actualités des marchés africains',
      description: 'Restez informé avec les dernières tendances, analyses et actualités des marchés africains. Des conseils et des analyses d\'experts.',
      icon: BookOpen,
      color: 'from-purple-500 to-indigo-600',
      features: [
        'Mises à jour quotidiennes',
        'Analyses d\'experts sur les secteurs',
        'Histoires de réussite et études de cas',
        'Conseils de développement des affaires',
        'Mises à jour réglementaires',
        'Abonnements à la newsletter'
      ],
      stats: [
        { label: 'Articles publiés', value: '500+' },
        { label: 'Lecteurs mensuels', value: '25K+' },
        { label: 'Contributeurs experts', value: '50+' },
        { label: 'Sujets couverts', value: '100+' }
      ],
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

      {/* Main Platforms */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">Plateformes clés</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 px-2 sm:px-0">Des outils puissants pour chaque aspect de votre entreprise</p>
          </motion.div>

          <div className="space-y-8 sm:space-y-12 md:space-y-16">
            {platforms.map((platform, index) => (
              <motion.div
                key={platform.id}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                viewport={{ once: true }}
                className={`relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-r ${platform.color} text-white`}
              >
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="relative p-4 sm:p-6 md:p-10 lg:p-12">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
                    <div className="space-y-6 sm:space-y-8">
                      <div className="flex items-center space-x-3 sm:space-x-4">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-white/20 rounded-xl sm:rounded-2xl flex items-center justify-center">
                          <platform.icon size={20} />
                        </div>
                        <div>
                          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2">{platform.title}</h3>
                          <p className="text-white/80 text-sm sm:text-base md:text-lg">{platform.subtitle}</p>
                        </div>
                      </div>

                      <p className="text-sm sm:text-base md:text-lg leading-relaxed text-white/90">
                        {platform.description}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        {platform.features.slice(0, 4).map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center space-x-2 sm:space-x-3">
                            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full flex-shrink-0"></div>
                            <span className="text-white/90 text-xs sm:text-sm md:text-base">{feature}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                        <button
                          onClick={() => handlePlatformClick(platform)}
                          className="bg-white text-gray-900 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center space-x-2 w-full sm:w-auto text-sm sm:text-base"
                        >
                          <span>Explorer la plateforme</span>
                          <ExternalLink size={14} className="sm:w-4 sm:h-4" />
                        </button>
                        <Link
                          to="/enrollments"
                          className="border border-white/30 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-full font-semibold hover:bg-white/10 transition-colors duration-200 text-center w-full sm:w-auto text-sm sm:text-base"
                        >
                          S'inscrire maintenant
                        </Link>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                      {platform.stats.map((stat, statIndex) => (
                        <motion.div
                          key={statIndex}
                          initial={{ scale: 0.8, opacity: 0 }}
                          whileInView={{ scale: 1, opacity: 1 }}
                          transition={{ delay: statIndex * 0.1, duration: 0.5 }}
                          viewport={{ once: true }}
                          className="bg-white/10 backdrop-blur-sm p-3 sm:p-4 md:p-6 rounded-xl sm:rounded-2xl text-center"
                        >
                          <h4 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-1 sm:mb-2">{stat.value}</h4>
                          <p className="text-white/80 text-xs sm:text-sm md:text-base">{stat.label}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">Pourquoi choisir nos plateformes ?</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 px-2 sm:px-0">Conçues spécifiquement pour les entreprises africaines</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-white p-6 sm:p-8 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 text-center"
              >
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <benefit.icon className="text-green-600" size={24} />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Media Platforms */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">Rejoignez-nous</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 px-2 sm:px-0">Rejoignez notre communauté en pleine croissance sur les plateformes sociales</p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            {socialPlatforms.map((social, index) => (
              <motion.a
                key={social.name}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.05 }}
                className="block bg-white border border-gray-200 rounded-xl sm:rounded-2xl p-6 sm:p-8 hover:shadow-xl transition-all duration-300 text-center group flex flex-col items-center justify-center w-full max-w-xs sm:max-w-sm md:w-80 lg:w-72"
              >
                <div className={`w-12 h-12 sm:w-16 sm:h-16 ${social.color} rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <social.icon className="text-white" size={24} />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 text-center">{social.name}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed text-center max-w-xs text-sm sm:text-base">{social.description}</p>
                <div className="flex items-center justify-center space-x-2 text-center">
                  <span className="text-xl sm:text-2xl font-bold text-gray-900">{social.followers}</span>
                  <span className="text-gray-500 text-sm sm:text-base">followers</span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>
      {/* Coming Soon Modal */}
      <AnimatePresence>
        {showComingSoon && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowComingSoon(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-white rounded-[2.5rem] shadow-2xl overflow-hidden max-w-lg w-full p-8 md:p-12 text-center"
            >
              <button
                onClick={() => setShowComingSoon(false)}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-900"
              >
                <X size={24} />
              </button>

              <div className="mb-8">
                <div className="w-24 h-24 bg-blue-100 rounded-3xl flex items-center justify-center mx-auto mb-6 relative">
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <ShoppingCart size={48} className="text-blue-600" />
                  </motion.div>
                  <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center border-4 border-white"
                  >
                    <Zap size={14} className="text-white fill-current" />
                  </motion.div>
                </div>
                <h2 className="text-3xl font-extrabold text-gray-900 mb-4 italic">
                  Bientôt <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Disponible</span>
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Notre équipe travaille d'arrache-pied pour vous offrir la meilleure expérience e-commerce en Afrique.
                  Soyez les premiers à être informés du lancement !
                </p>
              </div>

              <div className="space-y-4">
                <button
                  onClick={() => setShowComingSoon(false)}
                  className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 hover:shadow-blue-300 transform hover:-translate-y-1 active:translate-y-0"
                >
                  D'accord, j'attendrais !
                </button>
                <Link
                  to="/enrollments"
                  className="block text-blue-600 font-semibold hover:underline"
                  onClick={() => setShowComingSoon(false)}
                >
                  S'inscrire pour les mises à jour
                </Link>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-100 grid grid-cols-3 gap-4">
                {['Paiement Sécurisé', 'Support 24/7', 'Livraison Rapide'].map((text, i) => (
                  <div key={i} className="text-center">
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{text}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Platforms;