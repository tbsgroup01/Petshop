import React from 'react';
import { Heart, CheckCircle2, Footprints } from 'lucide-react';

const ServiceGrid = () => {
  return (
    <section className="px-3 sm:px-6 md:px-10 py-12 sm:py-16 bg-[#F8F9FE]">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
        
        {/* Left Card: Adopt */}
        <div className="relative min-h-[350px] sm:min-h-[420px] md:h-[450px] rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden group shadow-lg">
          <img 
            src="https://www.petplace.com/pet-adoption/media_1740aa105bbc41052f254093d1112ead04d221c37.jpeg?width=750&format=jpeg&optimize=medium" 
            alt="Adopt a pet" 
            className="w-full h-full object-cover brightness-75 group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-end pb-6 sm:pb-12 text-center px-4 sm:px-6">
            <h3 className="text-white text-base sm:text-xl font-medium mb-4 sm:mb-6">Looking to adopt?</h3>
            <button className="bg-white text-slate-800 px-6 sm:px-10 py-2 sm:py-3 rounded-xl sm:rounded-2xl font-bold hover:bg-gray-100 transition-colors shadow-lg text-sm sm:text-base">
              Browse Pets
            </button>
          </div>
        </div>

        {/* Center Card: Meeting Partners */}
        <div className="bg-[#EEF0FF] rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-10 flex flex-col shadow-sm border border-indigo-50">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center mb-6 sm:mb-8 shadow-sm">
            <Heart className="text-indigo-600 w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          
          <h3 className="text-slate-800 text-base sm:text-xl font-bold mb-3 sm:mb-4">Find Meeting Partners</h3>
          <p className="text-slate-500 text-sm sm:text-base mb-6 sm:mb-8 leading-relaxed">
            Connect with verified purebred pets for responsible breeding and clinical excellence.
          </p>

          <div className="space-y-3 sm:space-y-4 mb-8 sm:mb-10">
            <div className="flex items-center gap-2 sm:gap-3 text-slate-600 font-medium text-sm sm:text-base">
              <CheckCircle2 className="text-indigo-600 w-4 h-4 sm:w-5 sm:h-5" />
              Verified Health Certificates
            </div>
            <div className="flex items-center gap-2 sm:gap-3 text-slate-600 font-medium text-sm sm:text-base">
              <CheckCircle2 className="text-indigo-600 w-4 h-4 sm:w-5 sm:h-5" />
              Pedigree Documentation
            </div>
          </div>

          <button className="mt-auto bg-[#4F46E5] text-white py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all shadow-md text-sm sm:text-base">
            Find Meeting <Footprints className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Right Card: Sell */}
        <div className="relative min-h-[350px] sm:min-h-[420px] md:h-[450px] rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden group shadow-lg">
          <img 
            src="https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=600" 
            alt="Sell your pet" 
            className="w-full h-full object-cover brightness-75 group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-end pb-6 sm:pb-12 text-center px-4 sm:px-6">
            <h3 className="text-white text-base sm:text-xl font-medium mb-4 sm:mb-6">Want to sell your pet?</h3>
            <button className="bg-white text-slate-800 px-6 sm:px-10 py-2 sm:py-3 rounded-xl sm:rounded-2xl font-bold hover:bg-gray-100 transition-colors shadow-lg text-sm sm:text-base">
              List Now
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ServiceGrid;