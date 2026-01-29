import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, ArrowRight, ShieldCheck, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [willClearFields, setWillClearFields] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (error) setError('');
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setError('');

    // Prevent reload and show error if fields are empty
    if (!email.trim() || !password.trim()) {
      setError('Veuillez remplir tous les champs.');
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setError('Veuillez saisir une adresse email valide.');
      return;
    }

    setIsLoading(true);

    try {
      const success = await login(email.trim(), password);
      if (success) {
        navigate('/dashboard');
      }
    } catch (err: any) {
      // Improved error handling
      if (err?.response?.status === 401) {
        setError('Email ou mot de passe incorrect. Veuillez vérifier vos identifiants.');
        setEmail('');
        setPassword('');
      } else if (err?.response?.status === 400) {
        if (err.response.data?.message) {
          setError(err.response.data.message);
        } else {
          setError('Données de connexion invalides. Vérifiez le format de votre email.');
        }
      } else if (err?.response?.status === 404) {
        setError('Aucun compte associé à cet email. Vérifiez votre adresse email.');
      } else if (err?.response?.status === 429) {
        setError('Trop de tentatives de connexion. Veuillez patienter quelques minutes.');
      } else if (err?.response?.status === 500) {
        setError('Erreur serveur. Veuillez réessayer plus tard ou contacter le support.');
      } else if (err.code === 'ERR_NETWORK' || err.message === 'Network Error') {
        setError('Impossible de se connecter au serveur. Vérifiez votre connexion internet.');
      } else if (err.message) {
        const errorMessage = err.message;
        if (errorMessage.includes('Identifiants invalides') || errorMessage.includes('Invalid credentials')) {
          setError('Email ou mot de passe incorrect. Veuillez vérifier vos identifiants.');
          setWillClearFields(true);
          setTimeout(() => {
            setEmail('');
            setPassword('');
            setWillClearFields(false);
          }, 4000);
        } else if (errorMessage.includes('Email déjà utilisé')) {
          setError('Cet email est déjà utilisé par un autre compte.');
        } else if (errorMessage.includes('Email')) {
          setError('Format d\'email invalide. Veuillez saisir une adresse email valide.');
        } else if (errorMessage.includes('Mot de passe') || errorMessage.includes('password')) {
          setError('Le mot de passe doit contenir au moins 6 caractères.');
        } else if (errorMessage.includes('Compte bloqué') || errorMessage.includes('account locked')) {
          setError('Votre compte a été temporairement bloqué. Contactez le support.');
        } else if (errorMessage.includes('Compte inactif') || errorMessage.includes('inactive')) {
          setError('Votre compte est inactif. Vérifiez votre email pour l\'activer.');
        } else {
          setError(errorMessage);
        }
      } else {
        setError('Une erreur inattendue s\'est produite. Veuillez réessayer.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-2 sm:p-4 relative overflow-hidden bg-gradient-to-br from-slate-50 via-green-50/30 to-slate-100">
      {/* Enhanced Background */}
      <div className="absolute inset-0">
        <img
          src="https://res.cloudinary.com/drxouwbms/image/upload/v1755894348/20250821_1333_Senegalese_Unity_Network_simple_compose_01k36d7c5yed4vdr030kte04t7_ylytqo.png"
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/70 via-green-900/50 to-slate-800/70 backdrop-blur-[2px]"></div>
      </div>

      {/* Geometric Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-60 h-60 sm:w-80 sm:h-80 bg-gradient-to-br from-green-400/20 to-emerald-600/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -left-32 w-72 h-72 sm:w-96 sm:h-96 bg-gradient-to-tr from-green-300/15 to-teal-500/15 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-20 h-20 sm:w-32 sm:h-32 bg-green-400/10 rounded-full blur-2xl"></div>
      </div>

      {/* Retour bouton circulaire : 
          - En dessous du formulaire sur mobile
          - À gauche en sticky sur desktop */}
      <div className="w-full max-w-xs xs:max-w-sm sm:max-w-md md:max-w-lg relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full"
        >
          {/* Modern Card Container */}
          <div className="relative">
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 via-emerald-500/20 to-green-600/20 rounded-2xl blur-xl"></div>

            {/* Main Card */}
            <div className="relative bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden mx-1 xs:mx-2 sm:mx-4 md:mx-0">

              <div className="p-4 xs:p-5 sm:p-6 md:p-8">
                {/* Logo Section - More Compact */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="text-center mb-5 xs:mb-6 sm:mb-8"
                >
                  <div className="flex justify-center mb-2 xs:mb-3 sm:mb-4">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl blur-md opacity-30"></div>
                      <img
                        src="https://res.cloudinary.com/drxouwbms/image/upload/v1755777328/369470771_801733008414799_8805271754561376909_n_c4laj2.jpg"
                        alt="BAYY SA WAAR"
                        className="relative w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 rounded-xl object-cover shadow-lg border-2 border-white/30"
                      />
                    </div>
                  </div>
                  <h1 className="text-base xs:text-lg sm:text-xl font-bold text-slate-800 mb-1">
                    BAYY SA WAAR
                  </h1>
                  <p className="text-xs text-slate-500 font-medium tracking-wide uppercase">Valoriser la création locale</p>
                </motion.div>

                {/* Welcome Section - Refined */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="mb-5 xs:mb-6 sm:mb-8"
                >
                  <div className="text-center">
                    <h2 className="text-xl xs:text-2xl sm:text-2xl font-bold text-green-600 mb-2 tracking-tight">
                      Connexion
                    </h2>
                    <p className="text-slate-600 text-xs xs:text-sm leading-relaxed max-w-[90vw] xs:max-w-xs mx-auto px-1 xs:px-2 sm:px-0">
                      Accédez à votre espace personnel en toute sécurité
                    </p>
                  </div>
                </motion.div>

                {/* Form - Enhanced */}
                <motion.form
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  onSubmit={handleSubmit}
                  className="space-y-4 xs:space-y-5 sm:space-y-6"
                >
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      className="bg-red-50/80 backdrop-blur-sm border border-red-200/50 text-red-700 px-2 xs:px-3 sm:px-4 py-2 xs:py-2.5 sm:py-3 rounded-xl text-xs xs:text-sm font-medium"
                    >
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        <span>{error}</span>
                      </div>
                      {willClearFields && (
                        <div className="mt-2 text-xs text-red-600 flex items-center space-x-1">
                          <div className="w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse"></div>
                          <span>Les champs seront vidés dans quelques secondes...</span>
                        </div>
                      )}
                    </motion.div>
                  )}

                  {/* Email Field - Modern Design */}
                  <div className="space-y-1.5 xs:space-y-2 sm:space-y-3">
                    <label htmlFor="email" className="block text-xs xs:text-sm font-semibold text-slate-700 tracking-wide">
                      Adresse Email
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl opacity-0 group-focus-within:opacity-100 blur-xl transition-opacity duration-300"></div>
                      <Mail className="absolute left-3 xs:left-3.5 sm:left-4 top-1/2 transform -translate-y-1/2 text-slate-400 group-focus-within:text-green-600 transition-colors duration-200" size={16} />
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={handleEmailChange}
                        placeholder="votre@email.com"
                        className={`relative w-full pl-9 xs:pl-10 sm:pl-11 pr-2 xs:pr-3 sm:pr-4 py-2.5 xs:py-3 sm:py-3.5 border rounded-xl focus:ring-2 focus:ring-green-500/20 focus:border-green-500/40 transition-all duration-200 bg-white/60 backdrop-blur-sm hover:bg-white/80 text-slate-800 placeholder-slate-400 text-xs xs:text-sm sm:text-base ${willClearFields ? 'border-red-300 bg-red-50/30' : 'border-slate-200/60'
                          }`}
                      />
                    </div>
                  </div>

                  {/* Password Field - Enhanced */}
                  <div className="space-y-1.5 xs:space-y-2 sm:space-y-3">
                    <label htmlFor="password" className="block text-xs xs:text-sm font-semibold text-slate-700 tracking-wide">
                      Mot de Passe
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl opacity-0 group-focus-within:opacity-100 blur-xl transition-opacity duration-300"></div>
                      <Lock className="absolute left-3 xs:left-3.5 sm:left-4 top-1/2 transform -translate-y-1/2 text-slate-400 group-focus-within:text-green-600 transition-colors duration-200" size={16} />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        value={password}
                        onChange={handlePasswordChange}
                        placeholder="••••••••"
                        className={`relative w-full pl-9 xs:pl-10 sm:pl-11 pr-10 xs:pr-11 sm:pr-12 py-2.5 xs:py-3 sm:py-3.5 border rounded-xl focus:ring-2 focus:ring-green-500/20 focus:border-green-500/40 transition-all duration-200 bg-white/60 backdrop-blur-sm hover:bg-white/80 text-slate-800 placeholder-slate-400 text-xs xs:text-sm sm:text-base ${willClearFields ? 'border-red-300 bg-red-50/30' : 'border-slate-200/60'
                          }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 xs:right-3.5 sm:right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors duration-200 p-1"
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>



                  {/* Enhanced Sign In Button */}
                  <motion.button
                    whileHover={{ scale: 1.01, y: -1 }}
                    whileTap={{ scale: 0.99 }}
                    type="submit"
                    disabled={isLoading}
                    className="w-full relative mt-5 xs:mt-6 sm:mt-8 group"
                  >
                    {/* Button Background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-green-600 via-green-500 to-emerald-600 rounded-xl opacity-100 group-hover:opacity-90 transition-opacity duration-200"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-green-700 via-green-600 to-emerald-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>

                    {/* Button Content */}
                    <div className="relative flex items-center justify-center space-x-1.5 xs:space-x-2 sm:space-x-3 py-2.5 xs:py-3 sm:py-3.5 px-3 xs:px-4 sm:px-6 text-white font-semibold">
                      <div className="absolute inset-0 bg-white/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>

                      {isLoading ? (
                        <div className="flex items-center space-x-1.5 xs:space-x-2 sm:space-x-3">
                          <div className="w-4 h-4 xs:w-5 xs:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          <span className="text-xs xs:text-sm">Connexion...</span>
                        </div>
                      ) : (
                        <>
                          <ShieldCheck size={14} className="xs:w-[16px] xs:h-[16px] sm:w-[18px] sm:h-[18px] group-hover:scale-110 transition-transform duration-200" />
                          <span className="tracking-wide text-xs xs:text-sm sm:text-base">Se Connecter</span>
                          <ArrowRight size={14} className="xs:w-[16px] xs:h-[16px] sm:w-[18px] sm:h-[18px] group-hover:translate-x-1 transition-transform duration-200" />
                        </>
                      )}
                    </div>

                    {/* Button Shine Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 rounded-xl"></div>
                  </motion.button>
                </motion.form>

                {/* Sign Up Link */}
                <div className="mt-8 pt-6 border-t border-slate-100/60 text-center">
                  <p className="text-slate-500 text-xs xs:text-sm mb-4">
                    Pas encore membre ?
                  </p>
                  <Link
                    to="/enrollments"
                    className="inline-flex items-center justify-center space-x-2 w-full py-3 px-6 rounded-xl border-2 border-green-600 text-green-600 font-bold hover:bg-green-600 hover:text-white transition-all duration-300 group/reg"
                  >
                    <span>CRÉER UN COMPTE</span>
                    <ArrowRight size={16} className="group-hover/reg:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        {/* Retour bouton circulaire : 
            - En dessous du formulaire sur mobile
            - À gauche en sticky sur desktop */}
        <button
          onClick={() => navigate('/')}
          aria-label="Retour"
          className={`
            flex items-center justify-center
            w-10 h-10 sm:w-12 sm:h-12
            rounded-full
            bg-gradient-to-br from-white/80 via-green-100/80 to-slate-100/80
            shadow-lg border border-green-200/60
            hover:from-green-100 hover:to-green-200
            transition-all duration-200 group
            z-20
            block mx-auto mt-8
            sm:fixed sm:left-4 sm:top-1/2 sm:mx-0 sm:mt-0
          `}
          style={{
            boxShadow: '0 4px 24px 0 rgba(16, 185, 129, 0.10)',
            // Sur mobile, pas de translateY, sur desktop (sm:), translateY(-50%)
            transform: typeof window !== 'undefined' && window.innerWidth >= 640 ? 'translateY(-50%)' : undefined,
          }}
        >
          <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 group-hover:-translate-x-1 transition-transform duration-200" />
        </button>
      </div>
    </div>
  );
};

export default Login;