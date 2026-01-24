import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { enrollmentsAPI, formationsAPI, eventsAPI } from '../services/api';
import {
  Building2, Clock, CheckCircle, XCircle, AlertCircle,
  User as UserIcon, TrendingUp, Calendar, MapPin, Loader2, ChevronLeft, ChevronRight, Ticket, ArrowRight, Star
} from 'lucide-react';
import Swal from 'sweetalert2';


import { Enrollment, Formation, EventData } from '../types';
import { getUserPhoto } from '../utils/userUtils';

// --- CAROUSEL COMPONENT ---
interface CarouselProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

const Carousel = <T,>({ items, renderItem }: CarouselProps<T>) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!items || items.length === 0) return null;

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  return (
    <div className="relative group w-full max-w-full">
      <div className="overflow-hidden p-1 w-full"> {/* p-1 to prevent shadow clipping */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="w-full"
          >
            {renderItem(items[currentIndex])}
          </motion.div>
        </AnimatePresence>
      </div>

      {items.length > 1 && (
        <>
          {/* Controls */}
          <div className="flex items-center justify-between mt-4">
            <button
              onClick={handlePrev}
              className="p-2 rounded-full bg-white border border-gray-200 text-gray-500 hover:bg-green-50 hover:text-green-600 transition-colors shadow-sm"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Dots Indicator */}
            <div className="flex gap-1.5">
              {items.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`transition-all duration-300 rounded-full ${idx === currentIndex
                    ? 'w-6 h-2 bg-green-500'
                    : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
                    }`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="p-2 rounded-full bg-white border border-gray-200 text-gray-500 hover:bg-green-50 hover:text-green-600 transition-colors shadow-sm"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

const Dashboard = () => {
  const { user, isLoading: authLoading } = useAuth();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'profile'>('dashboard');
  const [enrollment, setEnrollment] = useState<Enrollment | null>(null);
  const [formations, setFormations] = useState<Formation[]>([]);
  const [myFormations, setMyFormations] = useState<Formation[]>([]);
  const [allEvents, setAllEvents] = useState<EventData[]>([]); // Store all events
  const [myEvents, setMyEvents] = useState<EventData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false); // For background refresh
  const [error, setError] = useState('');

  const [registeringId, setRegisteringId] = useState<string | null>(null);

  // --- REUSABLE DATA FETCHING FUNCTION ---
  const refreshDashboardData = async (background = false) => {
    const userId = user?.id || user?._id;
    if (!userId) return;

    try {
      if (!background) setIsLoading(true);
      else setIsRefreshing(true);

      const [enrRes, formRes, eventRes] = await Promise.all([
        enrollmentsAPI.getMyEnrollments(),
        formationsAPI.getAll(),
        eventsAPI.getAll()
      ]);

      if (enrRes.data.length > 0) setEnrollment(enrRes.data[0]);

      // Process Formations
      const allForms: Formation[] = formRes.data.formations || [];
      setFormations(allForms);
      const myRegs = allForms.filter(f =>
        f.registrations?.some(r => String(r.userId) === String(userId))
      );
      setMyFormations(myRegs);

      // Process Events
      const allEvts: EventData[] = eventRes.data.events || (Array.isArray(eventRes.data) ? eventRes.data : []);
      setAllEvents(allEvts);
      const myEvts = allEvts.filter(e =>
        e.registrations?.some(r => r.user && (String(r.user._id || r.user) === String(userId)))
      );
      setMyEvents(myEvts);

    } catch (err: any) {
      console.error("Dashboard fetch error", err);
      if (!background) setError('Impossible de charger les données du tableau de bord');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  // Initial Fetch
  useEffect(() => {
    if (!authLoading && (user?.id || user?._id)) {
      refreshDashboardData();
    }
  }, [user?.id, user?._id, authLoading]);


  const handleRegister = async (formationId: string) => {
    try {
      setRegisteringId(formationId);
      await formationsAPI.register(formationId);

      // Auto-refresh data without full page reload
      await refreshDashboardData(true);

      Swal.fire({
        icon: 'success',
        title: 'Inscription réussie',
        text: 'Votre demande a été envoyée !',
        timer: 2000,
        showConfirmButton: false
      });
    } catch (err: any) {
      Swal.fire('Erreur', err.response?.data?.message || 'Nom de la formation invalide', 'error');
    } finally {
      setRegisteringId(null);
    }
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      approved: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      rejected: 'bg-red-100 text-red-800 border-red-200',
      pending: 'bg-amber-100 text-amber-800 border-amber-200',
      default: 'bg-gray-100 text-gray-800 border-gray-200'
    };

    const labels = {
      approved: 'Confirmé',
      rejected: 'Rejeté',
      pending: 'En attente',
      default: status
    };

    const style = styles[status as keyof typeof styles] || styles.default;
    const label = labels[status as keyof typeof labels] || status;

    return (
      <span className={`px-2 py-0.5 md:px-3 md:py-1 rounded-full text-[10px] md:text-xs font-bold border ${style} flex items-center gap-1.5`}>
        {status === 'pending' && <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />}
        {label}
      </span>
    );
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'rejected': return <XCircle className="w-5 h-5 text-red-600" />;
      case 'pending': return <Clock className="w-5 h-5 text-yellow-600" />;
      default: return <AlertCircle className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusText = (status: string) => {
    return status === 'pending' ? 'En attente' :
      status === 'approved' ? 'Approuvé' :
        status === 'rejected' ? 'Rejeté' : status;
  };


  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 text-green-600 animate-spin" />
          <p className="text-gray-500 font-medium">Chargement de votre espace...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-gray-900 pb-20 relative overflow-hidden">

      {/* Decorative Background Mesh (Lighter) */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-br from-green-50/50 via-white to-transparent pointer-events-none z-0" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-green-100/30 rounded-full blur-3xl pointer-events-none z-0" />
      <div className="absolute top-48 -left-20 w-72 h-72 bg-blue-100/30 rounded-full blur-3xl pointer-events-none z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">

        {/* Header V2 (Light) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8 mb-8 md:mb-12">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex-1">
            <p className="text-xs md:text-sm font-semibold text-green-600 mb-1 tracking-wide uppercase">Espace Membre</p>
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
              Bonjour, <span className="block md:inline">{user?.firstName}</span> <span className="inline-block animate-wave origin-bottom-right">👋</span>
            </h1>
            <p className="text-gray-500 text-base md:text-lg mt-2 max-w-xl">
              Gérez vos activités, suivez vos inscriptions et découvrez les prochaines opportunités.
            </p>
          </motion.div>

          <div className="bg-white/80 backdrop-blur-xl p-1.5 rounded-2xl shadow-sm border border-gray-100 flex gap-1 overflow-x-auto">
            {[
              { id: 'dashboard', label: 'Tableau de bord', icon: TrendingUp },
              { id: 'profile', label: 'Mon Profil', icon: UserIcon }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 md:px-5 py-2.5 rounded-xl text-xs md:text-sm font-semibold transition-all duration-200 flex items-center gap-2 whitespace-nowrap flex-1 justify-center ${activeTab === tab.id
                  ? 'bg-green-600 text-white shadow-lg shadow-green-600/20'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
              >
                <tab.icon size={16} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {activeTab === 'dashboard' ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">

            {/* KPI Cards (Light) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {/* Membership Status */}
              <div className="sm:col-span-2 md:col-span-1 bg-white rounded-[2rem] p-5 md:p-6 border border-gray-100 shadow-sm relative overflow-hidden group hover:border-green-200 transition-colors">
                <div className="absolute right-0 top-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                  <CheckCircle size={80} className="text-green-600" />
                </div>
                <h3 className="text-gray-500 font-medium text-xs md:text-sm mb-2">Statut Membre</h3>
                <div className="flex items-center gap-3 mb-4">
                  {enrollment ? (
                    <>
                      <span className={`text-3xl md:text-4xl font-extrabold ${enrollment.status === 'approved' ? 'text-green-600' :
                        enrollment.status === 'pending' ? 'text-amber-500' : 'text-gray-400'
                        }`}>
                        {enrollment.status === 'approved' ? 'Actif' : enrollment.status === 'pending' ? 'En cours' : 'Inactif'}
                      </span>
                    </>
                  ) : (
                    <span className="text-2xl md:text-3xl font-bold text-gray-400">Non inscrit</span>
                  )}
                </div>
                {enrollment?.status === 'approved' && (
                  <div className="flex items-center gap-2 text-xs font-semibold text-green-700 bg-green-50 py-1.5 px-3 rounded-lg w-fit">
                    <CheckCircle size={14} /> Accès complet
                  </div>
                )}
              </div>

              {/* Formations Count */}
              <div className="bg-white rounded-[2rem] p-5 md:p-6 border border-gray-100 shadow-sm flex flex-col justify-between group hover:border-orange-200 transition-colors">
                <div className="flex justify-between items-start">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Calendar size={20} className="md:w-6 md:h-6" />
                  </div>
                  <span className="text-3xl md:text-4xl font-extrabold text-gray-900">{myFormations.length}</span>
                </div>
                <div>
                  <h3 className="text-base md:text-lg font-bold text-gray-900 mt-4 h-auto">Formations</h3>
                  <p className="text-xs md:text-sm text-gray-500">Sessions rejointes</p>
                </div>
              </div>

              {/* Events Count */}
              <div className="bg-white rounded-[2rem] p-5 md:p-6 border border-gray-100 shadow-sm flex flex-col justify-between group hover:border-blue-200 transition-colors">
                <div className="flex justify-between items-start">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Ticket size={20} className="md:w-6 md:h-6" />
                  </div>
                  <span className="text-3xl md:text-4xl font-extrabold text-gray-900">{myEvents.length}</span>
                </div>
                <div>
                  <h3 className="text-base md:text-lg font-bold text-gray-900 mt-4">Événements</h3>
                  <p className="text-xs md:text-sm text-gray-500">Billets réservés</p>
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-12 gap-8">
              {/* Main Content Area */}
              <div className="lg:col-span-8 space-y-10">

                {/* MY EVENTS CAROUSEL */}
                <section>
                  <div className="flex items-center justify-between mb-4 md:mb-6">
                    <h2 className="text-lg md:text-xl font-bold text-gray-900 flex items-center gap-2">
                      <Ticket className="text-gray-400" size={24} />
                      Mes Événements
                    </h2>
                    {myEvents.length > 0 && <span className="text-[10px] md:text-xs font-semibold bg-white border border-gray-200 px-2 py-1 rounded-md text-gray-500">{myEvents.length} total</span>}
                  </div>

                  {myEvents.length > 0 ? (
                    <Carousel
                      items={myEvents}
                      renderItem={(event) => {
                        const myReg = event.registrations?.find(r => r.user && (String(r.user._id || r.user) === String(user?.id || user?._id)));
                        return (
                          <div className="group bg-white rounded-3xl p-3 md:p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row gap-4 md:gap-6 min-h-[180px] w-full max-w-full overflow-hidden">
                            {/* Event Image */}
                            <div className="w-full md:w-32 h-40 md:h-32 rounded-2xl bg-gray-50 overflow-hidden flex-shrink-0 relative">
                              {event.images && event.images.length > 0 ? (
                                <img src={event.images[0].url} alt={event.title} className="w-full h-full object-cover" />
                              ) : (
                                <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                                  <Calendar size={32} className="mb-2 opacity-50" />
                                  <span className="text-[10px] font-bold uppercase tracking-wider">Event</span>
                                </div>
                              )}
                            </div>

                            <div className="flex-1 min-w-0 flex flex-col justify-between overflow-hidden">
                              <div>
                                <div className="flex justify-between items-start mb-2 gap-2">
                                  <h3 className="text-lg md:text-xl font-bold text-gray-900 truncate pr-0 md:pr-4">{event.title}</h3>
                                  <div className="flex-shrink-0">
                                    {myReg && getStatusBadge(myReg.status)}
                                  </div>
                                </div>
                                <p className="text-gray-500 text-xs md:text-sm line-clamp-2 mb-3 break-words">{event.description}</p>
                              </div>
                              <div className="flex flex-wrap text-xs md:text-sm text-gray-500 gap-x-4 md:gap-x-6 gap-y-2">
                                <span className="flex items-center gap-1.5"><Calendar size={14} className="text-gray-400" /> {new Date(event.dateStart).toLocaleDateString(undefined, { dateStyle: 'long' })}</span>
                                <span className="flex items-center gap-1.5"><MapPin size={14} className="text-gray-400" /> {event.location}</span>
                              </div>
                            </div>
                          </div>
                        );
                      }}
                    />
                  ) : (
                    <div className="bg-white/50 backdrop-blur-sm rounded-3xl p-8 md:p-10 text-center border border-dashed border-gray-200">
                      <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-full shadow-sm flex items-center justify-center mx-auto mb-4 text-gray-300">
                        <Ticket size={24} className="md:w-8 md:h-8" />
                      </div>
                      <h3 className="text-gray-900 font-bold mb-1">Aucun événement</h3>
                      <p className="text-gray-500 text-sm mb-4">Vous n'avez pas encore réservé de places.</p>
                      <a href="/events" className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 bg-blue-50 px-4 py-2 rounded-xl hover:bg-blue-100 transition-colors">
                        Parcourir les événements <ArrowRight size={16} />
                      </a>
                    </div>
                  )}
                </section>

                {/* MY FORMATIONS CAROUSEL */}
                <section>
                  <div className="flex items-center justify-between mb-4 md:mb-6">
                    <h2 className="text-lg md:text-xl font-bold text-gray-900 flex items-center gap-2">
                      <Calendar className="text-gray-400" size={24} />
                      Mes Formations
                    </h2>
                    {myFormations.length > 0 && <span className="text-[10px] md:text-xs font-semibold bg-white border border-gray-200 px-2 py-1 rounded-md text-gray-500">{myFormations.length} total</span>}
                  </div>

                  {myFormations.length > 0 ? (
                    <Carousel
                      items={myFormations}
                      renderItem={(formation) => {
                        const myReg = formation.registrations?.find(r => String(r.userId) === String(user?.id || user?._id));
                        return (
                          <div className="bg-white rounded-2xl p-4 md:p-6 border border-gray-100 shadow-sm flex flex-col sm:flex-row items-center gap-4 md:gap-6 w-full max-w-full overflow-hidden">
                            <div className="w-full sm:w-20 h-24 sm:h-20 bg-orange-50 text-orange-600 rounded-2xl flex flex-col items-center justify-center flex-shrink-0 shadow-inner">
                              <span className="text-xs font-bold uppercase">{new Date(formation.date).toLocaleString('default', { month: 'short' })}</span>
                              <span className="text-3xl font-black leading-none">{new Date(formation.date).getDate()}</span>
                            </div>

                            <div className="flex-1 w-full text-center sm:text-left overflow-hidden">
                              <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start gap-3 md:gap-4">
                                <div className="min-w-0 w-full">
                                  <h3 className="font-bold text-gray-900 text-lg md:text-xl mb-1 truncate">{formation.title}</h3>
                                  <p className="text-gray-500 text-xs md:text-sm flex items-center justify-center sm:justify-start gap-2 truncate">
                                    <MapPin size={14} className="text-orange-400 flex-shrink-0" /> {formation.location}
                                  </p>
                                </div>
                                {myReg && getStatusBadge(myReg.status)}
                              </div>
                            </div>
                          </div>
                        );
                      }}
                    />
                  ) : (
                    <div className="bg-white/50 backdrop-blur-sm rounded-3xl p-10 text-center border border-dashed border-gray-200">
                      <p className="text-gray-500">Aucune formation en cours.</p>
                    </div>
                  )}
                </section>

              </div>

              {/* Sidebar: Recommendations (Light Theme) */}
              <div className="lg:col-span-4 space-y-8">
                <div className="sticky top-24">
                  <div className="bg-white rounded-[2rem] p-5 md:p-6 border border-gray-100 shadow-xl shadow-gray-100/50 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-green-50 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />

                    <h3 className="text-lg md:text-xl font-extrabold text-gray-900 mb-4 md:mb-6 relative z-10 flex items-center gap-2">
                      <Star className="text-yellow-400 fill-yellow-400" size={20} />
                      À ne pas manquer
                    </h3>

                    <div className="space-y-3 md:space-y-4 relative z-10">
                      {formations
                        .filter(f => !f.registrations?.some(r => String(r.userId) === String(user?.id || user?._id)))
                        .slice(0, 3)
                        .map((f, i) => (
                          <div key={i} className="bg-gray-50/80 p-4 rounded-2xl border border-gray-100 hover:border-green-200 hover:bg-green-50/30 transition-all group">
                            <span className="text-[10px] font-bold uppercase tracking-wider bg-white border border-gray-100 text-gray-500 px-2 py-1 rounded-md mb-2 inline-block">
                              Formation
                            </span>
                            <h4 className="font-bold text-base md:text-lg text-gray-900 mb-1 leading-tight">{f.title}</h4>
                            <div className="flex items-center justify-between mt-3 text-xs md:text-sm">
                              <span className="text-gray-500 font-medium">{new Date(f.date).toLocaleDateString()}</span>
                              <button
                                onClick={() => handleRegister(f._id)}
                                disabled={registeringId === f._id}
                                className="bg-gray-900 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-green-600 transition-colors disabled:opacity-50 shadow-sm"
                              >
                                {registeringId === f._id ? <Loader2 size={12} className="animate-spin" /> : "S'inscrire"}
                              </button>
                            </div>
                          </div>
                        ))}

                      {/* More Events Button */}
                      <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-gray-100/50">
                        <a
                          href="/events"
                          className="flex items-center justify-center gap-2 w-full bg-white/80 backdrop-blur-sm p-3 rounded-xl text-xs md:text-sm font-bold text-gray-700 hover:bg-white hover:text-green-600 transition-all shadow-sm group"
                        >
                          <Ticket size={16} />
                          Voir tous les événements
                          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        ) : (
          /* --- PROFILE TAB (Light) --- */
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto">
            <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
              <div className="relative h-32 md:h-48 bg-gray-100">
                <img
                  src="https://res.cloudinary.com/drxouwbms/image/upload/v1755949759/Screenshot_2025-08-23_at_11_41_05_1_-Picsart-AiImageEnhancer_kfsp1y.png"
                  alt="Profile Cover"
                  className="w-full h-full object-cover"
                />
                <div className="absolute -bottom-12 md:-bottom-16 left-6 md:left-12 p-1 md:p-1.5 bg-white rounded-full shadow-lg z-10">
                  <img
                    src={getUserPhoto(user as any)} // Cast user for compatibility
                    alt="Profile"
                    className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover bg-gray-100 border-4 border-white"
                  />
                </div>
              </div>

              <div className="pt-16 md:pt-20 px-6 md:px-12 pb-8 md:pb-12">
                <div className="flex flex-col md:flex-row justify-between items-start mb-6 md:mb-8 gap-4">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">{user?.firstName} {user?.lastName}</h2>
                    <p className="text-gray-500 font-medium text-sm md:text-base">{user?.email}</p>
                  </div>
                  <button className="w-full md:w-auto px-6 py-2.5 bg-gray-50 text-gray-700 font-bold rounded-xl hover:bg-gray-100 border border-gray-200 transition-colors">
                    Éditer le profil
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-6 md:gap-10">
                  <div className="space-y-6">
                    <div>
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">Information Contact</label>
                      <div className="bg-gray-50 rounded-2xl p-4 md:p-5 border border-gray-100 space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm text-gray-400">
                            <UserIcon size={16} />
                          </div>
                          <span className="font-semibold text-gray-700">{user?.phone || 'Non renseigné'}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">Activités</label>
                      <div className="bg-gray-50 rounded-2xl p-4 md:p-5 border border-gray-100">
                        {enrollment?.companyName && (
                          <div className="mb-4 pb-4 border-b border-gray-200">
                            <span className="text-xs text-gray-400 block mb-1">Entreprise</span>
                            <span className="font-bold text-gray-900 flex items-center gap-2">
                              <Building2 size={16} className="text-gray-400" /> {enrollment.companyName}
                            </span>
                          </div>
                        )}
                        <div>
                          <span className="text-xs text-gray-400 block mb-2">Intérêts</span>
                          <div className="flex flex-wrap gap-2">
                            {enrollment?.interests?.map(i => (
                              <span key={i} className="px-3 py-1 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-600 shadow-sm">
                                {i}
                              </span>
                            )) || <span className="text-sm text-gray-400 italic">Aucun intérêt listé</span>}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
