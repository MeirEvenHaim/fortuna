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

      <div className="container mx-auto px-4 relative z-10 py-16">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-block relative mb-8">
            <div className="absolute -inset-6 bg-gradient-to-r from-pink-400/20 via-blue-400/15 to-rose-400/20 rounded-full blur-2xl animate-pulse"></div>
            <img src={fortunaLogo} alt="Fortuna" className="h-40 w-auto relative z-10 mx-auto" />
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-pink-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
            אודות
          </h1>
          <div className="w-32 h-1.5 bg-gradient-to-r from-pink-500 via-blue-500 to-purple-500 rounded-full mx-auto"></div>
        </div>

        {/* Main Content Card */}
        <div className="max-w-4xl mx-auto space-y-8">
          
          <div className="bg-white/95 backdrop-blur-sm border-2 border-pink-200/50 rounded-3xl shadow-2xl p-8 md:p-12">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-6">
              FORTUNA נולדה מתוך הבנה פשוטה ועמוקה:
            </h2>
            <p className="text-xl text-gray-700 leading-relaxed font-medium mb-6">
              רוב הקשיים בינינו בני אדם אינם נובעים מחוסר אהבה, אלא מחוסר תקשורת.<br/>
              אנשים אוהבים, רוצים בטוב, מתכוונים נכון,<br/>
              אבל משהו בדרך נסגר.<br/>
              המילים נעלמות, ההקשבה נחלשת, ולאט לאט, הלב מתכנס פנימה.
            </p>
            <p className="text-xl text-pink-600 font-bold leading-relaxed">
              FORTUNA קמה כדי לפתוח את הלב מחדש.<br/>
              לא דרך נאומים.<br/>
              לא דרך הטפות.<br/>
              אלא דרך חוויה.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/95 backdrop-blur-sm border-2 border-blue-200/50 rounded-3xl shadow-2xl p-8 md:p-10">
              <h3 className="text-2xl font-bold text-blue-700 mb-4">חיבור לפני פתרון</h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                העולם המודרני מציע אינסוף פתרונות, כלים, שיטות וטכניקות. אבל לעיתים קרובות מדלגים על השלב החשוב ביותר: <span className="font-bold">חיבור אנושי אמיתי.</span>
              </p>
              <p className="text-lg text-gray-700 leading-relaxed font-medium">
                ב-FORTUNA אנחנו מאמינים שחיבור קודם לפתרון. שרק כשיש הקשבה, נוכחות ולב פתוח, אפשר באמת לדבר, להבין, ולצמוח יחד.
              </p>
            </div>

            <div className="bg-white/95 backdrop-blur-sm border-2 border-purple-200/50 rounded-3xl shadow-2xl p-8 md:p-10">
              <h3 className="text-2xl font-bold text-purple-700 mb-4">משחק הוא שפת הלב</h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                משחק הוא לא דבר ילדותי. משחק הוא אחת השפות העתיקות והעמוקות ביותר של בני אדם. במשחק טוב:
              </p>
              <ul className="text-lg text-gray-700 leading-relaxed mb-6 space-y-2 font-medium">
                <li className="flex items-center gap-2"><Sparkles className="w-5 h-5 text-purple-500"/> ההגנות יורדות</li>
                <li className="flex items-center gap-2"><Sparkles className="w-5 h-5 text-purple-500"/> האגו נרגע</li>
                <li className="flex items-center gap-2"><Sparkles className="w-5 h-5 text-purple-500"/> והלב מדבר בלי פחד</li>
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-br from-pink-50 to-purple-50 border-2 border-pink-200/50 rounded-3xl shadow-2xl p-8 md:p-12 text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              מתוך ההבנה הזו נולדו המשחקים של FORTUNA.
            </h3>
            <p className="text-xl text-gray-700 leading-relaxed mb-8">
              ובראשם, המשחק הזוגי <span className="font-bold text-pink-600">"לב אל לב"</span>.<br/>
              משחקים שנבנו בקפידה, מתוך עולם הגישור, האימון המנטלי, והניסיון האנושי האמיתי.
            </p>

            <h3 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-6">
              FORTUNA היא לא רק משחק.<br/>היא מרחב.
            </h3>
            <div className="flex flex-col md:flex-row gap-6 justify-center mb-8">
              <div className="bg-white p-6 rounded-2xl flex-1 shadow-md">
                <Heart className="w-8 h-8 text-pink-500 mx-auto mb-4" />
                <p className="text-lg font-medium text-gray-800">זוגות לומדים לדבר בלי להילחם</p>
              </div>
              <div className="bg-white p-6 rounded-2xl flex-1 shadow-md">
                <MessageCircle className="w-8 h-8 text-blue-500 mx-auto mb-4" />
                <p className="text-lg font-medium text-gray-800">אנשים לומדים להקשיב בלי להיעלם</p>
              </div>
              <div className="bg-white p-6 rounded-2xl flex-1 shadow-md">
                <Sparkles className="w-8 h-8 text-purple-500 mx-auto mb-4" />
                <p className="text-lg font-medium text-gray-800">קשרים מקבלים הזדמנות אמיתית להתחדש</p>
              </div>
            </div>

            <p className="text-lg text-gray-700 leading-relaxed">
              המשחקים, התכנים והכלים של FORTUNA נועדו ללוות תהליך, לא רק לייצר רגע.<br/>
              אנחנו בוחרים תמיד איכות על פני כמות. בלב, בזמן ובמילים.<br/>
              לכן FORTUNA צומחת בקצב מדויק, צומחת מקול ללב,<br/>
              עם הקשבה, למידה ושיפור מתמיד,<br/>
              מתוך כבוד לאנשים שבוחרים להכניס אותה הביתה.
            </p>
          </div>

          <div className="bg-white/95 backdrop-blur-sm border-2 border-rose-200/50 rounded-3xl shadow-2xl p-8 md:p-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-rose-100 rounded-full mb-6">
              <Home className="w-8 h-8 text-rose-500" />
            </div>
            <h2 className="text-4xl font-bold text-gray-800 mb-6">חזון</h2>
            <p className="text-2xl text-gray-700 leading-relaxed font-medium mb-6">
              החזון של FORTUNA הוא פשוט ועמוק:<br/>
              לעזור לאנשים לבנות שלום אמיתי,<br/>
              עם עצמם, ועם מי שחשוב להם.
            </p>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              שלום שנישען על תקשורת בריאה,<br/>
              כנות, הקשבה ואחריות אישית.
            </p>
            <p className="text-3xl font-bold text-rose-600">
              כי כשיש לב, יש דרך.
            </p>
          </div>

          {/* Amir Gaz Profile */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200/50 rounded-3xl shadow-2xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-transparent rounded-bl-full pointer-events-none"></div>
            
            <div className="flex items-center gap-6 mb-8">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center shadow-xl flex-shrink-0">
                <Users className="w-12 h-12 text-white" />
              </div>
              <div>
                <h2 className="text-4xl font-bold text-gray-800 mb-2">אמיר גז</h2>
                <p className="text-xl text-blue-700 font-medium">מייסד FORTUNA</p>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-xl text-gray-700 leading-relaxed pr-0 md:pr-4">
                מגשר ומאמן מנטלי, מדריך בשיטת NLP.<br/>
                נשוי לקאטי משנת 1997, אב לחמישה.
              </p>
              <p className="text-xl text-gray-700 leading-relaxed pr-0 md:pr-4">
                מקדיש את דרכו לליווי אנשים וזוגות בבניית תקשורת עמוקה, הבנה הדדית ושלום בית.
              </p>
              <p className="text-xl text-gray-700 leading-relaxed pr-0 md:pr-4">
                מאמין באמונה שלמה כי השם יתברך מעניק לאדם כוח, חכמה ודעת כדי להרבות טוב בעולם.
              </p>
              <p className="text-xl font-bold text-indigo-700 leading-relaxed pr-0 md:pr-4">
                שליחותו היא לחבר בין לבבות ולהזכיר ששלום בית מתחיל בלב שמוכן להקשיב.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
