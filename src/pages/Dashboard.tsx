import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { enrollmentsAPI, formationsAPI } from '../services/api';
import {
  Building2, Clock, CheckCircle, XCircle, AlertCircle,
  User as UserIcon, TrendingUp, Calendar, MapPin, ArrowRight, Tag, Loader2, ChevronLeft, ChevronRight
} from 'lucide-react';
import Swal from 'sweetalert2';


import { Enrollment, Formation } from '../types';
import { getUserPhoto } from '../utils/userUtils';

const Dashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'profile'>('dashboard');
  const [enrollment, setEnrollment] = useState<Enrollment | null>(null);
  const [formations, setFormations] = useState<Formation[]>([]);
  const [myFormations, setMyFormations] = useState<Formation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [myFormationsCurrentPage, setMyFormationsCurrentPage] = useState(1);
  const [myFormationsPerPage] = useState(5);
  const [registeringId, setRegisteringId] = useState<string | null>(null);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'rejected': return <XCircle className="w-5 h-5 text-red-600" />;
      case 'pending': return <Clock className="w-5 h-5 text-yellow-600" />;
      default: return <AlertCircle className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    return status === 'pending' ? 'En attente' :
      status === 'approved' ? 'Approuvé' :
        status === 'rejected' ? 'Rejeté' : status;
  };

  const { isLoading: authLoading } = useAuth();
  const [registeredFormationIds, setRegisteredFormationIds] = useState<Set<string>>(new Set());


  useEffect(() => {
    const userId = user?.id || user?._id;
    if (authLoading || !userId) return;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [enrRes, formRes] = await Promise.all([
          enrollmentsAPI.getMyEnrollments(),
          formationsAPI.getAll()
        ]);

        if (enrRes.data.length > 0) setEnrollment(enrRes.data[0]);

        const allFormations: Formation[] = formRes.data.formations || [];
        setFormations(allFormations);

        const myRegistrations = allFormations
          .flatMap(f => f.registrations?.filter(r => r.userId === userId).map(() => f._id) || []);

        setRegisteredFormationIds(new Set(myRegistrations));

        const myRegs = allFormations.filter(f =>
          f.registrations?.some(r => String(r.userId) === String(userId))
        );
        setMyFormations(myRegs);

      } catch (err: any) {
        setError('Erreur');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user?.id, user?._id, authLoading]);

  const handleRegister = async (formationId: string) => {
    try {
      setRegisteringId(formationId);
      await formationsAPI.register(formationId);

      const res = await formationsAPI.getAll();
      const allFormations = res.data.formations || [];
      setFormations(allFormations);

      const myRegistrations = allFormations.flatMap((f: any) =>
        f.registrations?.filter((r: any) => r.userId === user!.id).map(() => f._id) || []
      );
      const registeredIds = new Set<string>(myRegistrations);
      setRegisteredFormationIds(registeredIds);

      Swal.fire('Succès', 'Inscription envoyée !', 'success');
    } catch (err: any) {
      Swal.fire('Erreur', err.response?.data?.message || 'Échec', 'error');
    } finally {
      setRegisteringId(null);
    }
  };
  // Skeleton Loader Component
  const SkeletonLoader = () => (
    <div className="animate-pulse space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-32 bg-gray-200 rounded-2xl"></div>
        ))}
      </div>
      <div className="h-8 w-48 bg-gray-200 rounded mb-4"></div>
      <div className="grid md:grid-cols-2 gap-4">
        {[1, 2].map((i) => (
          <div key={i} className="h-40 bg-gray-200 rounded-xl"></div>
        ))}
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="h-48 bg-gray-200 rounded-2xl animate-pulse"></div>
          <SkeletonLoader />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="text-red-600 text-xl mb-4">Erreur</div>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 relative overflow-hidden font-sans text-gray-900">
      {/* Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-green-200/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-[20%] left-[-10%] w-[600px] h-[600px] bg-blue-200/20 rounded-full blur-[120px]" />
        <div className="absolute top-[40%] left-[20%] w-[300px] h-[300px] bg-purple-200/10 rounded-full blur-[80px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-2">
              Bonjour, <span className="text-green-600">{user?.firstName}</span>
            </h1>
            <p className="text-gray-500 text-lg">
              Heureux de vous revoir. Voici ce qui se passe aujourd'hui.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 bg-white p-1.5 rounded-2xl shadow-sm border border-gray-100"
          >
            {['dashboard', 'profile'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`px-6 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${activeTab === tab
                  ? 'bg-gray-900 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
              >
                <div className="flex items-center gap-2">
                  {tab === 'dashboard' ? <TrendingUp size={16} /> : <UserIcon size={16} />}
                  <span className="capitalize">{tab === 'dashboard' ? 'Aperçu' : 'Mon Profil'}</span>
                </div>
              </button>
            ))}
          </motion.div>
        </div>

        {activeTab === 'dashboard' ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-10"
          >
            {/* Bento Grid Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {/* Main Status Card */}
              <div className="md:col-span-2 bg-white rounded-3xl p-6 shadow-[0_2px_20px_rgb(0,0,0,0.04)] border border-gray-100 relative overflow-hidden group">
                <div className="absolute right-0 top-0 w-32 h-32 bg-green-50 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-110 duration-500" />
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-gray-500 font-medium mb-1">Satut d'adhésion</h3>
                      <div className="flex items-center gap-2">
                        {enrollment ? (
                          <>
                            <span className={`text-3xl font-bold ${enrollment.status === 'approved' ? 'text-green-600' :
                              enrollment.status === 'rejected' ? 'text-red-600' : 'text-amber-500'
                              }`}>
                              {getStatusText(enrollment.status)}
                            </span>
                            {getStatusIcon(enrollment.status)}
                          </>
                        ) : (
                          <span className="text-3xl font-bold text-gray-400">Non inscrit</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {enrollment?.status === 'approved' && (
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm font-medium">
                      <CheckCircle size={16} />
                      <span>Membre actif</span>
                    </div>
                  )}
                  {enrollment?.status === 'pending' && (
                    <p className="text-gray-500 text-sm max-w-md">
                      Votre dossier est en cours d'examen par notre équipe. Nous vous contacterons bientôt.
                    </p>
                  )}
                </div>
              </div>

              {/* Stats Card 1: Formations */}
              <div className="bg-white rounded-3xl p-6 shadow-[0_2px_20px_rgb(0,0,0,0.04)] border border-gray-100 flex flex-col justify-between group hover:border-orange-100 transition-colors">
                <div className="flex justify-between items-start">
                  <div className="p-3 bg-orange-50 text-orange-600 rounded-2xl group-hover:bg-orange-100 transition-colors">
                    <Calendar size={24} />
                  </div>
                  <span className="text-3xl font-bold text-gray-900">{myFormations.length}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mt-4">Formations</h3>
                  <p className="text-sm text-gray-500">Inscriptions actives</p>
                </div>
              </div>

              {/* Stats Card 2: Interests */}
              <div className="bg-white rounded-3xl p-6 shadow-[0_2px_20px_rgb(0,0,0,0.04)] border border-gray-100 flex flex-col justify-between group hover:border-purple-100 transition-colors">
                <div className="flex justify-between items-start">
                  <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl group-hover:bg-purple-100 transition-colors">
                    <Tag size={24} />
                  </div>
                  <span className="text-3xl font-bold text-gray-900">{enrollment?.interests.length || 0}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mt-4">Centres d'intérêt</h3>
                  <p className="text-sm text-gray-500">Sujets suivis</p>
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Left Column: My Formations */}
              <div className="lg:col-span-2 space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <Building2 className="text-gray-400" size={20} />
                    Mes Formations
                  </h2>
                </div>

                {myFormations.length > 0 ? (
                  <div className="space-y-4">
                    <div className="grid gap-4">
                      {myFormations
                        .slice((myFormationsCurrentPage - 1) * myFormationsPerPage, myFormationsCurrentPage * myFormationsPerPage)
                        .map(f => {
                          const myReg = f.registrations?.find(r => String(r.userId) === String(user?.id || user?._id));
                          return (
                            <motion.div
                              key={f._id}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all flex items-center justify-between group"
                            >
                              <div className="flex gap-4 items-center">
                                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center font-bold text-lg group-hover:bg-blue-100 transition-colors">
                                  {new Date(f.date).getDate()}
                                </div>
                                <div>
                                  <h3 className="font-bold text-gray-900 group-hover:text-green-700 transition-colors">{f.title}</h3>
                                  <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                                    <span className="flex items-center gap-1"><Calendar size={14} /> {new Date(f.date).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}</span>
                                    <span className="w-1 h-1 bg-gray-300 rounded-full" />
                                    <span className="flex items-center gap-1"><MapPin size={14} /> {f.location}</span>
                                  </div>
                                </div>
                              </div>
                              {myReg && (
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(myReg.status)}`}>
                                  {getStatusText(myReg.status)}
                                </span>
                              )}
                            </motion.div>
                          );
                        })}
                    </div>

                    {/* Pagination for myFormations */}
                    {myFormations.length > myFormationsPerPage && (
                      <div className="flex items-center justify-between pt-4">
                        <p className="text-sm text-gray-500">
                          Affichage de <span className="font-semibold text-gray-900">{Math.min((myFormationsCurrentPage - 1) * myFormationsPerPage + 1, myFormations.length)}</span> à <span className="font-semibold text-gray-900">{Math.min(myFormationsCurrentPage * myFormationsPerPage, myFormations.length)}</span> sur <span className="font-semibold text-gray-900">{myFormations.length}</span>
                        </p>
                        <nav className="flex items-center space-x-1">
                          <button
                            onClick={() => setMyFormationsCurrentPage(myFormationsCurrentPage - 1)}
                            disabled={myFormationsCurrentPage === 1}
                            className="p-2 rounded-lg border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm transition-all"
                          >
                            <ChevronLeft className="w-4 h-4" />
                          </button>

                          <div className="flex items-center space-x-1 px-1">
                            {Array.from({ length: Math.ceil(myFormations.length / myFormationsPerPage) }, (_, i) => i + 1).map((pageNum) => (
                              <button
                                key={pageNum}
                                onClick={() => setMyFormationsCurrentPage(pageNum)}
                                className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium transition-all ${myFormationsCurrentPage === pageNum
                                  ? 'bg-green-600 text-white shadow-md shadow-green-200'
                                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                                  }`}
                              >
                                {pageNum}
                              </button>
                            ))}
                          </div>

                          <button
                            onClick={() => setMyFormationsCurrentPage(myFormationsCurrentPage + 1)}
                            disabled={myFormationsCurrentPage === Math.ceil(myFormations.length / myFormationsPerPage)}
                            className="p-2 rounded-lg border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm transition-all"
                          >
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </nav>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="bg-white rounded-2xl p-8 text-center border border-dashed border-gray-200">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Calendar className="text-gray-400" size={32} />
                    </div>
                    <h3 className="text-gray-900 font-medium mb-1">Aucune inscription active</h3>
                    <p className="text-gray-500 text-sm">Inscrivez-vous aux formations à venir pour les voir ici.</p>
                  </div>
                )}
              </div>

              {/* Right Column: Upcoming (Sidebar style) */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900">À la une</h2>
                  <a href="/activities" className="text-sm font-medium text-green-600 hover:text-green-700">Voir tout</a>
                </div>

                <div className="bg-white rounded-3xl p-2 shadow-sm border border-gray-100">
                  {formations
                    .filter(f => !f.registrations?.some(r => String(r.userId) === String(user?.id || user?._id)))
                    .slice(0, 3)
                    .map((f, idx) => (
                      <div key={f._id} className={`p-4 rounded-2xl transition-colors ${idx !== 0 ? 'mt-2 hover:bg-gray-50' : 'bg-gray-50'}`}>
                        <div className="flex justify-between items-start mb-2">
                          <div className="bg-white text-gray-900 text-xs font-bold px-2 py-1 rounded-md shadow-sm border border-gray-100">
                            {new Date(f.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
                          </div>
                          <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">Coming soon</span>
                        </div>
                        <h3 className="font-bold text-gray-900 mb-1 line-clamp-2">{f.title}</h3>
                        <p className="text-xs text-gray-500 mb-3 line-clamp-1"><MapPin size={12} className="inline mr-1" /> {f.location}</p>

                        <div className="flex items-center justify-between mt-3">
                          <div className="text-xs text-gray-500">
                            <span className="font-semibold text-gray-900">{f.maxSeats - f.enrolledUsers.length}</span> places
                          </div>
                          <button
                            onClick={() => handleRegister(f._id)}
                            disabled={registeringId === f._id}
                            className="text-xs font-semibold bg-gray-900 text-white px-3 py-1.5 rounded-lg hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5"
                          >
                            {registeringId === f._id ? (
                              <Loader2 className="w-3 h-3 animate-spin" />
                            ) : null}
                            S'inscrire
                          </button>
                        </div>
                      </div>
                    ))}
                  {formations.filter(f => !f.registrations?.some(r => String(r.userId) === String(user?.id || user?._id))).length === 0 && (
                    <div className="p-8 text-center">
                      <p className="text-gray-500 text-sm">Aucune nouvelle formation.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="grid lg:grid-cols-12 gap-8"
          >
            {/* Profile Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white rounded-3xl p-8 shadow-[0_2px_20px_rgb(0,0,0,0.04)] border border-gray-100 text-center relative overflow-hidden">
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-32 h-32 rounded-full p-1 bg-white shadow-lg mb-4">
                    <img
                      src={getUserPhoto(user)}
                      alt={`${user?.firstName} ${user?.lastName}`}
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">{user?.firstName} {user?.lastName}</h2>
                  <p className="text-green-600 font-medium bg-green-50 px-3 py-1 rounded-full text-sm mt-2 capitalize">{user?.role}</p>

                  <div className="mt-6 flex flex-col w-full gap-3">
                    <button className="w-full py-2.5 rounded-xl border border-gray-200 font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors text-sm">
                      Modifier le profil
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Details */}
            <div className="lg:col-span-8">
              <div className="bg-white rounded-3xl shadow-[0_2px_20px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                  <h3 className="font-bold text-lg text-gray-900">Informations personnelles</h3>
                </div>
                <div className="p-8 grid md:grid-cols-2 gap-y-8 gap-x-12">
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">Email</label>
                    <p className="text-gray-900 font-medium text-lg">{user?.email}</p>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">Téléphone</label>
                    <p className="text-gray-900 font-medium text-lg">{user?.phone || '–'}</p>
                  </div>

                  {enrollment?.companyName && (
                    <div className="md:col-span-2">
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">Entreprise</label>
                      <div className="flex items-center gap-2 text-gray-900 font-medium text-lg">
                        <Building2 className="text-gray-400" size={20} />
                        {enrollment.companyName}
                      </div>
                    </div>
                  )}

                  <div className="md:col-span-2">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 block">Centres d'intérêt</label>
                    {enrollment?.interests.length ? (
                      <div className="flex flex-wrap gap-2">
                        {enrollment.interests.map(i => (
                          <span key={i} className="px-4 py-2 bg-gray-50 rounded-lg text-gray-700 font-medium text-sm border border-gray-200">
                            {i}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-gray-400 italic">Aucun intérêt renseigné</span>
                    )}
                  </div>

                  <div className="md:col-span-2 pt-6 border-t border-gray-100 flex justify-between items-center">
                    <div>
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">Membre depuis</label>
                      <p className="text-gray-700 font-medium">
                        {enrollment ? new Date(enrollment.createdAt).toLocaleDateString('fr-FR', { dateStyle: 'long' }) : '–'}
                      </p>
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
