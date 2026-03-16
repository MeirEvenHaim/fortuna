import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Users } from 'lucide-react';
import fortunaLogo from '../../assets/fortuna-logo.png';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-pink-50 via-blue-50 to-purple-50">
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-pink-300/30 to-rose-300/30 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-blue-300/25 to-cyan-300/25 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-br from-purple-300/20 to-pink-300/25 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Floating shapes */}
      <div className="absolute top-20 right-20 w-20 h-20 bg-gradient-to-br from-pink-400/30 to-rose-400/30 rounded-2xl rotate-12 animate-float pointer-events-none"></div>
      <div className="absolute bottom-32 right-32 w-16 h-16 bg-gradient-to-br from-blue-400/25 to-cyan-400/25 rounded-full animate-float animation-delay-2000 pointer-events-none"></div>
      <div className="absolute top-40 left-40 w-24 h-24 bg-gradient-to-br from-purple-400/25 to-pink-400/30 rounded-3xl -rotate-12 animate-float animation-delay-4000 pointer-events-none"></div>

      {/* Content */}
      <div className="container mx-auto px-4 z-10 text-center relative mt-16 lg:mt-0">
        <div className="mb-12">
          <div className="inline-block relative">
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

        <h1 className="mb-8 text-4xl md:text-5xl lg:text-5xl font-bold leading-tight text-gray-800">
          FORTUNA
          <br />
          <span className="text-3xl md:text-3xl lg:text-4xl bg-gradient-to-r from-pink-600 via-rose-500 to-blue-600 bg-clip-text text-transparent mt-4 block">
            מקום שבו תקשורת הופכת לחיבור
          </span>
        </h1>

        <p className="mb-12 max-w-3xl mx-auto text-gray-600 text-xl md:text-2xl leading-relaxed">
          תקשורת, גישור, אימון וחיבור אנושי<br />
          דרך משחקים חכמים שנוגעים בלב ומניעים שינוי אמיתי
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
          <Link
            to="/order"
            className="group relative bg-gradient-to-r from-pink-600 via-rose-500 to-red-500 text-white px-10 py-5 rounded-2xl transition-all duration-300 shadow-2xl hover:shadow-pink-500/50 hover:scale-105 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-3 justify-center text-lg font-medium">
              <Heart className="w-6 h-6 group-hover:scale-110 transition-transform" />
              נעים מאוד – לב אל לב
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-rose-600 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Link>

          <Link
            to="/about"
            className="group relative bg-white border-2 border-pink-200 text-pink-600 hover:bg-pink-50 px-10 py-5 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-3 justify-center text-lg font-medium">
              <Users className="w-6 h-6 group-hover:scale-110 transition-transform" />
              מי אנחנו ומה החזון
            </span>
          </Link>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white" fillOpacity="1" />
        </svg>
      </div>
    </section>
  );
}