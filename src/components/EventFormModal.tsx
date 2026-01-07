'use client';

import { useState, useEffect } from 'react';
import { eventsAPI } from '../services/api';
import Swal from 'sweetalert2';
import { X } from 'lucide-react';
import { EventData } from '../types';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    event?: EventData | null;
    onEventSaved: () => void;
}

const EventFormModal: React.FC<Props> = ({ isOpen, onClose, event, onEventSaved }) => {
    const [form, setForm] = useState<EventData>({
        title: '',
        description: '',
        dateStart: '',
        dateEnd: '',
        location: '',
        maxParticipants: 100,
        priceMember: 0,
        priceNonMember: 0,
        isFeatured: false,
        // Default type
        type: 'seminar'
    } as EventData & { type: string });

    const [imageFile, setImageFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    useEffect(() => {
        if (event) {
            setForm({
                ...event,
                dateStart: event.dateStart ? new Date(event.dateStart).toISOString().split('T')[0] : '',
                dateEnd: event.dateEnd ? new Date(event.dateEnd).toISOString().split('T')[0] : '',
            });
            if (event.images && event.images.length > 0) {
                setPreviewUrl(event.images[0].url);
            } else {
                setPreviewUrl(null);
            }
        } else {
            setForm({
                title: '',
                description: '',
                dateStart: '',
                dateEnd: '',
                location: '',
                maxParticipants: 100,
                priceMember: 0,
                priceNonMember: 0,
                isFeatured: false,
                type: 'seminar'
            } as EventData & { type: string });
            setPreviewUrl(null);
        }
        setImageFile(null);
    }, [event]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('title', form.title);
            formData.append('description', form.description);
            formData.append('dateStart', form.dateStart);
            formData.append('dateEnd', form.dateEnd);
            formData.append('location', form.location);
            formData.append('maxParticipants', form.maxParticipants.toString());
            formData.append('priceMember', form.priceMember.toString());
            formData.append('priceNonMember', form.priceNonMember.toString());
            formData.append('isFeatured', String(form.isFeatured));
            if (form.type) formData.append('type', form.type);

            if (imageFile) {
                formData.append('images', imageFile);
            }

            if (event?._id) {
                await eventsAPI.update(event._id, formData);
                Swal.fire('Succès', 'Événement mis à jour', 'success');
            } else {
                await eventsAPI.create(formData);
                Swal.fire('Succès', 'Événement créé avec succès', 'success');
            }
            onEventSaved();
            onClose();
        } catch (err: any) {
            console.error(err);
            Swal.fire('Erreur', err.response?.data?.message || 'Impossible de sauvegarder', 'error');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">{event?._id ? 'Éditer' : 'Créer'} un Événement</h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Image Upload */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Image de l'événement</label>
                        <div className="flex items-center space-x-4">
                            <div className="relative w-32 h-32 bg-gray-100 rounded-lg overflow-hidden border border-gray-300">
                                {previewUrl ? (
                                    <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="flex items-center justify-center w-full h-full text-gray-400">
                                        <span>No Image</span>
                                    </div>
                                )}
                            </div>
                            <div className="flex-1">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="block w-full text-sm text-gray-500
                                    file:mr-4 file:py-2 file:px-4
                                    file:rounded-full file:border-0
                                    file:text-sm file:font-semibold
                                    file:bg-green-50 file:text-green-700
                                    hover:file:bg-green-100"
                                />
                                <p className="text-xs text-gray-500 mt-1">PNG, JPG, WEBP jusqu'à 5MB</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Titre *</label>
                            <input
                                type="text"
                                value={form.title}
                                onChange={e => setForm({ ...form, title: e.target.value })}
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Type *</label>
                            <select
                                value={(form as any).type || 'seminar'}
                                onChange={e => setForm({ ...form, type: e.target.value } as any)}
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
                                required
                            >
                                <option value="seminar">Séminaire</option>
                                <option value="business_trip">Voyage d'affaires</option>
                                <option value="fair">Foire</option>
                                <option value="conference">Conférence</option>
                                <option value="training">Formation</option>
                                <option value="networking">Networking</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Description *</label>
                        <textarea
                            value={form.description}
                            onChange={e => setForm({ ...form, description: e.target.value })}
                            className="w-full p-3 border rounded-lg h-24 focus:ring-2 focus:ring-green-500"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Date Début *</label>
                            <input
                                type="date"
                                value={form.dateStart}
                                onChange={e => setForm({ ...form, dateStart: e.target.value })}
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Date Fin *</label>
                            <input
                                type="date"
                                value={form.dateEnd}
                                onChange={e => setForm({ ...form, dateEnd: e.target.value })}
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Lieu *</label>
                            <input
                                type="text"
                                value={form.location}
                                onChange={e => setForm({ ...form, location: e.target.value })}
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Participants Max *</label>
                            <input
                                type="number"
                                value={form.maxParticipants}
                                onChange={e => setForm({ ...form, maxParticipants: parseInt(e.target.value) || 0 })}
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
                                min="1"
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Prix Membre (€)</label>
                            <input
                                type="number"
                                value={form.priceMember}
                                onChange={e => setForm({ ...form, priceMember: parseFloat(e.target.value) || 0 })}
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
                                min="0"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Prix Non-Membre (€)</label>
                            <input
                                type="number"
                                value={form.priceNonMember}
                                onChange={e => setForm({ ...form, priceNonMember: parseFloat(e.target.value) || 0 })}
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
                                min="0"
                            />
                        </div>
                    </div>

                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            id="isFeatured"
                            checked={form.isFeatured}
                            onChange={e => setForm({ ...form, isFeatured: e.target.checked })}
                            className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                        />
                        <label htmlFor="isFeatured" className="text-sm font-medium text-gray-700">Mettre en avant (Featured)</label>
                    </div>

                    <div className="flex gap-3 mt-6">
                        <button
                            type="submit"
                            className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 font-medium transition"
                        >
                            {event?._id ? 'Mettre à jour' : 'Créer l\'événement'}
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

export default EventFormModal;
