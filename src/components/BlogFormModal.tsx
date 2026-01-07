import React, { useState, useEffect } from 'react';
import { X, BookOpen, Upload } from 'lucide-react';
import ImageUpload from './ImageUpload';
import { blogsAPI } from '../services/api';
import Swal from 'sweetalert2';

interface BlogPost {
  _id: string;
  title: string;
  content: string;
  author: string;
  authorBio: string;
  category: string;
  tags: string[];
  featuredImage: {
    publicId: string;
    url: string;
    alt: string;
  };
  gallery: Array<{
    publicId: string;
    url: string;
    alt: string;
    caption: string;
  }>;
  readTime: string;
  metaDescription: string;
  slug: string;
  isPublished: boolean;
  publishedAt: string;
  createdAt: string;
}

interface BlogFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  blog?: BlogPost | null;
  onBlogSaved: () => void;
}

const BlogFormModal: React.FC<BlogFormModalProps> = ({
  isOpen,
  onClose,
  blog,
  onBlogSaved
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [featuredImageFile, setFeaturedImageFile] = useState<File[]>([]);
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: '',
    authorBio: '',
    category: '',
    tags: '',
    metaDescription: '',
    readTime: '',
    isPublished: false
  });

  useEffect(() => {
    if (blog) {
      setFormData({
        title: blog.title || '',
        content: blog.content || '',
        author: blog.author || '',
        authorBio: blog.authorBio || '',
        category: blog.category || '',
        tags: blog.tags?.join(', ') || '',
        metaDescription: blog.metaDescription || '',
        readTime: blog.readTime || '',
        isPublished: blog.isPublished ?? false
      });
    } else {
      setFormData({
        title: '',
        content: '',
        author: '',
        authorBio: '',
        category: '',
        tags: '',
        metaDescription: '',
        readTime: '',
        isPublished: false
      });
    }
    setFeaturedImageFile([]);
    setGalleryFiles([]);
  }, [blog, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.content || !formData.author || !formData.category) {
      Swal.fire({
        icon: 'warning',
        title: 'Champs requis',
        text: 'Veuillez remplir tous les champs obligatoires',
        confirmButtonColor: '#dc2626',
      });
      return;
    }

    try {
      setIsLoading(true);

      const submitData = new FormData();
      submitData.append('title', formData.title);
      submitData.append('content', formData.content);
      submitData.append('author', formData.author);
      submitData.append('authorBio', formData.authorBio);
      submitData.append('category', formData.category);
      submitData.append('tags', formData.tags);
      submitData.append('metaDescription', formData.metaDescription);
      submitData.append('readTime', formData.readTime);
      submitData.append('isPublished', formData.isPublished.toString());

      // Ajouter les images
      if (featuredImageFile.length > 0) {
        submitData.append('featuredImage', featuredImageFile[0]);
      }
      galleryFiles.forEach((file, index) => {
        submitData.append('gallery', file);
      });

      if (blog) {
        await blogsAPI.updateBlog(blog._id, submitData);
        Swal.fire({
          icon: 'success',
          title: 'Succès!',
          text: 'Article mis à jour avec succès',
          confirmButtonColor: '#16a34a',
        });
      } else {
        await blogsAPI.createBlog(submitData);
        Swal.fire({
          icon: 'success',
          title: 'Succès!',
          text: 'Article créé avec succès',
          confirmButtonColor: '#16a34a',
        });
      }

      onClose();
      onBlogSaved();
    } catch (error: any) {
      console.error('Erreur lors de la sauvegarde:', error);
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: error.response?.data?.error || 'Une erreur est survenue',
        confirmButtonColor: '#dc2626',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">
            {blog ? 'Modifier l\'article' : 'Ajouter un article'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={24} className="text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="overflow-y-auto max-h-[calc(90vh-80px)]">
          <div className="p-6 space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Titre de l'article *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
            </div>

            {/* Author and Category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Auteur *
                </label>
                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Catégorie *
                </label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            {/* Author Bio */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Biographie de l'auteur
              </label>
              <textarea
                name="authorBio"
                value={formData.authorBio}
                onChange={handleInputChange}
                rows={2}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contenu de l'article *
              </label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                rows={8}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
            </div>

            {/* Meta Description and Read Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description meta
                </label>
                <textarea
                  name="metaDescription"
                  value={formData.metaDescription}
                  onChange={handleInputChange}
                  rows={2}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Temps de lecture
                </label>
                <input
                  type="text"
                  name="readTime"
                  value={formData.readTime}
                  onChange={handleInputChange}
                  placeholder="ex: 5 min"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags (séparés par des virgules)
              </label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleInputChange}
                placeholder="ex: technologie, innovation, business"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {/* Featured Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image à la une
              </label>
              <ImageUpload
                label=""
                name="featuredImage"
                multiple={false}
                maxFiles={1}
                maxSize={5}
                acceptedTypes={['image/*']}
                onFilesChange={setFeaturedImageFile}
              />
            </div>

            {/* Gallery */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Galerie d'images
              </label>
              <ImageUpload
                label=""
                name="gallery"
                multiple={true}
                maxFiles={10}
                maxSize={5}
                acceptedTypes={['image/*']}
                onFilesChange={setGalleryFiles}
              />
            </div>

            {/* Published Status */}
            <div className="flex items-center">
              <input
                type="checkbox"
                name="isPublished"
                checked={formData.isPublished}
                onChange={handleInputChange}
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-700">
                Publier l'article
              </label>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end space-x-4 p-6 border-t border-gray-200 bg-gray-50">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Sauvegarde...</span>
                </>
              ) : (
                <span>{blog ? 'Mettre à jour' : 'Créer'}</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BlogFormModal;
