import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { productsAPI } from '../services/api';
import ProductModal from './ProductModal';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  brand: string;
  stock: number;
  specifications: Record<string, any>;
  tags: string[];
  images: Array<{
    publicId: string;
    url: string;
    alt: string;
  }>;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

const ProductCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Charger les produits depuis l'API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await productsAPI.getAllProducts();
        const productsData = response.data.products || [];
        // Filtrer seulement les produits actifs et avec des images
        const activeProducts = productsData.filter((product: Product) =>
          product.isActive && product.images && product.images.length > 0
        );
        setProducts(activeProducts);
      } catch (error) {
        console.error('Erreur lors du chargement des produits:', error);
        // Fallback vers des produits statiques en cas d'erreur
        setProducts([
          {
            _id: '1',
            name: 'Collection de tissus africains',
            description: 'Tissus traditionnels de haute qualité en provenance de l\'Afrique de l\'Ouest',
            price: 25000,
            category: 'Tissus',
            brand: 'Artisanat Africain',
            stock: 50,
            specifications: {},
            tags: ['traditionnel', 'qualité'],
            images: [{
              publicId: 'fallback1',
              url: 'https://res.cloudinary.com/drxouwbms/image/upload/v1755782417/360_F_821553966_khVu9EC8bwgtCrGFJXon1Sbpm7WRINLm_cncxf1.jpg',
              alt: 'Tissus africains'
            }],
            isActive: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Timer pour le carrousel automatique
  useEffect(() => {
    if (products.length === 0) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % products.length);
    }, 10000);
    return () => clearInterval(timer);
  }, [products.length]);

  const nextSlide = () => {
    if (products.length === 0) return;
    setCurrentSlide((prev) => (prev + 1) % products.length);
  };

  const prevSlide = () => {
    if (products.length === 0) return;
    setCurrentSlide((prev) => (prev - 1 + products.length) % products.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const handleExploreClick = () => {
    if (products.length > 0 && products[currentSlide]) {
      setSelectedProduct(products[currentSlide]);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (loading) {
    return (
      <div className="relative max-w-6xl mx-auto">
        <div className="relative h-80 sm:h-96 md:h-[500px] overflow-hidden rounded-2xl shadow-2xl bg-gray-200 animate-pulse">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Chargement des produits...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="relative max-w-6xl mx-auto">
        <div className="relative h-80 sm:h-96 md:h-[500px] overflow-hidden rounded-2xl shadow-2xl bg-gray-100">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className="text-gray-600 text-lg">Aucun produit disponible pour le moment</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Full Width Carousel Container */}
      <div className="relative w-full">
        <div className="relative h-[500px] sm:h-[600px] md:h-[700px] overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <div className="relative h-full">
                {/* Background Image */}
                <img
                  src={products[currentSlide].images[0]?.url || '/placeholder-product.jpg'}
                  alt={products[currentSlide].images[0]?.alt || products[currentSlide].name}
                  className="w-full h-full object-cover"
                />

                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Content Container */}
                <div className="absolute inset-0 flex items-center">
                  <div className="max-w-[90rem] mx-auto px-6 sm:px-8 lg:px-12 w-full">
                    <div className="max-w-2xl lg:max-w-3xl">
                      <motion.div
                        initial={{ x: -60, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.7, type: "spring", damping: 20 }}
                        className="relative"
                      >
                        {/* Glassmorphic Card - Refined */}
                        <div className="bg-black/20 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-8 sm:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:bg-black/25 transition-all duration-500 group/card overflow-hidden">
                          {/* Animated inner glow */}
                          <div className="absolute -top-24 -left-24 w-48 h-48 bg-green-500/10 rounded-full blur-[80px] group-hover/card:bg-green-500/20 transition-all duration-700" />

                          {/* Category and Brand tags */}
                          <div className="relative flex flex-wrap items-center gap-3 mb-6">
                            <span className="flex items-center gap-2 bg-green-500/20 backdrop-blur-md px-4 py-1.5 rounded-full text-xs sm:text-sm font-black text-green-400 border border-green-500/30 uppercase tracking-widest">
                              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                              {products[currentSlide].category}
                            </span>
                            {products[currentSlide].brand && (
                              <span className="bg-white/5 backdrop-blur-md px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold text-gray-300 border border-white/10 uppercase tracking-wider">
                                {products[currentSlide].brand}
                              </span>
                            )}
                          </div>

                          {/* Product Name - Ultra Modern */}
                          <h3 className="relative text-4xl sm:text-5xl md:text-7xl font-black mb-6 text-white leading-[1.1] tracking-tighter drop-shadow-2xl">
                            {products[currentSlide].name}
                          </h3>

                          {/* Description */}
                          <p className="relative text-lg sm:text-xl md:text-2xl mb-8 text-white/70 leading-relaxed font-light line-clamp-3">
                            {products[currentSlide].description}
                          </p>

                          {/* Price and CTA */}
                          <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-6 md:gap-10">
                            <div className="flex flex-col">
                              <span className="text-gray-400 text-xs font-bold uppercase tracking-[0.3em] mb-1">Prix Estimé</span>
                              <span className="text-3xl sm:text-5xl font-black text-white flex items-baseline gap-2">
                                {formatPrice(products[currentSlide].price)}
                                <span className="text-green-500 text-sm font-bold">*</span>
                              </span>
                            </div>

                            <button
                              onClick={handleExploreClick}
                              className="relative overflow-hidden group/btn bg-white text-gray-900 px-10 py-5 rounded-2xl font-black hover:scale-105 transition-all duration-300 flex items-center gap-4 shadow-[0_15px_30px_-5px_rgba(255,255,255,0.2)]"
                            >
                              <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                              <span className="relative z-10 group-hover/btn:text-white transition-colors">Explorer l'excellence</span>
                              <ExternalLink size={22} className="relative z-10 group-hover/btn:text-white group-hover/btn:rotate-12 transition-all" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Glassmorphic Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-4 sm:left-8 top-1/2 transform -translate-y-1/2 w-14 h-14 sm:w-16 sm:h-16 bg-white/20 hover:bg-white/40 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/30 transition-all duration-300 hover:scale-110 shadow-xl"
          >
            <ChevronLeft className="text-white" size={28} />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 sm:right-8 top-1/2 transform -translate-y-1/2 w-14 h-14 sm:w-16 sm:h-16 bg-white/20 hover:bg-white/40 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/30 transition-all duration-300 hover:scale-110 shadow-xl"
          >
            <ChevronRight className="text-white" size={28} />
          </button>

          {/* Glassmorphic Dots Indicator */}
          <div className="absolute bottom-8 sm:bottom-12 left-1/2 transform -translate-x-1/2 flex gap-3 bg-black/20 backdrop-blur-xl px-6 py-3 rounded-full border border-white/20">
            {products.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 rounded-full ${index === currentSlide
                  ? 'w-10 h-3 bg-white shadow-lg shadow-white/50'
                  : 'w-3 h-3 bg-white/40 hover:bg-white/60'
                  }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </>
  );
};

export default ProductCarousel;