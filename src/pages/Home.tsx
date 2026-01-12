import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Globe, TrendingUp, Star, ShoppingCart, Building2, Handshake, Quote, Check } from 'lucide-react';
import ProductCarousel from '../components/ProductCarousel';
import TestimonialSlider from '../components/TestimonialSlider';

const Home = () => {
  const quickAccessCards = [
    {
      title: 'A propos de BAY SA WAAR',
      description: 'Apprenez-en plus sur notre mission, notre vision et notre engagement',
      icon: Building2,
      path: '/about',
      color: 'bg-green-600',
    },
    {
      title: 'Plateforme FIPA',
      description: 'Découvrez les produits africains et connectez-vous avec les fabricants du continent.',
      icon: Globe,
      path: '/platforms',
      color: 'bg-blue-600',
    },
    {
      title: 'Solutions e-commerce',
      description: 'Outils de commerce en ligne pour développer votre présence numérique.',
      icon: ShoppingCart,
      path: '/platforms',
      color: 'bg-purple-600',
    },
    {
      title: 'Programme de partenariat',
      description: 'Rejoignez notre réseau de distributeurs et partenaires pour une croissance mutuelle.',
      icon: Handshake,
      path: '/enrollments',
      color: 'bg-orange-600',
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
                to="/platforms"
                className="bg-white text-green-600 border-2 border-green-600 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold hover:bg-green-50 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <span>Découvrez les plateformes</span>
                <Globe size={20} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-24 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-green-50/30 to-white" />
        <div className="absolute inset-0 bg-white/5 opacity-5" />

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
        <div className="absolute inset-0 bg-white/5 opacity-5" />
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {quickAccessCards.map((card, index) => (
              <motion.div
                key={index}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="group relative"
              >
                <Link to={card.path}>
                  {/* Glassmorphic Card */}
                  <div className="relative p-6 sm:p-8 rounded-3xl bg-white/50 backdrop-blur-xl border border-white/60 shadow-xl transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-3 group-hover:bg-white/60 h-full">
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Card Header with Icon */}
                    <div className="relative mb-8">
                      <div className={`absolute inset-0 ${card.color} opacity-30 blur-2xl transition-all duration-500 group-hover:opacity-50`} />
                      <div className={`relative w-14 h-14 sm:w-16 sm:h-16 ${card.color} rounded-2xl flex items-center justify-center transform transition-all duration-500 group-hover:rotate-12 group-hover:scale-110 shadow-lg`}>
                        <card.icon className="text-white" size={28} />
                      </div>
                    </div>

                    {/* Card Content */}
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 transition-colors duration-300 group-hover:text-green-600 relative">
                      {card.title}
                    </h3>
                    <p className="text-gray-700 mb-4 sm:mb-6 leading-relaxed overflow-hidden h-24">
                      {card.description}
                    </p>

                    {/* Card Footer */}
                    <div className="flex items-center text-green-600 font-bold">
                      <span className="mr-2">En savoir plus</span>
                      <motion.div
                        className="transform transition-transform duration-300 group-hover:translate-x-2"
                      >
                        <ArrowRight size={20} />
                      </motion.div>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-400/20 to-transparent rounded-full translate-x-12 -translate-y-12 opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl" />
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-green-500/40 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                  </div>
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