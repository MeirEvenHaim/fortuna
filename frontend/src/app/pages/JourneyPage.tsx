import React, { useState } from 'react';
import { Heart, ArrowRight, ArrowLeft, Send, Sparkles, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import fortunaLogo from '../../assets/fortuna-logo.png';

export function JourneyPage() {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();

  // Handle answers but we don't need to submit them to a backend yet
  const [answers, setAnswers] = useState<Record<string, any>>({});

  const nextStep = () => {
    if (step < 8) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleInputChange = (stepId: number, qId: number, value: any) => {
    setAnswers({ ...answers, [`${stepId}_${qId}`]: value });
  };

  const renderWelcome = () => (
    <div className="text-center animate-fade-in">
      <div className="inline-block relative mb-8">
        <div className="absolute -inset-6 bg-gradient-to-r from-pink-400/20 via-blue-400/20 to-rose-400/20 rounded-full blur-2xl animate-pulse"></div>
        <img src={fortunaLogo} alt="Fortuna" className="h-40 w-auto relative z-10 mx-auto" />
      </div>
      <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-pink-600 via-rose-500 to-blue-600 bg-clip-text text-transparent">
        ברוכים הבאים למסע לב אל לב
      </h1>
      <p className="text-xl text-gray-700 leading-relaxed mb-8 max-w-2xl mx-auto font-medium">
        אם הגעתם לכאן, אתם חלק מקבוצה מיוחדת של זוגות שבחרו לעצור רגע בתוך שגרת החיים ולהקדיש זמן לקשר הזוגי שלהם.
      </p>
      <div className="bg-gradient-to-br from-pink-50 to-blue-50 border-2 border-pink-100 rounded-2xl p-6 mb-8 max-w-2xl mx-auto shadow-sm">
        <p className="text-lg text-gray-700 leading-relaxed mb-4">
          המסע הזה בנוי מ-7 שלבים, ממש כמו המשחק עצמו.<br/>
          בכל שלב תוכלו לשתף אותנו בחוויה שלכם.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed">
          התשובות שלכם יעזרו לנו ללמוד, להשתפר, ולהמשיך ליצור כלים שמחזקים תקשורת ושלום בית.
        </p>
      </div>
      <button 
        onClick={nextStep}
        className="group bg-gradient-to-r from-pink-600 to-rose-500 text-white px-10 py-4 rounded-full text-xl font-bold hover:scale-105 transition-all shadow-xl flex items-center gap-3 mx-auto"
      >
        התחלת המסע
        <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
      </button>
    </div>
  );

  const renderThankYou = () => (
    <div className="text-center animate-fade-in py-12">
      <div className="w-24 h-24 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
        <Heart className="w-12 h-12 text-white fill-white animate-pulse" />
      </div>
      <h2 className="text-4xl font-bold text-gray-800 mb-6">תודה שלקחתם חלק במסע לב אל לב</h2>
      <p className="text-2xl text-gray-700 font-medium mb-8">
        המשוב שלכם עוזר לנו להמשיך לפתח כלים שמחזקים תקשורת ושלום בית.
      </p>
      
      <div className="bg-gradient-to-r from-pink-100 to-rose-100 p-6 rounded-2xl mb-12 border-2 border-pink-200">
        <div className="flex items-center justify-center gap-3 mb-2">
          <Sparkles className="w-6 h-6 text-pink-500" />
          <p className="text-xl font-bold text-pink-700">תודה שאתם חלק מ-101 הזוגות שבחרו לב אל לב.</p>
        </div>
      </div>

      <p className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent mb-12">
        שלום בית מתחיל בלב שמוכן להקשיב.
      </p>
      <button 
        onClick={() => navigate('/')}
        className="bg-white border-2 border-pink-200 text-pink-600 px-8 py-3 rounded-full font-bold hover:bg-pink-50 transition-colors shadow-sm"
      >
        חזרה לדף הבית
      </button>
    </div>
  );

  const stations = [
    {
      title: "תחנה 1 – נקודת ההתחלה",
      intro: "לפני שמתחילים לשחק, נשמח להכיר אתכם קצת.",
      questions: [
        { id: 1, text: "כמה שנים אתם בזוגיות?", type: "text" },
        { id: 2, text: "האם יש לכם ילדים?", type: "text" },
        { id: 3, text: "מה גרם לכם לבחור לשחק במשחק לב אל לב?", type: "textarea" },
        { id: 4, text: "איך הייתם מתארים היום את התקשורת ביניכם?", type: "select", options: ["מצוינת", "טובה", "סבירה", "מאתגרת"] }
      ],
      buttonText: "המשיכו לשלב הראשון במשחק"
    },
    {
      title: "תחנה 2 – אחרי המשחק הראשון",
      intro: "כבר שיחקתם את הסיבוב הראשון? נשמח לשמוע איך הייתה החוויה.",
      questions: [
        { id: 1, text: "איך הרגיש המשחק הראשון?", type: "textarea" },
        { id: 2, text: "האם נוצרה שיחה שלא הייתה מתרחשת בדרך כלל?", type: "textarea" },
        { id: 3, text: "מה הפתיע אתכם במשחק?", type: "textarea" },
        { id: 4, text: "עד כמה נהניתם מהחוויה עד כה? (1–5)", type: "range", min: 1, max: 5 }
      ],
      buttonText: "המשך לתחנה הבאה"
    },
    {
      title: "תחנה 3 – עומק ראשון",
      intro: "אחרי כמה קלפים, מתחילים להכיר צדדים חדשים אחד של השני.",
      questions: [
        { id: 1, text: "איזה סוג קלפים נגע בכם במיוחד?", type: "select", options: ["שאלות עומק", "משימות", "שיתוף רגשי", "אחר"] },
        { id: 2, text: "האם גיליתם משהו חדש על בן או בת הזוג?", type: "textarea" },
        { id: 3, text: "האם המשחק גורם לכם להקשיב אחד לשני יותר?", type: "textarea" }
      ],
      buttonText: "המשך לתחנה הבאה"
    },
    {
      title: "תחנה 4 – רגעים משמעותיים",
      intro: "בכל מסע זוגי יש רגעים קטנים שנשארים בלב.",
      questions: [
        { id: 1, text: "מה היה הרגע הכי משמעותי שחוויתם במשחק עד עכשיו?", type: "textarea" },
        { id: 2, text: "איזה קלף יצר אצלכם את השיחה הכי עמוקה?", type: "textarea" },
        { id: 3, text: "איך הייתם מתארים את האווירה ביניכם בזמן המשחק?", type: "textarea" }
      ],
      buttonText: "המשך לתחנה הבאה"
    },
    {
      title: "תחנה 5 – שינוי בתקשורת",
      intro: "לפעמים שיחה קטנה יכולה לשנות הרבה.",
      questions: [
        { id: 1, text: "האם המשחק השפיע על התקשורת ביניכם?", type: "select", options: ["מאוד", "קצת", "עדיין לא", "לא"] },
        { id: 2, text: "האם מצאתם את עצמכם ממשיכים לדבר גם אחרי המשחק?", type: "textarea" },
        { id: 3, text: "האם יש משהו במשחק שהייתם רוצים לראות ממנו יותר?", type: "textarea" }
      ],
      buttonText: "המשך לתחנה הבאה"
    },
    {
      title: "תחנה 6 – מבט פנימה",
      intro: "המשחק לא רק מגלה דברים על בן או בת הזוג, אלא גם על עצמנו.",
      questions: [
        { id: 1, text: "מה למדתם על בן או בת הזוג שלכם במהלך המשחק?", type: "textarea" },
        { id: 2, text: "מה למדתם על עצמכם?", type: "textarea" },
        { id: 3, text: "האם המשחק גרם לכם להסתכל אחרת על הקשר ביניכם?", type: "textarea" }
      ],
      buttonText: "המשך לתחנה הבאה"
    },
    {
      title: "תחנה 7 – סיום המסע",
      intro: "תחנה אחרונה במסע המשותף.",
      questions: [
        { id: 1, text: "עד כמה הייתם ממליצים לזוגות אחרים לשחק במשחק? (1–10)", type: "range", min: 1, max: 10 },
        { id: 2, text: "אם הייתם צריכים לתאר את החוויה שלכם במשפט אחד – מה הייתם אומרים?", type: "textarea" },
        { id: 3, text: "האם הייתם רוצים לקבל כלים נוספים לחיזוק הזוגיות?", type: "select", options: ["כן, אשמח", "אולי בהמשך", "לא תודה"] }
      ],
      buttonText: "סיום ושליחת משוב"
    }
  ];

  const renderStation = () => {
    const station = stations[step - 1];

    return (
      <div className="animate-fade-in w-full">
        {/* Progress Bar */}
        <div className="mb-8 text-center">
          <p className="text-pink-600 font-bold mb-2 text-lg">שלב {step} מתוך 7</p>
          <div className="w-full bg-pink-100 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-pink-500 to-rose-500 h-3 rounded-full transition-all duration-500" 
              style={{ width: `${(step / 7) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-white/95 backdrop-blur-sm shadow-xl rounded-3xl p-8 md:p-12 border-2 border-pink-100">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">{station.title}</h2>
          <p className="text-xl text-gray-600 mb-10 font-medium pb-6 border-b border-pink-100">{station.intro}</p>

          <div className="space-y-8 mb-12 text-right">
            {station.questions.map((q) => (
              <div key={q.id} className="space-y-3">
                <label className="block text-xl font-medium text-gray-800">{q.text}</label>
                
                {q.type === 'text' && (
                  <input 
                    type="text" 
                    value={answers[`${step}_${q.id}`] || ''}
                    onChange={(e) => handleInputChange(step, q.id, e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-lg focus:ring-2 focus:ring-pink-300 focus:border-pink-300 outline-none transition-all"
                  />
                )}
                
                {q.type === 'textarea' && (
                  <textarea 
                    rows={3}
                    value={answers[`${step}_${q.id}`] || ''}
                    onChange={(e) => handleInputChange(step, q.id, e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-lg focus:ring-2 focus:ring-pink-300 focus:border-pink-300 outline-none transition-all resize-none"
                  ></textarea>
                )}
                
                {q.type === 'select' && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {q.options?.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => handleInputChange(step, q.id, opt)}
                        className={`px-4 py-3 rounded-xl border-2 transition-all font-medium ${
                          answers[`${step}_${q.id}`] === opt 
                            ? 'bg-pink-50 border-pink-500 text-pink-700' 
                            : 'bg-white border-gray-200 text-gray-600 hover:border-pink-300'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
                
                {q.type === 'range' && (
                  <div className="space-y-4">
                    <input 
                      type="range" 
                      min={q.min} 
                      max={q.max} 
                      value={answers[`${step}_${q.id}`] || (q.max! / 2).toFixed()}
                      onChange={(e) => handleInputChange(step, q.id, e.target.value)}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-pink-600"
                    />
                    <div className="flex justify-between text-pink-600 font-bold px-1">
                      <span>{q.min}</span>
                      <span className="text-xl">{answers[`${step}_${q.id}`] || (q.max! / 2).toFixed()}</span>
                      <span>{q.max}</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center border-t border-gray-100 pt-8 mt-8">
            <button 
              onClick={prevStep}
              className="flex items-center gap-2 text-gray-500 hover:text-pink-600 transition-colors font-medium px-4 py-2"
            >
              <ArrowRight className="w-5 h-5" />
              חזור
            </button>
            <button 
              onClick={nextStep}
              className="flex items-center gap-2 bg-gradient-to-r from-pink-600 to-rose-500 text-white px-8 py-3 rounded-full font-bold hover:scale-105 transition-all shadow-md group"
            >
              {station.buttonText}
              {step === 7 ? <Send className="w-5 h-5"/> : <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />}
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50/80 via-white to-purple-50/80 py-12 md:py-20 relative overflow-hidden" dir="rtl">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-pink-200/20 to-rose-200/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-blue-200/20 to-cyan-200/20 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="container mx-auto px-4 relative z-10 max-w-4xl flex items-center min-h-[70vh]">
        {step === 0 && renderWelcome()}
        {step > 0 && step <= 7 && renderStation()}
        {step === 8 && renderThankYou()}
      </div>
    </div>
  );
}
