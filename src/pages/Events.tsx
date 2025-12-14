// src/pages/Events.tsx
import { useEffect, useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { Calendar, MapPin, Users, ArrowRight, Crown, Tag, TrendingUp, Globe, Award, Mail, CheckCircle, Play } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import Swal from 'sweetalert2';

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
  const { user, token } = useAuth();

  useEffect(() => {
    axios.get('http://localhost:5005/api/events')
      .then(res => {
        setEvents(res.data.events);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleRegister = async (slug: string) => {
    try {
      await axios.post(`http://localhost:5005/api/events/${slug}/register`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const { data } = await axios.get('http://localhost:5005/api/events');
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
        const { data } = await axios.get('http://localhost:5005/api/events');
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

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const stats = [
    { icon: Calendar, value: "50+", label: "Événements par an" },
    { icon: Users, value: "10k+", label: "Participants actifs" },
    { icon: Globe, value: "20+", label: "Pays représentés" },
    { icon: Award, value: "98%", label: "Satisfaction" }
  ];

  const benefits = [
    {
      icon: TrendingUp,
      title: "Opportunités de Croissance",
      description: "Accédez à des marchés inexploités et développez votre réseau professionnel."
    },
    {
      icon: Users,
      title: "Networking Stratégique",
      description: "Rencontrez des leaders de l'industrie, des investisseurs et des partenaires potentiels."
    },
    {
      icon: Award,
      title: "Expertise & Formation",
      description: "Participez à des ateliers dirigés par des experts reconnus mondialement."
    }
  ];

  const galleryImages = [
    "https://res.cloudinary.com/drxouwbms/image/upload/v1765711581/collection-wooden-sculptures-pottery_tslv8h.jpg",
    "https://res.cloudinary.com/drxouwbms/image/upload/v1765711599/beautiful-african-woman-monochrome-portrait_ax6et5.jpg",
    "https://res.cloudinary.com/drxouwbms/image/upload/v1765711685/african-woman-portrait-cultural-decorative-items_yzgwv0.jpg",
    "https://res.cloudinary.com/drxouwbms/image/upload/v1765711712/photorealistic-portrait-african-woman_mimrxs.jpg"
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero FIPA */}
      {events.find(e => e.isFeatured) && (
        <section className="relative h-[600px] overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://res.cloudinary.com/drxouwbms/image/upload/v1755959386/Screenshot_2025-08-23_at_14_28_33-Picsart-AiImageEnhancer_qey9ge.png"
              alt="FIPA 2025"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
          </div>

          <div className="relative max-w-7xl mx-auto px-6 h-full flex items-center">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-white max-w-3xl"
            >
              <div className="inline-flex items-center gap-2 bg-green-500/20 backdrop-blur-sm border border-green-500/50 text-green-400 px-4 py-2 rounded-full mb-6">
                <Crown size={20} />
                <span className="font-bold uppercase tracking-wider text-sm">Événement Vedette</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                FIPA 2025
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-gray-200 font-light">
                La plus grande Foire Internationale des Produits Africains. <br />
                <span className="text-green-400 font-medium">Connectez-vous à l'avenir du commerce africain.</span>
              </p>
              <div className="flex flex-wrap gap-4">
                <motion.a
                  href="/fipa-2025"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold py-4 px-8 rounded-full text-lg inline-flex items-center gap-3 shadow-lg shadow-green-500/30 transition-all"
                >
                  Réserver ma place <ArrowRight />
                </motion.a>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/10 backdrop-blur-md hover:bg-white/20 text-white font-bold py-4 px-8 rounded-full text-lg inline-flex items-center gap-3 border border-white/30 transition-all"
                >
                  <Play size={20} /> Voir la vidéo
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Stats Section */}
      <section className="py-10 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center"
              >
                <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mb-3">
                  <stat.icon className="text-green-600" size={24} />
                </div>
                <span className="text-3xl font-bold text-gray-900">{stat.value}</span>
                <span className="text-sm text-gray-500 font-medium uppercase tracking-wide">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Attend Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Pourquoi Participer ?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Rejoignez une communauté dynamique et propulsez votre entreprise vers de nouveaux sommets.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-blue-500 rounded-2xl flex items-center justify-center mb-6 text-white shadow-lg shadow-green-500/20">
                  <benefit.icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Liste événements */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Nos Prochains Événements</h2>
            <p className="text-xl text-gray-600 max-w-2xl">
              Découvrez nos conférences, ateliers et foires à venir.
            </p>
          </div>
          <button className="text-green-600 font-bold hover:text-green-700 flex items-center gap-2 group">
            Voir tout le calendrier <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {events.map(event => (
              <motion.div
                key={event._id}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col h-full"
              >
                <div className="relative h-56 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                  <img
                    src={event.images?.[0]?.url || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800&auto=format&fit=crop"}
                    alt={event.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 z-20">
                    <span className="inline-flex items-center gap-1.5 bg-white/90 backdrop-blur-md text-green-600 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
                      <Tag size={12} />
                      {event.type.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 z-20 text-white">
                    <p className="flex items-center gap-2 text-sm font-medium mb-1">
                      <Calendar size={16} className="text-green-400" />
                      {new Date(event.dateStart).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })}
                    </p>
                  </div>
                </div>

                <div className="p-8 flex-1 flex flex-col">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors line-clamp-2">
                    {event.title}
                  </h3>
                  <p className="text-gray-600 mb-6 line-clamp-3 text-sm leading-relaxed">
                    {event.shortDescription}
                  </p>

                  <div className="mt-auto space-y-4">
                    <div className="flex items-center gap-4 text-sm text-gray-500 border-t border-gray-100 pt-4">
                      <div className="flex items-center gap-2">
                        <MapPin size={16} className="text-green-500" />
                        <span className="truncate max-w-[120px]">{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users size={16} className="text-green-500" />
                        <span>{event.registrations.length}/{event.maxParticipants}</span>
                      </div>
                    </div>

                    <div className="pt-2">
                      {user ? (
                        event.registrations.some(reg => {
                          if (!reg.user) return false;
                          const registeredUserId = typeof reg.user === 'string'
                            ? reg.user
                            : reg.user._id?.toString() || reg.user.toString();
                          return registeredUserId === user._id;
                        }) ? (
                          <button disabled className="w-full bg-green-100 text-green-700 border border-green-200 px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 cursor-not-allowed">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                            Inscrit
                          </button>
                        ) : event.registrations.filter(reg =>
                          reg.user && reg.status === 'approved'
                        ).length >= event.maxParticipants ? (
                          <button disabled className="w-full bg-red-50 text-red-600 border border-red-100 px-6 py-3 rounded-xl font-bold cursor-not-allowed">
                            Complet
                          </button>
                        ) : (
                          <button
                            onClick={() => handleRegister(event.slug)}
                            className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-green-200 hover:shadow-green-300 active:scale-95"
                          >
                            S’inscrire gratuitement
                          </button>
                        )
                      ) : (
                        <a href="/login" className="block w-full text-center bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-xl font-bold transition-all">
                          Se connecter pour s'inscrire
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>

      {/* Gallery Section */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Retour en Images</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Revivez les moments forts de nos événements précédents.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {galleryImages.map((img, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative rounded-2xl overflow-hidden group ${index === 0 ? 'col-span-2 row-span-2' : ''}`}
              >
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />
                <img
                  src={img}
                  alt={`Event gallery ${index + 1}`}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-green-500 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
        </div>

        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-8 text-white">
            <Mail size={32} />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ne manquez aucun événement
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Inscrivez-vous à notre newsletter pour recevoir en avant-première les dates de nos prochains événements et des invitations exclusives.
          </p>

          <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Votre adresse email"
              className="flex-1 px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 backdrop-blur-sm"
            />
            <button className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-full transition-colors flex items-center justify-center gap-2">
              S'inscrire <CheckCircle size={20} />
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Events;
