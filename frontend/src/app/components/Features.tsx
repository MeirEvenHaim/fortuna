import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, Heart, Lightbulb, Users, MessageCircle, Sparkles } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'AI חכם ואמפתי',
    description: 'מערכת NLP מתקדמת שמבינה את הרגשות שלכם ויוצרת שיחות מותאמות אישית.',
    gradient: 'from-purple-500 to-pink-500',
    bgGradient: 'from-purple-50 to-pink-50',
    iconColor: 'text-purple-500',
  },
  {
    icon: MessageCircle,
    title: 'שאלות מעוררות חשיבה',
    description: 'שאלות מעמיקות ומשעשעות שמעודדות שיחות אמיתיות וגילוי הדדי.',
    gradient: 'from-blue-500 to-cyan-500',
    bgGradient: 'from-blue-50 to-cyan-50',
    iconColor: 'text-blue-500',
  },
  {
    icon: Heart,
    title: 'חיזוק הקשר',
    description: 'פעילויות שתוכננו במיוחד כדי לעמק את הקשר הרגשי ולחזק את האהבה.',
    gradient: 'from-pink-500 to-rose-500',
    bgGradient: 'from-pink-50 to-rose-50',
    iconColor: 'text-pink-500',
  },
  {
    icon: Users,
    title: 'מתאים לכל המשפחה',
    description: 'תוכן מותאם לזוגות, הורים וילדים, סבים ונכדים - לכל הגילאים.',
    gradient: 'from-emerald-500 to-teal-500',
    bgGradient: 'from-emerald-50 to-teal-50',
    iconColor: 'text-emerald-500',
  },
  {
    icon: Lightbulb,
    title: 'רגעי תובנה',
    description: 'גלו דברים חדשים אחד על השני ויצרו זיכרונות בלתי נשכחים.',
    gradient: 'from-orange-500 to-amber-500',
    bgGradient: 'from-orange-50 to-amber-50',
    iconColor: 'text-orange-500',
  },
  {
    icon: Sparkles,
    title: 'כיף ומשחקיות',
    description: 'הפכו כל שיחה למשחק מהנה שמעודד צחוק, שמחה ותקשורת פתוחה.',
    gradient: 'from-violet-500 to-purple-500',
    bgGradient: 'from-violet-50 to-purple-50',
    iconColor: 'text-violet-500',
  },
];

export function Features() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-50/30 to-transparent"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 px-6 py-3 rounded-full mb-6">
            <Heart className="w-5 h-5 text-purple-600" />
            <span className="text-purple-700">איך זה עובד</span>
          </div>

          <h2 className="mb-6 text-4xl md:text-5xl">
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
              כל מה שאתם צריכים
            </span>
            <br />
            <span className="text-gray-800">כדי להתחבר מחדש</span>
          </h2>

          <p className="text-gray-600 max-w-3xl mx-auto text-xl leading-relaxed">
            פלטפורמה חכמה שמשלבת טכנולוגיה מתקדמת עם הבנה עמוקה של קשרים אנושיים
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative"
            >
              {/* Card */}
              <div className={`relative h-full bg-gradient-to-br ${feature.bgGradient} border-2 border-transparent hover:border-purple-200 rounded-3xl p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2`}>
                {/* Icon container */}
                <div className="flex justify-center mb-6">
                  <div className={`relative w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all group-hover:scale-110 group-hover:rotate-3`}>
                    <feature.icon className={`w-10 h-10 ${feature.iconColor}`} strokeWidth={1.5} />

                    {/* Glow effect */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-20 rounded-2xl blur-xl transition-opacity`}></div>
                  </div>
                </div>

                <h3 className="mb-4 text-xl text-center text-gray-800">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed text-center">{feature.description}</p>

                {/* Decorative dots */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1">
                  <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${feature.gradient}`}></div>
                  <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${feature.gradient} opacity-50`}></div>
                  <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${feature.gradient} opacity-25`}></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20">
          <Link to="/order" className="inline-block group relative bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-12 py-5 rounded-2xl transition-all shadow-xl hover:shadow-2xl hover:scale-105 overflow-hidden">
            <span className="relative z-10 flex items-center gap-3 justify-center text-lg">
              <Sparkles className="w-6 h-6 group-hover:rotate-12 transition-transform" />
              התחילו להתחבר היום
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}