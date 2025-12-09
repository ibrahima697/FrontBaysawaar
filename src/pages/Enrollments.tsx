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
        courseId: formationId || '', // Provide courseId from formationId or empty string
        userId: '', // Set userId appropriately, e.g., from context or authentication
        status: 'pending', // Or another default status as required
        companyLogo: companyLogoFiles[0], // If API expects file, otherwise remove
        businessDocuments: businessDocumentsFiles, // If API expects array of files, otherwise remove
      };

      const response = await enrollmentsAPI.submitEnrollment(enrollmentData);
      const successMsg = response.data?.message || 'Inscription réussie !';
      setSubmitStatus('success');
      setSubmitMessage(successMsg);
      
      showSuccessNotification('Votre inscription comme membre a été soumise. Vérifiez votre email pour vos identifiants.');
      
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

  const inputBase = 'w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white/80 shadow-sm';
  const labelBase = 'block text-sm font-semibold text-gray-700 mb-2';

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-900">Devenez Membre BAY SA WAAR</h1>
        <p className="text-center text-gray-600 mb-8">Rejoignez-nous pour accéder à nos formations gratuites, programmes d'autonomisation et services Fabira Trading.</p>

        {submitStatus && (
          <div className={`p-4 rounded-xl mb-6 ${
            submitStatus === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
          }`}>
            {submitMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelBase}>Prénom *</label>
              <input name="firstName" value={formData.firstName} onChange={handleInputChange} className={inputBase} placeholder="Votre prénom" required />
            </div>
            <div>
              <label className={labelBase}>Nom *</label>
              <input name="lastName" value={formData.lastName} onChange={handleInputChange} className={inputBase} placeholder="Votre nom" required />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelBase}>Email *</label>
              <input name="email" type="email" value={formData.email} onChange={handleInputChange} className={inputBase} placeholder="votre@email.com" required />
            </div>
            <div>
              <label className={labelBase}>Téléphone *</label>
              <input name="phone" type="tel" value={formData.phone} onChange={handleInputChange} className={inputBase} placeholder="+221 xx xx xx xx" required />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelBase}>Pays *</label>
              <input name="country" value={formData.country} onChange={handleInputChange} className={inputBase} placeholder="Sénégal" required />
            </div>
            <div>
              <label className={labelBase}>Ville *</label>
              <input name="city" value={formData.city} onChange={handleInputChange} className={inputBase} placeholder="Dakar" required />
            </div>
          </div>

          <div>
            <label className={labelBase}>Nom de l'entreprise (optionnel)</label>
            <input name="companyName" value={formData.companyName} onChange={handleInputChange} className={inputBase} placeholder="Votre entreprise" />
          </div>

          <div>
            <label className={labelBase}>Intérêts (optionnel)</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {['Formations', 'Autonomisation Femmes', 'Formalisation', 'Services Fabira', 'Foires', 'Voyages'].map(interest => (
                <label key={interest} className="flex items-center space-x-2">
                  <input type="checkbox" name="interests" value={interest.toLowerCase()} checked={formData.interests.includes(interest.toLowerCase())} onChange={handleInputChange} className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-gray-700">{interest}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <ImageUpload label="Logo entreprise (optionnel)" name="companyLogo" multiple={false} maxFiles={1} maxSize={5} onFilesChange={setCompanyLogoFiles} required={false} />
            <ImageUpload label="Documents entreprise (optionnel)" name="businessDocuments" multiple={true} maxFiles={5} maxSize={5} onFilesChange={setBusinessDocumentsFiles} required={false} />
          </div>

          <div className="flex items-center space-x-2">
            <input type="checkbox" id="terms" required className="h-4 w-4 text-green-600" />
            <label htmlFor="terms" className="text-sm text-gray-700">
              J'accepte les <a href="#" className="text-green-600 underline">conditions</a> et <a href="#" className="text-green-600 underline">politique de confidentialité</a>
            </label>
          </div>

          <button type="submit" disabled={isSubmitting} className="w-full bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700 disabled:bg-gray-400 flex justify-center items-center">
            {isSubmitting ? <Loader2 className="animate-spin mr-2" size={20} /> : null}
            {isSubmitting ? 'Envoi...' : 'Soumettre l\'inscription'}
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default Enrollments;
