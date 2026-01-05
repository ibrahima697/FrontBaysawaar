import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  Clock,
  CheckCircle,
  XCircle,
  Trash2,
  RefreshCw,
  TrendingUp,
  Package,
  BookOpen,
  PlusIcon,
  PencilIcon,
  ChevronLeft,
  ChevronRight,
  Calendar,
  MapPin,
  Pencil,
  UserCheck,
  UserX
} from 'lucide-react';
import { adminAPI, productsAPI, blogsAPI, formationsAPI, eventsAPI } from '../services/api';
import Swal from 'sweetalert2';
import ProductModal from '../components/ProductModal';
import ProductFormModal from '../components/ProductFormModal';
import BlogModal from '../components/BlogModal';
import BlogFormModal from '../components/BlogFormModal';
import FormationFormModal from '../components/FormationFormModal';
import FormationModal from '../components/FormationModal';
import EventFormModal from '../components/EventFormModal';
import { EventData } from '../types';

interface AdminStats {
  totalUsers: number;
  totalEnrollments: number;
  pendingEnrollments: number;
  approvedEnrollments: number;
  rejectedEnrollments: number;
  totalProducts: number;
  totalFormations: number;
  totalBlogs: number;
}

interface Enrollment {
  _id: string;
  type: 'partner' | 'member';
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  companyName: string;
  businessType: string;
  distributionArea?: string;
  targetMarkets?: string;
  industry?: string;
  companySize?: string;
  interests?: string[];
  status: 'pending' | 'approved' | 'rejected';
  userId: string;
  createdAt: string;
}

