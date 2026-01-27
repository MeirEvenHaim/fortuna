import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Heart, Send, User, Phone, Mail, MapPin, CheckCircle2, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import fortunaLogo from '../../assets/fortuna-logo.png';

interface OrderFormData {
  firstName: string;
  phone: string;
  email: string;
  city?: string;
}

export function OrderPage() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<OrderFormData>({
    defaultValues: {
      firstName: '',
      phone: '',
      email: '',
      city: ''
    }
  });

  const onSubmit = async (data: OrderFormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Something went wrong');
      }

      const result = await response.json();
      console.log('Order submitted:', result);
      setSubmitted(true);

      // Scroll to top to show success message
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error('Submission error:', err);
      setError('אירעה שגיאה בשליחת הטופס. אנא נסו שוב מאוחר יותר.');
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
              תודה רבה! 💖
            </h1>

            <p className="text-lg text-gray-600 mb-4">
              קיבלנו את הפרטים שלכם ונחזור אליכם בהקדם עם מחיר, זמינות ופרטי משלוח.
            </p>

            <p className="text-md text-gray-500 mb-8">
              אנחנו כאן כדי לעזור לכם להתחיל את המסע الخاص שלכם ❤️
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
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <img src={fortunaLogo} alt="Fortuna - לב אל לב" className="h-24 md:h-32" />
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            רוצים את לב אל לב בבית? 💕
          </h1>

          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            השאירו פרטים ונחזור אליכם עם מחיר, זמינות ומשלוח.
          </p>
        </div>

        {/* Form Card */}
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 space-y-6">
          {/* Decorative hearts */}
          <div className="flex justify-center gap-2 mb-6">
            <Heart className="w-5 h-5 text-pink-400 fill-pink-400 animate-pulse" style={{ animationDelay: '0s' }} />
            <Heart className="w-6 h-6 text-pink-500 fill-pink-500 animate-pulse" style={{ animationDelay: '0.2s' }} />
            <Heart className="w-5 h-5 text-pink-400 fill-pink-400 animate-pulse" style={{ animationDelay: '0.4s' }} />
          </div>

          {/* First Name */}
          <div className="space-y-3">
            <label htmlFor="firstName" className="flex items-center gap-2 text-lg font-semibold text-gray-800">
              <User className="w-5 h-5 text-pink-600" />
              שם פרטי
              <span className="text-red-500">*</span>
            </label>

            <input
              id="firstName"
              type="text"
              {...register('firstName', {
                required: 'שדה חובה',
                minLength: { value: 2, message: 'השם חייב להכיל לפחות 2 תווים' }
              })}
              className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none transition-colors text-lg"
              placeholder="איך קוראים לך?"
            />

            {errors.firstName && (
              <p className="text-red-500 text-sm flex items-center gap-1">
                {errors.firstName.message}
              </p>
            )}
          </div>

          {/* Phone */}
          <div className="space-y-3">
            <label htmlFor="phone" className="flex items-center gap-2 text-lg font-semibold text-gray-800">
              <Phone className="w-5 h-5 text-pink-600" />
              טלפון
              <span className="text-red-500">*</span>
            </label>

            <input
              id="phone"
              type="tel"
              {...register('phone', {
                required: 'שדה חובה',
                pattern: {
                  value: /^[0-9\-\+\(\)\s]+$/,
                  message: 'מספר טלפון לא תקין'
                },
                minLength: { value: 9, message: 'מספר טלפון לא תקין' }
              })}
              className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none transition-colors text-lg"
              placeholder="054-1234567"
              dir="ltr"
            />

            {errors.phone && (
              <p className="text-red-500 text-sm flex items-center gap-1">
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-3">
            <label htmlFor="email" className="flex items-center gap-2 text-lg font-semibold text-gray-800">
              <Mail className="w-5 h-5 text-pink-600" />
              אימייל
              <span className="text-red-500">*</span>
            </label>

            <input
              id="email"
              type="email"
              {...register('email', {
                required: 'שדה חובה',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: 'כתובת אימייל לא תקינה'
                }
              })}
              className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none transition-colors text-lg"
              placeholder="example@example.com"
              dir="ltr"
            />

            {errors.email && (
              <p className="text-red-500 text-sm flex items-center gap-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* City (Optional) */}
          <div className="space-y-3">
            <label htmlFor="city" className="flex items-center gap-2 text-lg font-semibold text-gray-800">
              <MapPin className="w-5 h-5 text-pink-600" />
              עיר
              <span className="text-sm text-gray-500 font-normal">(אופציונלי)</span>
            </label>

            <input
              id="city"
              type="text"
              {...register('city')}
              className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none transition-colors text-lg"
              placeholder="איפה אתם גרים?"
            />
          </div>

          {/* Info Box */}
          <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-6 border-2 border-pink-100">
            <div className="flex items-start gap-3">
              <Sparkles className="w-6 h-6 text-pink-600 flex-shrink-0 mt-1" />
              <div className="space-y-2">
                <p className="text-gray-700 font-medium">
                  מה קורה אחרי השליחה?
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>✓ נחזור אליכם תוך 24 שעות</li>
                  <li>✓ נספק מידע על מחיר וזמינות</li>
                  <li>✓ נתאם משלוח נוח עבורכם</li>
                </ul>
              </div>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl text-center mb-4">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-pink-600 via-rose-500 to-red-500 text-white py-5 px-8 rounded-2xl font-bold text-lg hover:scale-105 transition-all shadow-xl hover:shadow-pink-500/50 flex items-center justify-center gap-3 group mt-8 disabled:opacity-70 disabled:hover:scale-100"
          >
            {isSubmitting ? (
              <span className="animate-pulse">שולח...</span>
            ) : (
              <>
                <Heart className="w-6 h-6 group-hover:scale-110 transition-transform fill-white" />
                כן, אני רוצה את המשחק
                <Send className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>

          {/* Privacy note */}
          <p className="text-xs text-gray-500 text-center mt-4">
            הפרטים שלכם נשמרים באופן מאובטח ולא יועברו לצד שלישי
          </p>
        </form>
      </div>
    </div>
  );
}