import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Users, CheckCircle, Sparkles, MessageCircle, PlayCircle, User } from 'lucide-react';

export function WhatIsFortuna() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-4xl text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-800">
          FORTUNA. היא לא עוד מותג.<br/>
          <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">היא המרחב שלכם.</span>
        </h2>
        <div className="text-xl md:text-2xl text-gray-600 leading-relaxed md:leading-loose space-y-6">
          <p>
            FORTUNA. נולדה מתוך שליחות.<br/>
            שליחות לחבר בין אנשים, להעמיק תקשורת,<br/>
            ולהחזיר לבתים שיח, הקשבה, רוך וקרבה.
          </p>
          <p>
            אנחנו מאמינים ששינוי לא מתחיל ברעש,<br/>
            הוא מתחיל בשיחה אחת טובה.
          </p>
          <p className="font-semibold text-2xl md:text-3xl text-pink-600 mt-8">
            קלף אחד. רגע אחד. לב אחד שפוגש לב אוהב.
          </p>
        </div>
      </div>
    </section>
  );
}

export function GameLevElLevSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-pink-50 to-blue-50">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border-2 border-pink-100 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-rose-500 to-pink-600 bg-clip-text text-transparent">
            לב אל לב –
          </h2>
          <h3 className="text-2xl md:text-3xl font-medium text-gray-700 mb-8">
            משחק זוגי שמחייה קשרים
          </h3>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 md:gap-10 mb-12">
            <div className="bg-white/80 backdrop-blur-md border-2 border-pink-100/50 rounded-3xl p-6 md:p-8 shadow-xl w-48 md:w-56 transform hover:-translate-y-2 transition-all duration-300 hover:shadow-pink-200/50 group">
              <span className="block text-6xl md:text-7xl font-black bg-gradient-to-br from-pink-500 to-rose-600 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">101</span>
              <span className="text-gray-700 font-bold text-xl md:text-2xl tracking-wide">קלפים</span>
            </div>
            
            <div className="hidden sm:block h-24 w-px bg-gradient-to-b from-transparent via-pink-300 to-transparent"></div>
            <div className="sm:hidden w-24 h-px bg-gradient-to-r from-transparent via-pink-300 to-transparent my-4"></div>

            <div className="bg-white/80 backdrop-blur-md border-2 border-blue-100/50 rounded-3xl p-6 md:p-8 shadow-xl w-48 md:w-56 transform hover:-translate-y-2 transition-all duration-300 hover:shadow-blue-200/50 group">
              <span className="block text-6xl md:text-7xl font-black bg-gradient-to-br from-blue-500 to-cyan-600 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">7</span>
              <span className="text-gray-700 font-bold text-xl md:text-2xl tracking-wide">שלבים</span>
            </div>
          </div>

          <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-8 max-w-2xl mx-auto">
            מסע אחד שמזמין זוגות לעצור רגע,<br/>
            ולבחור זה בזו מחדש.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 max-w-2xl mx-auto">
            <div className="bg-pink-50 rounded-xl p-4 text-pink-700 font-medium md:text-lg">זה לא משחק על ניקוד.</div>
            <div className="bg-blue-50 rounded-xl p-4 text-blue-700 font-medium md:text-lg">לא מבחן.</div>
            <div className="bg-purple-50 rounded-xl p-4 text-purple-700 font-medium md:text-lg">לא טיפול.</div>
          </div>

          <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-10 max-w-2xl mx-auto">
            זו הזמנה לזמן איכות אמיתי,<br/>
            בלי מסכים, בלי הסחות,<br/>
            עם שאלות, משימות ושיח מקרב.
          </p>

          <Link to="/order" className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-600 to-rose-500 text-white px-8 py-4 rounded-full text-xl font-bold hover:scale-105 transition-all shadow-lg">
            <PlayCircle className="w-6 h-6" />
            להיכנס למשחק
          </Link>
        </div>
      </div>
    </section>
  );
}

