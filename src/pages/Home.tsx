import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Globe, TrendingUp, Star, ShoppingCart, Building2, Handshake, Quote, Check, BookOpen } from 'lucide-react';
import ProductCarousel from '../components/ProductCarousel';
import TestimonialSlider from '../components/TestimonialSlider';

const Home = () => {
  const quickAccessCards = [
    {
      title: 'A propos de BAY SA WAAR',
      subtitle: 'NOTRE HISTOIRE',
      description: 'Apprenez-en plus sur notre mission, notre vision et notre engagement.',
      icon: Building2,
      path: '/about',
      color: 'from-green-500 to-emerald-600',
      glow: 'shadow-green-500/20',
      accent: 'text-green-600',
      features: ['Mission Clé', 'Vision 2030', 'Engagement'],
    },
    {
      title: 'Nos Événements',
      subtitle: 'PROCHAINS RENDEZ-VOUS',
      description: 'Participez à nos événements exclusifs et développez votre réseau.',
      icon: TrendingUp,
      path: '/events',
      color: 'from-blue-500 to-cyan-600',
      glow: 'shadow-blue-500/20',
      accent: 'text-blue-600',
      features: ['Sommet FIPA', 'Webinaires', 'Networking'],
    },
    {
      title: 'Nos Activités',
      subtitle: 'ACTION SUR LE TERRAIN',
      description: 'Découvrez les actions concrètes que nous menons pour le développement.',
      icon: Users,
      path: '/activities',
      color: 'from-purple-500 to-indigo-600',
      glow: 'shadow-purple-500/20',
      accent: 'text-purple-600',
      features: ['Formations', 'Accompagnement', 'Projets'],
    },
    {
      title: 'Blog & Actualités',
      subtitle: 'VEILLE STRATÉGIQUE',
      description: 'Soyez informé de nos activités à travers notre blog et nos actualités.',
      icon: BookOpen,
      path: '/blog',
      color: 'from-orange-500 to-amber-600',
      glow: 'shadow-orange-500/20',
      accent: 'text-orange-600',
      features: ['Articles récents', 'Success Stories', 'Événements'],
    },
  ];

  const stats = [
    { number: '10,000+', label: 'Utilisateurs actifs', icon: Users },
    { number: '50+', label: 'Pays', icon: Globe },
    { number: '95%', label: 'Taux de croissance', icon: TrendingUp },
    { number: '4.9/5', label: 'Note', icon: Star },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen"
    >
      {/* Hero Section with Background Image */}
      <section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img
            src="https://res.cloudinary.com/drxouwbms/image/upload/v1755783263/20250821_1333_Senegalese_Unity_Network_simple_compose_01k36d7c5ze1vr73ppjxyq0q0c_pdhnmq.png"
            alt="African Business"
            className="w-full h-full object-cover filter blur-sm"
          />
          <div className="absolute inset-0 bg-black opacity-30"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 py-8 sm:py-12">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-3 sm:space-y-4">
              <motion.h1
                className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                Bienvenue sur{' '}
                <span className="relative">
                  <span
                    className="text-green-900 bg-clip-text bg-gradient-to-r from-green-900 to-green-900"
                    style={{
                      WebkitTextStroke: '1px white',

                    }}
                  >
                    BAY SA WARR
                  </span>

                </span>
              </motion.h1>
              <p className="text-base sm:text-lg md:text-2xl text-white max-w-3xl mx-auto leading-relaxed font-light">
                Connectant l'excellence africaine aux opportunités mondiales
              </p>
            </div>

            {/* Enhanced President's Message with Glassmorphism */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="relative bg-white/40 backdrop-blur-2xl p-6 sm:p-8 rounded-3xl shadow-2xl max-w-4xl mx-auto border border-white/60 hover:bg-white/50 transition-all duration-500"
            >
              {/* Glassmorphic Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-blue-500/10 rounded-3xl" />

              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-green-500 rounded-full flex items-center justify-center ring-4 ring-white/80 shadow-lg shadow-green-500/30">
                  <Quote className="text-white" size={24} />
                </div>
              </div>

              <div className="flex items-center space-x-4 sm:space-x-6 mb-4 sm:mb-6 relative">
                <div className="relative">
                  <div className="absolute inset-0 bg-green-400/30 rounded-full blur-md" />
                  <img
                    src="https://res.cloudinary.com/drxouwbms/image/upload/v1755778170/Web_Photo_Editor_1_nik1li.jpg"
                    alt="Fatou Fabira Dramé"
                    className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover ring-4 ring-white/80 shadow-xl"
                  />
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-br from-green-600 to-green-500 rounded-full flex items-center justify-center ring-4 ring-white/80 shadow-lg">
                    <Check className="text-white" size={16} />
                  </div>
                </div>
                <div className="text-left">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Message de la présidente</h3>
                  <p className="text-gray-700">Mme Fatou Fabira Dramé</p>
                  <p className="text-green-600 text-xs sm:text-sm font-bold">Présidente de la plateforme</p>
                </div>
              </div>

              <p className="text-gray-800 text-base sm:text-lg leading-relaxed italic relative">
                "Chez BAY SA WARR, nous croyons au potentiel illimité des entreprises africaines.
                Notre plateforme joue le rôle de pont reliant l'excellence locale aux marchés mondiaux,
                favorisant l'innovation, le partenariat et une croissance durable à travers le continent."
              </p>
            </motion.div>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center"
            >
              <Link
                to="/enrollments"
                className="bg-green-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold hover:bg-green-700 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
              >
                <span>Rejoignez notre réseau</span>
                <ArrowRight size={20} />
              </Link>
              <Link
                to="/events"
                className="bg-white text-green-600 border-2 border-green-600 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold hover:bg-green-50 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <span>Nos Événements</span>
                <TrendingUp size={20} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-24 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-green-50/30 to-white" />
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Notre Impact en Chiffres
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Découvrez comment BAY SA WARR transforme le commerce en Afrique
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="relative group"
              >
                {/* Glassmorphic Card */}
                <div className="absolute inset-0 bg-white/40 backdrop-blur-xl rounded-3xl transform group-hover:scale-105 transition-all duration-500 border border-white/60 shadow-xl" />
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-blue-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative p-8 text-center">
                  <div className="mb-6 relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-600 to-green-400 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 mx-auto bg-gradient-to-br from-green-600 via-green-500 to-green-400 rounded-full flex items-center justify-center shadow-2xl shadow-green-500/40 group-hover:shadow-green-500/60 transition-shadow duration-500">
                      <stat.icon className="text-white" size={30} />
                    </div>
                  </div>

                  <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2, duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-3xl sm:text-4xl font-black text-gray-900 mb-3 relative"
                  >
                    <span className="relative z-10 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">{stat.number}</span>
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2/3 h-3 bg-green-300/40 -z-10 blur-sm" />
                  </motion.h3>

                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: index * 0.3, duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-gray-700 font-semibold text-sm sm:text-base"
                  >
                    {stat.label}
                  </motion.p>

                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-green-500/40 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 blur-sm" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Carousel - Full Width */}
      <section className="relative py-24 overflow-hidden">
        {/* Glassmorphic Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50" />
        <div className="absolute inset-0 backdrop-blur-3xl bg-white/30" />

        {/* Floating Orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse delay-1000" />

        <div className="relative">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16 px-4"
          >
            <motion.span
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-block text-green-600 font-bold px-6 py-2 rounded-full bg-white/60 backdrop-blur-md border border-white/40 shadow-lg mb-6"
            >
              ✨ Nos Vedettes
            </motion.span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 mb-6 tracking-tight">
              Produits et services{' '}
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">
                  en vedette
                </span>
                <div className="absolute -bottom-2 left-0 w-full h-4 bg-green-200/40 -z-10 blur-sm" />
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Découvrez l'excellence africaine : produits authentiques et solutions innovantes
            </p>
          </motion.div>

          {/* Full Width Carousel */}
          <div className="w-full">
            <ProductCarousel />
          </div>
        </div>
      </section>

      {/* Quick Access Cards Section */}
      <section className="relative py-24 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-white to-gray-50" />
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
        <div className="absolute right-0 top-1/2 w-96 h-96 bg-green-200/30 rounded-full filter blur-[80px]" />
        <div className="absolute left-0 bottom-0 w-96 h-96 bg-blue-200/30 rounded-full filter blur-[80px]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.span
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-block text-green-600 font-medium px-4 py-2 rounded-full bg-green-50 border border-green-100 mb-4"
            >
              Solutions Intégrées
            </motion.span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Découvrez notre{' '}
              <span className="relative inline-block">
                écosystème
                <div className="absolute bottom-2 left-0 w-full h-3 bg-green-200/50 -z-10 transform -rotate-1"></div>
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Des solutions complètes pour développer votre activité en Afrique et au-delà
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {quickAccessCards.map((card, index) => (
              <motion.div
                key={index}
                initial={{ y: 40, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="group relative"
              >
                <Link to={card.path} className="block h-full">
                  {/* Main Card Structure */}
                  <div className={`h-full bg-white/40 backdrop-blur-xl rounded-[2.5rem] border border-gray-100 p-8 shadow-2xl transition-all duration-500 group-hover:-translate-y-4 hover:shadow-xl relative overflow-hidden ${card.glow}`}>

                    {/* Elaborated: Decorative Corner Accent */}
                    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${card.color} opacity-[0.03] rounded-bl-[5rem] group-hover:opacity-[0.08] transition-opacity`} />
                    <div className={`absolute top-8 right-8 w-2 h-2 rounded-full bg-gradient-to-r ${card.color} opacity-20 group-hover:scale-150 transition-transform`} />

                    {/* Elaborated: Inner Border Glow Effect */}
                    <div className={`absolute inset-[1px] rounded-[2.4rem] border border-white/50 pointer-events-none`} />

                    {/* Icon with Dynamic Glow & Layered Container */}
                    <div className="relative mb-8 group-hover:rotate-3 transition-transform duration-500 flex justify-center md:justify-start">
                      <div className={`absolute -inset-2 bg-gradient-to-br ${card.color} rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity`} />
                      <div className={`relative w-20 h-20 rounded-3xl bg-gradient-to-br ${card.color} flex items-center justify-center text-white shadow-lg`}>
                        <card.icon size={36} strokeWidth={2.5} />
                      </div>
                    </div>

                    <div className="mb-6 text-center md:text-left">
                      <h3 className="text-xl font-black text-gray-900 mb-1 leading-tight group-hover:text-green-600 transition-colors">{card.title}</h3>
                      <p className={`text-[10px] font-black uppercase tracking-[0.2em] ${card.accent}`}>{card.subtitle}</p>
                    </div>

                    <p className="text-gray-500 text-sm leading-relaxed mb-8 font-medium text-center md:text-left h-20 overflow-hidden">
                      {card.description}
                    </p>

                    <div className="space-y-3 mb-10">
                      {card.features.map((feature, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-3 justify-center md:justify-start">
                          <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${card.color} shadow-sm shadow-current`} />
                          <span className="text-[11px] font-bold text-gray-800 tracking-wide uppercase opacity-80">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-center md:justify-start text-green-600 font-bold text-xs uppercase tracking-widest group/btn">
                      <span className="mr-2">En savoir plus</span>
                      <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                    </div>
                  </div>
                  {/* Visual Accent Glow Backdrop */}
                  <div className={`absolute -inset-1 bg-gradient-to-br ${card.color} rounded-[2.8rem] blur-2xl opacity-0 group-hover:opacity-[0.12] transition-opacity -z-10`} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Ce que nos clients disent</h2>
            <p className="text-lg sm:text-xl text-gray-600">Fait confiance par les entreprises partout en Afrique</p>
          </motion.div>
          <TestimonialSlider />
        </div>
      </section>
    </motion.div>
  );
};

export default Home;