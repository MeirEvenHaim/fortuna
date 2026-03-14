import React from 'react';
import { Mail, Phone, MapPin, Heart, MessageCircle, Instagram, Linkedin, Facebook } from 'lucide-react';
import { Link } from 'react-router-dom';
import fortunaLogo from '../../assets/fortuna-logo.png';
import fortunaIcon from '../../assets/fortuna-icon.png';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-pink-50/50 via-blue-50/50 to-purple-50/50 text-gray-700 py-20 relative overflow-hidden border-t border-pink-200/30">
      {/* Enhanced background decorations with pink/red hues */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-pink-300/30 to-rose-300/30 rounded-full blur-3xl animate-blob"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-blue-300/25 to-purple-300/25 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-br from-purple-300/20 to-pink-300/25 rounded-full blur-3xl animate-blob animation-delay-4000"></div>

      {/* Floating shapes */}
      <div className="absolute top-20 left-20 w-16 h-16 bg-gradient-to-br from-pink-400/30 to-rose-400/30 rounded-2xl rotate-12 animate-float"></div>
      <div className="absolute bottom-32 right-32 w-12 h-12 bg-gradient-to-br from-blue-400/25 to-purple-400/25 rounded-full animate-float animation-delay-2000"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Brand section with elegant full logo */}
        <div className="text-center mb-16">
          <div className="inline-block relative mb-8">
            {/* Elegant glow effect with pink and blue */}
            <div className="absolute -inset-6 bg-gradient-to-r from-pink-400/25 via-blue-400/20 to-rose-400/25 rounded-full blur-2xl animate-pulse"></div>
            <div className="relative">
              <img
                src={fortunaLogo}
                alt="Fortuna - לב אל לב"
                className="h-56 md:h-64 w-auto object-contain mx-auto drop-shadow-2xl"
              />
            </div>
          </div>

          <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed mb-6">
            פלטפורמת NLP חכמה המסייעת למשפחות וזוגות להתחבר מחדש
            דרך שיחות משמעותיות ופעילויות מהנות המחזקות את הקשר הרגשי
          </p>
        </div>

        {/* Links grid with gradient accents - added pink/red */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* About */}
          <div className="group">
            <div className="mb-6">
              <h4 className="text-gray-800 mb-3 text-lg flex items-center gap-2">
                <div className="w-1.5 h-6 bg-gradient-to-b from-pink-500 to-rose-500 rounded-full"></div>
                אודות
              </h4>
            </div>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-gray-600 hover:text-pink-600 transition-colors flex items-center gap-3 group/link">
                  <div className="w-1.5 h-1.5 bg-pink-400 rounded-full group-hover/link:scale-150 group-hover/link:bg-rose-500 transition-all"></div>
                  <span className="group-hover/link:translate-x-1 transition-transform">הסיפור שלנו</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="group">
            <div className="mb-6">
              <h4 className="text-gray-800 mb-3 text-lg flex items-center gap-2">
                <div className="w-1.5 h-6 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full"></div>
                משאבים
              </h4>
            </div>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-3 group/link">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full group-hover/link:scale-150 group-hover/link:bg-cyan-500 transition-all"></div>
                  <span className="group-hover/link:translate-x-1 transition-transform">מדריך למשתמש</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-3 group/link">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full group-hover/link:scale-150 group-hover/link:bg-cyan-500 transition-all"></div>
                  <span className="group-hover/link:translate-x-1 transition-transform">בלוג NLP</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-3 group/link">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full group-hover/link:scale-150 group-hover/link:bg-cyan-500 transition-all"></div>
                  <span className="group-hover/link:translate-x-1 transition-transform">מאמרים</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-3 group/link">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full group-hover/link:scale-150 group-hover/link:bg-cyan-500 transition-all"></div>
                  <span className="group-hover/link:translate-x-1 transition-transform">שאלות נפוצות</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="group">
            <div className="mb-6">
              <h4 className="text-gray-800 mb-3 text-lg flex items-center gap-2">
                <div className="w-1.5 h-6 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
                תמיכה
              </h4>
            </div>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors flex items-center gap-3 group/link">
                  <div className="w-1.5 h-1.5 bg-purple-400 rounded-full group-hover/link:scale-150 group-hover/link:bg-pink-500 transition-all"></div>
                  <span className="group-hover/link:translate-x-1 transition-transform">צור קשר</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors flex items-center gap-3 group/link">
                  <div className="w-1.5 h-1.5 bg-purple-400 rounded-full group-hover/link:scale-150 group-hover/link:bg-pink-500 transition-all"></div>
                  <span className="group-hover/link:translate-x-1 transition-transform">מדיניות פרטיות</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors flex items-center gap-3 group/link">
                  <div className="w-1.5 h-1.5 bg-purple-400 rounded-full group-hover/link:scale-150 group-hover/link:bg-pink-500 transition-all"></div>
                  <span className="group-hover/link:translate-x-1 transition-transform">תנאי שימוש</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Contact with enhanced cards */}
          <div>
            <div className="mb-6">
              <h4 className="text-gray-800 mb-3 text-lg flex items-center gap-2">
                <div className="w-1.5 h-6 bg-gradient-to-b from-rose-500 to-pink-500 rounded-full"></div>
                צור קשר
              </h4>
            </div>
            <ul className="space-y-4">
              <li className="group/card">
                <div className="flex items-start gap-3 bg-white/90 backdrop-blur-sm border-2 border-pink-200/50 rounded-2xl p-4 hover:bg-white hover:border-pink-300 hover:shadow-xl transition-all">
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-600 to-rose-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover/card:scale-110 transition-transform shadow-lg">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-xs text-pink-600 font-medium mb-1">אימייל</div>
                    <div className="text-gray-800">hello@fortuna.co.il</div>
                  </div>
                </div>
              </li>
              <li className="group/card">
                <div className="flex items-start gap-3 bg-white/90 backdrop-blur-sm border-2 border-blue-200/50 rounded-2xl p-4 hover:bg-white hover:border-blue-300 hover:shadow-xl transition-all">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover/card:scale-110 transition-transform shadow-lg">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-xs text-blue-600 font-medium mb-1">טלפון</div>
                    <div className="text-gray-800">050-1234567</div>
                  </div>
                </div>
              </li>
            </ul>

            {/* Enhanced Social media */}
            <div className="mt-6">
              <p className="text-sm text-gray-600 mb-4 font-medium">עקבו אחרינו</p>
              <div className="flex gap-3">
                <a href="#" className="group/social relative w-12 h-12 bg-white/90 hover:bg-gradient-to-br hover:from-pink-600 hover:to-rose-600 rounded-xl flex items-center justify-center transition-all hover:scale-110 border-2 border-pink-200/50 hover:border-transparent shadow-lg hover:shadow-xl">
                  <Instagram className="w-6 h-6 relative z-10 text-pink-600 group-hover/social:text-white transition-colors" />
                </a>
                <a href="#" className="group/social relative w-12 h-12 bg-white/90 hover:bg-gradient-to-br hover:from-blue-600 hover:to-cyan-600 rounded-xl flex items-center justify-center transition-all hover:scale-110 border-2 border-blue-200/50 hover:border-transparent shadow-lg hover:shadow-xl">
                  <Facebook className="w-6 h-6 relative z-10 text-blue-600 group-hover/social:text-white transition-colors" />
                </a>
                <a href="#" className="group/social relative w-12 h-12 bg-white/90 hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-600 rounded-xl flex items-center justify-center transition-all hover:scale-110 border-2 border-purple-200/50 hover:border-transparent shadow-lg hover:shadow-xl">
                  <Linkedin className="w-6 h-6 relative z-10 text-purple-600 group-hover/social:text-white transition-colors" />
                </a>
                <a href="#" className="group/social relative w-12 h-12 bg-white/90 hover:bg-gradient-to-br hover:from-gray-900 hover:to-gray-700 rounded-xl flex items-center justify-center transition-all hover:scale-110 border-2 border-gray-200/50 hover:border-transparent shadow-lg hover:shadow-xl">
                  <svg className="w-6 h-6 relative z-10 text-gray-900 group-hover/social:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                  </svg>
                </a>
                <a href="#" className="group/social relative w-12 h-12 bg-white/90 hover:bg-gradient-to-br hover:from-gray-900 hover:to-black rounded-xl flex items-center justify-center transition-all hover:scale-110 border-2 border-gray-200/50 hover:border-transparent shadow-lg hover:shadow-xl">
                  <svg className="w-5 h-5 relative z-10 text-gray-900 group-hover/social:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced bottom bar with gradient border */}
        <div className="relative">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-pink-400/40 via-blue-400/40 to-transparent"></div>
          <div className="pt-10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-right">
                <p className="text-gray-600 flex items-center gap-3">
                  <span>&copy; {currentYear}</span>
                  <span className="bg-gradient-to-r from-pink-600 via-blue-600 to-purple-600 bg-clip-text text-transparent font-bold text-xl tracking-wide">
                    FORTUNA
                  </span>
                  <span>• כל הזכויות שמורות</span>
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm border-2 border-pink-200/50 rounded-full px-5 py-2.5 shadow-lg">
                  <Heart className="w-5 h-5 text-rose-500 fill-rose-500 animate-pulse" />
                  <span className="text-sm text-gray-700 font-medium">נוצר באהבה בישראל</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}