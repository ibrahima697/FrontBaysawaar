import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { enrollmentsAPI, formationsAPI } from '../services/api';
import {
  Building2, Clock, CheckCircle, XCircle, AlertCircle,
  User as UserIcon, TrendingUp, Calendar, MapPin, ArrowRight, Tag
} from 'lucide-react';
import Swal from 'sweetalert2';


import { Enrollment, Formation } from '../types';

const Dashboard = () => {
  const { user } = useAuth();
  console.log('Dashboard User Object:', user); // DEBUG: Check user data structure
  const [activeTab, setActiveTab] = useState<'dashboard' | 'profile'>('dashboard');
  const [enrollment, setEnrollment] = useState<Enrollment | null>(null);
  const [formations, setFormations] = useState<Formation[]>([]);
  const [myFormations, setMyFormations] = useState<Formation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

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

  // Helper for user photo fallback
  const getUserPhoto = () => {
    // Priorité à la nouvelle propriété photo (Cloudinary)
    if (user?.photo?.url) return user.photo.url;
    if (user?.photoURL) return user.photoURL;
    if (user?.avatar) return user.avatar;
    // fallback: initials avatar
    if (user?.firstName && user?.lastName) {
      return `https://ui-avatars.com/api/?name=${encodeURIComponent(
        `${user.firstName} ${user.lastName}`
      )}&background=16a34a&color=fff&bold=true`;
    }
    return 'https://ui-avatars.com/api/?name=U&background=16a34a&color=fff&bold=true';
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-white/20 shadow-xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">
              Tableau de bord
            </h1>
            <p className="text-gray-600 text-lg">
              Bienvenue, <span className="font-semibold text-gray-900">{user?.firstName} {user?.lastName}</span>
            </p>
            {enrollment && (
              <div className="flex items-center gap-2 mt-3">
                <span className="text-sm text-gray-600">Statut :</span>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(enrollment.status)}`}>
                  {getStatusIcon(enrollment.status)} {getStatusText(enrollment.status)}
                </span>
              </div>
            )}
          </div>
        </motion.div>

        {/* Onglets */}
        <div className="bg-white/70 backdrop-blur-xl border-b border-white/20 rounded-t-2xl mb-6">
          <nav className="flex space-x-2 p-2">
            {['dashboard', 'profile'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`flex-1 py-3 px-6 rounded-xl font-medium text-sm transition-all ${activeTab === tab
                  ? 'bg-green-500 text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                  }`}
              >
                <div className="flex items-center justify-center space-x-2">
                  {tab === 'dashboard' ? <TrendingUp className="w-4 h-4" /> : <UserIcon className="w-4 h-4" />}
                  <span>{tab === 'dashboard' ? 'Tableau de Bord' : 'Mon Profil'}</span>
                </div>
              </button>
            ))}
          </nav>
        </div>

        {/* === ONGLET DASHBOARD === */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                className="bg-white/60 backdrop-blur-xl rounded-2xl p-6 border border-white/30 shadow-xl hover:shadow-2xl transition-all hover:scale-105">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Statut</p>
                    <p className="text-2xl font-bold text-gray-900 capitalize">
                      {enrollment ? getStatusText(enrollment.status) : 'Non inscrit'}
                    </p>
                  </div>
                  {enrollment && getStatusIcon(enrollment.status)}
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                className="bg-white/60 backdrop-blur-xl rounded-2xl p-6 border border-white/30 shadow-xl hover:shadow-2xl transition-all hover:scale-105">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Formations suivies</p>
                    <p className="text-2xl font-bold text-gray-900">{myFormations.length}</p>
                  </div>
                  <Calendar className="w-8 h-8 text-orange-600" />
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                className="bg-white/60 backdrop-blur-xl rounded-2xl p-6 border border-white/30 shadow-xl hover:shadow-2xl transition-all hover:scale-105">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Intérêts</p>
                    <p className="text-2xl font-bold text-gray-900">{enrollment?.interests.length || 0}</p>
                  </div>
                  <Tag className="w-8 h-8 text-purple-600" />
                </div>
              </motion.div>
            </div>

            {/* Mes Formations */}
            {myFormations.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Mes Formations</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {myFormations.map(f => {
                    const myReg = f.registrations?.find(r => String(r.userId) === String(user?.id || user?._id));
                    return (
                      <div key={f._id} className="bg-white/60 backdrop-blur-sm rounded-xl p-5 border border-white/40">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-lg">{f.title}</h3>
                          {myReg && (
                            <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(myReg.status)}`}>
                              {getStatusIcon(myReg.status)} {getStatusText(myReg.status)}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 flex items-center gap-1"><Calendar size={14} /> {new Date(f.date).toLocaleDateString('fr-FR')}</p>
                        <p className="text-sm text-gray-600 flex items-center gap-1"><MapPin size={14} /> {f.location}</p>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Formations Disponibles */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900">Formations à venir</h2>
                <a href="/activities" className="text-green-600 hover:underline flex items-center gap-1 text-sm">
                  Voir tout <ArrowRight size={16} />
                </a>
              </div>
              {formations.filter(f => !f.registrations?.some(r => String(r.userId) === String(user?.id || user?._id))).length === 0 ? (
                <div className="text-center py-12 bg-white/50 backdrop-blur-sm rounded-2xl border border-dashed border-gray-300">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">Aucune formation disponible</h3>
                  <p className="text-gray-500 mb-6">Revenez plus tard pour de nouvelles opportunités.</p>
                  <a href="/activities" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                    Voir toutes les activités
                  </a>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-4">
                  {formations
                    .filter(f => !f.registrations?.some(r => String(r.userId) === String(user?.id || user?._id)))
                    .slice(0, 4)
                    .map(f => (
                      <div key={f._id} className="bg-white/60 backdrop-blur-sm rounded-xl p-5 border border-white/40 hover:shadow-lg transition">
                        <h3 className="font-semibold text-lg">{f.title}</h3>
                        <p className="text-sm text-gray-600 flex items-center gap-1"><Calendar size={14} /> {new Date(f.date).toLocaleDateString('fr-FR')}</p>
                        <p className="text-sm text-gray-600 flex items-center gap-1"><MapPin size={14} /> {f.location}</p>
                        <p className="text-xs text-gray-500 mt-2">
                          Places : {f.maxSeats - f.enrolledUsers.length}/{f.maxSeats}
                        </p>
                        {registeredFormationIds.has(f._id) ? (
                          <button disabled className="bg-gray-400 text-white px-4 py-1.5 rounded-full text-sm">
                            Inscription envoyée
                          </button>
                        ) : (
                          <button
                            onClick={() => handleRegister(f._id)}
                            className="bg-orange-500 text-white px-4 py-1.5 rounded-full text-sm font-medium hover:bg-orange-600"
                          >
                            S’inscrire
                          </button>
                        )}
                      </div>
                    ))}
                </div>
              )}
            </motion.div>
          </div>
        )}

        {/* === ONGLET PROFIL === */}
        {activeTab === 'profile' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white/70 backdrop-blur-xl rounded-2xl border border-white/30 shadow-xl p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Mon Profil</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex flex-col items-center">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center shadow-lg overflow-hidden">
                  <img
                    src={getUserPhoto()}
                    alt={`${user?.firstName} ${user?.lastName}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="mt-4 text-xl font-bold">{user?.firstName} {user?.lastName}</h3>
                <p className="text-gray-600 capitalize">{user?.role}</p>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-medium">{user?.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Téléphone</p>
                    <p className="font-medium">{user?.phone || '–'}</p>
                  </div>
                </div>

                {enrollment?.companyName && (
                  <div>
                    <p className="text-sm text-gray-600">Entreprise</p>
                    <p className="font-medium flex items-center gap-1"><Building2 size={16} /> {enrollment.companyName}</p>
                  </div>
                )}

                {enrollment?.interests.length ? (
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Intérêts</p>
                    <div className="flex flex-wrap gap-2">
                      {enrollment.interests.map(i => (
                        <span key={i} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs">
                          {i}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}

                <div>
                  <p className="text-sm text-gray-600">Membre depuis</p>
                  <p className="font-medium">
                    {enrollment ? new Date(enrollment.createdAt).toLocaleDateString('fr-FR') : '–'}
                  </p>
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
