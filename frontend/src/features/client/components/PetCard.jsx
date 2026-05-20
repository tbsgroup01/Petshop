import React from 'react';
import { MapPin, Heart, ChevronRight } from 'lucide-react';

const PetCard = ({ breed, location, price, status, image }) => {
  
  // Price ko Indian Currency (₹) mein format karne ke liye
  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);

  return (
    <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden group hover:shadow-xl hover:shadow-indigo-100/50 transition-all duration-300">
      
      {/* Image Container */}
      <div className="relative h-40 sm:h-64 overflow-hidden">
        <img 
          src={image} 
          alt={breed} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
        />
        
        {/* Wishlist Button */}
        <button className="absolute top-2 sm:top-4 right-2 sm:right-4 p-1.5 sm:p-2.5 bg-white/90 backdrop-blur-md rounded-full text-slate-400 hover:text-red-500 hover:bg-white transition-all shadow-sm">
          <Heart size={14} className="sm:block hidden" />
          <Heart size={12} className="sm:hidden" />
        </button>

        {/* Status Badge */}
        <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4">
          <span className={`text-[7px] sm:text-[9px] font-extrabold px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg uppercase tracking-wider shadow-sm backdrop-blur-md ${
            status === 'VERIFIED' 
              ? 'bg-emerald-500/90 text-white' 
              : 'bg-cyan-500/90 text-white'
          }`}>
            {status}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 sm:p-6">
        <div className="mb-3 sm:mb-4">
          <h3 className="text-base sm:text-xl font-bold text-slate-800 mb-1 group-hover:text-indigo-600 transition-colors">
            {breed}
          </h3>
          <div className="flex items-center text-slate-400 text-xs sm:text-sm font-medium">
            <MapPin size={12} className="mr-1 text-indigo-400" />
            {location}
          </div>
        </div>

        {/* Price & Action */}
        <div className="flex justify-between items-center border-t border-slate-50 pt-3 sm:pt-5">
          <div>
            <p className="text-[8px] sm:text-[10px] font-bold text-slate-300 uppercase tracking-widest mb-0.5">Price</p>
            <span className="text-indigo-600 font-extrabold text-lg sm:text-xl">
              {formattedPrice}
            </span>
          </div>
          
          <button className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-slate-50 text-indigo-600 rounded-lg sm:rounded-xl hover:bg-indigo-600 hover:text-white transition-all group/btn">
            <ChevronRight size={16} className="sm:w-5 sm:h-5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PetCard;