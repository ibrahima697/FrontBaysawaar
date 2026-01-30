import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, LogOut, User, ChevronDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import LogoutModal from './LogoutModal';
import { getUserPhoto, getUserDisplayName } from '../utils/userUtils';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    if (!dropdownOpen) return;
    function handleClick(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [dropdownOpen]);

  const navItems = [
    { name: 'Accueil', path: '/' },
    { name: 'À propos', path: '/about' },
    ...(!user ? [{ name: 'Rejoindre', path: '/enrollments' }] : []),
    //{ name: 'Plateformes', path: '/platforms' },
    { name: 'Activités', path: '/activities' },
    //{ name: 'Fabira Trading', path: '/fabira-trading' },
    { name: 'Événements', path: '/events' },
    //{ name: 'Contact', path: '/contact' },
    { name: 'Blog', path: '/blog' }
  ];

  const handleLogout = () => {
    setShowLogoutModal(true);
    setIsOpen(false);
    setDropdownOpen(false);
  };

  const confirmLogout = () => {
    logout();
    setShowLogoutModal(false);
  };

  // Helper for nav item active state
  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <style>
        {`
        .nav-link {
          position: relative;
          transition: color 0.18s, background 0.18s;
        }
        
        .nav-link:hover, .nav-link:focus-visible {
          color: #2d8755 !important;
          background: #f3f4f6;
        }
        .nav-link:hover::after, .nav-link:focus-visible::after {
          transform: translateX(-50%) scaleX(1);
        }
        .nav-link.active {
          color: #ffffff !important;
          background: #2d8755;
          font-weight: 700;
        }
        .nav-link.active::after {
          transform: translateX(-50%) scaleX(1);
          background: #2d8755;
        }
        .dashboard-link {
          transition: box-shadow 0.18s, background 0.18s, color 0.18s;
          box-shadow: 0 2px 8px 0 rgba(34,197,94,0.08);
        }
        .dashboard-link.active {
          background: #2d8755;
          color: #fff !important;
          box-shadow: 0 4px 16px 0 rgba(34,197,94,0.18);
        }
        .dashboard-link:not(.active) {
          background: #f0fdf4;
          color: #2d8755;
        }
        .dashboard-link:hover:not(.active), .dashboard-link:focus-visible:not(.active) {
          background: #e5f9ec;
          color: #15803d;
        }
        `}
      </style>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-lg' : 'bg-white/95 backdrop-blur-sm'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-3 group transition-transform duration-200 hover:scale-[1.02]">
              <div className="relative">
                <img
                  src="https://res.cloudinary.com/drxouwbms/image/upload/v1755777328/369470771_801733008414799_8805271754561376909_n_c4laj2.jpg"
                  alt="BAY SA WARR Logo"
                  className="w-11 h-11 rounded-xl object-cover shadow-md border border-gray-100 group-hover:border-green-200 transition-colors duration-200"
                />
                <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-black/5 pointer-events-none" />
              </div>
              <div className="flex flex-col">
                <h1 className="text-xl font-black tracking-tight flex items-center">
                  <span className="text-blue-900 transition-colors duration-200 group-hover:text-green-700">BAY SA</span>
                  <span className="text-green-600 ml-1.5">WARR</span>
                </h1>

              </div>
            </Link>

            <div className="hidden md:flex items-center space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`nav-link text-sm font-medium px-2 py-1 rounded-md transition-all duration-200 ${isActive(item.path) ? 'active' : 'text-gray-700'
                    }`}
                  tabIndex={0}
                >
                  {item.name}
                </Link>
              ))}
              {user ? (
                <div className="flex items-center space-x-4">
                  <Link
                    to="/dashboard"
                    className={`dashboard-link flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 focus:outline-none ${isActive('/dashboard') ? 'active' : ''
                      }`}
                    tabIndex={0}
                  >
                    <User size={16} />
                    <span>Dashboard</span>
                  </Link>
                  {/* User Profile Dropdown */}
                  <div className="relative" ref={dropdownRef}>
                    <button
                      className="flex items-center space-x-2 focus:outline-none"
                      onClick={() => setDropdownOpen((open) => !open)}
                      aria-haspopup="true"
                      aria-expanded={dropdownOpen}
                    >
                      <img
                        src={getUserPhoto(user)}
                        alt={getUserDisplayName(user)}
                        className="w-9 h-9 rounded-full object-cover border-2 border-green-600"
                      />
                      <ChevronDown
                        size={18}
                        className={`transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''
                          } text-gray-500`}
                      />
                    </button>
                    <AnimatePresence>
                      {dropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.18 }}
                          className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-100 z-50"
                        >
                          <div className="px-4 py-4 flex items-center space-x-3 border-b border-gray-100">
                            <img
                              src={getUserPhoto(user)}
                              alt={getUserDisplayName(user)}
                              className="w-12 h-12 rounded-full object-cover border-2 border-green-600"
                            />
                            <div>
                              <div className="font-semibold text-gray-900 text-base truncate max-w-[120px]">
                                {getUserDisplayName(user)}
                              </div>
                              {user.role && (
                                <span className="inline-block mt-1 px-2 py-0.5 text-xs font-semibold rounded bg-green-100 text-green-700">
                                  {user.role}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="py-2">
                            <button
                              onClick={handleLogout}
                              className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                            >
                              <LogOut size={16} className="mr-2" />
                              Se déconnecter
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-green-700 transition-colors duration-200"
                >
                  Login
                </Link>
              )}
            </div>

            <button
              className="md:hidden"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          <motion.div
            initial={false}
            animate={{ height: isOpen ? 'auto' : 0 }}
            className="md:hidden overflow-hidden"
          >
            <div className="py-4 space-y-2">
              {/* Nav links */}
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 text-base font-medium px-4 py-2 rounded-lg transition-all duration-200 ${isActive(item.path)
                    ? 'bg-green-700 text-white font-semibold shadow'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-green-600'
                    }`}
                  style={{
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                  {/* Removed green line for active link */}
                </Link>
              ))}

              {/* Divider */}
              <div className="border-t border-gray-200 my-2" />

              {/* User section */}
              {user ? (
                <div className="flex flex-col gap-2 px-2">
                  <div className="flex items-center gap-3 px-2 py-2 rounded-lg bg-gray-50">
                    <img
                      src={getUserPhoto(user)}
                      alt={getUserDisplayName(user)}
                      className="w-10 h-10 rounded-full object-cover border-2 border-green-600"
                    />
                    <div>
                      <div className="font-semibold text-gray-900 text-base truncate max-w-[120px]">
                        {getUserDisplayName(user)}
                      </div>
                      {user.role && (
                        <span className="inline-block mt-0.5 px-2 py-0.5 text-xs font-semibold rounded bg-green-100 text-green-700">
                          {user.role}
                        </span>
                      )}
                    </div>
                  </div>
                  <Link
                    to="/dashboard"
                    className={`flex items-center justify-center gap-2 px-4 py-2 rounded-full text-base font-semibold transition-all duration-200 dashboard-link ${isActive('/dashboard') ? 'active' : ''
                      }`}
                    style={{
                      boxShadow: isActive('/dashboard')
                        ? '0 4px 16px 0 rgba(34,197,94,0.18)'
                        : '0 2px 8px 0 rgba(34,197,94,0.08)',
                    }}
                    onClick={() => setIsOpen(false)}
                  >
                    <User size={18} />
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center justify-center gap-2 w-full px-4 py-2 rounded-full text-base font-medium text-red-600 bg-red-50 hover:bg-red-100 transition-colors duration-200"
                  >
                    <LogOut size={18} />
                    Se déconnecter
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-2 rounded-full text-base font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  <User size={18} />
                  Login
                </Link>
              )}
            </div>
          </motion.div>
        </div>
      </motion.nav>

      {/* Logout Confirmation Modal */}
      <LogoutModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={confirmLogout}
      />
    </>
  );
};

export default Navbar;
