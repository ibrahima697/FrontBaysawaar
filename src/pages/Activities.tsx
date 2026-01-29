import { motion } from 'framer-motion';

import { BookOpen, Users, FileText, Calendar, MapPin, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import ActivityCard from '../components/ActivityCard';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { formationsAPI } from '../services/api';
import Swal from 'sweetalert2';

import { User, Formation } from '../types';

const Activities = () => {
  const { user, token } = useAuth() as { user: User | null; token: string | null };
  const [formations, setFormations] = useState<Formation[]>([]);
  const [loading, setLoading] = useState(true);
  const [registeredFormationIds, setRegisteredFormationIds] = useState<Set<string>>(new Set());
  const [approvedFormationIds, setApprovedFormationIds] = useState<Set<string>>(new Set());
  const [rejectedFormationIds, setRejectedFormationIds] = useState<Set<string>>(new Set());
  const [formationsCurrentPage, setFormationsCurrentPage] = useState(1);
  const [formationsPerPage] = useState(3); // Most likely 3 or 4 for activities
  const navigate = useNavigate();

  useEffect(() => {
    const userId = user?._id || user?.id;
    if (!userId || !token) {
      setLoading(false);
      return;
    }

    const fetchFormations = async () => {
      try {
        const res = await formationsAPI.getAll();
        const allFormations: Formation[] = res.data.formations || [];
        setFormations(allFormations);

        // On recalcule proprement les états
        const registered = new Set<string>();
        const approved = new Set<string>();
        const rejected = new Set<string>();

        allFormations.forEach(f => {
          const userReg = f.registrations?.find(r => String(r.userId) === String(userId));
          if (userReg) {
            registered.add(f._id);
            if (userReg.status === 'approved') {
              approved.add(f._id);
            } else if (userReg.status === 'rejected') {
              rejected.add(f._id);
            }
          }
        });

        setRegisteredFormationIds(registered);
        setApprovedFormationIds(approved);
        setRejectedFormationIds(rejected);
      } catch (err) {
        console.error("Erreur chargement formations :", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFormations();
  }, [user, token]);
  const handleRegister = async (formationId: string) => {
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      await formationsAPI.register(formationId);

      // Recharge les formations
      const res = await formationsAPI.getAll();
      const allFormations: Formation[] = res.data.formations || [];
      setFormations(allFormations);

      // Recalcule les Sets
      const userId = user!._id || user!.id;
      const registered = new Set<string>();
      const approved = new Set<string>();
      const rejected = new Set<string>();

      allFormations.forEach((f) => {
        f.registrations?.forEach((r) => {
          if (String(r.userId) === String(userId)) {
            registered.add(f._id);
            if (r.status === 'approved') approved.add(f._id);
            else if (r.status === 'rejected') rejected.add(f._id);
          }
        });
      });

      setRegisteredFormationIds(registered);
      setApprovedFormationIds(approved);
      setRejectedFormationIds(rejected);

      Swal.fire('Succès', 'Inscription envoyée !', 'success');
    } catch (err: any) {
      Swal.fire('Erreur', err.response?.data?.message || 'Problème', 'error');
    }
  };


  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Hero */}
      <section className="relative pt-16 pb-12 sm:py-20 md:py-24 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(https://res.cloudinary.com/drxouwbms/image/upload/v1755949759/Screenshot_2025-08-23_at_11_41_05_1_-Picsart-AiImageEnhancer_kfsp1y.png)' }}>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 tracking-tighter uppercase whitespace-pre-line leading-[0.9]">
              IMPACT <span className="text-green-400">SOCIAL</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10 font-medium px-4">
              Explorez nos initiatives dédiées à l'autonomisation et à la croissance durable des entreprises africaines.
            </p>
            <Link
              to={token ? "/dashboard" : "/enrollments"}
              className="inline-flex items-center space-x-3 bg-green-600 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-green-700 transition-all shadow-2xl hover:shadow-green-500/20 active:scale-95"
            >
              <span>{token ? "Mon Espace Personnel" : "Devenir Partenaire"}</span>
              <ExternalLink size={18} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Sections */}
      <section className="py-24 px-4 max-w-7xl mx-auto space-y-12">
        {/* Formations */}
        <ActivityCard
          title="Formations Gratuites"
          subtitle="Compétences & Excellence"
          description="Des cycles de formation intensifs conçus pour transformer vos idées en entreprises prospères."
          icon={BookOpen}
          color="from-green-500 to-emerald-600"
          ctaText={token ? "Gérer mes formations" : "S'inscrire"}
          ctaLink={token ? "/dashboard" : "/enrollments"}
          ctaState={{ type: 'formation' }}
        >
          {loading ? (
            <div className="flex justify-center p-12">
              <div className="w-8 h-8 border-4 border-green-200 border-t-green-600 rounded-full animate-spin" />
            </div>
          ) : formations.length === 0 ? (
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 text-center">
              <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Aucun cycle actif pour le moment</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid gap-4">
                {formations
                  .slice((formationsCurrentPage - 1) * formationsPerPage, formationsCurrentPage * formationsPerPage)
                  .map(formation => (
                    <div key={formation._id} className="group/item relative bg-gray-50/50 p-6 rounded-2xl border border-gray-100 hover:bg-white hover:shadow-xl transition-all duration-300">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div>
                          <h4 className="font-black text-xl mb-2 text-gray-900">{formation.title}</h4>
                          <div className="flex flex-wrap gap-4 text-xs font-black uppercase tracking-widest text-gray-400">
                            <span className="flex items-center gap-1.5 group-hover/item:text-green-600 transition-colors">
                              <Calendar size={14} className="text-green-500" /> {new Date(formation.date).toLocaleDateString('fr-FR')}
                            </span>
                            <span className="flex items-center gap-1.5 group-hover/item:text-green-600 transition-colors">
                              <MapPin size={14} className="text-green-500" /> {formation.location}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-6">
                          <div className="text-right hidden sm:block">
                            <p className="text-gray-900 font-black text-lg">{formation.maxSeats - formation.enrolledUsers.length}</p>
                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Places Disponibles</p>
                          </div>

                          {user?.role !== 'admin' && (
                            <>
                              {registeredFormationIds.has(formation._id) ? (
                                <button
                                  disabled
                                  className={`px-6 py-3 font-black text-[10px] uppercase tracking-widest rounded-xl cursor-not-allowed border ${rejectedFormationIds.has(formation._id)
                                    ? 'bg-red-50 text-red-600 border-red-100'
                                    : 'bg-gray-100 text-gray-400 border-gray-200'
                                    }`}
                                >
                                  {approvedFormationIds.has(formation._id) ? 'Validé' :
                                    rejectedFormationIds.has(formation._id) ? 'Rejeté' : 'Attente'}
                                </button>
                              ) : (
                                <button
                                  onClick={() => handleRegister(formation._id)}
                                  className="px-6 py-3 bg-gray-900 text-white font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-green-600 transition-all shadow-lg active:scale-95"
                                >
                                  Réserver
                                </button>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>

              {/* Enhanced Pagination */}
              {formations.length > formationsPerPage && (
                <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
                  <span className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">
                    Séquence <span className="text-gray-900">{formationsCurrentPage}</span> / {Math.ceil(formations.length / formationsPerPage)}
                  </span>
                  <nav className="flex items-center space-x-2">
                    <button
                      onClick={() => setFormationsCurrentPage(formationsCurrentPage - 1)}
                      disabled={formationsCurrentPage === 1}
                      className="p-3 rounded-xl bg-gray-100 text-gray-400 hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>

                    <div className="flex items-center gap-1">
                      {Array.from({ length: Math.ceil(formations.length / formationsPerPage) }, (_, i) => i + 1).map((pageNum) => (
                        <button
                          key={pageNum}
                          onClick={() => setFormationsCurrentPage(pageNum)}
                          className={`w-10 h-10 flex items-center justify-center rounded-xl text-xs font-black transition-all ${formationsCurrentPage === pageNum
                            ? 'bg-green-600 text-white shadow-xl scale-110'
                            : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                            }`}
                        >
                          {pageNum}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={() => setFormationsCurrentPage(formationsCurrentPage + 1)}
                      disabled={formationsCurrentPage === Math.ceil(formations.length / formationsPerPage)}
                      className="p-3 rounded-xl bg-gray-100 text-gray-400 hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </nav>
                </div>
              )}
            </div>
          )}
        </ActivityCard>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Autonomisation Femmes */}
          <ActivityCard
            title="Autonomisation"
            subtitle="Leadership Féminin"
            description="Accélérez votre trajectoire entrepreneuriale avec nos programmes de mentorat stratégique."
            icon={Users}
            color="from-purple-500 to-pink-600"
            ctaText="Postuler"
            ctaLink="/enrollments"
            ctaState={{ type: 'women_empowerment' }}
          >
            <div className="space-y-4">
              <div className="group/bento relative bg-purple-50 p-6 rounded-2xl border border-purple-100 hover:bg-white hover:shadow-xl transition-all">
                <h4 className="font-black text-lg text-purple-900 mb-2">Femme Leader 2025</h4>
                <p className="text-xs uppercase font-black tracking-widest text-purple-600">Mentorat + Fonds de 2M FCFA</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-2xl border-l-4 border-pink-500">
                <p className="text-xs font-bold text-gray-700 leading-relaxed uppercase tracking-wide">
                  "Grâce à BAY SA WAAR, j'ai lancé mon atelier de transformation de fruits."
                </p>
                <div className="flex items-center gap-2 mt-4">
                  <div className="w-4 h-px bg-pink-500" />
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Fatou, Entrepreneure à Thiès</p>
                </div>
              </div>
            </div>
          </ActivityCard>

          {/* Formalisation */}
          <ActivityCard
            title="Formalisation"
            subtitle="Structure & Légalité"
            description="Passez de l'informel au formel avec notre guide d'accompagnement juridique étape par étape."
            icon={FileText}
            color="from-blue-500 to-cyan-600"
            ctaText="Démarrer le guide"
            ctaLink="/enrollments"
            ctaState={{ type: 'formalization' }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                'Évaluation Activité',
                'Forme Juridique',
                'Guichet Unique',
                'NINEA / RCCM',
                'Fiscalité'
              ].map((step, i) => (
                <div key={i} className="flex items-center gap-3 bg-blue-50 p-3 rounded-xl border border-blue-100">
                  <span className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-xs font-black text-white shrink-0">
                    0{i + 1}
                  </span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-blue-900">{step}</span>
                </div>
              ))}
            </div>
          </ActivityCard>
        </div>
      </section>

      {/* Bandeau FIPA */}
      {/* <section className="bg-gradient-to-r from-yellow-400 to-red-500 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-2">Découvrez FIPA 2025</h3>
          <p className="mb-4">Foire Internationale des Produits Africains – Organisé par Fabira Trading</p>
          <a
            href="https://www.facebook.com/p/FIPA-foire-internationale-des-produits-africains-100083138801669"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-red-600 px-5 py-2 rounded-full font-semibold"
          >
            Visiter FIPA <ExternalLink size={16} />
          </a>
        </div>
      </section> */}
    </motion.div>
  );
};

export default Activities;
