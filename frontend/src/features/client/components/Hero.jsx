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

      <div className="max-w-3xl z-10">
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

        {/* --- SEARCH BAR WITH GLASS EFFECT --- */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center bg-white/70 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] p-1.5 sm:p-2 w-full max-w-3xl border border-white/50 group transition-all hover:bg-white/80 gap-1.5 sm:gap-0">
          <div className="flex items-center flex-grow px-3 sm:px-4 py-2 sm:py-3 w-full sm:border-r sm:border-slate-100 text-slate-800">
            <Search className="text-indigo-500 w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 flex-shrink-0" />
            <input 
              type="text" 
              placeholder="Search breeds or locations..."
              className="w-full outline-none text-xs sm:text-sm md:text-lg font-medium bg-transparent placeholder-slate-400 text-slate-800"
            />
          </div>
          
          {/* Filter Tags with Glass Effect */}
          <div className="flex gap-1 sm:gap-2 p-0 sm:p-2 w-full sm:w-auto">
            {['Dogs', 'Cats'].map((tag) => (
              <button 
                key={tag}
                className="flex-1 sm:flex-none bg-white/50 backdrop-blur-md text-slate-700 px-3 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-bold border border-white shadow-sm hover:bg-indigo-600 hover:text-white hover:shadow-indigo-200 transition-all duration-300"
              >
                {tag}
              </button>
            ))}
            <button className="bg-indigo-600 text-white px-4 sm:px-8 py-2 sm:py-3 rounded-xl sm:rounded-2xl font-black text-xs sm:text-sm shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all active:scale-95">
              SEARCH
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;