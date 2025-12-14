// ...existing code...
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
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
  const [businessDocumentsFiles, setBusinessDocumentsFiles] = useState<File[]>([]);

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
        businessDocuments: businessDocumentsFiles,
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
      setBusinessDocumentsFiles([]);

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
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
        <div className="bg-green-600 py-8 px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{getTitle()}</h1>
          <p className="text-green-100 text-lg max-w-2xl mx-auto">{getDescription()}</p>
        </div>

        <div className="p-8 md:p-12">
          {submitStatus && (
            <div className={`p-4 rounded-xl mb-8 ${submitStatus === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'
              }`}>
              {submitMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Common Fields - Horizontal Layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className={labelBase}>Prénom *</label>
                <input name="firstName" value={formData.firstName} onChange={handleInputChange} className={inputBase} placeholder="Votre prénom" required />
              </div>
              <div>
                <label className={labelBase}>Nom *</label>
                <input name="lastName" value={formData.lastName} onChange={handleInputChange} className={inputBase} placeholder="Votre nom" required />
              </div>
              <div>
                <label className={labelBase}>Email *</label>
                <input name="email" type="email" value={formData.email} onChange={handleInputChange} className={inputBase} placeholder="votre@email.com" required />
              </div>
              <div>
                <label className={labelBase}>Téléphone *</label>
                <input name="phone" type="tel" value={formData.phone} onChange={handleInputChange} className={inputBase} placeholder="+221 xx xx xx xx" required />
              </div>
              <div>
                <label className={labelBase}>Pays *</label>
                <input name="country" value={formData.country} onChange={handleInputChange} className={inputBase} placeholder="Sénégal" required />
              </div>
              <div>
                <label className={labelBase}>Ville *</label>
                <input name="city" value={formData.city} onChange={handleInputChange} className={inputBase} placeholder="Dakar" required />
              </div>
            </div>

            <hr className="border-gray-100" />

            {/* Dynamic Sections based on formType */}
            {formType === 'women_empowerment' && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-800">Détails du Projet</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={labelBase}>Nom du projet / activité</label>
                    <input name="companyName" value={formData.companyName} onChange={handleInputChange} className={inputBase} placeholder="Nom de votre projet" />
                  </div>
                  <div>
                    <label className={labelBase}>Secteur d'activité</label>
                    <select className={inputBase}>
                      <option>Agriculture / Transformation</option>
                      <option>Commerce</option>
                      <option>Artisanat</option>
                      <option>Services</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className={labelBase}>Description brève</label>
                    <textarea className={inputBase} rows={3} placeholder="Décrivez votre activité en quelques mots..."></textarea>
                  </div>
                </div>
              </div>
            )}

            {formType === 'formalization' && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-800">Informations Entreprise</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={labelBase}>Nom de l'entreprise (si existant)</label>
                    <input name="companyName" value={formData.companyName} onChange={handleInputChange} className={inputBase} placeholder="Votre entreprise" />
                  </div>
                  <div>
                    <label className={labelBase}>Statut actuel</label>
                    <select className={inputBase}>
                      <option>Informel</option>
                      <option>GIE</option>
                      <option>Entreprise Individuelle</option>
                      <option>SARL</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className={labelBase}>Besoins spécifiques</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                      {['NINEA', 'RCCM', 'Fiscalité', 'Business Plan'].map(item => (
                        <label key={item} className="flex items-center space-x-2">
                          <input type="checkbox" className="h-4 w-4 text-green-600 rounded" />
                          <span className="text-sm text-gray-700">{item}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {formType === 'formation' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={labelBase}>Nom de l'entreprise (optionnel)</label>
                    <input name="companyName" value={formData.companyName} onChange={handleInputChange} className={inputBase} placeholder="Votre entreprise" />
                  </div>
                  <div>
                    <label className={labelBase}>Intérêts</label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {['Formations', 'Autonomisation', 'Formalisation', 'Voyages'].map(interest => (
                        <label key={interest} className="flex items-center space-x-2">
                          <input type="checkbox" name="interests" value={interest.toLowerCase()} checked={formData.interests.includes(interest.toLowerCase())} onChange={handleInputChange} className="h-4 w-4 text-green-600 rounded" />
                          <span className="text-sm text-gray-700">{interest}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ImageUpload label="Logo entreprise" name="companyLogo" multiple={false} maxFiles={1} maxSize={5} onFilesChange={setCompanyLogoFiles} required={false} />
                  <ImageUpload label="Documents (NINEA, etc.)" name="businessDocuments" multiple={true} maxFiles={5} maxSize={5} onFilesChange={setBusinessDocumentsFiles} required={false} />
                </div>
              </div>
            )}

            <div className="pt-6 border-t border-gray-100">
              <div className="flex items-center space-x-2 mb-6">
                <input type="checkbox" id="terms" required className="h-4 w-4 text-green-600 rounded" />
                <label htmlFor="terms" className="text-sm text-gray-700">
                  J'accepte les <a href="#" className="text-green-600 font-medium hover:underline">conditions</a> et la <a href="#" className="text-green-600 font-medium hover:underline">politique de confidentialité</a>
                </label>
              </div>

              <button type="submit" disabled={isSubmitting} className="w-full md:w-auto md:min-w-[300px] bg-green-600 text-white py-4 px-8 rounded-xl font-bold hover:bg-green-700 disabled:bg-gray-400 flex justify-center items-center transition-all shadow-lg hover:shadow-xl mx-auto block">
                {isSubmitting ? <Loader2 className="animate-spin mr-2" size={20} /> : null}
                {isSubmitting ? 'Traitement en cours...' : 'Envoyer ma demande'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default Enrollments;
