// src/pages/Events.tsx
import { useEffect, useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { Calendar, MapPin, Users, ArrowRight, TrendingUp, Globe, Award, CheckCircle, Play } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Swal from 'sweetalert2';
import { eventsAPI } from '../services/api';

interface Event {
  _id: string;
  slug: string;
  title: string;
  shortDescription: string;
  images: { url: string; alt: string }[];
  type: string;
  dateStart: string;
  dateEnd: string;
  location: string;
  priceMember: number;
  priceNonMember: number;
  maxParticipants: number;
  registrations: any[];
  isFeatured: boolean;
}

const Events = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    eventsAPI.getAll()
      .then(res => {
        setEvents(res.data.events);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching events:", err);
        setLoading(false);
      });
  }, []);

  const handleRegister = async (slug: string) => {
    if (!user) {
      Swal.fire({
        title: 'Connexion requise',
        text: 'Vous devez être membre de Baysawaar pour vous inscrire à un événement.',
        icon: 'info',
        confirmButtonColor: '#16a34a'
      });
      return;
    }

    if (user.role === 'admin') {
      Swal.fire({
        title: 'Accès restreint',
        text: 'Les administrateurs ne peuvent pas s\'inscrire aux événements.',
        icon: 'warning',
        confirmButtonColor: '#16a34a'
      });
      return;
    }

    const result = await Swal.fire({
      title: 'Confirmer l\'inscription',
      text: 'Voulez-vous vraiment vous inscrire à cet événement ?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Oui, m\'inscrire',
      cancelButtonText: 'Annuler',
      confirmButtonColor: '#16a34a',
      cancelButtonColor: '#d33'
    });

    if (!result.isConfirmed) return;

    try {
      await eventsAPI.register(slug);

      const { data } = await eventsAPI.getAll();
      setEvents(data.events);

      Swal.fire({
        icon: 'success',
        title: 'Inscription réussie !',
        text: 'Un email de confirmation vous a été envoyé.',
        timer: 3000,
        showConfirmButton: false,
        confirmButtonColor: '#16a34a'
      });
    } catch (err: any) {
      const message = err.response?.data?.message || 'Erreur inconnue';

      if (message.includes('déjà inscrit')) {
        Swal.fire({
          title: 'Déjà inscrit',
          text: message,
          icon: 'info',
          confirmButtonColor: '#16a34a'
        });
        const { data } = await eventsAPI.getAll();
        setEvents(data.events);
      } else {
        Swal.fire({
          title: 'Erreur',
          text: message,
          icon: 'error',
          confirmButtonColor: '#16a34a'
        });
      }
    }
  };

  const stats = [
    { icon: Calendar, value: "50+", label: "Événements par an" },
    { icon: Users, value: "10k+", label: "Participants actifs" },
    { icon: Globe, value: "20+", label: "Pays représentés" },
    { icon: Award, value: "98%", label: "Satisfaction" }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-green-500 selection:text-white pb-20">
      {/* Hero Section - AfroNeo Style: Big, Bold, Immersive */}
      {events.find(e => e.isFeatured) && (
        <section className="relative h-screen min-h-[700px] flex items-center overflow-hidden">
          {/* Background Image with heavy overlay */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent z-10" />
            <div className="absolute inset-0 bg-black/40 z-0" />
            <motion.img
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 10, ease: "easeOut" }}
              src="https://res.cloudinary.com/drxouwbms/image/upload/v1765733341/african-kid-marketplace_zwl4xj.jpg"
              alt="FIPA 2026"
              className="w-full h-full object-cover grayscale-[30%]"
            />
          </div>

          <div className="relative z-20 max-w-[90rem] mx-auto px-6 w-full pt-20">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="max-w-5xl"
            >
              <div className="flex items-center gap-3 mb-8">
                <span className="h-[1px] w-12 bg-green-500"></span>
                <span className="text-green-400 uppercase tracking-[0.2em] text-sm font-medium">L'événement de l'année</span>
              </div>

              <h1 className="text-7xl md:text-9xl font-black tracking-tight leading-[0.9] mb-8 text-white">
                FIPA <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-green-700">2026</span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-300 max-w-2xl font-light mb-12 leading-relaxed">
                Le rendez-vous incontournable pour <span className="text-white font-medium">connecter l'Afrique au monde</span>.
                Une immersion totale dans le futur du commerce continental.
              </p>

              <div className="flex flex-wrap gap-6">
                <motion.a
                  href="/fipa-2026"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-white text-black px-10 py-5 rounded-none text-lg font-bold tracking-wide hover:bg-green-500 hover:text-white transition-all duration-300 flex items-center gap-3"
                >
                  RÉSERVER MA PLACE <ArrowRight size={20} />
                </motion.a>

                <motion.button
                  whileHover={{ scale: 1.02, x: 5 }}
                  className="text-white px-10 py-5 border border-white/20 hover:border-white hover:bg-white/5 transition-all duration-300 flex items-center gap-3 text-lg font-medium"
                >
                  <Play size={20} fill="currentColor" /> DÉCOUVRIR LE TEASER
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
          >
            <span className="text-[10px] uppercase tracking-widest text-gray-500">Scroll</span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-green-500 to-transparent"></div>
          </motion.div>
        </section>
      )}

      {/* Stats Section - Minimalist */}
      <section className="py-24 border-b border-white/5">
        <div className="max-w-[90rem] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative group"
              >
                <div className="flex flex-col">
                  <span className="text-5xl md:text-7xl font-black text-gray-800 group-hover:text-green-900/40 transition-colors duration-500 select-none absolute -top-8 -left-4 z-0">
                    {stat.value.replace(/\D/g, '')}
                  </span>
                  <div className="relative z-10 pl-2">
                    <stat.icon className="text-green-500 mb-4" size={32} />
                    <span className="text-4xl font-bold text-white block mb-2">{stat.value}</span>
                    <span className="text-sm text-gray-400 uppercase tracking-widest">{stat.label}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Events / Content - Grid Layout */}
      <section className="py-32 relative">
        <div className="max-w-[90rem] mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div>
              <span className="text-green-500 font-bold tracking-widest uppercase text-sm mb-4 block">Agenda</span>
              <h2 className="text-5xl md:text-7xl font-bold text-white mb-2 leading-none">
                Événements <br /> <span className="text-gray-700">à venir</span>
              </h2>
            </div>

            <a href="#calendar" className="text-white border-b border-green-500 pb-1 hover:text-green-400 transition-colors uppercase text-sm tracking-wider font-medium">
              Voir tout le calendrier
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event, idx) => (
              <motion.div
                key={event._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group relative h-[500px] overflow-hidden bg-[#101010] border border-white/5 hover:border-green-500/30 transition-all duration-500"
              >
                <div className="absolute inset-0 z-0">
                  <img
                    src={event.images?.[0]?.url || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800&auto=format&fit=crop"}
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-40"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                </div>

                <div className="relative z-10 h-full p-8 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <span className="bg-green-600 text-white text-xs font-bold px-3 py-1 uppercase tracking-wider">
                      {event.type.replace('_', ' ')}
                    </span>
                    <span className="text-2xl font-bold text-white/50 group-hover:text-green-400 transition-colors">
                      {new Date(event.dateStart).getDate().toString().padStart(2, '0')}
                    </span>
                  </div>

                  <div>
                    <div className="mb-6">
                      <p className="flex items-center gap-2 text-green-400 text-sm font-medium mb-2 uppercase tracking-wide">
                        <Calendar size={14} />
                        {new Date(event.dateStart).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
                      </p>
                      <h3 className="text-3xl font-bold text-white mb-3 group-hover:underline decoration-green-500 decoration-2 underline-offset-4 leading-tight">
                        {event.title}
                      </h3>
                      <p className="text-gray-400 line-clamp-2 font-light text-sm">
                        {event.shortDescription}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-6 border-t border-white/10 group-hover:border-white/20 transition-colors">
                      <div className="flex items-center gap-2 text-gray-400 text-xs uppercase tracking-wide">
                        <MapPin size={14} className="text-green-500" /> {event.location}
                      </div>

                      {user && event.registrations.some(reg => {
                        if (!reg.user) return false;
                        const registeredUserId = typeof reg.user === 'string'
                          ? reg.user
                          : reg.user._id?.toString() || reg.user.toString();
                        return registeredUserId === user._id;
                      }) ? (
                        <span className="text-green-500 font-bold flex items-center gap-2 text-sm">
                          <CheckCircle size={16} /> Inscrit
                        </span>
                      ) : (
                        <button
                          onClick={() => handleRegister(event.slug)}
                          className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:bg-green-500 hover:text-white transition-all transform group-hover:scale-110"
                        >
                          <ArrowRight size={18} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Attend - Expanded Bento Grid Style */}
      <section className="py-32 bg-[#0a0a0a] relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 z-0" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 z-0" />
        <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] bg-white/5 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none" />

        <div className="max-w-[90rem] mx-auto px-6 relative z-10">
          <div className="mb-20 text-center md:text-left">
            <span className="text-green-500 font-bold tracking-widest uppercase text-sm mb-4 block">L'Expérience FIPA</span>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Plus qu'un événement, <br /> <span className="text-gray-500">une célébration de l'excellence</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl leading-relaxed md:ml-0 mx-auto">
              Une immersion totale dans la créativité et l'innovation africaine. Découvrez les multiples facettes qui rendent le FIPA unique.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[300px] gap-6">

            {/* 1. Networking (Large) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="md:col-span-2 md:row-span-2 rounded-3xl overflow-hidden relative group"
            >
              <img
                src="https://res.cloudinary.com/drxouwbms/image/upload/v1765711712/photorealistic-portrait-african-woman_mimrxs.jpg"
                alt="Networking"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
              <div className="absolute bottom-0 left-0 p-8">
                <div className="bg-green-500 w-12 h-12 rounded-full flex items-center justify-center mb-4 text-black shadow-[0_0_20px_rgba(34,197,94,0.4)]">
                  <Users size={24} />
                </div>
                <h3 className="text-3xl font-bold text-white mb-2">Networking Stratégique</h3>
                <p className="text-gray-300 font-light">Rencontrez les décideurs qui façonnent l'avenir du continent.</p>
              </div>
            </motion.div>

            {/* 2. Croissance (Small Dark) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className="md:col-span-1 md:row-span-1 bg-[#151515] rounded-3xl p-8 border border-white/5 hover:border-green-500/30 transition-all group flex flex-col justify-between"
            >
              <div className="bg-white/5 w-10 h-10 rounded-xl flex items-center justify-center text-green-500 group-hover:bg-green-500 group-hover:text-black transition-colors">
                <TrendingUp size={20} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Croissance</h3>
                <p className="text-sm text-gray-400">Accédez à de nouveaux marchés porteurs.</p>
              </div>
            </motion.div>

            {/* 3. Expertise (Small Image) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="md:col-span-1 md:row-span-1 rounded-3xl overflow-hidden relative group border border-white/5"
            >
              <img
                src="https://res.cloudinary.com/drxouwbms/image/upload/v1765711581/collection-wooden-sculptures-pottery_tslv8h.jpg"
                alt="Art"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors" />
              <div className="absolute bottom-6 left-6">
                <span className="text-white font-bold text-lg inline-block border-b-2 border-green-500 pb-1">Artisanat d'Art</span>
              </div>
            </motion.div>

            {/* 4. Awards (Tall Green) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
              className="md:col-span-1 md:row-span-2 bg-gradient-to-b from-green-600 to-green-900 rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden group shadow-2xl shadow-green-900/20"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

              <div className="relative z-10 p-2 bg-black/20 rounded-lg w-fit text-white mb-4">
                <Award size={24} />
              </div>

              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white mb-4">L'Excellence Récompensée</h3>
                <p className="text-green-100 text-sm leading-relaxed mb-8 opacity-90">
                  Participez aux FIPA Awards et donnez une visibilité internationale à vos produits innovants.
                </p>
                <button className="bg-white text-green-800 px-6 py-4 rounded-xl font-bold text-sm w-full hover:bg-gray-100 transition-colors flex justify-between items-center group-hover:px-4">
                  <span>Candidater</span> <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </div>
            </motion.div>

            {/* 5. Countries Stat (Small Text) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
              className="md:col-span-1 md:row-span-1 bg-[#151515] rounded-3xl p-8 border border-white/5 flex flex-col justify-center items-center text-center group hover:bg-[#1a1a1a] transition-colors relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-green-500/5 scale-0 group-hover:scale-100 transition-transform rounded-full blur-2xl"></div>
              <h4 className="text-5xl font-bold text-white mb-2 group-hover:scale-110 transition-transform relative z-10 border-b-4 border-green-500/20 pb-2">50+</h4>
              <p className="text-gray-400 text-sm uppercase tracking-widest relative z-10">Pays Représentés</p>
            </motion.div>

            {/* 6. Culture (Small Image) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              viewport={{ once: true }}
              className="md:col-span-1 md:row-span-1 rounded-3xl overflow-hidden relative group"
            >
              <img
                src="https://res.cloudinary.com/drxouwbms/image/upload/v1765711685/african-woman-portrait-cultural-decorative-items_yzgwv0.jpg"
                alt="Culture"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-green-900/60 mix-blend-multiply transition-opacity group-hover:opacity-80" />
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <span className="text-white text-lg font-bold tracking-widest uppercase border border-white/30 px-4 py-2 rounded-full backdrop-blur-sm">Culture</span>
              </div>
            </motion.div>

            {/* 7. Innovation/Tech (Large Wide) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              viewport={{ once: true }}
              className="md:col-span-2 md:row-span-1 rounded-3xl overflow-hidden relative group border border-white/5"
            >
              <img
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1740&auto=format&fit=crop"
                alt="Tech Innovation"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent" />
              <div className="absolute inset-y-0 left-0 p-10 flex flex-col justify-center max-w-sm">
                <div className="flex items-center gap-3 mb-3 text-blue-400">
                  <Globe size={20} />
                  <span className="uppercase tracking-wider text-xs font-bold">Innovation</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Tech & Digital</h3>
                <p className="text-gray-300 text-sm">Le village numérique : vitrine des startups qui transforment l'Afrique.</p>
              </div>
            </motion.div>

            {/* 8. Gastronomy (Small Vertical) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              viewport={{ once: true }}
              className="md:col-span-1 md:row-span-1 rounded-3xl overflow-hidden relative group"
            >
              <img
                src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=687&auto=format&fit=crop"
                alt="Gastronomy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors" />
              <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white">
                Gastronomie
              </div>
            </motion.div>

            {/* 9. Interactive Map / Location (Small) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              viewport={{ once: true }}
              className="md:col-span-1 md:row-span-1 bg-[#202020] rounded-3xl p-6 flex flex-col justify-center items-center text-center relative overflow-hidden group cursor-pointer"
            >
              <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity">
                {/* Abstract map pattern simulation */}
                <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 0 L100 100 M100 0 L0 100" stroke="white" strokeWidth="0.5" />
                  <circle cx="50" cy="50" r="30" stroke="white" strokeWidth="0.5" fill="none" />
                </svg>
              </div>
              <MapPin size={32} className="text-green-500 mb-3 relative z-10 group-hover:animate-bounce" />
              <h3 className="text-white font-bold relative z-10">Dakar, Sénégal</h3>
              <span className="text-xs text-gray-400 mt-1 relative z-10">Le Hub Ouest Africain</span>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Modern Newsletter Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-green-900/10"></div>
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-8 tracking-tighter">
            RESTEZ CONNECTÉ
          </h2>
          <p className="text-xl text-gray-400 mb-12 font-light">
            Inscrivez-vous à notre newsletter exclusive pour ne rien manquer.
          </p>

          <form className="flex flex-col sm:flex-row gap-0 max-w-xl mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Votre email professionnel"
              className="flex-1 px-8 py-5 bg-white text-black placeholder-gray-500 focus:outline-none rounded-l-none"
            />
            <button className="px-10 py-5 bg-green-600 hover:bg-green-700 text-white font-bold tracking-widest uppercase transition-all">
              S'inscrire
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Events;
