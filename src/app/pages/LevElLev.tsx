import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Users, MessageCircle, Star, Gift, ArrowRight, CheckCircle, Sparkles } from 'lucide-react';
import fortunaIcon from '../../assets/fortuna-icon.png';

export function LevElLev() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-blue-50 to-purple-50" dir="rtl">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-10">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-pink-300/30 to-rose-300/30 rounded-full blur-3xl animate-blob"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-blue-300/25 to-cyan-300/25 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">

            <h1 className="text-5xl md:text-6xl lg:text-7xl mb-6 bg-gradient-to-r from-pink-600 via-rose-500 to-blue-600 bg-clip-text text-transparent leading-tight">
              לב אל לב
            </h1>

            <p className="text-2xl md:text-3xl text-gray-800 mb-4">
              משחק הקלפים שמחבר משפחות וזוגות
            </p>

            <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-md border-2 border-pink-200/50 rounded-full px-6 py-3 shadow-lg">
              <Sparkles className="w-5 h-5 text-pink-500" />
              <span className="text-sm text-gray-700">מוצר מבית FORTUNA</span>
            </div>
          </div>

          {/* Product Image Placeholder */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="bg-white/80 backdrop-blur-md border-2 border-pink-200/50 rounded-3xl p-8 shadow-2xl">
              <div className="aspect-video bg-gradient-to-br from-pink-200 to-blue-200 rounded-2xl flex items-center justify-center">
                <Gift className="w-32 h-32 text-white/80" />
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <Link to="/order" className="group relative bg-gradient-to-r from-pink-600 via-rose-500 to-red-500 text-white px-10 py-5 rounded-2xl transition-all duration-300 shadow-2xl hover:shadow-pink-500/50 hover:scale-105">
              <span className="flex items-center gap-3 justify-center text-lg">
                <Heart className="w-6 h-6 group-hover:scale-110 transition-transform" />
                הזמן עכשיו
              </span>
            </Link>

            <Link
              to="/"
              className="group bg-white/90 backdrop-blur-md hover:bg-white text-gray-700 px-10 py-5 rounded-2xl border-2 border-blue-200 hover:border-pink-300 transition-all shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center"
            >
              <span className="flex items-center gap-3 text-lg">
                <ArrowRight className="w-6 h-6 text-blue-600 group-hover:text-pink-600 transition-colors" />
                חזרה לדף הבית
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl mb-6 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
              מה כולל המשחק?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              משחק קלפים ייחודי שנועד ליצור שיחות משמעותיות ולחזק קשרים במשפחה ובזוגיות
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: Heart,
                title: 'שאלות מעמיקות',
                desc: 'שאלות שנועדו ליצור שיחות משמעותיות ואינטימיות',
                color: 'pink'
              },
              {
                icon: Users,
                title: 'מתאים לכל המשפחה',
                desc: 'תכנים מותאמים לגילאים שונים ולסיטואציות שונות',
                color: 'blue'
              },
              {
                icon: MessageCircle,
                title: 'מבוסס NLP',
                desc: 'שאלות מבוססות על עקרונות של תכנות נוירו לשוני',
                color: 'purple'
              }
            ].map((feature, idx) => (
              <div key={idx} className="bg-white/90 backdrop-blur-md border-2 border-gray-200/50 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2">
                <div className={`w-16 h-16 bg-gradient-to-br from-${feature.color}-600 to-${feature.color}-400 rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-lg`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800 text-center">{feature.title}</h3>
                <p className="text-gray-600 text-center leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/90 backdrop-blur-md border-2 border-pink-200/50 rounded-3xl p-8 md:p-12 shadow-2xl">
              <h3 className="text-3xl md:text-4xl mb-8 text-center bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                מה מקבלים בקופסה?
              </h3>

              <div className="grid grid-cols-1 gap-6">
                {[
                  '101 קלפי משחק',
                  '7 שלבים לפי סדר התקדמות',
                  'דף פתיחה והוראות',
                  'אריזת מעטפה פרימיום שמנת–זהב',
                  'טקס סיום: ברית הלב'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-pink-500 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to Play Section */}
      <section className="py-20 bg-white/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/90 backdrop-blur-md border-2 border-blue-200/50 rounded-3xl p-8 md:p-12 shadow-2xl">
              <h3 className="text-3xl md:text-4xl mb-4 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                הוראות משחק
              </h3>

              <h4 className="text-2xl mb-8 text-center text-gray-700">
                איך משחקים, בקצרה
              </h4>

              <div className="grid grid-cols-1 gap-6 mb-8">
                {[
                  'שמים מסכים בצד.',
                  'שולפים קלף אחד.',
                  'קוראים ומבצעים.',
                  'מקשיבים בלי לתקן.'
                ].map((step, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                      <span className="text-white font-semibold">{idx + 1}</span>
                    </div>
                    <span className="text-gray-700 text-lg">{step}</span>
                  </div>
                ))}
              </div>

              <p className="text-center text-xl text-gray-600 italic border-t-2 border-pink-200/50 pt-6">
                קלף אחד יכול לשנות ערב שלם.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white/50">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl md:text-4xl mb-12 text-center bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent">
            מה אומרים המשתמשים
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: 'יעל ודני',
                text: 'המשחק הזה פשוט שינה את הדרך שבה אנחנו מתקשרים. גילינו דברים חדשים אחד על השני אחרי שנים של נישואין!',
                rating: 5
              },
              {
                name: 'משפחת כהן',
                text: 'הילדים שלנו לא יכולים בלי זה! כל ערב שישי אנחנו משחקים ביחד. זה יצר אווירה חמה ומחברת במשפחה.',
                rating: 5
              },
              {
                name: 'רונית',
                text: 'קניתי כמתנה לחתונה וקיבלתי פידבק מדהים! הזוג אמר שזאת המתנה הכי משמעותית שקיבלו.',
                rating: 5
              }
            ].map((testimonial, idx) => (
              <div key={idx} className="bg-white/90 backdrop-blur-md border-2 border-gray-200/50 rounded-2xl p-6 shadow-lg">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 leading-relaxed">{testimonial.text}</p>
                <p className="text-sm text-gray-500">— {testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center bg-gradient-to-br from-pink-600 via-rose-500 to-purple-600 rounded-3xl p-12 shadow-2xl">
            <h3 className="text-3xl md:text-4xl mb-6 text-white">
              מוכנים להתחיל את המסע?
            </h3>
            <p className="text-xl text-white/90 mb-8">
              הזמינו את משחק "לב אל לב" והתחילו ליצור קשרים עמוקים יותר עם האהובים עליכם
            </p>
            <Link to="/order" className="inline-block bg-white text-pink-600 px-12 py-5 rounded-2xl text-xl font-semibold shadow-xl hover:bg-gray-50 hover:scale-105 transition-all">
              הזמן עכשיו
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
