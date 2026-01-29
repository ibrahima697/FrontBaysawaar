// src/pages/Events.tsx
import { useEffect, useState, useRef } from 'react';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import {
  Calendar, MapPin, Users, ArrowRight, TrendingUp, Globe,
  Award, CheckCircle, X, ChevronLeft, ChevronRight,
  Info, Clock, DollarSign, Heart, Zap, Share2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Swal from 'sweetalert2';
import { eventsAPI } from '../services/api';

interface Event {
  _id: string;
  slug: string;
  title: string;
  description: string;
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
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [pastEvents, setPastEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [eventsPerPage] = useState(6);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showFullImage, setShowFullImage] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const { user } = useAuth();

  const updateEventsState = (allEvents: Event[]) => {
    setEvents(allEvents);

    const now = new Date();
    const upcoming = allEvents.filter((e: Event) => new Date(e.dateEnd) >= now);
    const past = allEvents.filter((e: Event) => new Date(e.dateEnd) < now);

    setUpcomingEvents(upcoming);
    setPastEvents(past.sort((a: Event, b: Event) => new Date(b.dateStart).getTime() - new Date(a.dateStart).getTime()));
  };

  useEffect(() => {
    eventsAPI.getAll()
      .then(res => {
        updateEventsState(res.data.events);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching events:", err);
        setLoading(false);
      });
  }, []);

  // Scroll to events section when page changes
  const eventsGridRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (eventsGridRef.current && currentPage > 1) {
      eventsGridRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [currentPage]);

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

    setIsRegistering(true);
    try {
      await eventsAPI.register(slug);

      const { data } = await eventsAPI.getAll();
      const updatedEvents = data.events;
      updateEventsState(updatedEvents);

      // Mettre à jour l'événement sélectionné pour refléter le nouveau statut dans la modale
      if (selectedEvent) {
        const updatedSelected = updatedEvents.find((e: Event) => e.slug === selectedEvent.slug);
        if (updatedSelected) setSelectedEvent(updatedSelected);
      }

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
        updateEventsState(data.events);
      } else {
        Swal.fire({
          title: 'Erreur',
          text: message,
          icon: 'error',
          confirmButtonColor: '#16a34a'
        });
      }
    } finally {
      setIsRegistering(false);
    }
  };

  const isRegistered = (event: Event) => {
    if (!user || !event.registrations) return false;
    const userId = user.id || (user as any)._id;
    return event.registrations.some(r => {
      const regUserId = r.user?._id || r.user || r.userId || r;
      return String(regUserId) === String(userId);
    });
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
      {(() => {
        const featuredEvent = events.find(e => e.isFeatured);
        if (!featuredEvent) return null;

        return (
          <section className="relative h-screen min-h-[700px] flex items-center overflow-hidden">
            {/* Background Image with heavy overlay */}
            <div className="absolute inset-0 z-0">
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent z-10" />
              <div className="absolute inset-0 bg-black/40 z-0" />
              <motion.img
                key={featuredEvent.images?.[0]?.url}
                initial={{ scale: 1.1, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 2, ease: "easeOut" }}
                src={featuredEvent.images?.[0]?.url || "https://res.cloudinary.com/drxouwbms/image/upload/v1765733341/african-kid-marketplace_zwl4xj.jpg"}
                alt={featuredEvent.title}
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
                  <span className="text-green-400 uppercase tracking-[0.2em] text-sm font-medium">
                    {featuredEvent.type.replace('_', ' ')} • À LA UNE
                  </span>
                </div>

                <h1 className="text-7xl md:text-9xl font-black tracking-tight leading-[0.9] mb-8 text-white uppercase line-clamp-2">
                  {featuredEvent.title.split(' ').map((word, i) => (
                    <span key={i} className={i % 2 === 1 ? 'text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-green-700' : ''}>
                      {word}{' '}
                    </span>
                  ))}
                </h1>

                <p className="text-xl md:text-2xl text-gray-300 max-w-3xl font-light mb-12 leading-relaxed line-clamp-3">
                  {featuredEvent.shortDescription}
                </p>

                <div className="flex flex-wrap gap-6">
                  <motion.button
                    onClick={() => setSelectedEvent(featuredEvent)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-white text-black px-10 py-5 rounded-none text-lg font-bold tracking-wide hover:bg-green-500 hover:text-white transition-all duration-300 flex items-center gap-3 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                  >
                    VOIR LES DÉTAILS <ArrowRight size={20} />
                  </motion.button>

                  {isRegistered(featuredEvent) ? (
                    <div className="bg-green-600/10 border border-green-500/50 text-green-400 px-10 py-5 flex items-center gap-3 text-lg font-bold tracking-wide">
                      <CheckCircle size={20} /> DÉJÀ INSCRIT
                    </div>
                  ) : (
                    <motion.button
                      onClick={() => handleRegister(featuredEvent.slug)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="text-white px-10 py-5 border border-white/20 hover:border-white hover:bg-white/5 transition-all duration-300 flex items-center gap-3 text-lg font-medium"
                    >
                      S'INSCRIRE MAINTENANT
                    </motion.button>
                  )}
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
              <span className="text-[10px] uppercase tracking-widest text-gray-500">Explorer</span>
              <div className="w-[1px] h-12 bg-gradient-to-b from-green-500 to-transparent"></div>
            </motion.div>
          </section>
        );
      })()}

      {!events.find(e => e.isFeatured) && (
        <section className="relative h-[60vh] flex items-center justify-center bg-gradient-to-b from-black to-[#050505] overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
          <div className="text-center relative z-10 p-8 pt-32">
            <h1 className="text-6xl md:text-8xl font-black text-white mb-6 uppercase tracking-tighter">Nos Événements</h1>
            <p className="text-gray-500 text-xl max-w-2xl mx-auto font-light">Découvrez toutes nos activités et inscrivez-vous pour rejoindre l'innovation.</p>
          </div>
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
      <section ref={eventsGridRef} className="py-32 relative">
        <div className="max-w-[90rem] mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div>
              <span className="text-green-500 font-bold tracking-widest uppercase text-sm mb-4 block">Agenda</span>
              <h2 className="text-5xl md:text-7xl font-bold text-white mb-2 leading-none">
                Événements <br /> <span className="text-gray-700">à venir</span>
              </h2>
            </div>

            {/* <a href="#calendar" className="text-white border-b border-green-500 pb-1 hover:text-green-400 transition-colors uppercase text-sm tracking-wider font-medium">
              Voir tout le calendrier
            </a> */}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.slice((currentPage - 1) * eventsPerPage, currentPage * eventsPerPage).map((event, idx) => (
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

                      <button
                        onClick={() => setSelectedEvent(event)}
                        className="px-6 py-2 rounded-full border border-white/20 text-white text-sm font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-all transform group-hover:scale-105"
                      >
                        Ouvrir
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pagination Controls */}
          {events.length > eventsPerPage && (
            <div className="flex justify-center items-center mt-16 gap-4">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-3 rounded-full border border-white/10 text-white disabled:opacity-30 hover:bg-white/5 transition-all"
              >
                <ChevronLeft size={24} />
              </button>

              <div className="flex gap-2">
                {Array.from({ length: Math.ceil(upcomingEvents.length / eventsPerPage) }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-12 h-12 rounded-full border transition-all font-bold ${currentPage === page
                      ? 'bg-green-500 border-green-500 text-white'
                      : 'border-white/10 text-gray-500 hover:border-white/30 hover:text-white'
                      }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(upcomingEvents.length / eventsPerPage)))}
                disabled={currentPage === Math.ceil(upcomingEvents.length / eventsPerPage)}
                className="p-3 rounded-full border border-white/10 text-white disabled:opacity-30 hover:bg-white/5 transition-all"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Past Events Archive - Futuristic Carousel */}
      {pastEvents.length > 0 && (
        <section className="py-32 bg-[#080808] border-t border-white/5 relative overflow-hidden">
          {/* Background Aura */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[400px] bg-green-900/5 blur-[120px] rounded-full pointer-events-none" />

          <div className="max-w-[90rem] mx-auto px-6 relative z-10">
            <div className="mb-16">
              <span className="text-gray-500 font-bold tracking-[0.4em] uppercase text-[10px] mb-4 block">Archives Digitales</span>
              <h2 className="text-4xl md:text-6xl font-black text-white mb-2">
                Événements <span className="text-green-500/50 italic">Passés</span>
              </h2>
            </div>

            {/* Carousel Container */}
            <div className="relative group/carousel">
              <div className="flex overflow-x-auto gap-8 pb-12 snap-x snap-mandatory scroll-smooth custom-h-scrollbar no-scrollbar-none">
                <style>
                  {`
                  .custom-h-scrollbar::-webkit-scrollbar {
                    height: 5px;
                    display: block !important;
                  }
                  .custom-h-scrollbar::-webkit-scrollbar-track {
                    background: rgba(255, 255, 255, 0.02);
                    border-radius: 20px;
                    margin-inline: 2rem;
                  }
                  .custom-h-scrollbar::-webkit-scrollbar-thumb {
                    background: linear-gradient(to right, #166534, #16a34a);
                    border-radius: 20px;
                    box-shadow: 0 0 10px rgba(22, 163, 74, 0.4);
                  }
                  .custom-h-scrollbar {
                    scrollbar-width: thin;
                    scrollbar-color: #16a34a rgba(255, 255, 255, 0.02);
                    padding-bottom: 24px !important;
                  }
                  `}
                </style>
                {pastEvents.map((event, idx) => (
                  <motion.div
                    key={event._id}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ delay: idx * 0.05, duration: 0.5, ease: "easeOut" }}
                    className="min-w-[320px] md:min-w-[500px] h-[400px] rounded-[2.5rem] overflow-hidden relative snap-center border border-white/5 group/item hover:border-green-500/50 transition-all duration-500 shadow-2xl"
                  >
                    {/* Background Image - Higher quality feel */}
                    <img
                      src={event.images?.[0]?.url || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800&auto=format&fit=crop"}
                      alt={event.title}
                      className="absolute inset-0 w-full h-full object-cover grayscale opacity-30 group-hover/item:grayscale-0 group-hover/item:opacity-80 group-hover/item:scale-105 transition-all duration-1000 ease-out"
                    />

                    {/* Deep Gradient for Visibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent z-10 opacity-90 group-hover/item:opacity-100 transition-opacity" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent z-10" />

                    {/* Content */}
                    <div className="absolute inset-0 z-20 p-10 flex flex-col justify-end">


                      <h3 className="text-3xl md:text-4xl font-black text-white mb-4 line-clamp-2 leading-[1.1] tracking-tighter group-hover/item:text-green-400 transition-colors duration-300">
                        {event.title}
                      </h3>

                      <p className="text-gray-400 text-sm font-light line-clamp-2 mb-6 group-hover/item:text-gray-200 transition-colors opacity-0 group-hover/item:opacity-100 duration-500">
                        {event.shortDescription}
                      </p>

                      <div className="flex items-center justify-between mt-2 pt-6 border-t border-white/10">
                        <div className="flex flex-col">
                          <span className="text-[8px] uppercase text-gray-500 font-black tracking-widest mb-1">Date Initiale</span>
                          <span className="text-xs text-gray-300 font-bold tracking-wide">
                            {new Date(event.dateStart).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long' })}
                          </span>
                        </div>
                        <button
                          onClick={() => setSelectedEvent(event)}
                          className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-green-600 rounded-full text-[10px] font-black text-white uppercase tracking-widest transition-all hover:scale-105 active:scale-95 group/btn"
                        >
                          Ouvrir Capsule
                          <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Modern Scroll Hint */}
              <div className="flex justify-center items-center gap-6 mt-4 text-gray-700">
                <div className="h-[1px] w-12 bg-white/5" />
                <div className="flex items-center gap-3">
                  <span className="text-[9px] uppercase tracking-[0.4em] font-black">Naviguer temporellement</span>
                  <ArrowRight size={10} className="animate-pulse" />
                </div>
                <div className="h-[1px] w-12 bg-white/5" />
              </div>
            </div>
          </div>
        </section>
      )}
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

      {/* Bento Finale - The Future is Now */}
      <section className="py-40 bg-[#050505] relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-green-500/5 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2 z-0" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[150px] translate-y-1/2 -translate-x-1/2 z-0" />

        <div className="max-w-[90rem] mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-green-500 font-bold tracking-[0.4em] uppercase text-xs mb-4 block"
            >
              Le Mot de la Fin
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-black text-white tracking-tighter"
            >
              UNE NOUVELLE <span className="text-gray-700">ÈRE</span>
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-none md:grid-rows-2 gap-6 h-auto md:h-[800px]">

            {/* 1. Main Feature Card (CTA) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="md:col-span-2 md:row-span-2 bg-gradient-to-br from-green-600 to-green-900 rounded-[40px] p-10 md:p-16 flex flex-col justify-between relative overflow-hidden group border border-white/10 shadow-2xl"
            >
              <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:scale-110 transition-transform duration-700">
                <Zap size={200} fill="currentColor" />
              </div>

              <div className="relative z-10">
                <div className="bg-white/10 backdrop-blur-md w-14 h-14 rounded-2xl flex items-center justify-center mb-8 border border-white/20">
                  <Heart className="text-white" size={28} />
                </div>
                <h3 className="text-4xl md:text-6xl font-black text-white leading-tight mb-6">
                  REJOIGNEZ <br /> LE MOUVEMENT.
                </h3>
                <p className="text-green-100 text-lg md:text-xl font-light max-w-md opacity-80 leading-relaxed">
                  Baysawaar n'est pas qu'une plateforme, c'est une mission pour catalyser l'excellence africaine. En devenant membre, vous accédez à un monde d'opportunités sans limites.
                </p>
              </div>

              <div className="relative z-10 mt-12">
                <motion.button
                  whileHover={{ scale: 1.05, x: 10 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-green-900 px-10 py-6 rounded-full font-black tracking-widest uppercase text-sm flex items-center gap-4 hover:shadow-[0_20px_40px_rgba(255,255,255,0.2)] transition-all"
                >
                  DEVENIR MEMBRE MAINTENANT <ArrowRight size={20} />
                </motion.button>
              </div>
            </motion.div>

            {/* 2. Heritage Card (Image) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="md:col-span-1 md:row-span-1 rounded-[40px] overflow-hidden relative group border border-white/5"
            >
              <img
                src="https://res.cloudinary.com/drxouwbms/image/upload/v1765711712/photorealistic-portrait-african-woman_mimrxs.jpg"
                alt="Heritage"
                className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-8 left-8">
                <span className="text-white font-bold tracking-widest uppercase text-[10px] bg-green-600 px-3 py-1 rounded-full mb-2 inline-block">Vision</span>
                <p className="text-white font-bold text-lg">Nos Racines, Notre Futur</p>
              </div>
            </motion.div>

            {/* 3. Community Card (Interactive) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="md:col-span-1 md:row-span-1 bg-[#101010] rounded-[40px] p-8 border border-white/5 flex flex-col justify-between hover:border-green-500/30 transition-all group"
            >
              <div className="flex justify-between items-start">
                <div className="bg-white/5 w-12 h-12 rounded-xl flex items-center justify-center text-green-500 group-hover:bg-green-500 group-hover:text-black transition-colors">
                  <Share2 size={24} />
                </div>
                <div className="flex -space-x-3">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-[#101010] bg-gray-800 overflow-hidden">
                      <img src={`https://i.pravatar.cc/100?img=${i + 20}`} alt="avatar" />
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-4xl font-bold text-white mb-2">2.4k+</h4>
                <p className="text-gray-500 text-sm uppercase tracking-widest font-medium">Membres Actifs</p>
              </div>
            </motion.div>

            {/* 4. Globe / Connection Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="md:col-span-2 md:row-span-1 bg-[#0a0a0a] rounded-[40px] p-10 border border-white/5 relative overflow-hidden group flex items-center gap-10"
            >
              <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
                <Globe size={300} className="translate-x-1/2" />
              </div>
              <div className="relative z-10 flex-1">
                <h4 className="text-2xl font-bold text-white mb-4">Connecter l'Afrique <br /> au reste du Monde.</h4>
                <p className="text-gray-400 text-sm font-light leading-relaxed max-w-sm">
                  Grâce à nos partenariats internationaux, nous ouvrons des portes vers les marchés mondiaux pour les talents locaux.
                </p>
              </div>
              <div className="relative z-10 hidden md:block">
                <div className="w-24 h-24 rounded-full border border-white/10 flex items-center justify-center animate-spin-slow">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                </div>
              </div>
            </motion.div>

          </div>

          {/* Social Proof Footer */}
          {/* <div className="mt-20 flex flex-col md:flex-row items-center justify-between gap-8 border-t border-white/5 pt-12">
            <p className="text-gray-500 text-sm font-light">© 2026 Baysawaar Foundation. All rights reserved.</p>
            <div className="flex gap-10">
              {["Instagram", "LinkedIn", "Twitter", "Facebook"].map(social => (
                <a key={social} href="#" className="text-gray-500 hover:text-white transition-colors text-xs font-bold uppercase tracking-[0.2em]">{social}</a>
              ))}
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="text-green-500 font-bold uppercase tracking-widest text-xs border-b border-green-500 pb-1"
            >
              S'inscrire à la gazette
            </motion.button>
          </div> */}
        </div>
      </section>

      {/* Event Details Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center px-4 backdrop-blur-md bg-black/80"
            onClick={() => setSelectedEvent(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-[#101010] w-full max-w-6xl h-[85vh] lg:h-[75vh] min-h-[500px] rounded-[2.5rem] border border-white/10 shadow-2xl relative overflow-hidden flex flex-col lg:flex-row"
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedEvent(null)}
                className="absolute top-4 right-4 z-50 p-2 bg-black/50 backdrop-blur-md text-white rounded-full hover:bg-white hover:text-black transition-all shadow-xl"
              >
                <X size={20} />
              </button>

              {/* Left Column: Fixed Image Section */}
              <div
                className="w-full lg:w-[45%] h-[250px] lg:h-full relative overflow-hidden bg-black flex-shrink-0 cursor-zoom-in group/imgSection"
                onClick={() => setShowFullImage(true)}
              >
                <img
                  src={selectedEvent.images?.[0]?.url || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800&auto=format&fit=crop"}
                  alt={selectedEvent.title}
                  className="w-full h-full object-cover group-hover/imgSection:scale-105 transition-transform duration-700"
                />
                {/* Expand Icon Overlay */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/imgSection:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="bg-white/10 backdrop-blur-md p-4 rounded-full border border-white/20 text-white transform scale-90 group-hover/imgSection:scale-100 transition-transform">
                    <Globe size={24} />
                  </div>
                </div>
                <div className="absolute top-4 left-4">
                  <span className="bg-green-600/90 backdrop-blur-sm text-white text-[10px] font-black px-3 py-1.5 uppercase tracking-widest rounded-lg shadow-2xl">
                    {selectedEvent?.type.replace('_', ' ')}
                  </span>
                </div>
                {/* Subtle Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#101010]/20 pointer-events-none" />
              </div>

              {/* Right Column: Scrollable Info Section (if needed, but aim for none) */}
              <div className="flex-1 flex flex-col p-6 lg:p-10 overflow-y-auto lg:overflow-hidden scrollbar-hide">
                <div className="flex-1">
                  {/* Title */}
                  <h2 className="text-2xl lg:text-3xl font-black text-white mb-4 tracking-tighter leading-none uppercase">
                    {selectedEvent?.title}
                  </h2>

                  {/* Metadata Grid - Compact */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="bg-white/5 p-2 rounded-lg border border-white/5 text-green-500"><Calendar size={18} /></div>
                      <div>
                        <p className="text-white font-black text-[9px] uppercase tracking-wider">Date</p>
                        <p className="text-[11px] text-gray-400">
                          {selectedEvent && new Date(selectedEvent.dateStart).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="bg-white/5 p-2 rounded-lg border border-white/5 text-green-500"><MapPin size={18} /></div>
                      <div>
                        <p className="text-white font-black text-[9px] uppercase tracking-wider">Lieu</p>
                        <p className="text-[11px] text-gray-400 line-clamp-1">{selectedEvent?.location}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="bg-white/5 p-2 rounded-lg border border-white/5 text-green-500"><Users size={18} /></div>
                      <div>
                        <p className="text-white font-black text-[9px] uppercase tracking-wider">Places</p>
                        <p className="text-[11px] text-gray-400">{selectedEvent?.maxParticipants} max</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="bg-white/5 p-2 rounded-lg border border-white/5 text-green-500"><Clock size={18} /></div>
                      <div>
                        <p className="text-white font-black text-[9px] uppercase tracking-wider">Durée</p>
                        <p className="text-[11px] text-gray-400">
                          {Math.ceil((new Date(selectedEvent.dateEnd).getTime() - new Date(selectedEvent.dateStart).getTime()) / (1000 * 60 * 60 * 24))} j
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Description - More compact */}
                  <div className="mb-6">
                    <h3 className="text-white font-black text-[10px] uppercase tracking-widest mb-2 opacity-50">À propos de l'activité</h3>
                    <p className="text-xs font-light text-gray-400 leading-relaxed line-clamp-4 lg:line-clamp-6">
                      {selectedEvent?.description || selectedEvent?.shortDescription || "Aucune description disponible."}
                    </p>
                  </div>

                  {/* Pricing - Conditional & Compact */}
                  {!(new Date(selectedEvent?.dateEnd || '') < new Date()) && (
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                        <p className="text-[8px] text-gray-500 uppercase font-black mb-1">Pass Membre</p>
                        <p className="text-lg font-black text-white leading-none">
                          {selectedEvent?.priceMember?.toLocaleString() || 0} <span className="text-[10px] font-normal text-gray-500">FCFA</span>
                        </p>
                      </div>
                      <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                        <p className="text-[8px] text-gray-500 uppercase font-black mb-1">Standard</p>
                        <p className="text-lg font-black text-white leading-none">
                          {selectedEvent?.priceNonMember?.toLocaleString() || 0} <span className="text-[10px] font-normal text-gray-500">FCFA</span>
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer Action Area */}
                <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between gap-4">
                  {new Date(selectedEvent?.dateEnd || '') < new Date() ? (
                    <div className="w-full bg-gray-900 border border-white/5 text-gray-500 py-4 rounded-xl flex items-center justify-center gap-3 font-black tracking-widest text-[10px] uppercase">
                      <Clock size={16} /> Événement Terminé
                    </div>
                  ) : (
                    <>
                      {/* Compact Availability */}
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10">
                          <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                            <circle cx="18" cy="18" r="16" fill="none" stroke="#ffffff10" strokeWidth="4" />
                            <circle
                              cx="18" cy="18" r="16" fill="none" stroke="#16a34a" strokeWidth="4"
                              strokeDasharray={`${selectedEvent.maxParticipants > 0 ? ((selectedEvent.registrations?.length || 0) / selectedEvent.maxParticipants) * 100 : 0}, 100`}
                            />
                          </svg>
                        </div>
                        <div className="hidden sm:block">
                          <p className="text-[8px] text-gray-500 uppercase font-black">Disponibilité</p>
                          <p className="text-xs font-bold text-white leading-none">
                            {Math.max(0, selectedEvent.maxParticipants - (selectedEvent.registrations?.length || 0))} places
                          </p>
                        </div>
                      </div>

                      {isRegistered(selectedEvent) ? (
                        <div className="flex-1 py-4 rounded-xl font-black tracking-[0.2em] text-[10px] uppercase flex items-center justify-center gap-2 bg-green-600/20 text-green-400 border border-green-500/30">
                          <CheckCircle size={16} /> DÉJÀ INSCRIT
                        </div>
                      ) : (
                        <button
                          onClick={() => selectedEvent && handleRegister(selectedEvent.slug)}
                          disabled={(selectedEvent?.registrations?.length || 0) >= (selectedEvent?.maxParticipants || 0) || isRegistering}
                          className={`flex-1 py-4 rounded-xl font-black tracking-[0.2em] text-[10px] uppercase flex items-center justify-center gap-2 transition-all ${(selectedEvent?.registrations?.length || 0) >= (selectedEvent?.maxParticipants || 0)
                            ? 'bg-gray-800 text-gray-500'
                            : isRegistering
                              ? 'bg-green-600 text-white'
                              : 'bg-green-600 text-white hover:bg-green-700 shadow-lg shadow-green-900/40'
                            }`}
                        >
                          {isRegistering ? 'Traitement...' : (selectedEvent?.registrations?.length || 0) >= (selectedEvent?.maxParticipants || 0) ? 'COMPLET' : 'RÉSERVER'}
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full Screen Image Lightbox */}
      <AnimatePresence>
        {showFullImage && selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 md:p-10"
            onClick={() => setShowFullImage(false)}
          >
            <motion.button
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-10 right-10 z-[210] p-4 bg-white/10 hover:bg-white text-white hover:text-black rounded-full transition-all border border-white/10"
              onClick={() => setShowFullImage(false)}
            >
              <X size={32} />
            </motion.button>

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative max-w-7xl max-h-screen flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedEvent.images?.[0]?.url || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800&auto=format&fit=crop"}
                alt={selectedEvent.title}
                className="w-full h-auto max-h-[90vh] object-contain shadow-2xl rounded-lg"
              />
              <div className="absolute -bottom-16 left-0 right-0 text-center">
                <h4 className="text-white font-black text-xl uppercase tracking-tighter">{selectedEvent.title}</h4>
                <p className="text-gray-500 text-xs uppercase tracking-[0.3em] mt-2">Vue immersive plein écran</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Events;
