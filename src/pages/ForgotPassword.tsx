import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';
import { authAPI } from '../services/api';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setIsLoading(true);
        setStatus('idle');
        setMessage('');

        try {
            await authAPI.resetPassword(email);
            setStatus('success');
            setMessage('Un email de réinitialisation a été envoyé si ce compte existe.');
        } catch (error: any) {
            setStatus('error');
            setMessage(error.response?.data?.message || 'Une erreur est survenue. Veuillez réessayer.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-50 via-green-50/30 to-slate-100 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-white/5 opacity-5" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-8 relative z-10"
            >
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Mail className="w-8 h-8 text-green-600" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Mot de passe oublié ?</h1>
                    <p className="text-gray-600 text-sm">
                        Entrez votre adresse email pour recevoir un lien de réinitialisation.
                    </p>
                </div>

                {status === 'success' ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-green-50 border border-green-200 rounded-xl p-6 text-center"
                    >
                        <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                        <p className="text-green-800 font-medium mb-4">{message}</p>
                        <Link
                            to="/login"
                            className="inline-block bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors"
                        >
                            Retour à la connexion
                        </Link>
                    </motion.div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {status === 'error' && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2 text-sm">
                                <AlertCircle size={16} />
                                {message}
                            </div>
                        )}

                        <div className="space-y-2">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Adresse Email
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                                    placeholder="votre@email.com"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    <span>Envoi...</span>
                                </>
                            ) : (
                                'Envoyer le lien'
                            )}
                        </button>

                        <div className="text-center">
                            <Link
                                to="/login"
                                className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
                            >
                                <ArrowLeft size={16} className="mr-1" />
                                Retour à la connexion
                            </Link>
                        </div>
                    </form>
                )}
            </motion.div>
        </div>
    );
};

export default ForgotPassword;
