import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Globe, TrendingUp, Star, Quote, Check, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import ProductCarousel from '../components/ProductCarousel';
import TestimonialCarousel from '../components/TestimonialCarousel';
import PinterestCard from '../components/PinterestCard';

const Home = () => {
  const { token } = useAuth();

  const services = [
    {
      title: 'E-commerce Premium',
      subtitle: 'VENTE EN LIGNE',
      description: 'Une vitrine digitale exclusive pour l\'artisanat et les produits d\'excellence africaine. Boutiques personnalisées, paiements sécurisés et logistique intégrée.',
      image: '/images/service_ecommerce.png',
      path: 'https://shop.fabiratrading.com/',
      isExternal: true,
      span: 'md:col-span-2 md:row-span-2'
    },
    {
      title: 'Événements Clés',
      subtitle: 'NETWORKING',
      description: 'Sommet FIPA, webinaires et rencontres exclusives avec les leaders d\'influence.',
      image: '/images/service_events.png',
      path: '/events',
      span: 'md:col-span-1 md:row-span-1'
    },
    {
      title: 'Activités Terrain',
      subtitle: 'IMPACT REEL',
      description: 'Formations, accompagnement stratégique et projets concrets pour l\'innovation.',
      image: '/images/service_activities.png',
      path: '/activities',
      span: 'md:col-span-1 md:row-span-2'
    },
    {
      title: 'Actualités & Blog',
      subtitle: 'SAVOIR & VEILLE',
      description: 'Analyses stratégiques et success stories du continent pour rester à la pointe de l\'innovation.',
      image: '/images/service_blog_news.png',
      path: '/blog',
      span: 'md:col-span-2 md:row-span-1'
    }
  ];

  interface StatItem {
    number: string;
    label: string;
    description: string;
    icon: any;
    color: string;
    isHero?: boolean;
  }

  const stats: StatItem[] = [
    { number: '10,000+', label: 'Partenaires Actifs', description: 'Un écosystème en plein essor.', icon: Users, color: 'bg-gradient-to-br from-green-500 to-emerald-900 text-white border-transparent shadow-2xl shadow-green-950/50' },
    { number: '50+', label: 'Pays Connectés', description: 'L\'excellence sans frontières.', icon: Globe, color: 'bg-gradient-to-br from-green-500 to-emerald-900 text-white border-transparent shadow-2xl shadow-green-950/50' },
    { number: '95%', label: 'Taux de Réussite', description: 'Un engagement pour le succès.', icon: TrendingUp, color: 'bg-gradient-to-br from-green-500 to-emerald-900 text-white border-transparent shadow-2xl shadow-green-950/50', isHero: true },
    { number: '4.9/5', label: 'Satisfaction', description: 'La confiance de notre réseau.', icon: Star, color: 'bg-gradient-to-br from-green-500 to-emerald-900 text-white border-transparent shadow-2xl shadow-green-950/50' },
  ];


  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-white"
    >
      {/* Modern Cinematic Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-gray-950">
        <div className="absolute inset-0 z-0">
          <motion.img
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.6 }}
            transition={{ duration: 1.5 }}
            src="/images/hero_african_business.png"
            alt="African Business Excellence"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-950/40 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid lg:grid-cols-2 items-center gap-12 sm:gap-20">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="space-y-10"
            >
              <div className="space-y-6">
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="inline-block text-green-500 font-black tracking-[0.4em] uppercase text-xs sm:text-sm"
                >
                  L'excellence à votre portée
                </motion.span>
                <h1 className="text-5xl sm:text-7xl md:text-8xl font-black text-white leading-[0.95] tracking-tighter">
                  BAY SA<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">WARR</span>
                </h1>
                <p className="text-xl sm:text-2xl text-gray-400 max-w-xl font-medium leading-relaxed">
                  Connecter l'excellence entrepreneuriale africaine aux opportunités d'un marché mondial en pleine mutation.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-5">
                {token ? (
                  <Link
                    to="/dashboard"
                    className="group bg-green-600 text-white px-8 py-5 rounded-2xl font-black hover:bg-green-500 transition-all duration-300 flex items-center justify-center space-x-3 shadow-2xl shadow-green-900/20"
                  >
                    <span>Tableau de Bord</span>
                    <LayoutDashboard size={22} className="group-hover:rotate-12 transition-transform" />
                  </Link>
                ) : (
                  <Link
                    to="/enrollments"
                    className="group bg-green-600 text-white px-8 py-5 rounded-2xl font-black hover:bg-green-500 transition-all duration-300 flex items-center justify-center space-x-3 shadow-2xl shadow-green-900/20"
                  >
                    <span>Rejoindre le Réseau</span>
                    <ArrowRight size={22} className="group-hover:translate-x-2 transition-transform" />
                  </Link>
                )}
                <Link
                  to="/events"
                  className="bg-white/5 backdrop-blur-md text-white border border-white/10 px-8 py-5 rounded-2xl font-black hover:bg-white/10 transition-all duration-300 flex items-center justify-center space-x-3"
                >
                  <span>Nos Événements</span>
                  <TrendingUp size={22} />
                </Link>
              </div>
            </motion.div>

            {/* Floating Glass Quote */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, rotateY: 20 }}
              animate={{ scale: 1, opacity: 1, rotateY: 0 }}
              transition={{ delay: 0.4, duration: 1 }}
              className="hidden lg:block relative p-10 bg-white/5 backdrop-blur-3xl rounded-[3rem] border border-white/10 shadow-2xl overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <Quote size={120} className="text-white" />
              </div>

              <div className="relative space-y-8">
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <img
                      src="https://res.cloudinary.com/drxouwbms/image/upload/v1755778170/Web_Photo_Editor_1_nik1li.jpg"
                      alt="Présidente"
                      className="w-20 h-20 rounded-full object-cover ring-4 ring-green-500/30"
                    />
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center ring-4 ring-gray-900">
                      <Check className="text-white" size={16} />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-white text-xl font-black uppercase tracking-wider">Fatou Fabira Dramé</h4>
                    <p className="text-green-500 font-bold text-sm uppercase tracking-widest">Présidente Fondatrice</p>
                  </div>
                </div>

                <p className="text-gray-300 text-2xl font-light italic leading-relaxed">
                  "Nous bâtissons un pont indestructible entre le génie local et l'ambition globale. Chaque partenariat est une pierre angulaire du futur de l'Afrique."
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-green-500/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute top-10 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] animate-pulse delay-1000" />
      </section>

      {/* Modern Pinterest-style Grid Section */}
      <section className="py-24 sm:py-32 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 space-y-4">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="inline-block px-4 py-2 bg-green-50 text-green-700 text-[11px] font-black uppercase tracking-[0.3em] rounded-full border border-green-100 shadow-sm"
            >
              Écosystème BAYS AWARR
            </motion.span>
            <h2 className="text-4xl sm:text-6xl font-black text-gray-900 tracking-tighter">
              Une vision, des <span className="text-green-600">possibilités infinies</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto font-medium">
              Découvrez comment nous transformons le paysage économique à travers nos piliers stratégiques.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 auto-rows-[400px]">
            {services.map((service, index) => (
              <PinterestCard
                key={index}
                index={index}
                title={service.title}
                subtitle={service.subtitle}
                description={service.description}
                image={service.image}
                link={service.path}
                isExternal={service.isExternal}
                className={service.span}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Immersive Impact Section - 3D Green Expansion */}
      <section className="relative py-24 sm:py-32 bg-gray-50/50 overflow-hidden">
        {/* Background elements - soft glows */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-green-500/5 blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-blue-500/5 blur-[120px]" />

        <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-10">
            <div className="max-w-2xl space-y-6">
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="inline-block px-4 py-2 bg-green-100 text-green-700 text-[10px] font-black uppercase tracking-[0.3em] rounded-full border border-green-200 shadow-sm"
              >
                Indicateurs de Performance
              </motion.span>
              <h2 className="text-4xl sm:text-6xl font-black text-gray-900 tracking-tighter leading-tight">
                Maximiser votre <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-600">potentiel</span> d'affaires
              </h2>
            </div>
            <p className="text-xl text-gray-500 leading-relaxed max-w-sm font-medium">
              Gagnez du temps et de l'influence grâce à notre écosystème conçu pour les visionnaires africains.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                viewport={{ once: true }}
                className={`group relative p-8 sm:p-12 flex flex-col justify-between h-[360px] border transition-all duration-700 hover:scale-[1.02]
                  rounded-tl-2xl rounded-br-2xl rounded-tr-[5rem] rounded-bl-[5rem]
                  ${stat.color}`}
              >
                {/* Icon Container */}
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-10 transition-transform duration-500 group-hover:scale-110 bg-white/10">
                  <stat.icon className="text-white group-hover:rotate-12 transition-transform" size={28} />
                </div>

                <div className="space-y-6">
                  <div>
                    <div className="text-5xl sm:text-6xl font-black tracking-tighter mb-2 text-white">
                      {stat.number}
                    </div>
                    <div className="text-sm font-black uppercase tracking-widest text-green-300">
                      {stat.label}
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm font-medium leading-relaxed transition-opacity text-white/70 group-hover:text-white">
                    {stat.description}
                  </p>
                </div>

                {/* Decorative cut highlight for hero card */}
                {stat.isHero && (
                  <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none group-hover:opacity-30 transition-opacity">
                    <TrendingUp size={100} className="text-white" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-24 sm:py-32 overflow-hidden bg-white">
        <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="space-y-4">
              <span className="text-green-600 font-black uppercase tracking-[0.3em] text-xs">Exclusivités du réseau</span>
              <h2 className="text-4xl sm:text-6xl font-black text-gray-900 tracking-tighter">
                Produits <span className=" text-green-600">Vedettes</span>
              </h2>
            </div>
            <p className="text-lg text-gray-500 max-w-sm font-medium leading-relaxed">
              Une sélection rigoureuse des meilleures produits de notre site e-commerce.
            </p>
          </div>

          <div className="mx-[-1rem]">
            <ProductCarousel />
          </div>
        </div>
      </section>

      {/* Refined Testimonials Section with High-Impact Cool Background */}
      <section className="relative py-24 sm:py-32 bg-slate-50/30 overflow-hidden">
        {/* Ambient Boutique Background Elements - Amplified for visibility */}
        {/* 1. Large vibrant glows */}
        <div className="absolute -top-24 -right-24 w-[600px] h-[600px] bg-green-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-[700px] h-[700px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />

        {/* 2. Floating Animated Glass Orbs */}
        <motion.div
          animate={{
            y: [0, -40, 0],
            x: [0, 30, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-20 w-80 h-80 bg-green-400/10 rounded-full blur-[90px] pointer-events-none border border-green-500/5"
        />
        <motion.div
          animate={{
            y: [0, 50, 0],
            x: [0, -40, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 right-20 w-[450px] h-[450px] bg-blue-400/10 rounded-full blur-[110px] pointer-events-none border border-blue-500/5"
        />

        {/* 3. Distinct Texture Overlay (Dot Grid) */}
        <div className="absolute inset-0 bg-[radial-gradient(#d1d5db_1.5px,transparent_1.5px)] [background-size:32px_32px] opacity-[0.15] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 space-y-4">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="inline-block px-4 py-2 bg-white text-green-700 text-[10px] font-black uppercase tracking-[0.3em] rounded-full shadow-sm border border-gray-100"
            >
              Impact & Témoignages
            </motion.span>
            <h2 className="text-4xl sm:text-6xl font-black text-gray-900 tracking-tighter">
              La voix de nos <span className="text-green-600">membres</span>
            </h2>
          </div>

          <TestimonialCarousel />
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[4rem] bg-gradient-to-br from-green-600 to-indigo-900 p-12 sm:p-24 text-center">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')] opacity-20" />
            <div className="relative z-10 space-y-10">
              <h2 className="text-5xl sm:text-7xl font-black text-white tracking-tighter leading-tight">
                Prêt à rejoindre<br />l'excellence ?
              </h2>
              <p className="text-xl sm:text-2xl text-white/70 max-w-2xl mx-auto font-light">
                Ne manquez pas l'opportunité de propulser votre activité vers une dimension globale.
              </p>
              <div className="pt-6">
                <Link
                  to="/enrollments"
                  className="inline-flex items-center gap-4 bg-white text-gray-900 px-10 py-6 rounded-[2rem] font-black text-lg hover:scale-105 transition-transform shadow-2xl shadow-black/20"
                >
                  Démarrer l'aventure <ArrowRight />
                </Link>
              </div>
            </div>

            {/* Background decorative shapes */}
            <div className="absolute -top-1/2 -left-1/4 w-[800px] h-[800px] bg-white/10 rounded-full blur-[120px] pointer-events-none" />
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Home;