import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn, ArrowRight } from 'lucide-react';
import fortunaLogo from '../../assets/fortuna-logo.png';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      
      if (response.ok && data.token) {
        localStorage.setItem('fortuna_token', data.token);
        localStorage.setItem('fortuna_user', JSON.stringify(data.user));
        navigate('/courses');
      } else {
        setError(data.error || 'שגיאה בהתחברות. בדקו את הפרטים ונסו שוב.');
      }
    } catch (err) {
      setError('אירעה שגיאה בחיבור לשרת.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] flex items-center justify-center relative overflow-hidden p-4" dir="rtl">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-pink-200/40 to-rose-100/40 rounded-full blur-3xl pointer-events-none -translate-y-1/2 -translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-blue-100/40 to-cyan-100/40 rounded-full blur-3xl pointer-events-none translate-y-1/3"></div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-10">
          <Link to="/">
            <img src={fortunaLogo} alt="Fortuna" className="h-16 mx-auto mb-6 drop-shadow-sm hover:scale-105 transition-transform" />
          </Link>
          <h1 className="text-3xl font-black text-gray-900 mb-2">ברוכים השבים 💖</h1>
          <p className="text-gray-500 font-medium">התחברו כדי להמשיך במסע שלכם.</p>
        </div>

        <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 border border-white shadow-2xl">
          <form onSubmit={handleLogin} className="space-y-6">
            
            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-sm font-medium border border-red-100">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">אימייל</label>
              <div className="relative">
                <Mail className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-2xl py-4 pr-12 pl-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500 transition-all shadow-sm"
                  placeholder="name@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">סיסמה</label>
              <div className="relative">
                <Lock className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-2xl py-4 pr-12 pl-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500 transition-all shadow-sm"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-gradient-to-l from-pink-600 to-rose-500 text-white rounded-2xl py-4 font-bold text-lg hover:shadow-lg hover:shadow-pink-500/30 hover:scale-[1.02] transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:hover:scale-100"
            >
              {isLoading ? 'מתחבר לחשבון...' : (
                <>
                  כניסה לחשבון
                  <LogIn className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                </>
              )}
            </button>

          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-500 mb-4">עדיין לא התחלתם את המסע?</p>
            <Link to="/register" className="text-pink-600 font-bold hover:text-pink-700 flex items-center justify-center gap-1 group">
              הצטרפו עכשיו ל-FORTUNA
              <ArrowRight className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
