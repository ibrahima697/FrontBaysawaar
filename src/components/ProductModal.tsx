import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Tag, Package, Box, MessageCircle, ExternalLink, ShieldCheck, Truck, ChevronRight } from 'lucide-react';
import { Product } from '../types';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProductModal = ({ product, isOpen, onClose }: ProductModalProps) => {
  const [activeImage, setActiveImage] = useState(0);

  if (!product) return null;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleWhatsAppEnquiry = () => {
    const message = `Bonjour, je suis intéressé par le produit "${product.name}" vu sur BAY SA WARR. Pouvez-vous me donner plus d'informations ?`;
    window.open(`https://wa.me/221770000000?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="relative w-full max-w-6xl min-h-[500px] h-auto max-h-[90vh] bg-[#FDFDFD] rounded-3xl lg:rounded-[2.5rem] shadow-[0_30px_100px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col lg:flex-row"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 1. Left Section: Visuals (55%) */}
            <div className="relative w-full lg:w-[55%] h-72 sm:h-96 lg:h-auto bg-gray-100/50 flex flex-col shrink-0">
              {/* Main Image Viewport */}
              <div className="flex-1 relative overflow-hidden group/main">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeImage}
                    src={product.images[activeImage]?.url}
                    alt={product.name}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>

                {/* Image Overlay Badge */}
                <div className="absolute top-4 left-4 lg:top-6 lg:left-6 flex flex-col gap-2">
                  <span className="bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-[#2d8755] shadow-sm border border-green-100/50">
                    Premium Quality
                  </span>
                </div>
              </div>

              {/* Thumbnail Bar */}
              {product.images && product.images.length > 1 && (
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-1/2 sm:-translate-x-1/2 flex justify-center gap-2 sm:gap-3 p-2 bg-white/20 backdrop-blur-xl rounded-2xl border border-white/30 shadow-2xl">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(idx)}
                      className={`relative w-12 h-12 sm:w-16 sm:h-16 rounded-xl overflow-hidden transition-all duration-300 ${activeImage === idx ? 'ring-2 ring-[#2d8755] scale-105 shadow-lg' : 'opacity-60 hover:opacity-100 hover:scale-105'}`}
                    >
                      <img src={img.url} className="w-full h-full object-cover" alt="" />
                    </button>
                  ))}
                </div>
              )}

              {/* Close (Mobile) */}
              <button
                onClick={onClose}
                className="lg:hidden absolute top-4 right-4 p-2 bg-black/40 backdrop-blur-md rounded-xl text-white z-20"
              >
                <X size={20} />
              </button>
            </div>

            {/* 2. Right Section: Context (45%) */}
            <div className="w-full lg:w-[45%] flex flex-col h-full bg-white relative overflow-hidden">
              {/* Desktop Close */}
              <button
                onClick={onClose}
                className="hidden lg:flex absolute top-8 right-8 p-3 hover:bg-gray-100 rounded-2xl transition-all text-gray-400 hover:text-gray-900 z-30"
              >
                <X size={24} />
              </button>

              <div className="flex-1 overflow-y-auto custom-scrollbar p-6 lg:p-12">
                {/* Breadcrumb / Category */}
                <div className="flex items-center gap-2 text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                  <span className="text-[#2d8755]">{product.category}</span>
                  <ChevronRight size={12} />
                  <span>{product.brand || 'Baysawaar'}</span>
                </div>

                {/* Title & Stats */}
                <h1 className="text-2xl lg:text-4xl font-black text-gray-900 leading-tight mb-4">
                  {product.name}
                </h1>

                <div className="flex items-center gap-4 sm:gap-6 mb-8 pb-8 border-b border-gray-100">
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl sm:text-3xl font-black text-[#2d8755]">{formatPrice(product.price)}</span>
                    <span className="text-gray-400 text-[10px] font-black uppercase tracking-tighter">HT</span>
                  </div>
                  <div className={`px-2 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider ${product.stock > 0 ? 'bg-orange-50 text-orange-600' : 'bg-red-50 text-red-600'}`}>
                    {product.stock > 0 ? `Stock: ${product.stock}` : 'Épuisé'}
                  </div>
                </div>

                {/* Tabs / Description Section */}
                <div className="space-y-8 lg:space-y-10">
                  <div className="space-y-4">
                    <h3 className="text-xs font-black text-gray-900 uppercase tracking-[0.2em] flex items-center gap-2">
                      <Box size={14} className="text-[#2d8755]" />
                      Description
                    </h3>
                    <p className="text-gray-600 text-sm sm:text-lg leading-relaxed font-medium">
                      {product.description}
                    </p>
                  </div>



                  {/* Specifications */}
                  {product.specifications && Object.keys(product.specifications).length > 0 && (
                    <div className="space-y-4 pt-6">
                      <h3 className="text-xs font-black text-gray-900 uppercase tracking-[0.2em] flex items-center gap-2">
                        <Package size={14} className="text-[#2d8755]" />
                        Spécifications
                      </h3>
                      <div className="space-y-3">
                        {Object.entries(product.specifications).map(([key, value]) => (
                          <div key={key} className="flex justify-between items-center py-2.5 border-b border-dashed border-gray-100 group">
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                            <span className="text-xs sm:text-sm font-black text-gray-900">{String(value)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Footer Actions */}
              <div className="p-6 lg:p-12 border-t border-gray-100 bg-[#FAFAFA] shrink-0">
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={handleWhatsAppEnquiry}
                    className="flex-1 bg-[#25D366] hover:bg-[#128C7E] text-white px-6 py-4 sm:py-5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-3 shadow-xl hover:scale-[1.02] active:scale-95"
                  >
                    <MessageCircle size={20} className="fill-current" />
                    <span>Commander via WhatsApp</span>
                  </button>
                  {/* <button
                    className="bg-white border-2 border-gray-100 text-gray-900 hover:border-[#2d8755] hover:text-[#2d8755] px-8 py-5 rounded-[1.5rem] font-bold transition-all duration-300 flex items-center justify-center gap-3 shadow-md hover:shadow-lg"
                  >
                    <ExternalLink size={20} />
                    <span className="hidden sm:inline">Partager</span>
                  </button> */}
                </div>
                <p className="text-[9px] text-gray-400 mt-4 text-center font-black tracking-[0.2em] uppercase">
                  BAY SA WARR © 2026
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProductModal;