'use client';

import { useState, useEffect } from 'react';
import { formationsAPI } from '../services/api';
import Swal from 'sweetalert2';
import { X } from 'lucide-react';

interface Formation {
  _id?: string;
  title: string;
  description: string;
  date: string;
  location: string;
  maxSeats: number;
  duration: string;
  category: string;
  priceNonMember?: number;
  image?: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  formation?: Formation | null;
  onFormationSaved: () => void;
}

const FormationFormModal: React.FC<Props> = ({ isOpen, onClose, formation, onFormationSaved }) => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState<Formation>({
    title: '',
    description: '',
    date: '',
    location: '',
    maxSeats: 20,
    duration: '',
    category: 'entrepreneuriat',
    priceNonMember: 0,
    image: '',
  });

  useEffect(() => {
    if (formation) {
      setForm({
        ...formation,
        date: formation.date ? new Date(formation.date).toISOString().split('T')[0] : '',
      });
    } else {
      setForm({
        title: '',
        description: '',
        date: '',
        location: '',
        maxSeats: 20,
        duration: '',
        category: 'entrepreneuriat',
        priceNonMember: 0,
        image: '',
      });
    }
    setErrors({});
  }, [formation, isOpen]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!form.title.trim()) newErrors.title = "Le titre est requis";
    if (!form.description.trim()) newErrors.description = "La description est requise";
    if (!form.location.trim()) newErrors.location = "Le lieu est requis";
    if (!form.date) newErrors.date = "La date est requise";
    if (!form.duration.trim()) newErrors.duration = "La durée est requise";

    if (form.maxSeats <= 0) {
      newErrors.maxSeats = "Le nombre de places doit être supérieur à 0";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      if (formation?._id) {
        await formationsAPI.update(formation._id, form);
        Swal.fire('Succès', 'Formation mise à jour', 'success');
      } else {
        await formationsAPI.create(form);
        Swal.fire('Succès', 'Formation créée avec succès', 'success');
      }
      onFormationSaved();
      onClose();
    } catch (err: any) {
      console.error(err);
      Swal.fire('Erreur', err.response?.data?.message || 'Impossible de sauvegarder', 'error');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-4 sm:p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">{formation?._id ? 'Éditer' : 'Créer'} une Formation</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Titre *</label>
              <input
                type="text"
                value={form.title}
                onChange={e => {
                  setForm({ ...form, title: e.target.value });
                  if (errors.title) setErrors(prev => ({ ...prev, title: '' }));
                }}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 transition-all ${errors.title ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-transparent'}`}
              />
              {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Date *</label>
              <input
                type="date"
                value={form.date}
                onChange={e => {
                  setForm({ ...form, date: e.target.value });
                  if (errors.date) setErrors(prev => ({ ...prev, date: '' }));
                }}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 transition-all ${errors.date ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-transparent'}`}
              />
              {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description *</label>
            <textarea
              value={form.description}
              onChange={e => {
                setForm({ ...form, description: e.target.value });
                if (errors.description) setErrors(prev => ({ ...prev, description: '' }));
              }}
              className={`w-full p-3 border rounded-lg h-24 focus:ring-2 focus:ring-green-500 transition-all ${errors.description ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-transparent'}`}
            />
            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Lieu *</label>
              <input
                type="text"
                value={form.location}
                onChange={e => {
                  setForm({ ...form, location: e.target.value });
                  if (errors.location) setErrors(prev => ({ ...prev, location: '' }));
                }}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 transition-all ${errors.location ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-transparent'}`}
              />
              {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Durée *</label>
              <input
                type="text"
                placeholder="ex: 2 jours"
                value={form.duration}
                onChange={e => {
                  setForm({ ...form, duration: e.target.value });
                  if (errors.duration) setErrors(prev => ({ ...prev, duration: '' }));
                }}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 transition-all ${errors.duration ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-transparent'}`}
              />
              {errors.duration && <p className="text-red-500 text-xs mt-1">{errors.duration}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Places max *</label>
              <input
                type="number"
                value={form.maxSeats}
                onChange={e => {
                  setForm({ ...form, maxSeats: parseInt(e.target.value) || 1 });
                  if (errors.maxSeats) setErrors(prev => ({ ...prev, maxSeats: '' }));
                }}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 transition-all ${errors.maxSeats ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-transparent'}`}
                min="1"
              />
              {errors.maxSeats && <p className="text-red-500 text-xs mt-1">{errors.maxSeats}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Catégorie *</label>
              <select
                value={form.category}
                onChange={e => setForm({ ...form, category: e.target.value })}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500"
              >
                <option value="entrepreneuriat">Entrepreneuriat</option>
                <option value="transformation-cereales">Transformation céréales</option>
                <option value="fruits-legumes">Fruits & légumes</option>
                <option value="autonomisation-femmes">Autonomisation femmes</option>
                <option value="formalisation">Formalisation</option>
              </select>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              type="submit"
              className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 font-medium transition"
            >
              {formation?._id ? 'Mettre à jour' : 'Créer la formation'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 font-medium transition"
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormationFormModal;
