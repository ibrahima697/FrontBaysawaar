
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


        ...formation,        date: formation.date ? new Date(formation.date).toISOString().split('T')[0] : '',
      });
    }
    else {
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
    }, [formation]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: name === 'maxSeats' || name === 'priceNonMember' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (formation?._id) {
        await formationsAPI.update(formation._id, form);
        } else {
        await formationsAPI.create(form);
      }
      Swal.fire({
        icon: 'success',
        title: 'Succès !',
        text: `La formation a été ${formation?._id ? 'mise à jour' : 'créée'} avec succès.`,
        confirmButtonColor: '#059669',
        timer: 3000,
        timerProgressBar: true,
      });
      onFormationSaved();
      onClose();
    }
    catch (err: any) {
      Swal.fire({
        icon: 'error',
        title: 'Erreur !',
        text: err.response?.data?.error || 'Une erreur est survenue.',
        confirmButtonColor: '#dc2626',
      });
    }
  }
    if (!isOpen) return null;   
    return (    
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>
        <h2 className="text-2xl font-bold mb-4">{formation ? 'Modifier la Formation' : 'Créer une Nouvelle Formation'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Titre</label>
            <input
              type="text"
              name="title"
                value={form.title}
                onChange={handleInputChange}    
                className="w-full border border-gray-300 rounded-md p-2"
                required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md p-2"
                required
            ></textarea>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md p-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Lieu</label>
              <input
                type="text"
                name="location"
                value={form.location}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md p-2"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Places Maximales</label>
            <input
              type="number"
              name="maxSeats"
              value={form.maxSeats}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Durée</label>
              <input
                type="text"
                name="duration"
                value={form.duration}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md p-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Catégorie</label>
              <select
                name="category"
                value={form.category}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md p-2"
                required
              >
                <option value="entrepreneuriat">Entrepreneuriat</option>
                <option value="transformation">Transformation</option>
                <option value="autonomisation">Autonomisation</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Prix pour Non-Membres (en CFA)</label>
            <input
              type="number"
              name="priceNonMember"
              value={form.priceNonMember}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Image (URL)</label>
            <input
              type="text"
              name="image"
              value={form.image}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div className="flex justify-end mt-6"> 
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormationFormModal;

