import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PlayCircle, Lock, Headphones, GraduationCap, ChevronLeft, Sparkles } from 'lucide-react';

interface Course {
  id: number;
  title: string;
  description: string;
  thumbnailUrl: string;
  price: number;
}

export function VideoCoursesPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [myCourses, setMyCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('fortuna_token');
    if (token) {
      setIsAuthenticated(true);
      fetch('/api/user/courses', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setMyCourses(data);
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFCFB] pt-24 pb-20 px-4" dir="rtl">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            מרחב תכני <span className="bg-gradient-to-r from-pink-600 to-rose-500 bg-clip-text text-transparent">הפרימיום</span>
          </h1>
          <p className="text-xl text-gray-600 font-medium">האזינו לפודקאסט החינמי שלנו, או היכנסו לקורסים שרכשתם.</p>
        </div>

        {/* Free Podcasts Section */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-blue-100 p-3 rounded-2xl">
              <Headphones className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800">פודקאסט "לב אל לב" (חינם)</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all border border-gray-100 group">
                <div className="aspect-video bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl mb-4 relative overflow-hidden flex items-center justify-center group-hover:scale-[1.02] transition-transform">
                  <PlayCircle className="w-16 h-16 text-white/50 group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-bold text-xl text-gray-800 mb-2">פרק {item}: יסודות התקשורת</h3>
                <p className="text-gray-500 text-sm">30 דק' • פורסם השבוע</p>
              </div>
            ))}
          </div>
        </section>

        {/* Separator */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-200 to-transparent my-12"></div>

        {/* Premium Courses Section */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="bg-pink-100 p-3 rounded-2xl">
                <GraduationCap className="w-8 h-8 text-pink-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800">הקורסים הדיגיטליים שלי</h2>
            </div>
          </div>

          {!isAuthenticated ? (
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 md:p-16 text-center shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
              <Lock className="w-16 h-16 text-gray-400 mx-auto mb-6" />
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 relative z-10">הקורסים פתוחים למנויים בלבד</h3>
              <p className="text-gray-400 mb-8 max-w-lg mx-auto relative z-10">
                כדי לצפות בתכני הפרימיום אליהם נרשמתם, אנא התחברו לחשבונכם. עדיין לא עשיתם את הצעד? בדקו את החבילות שלנו.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                <Link to="/login" className="bg-pink-600 text-white px-8 py-4 rounded-full font-bold hover:bg-pink-500 transition-colors shadow-lg">
                  התחברות לחשבון
                </Link>
                <Link to="/order" className="bg-white/10 text-white px-8 py-4 rounded-full font-bold hover:bg-white/20 transition-colors border border-gray-600">
                  לחבילות ולרכישה
                </Link>
              </div>
            </div>
          ) : isLoading ? (
             <div className="flex justify-center py-20">
               <div className="w-12 h-12 border-4 border-gray-200 border-t-pink-600 rounded-full animate-spin"></div>
             </div>
          ) : myCourses.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myCourses.map((course) => (
                <div key={course.id} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-pink-100 group">
                  <div className="aspect-video bg-gray-200 relative overflow-hidden">
                    {course.thumbnailUrl ? (
                      <img src={course.thumbnailUrl} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center">
                        <Sparkles className="w-12 h-12 text-white/50" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-xl text-gray-900 mb-2">{course.title}</h3>
                    <p className="text-gray-600 text-sm mb-6 line-clamp-2">{course.description}</p>
                    <button className="w-full bg-pink-50 text-pink-700 py-3 rounded-xl font-bold hover:bg-pink-100 transition-colors flex justify-center items-center gap-2 group-hover:shadow-md">
                      המשך צפייה הקורס <ChevronLeft className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
                <GraduationCap className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-700 mb-2">אין לכם עדיין קורסים פעילים</h3>
                <p className="text-gray-500 mb-6">גשו לחנות שלנו כדי להתרשם מתכני הפרימיום שלנו.</p>
                <Link to="/order" className="inline-block bg-pink-600 text-white px-8 py-3 rounded-full font-bold hover:bg-pink-500 transition-colors shadow-md">
                  למעבר לחנות
                </Link>
            </div>
          )}
        </section>

      </div>
    </div>
  );
}