export function TargetAudience() {
  const list = [
    "לזוגות שרוצים לחזק את הקשר",
    "לזוגות טובים שרוצים להיות טובים יותר",
    "לזוגות שעברו דרך ארוכה ורוצים לעצור ולהיפגש מחדש",
    "לכל מי שמבין שתקשורת היא מיומנות, לא מובן מאליו"
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-800">
          למי המשחק מתאים?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {list.map((item, i) => (
            <div key={i} className="flex items-start gap-4 bg-gray-50 p-6 md:p-8 rounded-2xl border border-gray-100 hover:border-pink-200 transition-colors shadow-sm">
              <div className="bg-pink-100 p-2 rounded-full flex-shrink-0">
                <Heart className="w-6 h-6 text-pink-500 fill-pink-500" />
              </div>
              <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-medium">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function WhyItWorks() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-pink-50">
      <div className="container mx-auto px-4 max-w-5xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-800">
          למה זה עובד?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-3xl shadow-lg border-t-4 border-pink-400 text-center hover:-translate-y-2 transition-transform">
            <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-pink-500" />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">פשוט ומדויק</h3>
            <p className="text-gray-600 text-lg md:text-xl leading-relaxed">בלי חפירות. בלי תיאוריה.<br/>קלף אחד בכל פעם.</p>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-lg border-t-4 border-blue-400 text-center hover:-translate-y-2 transition-transform">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-8 h-8 text-blue-500" />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">בנוי בתהליך</h3>
            <p className="text-gray-600 text-lg md:text-xl leading-relaxed">7 שלבים שמובילים לעומק בהדרגה.<br/>מהיכרות - לברית.</p>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-lg border-t-4 border-purple-400 text-center hover:-translate-y-2 transition-transform">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="w-8 h-8 text-purple-500" />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">מלווה אנושי</h3>
            <p className="text-gray-600 text-lg md:text-xl leading-relaxed">לא רק קלפים.<br/>יש בית, יש דרך, ויש ליווי.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function FounderSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 md:p-12 shadow-xl border-2 border-pink-100">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-8 text-gray-800">מי אנחנו</h2>
          
          <p className="text-2xl md:text-3xl text-center text-gray-700 leading-relaxed mb-8 font-medium">
            <span className="text-pink-600 font-bold">FORTUNA</span><br/>
            היא מיזם ופרויקט אישי של <Link to="/about" className="text-blue-600 hover:text-blue-800 underline decoration-2 underline-offset-4">אמיר גז</Link>,
          </p>
          
          <div className="text-xl md:text-2xl text-gray-600 text-center leading-relaxed mb-10 space-y-6">
            <p>מגשר ומאמן מנטלי,<br/>שחי את עולם הקשר, התקשורת והשלום בבית כשליחות.</p>
            <p>מתוך עבודה עם זוגות, משפחות ואנשים<br/>נולד הצורך בכלי פשוט, נגיש, עמוק -<br/>כזה שנכנס הביתה ומתחיל שיחה.</p>
          </div>

          <div className="text-center mt-8">
            <Link to="/about" className="inline-flex items-center gap-2 bg-white text-gray-800 border-2 border-gray-200 px-8 py-4 rounded-full text-xl font-bold hover:bg-gray-50 transition-colors shadow-sm">
              <User className="w-6 h-6" />
              לאודות אמיר גז
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function BottomCTA() {
  return (
    <section className="py-24 bg-gradient-to-br from-pink-600 via-rose-500 to-purple-600 text-white text-center">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-10 leading-tight">
          תבחרו איכות על פני כמות,<br/>
          בלב, בזמן ובמילים.
        </h2>
        <a 
          href="https://wa.me/972500000000" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-white text-pink-600 px-10 py-5 rounded-full text-xl md:text-2xl font-bold hover:scale-105 transition-all shadow-2xl"
        >
          <MessageCircle className="w-8 h-8 fill-pink-600/20" />
          להתחיל מסע לב אל לב –
        </a>
      </div>
    </section>
  );
}
