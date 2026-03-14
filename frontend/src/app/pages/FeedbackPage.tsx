import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Heart, Send, Star, MessageCircle, Users, Sparkles, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import fortunaLogo from '../../assets/fortuna-logo.png';
import { PublicComments } from '../components/PublicComments';

interface FeedbackFormData {
  rating: number;
  favoriteStage: string;
  favoriteCard: string;
  lessConnected: string;
  wouldRecommend: 'yes' | 'no' | '';
  message: string;
  name?: string;
  phone?: string;
  email?: string;
}

export function FeedbackPage() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<FeedbackFormData>({
    defaultValues: {
      rating: 0,
      favoriteStage: '',
      favoriteCard: '',
      lessConnected: '',
      wouldRecommend: '',
      message: '',
      name: '',
      phone: '',
      email: ''
    }
  });

  const rating = watch('rating');
  const wouldRecommend = watch('wouldRecommend');

  const onSubmit = async (data: FeedbackFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch('/api/feedbacks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('שגיאה בשליחת המשוב');
      }

      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error('Error submitting feedback:', err);
      setSubmitError('אירעה שגיאה בשמירת המשוב. אנא נסו שוב מאוחר יותר.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 text-center">
            <div className="mb-6 flex justify-center">
              <div className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-full p-6">
                <CheckCircle2 className="w-16 h-16 text-pink-600" />
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              תודה רבה על המשוב שלכם! ❤️
            </h1>

            <p className="text-lg text-gray-600 mb-8">
              המשוב שלכם חשוב לנו מאוד ועוזר לנו להמשיך לשפר ולהעמיק את החוויה של זוגות ומשפחות.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/"
                className="bg-gradient-to-r from-pink-600 via-rose-500 to-red-500 text-white px-8 py-4 rounded-full font-medium hover:scale-105 transition-all shadow-lg hover:shadow-pink-500/50"
              >
                חזרה לדף הבית
              </Link>

              <Link
                to="/lev-el-lev"
                className="bg-white text-pink-600 px-8 py-4 rounded-full font-medium border-2 border-pink-600 hover:bg-pink-50 transition-all"
              >
                למידע נוסף על לב אל לב
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            נשמח לשמוע מכם
          </h1>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            המשוב שלכם עוזר לנו לשפר את המוצר ולהעמיק את החוויה של זוגות ומשפחות נוספים
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 space-y-8">
          {/* Rating */}
          <div className="space-y-4">
            <label className="flex items-center gap-2 text-lg font-semibold text-gray-800">
              <Star className="w-6 h-6 text-pink-600" />
              דירוג החוויה שלכם (1-10)
              <span className="text-red-500">*</span>
            </label>

            <div className="flex gap-1 justify-center md:justify-start">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setValue('rating', num)}
                  className="group relative transition-transform hover:scale-110"
                  title={`${num} כוכבים`}
                >
                  <Star
                    className={`w-10 h-10 transition-all ${rating >= num
                      ? 'fill-pink-500 text-pink-500'
                      : 'fill-gray-200 text-gray-300 group-hover:fill-pink-200 group-hover:text-pink-300'
                      }`}
                  />
                </button>
              ))}
            </div>

            <p className="text-sm text-gray-600 text-center md:text-right">
              {rating > 0 ? `דירוג: ${rating} מתוך 10` : 'לחצו על הכוכבים כדי לדרג'}
            </p>

            {errors.rating && (
              <p className="text-red-500 text-sm">אנא בחרו דירוג</p>
            )}
          </div>

          {/* Favorite Stage */}
          <div className="space-y-4">
            <label htmlFor="favoriteStage" className="flex items-center gap-2 text-lg font-semibold text-gray-800">
              <Heart className="w-6 h-6 text-pink-600" />
              איזה שלב הכי נגע לכם?
              <span className="text-red-500">*</span>
            </label>

            <input
              id="favoriteStage"
              type="text"
              {...register('favoriteStage', { required: true })}
              className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none transition-colors text-lg"
              placeholder="לדוגמה: שלב ההקשבה, שלב השיתוף..."
            />

            {errors.favoriteStage && (
              <p className="text-red-500 text-sm">שדה חובה</p>
            )}
          </div>

          {/* Favorite Card */}
          <div className="space-y-4">
            <label htmlFor="favoriteCard" className="flex items-center gap-2 text-lg font-semibold text-gray-800">
              <Sparkles className="w-6 h-6 text-pink-600" />
              איזה קלף הכי עשה לכם טוב?
              <span className="text-red-500">*</span>
            </label>

            <input
              id="favoriteCard"
              type="text"
              {...register('favoriteCard', { required: true })}
              className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none transition-colors text-lg"
              placeholder="ספרו לנו על הקלף שהכי השפיע..."
            />

            {errors.favoriteCard && (
              <p className="text-red-500 text-sm">שדה חובה</p>
            )}
          </div>

          {/* Less Connected */}
          <div className="space-y-4">
            <label htmlFor="lessConnected" className="flex items-center gap-2 text-lg font-semibold text-gray-800">
              <MessageCircle className="w-6 h-6 text-pink-600" />
              מה היה פחות ברור או פחות התחבר?
            </label>

            <textarea
              id="lessConnected"
              {...register('lessConnected')}
              rows={4}
              className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none transition-colors text-lg resize-none"
              placeholder="נשמח לשמוע איך נוכל לשפר..."
            />
          </div>

          {/* Would Recommend */}
          <div className="space-y-4">
            <label className="flex items-center gap-2 text-lg font-semibold text-gray-800">
              <Users className="w-6 h-6 text-pink-600" />
              האם הייתם ממליצים לזוג אחר?
              <span className="text-red-500">*</span>
            </label>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setValue('wouldRecommend', 'yes')}
                className={`flex-1 py-4 px-6 rounded-xl font-semibold transition-all ${wouldRecommend === 'yes'
                  ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-pink-100 hover:text-pink-600'
                  }`}
              >
                כן, בהחלט! 💖
              </button>

              <button
                type="button"
                onClick={() => setValue('wouldRecommend', 'no')}
                className={`flex-1 py-4 px-6 rounded-xl font-semibold transition-all ${wouldRecommend === 'no'
                  ? 'bg-gradient-to-r from-gray-600 to-gray-700 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
              >
                לא
              </button>
            </div>

            {errors.wouldRecommend && (
              <p className="text-red-500 text-sm">אנא בחרו תשובה</p>
            )}
          </div>

          {/* Message */}
          <div className="space-y-4">
            <label htmlFor="message" className="flex items-center gap-2 text-lg font-semibold text-gray-800">
              <Heart className="w-6 h-6 text-pink-600" />
              משפט אחד שהייתם רוצים לומר לנו
              <span className="text-red-500">*</span>
            </label>

            <input
              id="message"
              type="text"
              {...register('message', { required: true })}
              className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none transition-colors text-lg"
              placeholder="המחשבות שלכם חשובות לנו..."
            />

            {errors.message && (
              <p className="text-red-500 text-sm">שדה חובה</p>
            )}
          </div>

          {/* Optional Contact Info */}
          <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-6 space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              פרטי קשר (אופציונלי)
            </h3>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-gray-700">
                  שם
                </label>
                <input
                  id="name"
                  type="text"
                  {...register('name')}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none transition-colors"
                  placeholder="השם שלכם"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium text-gray-700">
                  טלפון
                </label>
                <input
                  id="phone"
                  type="text"
                  {...register('phone')}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none transition-colors"
                  placeholder="054-1234567"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-700">
                  מייל
                </label>
                <input
                  id="email"
                  type="email"
                  {...register('email')}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none transition-colors"
                  placeholder="email@example.com"
                />
              </div>
            </div>
          </div>

          {submitError && (
             <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-center">
               {submitError}
             </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-pink-600 via-rose-500 to-red-500 text-white py-5 px-8 rounded-2xl font-bold text-lg hover:scale-105 transition-all shadow-xl hover:shadow-pink-500/50 flex items-center justify-center gap-3 group disabled:opacity-70 disabled:hover:scale-100"
          >
            {isSubmitting ? 'שולח...' : (
              <>
                <Send className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                שליחת משוב
              </>
            )}
          </button>
        </form>

        <PublicComments />
      </div>
    </div>
  );
}