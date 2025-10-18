// components/HeroSlider.tsx
'use client';

import { FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import type { SwiperOptions } from 'swiper/types';

// Import stylów Swiper
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

// Typ dla pojedynczego slajdu
interface Slide {
  id: number;
  image: string;
  title: string;
  subtitle: string;
}

// Props dla komponentu HeroSlider
interface HeroSliderProps {
  slides?: Slide[];
  autoplayDelay?: number;
  animationDuration?: number;
}

const HeroSlider: FC<HeroSliderProps> = ({ 
  slides = defaultSlides,
  autoplayDelay = 5000,
  animationDuration = 20,
}) => {
  // Konfiguracja Swiper
  const swiperConfig: SwiperOptions = {
    modules: [Autoplay, Pagination, EffectFade],
    effect: 'fade',
    speed: 1000,
    autoplay: {
      delay: autoplayDelay,
      disableOnInteraction: false,
    },
    pagination: {
      clickable: true,
      bulletClass: 'hero-pagination-bullet',
      bulletActiveClass: 'hero-pagination-bullet-active',
    },
    loop: true,
  };



  return (
    <>
      <div className="relative w-full h-screen overflow-hidden">
        <Swiper
          {...swiperConfig}
          className="w-full h-full"
        >
          {slides.map((slide: Slide) => (
            <SwiperSlide key={slide.id}>
              <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">
                {/* Zdjęcie tła z animacją Ken Burns */}
                <div 
                  className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
                  style={{ 
                    backgroundImage: `url(${slide.image})`,
                    animation: `kenBurns ${animationDuration}s ease-out infinite`
                  }}
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/50 z-[1]" />
                
                {/* Treść slajdu */}
                <div className="relative z-[2] text-center text-white max-w-4xl px-4 sm:px-6 animate-fadeInUp">
                  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 tracking-tight leading-tight drop-shadow-lg">
                    {slide.title}
                  </h1>
                  <p className="text-lg sm:text-xl md:text-2xl font-light opacity-95 drop-shadow-md">
                    {slide.subtitle}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style jsx global>{`
        /* Animacja Ken Burns */
        @keyframes kenBurns {
          0% {
            transform: scale(1);
          }
          100% {
            transform: scale(1.2);
          }
        }

        /* Animacja pojawiania się tekstu */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 1s ease-out;
        }

        /* Stylizacja paginacji Swiper */
        .swiper-pagination {
          position: absolute;
          bottom: 30px !important;
          z-index: 10;
        }

        .hero-pagination-bullet {
          width: 12px;
          height: 12px;
          background: rgba(255, 255, 255, 0.5);
          opacity: 1;
          margin: 0 8px !important;
          transition: all 0.3s ease;
          cursor: pointer;
          display: inline-block;
          border-radius: 50%;
        }

        .hero-pagination-bullet-active {
          width: 40px;
          border-radius: 6px;
          background: white;
        }

        /* Responsywność dla paginacji */
        @media (max-width: 768px) {
          .swiper-pagination {
            bottom: 20px !important;
          }
        }
      `}</style>
    </>
  );
};

// Domyślne slajdy
const defaultSlides: Slide[] = [
  {
    id: 1,
    image: '/hero.jpg',
    title: 'Odkryj Nowe Możliwości',
    subtitle: 'Innowacyjne rozwiązania dla Twojego biznesu',
  },
  {
    id: 2,
    image: '/hero.jpg',
    title: 'Zaufaj Profesjonalistom',
    subtitle: 'Doświadczenie, które przynosi rezultaty',
  },
  {
    id: 3,
    image: '/hero.jpg',
    title: 'Rozwijaj się z Nami',
    subtitle: 'Twój sukces jest naszym priorytetem',
  },
];

export default HeroSlider;

// Eksport typów dla użycia w innych komponentach
export type { Slide, HeroSliderProps };