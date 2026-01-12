import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Eye, Heart, Users, Award, Globe, TrendingUp, Handshake, Facebook, Linkedin } from 'lucide-react';

const About = () => {
  const navigate = useNavigate();
  const values = [
    {
      icon: Target,
      title: 'Excellence',
      description: 'Nous visons la plus haute qualité dans tout ce que nous faisons, des produits aux partenariats.',
    },
    {
      icon: Heart,
      title: 'Intégrité',
      description: 'Pratiques commerciales honnêtes et transparentes qui créent la confiance et des relations durables.',
    },
    {
      icon: Users,
      title: 'Communauté',
      description: 'Soutenir les entreprises africaines et favoriser une croissance collaborative à travers le continent.',
    },
    {
      icon: Globe,
      title: 'Innovation',
      description: 'Adopter la technologie et des solutions créatives pour résoudre les défis commerciaux traditionnels.',
    },
  ];

  const activities = [
    {
      icon: Globe,
      title: 'Plateforme FIPA',
      description: 'Place de marché complète connectant les producteurs africains aux acheteurs mondiaux.',
      features: ['Catalogue Produits', 'Annuaire Fournisseurs', 'Facilitation Commerciale', 'Assurance Qualité'],
    },
    {
      icon: TrendingUp,
      title: 'Solutions E-commerce',
      description: 'Outils de commerce digital complets pour les entreprises africaines modernes.',
      features: ['Création de Boutique en Ligne', 'Traitement des Paiements', 'Support Logistique', 'Marketing Digital'],
    },
    {
      icon: Handshake,
      title: 'Programmes de Partenariat',
      description: 'Alliances stratégiques favorisant la croissance mutuelle et l\'expansion du marché.',
      features: ['Réseau de Distributeurs', 'Programmes d\'Agents', 'Coentreprises', 'Renforcement des Capacités'],
    },
    {
      icon: Award,
      title: 'Conseil aux Entreprises',
      description: 'Conseils experts pour le développement durable des entreprises.',
      features: ['Analyse de Marché', 'Développement Stratégique', 'Optimisation des Processus', 'Programmes de Formation'],
    },
  ];

  const team = [
    {
      name: 'Fatou Fabira Dramé',
      role: 'PDG & Fondatrice',
      bio: 'Leader visionnaire avec plus de 15 ans d\'expérience dans le commerce international et le développement des affaires en Afrique.',
      image: 'https://res.cloudinary.com/drxouwbms/image/upload/v1755778170/Web_Photo_Editor_1_nik1li.jpg',
    },
    {
      name: 'Fatou Ndiaye',
      role: 'Directrice des Opérations',
      bio: 'Experte en gestion de la chaîne d\'approvisionnement et des opérations de plateforme avec une connaissance approfondie du marché africain.',
      image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      name: 'Kwame Mensah',
      role: 'Directeur Technique',
      bio: 'Innovateur technologique spécialisé dans les plateformes e-commerce et la transformation digitale.',
      image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      name: 'Amina Kone',
      role: 'Directrice des Partenariats',
      bio: 'Développeuse de relations avec un vaste réseau sur les marchés africains et internationaux.',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      name: 'Ndiaga Lo',
      role: 'Developpeur Frontend',
      bio: 'Développeur Frontend avec une expertise approfondie en React et Next.js.',
      image: 'https://res.cloudinary.com/drxouwbms/image/upload/v1743803438/learners/bwear6xjrbj69froahdp.jpg',
    },
  ];

  const partners = [
    { name: 'Banque Africaine de Développement', logo: 'https://res.cloudinary.com/drxouwbms/image/upload/v1755780237/Logo_Afrikanische_Entwicklungsbank.svg_oa7ujv.png' },
    { name: 'Commission du Commerce CEDEAO', logo: 'https://res.cloudinary.com/drxouwbms/image/upload/v1755780576/CEDEAO_Logo.svg_vobzi6.png' },
    { name: 'Alliance Mondiale du Commerce', logo: 'https://res.cloudinary.com/drxouwbms/image/upload/v1756378077/345594175_690121569789202_3483034607438286277_n-removebg-preview_jv7nty.png' },
    { name: 'Initiative Digitale Afrique', logo: 'https://res.cloudinary.com/drxouwbms/image/upload/v1755780910/cropped-cropped-DA_Logo_HG-1_zejbov.png' },
    { name: 'Promotion Export Sénégal', logo: 'https://res.cloudinary.com/drxouwbms/image/upload/v1756378085/1630632559560-removebg-preview_sn0rfl.png' },
    { name: 'Gouvernement du Sénégal', logo: 'https://res.cloudinary.com/drxouwbms/image/upload/v1755781150/Coat_of_arms_of_Senegal.svg_bzqaft.png' },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const itemsPerSlide = 4;
  const numSlides = Math.ceil(team.length / itemsPerSlide);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % numSlides);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + numSlides) % numSlides);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-50"
    >
      {/* Hero Section */}
      <section className="relative py-20 sm:py-28 md:py-32 bg-cover bg-center bg-no-repeat bg-fixed" style={{ backgroundImage: 'url(https://res.cloudinary.com/drxouwbms/image/upload/v1755949759/Screenshot_2025-08-23_at_11_41_05_1_-Picsart-AiImageEnhancer_kfsp1y.png)' }}>
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-block p-8 sm:p-12 rounded-3xl bg-black/30 backdrop-blur-md border border-white/10 shadow-2xl max-w-4xl mx-auto">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                À propos de <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">BAY SA WARR</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-white/90 leading-relaxed">
                Pionnier de l'excellence des entreprises africaines grâce à des plateformes innovantes,
                des partenariats stratégiques et un engagement indéfectible envers la croissance continentale.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Company Story - Layered Overlap Layout */}
      <section className="py-24 relative overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

            {/* Left: Visual Stack */}
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Main Image */}
              <div className="relative z-10 w-[85%] aspect-[4/5] rounded-[60px] overflow-hidden shadow-2xl border-8 border-white">
                <img
                  src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Notre équipe au travail"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Secondary Overlapping Image */}
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                viewport={{ once: true }}
                className="absolute -bottom-10 -right-4 z-20 w-[55%] aspect-square rounded-[40px] overflow-hidden shadow-2xl border-8 border-white hidden sm:block"
              >
                <img
                  src="https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400"
                  alt="Productivité"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Floating Stat Card */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.6, type: "spring", stiffness: 100 }}
                viewport={{ once: true }}
                className="absolute top-10 -right-6 lg:-right-12 z-30 bg-white p-6 rounded-3xl shadow-xl border border-gray-100 flex items-center gap-4"
              >
                <div className="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center text-white">
                  <TrendingUp size={24} />
                </div>
                <div>
                  <p className="text-2xl font-black text-slate-900 leading-none">10,000+</p>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Entreprises</p>
                </div>
              </motion.div>

              {/* Floating Trust Card */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.8, type: "spring", stiffness: 100 }}
                viewport={{ once: true }}
                className="absolute -bottom-6 -left-8 z-30 bg-[#182656] p-6 rounded-3xl shadow-xl border border-slate-800 flex flex-col gap-3"
              >
                <p className="text-white font-black text-lg">Très appréciée</p>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map(i => (
                    <motion.span
                      key={i}
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 2, delay: i * 0.2 }}
                      className="text-green-500"
                    >
                      ★
                    </motion.span>
                  ))}
                </div>
                <div className="flex -space-x-3 mt-1">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-slate-900 bg-gray-200 overflow-hidden">
                      <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="user" />
                    </div>
                  ))}
                  <div className="w-8 h-8 rounded-full border-2 border-slate-900 bg-green-500 flex items-center justify-center text-[10px] font-bold text-white">
                    +1k
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right: Content */}
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <div className="relative">
                <div className="inline-block px-4 py-1.5 bg-green-50 text-green-600 rounded-lg text-sm font-black uppercase tracking-[0.2em] mb-6">
                  Un peu sur nous
                </div>
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 mb-8 uppercase tracking-tighter leading-[0.9]">
                  NOTRE <br />
                  <span className="text-green-600">HISTOIRE</span>
                </h2>
                <div className="space-y-6 text-slate-500 text-lg font-medium leading-relaxed max-w-lg">
                  <p>
                    Fondée en 2018, BAY SA WARR est née d'une vision puissante : créer un écosystème où les entreprises africaines prospèrent sur la scène mondiale.
                  </p>
                  <p>
                    Aujourd'hui, nous sommes le moteur du commerce numérique africain, facilitant des transactions continentales et bâtissant des partenariats durables pour un avenir prospère.
                  </p>
                </div>

                <div className="mt-12">
                  <button
                    onClick={() => navigate('/enrollments')}
                    className="group relative px-8 py-4 bg-[#182656] text-white rounded-2xl font-black uppercase tracking-widest text-sm overflow-hidden transition-all hover:pr-12"
                  >
                    <span className="relative z-10 transition-all group-hover:mr-2">Nous rejoindre</span>
                    <TrendingUp className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all rotate-45" size={20} />
                  </button>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Mission & Vision - Precision Infographic Redesign */}
      <section className="py-32 relative overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="relative flex flex-col md:flex-row items-center justify-center gap-16 lg:gap-32">

            {/* Connecting S-Curve Line (Desktop Only) */}
            <svg className="absolute hidden md:block w-full h-full pointer-events-none z-0" viewBox="0 0 1000 400">
              <motion.path
                d="M430 200 C 500 200, 500 200, 570 200"
                stroke="#94a3b8"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1, ease: "easeInOut" }}
                viewport={{ once: true }}
              />
              {/* Start Dot */}
              <motion.circle
                cx="428" cy="200" r="4" fill="#2d8756"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: 0.8 }}
                viewport={{ once: true }}
              />
              {/* End Dot */}
              <motion.circle
                cx="572" cy="200" r="4" fill="#182656"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: 0.8 }}
                viewport={{ once: true }}
              />
            </svg>

            {/* Mission Card (Option 01) */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative w-full max-w-sm group"
            >
              {/* Image-accurate Border Frame */}
              <div className="absolute -inset-6 pointer-events-none">
                {/* Thin Base Border */}
                <div className="absolute inset-0 border-[1.5px] border-green-200 rounded-[3rem]"></div>
                {/* Dotted Top-Left Segment */}
                <div className="absolute -top-[1.5px] -left-[1.5px] w-1/2 h-1/2 border-t-[3px] border-l-[3px] border-dotted border-green-600 rounded-tl-[3rem]"></div>
                {/* Thick Blue Bottom-Left Bar */}
                <div className="absolute -bottom-[1.5px] -left-[1.5px] w-1/3 h-1/3 border-b-[6px] border-l-[6px] border-green-600 rounded-bl-[3rem]"></div>
              </div>

              <div className="relative bg-[#fcfcfc] p-10 rounded-[2.5rem] shadow-xl flex flex-col items-center text-center h-full">
                <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-8">
                  <Target className="text-green-600" size={32} />
                </div>

                <span className="text-[10px] font-black text-green-600 uppercase tracking-[0.4em] mb-4"></span>
                <h3 className="text-2xl font-black text-green-600 mb-6 uppercase tracking-tight">Notre Mission</h3>

                <p className="text-slate-400 text-sm font-medium leading-relaxed">
                  Émanciper les entreprises africaines grâce au numérique en boostant leur croissance et leur visibilité pour un impact réel.
                </p>
              </div>
            </motion.div>

            {/* Vision Card (Option 02) */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative w-full max-w-sm group"
            >
              {/* Image-accurate Border Frame */}
              <div className="absolute -inset-6 pointer-events-none">
                {/* Thin Base Border */}
                <div className="absolute inset-0 border-[1.5px] border-slate-200 rounded-[3rem]"></div>
                {/* Thick Navy Top-Right Bar */}
                <div className="absolute -top-[1.5px] -right-[1.5px] w-1/3 h-1/3 border-t-[6px] border-r-[6px] border-[#182656] rounded-tr-[3rem]"></div>
                {/* Dotted Bottom-Right Segment */}
                <div className="absolute -bottom-[1.5px] -right-[1.5px] w-1/2 h-1/2 border-b-[3px] border-r-[3px] border-dotted border-[#182656] rounded-br-[3rem]"></div>
              </div>

              <div className="relative bg-[#fcfcfc] p-10 rounded-[2.5rem] shadow-xl flex flex-col items-center text-center h-full">
                <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-8">
                  <Eye className="text-[#182656]" size={32} />
                </div>

                <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em] mb-4"></span>
                <h3 className="text-2xl font-black text-[#182656] mb-6 uppercase tracking-tight">Notre Vision</h3>

                <p className="text-slate-400 text-sm font-medium leading-relaxed">
                  Devenir la référence continentale du commerce et de la transformation numérique en Afrique, bâtissant un marché unifié.
                </p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Values - Connected Infographic Redesign */}
      <section className="py-32 relative overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          <div className="relative">
            {/* Central Infographic Hub (Desktop Only) */}
            <div className="hidden lg:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-44 z-30 flex-col items-center justify-center bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 text-center p-8 transition-all duration-500 hover:scale-105">
              <div className="text-[10px] font-black text-black uppercase tracking-[0.4em] mb-2">NOS</div>
              <div className="text-3xl font-black text-green-600 leading-none tracking-tighter">Valeurs</div>
              <div className="flex gap-2 mt-6">
                <div className="w-2.5 h-2.5 rounded-full bg-[#182656]"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#182656]"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#182656]"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#182656]"></div>
              </div>

              {/* Decorative Hub Arrows */}
              <div className="absolute left-[-24px] top-1/2 -translate-y-1/2 text-slate-200">
                <TrendingUp className="rotate-[225deg]" size={20} />
              </div>
              <div className="absolute right-[-24px] top-1/2 -translate-y-1/2 text-slate-200">
                <TrendingUp className="rotate-45" size={20} />
              </div>
            </div>

            {/* Mobile Header */}
            <div className="lg:hidden text-center mb-16">
              <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tight uppercase">Nos Valeurs</h2>
              <div className="w-16 h-1 bg-green-500 mx-auto rounded-full"></div>
            </div>

            {/* Connecting SVG Lines (Desktop Only) */}
            {/* High-Precision Connecting SVG Lines (Desktop Only) */}
            <svg className="absolute hidden lg:block w-full h-full pointer-events-none z-10" viewBox="0 0 1000 600">
              <defs>
                <marker id="arrow-green" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                  <path d="M0 0 L10 3.5 L0 7 Z" fill="#16a34a" />
                </marker>
                <marker id="arrow-navy" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                  <path d="M0 0 L10 3.5 L0 7 Z" fill="#182656" />
                </marker>
              </defs>

              {/* Option 01 (Top Left) */}
              <motion.path d="M480 200 L 400 200 L 400 120 L 320 120" stroke="#cbd5e1" strokeWidth="1.5" fill="none" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1.2 }} viewport={{ once: true }} />
              <motion.circle cx="400" cy="200" r="4" fill="white" stroke="#cbd5e1" strokeWidth="2" initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ delay: 0.6 }} viewport={{ once: true }} />
              <motion.path d="M380 120 L 360 120" stroke="#16a34a" strokeWidth="2" markerEnd="url(#arrow-green)" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 1 }} viewport={{ once: true }} />

              {/* Option 02 (Bottom Left) */}
              <motion.path d="M480 400 L 400 400 L 400 480 L 320 480" stroke="#cbd5e1" strokeWidth="1.5" fill="none" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1.2, delay: 0.2 }} viewport={{ once: true }} />
              <motion.circle cx="400" cy="400" r="4" fill="white" stroke="#cbd5e1" strokeWidth="2" initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ delay: 0.8 }} viewport={{ once: true }} />
              <motion.path d="M380 480 L 360 480" stroke="#16a34a" strokeWidth="2" markerEnd="url(#arrow-green)" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 1.2 }} viewport={{ once: true }} />

              {/* Option 03 (Bottom Right) */}
              <motion.path d="M520 400 L 600 400 L 600 480 L 680 480" stroke="#cbd5e1" strokeWidth="1.5" fill="none" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1.2, delay: 0.4 }} viewport={{ once: true }} />
              <motion.circle cx="600" cy="400" r="4" fill="white" stroke="#cbd5e1" strokeWidth="2" initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ delay: 1 }} viewport={{ once: true }} />
              <motion.path d="M620 480 L 640 480" stroke="#182656" strokeWidth="2" markerEnd="url(#arrow-navy)" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 1.4 }} viewport={{ once: true }} />

              {/* Option 04 (Top Right) */}
              <motion.path d="M520 200 L 600 200 L 600 120 L 680 120" stroke="#cbd5e1" strokeWidth="1.5" fill="none" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1.2, delay: 0.6 }} viewport={{ once: true }} />
              <motion.circle cx="600" cy="200" r="4" fill="white" stroke="#cbd5e1" strokeWidth="2" initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ delay: 1.2 }} viewport={{ once: true }} />
              <motion.path d="M620 120 L 640 120" stroke="#182656" strokeWidth="2" markerEnd="url(#arrow-navy)" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 1.6 }} viewport={{ once: true }} />
            </svg>

            {/* Grid for Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-12 lg:gap-y-32 gap-x-32 sm:gap-x-48 px-0 sm:px-12 lg:px-0">
              {values.map((value, index) => {
                const isLeft = index === 0 || index === 1;
                const isGreen = index === 0 || index === 1;
                const colorClass = isGreen ? "text-green-600" : "text-[#182656]";
                const borderClass = isGreen ? "border-green-100/50" : "border-slate-100/50";
                const accentBg = isGreen ? "bg-gradient-to-br from-green-500 to-emerald-600" : "bg-gradient-to-br from-[#182656] to-slate-900";

                return (
                  <motion.div
                    key={index}
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    viewport={{ once: true }}
                    className={`relative flex items-center ${isLeft ? 'lg:justify-end' : 'lg:justify-start'} group`}
                  >
                    <div className={`relative flex items-center ${isLeft ? 'flex-row' : 'flex-row-reverse'} w-full max-w-sm`}>

                      {/* Card Content */}
                      <div className={`relative flex-1 bg-white p-6 sm:p-10 ${isLeft ? 'pr-12 sm:pr-16' : 'pl-12 sm:pl-16'} rounded-[2.5rem] border ${borderClass} shadow-xl z-10 transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-2xl`}>
                        <div className={`text-[10px] font-black uppercase tracking-widest ${colorClass} opacity-40 mb-3`}></div>
                        <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-3 italic">{value.title}</h3>
                        <p className="text-slate-400 text-[13px] font-medium leading-relaxed">{value.description}</p>
                      </div>

                      {/* Overlapping Icon Circle */}
                      <div className={`relative ${isLeft ? '-ml-8 sm:-ml-12' : '-mr-8 sm:-mr-12'} z-20 transition-transform duration-500 group-hover:scale-110`}>
                        <div className={`w-16 h-16 sm:w-20 sm:h-20 ${accentBg} rounded-full flex items-center justify-center shadow-2xl border-4 border-white`}>
                          <value.icon className="text-white" size={28} />
                        </div>
                        {/* Decorative Outer Ring */}
                        <div className={`absolute inset-0 -m-2 border-2 border-dashed ${isGreen ? 'border-green-200' : 'border-slate-200'} rounded-full animate-spin-slow opacity-0 group-hover:opacity-100 transition-opacity`}></div>
                      </div>

                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Activities - Redesigned Bento Grid */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,197,94,0.02)_0%,transparent_50%)]"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 mb-6 uppercase tracking-tight">
              Nos <span className="text-green-600">Activités</span>
            </h2>
            <div className="w-24 h-1.5 bg-green-600 mx-auto rounded-full mb-4"></div>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto font-medium">
              Des solutions innovantes pour propulser l'excellence entrepreneuriale africaine.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[320px] md:auto-rows-[280px]">
            {/* 1. Plateforme FIPA - TALL CARD */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="md:row-span-2 group relative overflow-hidden rounded-[40px] bg-gray-50 p-10 border border-gray-100 hover:shadow-2xl hover:shadow-green-900/10 transition-all duration-500"
            >
              <div className="h-full flex flex-col">
                <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                  <Globe className="text-green-600 w-8 h-8" />
                </div>
                <h3 className="text-3xl font-black text-slate-900 mb-4 uppercase tracking-tighter leading-none">
                  {activities[0].title}
                </h3>
                <p className="text-slate-500 font-medium mb-8 leading-relaxed">
                  {activities[0].description}
                </p>
                <div className="mt-auto space-y-3">
                  {activities[0].features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm font-bold text-slate-700">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-green-500/5 rounded-full blur-3xl group-hover:bg-green-500/10 transition-colors"></div>
            </motion.div>

            {/* 2. Solutions E-commerce - WIDE CARD */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="md:col-span-2 group relative overflow-hidden rounded-[40px] bg-[#182656] p-10 text-white hover:shadow-2xl hover:shadow-slate-900/40 transition-all duration-500"
            >
              <div className="flex flex-col md:flex-row gap-10 h-full">
                <div className="flex-1 flex flex-col justify-center">
                  <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform">
                    <TrendingUp className="text-green-400 w-7 h-7" />
                  </div>
                  <h3 className="text-3xl font-black mb-4 uppercase tracking-tighter">
                    {activities[1].title}
                  </h3>
                  <p className="text-gray-400 font-medium leading-relaxed">
                    {activities[1].description}
                  </p>
                </div>
                <div className="flex-1 flex flex-wrap gap-3 content-center justify-center md:justify-end">
                  {activities[1].features.map((feature, idx) => (
                    <span key={idx} className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-green-500 hover:text-slate-950 transition-colors">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* 3. Programmes de Partenariat - STANDARD CARD */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="group relative overflow-hidden rounded-[40px] bg-green-50 p-8 border border-green-100 hover:shadow-2xl hover:shadow-green-900/10 transition-all duration-500"
            >
              <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6 group-hover:-translate-y-2 transition-transform">
                <Handshake className="text-green-600 w-7 h-7" />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-3 uppercase tracking-tighter">
                {activities[2].title}
              </h3>
              <p className="text-slate-600 text-sm font-medium leading-relaxed">
                {activities[2].description}
              </p>
              <div className="absolute top-4 right-4 text-green-200/50 group-hover:text-green-300/50 transition-colors">
                <Handshake size={64} strokeWidth={1} />
              </div>
            </motion.div>

            {/* 4. Conseil aux Entreprises - STANDARD CARD */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="group relative overflow-hidden rounded-[40px] bg-gray-50 p-8 border border-gray-100 hover:shadow-2xl hover:shadow-slate-900/10 transition-all duration-500"
            >
              <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform">
                <Award className="text-green-600 w-7 h-7" />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-3 uppercase tracking-tighter">
                {activities[3].title}
              </h3>
              <p className="text-slate-600 text-sm font-medium leading-relaxed">
                {activities[3].description}
              </p>
              <div className="absolute top-4 right-4 text-gray-200 group-hover:text-green-200 transition-colors">
                <Award size={64} strokeWidth={1} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section - Carousel Slide Mode */}
      <section className="py-24 bg-gray-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-green-500/10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 uppercase tracking-tight">
              Notre<span className="text-green-600"> équipe</span>
            </h2>
            <div className="w-24 h-1 bg-green-600 mx-auto mb-4"></div>
            <p className="text-slate-500 text-lg uppercase tracking-widest font-light">
              Des leaders visionnaires au service de l'excellence
            </p>
          </div>

          <div className="relative px-2 sm:px-12">
            <div className="overflow-hidden py-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-16"
                >
                  {team.slice(currentSlide * itemsPerSlide, (currentSlide + 1) * itemsPerSlide).map((member, index) => (
                    <div
                      key={index}
                      className="flex flex-col sm:flex-row group"
                    >
                      {/* Image Container */}
                      <div className="relative w-full sm:w-56 h-64 sm:h-56 flex-shrink-0">
                        <div className="absolute inset-0 bg-green-500/10 translate-x-3 translate-y-3 rounded-tl-[40px] rounded-br-[40px] group-hover:translate-x-1 group-hover:translate-y-1 transition-transform duration-300"></div>
                        <img
                          src={member.image}
                          alt={member.name}
                          className="relative w-full h-full object-cover rounded-tl-[40px] rounded-br-[40px] grayscale group-hover:grayscale-0 transition-all duration-500 border-2 border-white shadow-lg"
                        />
                      </div>

                      {/* Info Container */}
                      <div className="flex-1 bg-white p-6 sm:pl-10 relative rounded-2xl sm:rounded-none sm:rounded-rk-2xl sm:rounded-br-2xl border border-gray-100 shadow-sm group-hover:shadow-xl transition-all duration-300">
                        {/* Role Tag */}
                        <div className="absolute -top-4 left-6 sm:left-10 bg-green-600 px-6 py-1.5 rounded-tr-xl rounded-bl-sm shadow-lg">
                          <span className="text-white font-black text-xs uppercase tracking-tighter">
                            {member.role === 'PDG & Fondatrice' ? 'CEO' :
                              member.role === 'Directrice des Opérations' ? 'COO' :
                                member.role === 'Directeur Technique' ? 'CTO' :
                                  member.role.toLowerCase().includes('developpeur') ? 'Engineer' : 'Director'}
                          </span>
                        </div>

                        <div className="mt-4">
                          <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-2 group-hover:text-green-600 transition-colors">
                            {member.name}
                          </h3>
                          <p className="text-slate-600 text-sm leading-relaxed mb-6 font-medium line-clamp-3">
                            {member.bio}
                          </p>

                          {/* Social Icons */}
                          <div className="flex items-center gap-3">
                            <a href="#" className="p-2.5 bg-gray-50 rounded-xl text-slate-400 hover:bg-green-600 hover:text-white transition-all shadow-sm">
                              <Linkedin size={18} />
                            </a>
                            <a href="#" className="p-2.5 bg-gray-50 rounded-xl text-slate-400 hover:bg-green-600 hover:text-white transition-all shadow-sm">
                              <Facebook size={18} />
                            </a>
                            <a href="#" className="p-2.5 bg-gray-50 rounded-xl text-slate-400 hover:bg-green-600 hover:text-white transition-all shadow-sm">
                              <TrendingUp size={18} />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Dots */}
            {numSlides > 1 && (
              <div className="flex justify-center mt-12 space-x-3">
                {Array.from({ length: numSlides }).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${currentSlide === idx ? 'bg-green-600 w-8' : 'bg-gray-300 hover:bg-green-200'
                      }`}
                  />
                ))}
              </div>
            )}

            {/* Arrow Controls (Hidden on mobile) */}
            {numSlides > 1 && (
              <div className="hidden sm:block">
                <button
                  onClick={prevSlide}
                  className="absolute left-[-20px] sm:left-[-10px] top-1/2 -translate-y-1/2 p-3 rounded-full bg-white border border-gray-100 shadow-lg text-gray-400 hover:text-green-600 hover:border-green-100 transition-all active:scale-95 z-20"
                >
                  <TrendingUp size={24} className="rotate-[225deg]" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-[-20px] sm:right-[-10px] top-1/2 -translate-y-1/2 p-3 rounded-full bg-white border border-gray-100 shadow-lg text-gray-400 hover:text-green-600 hover:border-green-100 transition-all active:scale-95 z-20"
                >
                  <TrendingUp size={24} className="rotate-45" />
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-1 bg-green-500/10"></div>
      </section>

      {/* Partners - Tiled Design Light Mode */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.03)_0%,transparent_100%)]"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 uppercase tracking-tight">
              Nos <span className="text-green-600">Partenaires</span>
            </h2>
            <div className="w-20 h-1.5 bg-green-600 mx-auto rounded-full"></div>
          </div>

          <div className="relative overflow-hidden py-10">
            {/* Edge Fades */}
            <div className="absolute inset-y-0 left-0 w-20 sm:w-40 bg-gradient-to-r from-white to-transparent z-20"></div>
            <div className="absolute inset-y-0 right-0 w-20 sm:w-40 bg-gradient-to-l from-white to-transparent z-20"></div>

            <motion.div
              className="flex gap-8 px-4"
              initial={{ x: "-50%" }}
              animate={{ x: "0%" }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 30,
                  ease: "linear",
                },
              }}
              style={{ width: "max-content" }}
            >
              {[...partners, ...partners, ...partners, ...partners].map((partner, index) => (
                <div
                  key={index}
                  className="w-56 h-32 flex-shrink-0 bg-white border border-gray-100 rounded-3xl shadow-sm flex items-center justify-center p-8 group hover:border-green-500/20 hover:shadow-xl hover:shadow-green-900/5 transition-all duration-500"
                >
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-h-12 w-auto filter grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 ease-out"
                  />
                </div>
              ))}
            </motion.div>
          </div>

          <p className="text-center mt-8 text-slate-400 font-medium uppercase tracking-widest text-xs sm:text-sm">
            Faisons rayonner l'Afrique ensemble
          </p>
        </div>
      </section>
    </motion.div>
  );
};

export default About;