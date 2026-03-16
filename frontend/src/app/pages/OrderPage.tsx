import React, { useState } from 'react';
import { CheckCircle2, ShoppingBag, CreditCard, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import fortunaLogo from '../../assets/fortuna-logo.png';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  type: 'physical' | 'digital' | 'bundle';
  features: string[];
}

const products: Product[] = [
  {
    id: '1',
    name: 'המשחק הפיזי - לב אל לב',
    description: 'מארז הקלפים המהודר שיחבר ביניכם מחדש.',
    price: 350,
    type: 'physical',
    features: ['101 קלפי עומק', 'מארז מהודר', 'משלוח מהיר עד הבית'],
  },
  {
    id: '2',
    name: 'קורס הדיגיטל השלם',
    description: 'גישה לכל תכני הווידאו המקצועיים לזוגיות שמחה.',
    price: 450,
    type: 'digital',
    features: ['גישה לכל החיים', '30 פרקי וידאו ממצים', 'קהילה סגורה'],
  },
  {
    id: '3',
    name: 'חבילת הפרימיום המלאה',
    description: 'המשחק הפיזי עד הבית + גישה מלאה לקורס הדיגיטלי.',
    price: 650,
    type: 'bundle',
    features: ['המשחק הפיזי', 'גישה לקורס הדיגיטלי', 'הטבות בלעדיות VIP'],
  }
];

