import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Facebook, Instagram, Linkedin, Mail, MapPin, Youtube } from 'lucide-react';
import { contactsAPI } from '../services/api';
import Swal from 'sweetalert2';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      Swal.fire({
        icon: 'warning',
        title: 'Email requis',
        text: 'Veuillez saisir votre adresse email',
        confirmButtonColor: '#dc2626',
      });
      return;
    }

    // Validation basique de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Swal.fire({
        icon: 'warning',
        title: 'Email invalide',
        text: 'Veuillez saisir une adresse email valide',
        confirmButtonColor: '#dc2626',
      });
      return;
    }

    try {
      setIsSubscribing(true);
      await contactsAPI.subscribeNewsletter(email);

      Swal.fire({
        icon: 'success',
        title: 'Inscription réussie !',
        text: 'Vous êtes maintenant abonné à notre newsletter',
        confirmButtonColor: '#16a34a',
      });

      setEmail(''); // Vider le champ après succès
    } catch (error: any) {
      console.error('Erreur lors de l\'inscription à la newsletter:', error);

      let errorMessage = 'Une erreur est survenue lors de l\'inscription';

      if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
        errorMessage = 'La requête a pris trop de temps. Veuillez réessayer.';
      } else if (error.response?.status === 400) {
        errorMessage = 'Cette adresse email est déjà abonnée à notre newsletter';
      } else if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }

      Swal.fire({
        icon: 'error',
        title: 'Erreur d\'inscription',
        text: errorMessage,
        confirmButtonColor: '#dc2626',
      });
    } finally {
      setIsSubscribing(false);
    }
  };

  const socialLinks = [
    { icon: Facebook, href: 'https://www.facebook.com/baysawarr', label: 'Facebook', color: 'hover:bg-blue-600' },
    { icon: Instagram, href: 'https://www.instagram.com/plateforme_bay_sa_war/?fbclid=IwY2xjawMWgrlleHRuA2FlbQIxMABicmlkETFIM0Q1RkpEUlBXYWtkTm1MAR49Io3FB650UIqas5PzCal3eudmDsKiNqHWJxD9tz95S2bpzLjDEOctol4Jqg_aem_vyO-Noh6CZKOFMJkKb7TVA#', label: 'Instagram', color: 'hover:bg-pink-600' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/plateforme-bay-sa-waar-3a899737b/', label: 'LinkedIn', color: 'hover:bg-blue-900' },
    { icon: Youtube, href: 'https://www.youtube.com/@fabiratv2023', label: 'Youtube', color: 'hover:bg-red-600' },
  ];

  const quickLinks = [
    { name: 'À propos', path: '/about' },
    { name: 'Enrôlement', path: '/enrollments' },
    { name: 'Plateformes', path: '/platforms' },
    { name: 'Contact', path: '/contact' },
    { name: 'Blog', path: '/blog' },
  ];

  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-blue-950 to-blue-900">
      {/* Modern Grid Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-500/20 to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Newsletter Bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 mb-12 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
          <div className="mb-4 md:mb-0 text-center md:text-left w-full md:w-auto">
            <h3 className="text-white font-medium">Restez informé</h3>
            <p className="text-gray-400 text-sm">Inscrivez-vous à notre newsletter</p>
          </div>
          <form onSubmit={handleNewsletterSubmit} className="flex flex-col md:flex-row w-full md:w-auto gap-2">
            <input
              type="email"
              placeholder="Votre email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubscribing}
              className="w-full md:w-64 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-green-400 disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <button
              type="submit"
              disabled={isSubscribing}
              className="px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-400 transition-colors w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isSubscribing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Inscription...</span>
                </>
              ) : (
                <span>S'inscrire</span>
              )}
            </button>
          </form>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center justify-center sm:justify-start space-x-3 mb-4">
              <img
                src="https://res.cloudinary.com/drxouwbms/image/upload/v1755777328/369470771_801733008414799_8805271754561376909_n_c4laj2.jpg"
                alt="BAY SA WARR Logo"
                className="w-10 h-10 rounded-xl object-cover bg-gradient-to-br from-green-400 to-green-600"
              />
              <div>
                <h3 className="text-white font-bold text-center sm:text-left">BAY SA WARR</h3>
                <p className="text-green-400 text-sm text-center sm:text-left">Valoriser la création locale</p>
              </div>
            </div>
            <div className="flex space-x-3 justify-center sm:justify-start">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className={`w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center ${social.color} transition-all duration-300 hover:scale-110`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.icon size={16} className="text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center sm:text-left">
            <h4 className="text-white font-medium mb-4">Liens Rapides</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-white text-sm transition-colors flex items-center group"
                  >
                    <span className="mr-2 opacity-0 group-hover:opacity-100 transition-all">→</span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="text-center sm:text-left">
            <h4 className="text-white font-medium mb-4">Contact</h4>
            <div className="space-y-2">
              <a href="mailto:contact@baysawaar.com" className="text-gray-400 hover:text-white text-sm transition-colors flex items-center space-x-2">
                <Mail size={14} className="text-green-400" />
                <span>fabirabsw@gmail.com</span>
              </a>
              <p className="text-gray-400 text-sm flex items-center space-x-2">
                <MapPin size={14} className="text-green-400" />
                <span>Ouakam cité avion, Dakar, Senegal</span>
              </p>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-6 border-t border-white/10 text-center md:text-left">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} BAY SA WAAR
          </p>

        </div>
      </div>
    </footer>
  );
};

export default Footer;