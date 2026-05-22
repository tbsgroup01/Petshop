import React from 'react';
import { Search } from 'lucide-react';

const Hero = () => {
  return (
    <section 
      className="relative min-h-[480px] sm:min-h-[500px] md:min-h-[520px] w-full flex items-center px-3 sm:px-6 md:px-10 lg:px-20 overflow-hidden"
      style={{ 
        backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.9) 10%, rgba(255, 255, 255, 0.2) 60%, transparent), url('https://www.purina-arabia.com/sites/default/files/styles/hero_image_regular_large/public/2025-07/small%20fluffy%20dogs%20HERO.webp?itok=b7J7eaoT')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center right'
      }}
    >
      {/* --- BLUR LAYERS (Modern Glass Effect) --- */}
      {/* Top blur circle */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-200/30 rounded-full blur-[100px] z-0"></div>
      
      {/* Background soft blur overlay */}
      <div className="absolute inset-0 backdrop-blur-[2px] pointer-events-none z-0"></div>

      <div className="w-full z-10">
        <h2 className="text-indigo-600 text-xs sm:text-sm font-black mb-2 sm:mb-3 uppercase tracking-[0.2em] sm:tracking-[0.3em]">
          Find Your Perfect Pet
        </h2>
        
        <h1 className="text-3xl sm:text-5xl md:text-7xl font-black text-slate-900 mb-4 sm:mb-6 leading-[1.1] break-words">
          Clinical Care for <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-indigo-400">
            Happy Paws
          </span>
        </h1>

        <p className="text-slate-600 text-sm sm:text-lg md:text-xl mb-6 sm:mb-10 leading-relaxed max-w-xl">
          Trusted breeders. Healthy pets. Easy adoption. Experience excellence 
          in pet care and sourcing.
        </p>

      
      </div>
    </section>
  );
};

export default Hero;
