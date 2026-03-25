import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { blogsAPI } from '../services/api';

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
  readTime: string;
  metaDescription: string;
  slug: string;
  isPublished: boolean;
  publishedAt: string;
  createdAt: string;
}

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('latest');
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  useEffect(() => {
    fetchBlogs();
  }, []);

  useEffect(() => {
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchQuery, selectedCategory, sortBy]);

  const fetchBlogs = async () => {
    try {
      const response = await blogsAPI.getAllBlogs();
      setBlogs(response.data.blogs || []);
    } catch (error) {
      console.error('Erreur lors du chargement des blogs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Filtrer les blogs publiés
  const publishedBlogs = blogs.filter(blog => blog.isPublished);

  // Extraire les tags dynamiquement à partir des blogs publiés
  const categories = [
    { id: 'all', name: 'Tous les Articles', count: publishedBlogs.length },
    ...Array.from(new Set(publishedBlogs.flatMap(post => post.tags || [])))
      .map(tag => ({
        id: tag,
        name: tag,
        count: publishedBlogs.filter(post => post.tags?.includes(tag)).length
      }))
      .sort((a, b) => b.count - a.count)
  ];

  // Filtrer les blogs en fonction de la recherche et du tag sélectionné
  const filteredBlogs = publishedBlogs.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // Si selectedCategory est 'all', on accepte tout. Sinon on vérifie si le tag est présent.
    const matchesTag = selectedCategory === 'all' || 
                       (post.tags && post.tags.includes(selectedCategory));
    
    return matchesSearch && matchesTag;
  });

  // Trier les blogs filtrés avant de les séparer
  const sortedFilteredBlogs = [...filteredBlogs].sort((a, b) => {
    if (sortBy === 'latest') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else if (sortBy === 'oldest') {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    } else if (sortBy === 'title') {
      return a.title.localeCompare(b.title);
    }
    return 0;
  });

  // Article à la Une : le premier de la liste triée
  const featuredPost = sortedFilteredBlogs[0];

  // Autres articles pour la grille : le reste de la liste triée
  const sortedPosts = sortedFilteredBlogs.slice(1);



  const getCategoryColor = (category: string) => {
    const colors = {
      'Stratégie d\'Entreprise': 'bg-green-100 text-green-800',
      'Technologie': 'bg-blue-100 text-blue-800',
      'Aperçu du Marché': 'bg-purple-100 text-purple-800',
      'Histoires de Réussite': 'bg-orange-100 text-orange-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen "
    >
      {/* Hero Section */}
      <section className="relative pt-16 pb-12 sm:py-20 md:py-24 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(https://res.cloudinary.com/drxouwbms/image/upload/v1755949759/Screenshot_2025-08-23_at_11_41_05_1_-Picsart-AiImageEnhancer_kfsp1y.png)' }}>
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/50"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
              Actualités <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">Business</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-3xl mx-auto px-2 sm:px-0">
              Analyses d'experts, études de marché et success stories de l'écosystème entrepreneurial africain.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Article */}
      {featuredPost && (
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-8 sm:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">Article à la Une</h2>
            <p className="text-gray-600 text-sm sm:text-base">Nos dernières analyses importantes</p>
          </motion.div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-xl sm:rounded-2xl shadow-2xl"
          >
            <div className="relative h-64 sm:h-80 md:h-96 lg:h-[500px]">
              <img
                src={featuredPost?.featuredImage?.url || 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1200'}
                alt={featuredPost?.featuredImage?.alt || featuredPost?.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50" />
              
              <div className="absolute inset-0 flex items-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                  <div className="max-w-3xl text-white">
                    <span className={`inline-block px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4 ${getCategoryColor(featuredPost?.category || '')} text-gray-900 bg-white`}>
                      {featuredPost?.category || 'Article'}
                    </span>
                    <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-bold mb-3 sm:mb-4 leading-tight">
                      {featuredPost?.title || 'Article en vedette'}
                    </h3>
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-4 sm:mb-6 opacity-90 leading-relaxed">
                      {featuredPost?.metaDescription || featuredPost?.content?.substring(0, 200) + '...' || 'Découvrez cet article intéressant.'}
                    </p>
                    <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-6 mb-4 sm:mb-6 text-xs sm:text-sm">
                      <div className="flex items-center space-x-2">
                        <User size={14} className="sm:w-4 sm:h-4" />
                        <span>{featuredPost?.author || 'Auteur'}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar size={14} className="sm:w-4 sm:h-4" />
                        <span>{featuredPost ? new Date(featuredPost.createdAt).toLocaleDateString() : new Date().toLocaleDateString()}</span>
                      </div>
                      <span>{featuredPost?.readTime || '5 min de lecture'}</span>
                    </div>
                    <Link
                      to={`/blog/${featuredPost?._id || 'featured'}`}
                      className="inline-flex items-center space-x-2 bg-green-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold hover:bg-green-700 transition-colors duration-200 text-sm sm:text-base"
                    >
                      <span>Lire l'Article</span>
                      <ArrowRight size={14} className="sm:w-4 sm:h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      )}

      {/* Filters and Search */}
      <section className="py-6 sm:py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Responsive Filters/Search Layout */}
          <div className="flex flex-col gap-4 md:gap-6">
            {/* Search Bar */}
            <div className="w-full flex">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Rechercher des articles par titre, contenu ou tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-base bg-white transition shadow-sm"
                />
              </div>
            </div>
            {/* Filters Row */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-6">
              {/* Categories */}
              <div className="flex flex-wrap gap-2 md:gap-3">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium transition-colors duration-200 border ${
                      selectedCategory === category.id
                        ? 'bg-green-600 text-white border-green-600 shadow'
                        : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    {category.name} <span className="hidden sm:inline">({category.count})</span>
                  </button>
                ))}
              </div>
              {/* Sort */}
              <div className="flex items-center gap-2 mt-2 md:mt-0">
                <label htmlFor="sort" className="text-sm text-gray-600 font-medium hidden sm:inline">Trier:</label>
                <select
                  id="sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm bg-white"
                >
                  <option value="latest">Plus Récents</option>
                  <option value="oldest">Plus Anciens</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {sortedPosts.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500 text-lg">Aucun article trouvé pour le moment.</p>
              </div>
            ) : (
              sortedPosts
                .slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage)
                .map((post, index) => (
              <motion.article
                key={post._id}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-white border border-gray-200 rounded-xl sm:rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={post.featuredImage?.url || 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800'}
                    alt={post.featuredImage?.alt || post.title}
                    className="w-full h-40 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
                    <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(post.category)}`}>
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 leading-tight group-hover:text-green-600 transition-colors duration-200">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-3 sm:mb-4 leading-relaxed text-sm sm:text-base">
                    {post.metaDescription || post.content?.substring(0, 150) + '...' || 'Découvrez cet article intéressant.'}
                  </p>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4 space-y-1 sm:space-y-0">
                    <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-4">
                      <div className="flex items-center space-x-1">
                        <User size={12} className="sm:w-3.5 sm:h-3.5" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar size={12} className="sm:w-3.5 sm:h-3.5" />
                        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <span>{post.readTime || '5 min de lecture'}</span>
                  </div>

                  <Link
                    to={`/blog/${post._id}`}
                    className="inline-flex items-center space-x-2 text-green-600 font-semibold hover:text-green-700 transition-colors duration-200 text-sm sm:text-base"
                  >
                    <span>Lire Plus</span>
                    <ArrowRight size={14} className="sm:w-4 sm:h-4" />
                  </Link>
                </div>
              </motion.article>
            ))
            )}
          </div>

          {/* Pagination */}
          {sortedPosts.length > 0 && (
            <div className="mt-12">
              {/* Info sur la pagination */}
              <div className="text-center mb-4 text-sm text-gray-600">
                Affichage de {Math.min((currentPage - 1) * postsPerPage + 1, sortedPosts.length)} à {Math.min(currentPage * postsPerPage, sortedPosts.length)} sur {sortedPosts.length} articles
              </div>
              
              <div className="flex justify-center">
              <nav className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-2 rounded-lg border border-gray-300 text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft size={20} />
                </button>

                {Array.from({ length: Math.ceil(sortedPosts.length / postsPerPage) }, (_, i) => i + 1).map((pageNumber) => (
                  <button
                    key={pageNumber}
                    onClick={() => setCurrentPage(pageNumber)}
                    className={`px-4 py-2 rounded-lg border ${
                      currentPage === pageNumber
                        ? 'bg-green-600 text-white border-green-600'
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {pageNumber}
                  </button>
                ))}

                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === Math.ceil(sortedPosts.length / postsPerPage)}
                  className="px-3 py-2 rounded-lg border border-gray-300 text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight size={20} />
                </button>
              </nav>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Subscription */}
     
    </motion.div>
  );
};

export default Blog;