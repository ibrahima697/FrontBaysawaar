import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ArrowLeft, Calendar, User, Clock, Share2, Facebook, Twitter, Linkedin, BookOpen, Tag } from 'lucide-react';
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

const BlogPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchBlogPost();
    }
  }, [id]);

  const fetchBlogPost = async () => {
    try {
      setLoading(true);
      setError(null);

      // Récupérer l'article principal
      const response = await blogsAPI.getBlogById(id!);

      if (!response.data.blog) {
        throw new Error('Article non trouvé');
      }

      setPost(response.data.blog);

      // Récupérer les articles liés (même catégorie, excluant l'article actuel)
      const relatedResponse = await blogsAPI.getAllBlogs();
      const allBlogs = relatedResponse.data.blogs || [];
      const related = allBlogs
        .filter((relatedBlog: BlogPost) =>
          relatedBlog._id !== id &&
          relatedBlog.category === response.data.blog.category &&
          relatedBlog.isPublished
        )
        .slice(0, 2);
      setRelatedPosts(related);

    } catch (error: any) {
      console.error('Erreur lors du chargement de l\'article:', error);
      setError('Article non trouvé ou erreur de chargement');
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Impossible de charger l\'article',
        confirmButtonColor: '#dc2626',
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement de l'article...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Article non trouvé</h1>
          <p className="text-gray-600 mb-6">L'article que vous recherchez n'existe pas ou a été supprimé.</p>
          <Link
            to="/blog"
            className="inline-flex items-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            <ArrowLeft size={16} />
            <span>Retour au blog</span>
          </Link>
        </div>
      </div>
    );
  }


  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = post.title;

    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
    };

    window.open(shareUrls[platform as keyof typeof shareUrls], '_blank', 'width=600,height=400');
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'Business Strategy': 'bg-green-100 text-green-800',
      'Technology': 'bg-blue-100 text-blue-800',
      'Market Insights': 'bg-purple-100 text-purple-800',
      'Success Stories': 'bg-orange-100 text-orange-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen "
    >
      {/* Back Navigation */}
      <section
        className="py-16 relative"
        style={{
          backgroundImage: "url('https://res.cloudinary.com/drxouwbms/image/upload/v1755949759/Screenshot_2025-08-23_at_11_41_05_1_-Picsart-AiImageEnhancer_kfsp1y.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="absolute inset-0 bg-gray-900/60 pointer-events-none" aria-hidden="true"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-green-600/80 border border-white/20 shadow-xl backdrop-blur-md text-white hover:bg-white/10 hover:text-green-100 hover:shadow-lg transition-all duration-200 font-semibold group"
            style={{
              marginTop: '-2.5rem',
              position: 'absolute',
              left: '1rem',
              top: '1rem',
            }}
          >
            <span className="flex items-center justify-center w-7 h-7 rounded-full bg-white/90 text-green-600 group-hover:bg-green-600/80 group-hover:text-white transition-colors duration-200">
              <ArrowLeft size={18} />
            </span>
            <span className="hidden sm:inline">Back to Blog</span>
            <span className="sr-only">Back to Blog</span>
          </Link>
        </div>
      </section>

      {/* Article Header */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-4 ${getCategoryColor(post.category)}`}>
              {post.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-gray-600 mb-8">
              <div className="flex items-center space-x-2">
                <User size={16} />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar size={16} />
                <span>{new Date(post.publishedAt || post.createdAt).toLocaleDateString('fr-FR')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock size={16} />
                <span>{post.readTime || '5 min read'}</span>
              </div>
            </div>

            {/* Share Buttons */}
            <div className="flex items-center justify-center space-x-4">
              <span className="text-sm text-gray-600 flex items-center space-x-2">
                <Share2 size={16} />
                <span>Share:</span>
              </span>
              <button
                onClick={() => handleShare('facebook')}
                className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors duration-200"
              >
                <Facebook size={16} />
              </button>
              <button
                onClick={() => handleShare('twitter')}
                className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center text-white hover:bg-blue-500 transition-colors duration-200"
              >
                <Twitter size={16} />
              </button>
              <button
                onClick={() => handleShare('linkedin')}
                className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center text-white hover:bg-blue-800 transition-colors duration-200"
              >
                <Linkedin size={16} />
              </button>
            </div>
          </motion.div>

          {/* Featured Image */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mb-12"
          >
            <img
              src={post.featuredImage?.url || 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1200'}
              alt={post.featuredImage?.alt || post.title}
              className="w-full h-96 object-cover rounded-2xl shadow-2xl"
            />
          </motion.div>
        </div>
      </section>

      {/* Article Content */}
      <section className="pb-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="prose prose-lg prose-green max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
            style={{
              fontSize: '18px',
              lineHeight: '1.8',
              color: '#374151'
            }}
          />
        </div>
      </section>

      {/* Gallery Section */}
      {post.gallery && post.gallery.length > 0 && (
        <section className="py-12 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Photos de l'Article</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {post.gallery.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="relative group rounded-3xl overflow-hidden shadow-xl"
                  style={{ height: '300px' }}
                >
                  <img
                    src={image.url}
                    alt={image.alt || `Gallery image ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  {image.caption && (
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white text-sm font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      {image.caption}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Tags */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center space-x-2">
            <Tag className="text-gray-600" size={20} />
            <span className="text-gray-600 font-medium">Tags:</span>
            {post.tags && post.tags.length > 0 ? (
              post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full"
                >
                  {tag}
                </span>
              ))
            ) : (
              <span className="text-gray-500 text-sm">Aucun tag</span>
            )}
          </div>
        </div>
      </section>

      {/* Author Bio */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gray-50 rounded-2xl p-8"
          >
            <div className="flex items-start space-x-6">
              <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                {post.author.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">About {post.author}</h3>
                <p className="text-gray-600 leading-relaxed">{post.authorBio || 'Auteur passionné par l\'innovation et le développement.'}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related Posts */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Related Articles</h2>
            <p className="text-gray-600">Continue reading with these related insights</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {relatedPosts.length > 0 ? (
              relatedPosts.map((relatedPost, index) => (
                <motion.div
                  key={relatedPost._id}
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={relatedPost.featuredImage?.url || 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400'}
                      alt={relatedPost.featuredImage?.alt || relatedPost.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 leading-tight group-hover:text-green-600 transition-colors duration-200">
                      {relatedPost.title}
                    </h3>
                    <Link
                      to={`/blog/${relatedPost._id}`}
                      className="inline-flex items-center space-x-2 text-green-600 font-semibold hover:text-green-700 transition-colors duration-200"
                    >
                      <BookOpen size={16} />
                      <span>Lire l'article</span>
                    </Link>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-2 text-center py-8">
                <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Aucun article lié trouvé</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default BlogPost;