export function OrderPage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [checkoutStep, setCheckoutStep] = useState<'catalog' | 'checkout' | 'success'>('catalog');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCheckout = async (provider: 'paypal' | 'venmo') => {
    setIsProcessing(true);
    
    // Simulate network delay and hit backend mock endpoint
    try {
      const response = await fetch('/api/payments/checkout', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer MOCK_TOKEN_FOR_NOW'
          },
          body: JSON.stringify({
              amount: selectedProduct?.price,
              currency: 'ILS',
              provider: provider,
              courseId: selectedProduct?.type === 'digital' || selectedProduct?.type === 'bundle' ? 1 : null
          })
      });

      // We ignore the actual failure here because user might not be logged in yet for the mock token 
      // This is purely for UI demonstration UX flow
      setTimeout(() => {
        setIsProcessing(false);
        setCheckoutStep('success');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 1500);

    } catch (err) {
      console.log(err);
      setTimeout(() => {
        setIsProcessing(false);
        setCheckoutStep('success');
      }, 1500);
    }
  };

  if (checkoutStep === 'success') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 flex items-center justify-center p-4" dir="rtl">
        <div className="max-w-2xl w-full">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-12 text-center border-2 border-green-100">
            <div className="mb-6 flex justify-center animate-bounce">
              <div className="bg-gradient-to-r from-green-400 to-emerald-500 rounded-full p-6 shadow-xl shadow-green-200">
                <CheckCircle2 className="w-16 h-16 text-white" />
              </div>
            </div>
            <h1 className="text-3xl md:text-5xl font-black mb-4 text-gray-800">
              התשלום עבר בהצלחה! 🎉
            </h1>
            <p className="text-xl text-gray-600 mb-8 font-medium">
              תודה שרכשתם את <span className="text-pink-600 font-bold">{selectedProduct?.name}</span>
            </p>
            <div className="bg-gray-50 rounded-2xl p-6 mb-8 inline-block text-right border border-gray-100">
              <p className="text-gray-500 mb-2">מספר הזמנה: <span className="font-mono font-bold text-gray-800">#FRT-{Math.floor(Math.random() * 90000) + 10000}</span></p>
              <p className="text-gray-500">קבלה ופרטים נוספים נשלחו למייל שלכם.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {['digital', 'bundle'].includes(selectedProduct?.type || '') && (
                <Link to="/courses" className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-full font-bold hover:scale-105 transition-all shadow-lg hover:shadow-blue-500/50">
                  מעבר לקורסים שלי
                </Link>
              )}
              <Link to="/" className="bg-white text-gray-800 px-8 py-4 rounded-full font-bold border-2 border-gray-200 hover:bg-gray-50 transition-all">
                חזרה לדף הבית
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (checkoutStep === 'checkout' && selectedProduct) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-20 px-4" dir="rtl">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
            
          <button onClick={() => setCheckoutStep('catalog')} className="text-gray-500 font-medium hover:text-pink-600 transition-colors mb-8 self-start">
            &rarr; חזרה לקטלוג
          </button>

          <div className="bg-white rounded-3xl shadow-xl w-full max-w-2xl overflow-hidden border border-gray-100">
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-8 text-center relative overflow-hidden">
                <ShieldCheck className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 text-white opacity-5 mb-8" />
                <h2 className="text-3xl font-bold text-white relative z-10 mb-2">קופה מאובטחת</h2>
                <p className="text-gray-400 relative z-10">בחרו את אמצעי התשלום המועדף עליכם</p>
            </div>
            
            <div className="p-8">
              <div className="bg-gray-50 rounded-2xl p-6 mb-8 border border-gray-200 flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{selectedProduct.name}</h3>
                  <p className="text-gray-500 text-sm mt-1">{selectedProduct.type === 'physical' ? 'משלוח עד הבית כלול' : 'גישה דיגיטלית מיידית'}</p>
                </div>
                <div className="text-3xl font-black text-gray-900">
                  ₪{selectedProduct.price}
                </div>
              </div>

              {isProcessing ? (
                <div className="flex flex-col items-center justify-center py-12">
                   <div className="w-16 h-16 border-4 border-gray-200 border-t-pink-600 rounded-full animate-spin mb-4"></div>
                   <p className="text-gray-600 font-medium animate-pulse">מעבד תשלום מאובטח...</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <button onClick={() => handleCheckout('paypal')} className="w-full relative group bg-[#FFC439] hover:bg-[#F4BB33] transition-colors py-5 rounded-2xl flex items-center justify-center overflow-hidden shadow-sm">
                    <span className="font-bold text-[#003087] text-xl tracking-wide flex items-center gap-2">
                      Pay<span className="text-[#0079C1]">Pal</span>
                    </span>
                  </button>
                  
                  <button onClick={() => handleCheckout('venmo')} className="w-full relative group bg-[#008CFF] hover:bg-[#007AE0] transition-colors py-5 rounded-2xl flex items-center justify-center shadow-sm">
                    <span className="font-bold text-white text-xl tracking-wide italic">
                      venmo
                    </span>
                  </button>

                  <div className="relative py-4">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div>
                    <div className="relative flex justify-center"><span className="bg-white px-4 text-sm text-gray-400">או</span></div>
                  </div>

                  <button disabled className="w-full bg-gray-100 text-gray-400 py-5 rounded-2xl font-medium flex items-center justify-center gap-2 cursor-not-allowed">
                    <CreditCard className="w-5 h-5"/>
                    תשלום בכרטיס אשראי (בקרוב)
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFCFB] py-20 px-4 relative overflow-hidden" dir="rtl">
      {/* Premium Background Blurs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-pink-200/30 to-rose-100/30 rounded-full blur-3xl pointer-events-none -translate-y-1/2 object-cover"></div>
      <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-gradient-to-tr from-blue-100/40 to-cyan-100/40 rounded-full blur-3xl pointer-events-none translate-y-1/3"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <img src={fortunaLogo} alt="Fortuna" className="h-20 mx-auto mb-8 drop-shadow-md" />
          <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 tracking-tight">
            המסע שלכם <span className="bg-gradient-to-r from-pink-600 to-rose-500 bg-clip-text text-transparent">מתחיל כאן.</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-medium">
            תקשורת עמוקה יותר, קרבה אמיתית ורגעים שנשארים לתמיד. בחרו את החבילה המתאימה לכם.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-stretch pt-8">
          {products.map((product) => (
            <div 
              key={product.id} 
              className={`relative bg-white/70 backdrop-blur-xl rounded-3xl p-8 border hover:-translate-y-3 transition-all duration-300 shadow-xl flex flex-col ${
                product.type === 'bundle' 
                  ? 'border-pink-300 shadow-pink-200/50 md:-mt-8 md:mb-8' 
                  : 'border-white/50 hover:border-pink-100 hover:shadow-xl'
              }`}
            >
              {product.type === 'bundle' && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-pink-600 to-rose-500 text-white px-6 py-2 rounded-full font-bold text-sm shadow-lg whitespace-nowrap">
                  הבחירה הפופולרית בחנות
                </div>
              )}
              
              <div className="flex-grow">
                {product.type === 'bundle' ? <ShoppingBag className="w-12 h-12 text-pink-500 mb-6" /> : <ShieldCheck className="w-12 h-12 text-blue-400 mb-6" />}
                <h3 className="text-2xl font-bold text-gray-800 mb-3">{product.name}</h3>
                <p className="text-gray-600 leading-relaxed mb-6 h-12">{product.description}</p>
                
                <div className="mb-8">
                  <span className="text-4xl font-black text-gray-900">₪{product.price}</span>
                </div>

                <ul className="space-y-3 mb-8">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-gray-700 font-medium">
                      <div className="w-6 h-6 rounded-full bg-pink-100 flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="w-4 h-4 text-pink-600" />
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <button 
                onClick={() => {
                  setSelectedProduct(product);
                  setCheckoutStep('checkout');
                }}
                className={`w-full py-4 rounded-full font-bold text-lg transition-all shadow-md ${
                  product.type === 'bundle'
                    ? 'bg-gray-900 text-white hover:bg-gray-800 hover:shadow-xl'
                    : 'bg-white text-gray-800 border-2 border-gray-100 hover:border-pink-200 hover:bg-pink-50'
                }`}
              >
                רכשו עכשיו
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}