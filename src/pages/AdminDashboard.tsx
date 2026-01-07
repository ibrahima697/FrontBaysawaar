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
import { EventData, Product } from '../types';

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
  const [blogsPerPage] = useState(5);
  const [formationsCurrentPage, setFormationsCurrentPage] = useState(1);
  const [formationsPerPage] = useState(5);
  const [eventsCurrentPage, setEventsCurrentPage] = useState(1);
  const [eventsPerPage] = useState(6);
  const [showFormationModal, setShowFormationModal] = useState(false);
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
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5 pointer-events-none" />
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
      <div className="bg-white/70 backdrop-blur-xl border-b border-white/20 relative z-20">
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10 w-full">
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
                  className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-white/40 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="flex items-center space-x-4">
                    <div className="p-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg shadow-blue-500/20">
                      <Users className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-1">Total Utilisateurs</p>
                      <h3 className="text-3xl font-bold text-gray-900">{stats.totalUsers}</h3>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-white/40 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="flex items-center space-x-4">
                    <div className="p-4 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl shadow-lg shadow-orange-500/20">
                      <Clock className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-1">En Attente</p>
                      <h3 className="text-3xl font-bold text-gray-900">{stats.pendingEnrollments}</h3>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-white/40 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="flex items-center space-x-4">
                    <div className="p-4 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-lg shadow-green-500/20">
                      <CheckCircle className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-1">Approuvés</p>
                      <h3 className="text-3xl font-bold text-gray-900">{stats.approvedEnrollments}</h3>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-white/40 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="flex items-center space-x-4">
                    <div className="p-4 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl shadow-lg shadow-purple-500/20">
                      <Package className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-1">Produits</p>
                      <h3 className="text-3xl font-bold text-gray-900">{stats.totalProducts}</h3>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}

            {/* Filtres et Liste des Enrôlements */}
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-white/40 shadow-xl overflow-hidden">
              <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Demandes d'Enrôlement</h2>
                    <p className="text-gray-500 mt-1">Gérez et suivez les demandes d'inscription</p>
                  </div>
                  <div className="flex bg-gray-100 p-1 rounded-xl">
                    {['all', 'pending', 'approved', 'rejected'].map((status) => (
                      <button
                        key={status}
                        onClick={() => setFilter(status as any)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 capitalize ${filter === status
                          ? 'bg-white text-gray-900 shadow-sm'
                          : 'text-gray-500 hover:text-gray-700'
                          }`}
                      >
                        {status === 'all' ? 'Tous' :
                          status === 'pending' ? 'En attente' :
                            status === 'approved' ? 'Approuvés' : 'Rejetés'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6">
                {enrollmentsLoading ? (
                  <div className="flex flex-col items-center justify-center py-12">
                    <div className="w-12 h-12 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mb-4" />
                    <p className="text-gray-500 font-medium">Chargement des données...</p>
                  </div>
                ) : enrollments.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                      <BookOpen className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">Aucune demande trouvée</h3>
                    <p className="text-gray-500 mt-1">Essayez de modifier vos filtres</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {enrollments
                      .slice((enrollmentsCurrentPage - 1) * enrollmentsPerPage, enrollmentsCurrentPage * enrollmentsPerPage)
                      .map((enrollment) => (
                        <motion.div
                          key={enrollment._id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-white rounded-xl border border-gray-100 p-5 hover:border-green-200 hover:shadow-md transition-all duration-300"
                        >
                          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                            {/* User Info */}
                            <div className="flex-1">
                              <div className="flex items-center justify-between lg:justify-start gap-4 mb-4">
                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${getTypeColor(enrollment.type)}`}>
                                  {enrollment.type === 'partner' ? 'Partenaire' : 'Membre'}
                                </span>
                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${getStatusColor(enrollment.status)}`}>
                                  {enrollment.status === 'pending' ? 'En Attente' :
                                    enrollment.status === 'approved' ? 'Approuvé' : 'Rejeté'}
                                </span>
                              </div>

                              <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
                                <div>
                                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Demandeur</label>
                                  <p className="font-semibold text-gray-900 mt-1">{enrollment.firstName} {enrollment.lastName}</p>
                                  <p className="text-sm text-gray-500">{enrollment.email}</p>
                                </div>
                                <div>
                                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Entreprise</label>
                                  <p className="font-medium text-gray-900 mt-1">{enrollment.companyName || '-'}</p>
                                  <p className="text-sm text-gray-500">{enrollment.country}</p>
                                </div>
                                <div>
                                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Contact</label>
                                  <p className="font-medium text-gray-900 mt-1">{enrollment.phone}</p>
                                </div>
                                <div>
                                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Date</label>
                                  <p className="font-medium text-gray-900 mt-1">{new Date(enrollment.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                                </div>
                              </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-2 border-t lg:border-t-0 lg:border-l border-gray-100 pt-4 lg:pt-0 lg:pl-6">
                              {enrollment.status === 'pending' && (
                                <>
                                  <button
                                    onClick={() => handleEnrollmentAction(enrollment._id, 'approve')}
                                    className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors tooltip"
                                    title="Approuver"
                                  >
                                    <CheckCircle className="w-5 h-5" />
                                  </button>
                                  <button
                                    onClick={() => handleEnrollmentAction(enrollment._id, 'reject')}
                                    className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors tooltip"
                                    title="Rejeter"
                                  >
                                    <XCircle className="w-5 h-5" />
                                  </button>
                                </>
                              )}
                              <button
                                onClick={() => handleDeleteEnrollment(enrollment._id)}
                                className="p-2 bg-gray-50 text-gray-500 rounded-lg hover:bg-gray-100 transition-colors tooltip"
                                title="Supprimer"
                              >
                                <Trash2 className="w-5 h-5" />
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                  </div>
                )}

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
              </div>
            </div>
          </>
        )}

        {/** Section Formations */}
        {activeTab === 'formations' && (
          <div>
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Formations</h2>
                <p className="text-gray-500 mt-2">Gérez vos sessions de formation et les inscriptions</p>
              </div>
              <button
                onClick={() => {
                  setEditingFormation(null);
                  setShowFormationFormModal(true);

                }}
                className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                <PlusIcon className="w-5 h-5" />
                <span className="font-medium">Créer une formation</span>
              </button>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {formations
                .slice((formationsCurrentPage - 1) * formationsPerPage, formationsCurrentPage * formationsPerPage)
                .map(form => (
                  <motion.div
                    key={form._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex flex-col lg:flex-row gap-6">
                      {/* Formation Info */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{form.title}</h3>
                            <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                              <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-blue-500" /> {new Date(form.date).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</span>
                              <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-red-500" /> {form.location}</span>
                            </div>
                            <p className="text-gray-600 leading-relaxed mb-4">{form.description}</p>
                          </div>
                          <button
                            onClick={() => { setEditingFormation(form); setShowFormationFormModal(true); }}
                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <Pencil className="w-5 h-5" />
                          </button>
                        </div>

                        {/* Progress Bar for Seats */}
                        <div className="mb-6">
                          <div className="flex justify-between text-sm mb-1.5">
                            <span className="font-medium text-gray-700">Participants</span>
                            <span className="font-medium text-gray-900">{form.enrolledUsers.length} / {form.maxSeats}</span>
                          </div>
                          <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                            <div
                              className="bg-green-500 h-2.5 rounded-full transition-all duration-500 ease-out"
                              style={{ width: `${Math.min((form.enrolledUsers.length / form.maxSeats) * 100, 100)}%` }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Registrations List Section - Right Side on large screens */}
                      <div className="lg:w-96 lg:border-l lg:border-gray-100 lg:pl-6">
                        <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                          <UserCheck className="w-4 h-4 text-gray-400" />
                          Inscriptions en attente
                          {form.registrations?.filter(r => r.status === 'pending').length > 0 && (
                            <span className="bg-orange-100 text-orange-600 text-xs px-2 py-0.5 rounded-full font-bold">
                              {form.registrations.filter(r => r.status === 'pending').length}
                            </span>
                          )}
                        </h4>

                        {form.registrations && form.registrations.filter(r => r.status === 'pending').length > 0 ? (
                          <div className="space-y-3 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                            {form.registrations.filter(r => r.status === 'pending').map(reg => (
                              <div key={reg._id} className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                                <div className="flex justify-between items-start mb-2">
                                  <div>
                                    <p className="text-sm font-semibold text-gray-900">{reg.userName}</p>
                                    <p className="text-xs text-gray-500 truncate max-w-[150px]">{reg.userEmail}</p>
                                  </div>
                                  <div className="text-xs text-gray-400 top-0.5 relative">
                                    {new Date(reg.registeredAt).toLocaleDateString('fr-FR')}
                                  </div>
                                </div>
                                <div className="flex gap-2 mt-3">
                                  <button
                                    onClick={() => handleRegistrationAction(form._id, reg._id, 'approve')}
                                    className="flex-1 py-1.5 bg-green-500 text-white text-xs font-medium rounded-lg hover:bg-green-600 transition-colors"
                                  >
                                    Valider
                                  </button>
                                  <button
                                    onClick={() => handleRegistrationAction(form._id, reg._id, 'reject')}
                                    className="flex-1 py-1.5 bg-white border border-gray-200 text-gray-600 text-xs font-medium rounded-lg hover:bg-gray-50 hover:text-red-500 transition-colors"
                                  >
                                    Refuser
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-8 bg-gray-50/50 rounded-xl border border-dashed border-gray-200">
                            <p className="text-sm text-gray-400">Aucune demande en attente</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
            </div>

            {/* Pagination for Formations */}
            {formations.length > 0 && (
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/50 backdrop-blur-sm p-4 rounded-xl border border-gray-100">
                <div className="text-sm text-gray-500 font-medium">
                  Affichage de <span className="font-semibold text-gray-900">{Math.min((formationsCurrentPage - 1) * formationsPerPage + 1, formations.length)}</span> à <span className="font-semibold text-gray-900">{Math.min(formationsCurrentPage * formationsPerPage, formations.length)}</span> sur <span className="font-semibold text-gray-900">{formations.length}</span> formations
                </div>

                <nav className="flex items-center space-x-1">
                  <button
                    onClick={() => setFormationsCurrentPage(formationsCurrentPage - 1)}
                    disabled={formationsCurrentPage === 1}
                    className="p-2 rounded-lg border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm transition-all"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <div className="flex items-center space-x-1 px-2">
                    {Array.from({ length: Math.ceil(formations.length / formationsPerPage) }, (_, i) => i + 1).map((pageNum) => (
                      <button
                        key={pageNum}
                        onClick={() => setFormationsCurrentPage(pageNum)}
                        className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium transition-all ${formationsCurrentPage === pageNum
                          ? 'bg-green-600 text-white shadow-md shadow-green-200'
                          : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                          }`}
                      >
                        {pageNum}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setFormationsCurrentPage(formationsCurrentPage + 1)}
                    disabled={formationsCurrentPage === Math.ceil(formations.length / formationsPerPage)}
                    className="p-2 rounded-lg border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm transition-all"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </nav>
              </div>
            )}
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
                className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer"
              >
                <PlusIcon className="w-5 h-5" />
                <span className="font-medium">Créer un événement</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events
                .slice((eventsCurrentPage - 1) * eventsPerPage, eventsCurrentPage * eventsPerPage)
                .map(event => (
                  <motion.div
                    key={event._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/80 backdrop-blur-xl rounded-2xl border border-white/50 shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-300 flex flex-col"
                  >
                    <div className="relative h-40 w-full overflow-hidden bg-gray-100">
                      {event.images && event.images.length > 0 ? (
                        <img
                          src={event.images[0].url}
                          alt={event.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">
                          <Calendar className="w-12 h-12 opacity-50" />
                        </div>
                      )}
                      <div className="absolute top-4 right-4">
                        <span className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full shadow-md ${event.isFeatured ? 'bg-yellow-400 text-yellow-900' : 'bg-gray-200 text-gray-700'}`}>
                          {event.isFeatured ? 'Mise en avant' : 'Standard'}
                        </span>
                      </div>
                      <div className="absolute bottom-4 left-4">
                        <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full shadow-md bg-white/90 text-gray-800 backdrop-blur-sm">
                          {event.type || 'Événement'}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 flex-1 flex flex-col">
                      <div className="mb-4">
                        <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight line-clamp-1">{event.title}</h3>
                        <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">{event.description}</p>
                      </div>

                      <div className="mt-auto space-y-3 pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                          <div className="p-2 bg-green-50 rounded-lg text-green-600 flex-shrink-0"><Calendar className="w-4 h-4" /></div>
                          <span className="font-medium truncate">{new Date(event.dateStart).toLocaleDateString('fr-FR')} - {new Date(event.dateEnd).toLocaleDateString('fr-FR')}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                          <div className="p-2 bg-blue-50 rounded-lg text-blue-600 flex-shrink-0"><MapPin className="w-4 h-4" /></div>
                          <span className="font-medium truncate">{event.location}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                          <div className="p-2 bg-purple-50 rounded-lg text-purple-600 flex-shrink-0"><Users className="w-4 h-4" /></div>
                          <span className="font-medium">{event.maxParticipants} participants max</span>
                        </div>
                      </div>

                      <div className="mt-6 flex gap-3">
                        <button
                          onClick={() => handleEditEvent(event)}
                          className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-medium text-sm"
                        >
                          <Pencil className="w-4 h-4" /> Éditer
                        </button>
                        <button
                          onClick={() => event._id && handleDeleteEvent(event._id)}
                          className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors font-medium text-sm"
                        >
                          <Trash2 className="w-4 h-4" /> Supprimer
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </div>

            {/* Pagination for Events */}
            {events.length > 0 && (
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/50 backdrop-blur-sm p-4 rounded-xl border border-gray-100">
                <div className="text-sm text-gray-500 font-medium">
                  Affichage de <span className="font-semibold text-gray-900">{Math.min((eventsCurrentPage - 1) * eventsPerPage + 1, events.length)}</span> à <span className="font-semibold text-gray-900">{Math.min(eventsCurrentPage * eventsPerPage, events.length)}</span> sur <span className="font-semibold text-gray-900">{events.length}</span> événements
                </div>

                <nav className="flex items-center space-x-1">
                  <button
                    onClick={() => setEventsCurrentPage(eventsCurrentPage - 1)}
                    disabled={eventsCurrentPage === 1}
                    className="p-2 rounded-lg border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm transition-all"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <div className="flex items-center space-x-1 px-2">
                    {Array.from({ length: Math.ceil(events.length / eventsPerPage) }, (_, i) => i + 1).map((pageNum) => (
                      <button
                        key={pageNum}
                        onClick={() => setEventsCurrentPage(pageNum)}
                        className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium transition-all ${eventsCurrentPage === pageNum
                          ? 'bg-green-600 text-white shadow-md shadow-green-200'
                          : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                          }`}
                      >
                        {pageNum}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setEventsCurrentPage(eventsCurrentPage + 1)}
                    disabled={eventsCurrentPage === Math.ceil(events.length / eventsPerPage)}
                    className="p-2 rounded-lg border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm transition-all"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </nav>
              </div>
            )}
            {events.length === 0 && (
              <div className="col-span-full py-16 text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-6">
                  <Calendar className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Aucun événement</h3>
                <p className="text-gray-500 max-w-sm mx-auto mb-6">Commencez par créer votre premier événement pour le voir apparaître ici.</p>
                <button
                  onClick={() => {
                    setEditingEvent(null);
                    setShowEventFormModal(true);
                  }}
                  className="inline-flex items-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition shadow-lg"
                >
                  <PlusIcon className="w-5 h-5" />
                  <span className="font-medium">Créer un événement</span>
                </button>
              </div>
            )}
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

            <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-white/40 shadow-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-100">
                  <thead className="bg-gray-50/50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Produit
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Prix
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Stock
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Catégorie
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Statut
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 bg-white/40">
                    {products
                      .slice((productsCurrentPage - 1) * productsPerPage, productsCurrentPage * productsPerPage)
                      .map((product) => (
                        <tr key={product._id} className="hover:bg-white/80 transition-colors duration-200">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center space-x-4">
                              <div className="flex-shrink-0 h-12 w-12 rounded-xl bg-gray-100 overflow-hidden shadow-sm border border-white">
                                {product.images && product.images.length > 0 ? (
                                  <img
                                    src={product.images[0].url}
                                    alt={product.images[0].alt}
                                    className="h-full w-full object-cover"
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center text-gray-300">
                                    <Package className="w-6 h-6" />
                                  </div>
                                )}
                              </div>
                              <div>
                                <div className="text-sm font-bold text-gray-900">{product.name}</div>
                                <div className="text-xs text-gray-500 mt-0.5">{product.brand}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-sm font-semibold text-gray-900 bg-green-50 text-green-700 px-2 py-1 rounded-lg">
                              {product.price.toFixed(2)} €
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <span className={`text-sm font-medium ${product.stock < 10 ? 'text-red-600' : 'text-gray-700'}`}>
                                {product.stock}
                              </span>
                              <span className="ml-1 text-xs text-gray-400">unités</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                              {product.category}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-medium border ${product.isActive
                              ? 'bg-green-50 text-green-700 border-green-200'
                              : 'bg-gray-50 text-gray-600 border-gray-200'
                              }`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${product.isActive ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                              <span>{product.isActive ? 'Actif' : 'Inactif'}</span>
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex justify-end space-x-2">
                              <button
                                onClick={() => handleEditProduct(product)}
                                className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                                title="Modifier"
                              >
                                <PencilIcon className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteProduct(product._id)}
                                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                                title="Supprimer"
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
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                      <Package className="w-8 h-8 text-gray-300" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">Aucun produit</h3>
                    <p className="text-gray-500 mt-1 max-w-sm">Créez votre premier produit pour commencer à vendre.</p>
                  </div>
                )}
              </div>

              {/* Pagination Styled */}
              {products.length > 0 && (
                <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-sm text-gray-500 font-medium">
                    Affichage de <span className="font-semibold text-gray-900">{Math.min((productsCurrentPage - 1) * productsPerPage + 1, products.length)}</span> à <span className="font-semibold text-gray-900">{Math.min(productsCurrentPage * productsPerPage, products.length)}</span> sur <span className="font-semibold text-gray-900">{products.length}</span> résultats
                  </div>

                  <nav className="flex items-center space-x-1">
                    <button
                      onClick={() => setProductsCurrentPage(productsCurrentPage - 1)}
                      disabled={productsCurrentPage === 1}
                      className="p-2 rounded-lg border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm transition-all"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>

                    <div className="flex items-center space-x-1 px-2">
                      {Array.from({ length: Math.ceil(products.length / productsPerPage) }, (_, i) => i + 1).map((pageNum) => (
                        <button
                          key={pageNum}
                          onClick={() => setProductsCurrentPage(pageNum)}
                          className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium transition-all ${productsCurrentPage === pageNum
                            ? 'bg-green-600 text-white shadow-md shadow-green-200'
                            : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                            }`}
                        >
                          {pageNum}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={() => setProductsCurrentPage(productsCurrentPage + 1)}
                      disabled={productsCurrentPage === Math.ceil(products.length / productsPerPage)}
                      className="p-2 rounded-lg border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm transition-all"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </nav>
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

            <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-white/40 shadow-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-100">
                  <thead className="bg-gray-50/50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Article
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Auteur
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Catégorie
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Statut
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 bg-white/40">
                    {blogs
                      .slice((blogsCurrentPage - 1) * blogsPerPage, blogsCurrentPage * blogsPerPage)
                      .map((blog) => (
                        <tr key={blog._id} className="hover:bg-white/80 transition-colors duration-200">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center space-x-4">
                              <div className="flex-shrink-0 h-12 w-12 rounded-xl bg-gray-100 overflow-hidden shadow-sm border border-white">
                                {blog.featuredImage ? (
                                  <img
                                    src={blog.featuredImage.url}
                                    alt={blog.featuredImage.alt}
                                    className="h-full w-full object-cover"
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center text-gray-300">
                                    <BookOpen className="w-6 h-6" />
                                  </div>
                                )}
                              </div>
                              <div className="min-w-0 max-w-xs">
                                <div className="text-sm font-bold text-gray-900 truncate">{blog.title}</div>
                                <div className="text-xs text-gray-500 mt-0.5">{blog.readTime} min de lecture</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-6 w-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold mr-2">
                                {blog.author.charAt(0)}
                              </div>
                              <span className="text-sm text-gray-700">{blog.author}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-50 text-purple-700">
                              {blog.category}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-medium border ${blog.isPublished
                              ? 'bg-green-50 text-green-700 border-green-200'
                              : 'bg-yellow-50 text-yellow-700 border-yellow-200'
                              }`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${blog.isPublished ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
                              <span>{blog.isPublished ? 'Publié' : 'Brouillon'}</span>
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(blog.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex justify-end space-x-2">
                              <button
                                onClick={() => handleEditBlog(blog)}
                                className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                                title="Modifier"
                              >
                                <PencilIcon className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteBlog(blog._id)}
                                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                                title="Supprimer"
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
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                      <BookOpen className="w-8 h-8 text-gray-300" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">Aucun article</h3>
                    <p className="text-gray-500 mt-1 max-w-sm">Rédigez votre premier article de blog pour partager vos actualités.</p>
                  </div>
                )}
              </div>

              {/* Pagination Styled */}
              {blogs.length > 0 && (
                <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-sm text-gray-500 font-medium">
                    Affichage de <span className="font-semibold text-gray-900">{Math.min((blogsCurrentPage - 1) * blogsPerPage + 1, blogs.length)}</span> à <span className="font-semibold text-gray-900">{Math.min(blogsCurrentPage * blogsPerPage, blogs.length)}</span> sur <span className="font-semibold text-gray-900">{blogs.length}</span> résultats
                  </div>

                  <nav className="flex items-center space-x-1">
                    <button
                      onClick={() => setBlogsCurrentPage(blogsCurrentPage - 1)}
                      disabled={blogsCurrentPage === 1}
                      className="p-2 rounded-lg border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm transition-all"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>

                    <div className="flex items-center space-x-1 px-2">
                      {Array.from({ length: Math.min(5, Math.ceil(blogs.length / blogsPerPage)) }, (_, i) => {
                        let pageNum = i + 1;
                        return (
                          <button
                            key={pageNum}
                            onClick={() => setBlogsCurrentPage(pageNum)}
                            className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium transition-all ${blogsCurrentPage === pageNum
                              ? 'bg-green-600 text-white shadow-md shadow-green-200'
                              : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                              }`}
                          >
                            {pageNum}
                          </button>
                        )
                      })}
                    </div>

                    <button
                      onClick={() => setBlogsCurrentPage(blogsCurrentPage + 1)}
                      disabled={blogsCurrentPage === Math.ceil(blogs.length / blogsPerPage)}
                      className="p-2 rounded-lg border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm transition-all"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </nav>
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
    </motion.div >
  );
};

export default AdminDashboard;