interface Formation {
  _id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  duration: string;
  category: string;
  maxSeats: number;
  enrolledUsers: string[];
  registrations: Array<{
    _id: string;
    userId: string;
    userName: string;
    userEmail: string;
    status: 'pending' | 'approved' | 'rejected';
    registeredAt: string;
  }>;
  createdAt: string;
}

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  brand: string;
  images: Array<{
    publicId: string;
    url: string;
    alt: string;
  }>;
  specifications: Record<string, any>;
  tags: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

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

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'blogs' | 'formations' | 'events'>('dashboard');
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [formations, setFormations] = useState<Formation[]>([]);
  const [loading, setLoading] = useState(true);
  const [showProductModal, setShowProductModal] = useState(false);
  const [showProductFormModal, setShowProductFormModal] = useState(false);
  const [showBlogModal, setShowBlogModal] = useState(false);
  const [showBlogFormModal, setShowBlogFormModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [enrollmentsLoading, setEnrollmentsLoading] = useState(false);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [showFormationFormModal, setShowFormationFormModal] = useState(false);
  const [editingFormation, setEditingFormation] = useState<Formation | null>(null);
  const [enrollmentsCurrentPage, setEnrollmentsCurrentPage] = useState(1);
  const [enrollmentsPerPage] = useState(5);
  const [productsCurrentPage, setProductsCurrentPage] = useState(1);
  const [productsPerPage] = useState(5);
  const [blogsCurrentPage, setBlogsCurrentPage] = useState(1);
  //const [formationsPage, setFormationsPage] = useState(1);
  const [showFormationModal, setShowFormationModal] = useState(false);
  const [blogsPerPage] = useState(5);
  //const [formationsPerPage] = useState(5);
  const [events, setEvents] = useState<EventData[]>([]);
  const [showEventFormModal, setShowEventFormModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState<EventData | null>(null);


  useEffect(() => {
    fetchAdminData();
  }, []);

  useEffect(() => {
    fetchEnrollments();
  }, [filter]);

  useEffect(() => {
    if (activeTab === 'products') {
      fetchProducts();
    } else if (activeTab === 'blogs') {
      fetchBlogs();
    }
    else if (activeTab === 'formations') {
      fetchFormations();
    } else if (activeTab === 'events') {
      fetchEvents();
    }
  }, [activeTab]);


  const fetchFormations = async () => {
    try {
      const response = await formationsAPI.getAllAdmin();
      setFormations(response.data.formations || []);
    } catch (error) {
      console.error('Erreur formations:', error);
      Swal.fire('Erreur', 'Impossible de charger les formations', 'error');
    }
  };

  const fetchAdminData = async () => {
    try {
      const response = await adminAPI.getAdminStats();
      setStats(response.data);
    } catch (error) {
      console.error('Erreur lors du chargement des statistiques:', error);
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Impossible de charger les statistiques',
        confirmButtonColor: '#dc2626',
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchEnrollments = async () => {
    setEnrollmentsLoading(true);
    try {
      const params = filter !== 'all' ? { status: filter } : {};
      const response = await adminAPI.getAllEnrollments(params);
      setEnrollments(response.data.enrollments || []);
    } catch (error) {
      console.error('Erreur lors du chargement des enrôlements:', error);
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Impossible de charger les enrôlements',
        confirmButtonColor: '#dc2626',
      });
    } finally {
      setEnrollmentsLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await productsAPI.getAllProducts();
      setProducts(response.data.products || []);
    } catch (error) {
      console.error('Erreur lors du chargement des produits:', error);
      Swal.fire('Erreur', 'Impossible de charger les produits', 'error');
    }
  };

  const fetchBlogs = async () => {
    try {
      const response = await blogsAPI.getAllBlogs();
      setBlogs(response.data.blogs || []);
    } catch (error) {
      console.error('Erreur lors du chargement des blogs:', error);
      Swal.fire('Erreur', 'Impossible de charger les blogs', 'error');
    }
  };

  const fetchEvents = async () => {
    try {
      const response = await eventsAPI.getAll();
      setEvents(response.data.events || []);
    } catch (error) {
      console.error('Erreur events:', error);
      Swal.fire('Erreur', 'Impossible de charger les événements', 'error');
    }
  };

  const handleEditEvent = (event: EventData) => {
    setEditingEvent(event);
    setShowEventFormModal(true);
  };

  const handleEventSaved = () => {
    setEditingEvent(null);
    fetchEvents();
  };

  const handleDeleteEvent = async (id: string) => {
    const result = await Swal.fire({
      title: 'Êtes-vous sûr de vouloir supprimer cet événement ?',
      text: "Cette action ne peut pas être annulée.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler'
    });

    if (result.isConfirmed) {
      try {
        await eventsAPI.delete(id);
        Swal.fire('Succès!', 'Événement supprimé avec succès', 'success');
        fetchEvents();
      } catch (error: any) {
        Swal.fire('Erreur!', error.response?.data?.error || 'Une erreur est survenue', 'error');
      }
    }
  };


  const handleEnrollmentAction = async (id: string, action: 'approve' | 'reject') => {
    const actionText = action === 'approve' ? 'approuver' : 'rejeter';
    const actionColor = action === 'approve' ? '#059669' : '#dc2626';

    const result = await Swal.fire({
      title: `Êtes-vous sûr de vouloir ${actionText} cette demande ?`,
      text: "Cette action ne peut pas être annulée.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: actionColor,
      cancelButtonColor: '#6b7280',
      confirmButtonText: `Oui, ${actionText}`,
      cancelButtonText: 'Annuler'
    });

    if (result.isConfirmed) {
      try {
        await adminAPI.updateEnrollment(id, { status: action === 'approve' ? 'approved' : 'rejected' });

        Swal.fire({
          icon: 'success',
          title: 'Succès',
          text: `Demande ${action === 'approve' ? 'approuvée' : 'rejetée'} avec succès`,
          confirmButtonColor: actionColor,
        });

        // Rafraîchir les données
        fetchAdminData();
        fetchEnrollments();
      } catch (error) {
        console.error(`Erreur lors de l'${action} de l'enrôlement:`, error);
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: `Impossible de ${actionText} la demande`,
          confirmButtonColor: '#dc2626',
        });
      }
    }
  };

  const handleRegistrationAction = async (formationId: string, regId: string, action: 'approve' | 'reject') => {
    const result = await Swal.fire({
      title: `Voulez-vous ${action === 'approve' ? 'valider' : 'refuser'} cette inscription ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: action === 'approve' ? '#059669' : '#dc2626',
    });

    if (result.isConfirmed) {
      try {
        await formationsAPI.updateRegistration(formationId, regId, {
          status: action === 'approve' ? 'approved' : 'rejected'
        });
        Swal.fire('Succès', `Inscription ${action === 'approve' ? 'validée' : 'refusée'}`, 'success');
        fetchFormations(); // Rafraîchit immédiatement
      } catch (error) {
        Swal.fire('Erreur', 'Action impossible', 'error');
      }
    }
  };

  const handleDeleteEnrollment = async (id: string) => {
    const result = await Swal.fire({
      title: 'Êtes-vous sûr de vouloir supprimer cette demande ?',
      text: "Cette action ne peut pas être annulée.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler'
    });

    if (result.isConfirmed) {
      try {
        await adminAPI.deleteEnrollment(id);

        Swal.fire({
          icon: 'success',
          title: 'Supprimé',
          text: 'Demande supprimée avec succès',
          confirmButtonColor: '#059669',
        });

        // Rafraîchir les données
        fetchAdminData();
        fetchEnrollments();
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Impossible de supprimer la demande',
          confirmButtonColor: '#dc2626',
        });
      }
    }
  };

  // Fonctions pour les produits
  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setShowProductFormModal(true);
  };

  const handleDeleteProduct = async (id: string) => {
    const result = await Swal.fire({
      title: 'Êtes-vous sûr de vouloir supprimer ce produit ?',
      text: "Cette action ne peut pas être annulée.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler'
    });

    if (result.isConfirmed) {
      try {
        await productsAPI.deleteProduct(id);
        Swal.fire('Succès!', 'Produit supprimé avec succès', 'success');
        fetchProducts();
      } catch (error: any) {
        Swal.fire('Erreur!', error.response?.data?.error || 'Une erreur est survenue', 'error');
      }
    }
  };

  const handleProductSaved = () => {
    setEditingProduct(null);
    fetchProducts();
  };


  // Fonctions pour les blogs
  const handleEditBlog = (blog: BlogPost) => {
    setEditingBlog(blog);
    setShowBlogFormModal(true);
  };

  const handleDeleteBlog = async (id: string) => {
    const result = await Swal.fire({
      title: 'Êtes-vous sûr de vouloir supprimer cet article ?',
      text: "Cette action ne peut pas être annulée.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler'
    });

    if (result.isConfirmed) {
      try {
        await blogsAPI.deleteBlog(id);
        Swal.fire('Succès!', 'Article supprimé avec succès', 'success');
        fetchBlogs();
      } catch (error: any) {
        Swal.fire('Erreur!', error.response?.data?.error || 'Une erreur est survenue', 'error');
      }
    }
  };

  const handleBlogSaved = () => {
    setEditingBlog(null);
    fetchBlogs();
  };

  const handleFormationSaved = () => {
    setEditingFormation(null);
    setShowFormationFormModal(false);
    fetchFormations(); // Rafraîchit la liste
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'approved':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'rejected':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'partner':
        return 'bg-blue-100 text-blue-800';
      case 'me':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin text-green-600 mx-auto mb-4" />
          <p className="text-gray-600">Chargement du tableau de bord admin...</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500" />
      {/* Header */}
      <div
        className="relative shadow-xl border-b border-white/20"
        style={{
          backgroundImage: "url('https://res.cloudinary.com/drxouwbms/image/upload/v1755949759/Screenshot_2025-08-23_at_11_41_05_1_-Picsart-AiImageEnhancer_kfsp1y.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/40 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-white/20">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white drop-shadow-lg">Tableau de Bord Admin</h1>
              <p className="text-gray-100 mt-2 text-lg drop-shadow">Gérez les utilisateurs et les demandes d'enrôlement</p>
            </div>
            <button
              onClick={() => {
                fetchAdminData();
                fetchEnrollments();
                fetchFormations();
              }}
              className="flex items-center space-x-2 bg-white/20 backdrop-blur-xl text-white px-6 py-3 rounded-xl border border-white/30 hover:bg-white/30 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              <RefreshCw className="w-5 h-5" />
              <span className="font-medium">Actualiser</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation par onglets */}
      <div className="bg-white/70 backdrop-blur-xl border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`py-3 sm:py-4 px-4 sm:px-6 rounded-xl font-medium text-sm transition-all duration-300 ${activeTab === 'dashboard'
                ? 'bg-green-500 text-white shadow-lg'
                : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                }`}
            >
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4" />
                <span>Tableau de Bord</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('formations')}
              className={`py-3 sm:py4 px-4 sm:px-6 rounded-xl font-medium text-sm transition-all duration-300 ${activeTab === 'formations'
                ? 'bg-green-500 text-white shadow-lg'
                : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                }`}
            >
              <div className="flex items-center space-x-2">
                <BookOpen className="w-4 h-4" />
                <span>Formations</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className={`py-3 sm:py-4 px-4 sm:px-6 rounded-xl font-medium text-sm transition-all duration-300 ${activeTab === 'products'
                ? 'bg-green-500 text-white shadow-lg'
                : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                }`}
            >
              <div className="flex items-center space-x-2">
                <Package className="w-4 h-4" />
                <span>Produits</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('blogs')}
              className={`py-3 sm:py-4 px-4 sm:px-6 rounded-xl font-medium text-sm transition-all duration-300 ${activeTab === 'blogs'
                ? 'bg-green-500 text-white shadow-lg'
                : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                }`}
            >
              <div className="flex items-center space-x-2">
                <BookOpen className="w-4 h-4" />
                <span>Blog</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('events')}
              className={`py-3 sm:py-4 px-4 sm:px-6 rounded-xl font-medium text-sm transition-all duration-300 ${activeTab === 'events'
                ? 'bg-green-500 text-white shadow-lg'
                : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                }`}
            >
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>Événements</span>
              </div>
            </button>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Contenu des onglets */}
        {activeTab === 'dashboard' && (
          <>
            {/* Statistiques */}
            {stats && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white/60 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                    <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-600 mb-1">Total Utilisateurs</p>
                      <p className="text-2xl sm:text-3xl font-bold text-gray-900">{stats.totalUsers}</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white/60 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                    <div className="p-3 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl shadow-lg">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-600 mb-1">Enrôlements en Attente</p>
                      <p className="text-2xl sm:text-3xl font-bold text-gray-900">{stats.pendingEnrollments}</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white/60 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                    <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-lg">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-600 mb-1">Enrôlements Approuvés</p>
                      <p className="text-2xl sm:text-3xl font-bold text-gray-900">{stats.approvedEnrollments}</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white/60 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                    <div className="p-3 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl shadow-lg">
                      <Package className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-600 mb-1">Total Produits</p>
                      <p className="text-2xl sm:text-3xl font-bold text-gray-900">{stats.totalProducts}</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}

            {/* Filtres et Liste des Enrôlements */}
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl border border-white/30 shadow-xl">
              <div className="p-4 sm:p-6 border-b border-white/20">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Demandes d'Enrôlement</h2>
                    <p className="text-gray-600 mt-1">Gérez les demandes d'enrôlement des utilisateurs</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setFilter('all')}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${filter === 'all'
                        ? 'bg-green-500 text-white shadow-lg'
                        : 'bg-white/60 text-gray-600 hover:bg-white/80 border border-white/40'
                        }`}
                    >
                      Tous
                    </button>
                    <button
                      onClick={() => setFilter('pending')}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${filter === 'pending'
                        ? 'bg-yellow-500 text-white shadow-lg'
                        : 'bg-white/60 text-gray-600 hover:bg-white/80 border border-white/40'
                        }`}
                    >
                      En Attente
                    </button>
                    <button
                      onClick={() => setFilter('approved')}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${filter === 'approved'
                        ? 'bg-green-500 text-white shadow-lg'
                        : 'bg-white/60 text-gray-600 hover:bg-white/80 border border-white/40'
                        }`}
                    >
                      Approuvés
                    </button>
                    <button
                      onClick={() => setFilter('rejected')}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${filter === 'rejected'
                        ? 'bg-red-500 text-white shadow-lg'
                        : 'bg-white/60 text-gray-600 hover:bg-white/80 border border-white/40'
                        }`}
                    >
                      Rejetés
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-6">
                {enrollmentsLoading ? (
                  <div className="text-center py-8">
                    <RefreshCw className="w-6 h-6 animate-spin text-green-600 mx-auto mb-2" />
                    <p className="text-gray-600">Chargement des enrôlements...</p>
                  </div>
                ) : enrollments.length === 0 ? (
                  <div className="text-center py-8">
                    <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Aucune demande d'enrôlement trouvée</p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-4">
                      {enrollments
                        .slice((enrollmentsCurrentPage - 1) * enrollmentsPerPage, enrollmentsCurrentPage * enrollmentsPerPage)
                        .map((enrollment) => (
                          <motion.div
                            key={enrollment._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white/60 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/40 hover:bg-white/80 transition-all duration-300 hover:shadow-lg"
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center space-x-3 mb-4">
                                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(enrollment.type)}`}>
                                    {enrollment.type === 'partner' ? 'Partenaire' : 'Membre'}
                                  </span>
                                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(enrollment.status)}`}>
                                    {getStatusIcon(enrollment.status)}
                                    <span className="ml-1">
                                      {enrollment.status === 'pending' ? 'En Attente' :
                                        enrollment.status === 'approved' ? 'Approuvé' : 'Rejeté'}
                                    </span>
                                  </span>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                  <div>
                                    <p className="text-sm font-medium text-gray-600">Nom</p>
                                    <p className="text-gray-900">{enrollment.firstName} {enrollment.lastName}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-gray-600">Email</p>
                                    <p className="text-gray-900">{enrollment.email}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-gray-600">Téléphone</p>
                                    <p className="text-gray-900">{enrollment.phone}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-gray-600">Entreprise</p>
                                    <p className="text-gray-900">{enrollment.companyName}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-gray-600">Pays</p>
                                    <p className="text-gray-900">{enrollment.country}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-gray-600">Date</p>
                                    <p className="text-gray-900">
                                      {new Date(enrollment.createdAt).toLocaleDateString('fr-FR')}
                                    </p>
                                  </div>
                                </div>
                              </div>

                              <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 ml-4">
                                {enrollment.status === 'pending' && (
                                  <>
                                    <button
                                      onClick={() => handleEnrollmentAction(enrollment._id, 'approve')}
                                      className="flex items-center justify-center space-x-1 bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                                    >
                                      <CheckCircle className="w-4 h-4" />
                                      <span className="text-sm font-medium">Approuver</span>
                                    </button>
                                    <button
                                      onClick={() => handleEnrollmentAction(enrollment._id, 'reject')}
                                      className="flex items-center justify-center space-x-1 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                                    >
                                      <XCircle className="w-4 h-4" />
                                      <span className="text-sm font-medium">Rejeter</span>
                                    </button>
                                  </>
                                )}
                                <button
                                  onClick={() => handleDeleteEnrollment(enrollment._id)}
                                  className="flex items-center justify-center space-x-1 bg-gradient-to-r from-gray-500 to-gray-600 text-white px-4 py-2 rounded-xl hover:from-gray-600 hover:to-gray-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                                >
                                  <Trash2 className="w-4 h-4" />
                                  <span className="text-sm font-medium">Supprimer</span>
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                    </div>

                    {/* Pagination pour les enrôlements */}
                    {enrollments.length > 0 && (
                      <div className="mt-6">
                        {/* Info sur la pagination */}
                        <div className="text-center mb-4 text-sm text-gray-600">
                          Affichage de {Math.min((enrollmentsCurrentPage - 1) * enrollmentsPerPage + 1, enrollments.length)} à {Math.min(enrollmentsCurrentPage * enrollmentsPerPage, enrollments.length)} sur {enrollments.length} enrôlements
                        </div>

                        <div className="flex justify-center">
                          <nav className="flex items-center space-x-2">
                            <button
                              onClick={() => setEnrollmentsCurrentPage(enrollmentsCurrentPage - 1)}
                              disabled={enrollmentsCurrentPage === 1}
                              className="px-3 py-2 rounded-lg border border-gray-300 text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <ChevronLeft size={20} />
                            </button>

                            {Array.from({ length: Math.ceil(enrollments.length / enrollmentsPerPage) }, (_, i) => i + 1).map((pageNumber) => (
                              <button
                                key={pageNumber}
                                onClick={() => setEnrollmentsCurrentPage(pageNumber)}
                                className={`px-4 py-2 rounded-lg border ${enrollmentsCurrentPage === pageNumber
                                  ? 'bg-green-600 text-white border-green-600'
                                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                                  }`}
                              >
                                {pageNumber}
                              </button>
                            ))}

                            <button
                              onClick={() => setEnrollmentsCurrentPage(enrollmentsCurrentPage + 1)}
                              disabled={enrollmentsCurrentPage === Math.ceil(enrollments.length / enrollmentsPerPage)}
                              className="px-3 py-2 rounded-lg border border-gray-300 text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <ChevronRight size={20} />
                            </button>
                          </nav>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </>
        )}

        {/** Section Formations */}
        {activeTab === 'formations' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold">Formations</h2>
              <button
                onClick={() => {
                  setEditingFormation(null);
                  setShowFormationFormModal(true);

                }}
                className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer relative z-50"
              >
                <PlusIcon className="w-5 h-5" />
                <span className="font-medium">Créer une formation</span>
              </button>
            </div>

            <div className="space-y-6">
              {formations.map(form => (
                <motion.div key={form._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  className="bg-white/70 backdrop-blur-xl rounded-2xl border border-white/30 shadow-xl p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold">{form.title}</h3>
                      <p className="text-sm text-gray-600 flex items-center gap-1"><Calendar className="w-4 h-4" /> {new Date(form.date).toLocaleDateString('fr-FR')}</p>
                      <p className="text-sm text-gray-600 flex items-center gap-1"><MapPin className="w-4 h-4" /> {form.location}</p>
                      <p className="text-sm text-gray-600 mt-2">Places : {form.enrolledUsers.length}/{form.maxSeats}</p>
                    </div>
                    <button onClick={() => { setEditingFormation(form); setShowFormationFormModal(true); }}
                      className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200">
                      <Pencil className="w-4 h-4" />
                    </button>
                  </div>

                  {form.registrations?.filter(r => r.status === 'pending').length > 0 && (
                    <div className="mt-4 border-t pt-4">
                      <p className="font-medium mb-2">Inscriptions en attente :</p>
                      <div className="space-y-2">
                        {form.registrations.filter(r => r.status === 'pending').map(reg => (
                          <div key={reg._id} className="flex items-center justify-between bg-white/50 rounded-lg p-3">
                            <div>
                              <p className="font-medium">{reg.userName}</p>
                              <p className="text-sm text-gray-600">{reg.userEmail}</p>
                            </div>
                            <div className="flex gap-2">
                              <button onClick={() => handleRegistrationAction(form._id, reg._id, 'approve')}
                                className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200">
                                <UserCheck className="w-4 h-4" />
                              </button>
                              <button onClick={() => handleRegistrationAction(form._id, reg._id, 'reject')}
                                className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200">
                                <UserX className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Section Events */}
        {activeTab === 'events' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold">Événements</h2>
              <button
                onClick={() => {
                  setEditingEvent(null);
                  setShowEventFormModal(true);
                }}
                className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer relative z-50"
              >
                <PlusIcon className="w-5 h-5" />
                <span className="font-medium">Créer un événement</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map(event => (
                <motion.div
                  key={event._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/70 backdrop-blur-xl rounded-2xl border border-white/30 shadow-xl p-6 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold text-gray-900">{event.title}</h3>
                      <span className={`px-2 py-1 text-xs rounded-full ${event.isFeatured ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-600'}`}>
                        {event.isFeatured ? 'Featured' : 'Standard'}
                      </span>
                    </div>

                    <p className="text-sm text-gray-600 mb-4 line-clamp-3">{event.description}</p>

                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-green-600" />
                        <span>{new Date(event.dateStart).toLocaleDateString()} - {new Date(event.dateEnd).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-green-600" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-green-600" />
                        <span>{event.maxParticipants} max</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end gap-2">
                    <button
                      onClick={() => handleEditEvent(event)}
                      className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteEvent(event._id!)}
                      className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
              {events.length === 0 && (
                <div className="col-span-full text-center py-10 text-gray-500">
                  Aucun événement trouvé.
                </div>
              )}
            </div>
          </div>
        )}

        {/* Section Produits */}
        {activeTab === 'products' && (
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 mb-6">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Gestion des Produits</h2>
                <p className="text-gray-600 mt-1">Gérez votre catalogue de produits</p>
              </div>

              <button
                onClick={() => {
                  setEditingProduct(null);
                  setShowProductFormModal(true);

                }}
                className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer relative z-50"
              >
                <PlusIcon className="w-5 h-5" />
                <span className="font-medium">Ajouter un produit</span>
              </button>
            </div>

            <div className="bg-white/70 backdrop-blur-xl rounded-2xl border border-white/30 shadow-xl p-6">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-white/20">
                  <thead className="bg-white/50 backdrop-blur-sm">
                    <tr>
                      <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wider">
                        Produit
                      </th>
                      <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wider">
                        Prix
                      </th>
                      <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wider">
                        Stock
                      </th>
                      <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wider">
                        Catégorie
                      </th>
                      <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wider">
                        Statut
                      </th>
                      <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white/30 backdrop-blur-sm divide-y divide-white/20">
                    {products
                      .slice((productsCurrentPage - 1) * productsPerPage, productsCurrentPage * productsPerPage)
                      .map((product) => (
                        <tr key={product._id} className="hover:bg-white/50 transition-all duration-300">
                          <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center space-x-3">
                              {product.images && product.images.length > 0 && (
                                <img
                                  src={product.images[0].url}
                                  alt={product.images[0].alt}
                                  className="h-12 w-12 sm:h-14 sm:w-14 rounded-xl object-cover shadow-md"
                                />
                              )}
                              <div>
                                <div className="text-sm sm:text-base font-semibold text-gray-900">{product.name}</div>
                                <div className="text-xs sm:text-sm text-gray-600">{product.brand}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm sm:text-base font-semibold text-gray-900">
                            {product.price.toFixed(2)} €
                          </td>
                          <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm sm:text-base text-gray-900">
                            {product.stock}
                          </td>
                          <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm sm:text-base text-gray-900">
                            {product.category}
                          </td>
                          <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${product.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                              }`}>
                              {product.isActive ? 'Actif' : 'Inactif'}
                            </span>
                          </td>
                          <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleEditProduct(product)}
                                className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                              >
                                <PencilIcon className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteProduct(product._id)}
                                className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                {products.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    Aucun produit trouvé
                  </div>
                )}
              </div>

              {/* Pagination pour les produits */}
              {products.length > 0 && (
                <div className="mt-6">
                  {/* Info sur la pagination */}
                  <div className="text-center mb-4 text-sm text-gray-600">
                    Affichage de {Math.min((productsCurrentPage - 1) * productsPerPage + 1, products.length)} à {Math.min(productsCurrentPage * productsPerPage, products.length)} sur {products.length} produits
                  </div>

                  <div className="flex justify-center">
                    <nav className="flex items-center space-x-2">
                      <button
                        onClick={() => setProductsCurrentPage(productsCurrentPage - 1)}
                        disabled={productsCurrentPage === 1}
                        className="px-3 py-2 rounded-lg border border-gray-300 text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronLeft size={20} />
                      </button>

                      {Array.from({ length: Math.ceil(products.length / productsPerPage) }, (_, i) => i + 1).map((pageNumber) => (
                        <button
                          key={pageNumber}
                          onClick={() => setProductsCurrentPage(pageNumber)}
                          className={`px-4 py-2 rounded-lg border ${productsCurrentPage === pageNumber
                            ? 'bg-green-600 text-white border-green-600'
                            : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                            }`}
                        >
                          {pageNumber}
                        </button>
                      ))}

                      <button
                        onClick={() => setProductsCurrentPage(productsCurrentPage + 1)}
                        disabled={productsCurrentPage === Math.ceil(products.length / productsPerPage)}
                        className="px-3 py-2 rounded-lg border border-gray-300 text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronRight size={20} />
                      </button>
                    </nav>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Section Blogs */}
        {activeTab === 'blogs' && (
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 mb-6">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Gestion du Blog</h2>
                <p className="text-gray-600 mt-1">Gérez vos articles de blog</p>
              </div>
              <button
                onClick={() => {
                  setEditingBlog(null);
                  setShowBlogFormModal(true);
                }}
                className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer relative z-50"
              >
                <PlusIcon className="w-5 h-5" />
                <span className="font-medium">Ajouter un article</span>
              </button>
            </div>

            <div className="bg-white/70 backdrop-blur-xl rounded-2xl border border-white/30 shadow-xl p-6">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-white/20">
                  <thead className="bg-white/50 backdrop-blur-sm">
                    <tr>
                      <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wider">
                        Article
                      </th>
                      <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wider">
                        Auteur
                      </th>
                      <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wider">
                        Catégorie
                      </th>
                      <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wider">
                        Statut
                      </th>
                      <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white/30 backdrop-blur-sm divide-y divide-white/20">
                    {blogs
                      .slice((blogsCurrentPage - 1) * blogsPerPage, blogsCurrentPage * blogsPerPage)
                      .map((blog) => (
                        <tr key={blog._id} className="hover:bg-white/50 transition-all duration-300">
                          <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center space-x-3">
                              {blog.featuredImage && (
                                <img
                                  src={blog.featuredImage.url}
                                  alt={blog.featuredImage.alt}
                                  className="h-12 w-12 sm:h-14 sm:w-14 rounded-xl object-cover shadow-md"
                                />
                              )}
                              <div>
                                <div className="text-sm sm:text-base font-semibold text-gray-900">{blog.title}</div>
                                <div className="text-xs sm:text-sm text-gray-600">{blog.readTime}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm sm:text-base text-gray-900">
                            {blog.author}
                          </td>
                          <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm sm:text-base text-gray-900">
                            {blog.category}
                          </td>
                          <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${blog.isPublished ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                              }`}>
                              {blog.isPublished ? 'Publié' : 'Brouillon'}
                            </span>
                          </td>
                          <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm sm:text-base text-gray-900">
                            {new Date(blog.createdAt).toLocaleDateString('fr-FR')}
                          </td>
                          <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleEditBlog(blog)}
                                className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                              >
                                <PencilIcon className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteBlog(blog._id)}
                                className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                {blogs.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    Aucun article trouvé
                  </div>
                )}
              </div>

              {/* Pagination pour les blogs */}
              {blogs.length > 0 && (
                <div className="mt-6">
                  {/* Info sur la pagination */}
                  <div className="text-center mb-4 text-sm text-gray-600">
                    Affichage de {Math.min((blogsCurrentPage - 1) * blogsPerPage + 1, blogs.length)} à {Math.min(blogsCurrentPage * blogsPerPage, blogs.length)} sur {blogs.length} articles
                  </div>

                  <div className="flex justify-center">
                    <nav className="flex items-center space-x-2">
                      <button
                        onClick={() => setBlogsCurrentPage(blogsCurrentPage - 1)}
                        disabled={blogsCurrentPage === 1}
                        className="px-3 py-2 rounded-lg border border-gray-300 text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronLeft size={20} />
                      </button>

                      {Array.from({ length: Math.ceil(blogs.length / blogsPerPage) }, (_, i) => i + 1).map((pageNumber) => (
                        <button
                          key={pageNumber}
                          onClick={() => setBlogsCurrentPage(pageNumber)}
                          className={`px-4 py-2 rounded-lg border ${blogsCurrentPage === pageNumber
                            ? 'bg-green-600 text-white border-green-600'
                            : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                            }`}
                        >
                          {pageNumber}
                        </button>
                      ))}

                      <button
                        onClick={() => setBlogsCurrentPage(blogsCurrentPage + 1)}
                        disabled={blogsCurrentPage === Math.ceil(blogs.length / blogsPerPage)}
                        className="px-3 py-2 rounded-lg border border-gray-300 text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronRight size={20} />
                      </button>
                    </nav>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}


      </div>
      {/* Modals */}
      <ProductModal
        isOpen={showProductModal}
        onClose={() => {
          setShowProductModal(false);
          setEditingProduct(null);
        }}
        product={editingProduct}
      />

      <ProductFormModal
        isOpen={showProductFormModal}
        onClose={() => {
          setShowProductFormModal(false);
          setEditingProduct(null);
        }}
        product={editingProduct}
        onProductSaved={handleProductSaved}
      />

      <BlogModal
        isOpen={showBlogModal}
        onClose={() => {
          setShowBlogModal(false);
          setEditingBlog(null);
        }}
        blog={editingBlog}
        onBlogSaved={handleBlogSaved}
      />

      <BlogFormModal
        isOpen={showBlogFormModal}
        onClose={() => {
          setShowBlogFormModal(false);
          setEditingBlog(null);
        }}
        blog={editingBlog}
        onBlogSaved={handleBlogSaved}
      />
      <FormationModal
        isOpen={showFormationModal}
        onClose={() => {
          setShowFormationModal(false);
          setEditingFormation(null);
        }}
        formation={editingFormation} onFormationSaved={function (): void {
          throw new Error('Function not implemented.');
        }} />
      <FormationFormModal
        isOpen={showFormationFormModal}
        onClose={() => {
          setShowFormationFormModal(false);
          setEditingFormation(null);
        }}
        formation={editingFormation}
        onFormationSaved={handleFormationSaved}
      />

      <EventFormModal
        isOpen={showEventFormModal}
        onClose={() => {
          setShowEventFormModal(false);
          setEditingEvent(null);
        }}
        event={editingEvent}
        onEventSaved={handleEventSaved}
      />
    </motion.div>
  );
};

export default AdminDashboard;
