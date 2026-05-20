import React from 'react';
import { Search, CalendarDays } from 'lucide-react';

const CatHero = () => {
  return (
    <div className="px-3 sm:px-6 md:px-0 mb-16 sm:mb-26">
      <div className="w-full min-h-[450px] sm:min-h-[500px] md:min-h-[520px] bg-white shadow-sm overflow-hidden flex flex-col relative border border-white">
        <div className="absolute inset-0 z-0 h-full w-full">
          <img 
            src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=1600" 
            alt="Cat Hero" 
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
        </div>
        
        <div className="relative z-10 flex-1 flex flex-col justify-center px-4 sm:px-8 md:px-16 text-white">
          <div className="max-w-2xl">
            <h1 className="text-2xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-3 sm:mb-5">
              Discover Your <br /> Ideal Cat Companion
            </h1>
            <p className="text-white/80 text-xs sm:text-lg md:text-lg mb-6 sm:mb-10 max-w-lg font-medium leading-relaxed">
              Explore our curated collection of pedigree and rescue cats, each waiting to bring joy and elegance to your home.
            </p>
            
            <div className="bg-white rounded-lg sm:rounded-full p-1.5 sm:p-2 shadow-2xl flex flex-col md:flex-row items-stretch md:items-center gap-1 max-w-fit md:pr-2 border border-white/20 mb-4 sm:mb-6">
              <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-5 py-2 sm:py-3 flex-grow md:border-r-0 md:border-r border-slate-100 text-slate-800 w-full">
                <Search className="text-indigo-500 flex-shrink-0" size={16} />
                <input type="text" placeholder="Search breeds or traits..." className="bg-transparent outline-none w-full text-xs sm:text-sm font-semibold" />
              </div>
              <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-5 py-2 sm:py-3 w-full md:w-auto text-slate-800">
                <CalendarDays className="text-indigo-500 flex-shrink-0" size={16} />
                <input type="text" placeholder="Age" className="bg-transparent outline-none w-full text-xs sm:text-sm font-semibold" />
              </div>
              <button className="px-4 sm:px-8 py-2 sm:py-3 bg-indigo-600 text-white rounded-lg sm:rounded-full font-bold hover:bg-indigo-700 transition-all text-xs sm:text-sm ml-0 sm:ml-2">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatHero;