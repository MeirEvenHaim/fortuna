import React from 'react';
import { Heart, MessageCircle, Users, Sparkles, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import fortunaLogo from '../../assets/fortuna-logo.png';

export function AboutPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50/50 via-blue-50/50 to-purple-50/50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-pink-300/20 to-rose-300/20 rounded-full blur-3xl animate-blob"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-blue-300/15 to-purple-300/15 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-br from-purple-300/10 to-pink-300/15 rounded-full blur-3xl animate-blob animation-delay-4000"></div>

      {/* Floating shapes */}
      <div className="absolute top-20 left-20 w-16 h-16 bg-gradient-to-br from-pink-400/20 to-rose-400/20 rounded-2xl rotate-12 animate-float"></div>
      <div className="absolute bottom-32 right-32 w-12 h-12 bg-gradient-to-br from-blue-400/15 to-purple-400/15 rounded-full animate-float animation-delay-2000"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header Section with Logo */}
        <div className="text-center mb-16">
          <div className="inline-block relative mb-8">
            <div className="absolute -inset-6 bg-gradient-to-r from-pink-400/20 via-blue-400/15 to-rose-400/20 rounded-full blur-2xl animate-pulse"></div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-pink-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
            אודות
          </h1>
          <div className="w-32 h-1.5 bg-gradient-to-r from-pink-500 via-blue-500 to-purple-500 rounded-full mx-auto"></div>
        </div>

        {/* Main Content Card */}
        <div className="max-w-4xl mx-auto">
          {/* Amir Gaz Profile Card */}
          <div className="bg-white/95 backdrop-blur-sm border-2 border-pink-200/50 rounded-3xl shadow-2xl p-8 md:p-12 mb-8 relative overflow-hidden">
            {/* Decorative corner elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-pink-500/10 to-transparent rounded-bl-full"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-blue-500/10 to-transparent rounded-tr-full"></div>

            <div className="relative z-10">
              {/* Profile Header */}
              <div className="flex items-center gap-4 mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full flex items-center justify-center shadow-xl">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-1">אמיר גז</h2>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse"></div>
                    <p className="text-gray-600 font-medium">מייסד ומדריך NLP</p>
                  </div>
                </div>
              </div>

              {/* Personal Info */}
              <div className="bg-gradient-to-br from-pink-50 to-blue-50 rounded-2xl p-6 mb-8 border border-pink-200/30">
                <p className="text-gray-700 text-lg leading-relaxed">
                  יליד שנת 1977 נשוי לקאטי משנת 1997, אב לחמישה וסבא.
                </p>
              </div>

              {/* Mission Statement */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">השליחות שלי</h3>
                </div>
                <p className="text-gray-700 text-lg leading-relaxed pr-16">
                  מגשר ומאמן מנטלי ומדריך בשיטת NLP. אני חי שליחות: לחזק שלום עם עצמך ושלום בבית, דרך תקשורת נכונה, הרגלים טובים ואמונה פשוטה.
                </p>
              </div>

              {/* Product Statement */}
              <div className="bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 rounded-2xl p-8 border-2 border-pink-300/30 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl flex items-center justify-center shadow-lg">
                    <Heart className="w-6 h-6 text-white fill-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">לב אל לב</h3>
                </div>
                <p className="text-gray-800 text-lg leading-relaxed font-medium pr-16">
                  לב אל לב מבית <span className="bg-gradient-to-r from-pink-600 via-blue-600 to-purple-600 bg-clip-text text-transparent font-bold">FORTUNA</span> נולד כדי להחזיר לזוגות זמן איכות, רומנטיקה וחיבור, קלף אחד בכל פעם.
                </p>
              </div>
            </div>
          </div>

          {/* Values Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Value 1 */}
            <div className="group bg-white/90 backdrop-blur-sm border-2 border-pink-200/50 hover:border-pink-300 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                <Heart className="w-8 h-8 text-white fill-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">חיבור רגשי</h3>
              <p className="text-gray-600">חיזוק הקשר הזוגי דרך שיחות משמעותיות ותקשורת אמיתית</p>
            </div>

            {/* Value 2 */}
            <div className="group bg-white/90 backdrop-blur-sm border-2 border-blue-200/50 hover:border-blue-300 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">תקשורת נכונה</h3>
              <p className="text-gray-600">למידה וחיזוק של הרגלי תקשורת בריאים ויעילים</p>
            </div>

            {/* Value 3 */}
            <div className="group bg-white/90 backdrop-blur-sm border-2 border-purple-200/50 hover:border-purple-300 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">שלום בבית</h3>
              <p className="text-gray-600">בניית אווירה חמה ואוהבת דרך הרגלים טובים ואמונה</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
