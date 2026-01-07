import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, AlertCircle, Loader2, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Contact = () => {
  const [activeTab, setActiveTab] = useState('information');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
    category: 'information'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');


  const contactInfo = [
    {
      icon: MapPin,
      title: 'Siège Social',
      details: ['Ouakam cité avion, Dakar, Senegal'],
      color: 'bg-green-100 text-green-600'
    },
    {
      icon: Phone,
      title: 'Numéros de Téléphone',
      details: ['+221 78 634 95 73'],
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: Mail,
      title: 'Adresses Email',
      details: ['fabirabsw@gmail.com'],
      color: 'bg-purple-100 text-purple-600'
    },
    {
      icon: Clock,
      title: 'Heures d\'Ouverture',
      details: ['Lundi - Vendredi: 8h00 - 18h00', 'Samedi: 9h00 - 16h00'],
      color: 'bg-orange-100 text-orange-600'
    }
  ];

  const contactCategories = [
    {
      id: 'information',
      title: 'Informations',
      description: 'Questions générales'
    },
    {
      id: 'partnership',
      title: 'Partenariat',
      description: 'Collaborations'
    },
    {
      id: 'support',
      title: 'Support',
      description: 'Aide technique'
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitStatus('success');
      setFormData({
        name: '', email: '', phone: '', company: '', subject: '', message: '', category: activeTab
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-50"
    >
      {/* Hero Section */}
      <section className="relative h-[400px] bg-cover bg-center bg-no-repeat bg-fixed" style={{ backgroundImage: 'url(https://res.cloudinary.com/drxouwbms/image/upload/v1755949759/Screenshot_2025-08-23_at_11_41_05_1_-Picsart-AiImageEnhancer_kfsp1y.png)' }}>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/40 backdrop-blur-[2px]"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-4 max-w-4xl mx-auto">
            <motion.h1
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold text-white mb-6"
            >
              Contactez <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">Nous</span>
            </motion.h1>
            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-xl text-gray-200 font-light"
            >
              Une question ? Un projet ? Notre équipe est là pour vous accompagner.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Main Content - Split Layout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10 pb-20">
        <div className="grid lg:grid-cols-5 gap-8">

          {/* Left Column: Contact Info */}
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Info Cards */}
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Nos Coordonnées</h2>
              <div className="space-y-8">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start gap-4 group">
                    <div className={`w-12 h-12 ${info.color} rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                      <info.icon size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">{info.title}</h3>
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="text-gray-600 text-sm leading-relaxed">{detail}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Media */}
              <div className="mt-10 pt-8 border-t border-gray-100">
                <h3 className="font-bold text-gray-900 mb-4">Suivez-nous</h3>
                <div className="flex gap-4">
                  {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
                    <a key={i} href="#" className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-500 hover:bg-green-500 hover:text-white transition-all duration-300">
                      <Icon size={20} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* FAQ Quick Access */}
            <div className="bg-gradient-to-br from-green-600 via-green-500 to-emerald-400 rounded-3xl shadow-xl overflow-hidden border border-green-400/20 relative group">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAzMHYySDI0di0yaDEyek0zNiAyNnYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-50"></div>
              <div className="relative p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-white text-lg">Questions Fréquentes</h3>
                </div>

                <div className="space-y-2">
                  {[
                    { q: "Comment devenir membre ?", a: "Remplissez le formulaire d'adhésion sur notre site." },
                    { q: "Quels sont vos délais de réponse ?", a: "Nous répondons sous 24-48h ouvrables." },
                    { q: "Proposez-vous des formations ?", a: "Oui, consultez notre page Formations." }
                  ].map((faq, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + idx * 0.1 }}
                      className="bg-white/10 backdrop-blur-sm rounded-xl p-3 hover:bg-white/20 transition-all cursor-pointer group/faq"
                    >
                      <p className="text-white/90 text-sm font-medium flex items-center gap-2">
                        <span className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center text-xs font-bold">{idx + 1}</span>
                        {faq.q}
                      </p>
                      <p className="text-white/60 text-xs mt-1 pl-7 group-hover/faq:text-white/80 transition-colors">{faq.a}</p>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-4 pt-3 border-t border-white/10">
                  <p className="text-white/70 text-xs text-center">
                    💡 Plus de questions ? Écrivez-nous !
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Form */}
          <motion.div
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-3"
          >
            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100 h-full">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Envoyez-nous un message</h2>
                <p className="text-gray-600">Nous vous répondrons dans les plus brefs délais.</p>
              </div>

              {/* Category Selection */}
              <div className="grid grid-cols-3 gap-3 mb-8">
                {contactCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => {
                      setActiveTab(category.id);
                      setFormData(prev => ({ ...prev, category: category.id }));
                    }}
                    className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all duration-200 ${activeTab === category.id
                      ? 'bg-green-50 border-green-500 text-green-700 shadow-sm'
                      : 'bg-white border-gray-200 text-gray-600 hover:border-green-200 hover:bg-gray-50'
                      }`}
                  >
                    <span className="font-bold text-sm mb-1">{category.title}</span>
                    <span className="text-xs opacity-80 hidden sm:block">{category.description}</span>
                  </button>
                ))}
              </div>

              {submitStatus && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mb-6 p-4 rounded-xl flex items-center gap-3 ${submitStatus === 'success' ? 'bg-green-50 text-green-800 border border-green-100' : 'bg-red-50 text-red-800 border border-red-100'
                    }`}
                >
                  {submitStatus === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                  <p className="text-sm font-medium">
                    {submitStatus === 'success'
                      ? 'Message envoyé avec succès ! Nous vous recontacterons bientôt.'
                      : 'Une erreur est survenue. Veuillez réessayer.'}
                  </p>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Nom Complet</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all outline-none bg-gray-50 focus:bg-white"
                      placeholder="Votre nom"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all outline-none bg-gray-50 focus:bg-white"
                      placeholder="votre@email.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Téléphone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all outline-none bg-gray-50 focus:bg-white"
                      placeholder="+221 ..."
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Entreprise</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all outline-none bg-gray-50 focus:bg-white"
                      placeholder="Nom de votre société"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Sujet</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all outline-none bg-gray-50 focus:bg-white"
                    placeholder="L'objet de votre message"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all outline-none bg-gray-50 focus:bg-white resize-none"
                    placeholder="Comment pouvons-nous vous aider ?"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-green-500/30 hover:shadow-green-500/50 transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      <span>Envoi en cours...</span>
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      <span>Envoyer le Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Full Width Map Section */}
      <section className="h-[400px] w-full bg-gray-200 relative">
        <iframe
          title="BAY SA WARR Localisation Full"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3858.893964479836!2d-17.48489382492419!3d14.74085778579259!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xec172e2e2b1b6b1%3A0x6e2e1b2e1b2e1b2e!2sOuakam%20Cit%C3%A9%20Avion%2C%20Dakar%2C%20S%C3%A9n%C3%A9gal!5e0!3m2!1sfr!2ssn!4v1718030000000!5m2!1sfr!2ssn"
          width="100%"
          height="100%"
          style={{ border: 0, filter: 'grayscale(0.2)' }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
        <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-gray-50 to-transparent pointer-events-none"></div>
      </section>
    </motion.div>
  );
};

export default Contact;