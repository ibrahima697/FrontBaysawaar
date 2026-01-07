import React, { useState, useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
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

interface BlogModalProps {
  isOpen: boolean;
  onClose: () => void;
  blog?: BlogPost | null;
  onBlogSaved: () => void;
}

const BlogModal: React.FC<BlogModalProps> = ({
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
    readTime: '',
    metaDescription: '',
    isPublished: false,
  });

  useEffect(() => {
    if (blog) {
      setFormData({
        title: blog.title,
        content: blog.content,
        author: blog.author,
        authorBio: blog.authorBio || '',
        category: blog.category || '',
        tags: blog.tags.join(', '),
        readTime: blog.readTime || '',
        metaDescription: blog.metaDescription || '',
        isPublished: blog.isPublished,
      });
    } else {
      resetForm();
    }
  }, [blog, isOpen]);

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      author: '',
      authorBio: '',
      category: '',
      tags: '',
      readTime: '',
      metaDescription: '',
      isPublished: false,
    });
    setFeaturedImageFile([]);
    setGalleryFiles([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formDataToSend = new FormData();

      // Ajouter les données du formulaire
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value.toString());
      });

      // Ajouter les images
      if (featuredImageFile.length > 0) {
        formDataToSend.append('featuredImage', featuredImageFile[0]);
      }

      galleryFiles.forEach((file) => {
        formDataToSend.append('gallery', file);
      });

      if (blog) {
        await blogsAPI.updateBlog(blog._id, formDataToSend);
        Swal.fire('Succès!', 'Article mis à jour avec succès', 'success');
      } else {
        await blogsAPI.createBlog(formDataToSend);
        Swal.fire('Succès!', 'Article créé avec succès', 'success');
      }

      onBlogSaved();
      onClose();
      resetForm();
    } catch (error: any) {
      console.error('Erreur:', error);
      Swal.fire('Erreur!', error.response?.data?.error || 'Une erreur est survenue', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold">
            {blog ? 'Modifier l\'article' : 'Ajouter un nouvel article'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Titre *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Auteur *
              </label>
              <input
                type="text"
                required
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Catégorie
              </label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Temps de lecture
              </label>
              <input
                type="text"
                value={formData.readTime}
                onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                placeholder="ex: 5 min"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags (séparés par des virgules)
              </label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                placeholder="tag1, tag2, tag3"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="isPublished"
                checked={formData.isPublished}
                onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="isPublished" className="ml-2 block text-sm text-gray-700">
                Article publié
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bio de l'auteur
            </label>
            <textarea
              rows={3}
              value={formData.authorBio}
              onChange={(e) => setFormData({ ...formData, authorBio: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description SEO
            </label>
            <textarea
              rows={3}
              value={formData.metaDescription}
              onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
              placeholder="Description pour les moteurs de recherche"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contenu *
            </label>
            <textarea
              required
              rows={8}
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Image principale
            </label>
            <ImageUpload
              label=""
              name="featuredImage"
              multiple={false}
              maxFiles={1}
              maxSize={5}
              onFilesChange={setFeaturedImageFile}
              existingImages={blog?.featuredImage ? [blog.featuredImage] : []}
              required={false}
            />
          </div>

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
              onFilesChange={setGalleryFiles}
              existingImages={blog?.gallery || []}
              required={false}
            />
          </div>

          <div className="flex justify-end space-x-3 pt-6 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {isLoading ? 'Enregistrement...' : (blog ? 'Mettre à jour' : 'Créer')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BlogModal;
