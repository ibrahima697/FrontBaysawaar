// ...existing code...
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, User, Mail, Phone, MapPin, Globe, Building2, CheckCircle, Info, ArrowRight, ShieldCheck, HeartPulse, GraduationCap, Briefcase, X } from 'lucide-react';
import { enrollmentsAPI } from '../services/api';
import Swal from 'sweetalert2';
import ImageUpload from '../components/ImageUpload';
import { useLocation } from 'react-router-dom';

interface EnrollmentForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  companyName: string;
  interests: string[];
}

const Enrollments: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');
  const [submitMessage, setSubmitMessage] = useState('');

  const [formData, setFormData] = useState<EnrollmentForm>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    city: '',
    companyName: '',
    interests: [],
  });

  const [companyLogoFiles, setCompanyLogoFiles] = useState<File[]>([]);

  const [showCGU, setShowCGU] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  const location = useLocation();
  const formationId = (location.state as { formationId?: string } | undefined)?.formationId;
  const formType = (location.state as { type?: string } | undefined)?.type || 'formation';

  useEffect(() => {
    if (formationId) {
      Swal.fire({
        icon: 'info',
        title: 'Devenir Membre',
        text: 'Inscrivez-vous pour accéder gratuitement à cette formation !',
      });
    }
  }, [formationId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type } = target;
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        interests: target.checked
          ? [...prev.interests, value]
          : prev.interests.filter(interest => interest !== value)
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const showSuccessNotification = (message: string) => {
    Swal.fire({
      icon: 'success',
      title: 'Succès !',
      text: message,
      confirmButtonColor: '#059669',
      timer: 5000,
      timerProgressBar: true,
    });
  };

  const showErrorNotification = (message: string) => {
    Swal.fire({
      icon: 'error',
      title: 'Erreur !',
      text: message,
      confirmButtonColor: '#dc2626',
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const requiredFields: (keyof EnrollmentForm)[] = ['firstName', 'lastName', 'email', 'phone', 'country', 'city'];
    const missingFields = requiredFields.filter(field => {
      const val = formData[field];
      return typeof val === 'string' ? val.trim() === '' : !val;
    });

    if (missingFields.length > 0) {
      showErrorNotification('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    setIsSubmitting(true);

    try {
      const enrollmentData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        country: formData.country,
        city: formData.city,
        companyName: formData.companyName,
        interests: formData.interests,
        courseId: formationId || '',
        userId: '',
        status: 'pending',
        companyLogo: companyLogoFiles[0],
        formType: formType // Send form type to backend if needed
      };

      const response = await enrollmentsAPI.submitEnrollment(enrollmentData);
      const successMsg = response.data?.message || 'Inscription réussie !';
      setSubmitStatus('success');
      setSubmitMessage(successMsg);

      showSuccessNotification('Votre inscription a été soumise avec succès.');

      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        country: '',
        city: '',
        companyName: '',
        interests: [],
      });
      setCompanyLogoFiles([]);

    } catch (error: any) {
      const errMsg = error?.response?.data?.error || error?.message || 'Erreur lors de la soumission';
      setSubmitStatus('error');
      setSubmitMessage(errMsg);
      showErrorNotification(errMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputBase = 'w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white/80 shadow-sm transition-all';
  const labelBase = 'block text-sm font-semibold text-gray-700 mb-2';

  const getTitle = () => {
    switch (formType) {
      case 'women_empowerment': return "Programme Autonomisation des Femmes";
      case 'formalization': return "Accompagnement Formalisation";
      default: return "Devenez Membre BAY SA WAAR";
    }
  };

  const getDescription = () => {
    switch (formType) {
      case 'women_empowerment': return "Rejoignez notre programme dédié aux femmes leaders. Bénéficiez de mentorat et de financement.";
      case 'formalization': return "Faites passer votre entreprise au niveau supérieur. Nous vous accompagnons dans toutes les démarches.";
      default: return "Rejoignez-nous pour accéder à nos formations gratuites, programmes d'autonomisation et services Fabira Trading.";
    }
  };

  const PolicyModal = ({ isOpen, onClose, title, content }: { isOpen: boolean; onClose: () => void; title: string; content: React.ReactNode }) => (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="bg-white w-full max-w-4xl h-[80vh] rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-6 md:p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">{title}</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white rounded-full transition-colors border border-transparent hover:border-gray-200"
              >
                <X size={24} className="text-gray-500" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 md:p-10 text-gray-600 space-y-8 scrollbar-hide">
              {content}
            </div>
            <div className="p-6 md:p-8 border-t border-gray-100 bg-gray-50/50 flex justify-end">
              <button
                onClick={onClose}
                className="px-8 py-3 bg-gray-900 text-white rounded-xl font-bold uppercase tracking-wider text-sm hover:bg-black transition-all"
              >
                Fermer
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  const cguContent = (
    <div className="prose prose-green max-w-none">
      <section>
        <h3 className="text-xl font-bold text-gray-900 mb-4">1. Objet</h3>
        <p>Les présentes Conditions Générales d'Utilisation (CGU) régissent l'utilisation de la plateforme MLC (Mata Logistique et Conciergerie), accessible à l'adresse mataconciergerie.com, ci-après dénommée "la Plateforme".</p>
        <p>La Plateforme est un service de mise en relation entre des prestataires de services et des clients au Sénégal. En accédant à la Plateforme, vous acceptez sans réserve les présentes CGU.</p>
      </section>

      <section>
        <h3 className="text-xl font-bold text-gray-900 mb-4">2. Définitions</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Utilisateur :</strong> toute personne physique ou morale utilisant la Plateforme</li>
          <li><strong>Client :</strong> utilisateur recherchant un service</li>
          <li><strong>Prestataire :</strong> utilisateur proposant des services sur la Plateforme</li>
          <li><strong>Service :</strong> prestation proposée par un Prestataire</li>
          <li><strong>Compte :</strong> espace personnel sécurisé de l'Utilisateur</li>
        </ul>
      </section>

      <section>
        <h3 className="text-xl font-bold text-gray-900 mb-4">3. Inscription et Compte Utilisateur</h3>
        <p>L'inscription sur la Plateforme est gratuite et ouverte à toute personne majeure résidant au Sénégal ou ayant la capacité juridique de contracter.</p>
        <p>L'Utilisateur s'engage à fournir des informations exactes et à les maintenir à jour. Il est responsable de la confidentialité de ses identifiants de connexion.</p>
      </section>

      <section>
        <h3 className="text-xl font-bold text-gray-900 mb-4">4. Services Proposés</h3>
        <p>La Plateforme permet :</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>La recherche et consultation de services</li>
          <li>La mise en relation entre Clients et Prestataires</li>
          <li>La gestion des demandes et réservations</li>
          <li>L'évaluation et notation des services</li>
          <li>La messagerie entre utilisateurs</li>
        </ul>
      </section>

      <section>
        <h3 className="text-xl font-bold text-gray-900 mb-4">5. Responsabilités</h3>
        <p>MLC agit uniquement en qualité d'intermédiaire entre les Clients et les Prestataires. La Plateforme n'est pas partie aux contrats conclus entre les Utilisateurs.</p>
        <p>Les Prestataires sont seuls responsables de la qualité et de la conformité de leurs services aux normes et réglementations en vigueur au Sénégal.</p>
      </section>

      <section>
        <h3 className="text-xl font-bold text-gray-900 mb-4">6. Propriété Intellectuelle</h3>
        <p>L'ensemble des éléments de la Plateforme (textes, images, logos, logiciels) sont protégés par le droit d'auteur et restent la propriété exclusive de MLC ou de ses partenaires.</p>
      </section>

      <section>
        <h3 className="text-xl font-bold text-gray-900 mb-4">7. Protection des Données</h3>
        <p>Conformément à la loi sénégalaise n°2008-12 du 25 janvier 2008 relative à la protection des données à caractère personnel, les données collectées sont traitées de manière sécurisée et confidentielle.</p>
      </section>

      <section>
        <h3 className="text-xl font-bold text-gray-900 mb-4">8. Modification des CGU</h3>
        <p>MLC se réserve le droit de modifier les présentes CGU à tout moment. Les Utilisateurs seront informés de toute modification substantielle.</p>
      </section>

      <section>
        <h3 className="text-xl font-bold text-gray-900 mb-4">9. Droit Applicable et Juridiction</h3>
        <p>Les présentes CGU sont régies par le droit sénégalais. En cas de litige, les tribunaux de Dakar seront seuls compétents.</p>
      </section>

      <div className="mt-12 pt-8 border-t border-gray-100 text-sm text-gray-400 italic">
        Dernière mise à jour : Janvier 2025 | Version : 1.0
      </div>
    </div>
  );

  const privacyContent = (
    <div className="prose prose-green max-w-none">
      <p className="italic text-gray-500 mb-8">Conforme à la loi sénégalaise n°2008-12 du 25 janvier 2008 relative à la protection des données à caractère personnel, supervisée par la CDP Sénégal.</p>

      <section>
        <h3 className="text-xl font-bold text-gray-900 mb-4">1. Responsable du Traitement</h3>
        <p>La société MLC (Mata Logistique et Conciergerie), située à Dakar, Sénégal, est responsable du traitement des données personnelles collectées sur la Plateforme.</p>
        <p><strong>Contact :</strong> contact@mataconciergerie.sn</p>
      </section>

      <section>
        <h3 className="text-xl font-bold text-gray-900 mb-4">2. Données Collectées</h3>
        <p>Nous collectons les données suivantes :</p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Données d'identification :</strong> nom, prénom, adresse email, numéro de téléphone</li>
          <li><strong>Données professionnelles :</strong> pour les Prestataires : nom de société, NINEA, adresse professionnelle</li>
          <li><strong>Données de connexion :</strong> adresse IP, type de navigateur, pages consultées</li>
          <li><strong>Données de localisation :</strong> adresse, zone géographique de service</li>
        </ul>
      </section>

      <section>
        <h3 className="text-xl font-bold text-gray-900 mb-4">3. Finalités du Traitement</h3>
        <p>Vos données sont utilisées pour :</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>La création et gestion de votre compte utilisateur</li>
          <li>La mise en relation entre Clients et Prestataires</li>
          <li>La gestion des demandes et réservations</li>
          <li>L'amélioration de nos services</li>
          <li>La communication relative à vos services (notifications, emails)</li>
          <li>Le respect de nos obligations légales</li>
        </ul>
      </section>

      <section>
        <h3 className="text-xl font-bold text-gray-900 mb-4">4. Base Légale du Traitement</h3>
        <p>Le traitement de vos données repose sur :</p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Votre consentement :</strong> que vous pouvez retirer à tout moment</li>
          <li><strong>L'exécution du contrat :</strong> pour fournir les services demandés</li>
          <li><strong>Nos obligations légales :</strong> conformité fiscale, lutte contre la fraude</li>
          <li><strong>Notre intérêt légitime :</strong> amélioration des services, sécurité</li>
        </ul>
      </section>

      <section>
        <h3 className="text-xl font-bold text-gray-900 mb-4">5. Cookies et Technologies Similaires</h3>
        <p>Nous utilisons différents types de cookies :</p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Cookies essentiels :</strong> nécessaires au fonctionnement de la Plateforme (authentification, session)</li>
          <li><strong>Cookies analytiques :</strong> pour mesurer l'audience et améliorer nos services (avec votre consentement)</li>
        </ul>
      </section>

      <section>
        <h3 className="text-xl font-bold text-gray-900 mb-4">6. Durée de Conservation</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Données de compte :</strong> pendant la durée de votre inscription + 3 ans</li>
          <li><strong>Données de transaction :</strong> 10 ans (obligation comptable)</li>
          <li><strong>Cookies :</strong> 13 mois maximum</li>
        </ul>
      </section>

      <section>
        <h3 className="text-xl font-bold text-gray-900 mb-4">7. Vos Droits</h3>
        <p>Conformément à la loi n°2008-12, vous disposez des droits suivants :</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Droit d'accès, rectification, opposition, effacement, limitation et portabilité.</li>
        </ul>
        <p className="mt-4">Pour exercer ces droits, contactez-nous à : <strong>contact@mataconciergerie.sn</strong></p>
      </section>

      <section>
        <h3 className="text-xl font-bold text-gray-900 mb-4">8. Sécurité des Données</h3>
        <p>Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles appropriées pour protéger vos données contre tout accès non autorisé.</p>
      </section>

      <section>
        <h3 className="text-xl font-bold text-gray-900 mb-4">9. Réclamation</h3>
        <p>Vous pouvez introduire une réclamation auprès de la Commission de Protection des Données Personnelles (CDP) du Sénégal.</p>
      </section>

      <div className="mt-12 pt-8 border-t border-gray-100 text-sm text-gray-400 italic">
        Dernière mise à jour : Janvier 2025 | Version : 1.0
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-50"
    >
      {/* Hero Section */}
      <section className="relative h-[300px] md:h-[400px] bg-cover bg-center bg-no-repeat bg-fixed" style={{ backgroundImage: 'url(https://res.cloudinary.com/drxouwbms/image/upload/v1755949759/Screenshot_2025-08-23_at_11_41_05_1_-Picsart-AiImageEnhancer_kfsp1y.png)' }}>
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black/40 backdrop-blur-[2px]"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-4 max-w-4xl mx-auto">
            <motion.h1
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 leading-tight "
            >
              {formType === 'women_empowerment' ? (
                <>Autonomisation des <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">Femmes</span></>
              ) : formType === 'formalization' ? (
                <>Accompagnement <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Formalisation</span></>
              ) : (
                <>Rejoignez <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">BAY SA WAAR</span></>
              )}
            </motion.h1>
            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-base md:text-lg text-gray-200 font-light max-w-2xl mx-auto"
            >
              {getDescription()}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 md:-mt-24 relative z-10 pb-20">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white rounded-[2.5rem] shadow-2xl shadow-gray-200/50 overflow-hidden border border-gray-100"
        >
          <div className="p-6 md:p-12">
            <AnimatePresence mode="wait">
              {submitStatus && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className={`p-5 rounded-2xl mb-10 flex items-center gap-4 ${submitStatus === 'success' ? 'bg-green-50 text-green-800 border border-green-100' : 'bg-red-50 text-red-800 border border-red-100'
                    }`}
                >
                  {submitStatus === 'success' ? <CheckCircle size={24} className="flex-shrink-0" /> : <Info size={24} className="flex-shrink-0" />}
                  <p className="font-semibold">{submitMessage}</p>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-10">
              {/* Sections Header */}
              <div className="flex items-center gap-4 mb-2">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center text-green-600">
                  <User size={20} />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Informations Personnelles</h2>
              </div>

              {/* Personal Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <div className="space-y-2">
                  <label className={labelBase}>Prénom *</label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-500 transition-colors" size={18} />
                    <input name="firstName" value={formData.firstName} onChange={handleInputChange} className={`${inputBase} pl-12`} placeholder="Ex: Jean" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className={labelBase}>Nom *</label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-500 transition-colors" size={18} />
                    <input name="lastName" value={formData.lastName} onChange={handleInputChange} className={`${inputBase} pl-12`} placeholder="Ex: Ndiaye" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className={labelBase}>Email de contact *</label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-500 transition-colors" size={18} />
                    <input name="email" type="email" value={formData.email} onChange={handleInputChange} className={`${inputBase} pl-12`} placeholder="votre@email.com" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className={labelBase}>Numéro de téléphone *</label>
                  <div className="relative group">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-500 transition-colors" size={18} />
                    <input name="phone" type="tel" value={formData.phone} onChange={handleInputChange} className={`${inputBase} pl-12`} placeholder="+221 ..." required />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className={labelBase}>Pays de résidence *</label>
                  <div className="relative group">
                    <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-500 transition-colors" size={18} />
                    <input name="country" value={formData.country} onChange={handleInputChange} className={`${inputBase} pl-12`} placeholder="Sénégal" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className={labelBase}>Ville *</label>
                  <div className="relative group">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-500 transition-colors" size={18} />
                    <input name="city" value={formData.city} onChange={handleInputChange} className={`${inputBase} pl-12`} placeholder="Dakar" required />
                  </div>
                </div>
              </div>

              {/* Dynamic Sections */}
              {formType === 'women_empowerment' && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-8 pt-6"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-pink-100 rounded-xl flex items-center justify-center text-pink-600">
                      <HeartPulse size={20} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Détails de votre Projet</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    <div className="space-y-2">
                      <label className={labelBase}>Nom du projet / activité</label>
                      <div className="relative group">
                        <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-pink-500 transition-colors" size={18} />
                        <input name="companyName" value={formData.companyName} onChange={handleInputChange} className={`${inputBase} pl-12`} placeholder="Nom de votre initiative" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className={labelBase}>Secteur d'activité</label>
                      <select className={inputBase}>
                        <option>Agriculture / Transformation</option>
                        <option>Commerce</option>
                        <option>Artisanat</option>
                        <option>Services</option>
                      </select>
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <label className={labelBase}>Description de votre vision</label>
                      <textarea className={`${inputBase} resize-none`} rows={4} placeholder="Parlez-nous de vos objectifs et de la manière dont nous pouvons vous aider..."></textarea>
                    </div>
                  </div>
                </motion.div>
              )}

              {formType === 'formalization' && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-8 pt-6"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                      <ShieldCheck size={20} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Informations Entreprise</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    <div className="space-y-2">
                      <label className={labelBase}>Nom de l'entreprise (si existant)</label>
                      <div className="relative group">
                        <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                        <input name="companyName" value={formData.companyName} onChange={handleInputChange} className={`${inputBase} pl-12`} placeholder="Votre structure" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className={labelBase}>Statut juridique actuel</label>
                      <select className={inputBase}>
                        <option>Informel</option>
                        <option>GIE</option>
                        <option>Entreprise Individuelle</option>
                        <option>SARL</option>
                      </select>
                    </div>
                    <div className="md:col-span-2 space-y-4 pt-2">
                      <label className={labelBase}>Besoins spécifiques</label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {['NINEA', 'RCCM', 'Fiscalité', 'Business Plan'].map(item => (
                          <label key={item} className="p-4 rounded-2xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/50 cursor-pointer transition-all flex items-center gap-3">
                            <input type="checkbox" className="h-4 w-4 text-blue-600 rounded-lg focus:ring-blue-500" />
                            <span className="text-sm font-medium text-gray-700">{item}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {formType === 'formation' && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-8 pt-6"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center text-green-600">
                      <GraduationCap size={20} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Intérêts & Documents</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    <div className="space-y-2">
                      <label className={labelBase}>Nom de l'entreprise (optionnel)</label>
                      <div className="relative group">
                        <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-500 transition-colors" size={18} />
                        <input name="companyName" value={formData.companyName} onChange={handleInputChange} className={`${inputBase} pl-12`} placeholder="Ex: Ma Société Sarl" />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <label className={labelBase}>Domaines d'intérêt</label>
                      <div className="grid grid-cols-2 gap-3">
                        {['Formations', 'Autonomisation', 'Formalisation', 'Voyages'].map(interest => (
                          <label key={interest} className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-green-200 transition-all cursor-pointer">
                            <input type="checkbox" name="interests" value={interest.toLowerCase()} checked={formData.interests.includes(interest.toLowerCase())} onChange={handleInputChange} className="h-4 w-4 text-green-600 rounded focus:ring-green-500" />
                            <span className="text-xs font-medium text-gray-700">{interest}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-8 pt-4">
                    <div className="p-6 rounded-[2rem] bg-gray-50/50 border border-gray-200/50 flex flex-col items-center">
                      <div className="w-full max-w-sm">
                        <ImageUpload label="Logo entreprise" name="companyLogo" multiple={false} maxFiles={1} maxSize={5} onFilesChange={setCompanyLogoFiles} required={false} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              <div className="pt-10 border-t border-gray-100">
                <div className="flex items-start md:items-center space-x-3 mb-8">
                  <input type="checkbox" id="terms" required className="mt-1 md:mt-0 h-5 w-5 text-green-600 rounded-lg focus:ring-green-500 transition-all cursor-pointer" />
                  <label htmlFor="terms" className="text-sm text-gray-600 leading-relaxed">
                    J'accepte les{' '}
                    <button
                      type="button"
                      onClick={() => setShowCGU(true)}
                      className="font-bold text-gray-900 border-b-2 border-green-200 hover:border-green-500 transition-all"
                    >
                      conditions d'utilisation
                    </button>
                    {' '}et la{' '}
                    <button
                      type="button"
                      onClick={() => setShowPrivacy(true)}
                      className="font-bold text-gray-900 border-b-2 border-green-200 hover:border-green-500 transition-all"
                    >
                      politique de confidentialité
                    </button>
                  </label>
                </div>

                <div className="flex flex-col items-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full md:w-auto md:min-w-[350px] bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white py-5 px-10 rounded-2xl font-bold flex justify-center items-center transition-all shadow-xl shadow-green-200 hover:shadow-green-300 transform hover:-translate-y-1 active:translate-y-0 disabled:opacity-70 disabled:filter-none"
                  >
                    {isSubmitting ? <Loader2 className="animate-spin mr-3" size={24} /> : <ArrowRight className="mr-3" size={24} />}
                    {isSubmitting ? 'Soumission...' : 'Finaliser mon inscription'}
                  </button>
                  <p className="mt-4 text-sm text-gray-400 flex items-center gap-2">
                    <ShieldCheck size={14} /> Vos données sont protégées
                  </p>
                </div>
              </div>
            </form>
          </div>
        </motion.div>
      </section>
      <PolicyModal
        isOpen={showCGU}
        onClose={() => setShowCGU(false)}
        title="Conditions Générales d'Utilisation"
        content={cguContent}
      />

      <PolicyModal
        isOpen={showPrivacy}
        onClose={() => setShowPrivacy(false)}
        title="Politique de Confidentialité"
        content={privacyContent}
      />
    </motion.div>
  );
};

export default Enrollments;
