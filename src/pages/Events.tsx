// src/pages/Events.tsx
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, ArrowRight, Crown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import Swal from 'sweetalert2';

interface Event {
  _id: string;
  slug: string;
  title: string;
  shortDescription: string;
  image: string;
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
      showConfirmButton: false
    });
  } catch (err: any) {
    const message = err.response?.data?.message || 'Erreur inconnue';

    if (message.includes('déjà inscrit')) {
      Swal.fire('Déjà inscrit', message, 'info');
      const { data } = await axios.get('http://localhost:5005/api/events');
      setEvents(data.events);
    } else {
      Swal.fire('Erreur', message, 'error');
    }
  }
};
  const formatPrice = (price: number) => price === 0 ? 'Gratuit' : `${price.toLocaleString()} FCFA`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white pt-20">
      {/* Hero FIPA */}
      {events.find(e => e.isFeatured) && (
        <section className="relative h-96 bg-cover bg-center" style={{ backgroundImage: 'ur[](https://res.cloudinary.com/drxouwbms/image/upload/v1730123456/fipa2025-banner.jpg)' }}>
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
          <div className="relative max-w-7xl mx-auto px-6 h-full flex items-center">
            <div className="text-white max-w-3xl">
              <h1 className="text-5xl md:text-7xl font-bold mb-4">
                FIPA 2025 <Crown className="inline text-yellow-400" />
              </h1>
              <p className="text-xl md:text-2xl mb-8">Foire Internationale des Produits Africains</p>
              <a href="/fipa-2025" className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-4 px-8 rounded-full text-lg inline-flex items-center gap-3">
                Réserver ma place maintenant <ArrowRight />
              </a>
            </div>
          </div>
        </section>
      )}

      {/* Liste événements */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">Nos Prochains Événements</h2>

        {loading ? (
          <p className="text-center">Chargement...</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map(event => (
              <motion.div
                key={event._id}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden"
              >
                <img src={event.image} alt={event.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <span className="text-xs uppercase tracking-wider text-orange-600 font-bold">
                    {event.type.replace('_', ' ')}
                  </span>
                  <h3 className="text-2xl font-bold mt-2">{event.title}</h3>
                  <p className="text-gray-600 mt-3">{event.shortDescription}</p>

                  <div className="mt-6 space-y-3">
                    <p className="flex items-center gap-2 text-sm">
                      <Calendar className="w-5 text-orange-600" />
                      {new Date(event.dateStart).toLocaleDateString('fr-FR')} → {new Date(event.dateEnd).toLocaleDateString('fr-FR')}
                    </p>
                    <p className="flex items-center gap-2 text-sm">
                      <MapPin className="w-5 text-orange-600" />
                      {event.location}
                    </p>
                    <p className="flex items-center gap-2 text-sm">
                      <Users className="w-5 text-orange-600" />
                      {event.registrations.length} / {event.maxParticipants} participants
                    </p>
                  </div>

                  <div className="mt-6 flex items-center justify-between">
{/*                     <div>
                      <p className="text-sm text-gray-500">Membre</p>
                      <p className="text-xl font-bold">{formatPrice(event.priceMember)}</p>
                    </div> */}
        {/* BOUTON D'INSCRIPTION CORRIGÉ */}
                     {user ? (
                      // Vérifie si l'utilisateur est déjà inscrit (gère ObjectId ou objet)
                      event.registrations.some(reg => {
                        if (!reg.user) return false;
                        const registeredUserId = typeof reg.user === 'string' 
                          ? reg.user 
                          : reg.user._id?.toString() || reg.user.toString();
                        return registeredUserId === user._id;
                      }) ? (
                        <button disabled className="bg-green-600 text-white px-6 py-3 rounded-full font-bold flex items-center gap-2">
                          Inscrit
                        </button>
                      ) : event.registrations.filter(reg => 
                          reg.user && reg.status === 'approved'
                        ).length >= event.maxParticipants ? (
                        <button disabled className="bg-red-600 text-white px-6 py-3 rounded-full font-bold">
                          Complet
                        </button>
                      ) : (
                        <button
                          onClick={() => handleRegister(event.slug)}
                          className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-full font-bold transition"
                        >
                          S’inscrire gratuitement
                        </button>
                      )
                    ) : (
                      <a href="/login" className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-full font-bold">
                        Connexion requise
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Events;
