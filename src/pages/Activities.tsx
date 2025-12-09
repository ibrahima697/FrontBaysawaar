import { motion } from 'framer-motion';
import { BookOpen, Users, FileText, Calendar, MapPin, ExternalLink } from 'lucide-react';
import ActivityCard from '../components/ActivityCard';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { formationsAPI } from '../services/api';
import Swal from 'sweetalert2';

// === INTERFACES ===
interface Registration {
  _id: string;
  userId: string;
  status: 'pending' | 'approved' | 'rejected';
  registeredAt: string;
}

export interface User {
  _id: string;
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'member' | 'admin';
  phone?: string;
}

interface Formation {
  _id: string;
  title: string;
  date: string;
  location: string;
  maxSeats: number;
  enrolledUsers: string[];
  priceNonMember?: number;
  registrations?: Registration[]; // ← AJOUTÉ
}

const Activities = () => {
  const { user, token } = useAuth() as { user: User | null; token: string | null };
  const [formations, setFormations] = useState<Formation[]>([]);
  const [loading, setLoading] = useState(true);
  const [registeredFormationIds, setRegisteredFormationIds] = useState<Set<string>>(new Set());
  const [approvedFormationIds, setApprovedFormationIds] = useState<Set<string>>(new Set());
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

      allFormations.forEach(f => {
        const userReg = f.registrations?.find(r => r.userId === userId);
        if (userReg) {
          registered.add(f._id);
          if (userReg.status === 'approved') {
            approved.add(f._id);
          }
        }
      });

      setRegisteredFormationIds(registered);
      setApprovedFormationIds(approved);
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
    await axios.post(
      `http://localhost:5005/api/formations/${formationId}/register`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    // Recharge les formations
    const res = await axios.get('http://localhost:5005/api/formations');
    setFormations(res.data.formations || []);

    // Recalcule les Sets
    const userId = user!._id;
    const registered = new Set<string>();
    const approved = new Set<string>();

    res.data.formations.forEach((f: any) => {
      f.registrations?.forEach((r: any) => {
        if (r.userId.toString() === userId) {
          registered.add(f._id);
          if (r.status === 'approved') approved.add(f._id);
        }
      });
    });

    setRegisteredFormationIds(registered);
    setApprovedFormationIds(approved);

    Swal.fire('Succès', 'Inscription envoyée !', 'success');
  } catch (err: any) {
    Swal.fire('Erreur', err.response?.data?.message || 'Problème', 'error');
  }
};


  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Hero */}
      <section className="relative pt-20 pb-16 bg-cover bg-center" style={{ backgroundImage: 'ur[](https://res.cloudinary.com/drxouwbms/image/upload/v1755949759/Screenshot_2025-08-23_at_11_41_05_1_-Picsart-AiImageEnhancer_kfsp1y.png)' }}>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <motion.h1 initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-4xl md:text-6xl font-bold text-white mb-6">
            Nos <span className="text-orange-400">Activités Sociales</span>
          </motion.h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Formations gratuites, autonomisation des femmes, formalisation des entreprises — tout pour votre réussite.
          </p>
        </div>
      </section>

      {/* Sections */}
      <section className="py-16 px-4 max-w-7xl mx-auto space-y-16">
        {/* Formations */}
        <ActivityCard
          title="Formations Gratuites"
          subtitle="Pour tous les membres BAY SA WAAR"
          description="Transformation des céréales locales, fruits et légumes, entrepreneuriat — gratuit pour les membres."
          icon={BookOpen}
          color="from-green-500 to-emerald-600"
          ctaText={token ? "Voir mes formations" : "Devenir membre"}
          ctaLink={token ? "/dashboard" : "/enrollments"}
        >
          {loading ? (
            <p className="text-white/80">Chargement...</p>
          ) : formations.length === 0 ? (
            <p className="text-white/80">Aucune formation prévue pour le moment.</p>
          ) : (
            <div className="space-y-4">
              {formations.map(formation => (
                <div key={formation._id} className="bg-white/20 backdrop-blur-sm p-4 rounded-xl">
                  <h4 className="font-bold text-lg">{formation.title}</h4>
                  <div className="flex flex-wrap gap-3 text-sm mt-2">
                    <span className="flex items-center gap-1">
                      <Calendar size={14} /> {new Date(formation.date).toLocaleDateString('fr-FR')}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin size={14} /> {formation.location}
                    </span>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-sm">
                      Places restantes : {formation.maxSeats - formation.enrolledUsers.length}
                    </span>
             {user?.role !== 'admin' && (
              <>
                {approvedFormationIds.has(formation._id) ? (
                  <span className="px-4 py-2 bg-green-600 text-white rounded-full font-bold text-sm">
                    Inscription approuvée
                  </span>
                ) : registeredFormationIds.has(formation._id) ? (
                  <span className="px-4 py-2 bg-yellow-500 text-white rounded-full font-bold text-sm">
                    En attente d’approbation
                  </span>
                ) : (
                  <button
                    onClick={() => handleRegister(formation._id)}
                    className="px-6 py-3 bg-white text-green-600 font-bold rounded-full hover:bg-green-50 transition shadow-md"
                  >
                    S’inscrire
                  </button>
                )}
              </>
            )}
          </div>
                </div>
              ))}
            </div>
          )}
        </ActivityCard>

        {/* Autonomisation Femmes */}
        <ActivityCard
          title="Autonomisation des Femmes"
          subtitle="Programmes dédiés à l'entrepreneuriat féminin"
          description="Ateliers, mentorat, financement — #MadeInSénégal pour les femmes leaders de demain."
          icon={Users}
          color="from-purple-500 to-pink-600"
          ctaText="Rejoindre le programme"
          ctaLink="/enrollments"
        >
          <div className="space-y-4">
            <div className="bg-white/20 p-4 rounded-xl">
              <h4 className="font-bold">Programme "Femme Leader 2025"</h4>
              <p className="text-sm mt-1">6 mois de mentorat + fonds de démarrage jusqu'à 2M FCFA</p>
            </div>
            <div className="bg-white/20 p-4 rounded-xl">
              <p className="italic">"Grâce à BAY SA WAAR, j'ai lancé mon atelier de transformation de fruits."</p>
              <p className="text-xs mt-1">— Fatou, Thiès</p>
            </div>
          </div>
        </ActivityCard>

        {/* Formalisation */}
        <ActivityCard
          title="Formalisation des Entreprises"
          subtitle="Passez de l'informel au formel"
          description="Guide gratuit, accompagnement pas à pas, partenariats APIX/ANPEJ."
          icon={FileText}
          color="from-blue-500 to-cyan-600"
          ctaText="Demander un accompagnement"
          ctaLink="/enrollments"
        >
          <ol className="space-y-2 text-sm">
            {[
              'Évaluation gratuite de votre activité',
              'Choix de la forme juridique',
              'Dépôt au guichet unique',
              'Obtention NINEA/RCCM',
              'Ouverture compte + fiscalité'
            ].map((step, i) => (
              <li key={i} className="flex items-center gap-2">
                <span className="w-6 h-6 bg-white/30 rounded-full flex items-center justify-center text-xs font-bold">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </ActivityCard>
      </section>

      {/* Bandeau FIPA */}
      <section className="bg-gradient-to-r from-yellow-400 to-red-500 text-white py-8">
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
      </section>
    </motion.div>
  );
};

export default Activities;
