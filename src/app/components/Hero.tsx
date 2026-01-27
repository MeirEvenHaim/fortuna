import React from 'react';
import { Link } from 'react-router-dom';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Heart, MessageSquare, Users, Sparkles } from 'lucide-react';
import fortunaLogo from '../../assets/fortuna-logo.png';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-pink-50 via-blue-50 to-purple-50">
      {/* Animated background blobs - added pink and red hues */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-pink-300/30 to-rose-300/30 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-blue-300/25 to-cyan-300/25 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-br from-purple-300/20 to-pink-300/25 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Floating shapes */}
      <div className="absolute top-20 right-20 w-20 h-20 bg-gradient-to-br from-pink-400/30 to-rose-400/30 rounded-2xl rotate-12 animate-float"></div>
      <div className="absolute bottom-32 right-32 w-16 h-16 bg-gradient-to-br from-blue-400/25 to-cyan-400/25 rounded-full animate-float animation-delay-2000"></div>
      <div className="absolute top-40 left-40 w-24 h-24 bg-gradient-to-br from-purple-400/25 to-pink-400/30 rounded-3xl -rotate-12 animate-float animation-delay-4000"></div>

      {/* Content */}
      <div className="container mx-auto px-4 z-10 text-center">
        {/* Beautiful Full Logo with Text */}
        <div className="mb-12">
          <div className="inline-block relative">
            {/* Elegant glow effect with pink and blue */}
            <div className="absolute -inset-8 bg-gradient-to-r from-pink-400/25 via-blue-400/20 to-rose-400/25 rounded-full blur-3xl animate-pulse"></div>
            <div className="relative">
              <img
                src={fortunaLogo}
                alt="Fortuna - לב אל לב"
                className="h-64 md:h-80 lg:h-96 w-auto object-contain mx-auto drop-shadow-2xl"
              />
            </div>
          </div>
        </div>

        {/* Icon badges - added pink/red colors */}
        <div className="flex justify-center gap-4 mb-8">
          <div className="bg-white/90 backdrop-blur-md border-2 border-pink-200/60 rounded-2xl p-3 shadow-lg hover:shadow-pink-200 hover:shadow-xl hover:scale-110 transition-all">
            <Heart className="w-6 h-6 text-rose-500" />
          </div>
          <div className="bg-white/90 backdrop-blur-md border-2 border-blue-200/50 rounded-2xl p-3 shadow-lg hover:shadow-blue-200 hover:shadow-xl hover:scale-110 transition-all">
            <MessageSquare className="w-6 h-6 text-blue-600" />
          </div>
          <div className="bg-white/90 backdrop-blur-md border-2 border-purple-200/50 rounded-2xl p-3 shadow-lg hover:shadow-purple-200 hover:shadow-xl hover:scale-110 transition-all">
            <Users className="w-6 h-6 text-purple-600" />
          </div>
        </div>

        {/* Expanded Creator/Expert Section */}
        <div className="max-w-4xl mx-auto mb-10">
          <div className="bg-white/90 backdrop-blur-md border-2 border-pink-200/50 rounded-3xl p-8 shadow-2xl">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-100 to-purple-100 px-4 py-2 rounded-full mb-4">
                <Sparkles className="w-4 h-4 text-pink-600" />
                <span className="text-sm text-pink-700 font-medium">המומחה שלנו</span>
              </div>

              <h3 className="text-2xl md:text-3xl mb-3 text-gray-800">
                <span className="font-bold">אמיר גז</span>
              </h3>

              <div className="text-lg mb-4 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent font-semibold">
                מומחה בינלאומי ב-NLP ותקשורת זוגית
              </div>

              <div className="max-w-2xl mx-auto text-gray-600 leading-relaxed space-y-3">
                <p>
                  בעל ניסיון של למעלה מ-15 שנה בליווי זוגות ומשפחות ליצירת קשרים עמוקים ומשמעותיים
                </p>
                <div className="flex flex-wrap justify-center gap-3 text-sm">
                  <div className="flex items-center gap-2 bg-pink-50 px-4 py-2 rounded-full border border-pink-200">
                    <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                    <span>מאסטר בתכנות נוירו לשוני (NLP)</span>
                  </div>
                  <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full border border-blue-200">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>מומחה לתקשורת זוגית ומשפחתית</span>
                  </div>
                  <div className="flex items-center gap-2 bg-purple-50 px-4 py-2 rounded-full border border-purple-200">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span>ליווי של למעלה מ-3,000 זוגות ומשפחות</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Creator badge - kept simple for continuity */}
        <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-md border-2 border-pink-200/50 rounded-full px-6 py-3 mb-8 shadow-lg hover:shadow-xl transition-all">
          <Sparkles className="w-5 h-5 text-pink-500" />
          <span className="text-sm text-gray-700">מאת אמיר גז • מומחה NLP ותקשורת זוגית</span>
        </div>

        {/* Tagline - added pink/red gradient */}
        <h1 className="mb-8 text-3xl md:text-4xl lg:text-5xl leading-tight text-gray-800">
          חזרו להתחבר
          <br />
          <span className="bg-gradient-to-r from-pink-600 via-rose-500 to-blue-600 bg-clip-text text-transparent">
            משפחה. זוגיות. אהבה.
          </span>
        </h1>

        <p className="mb-12 max-w-3xl mx-auto text-gray-600 text-xl md:text-2xl leading-relaxed">
          פלטפורמה חכמה המשתמשת ב-NLP מתקדם כדי ליצור שיחות משמעותיות,<br />
          לחזק קשרים ולהפוך כל רגע לחוויה בלתי נשכחת של חיבור אמיתי
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
          <Link
            to="/order"
            className="group relative bg-gradient-to-r from-pink-600 via-rose-500 to-red-500 text-white px-10 py-5 rounded-2xl transition-all duration-300 shadow-2xl hover:shadow-pink-500/50 hover:scale-105 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-3 justify-center text-lg">
              <Heart className="w-6 h-6 group-hover:scale-110 transition-transform" />
              התחילו את המסע
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-rose-600 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Link>
        </div>

        {/* Social proof - added pink/red colors */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="bg-white/80 backdrop-blur-md border-2 border-pink-200/50 rounded-3xl p-8 shadow-xl hover:shadow-2xl hover:shadow-pink-200/30 transition-all hover:-translate-y-2">
            <div className="text-4xl md:text-5xl mb-3 bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">15K+</div>
            <div className="text-gray-600">משפחות מחוברות</div>
            <div className="flex justify-center gap-1 mt-4">
              {[...Array(5)].map((_, i) => (
                <Heart key={i} className="w-4 h-4 fill-rose-400 text-rose-400" />
              ))}
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-md border-2 border-blue-200/50 rounded-3xl p-8 shadow-xl hover:shadow-2xl hover:shadow-blue-200/30 transition-all hover:-translate-y-2">
            <div className="text-4xl md:text-5xl mb-3 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">2M+</div>
            <div className="text-gray-600">שיחות משמעותיות</div>
            <div className="flex justify-center gap-1 mt-4">
              {[...Array(5)].map((_, i) => (
                <MessageSquare key={i} className="w-4 h-4 text-blue-400 fill-blue-400" />
              ))}
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-md border-2 border-purple-200/50 rounded-3xl p-8 shadow-xl hover:shadow-2xl hover:shadow-purple-200/30 transition-all hover:-translate-y-2">
            <div className="text-4xl md:text-5xl mb-3 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">98%</div>
            <div className="text-gray-600">חווים חיבור עמוק יותר</div>
            <div className="flex justify-center gap-1 mt-4">
              {[...Array(5)].map((_, i) => (
                <Sparkles key={i} className="w-4 h-4 text-purple-400 fill-purple-400" />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white" fillOpacity="0.8" />
        </svg>
      </div>
    </section>
  );
}