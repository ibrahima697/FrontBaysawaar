// ...existing code...
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, User, Mail, Phone, MapPin, Globe, Building2, CheckCircle, Info, ArrowRight, ShieldCheck, HeartPulse, GraduationCap, Briefcase } from 'lucide-react';
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
                <div className="flex items-center space-x-3 mb-8">
                  <input type="checkbox" id="terms" required className="h-5 w-5 text-green-600 rounded-lg focus:ring-green-500 transition-all cursor-pointer" />
                  <label htmlFor="terms" className="text-sm text-gray-600">
                    J'accepte les <a href="#" className="font-bold text-gray-900 border-b-2 border-green-200 hover:border-green-500 transition-all">conditions d'utilisation</a>
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
    </motion.div>
  );
};

export default Enrollments;
