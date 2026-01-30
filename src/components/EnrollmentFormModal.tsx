import React, { useState, useEffect } from 'react';
import { X, User, Mail, Building2, Loader2, ArrowRight } from 'lucide-react';
import { enrollmentsAPI } from '../services/api';
import Swal from 'sweetalert2';
import ImageUpload from './ImageUpload';

interface EnrollmentFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onEnrollmentSaved: () => void;
}

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

const EnrollmentFormModal: React.FC<EnrollmentFormModalProps> = ({
    isOpen,
    onClose,
    onEnrollmentSaved
}) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState<EnrollmentForm>({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        country: 'Sénégal',
        city: '',
        companyName: '',
        interests: [],
    });
    const [companyLogoFiles, setCompanyLogoFiles] = useState<File[]>([]);

    useEffect(() => {
        if (isOpen) {
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                country: 'Sénégal',
                city: '',
                companyName: '',
                interests: [],
            });
            setCompanyLogoFiles([]);
        }
    }, [isOpen]);

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
            Swal.fire('Erreur', 'Veuillez remplir les champs obligatoires.', 'error');
            return;
        }

        setIsSubmitting(true);

        try {
            const enrollmentData = {
                ...formData,
                companyLogo: companyLogoFiles[0],
                status: 'approved', // Admin creation defaults to approved
                formType: 'formation',
                courseId: '',
                userId: '',
            };

            await enrollmentsAPI.submitEnrollment(enrollmentData);

            Swal.fire({
                icon: 'success',
                title: 'Succès !',
                text: 'L\'enrôlement a été créé avec succès.',
                confirmButtonColor: '#16a34a',
            });

            onEnrollmentSaved();
            onClose();
        } catch (error: any) {
            console.error('Error creating enrollment:', error);
            Swal.fire({
                icon: 'error',
                title: 'Erreur',
                text: error.response?.data?.error || 'Une erreur est survenue lors de la création.',
                confirmButtonColor: '#dc2626',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    const inputBase = 'w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all outline-none text-gray-700';
    const labelBase = 'block text-sm font-semibold text-gray-700 mb-1.5';

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50/50">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">Nouvel Enrôlement</h2>
                        <p className="text-sm text-gray-500">Ajouter manuellement un nouveau membre</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white rounded-full transition-colors border border-transparent hover:border-gray-200"
                    >
                        <X size={20} className="text-gray-400" />
                    </button>
                </div>

                {/* Form Body */}
                <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-hide">
                    {/* Identity Section */}
                    <section className="space-y-4">
                        <div className="flex items-center gap-2 text-green-600 mb-2">
                            <User size={18} />
                            <h3 className="font-bold uppercase tracking-wider text-xs">Identité</h3>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className={labelBase}>Prénom *</label>
                                <input
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    className={inputBase}
                                    placeholder="Ex: Moussa"
                                    required
                                />
                            </div>
                            <div>
                                <label className={labelBase}>Nom *</label>
                                <input
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    className={inputBase}
                                    placeholder="Ex: Sow"
                                    required
                                />
                            </div>
                        </div>
                    </section>

                    {/* Contact Section */}
                    <section className="space-y-4">
                        <div className="flex items-center gap-2 text-green-600 mb-2">
                            <Mail size={18} />
                            <h3 className="font-bold uppercase tracking-wider text-xs">Contact & Localisation</h3>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className={labelBase}>Email *</label>
                                <input
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className={inputBase}
                                    placeholder="moussa@email.com"
                                    required
                                />
                            </div>
                            <div>
                                <label className={labelBase}>Téléphone *</label>
                                <input
                                    name="phone"
                                    type="tel"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className={inputBase}
                                    placeholder="+221 ..."
                                    required
                                />
                            </div>
                            <div>
                                <label className={labelBase}>Pays</label>
                                <input
                                    name="country"
                                    value={formData.country}
                                    onChange={handleInputChange}
                                    className={inputBase}
                                    placeholder="Sénégal"
                                />
                            </div>
                            <div>
                                <label className={labelBase}>Ville</label>
                                <input
                                    name="city"
                                    value={formData.city}
                                    onChange={handleInputChange}
                                    className={inputBase}
                                    placeholder="Dakar"
                                />
                            </div>
                        </div>
                    </section>

                    {/* Professional Section */}
                    <section className="space-y-4">
                        <div className="flex items-center gap-2 text-green-600 mb-2">
                            <Building2 size={18} />
                            <h3 className="font-bold uppercase tracking-wider text-xs">Entreprise</h3>
                        </div>
                        <div>
                            <label className={labelBase}>Nom de l'entreprise</label>
                            <input
                                name="companyName"
                                value={formData.companyName}
                                onChange={handleInputChange}
                                className={inputBase}
                                placeholder="Ex: Baraka Trading"
                            />
                        </div>
                        <div className="pt-2">
                            <ImageUpload
                                label="Logo entreprise (optionnel)"
                                name="companyLogo"
                                multiple={false}
                                maxFiles={1}
                                maxSize={5}
                                onFilesChange={setCompanyLogoFiles}
                            />
                        </div>
                    </section>

                    {/* Interests */}
                    <section className="space-y-3">
                        <label className={labelBase}>Domaines d'intérêt</label>
                        <div className="grid grid-cols-2 gap-2">
                            {['Formations', 'Autonomisation', 'Formalisation', 'Voyages'].map(interest => (
                                <label key={interest} className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-green-200 transition-all cursor-pointer">
                                    <input
                                        type="checkbox"
                                        value={interest.toLowerCase()}
                                        checked={formData.interests.includes(interest.toLowerCase())}
                                        onChange={handleInputChange}
                                        className="h-4 w-4 text-green-600 rounded focus:ring-green-500"
                                    />
                                    <span className="text-xs font-semibold text-gray-700">{interest}</span>
                                </label>
                            ))}
                        </div>
                    </section>
                </form>

                {/* Footer */}
                <div className="p-6 border-t border-gray-100 bg-gray-50 flex items-center justify-end gap-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-6 py-2.5 text-gray-500 font-bold hover:text-gray-700 transition-colors uppercase tracking-widest text-xs"
                    >
                        Annuler
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-2xl font-bold transition-all disabled:opacity-50 shadow-lg shadow-green-900/10 uppercase tracking-widest text-xs"
                    >
                        {isSubmitting ? (
                            <Loader2 className="animate-spin" size={18} />
                        ) : (
                            <ArrowRight size={18} />
                        )}
                        {isSubmitting ? "Création..." : "Créer l'Enrôlement"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EnrollmentFormModal;
