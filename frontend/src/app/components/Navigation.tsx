import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, Home, Menu, X, MessageCircle, User } from 'lucide-react';
import fortunaIcon from '../../assets/fortuna-icon.png';

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <nav
        className="sticky top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg shadow-xl border-b-2 border-pink-100"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Right side - Logo + Navigation Links */}
            <div className="flex items-center gap-6">
              <Link to="/" className="flex items-center gap-2 group">
                <img
                  src={fortunaIcon}
                  alt="Fortuna"
                  className="h-10 w-auto transition-transform group-hover:scale-110"
                />
                <span className="text-lg font-semibold bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent hidden md:block">
                  FORTUNA
                </span>
              </Link>

              {/* Navigation Links (Desktop) */}
              <div className="hidden md:flex items-center gap-4">
                <Link
                  to="/"
                  className={`flex items-center gap-2 px-3 py-2 rounded-full transition-all text-sm ${isActive('/')
                    ? 'bg-gradient-to-r from-pink-100 to-purple-100 text-pink-700 font-medium'
                    : 'text-gray-700 hover:text-pink-600 hover:bg-pink-50'
                    }`}
                >
                  <Home className="w-4 h-4" />
                  <span>דף הבית</span>
                </Link>

                <Link
                  to="/lev-el-lev"
                  className={`flex items-center gap-2 px-3 py-2 rounded-full transition-all text-sm ${isActive('/lev-el-lev')
                    ? 'bg-gradient-to-r from-pink-100 to-purple-100 text-pink-700 font-medium'
                    : 'text-gray-700 hover:text-pink-600 hover:bg-pink-50'
                    }`}
                >
                  <Heart className="w-4 h-4" />
                  <span>לב אל לב</span>
                </Link>

                <Link
                  to="/about"
                  className={`flex items-center gap-2 px-3 py-2 rounded-full transition-all text-sm ${isActive('/about')
                    ? 'bg-gradient-to-r from-pink-100 to-purple-100 text-pink-700 font-medium'
                    : 'text-gray-700 hover:text-pink-600 hover:bg-pink-50'
                    }`}
                >
                  <User className="w-4 h-4" />
                  <span>אודות</span>
                </Link>

                <Link
                  to="/feedback"
                  className={`flex items-center gap-2 px-3 py-2 rounded-full transition-all text-sm ${isActive('/feedback')
                    ? 'bg-gradient-to-r from-pink-100 to-purple-100 text-pink-700 font-medium'
                    : 'text-gray-700 hover:text-pink-600 hover:bg-pink-50'
                    }`}
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>משוב</span>
                </Link>

                <Link
                  to="/admin"
                  className={`flex items-center gap-2 px-3 py-2 rounded-full transition-all text-sm ${isActive('/admin')
                    ? 'bg-gradient-to-r from-pink-100 to-purple-100 text-pink-700 font-medium'
                    : 'text-gray-700 hover:text-pink-600 hover:bg-pink-50'
                    }`}
                >
                  <User className="w-4 h-4" />
                  <span>ניהול</span>
                </Link>
              </div>
            </div>

            {/* Left side - CTA Button (Desktop) */}
            <Link
              to="/order"
              className="hidden md:block group relative bg-gradient-to-r from-pink-600 via-rose-500 to-red-500 text-white px-6 py-2.5 rounded-full transition-all duration-300 shadow-lg hover:shadow-pink-500/50 hover:scale-105 overflow-hidden text-sm"
            >
              <span className="relative z-10 flex items-center gap-2 justify-center font-medium">
                <Heart className="w-4 h-4 group-hover:scale-110 transition-transform" />
                התחילו את המסע
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-rose-600 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-pink-50 transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-gray-700" />
              ) : (
                <Menu className="w-5 h-5 text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t-2 border-pink-100 shadow-xl">
            <div className="container mx-auto px-4 py-6 space-y-4">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive('/')
                  ? 'bg-gradient-to-r from-pink-100 to-purple-100 text-pink-700 font-medium'
                  : 'text-gray-700 hover:bg-pink-50'
                  }`}
              >
                <Home className="w-5 h-5" />
                <span>דף הבית</span>
              </Link>

              <Link
                to="/lev-el-lev"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive('/lev-el-lev')
                  ? 'bg-gradient-to-r from-pink-100 to-purple-100 text-pink-700 font-medium'
                  : 'text-gray-700 hover:bg-pink-50'
                  }`}
              >
                <Heart className="w-5 h-5" />
                <span>לב אל לב</span>
              </Link>

              <Link
                to="/about"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive('/about')
                  ? 'bg-gradient-to-r from-pink-100 to-purple-100 text-pink-700 font-medium'
                  : 'text-gray-700 hover:bg-pink-50'
                  }`}
              >
                <User className="w-5 h-5" />
                <span>אודות</span>
              </Link>

              <Link
                to="/feedback"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive('/feedback')
                  ? 'bg-gradient-to-r from-pink-100 to-purple-100 text-pink-700 font-medium'
                  : 'text-gray-700 hover:bg-pink-50'
                  }`}
              >
                <MessageCircle className="w-5 h-5" />
                <span>משוב</span>
              </Link>

              <Link
                to="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive('/admin')
                  ? 'bg-gradient-to-r from-pink-100 to-purple-100 text-pink-700 font-medium'
                  : 'text-gray-700 hover:bg-pink-50'
                  }`}
              >
                <User className="w-5 h-5" />
                <span>ניהול</span>
              </Link>

              {/* Mobile CTA */}
              <Link
                to="/order"
                onClick={() => setMobileMenuOpen(false)}
                className="group relative bg-gradient-to-r from-pink-600 via-rose-500 to-red-500 text-white px-6 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-pink-500/50 flex items-center justify-center gap-2 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2 justify-center font-medium">
                  <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  התחילו את המסע
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-rose-600 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}