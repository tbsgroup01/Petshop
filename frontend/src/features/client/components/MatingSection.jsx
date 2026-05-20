import React from 'react';
import { ArrowRight } from 'lucide-react';

const MeetingCard = ({ breed, traits, age, image, isPromoted }) => (
  <div className="bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full">
    {/* Image Section - Updated Height & Object Fit */}
    <div className="relative h-48 sm:h-64 overflow-hidden">
      <img 
        src={image} 
        alt={breed} 
        // w-full aur h-full ke saath object-cover lagaya hai taaki image properly fit ho
        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
      />
      {/* Meeting Badge */}
      <div className="absolute top-2 left-2 sm:top-4 sm:left-4 bg-[#4F46E5] text-white text-[8px] sm:text-[10px] font-bold px-2 sm:px-3 py-0.5 sm:py-1 rounded-md tracking-wider uppercase shadow-sm">
        Meeting
      </div>
    </div>

    {/* Info Section */}
    <div className="p-4 sm:p-6 flex flex-col flex-grow">
      <h3 className="text-slate-800 font-bold text-base sm:text-lg mb-1">{breed}</h3>
      <p className="text-slate-400 text-xs sm:text-sm mb-4 sm:mb-6">
        {traits} • {age}
      </p>

      {/* Conditional Button Styling */}
      <button className={`w-full py-2 sm:py-3 rounded-lg sm:rounded-xl font-bold text-xs sm:text-sm transition-all mt-auto ${
        isPromoted 
          ? 'bg-[#4F46E5] text-white hover:bg-indigo-700' 
          : 'bg-indigo-50/50 text-[#4F46E5] border border-indigo-100 hover:bg-indigo-100'
      }`}>
        Contact Breeder
      </button>
    </div>
  </div>
);

const MeetingSection = () => {
  const MeetingPets = [
    {
      breed: 'German Shepherd',
      traits: 'Champion Bloodline',
      age: '3 Years Old',
      image: 'https://petsocorner.com/assets/images/gallery/l-5.jpg',
      isPromoted: false
    },
    {
      breed: 'Siberian Husky',
      traits: 'Health Screened',
      age: '2 Years Old',
      image: 'https://cdn.shopify.com/s/files/1/1199/8502/files/shihtzu.png?v=1645190451',
      isPromoted: false
    },
    {
      breed: 'Labrador Retriever',
      traits: 'AKC Registered',
      age: '4 Years Old',
      image: 'https://paradepets.com/.image/c_fill,g_faces:center/NTowMDAwMDAwMDAwMTE4NzAw/cute_golden_retriever_puppy.jpg',
      isPromoted: true
    }
  ];

  return (
    <section className="px-3 sm:px-6 md:px-10 py-12 sm:py-16 bg-white">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 sm:mb-10 gap-4 max-w-7xl mx-auto">
        <h2 className="text-slate-800 font-semibold text-lg sm:text-2xl">Pets Available for Meeting</h2>
        <button className="flex items-center text-indigo-600 font-semibold text-xs sm:text-sm hover:gap-2 transition-all flex-shrink-0">
          View all <ArrowRight size={16} className="ml-1" />
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
        {MeetingPets.map((pet, index) => (
          <MeetingCard key={index} {...pet} />
        ))}
      </div>
    </section>
  );
};

export default MeetingSection;
