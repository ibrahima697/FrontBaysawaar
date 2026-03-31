import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff, ArrowRight, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || '/dashboard';

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
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Veuillez remplir tous les champs.');
      return;
    }

    setIsLoading(true);

    try {
      const success = await login(email.trim(), password);
      if (success) {
        navigate(from);
      }
    } catch (err: any) {
      if (err?.response?.status === 401) {
        setError('Email ou mot de passe incorrect.');
      } else {
        setError('Une erreur s\'est produite. Veuillez réessayer.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen lg:h-screen w-full bg-white flex flex-col lg:flex-row items-center justify-center lg:overflow-hidden font-sans">
      {/* Immersive Design Container */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full h-full flex flex-col lg:flex-row items-stretch lg:overflow-hidden bg-white"
      >
        {/* Left Side: Cinematic Banner (Desktop only) */}
        <div className="hidden lg:flex lg:w-1/2 relative p-4 h-full">
          <div className="relative h-full w-full rounded-[2.5rem] overflow-hidden group shadow-2xl">
            <img
              src="https://res.cloudinary.com/drxouwbms/image/upload/v1755894348/20250821_1333_Senegalese_Unity_Network_simple_compose_01k36d7c5yed4vdr030kte04t7_ylytqo.png"
              alt="BAYY SA WAAR"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

            {/* Minimal Overlay Text */}
            <div className="absolute inset-x-0 bottom-0 p-12 space-y-4">
              <span className="text-white/60 font-black uppercase tracking-[0.3em] text-[10px]">Excellence choisie</span>
              <h3 className="text-white text-4xl xl:text-5xl font-black leading-[0.95] tracking-tighter">
                Valoriser l'excellence de la <span className="text-green-500 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">création locale</span> africaine
              </h3>

              <div className="pt-6">
              </div>
            </div>

            <div className="absolute top-10 left-10">
              <Link to="/" className="flex items-center gap-3 text-white group bg-white/10 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/20 hover:bg-white/20 transition-all">
                <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                <span className="text-xs font-black uppercase tracking-widest text-white/80">Retour Accueil</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Right Side: Clean Form */}
        <div className="flex-1 flex flex-col justify-center px-6 sm:px-16 lg:px-24 xl:px-32 py-12 relative bg-white overflow-y-auto">
          <div className="max-w-md w-full mx-auto space-y-8 sm:space-y-12">
            <div className="space-y-6 sm:space-y-8 text-center">
              {/* Centered Logo */}
              <div className="flex justify-center">
                <img
                  src="https://res.cloudinary.com/drxouwbms/image/upload/v1755777328/369470771_801733008414799_8805271754561376909_n_c4laj2.jpg"
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl shadow-xl border border-gray-50"
                  alt="Logo"
                />
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-3 sm:space-y-4 text-center"
              >
                <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-gray-900 tracking-tighter leading-[0.85]">
                  Bienvenue
                </h1>
                <p className="text-gray-400 font-medium text-sm sm:text-lg leading-relaxed">
                  Sur votre portail Baysawarr.
                </p>
              </motion.div>
            </div>

            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              onSubmit={handleSubmit}
              className="space-y-8"
            >
              {error && (
                <div className="p-5 bg-red-50 border border-red-100 text-red-600 text-sm font-bold rounded-2xl animate-shake">
                  {error}
                </div>
              )}

              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 ml-1">Adresse Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    className="w-full h-16 px-6 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-green-500/10 focus:border-green-500 outline-none transition-all placeholder:text-gray-300 font-medium text-lg"
                    placeholder="votre@email.com"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center px-1">
                    <label className="text-[11px] font-black uppercase tracking-widest text-gray-400">Mot de Passe</label>
                    <Link to="/forgot-password" title="Mot de passe oublié ?" className="text-[11px] font-black uppercase tracking-widest text-green-600 hover:text-green-700">
                      Oublié ?
                    </Link>
                  </div>
                  <div className="relative group">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={handlePasswordChange}
                      className="w-full h-16 px-6 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-green-500/10 focus:border-green-500 outline-none transition-all placeholder:text-gray-300 font-medium pr-14 text-lg"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-green-600 transition-colors"
                    >
                      {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                    </button>
                  </div>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                disabled={isLoading}
                type="submit"
                className="w-full h-16 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-2xl font-black text-lg transition-all hover:shadow-2xl hover:shadow-green-900/20 active:scale-95 disabled:opacity-70 flex items-center justify-center gap-3"
              >
                {isLoading ? (
                  <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span className="uppercase tracking-widest">Se Connecter</span>
                    <ArrowRight size={20} />
                  </>
                )}
              </motion.button>
            </motion.form>

            <div className="pt-12 text-center border-t border-gray-100">
              <p className="text-gray-400 text-sm font-bold">
                Pas encore de compte ? {' '}
                <Link to="/enrollments" className="text-green-600 hover:underline underline-offset-8 decoration-2">S'inscrire gratuitement</Link>
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;