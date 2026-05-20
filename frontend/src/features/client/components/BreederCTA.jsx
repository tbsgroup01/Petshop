import React from 'react';
import { Footprints } from 'lucide-react'; 

const BreederCTA = () => {
  return (
    <div className="px-3 sm:px-6 md:px-10">
      <div className="bg-[#4F46E5] rounded-[1.5rem] sm:rounded-[2.5rem] p-4 sm:p-6 md:p-8 flex flex-col md:flex-row items-center justify-between shadow-lg gap-4 sm:gap-6">
        {/* Text Content */}
        <div className="text-white space-y-1 sm:space-y-2 text-center md:text-left">
          <h3 className="text-base sm:text-xl font-medium opacity-90">
            Are you a breeder?
          </h3>
          <p className="text-lg sm:text-2xl font-semibold leading-tight max-w-lg">
            List your pets and reach thousands of verified buyers seeking healthy companions.
          </p>
        </div>

        {/* Action Button */}
        <button className="mt-4 md:mt-0 bg-white text-[#4F46E5] px-4 sm:px-8 py-2 sm:py-4 rounded-lg sm:rounded-2xl font-bold flex items-center gap-2 sm:gap-3 hover:bg-opacity-90 transition-all shadow-md group flex-shrink-0 text-sm sm:text-base whitespace-nowrap">
          <Footprints className="w-4 h-4 sm:w-6 sm:h-6 transform group-hover:scale-110 transition-transform" />
          <span>Add Your Pet</span>
        </button>
      </div>
    </div>
  );
};

export default BreederCTA;