import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ChevronLeft, ChevronRight, Heart, Users, Baby, Sparkles } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Product {
  id: number;
  name: string;
  subtitle: string;
  description: string;
  icon: React.ElementType;
  features: string[];
  image: string;
  gradient: string;
  bgGradient: string;
}

const products: Product[] = [
  {
    id: 1,
    name: 'זוגות מחוברים',
    subtitle: 'לב אל לב - זוגות',
    description: 'שיחות עמוקות ומשמעותיות שמחזקות את הקשר הזוגי ויוצרות אינטימיות רגשית',
    icon: Heart,
    features: [
      'שאלות מעוררות רגש ותובנה',
      'משחקי זוגיות מהנים',
      'תרגילי הקשבה פעילה',
      'רגעי איכות משותפים'
    ],
    image: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    gradient: 'from-pink-500 to-rose-500',
    bgGradient: 'from-pink-50 to-rose-50',
  },
  {
    id: 2,
    name: 'משפחה שלמה',
    subtitle: 'לב אל לב - משפחה',
    description: 'פעילויות משפחתיות שמחברות בין ההורים לילדים ויוצרות זיכרונות משותפים',
    icon: Users,
    features: [
      'שיחות מותאמות לכל גיל',
      'משחקי משפחה מהנים',
      'בניית מסורות משפחתיות',
      'חיזוק הערכים המשפחתיים'
    ],
    image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    gradient: 'from-blue-500 to-cyan-500',
    bgGradient: 'from-blue-50 to-cyan-50',
  },
  {
    id: 3,
    name: 'הורים וילדים',
    subtitle: 'לב אל לב - הורות',
    description: 'כלים לשיחות משמעותיות בין הורים לילדים שמטפחים אמון ותקשורת פתוחה',
    icon: Baby,
    features: [
      'שאלות מתאימות לגיל',
      'טיפוח אינטליגנציה רגשית',
      'חיזוק הביטחון העצמי',
      'בניית קשר עמוק והדדי'
    ],
    image: 'https://images.unsplash.com/photo-1609220136736-443140cffec6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    gradient: 'from-purple-500 to-violet-500',
    bgGradient: 'from-purple-50 to-violet-50',
  },
];

interface ArrowProps {
  onClick?: () => void;
}

const NextArrow: React.FC<ArrowProps> = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gradient-to-br hover:from-pink-600 hover:to-rose-600 text-pink-600 hover:text-white rounded-full p-4 shadow-xl transition-all hover:scale-110 group border-2 border-pink-200"
    aria-label="הבא"
  >
    <ChevronLeft className="w-6 h-6" />
  </button>
);

const PrevArrow: React.FC<ArrowProps> = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gradient-to-br hover:from-pink-600 hover:to-rose-600 text-pink-600 hover:text-white rounded-full p-4 shadow-xl transition-all hover:scale-110 group border-2 border-pink-200"
    aria-label="הקודם"
  >
    <ChevronRight className="w-6 h-6" />
  </button>
);

export function ProductCarousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    rtl: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    autoplay: true,
    autoplaySpeed: 6000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className="py-24 bg-gradient-to-b from-white via-pink-50/30 via-blue-50/30 to-white relative overflow-hidden">
      {/* Decorative elements with pink/red hues */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-pink-200/30 to-rose-200/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-200/25 to-cyan-200/25 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 px-6 py-3 rounded-full mb-6">
            <Sparkles className="w-5 h-5 text-pink-600" />
            <span className="bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent font-medium">החבילות שלנו</span>
          </div>

          <h2 className="mb-6 text-4xl md:text-5xl">
            <span className="bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
              בחרו את המסלול
            </span>
            <br />
            <span className="text-gray-800">שמתאים לכם</span>
          </h2>

          <p className="text-gray-600 max-w-3xl mx-auto text-xl leading-relaxed">
            כל חבילת <span className="bg-gradient-to-r from-pink-600 via-rose-600 to-purple-600 bg-clip-text text-transparent font-medium">לב אל לב</span> מותאמת במיוחד לצרכים השונים של קשרים משפחתיים וזוגיים
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <Slider {...settings}>
            {products.map((product) => (
              <div key={product.id} className="px-4">
                <div className={`bg-gradient-to-br ${product.bgGradient} rounded-[2.5rem] shadow-2xl overflow-hidden border-2 border-white/50`}>
                  <div className="grid md:grid-cols-2 gap-0">
                    {/* Image side */}
                    <div className="relative aspect-square md:aspect-auto overflow-hidden">
                      <ImageWithFallback
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-pink-900/20"></div>
                    </div>

                    {/* Content side */}
                    <div className="p-10 md:p-12 flex flex-col justify-center bg-white/60 backdrop-blur-sm">
                      <div className="mb-6">
                        <div className="text-sm text-purple-600 mb-2">{product.subtitle}</div>
                        <h3 className="text-3xl md:text-4xl mb-4 text-gray-800">
                          {product.name}
                        </h3>
                        <p className="text-gray-600 text-lg leading-relaxed">
                          {product.description}
                        </p>
                      </div>

                      {/* Features list */}
                      <div className="space-y-4 mb-8">
                        {product.features.map((feature, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                            <div className={`w-6 h-6 rounded-full bg-gradient-to-r ${product.gradient} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                              <Heart className="w-3.5 h-3.5 text-white fill-white" />
                            </div>
                            <span className="text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>

                      {/* CTA Button */}
                      <Link to="/order" className={`group relative bg-gradient-to-r ${product.gradient} hover:shadow-2xl text-white px-8 py-5 rounded-2xl transition-all hover:scale-105 overflow-hidden shadow-xl inline-block`}>
                        <span className="relative z-10 flex items-center gap-3 justify-center text-lg">
                          <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                          התחילו עכשיו
                        </span>
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
}