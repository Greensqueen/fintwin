import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Wallet, User } from 'lucide-react';

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/profile', label: 'Profile' },
  { path: '/dashboard', label: 'Dashboard' },
  { path: '/scenarios', label: 'Scenarios' },
];

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-primary-900/80 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-10 h-10 bg-gradient-to-br from-secondary-500 to-accent-500 rounded-xl flex items-center justify-center">
              <Wallet className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-secondary-400 to-accent-400 bg-clip-text text-transparent">
              FinTwin
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`text-sm font-medium transition-colors duration-300 ${
                  location.pathname === item.path
                    ? 'text-secondary-400'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <button className="btn-secondary flex items-center gap-2">
              <User className="w-4 h-4" />
              Sign In
            </button>
          </div>

          <button
            className="md:hidden text-white/60 hover:text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-primary-800/90 backdrop-blur-xl border-t border-white/10">
          <div className="px-4 py-4 space-y-3">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => {
                  navigate(item.path);
                  setIsMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors duration-300 ${
                  location.pathname === item.path
                    ? 'text-secondary-400 bg-secondary-500/10'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button className="btn-primary w-full mt-4">
              Sign In
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
