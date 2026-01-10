import { motion } from 'framer-motion';
import { path } from 'framer-motion/client';
import { Target, Eye, Heart, Users, Award, Globe, TrendingUp, Handshake } from 'lucide-react';

const About = () => {
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
      name: 'Amina Kone',
      role: 'Directrice des Partenariats',
      bio: 'Développeuse de relations avec un vaste réseau sur les marchés africains et internationaux.',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
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

      {/* Company Story */}
      <section className="py-16 sm:py-24 relative overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-green-300/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <div className="bg-white/60 backdrop-blur-xl border border-white/40 p-8 sm:p-10 rounded-3xl shadow-xl">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Notre Histoire</h2>
                <div className="space-y-6 text-gray-700 leading-relaxed text-lg">
                  <p>
                    Fondée en 2018, BAY SA WARR est née d'une vision simple mais puissante :
                    créer un écosystème complet où les entreprises africaines pourraient prospérer,
                    se connecter et concurrencer sur la scène mondiale.
                  </p>
                  <p>
                    Ce qui a commencé comme une initiative locale au Sénégal a grandi en une
                    plateforme continentale servant plus de 10 000 entreprises dans plus de 50
                    pays. Notre succès est basé sur la compréhension des défis et des opportunités
                    uniques au sein des marchés africains.
                  </p>
                  <p>
                    Aujourd'hui, nous sommes fiers d'être reconnus comme une force motrice dans
                    le commerce numérique africain, facilitant des millions de dollars de valeur
                    commerciale et créant des partenariats durables.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative order-1 lg:order-2"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-green-500 to-blue-500 rounded-3xl transform rotate-3 blur-lg opacity-30"></div>
              <img
                src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="African business meeting"
                className="relative rounded-3xl shadow-2xl w-full h-[400px] object-cover border-4 border-white/50"
              />
              <div className="absolute -bottom-6 -left-6 bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-white/40">
                <p className="text-4xl font-bold text-green-600">+7 ans</p>
                <p className="text-gray-600 font-medium">d'excellence</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Redesigned */}
      <section className="py-24 relative overflow-hidden bg-white">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-green-100/50 rounded-full blur-3xl mix-blend-multiply animate-blob"></div>
          <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl mix-blend-multiply animate-blob animation-delay-2000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">

            {/* Mission Card */}
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-white rounded-[2rem] transform rotate-1 group-hover:rotate-2 transition-transform duration-500"></div>
              <div className="relative bg-white/80 backdrop-blur-xl border border-green-100 p-8 sm:p-10 rounded-[2rem] shadow-xl hover:shadow-2xl hover:shadow-green-100/50 transition-all duration-500 h-full flex flex-col items-start">
                <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                  <Target className="text-green-600" size={32} strokeWidth={1.5} />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4 group-hover:text-green-700 transition-colors">Notre Mission</h3>
                <p className="text-xl text-gray-600 font-light leading-relaxed mb-6">
                  Émanciper les entreprises africaines grâce au <span className="font-medium text-green-600">numérique</span>.
                </p>
                <ul className="space-y-3 mt-auto">
                  {['Innovation Digitale', 'Croissance Durable', 'Compétitivité Mondiale'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-500">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Vision Card */}
            <motion.div
              initial={{ x: 30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-bl from-blue-50 to-white rounded-[2rem] transform -rotate-1 group-hover:-rotate-2 transition-transform duration-500"></div>
              <div className="relative bg-white/80 backdrop-blur-xl border border-blue-100 p-8 sm:p-10 rounded-[2rem] shadow-xl hover:shadow-2xl hover:shadow-blue-100/50 transition-all duration-500 h-full flex flex-col items-start">
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                  <Eye className="text-blue-600" size={32} strokeWidth={1.5} />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4 group-hover:text-blue-700 transition-colors">Notre Vision</h3>
                <p className="text-xl text-gray-600 font-light leading-relaxed mb-6">
                  Un marché continental <span className="font-medium text-blue-600">unifié</span> et prospère.
                </p>
                <ul className="space-y-3 mt-auto">
                  {['Marché Unique', 'Excellence Africaine', 'Prospérité Partagée'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-500">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Nos Valeurs Fondamentales</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Les principes essentiels qui inspirent et guident chacune de nos actions.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group bg-white/50 backdrop-blur-lg border border-white/60 p-8 rounded-3xl hover:bg-white/80 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <value.icon className="text-white" size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Activities */}
      <section className="py-20 bg-gray-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Nos Activités Principales</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Solutions globales pour les entreprises africaines modernes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {activities.map((activity, index) => (
              <motion.div
                key={index}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative overflow-hidden rounded-3xl bg-white/80 backdrop-blur-xl border border-white/50 p-8 hover:shadow-2xl transition-all duration-300"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-150 duration-500"></div>

                <div className="flex items-start gap-6 relative z-10">
                  <div className="w-16 h-16 bg-white rounded-2xl shadow-md flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <activity.icon className="text-green-600 w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{activity.title}</h3>
                    <p className="text-gray-600 mb-4">{activity.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {activity.features.map((feature, idx) => (
                        <span key={idx} className="text-xs font-medium px-3 py-1 bg-green-50 text-green-700 rounded-full border border-green-100">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-green-50/30 to-white"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Équipe de Direction</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Des leaders expérimentés qui font avancer notre vision
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative bg-white/40 backdrop-blur-md border border-white/60 rounded-3xl p-6 text-center hover:bg-white/80 transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
              >
                <div className="relative mb-6 inline-block">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-blue-500 rounded-full blur opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                  <img
                    src={member.image}
                    alt={member.name}
                    className="relative w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-green-600 font-medium text-sm uppercase tracking-wide mb-3">{member.role}</p>
                <p className="text-gray-500 text-sm leading-relaxed">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Nos Partenaires</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              En collaboration avec des organisations de premier plan partout en Afrique
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8">
            {partners.map((partner, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center justify-center p-6 bg-gray-50/50 backdrop-blur-sm rounded-2xl border border-gray-100 hover:border-green-200 hover:shadow-lg transition-all duration-300 group"
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-h-16 w-auto filter grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default About;