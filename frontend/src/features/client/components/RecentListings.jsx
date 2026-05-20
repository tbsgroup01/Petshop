import React from 'react';
import { ArrowRight } from 'lucide-react';

const MeetingCard = ({ breed, traits, age, image, isPromoted }) => (
  <div className="bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full">
    {/* Image Section - Mobile Responsive Optimized */}
    <div className="relative w-full aspect-[4/3] sm:h-64 overflow-hidden">
      <img 
        src={image} 
        alt={breed} 
        // object-cover ensures the image fills the area without distortion
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
      />
      {/* Meeting Badge */}
      <div className="absolute top-2 left-2 sm:top-4 sm:left-4 bg-[#4F46E5] text-white text-[8px] sm:text-[10px] font-bold px-2 sm:px-3 py-0.5 sm:py-1 rounded-md tracking-wider uppercase shadow-sm z-10">
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
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8 sm:mb-10">
          <h2 className="text-slate-800 text-lg sm:text-xl font-bold">Recent Listings</h2>
          <button className="flex items-center text-indigo-600 font-bold text-xs sm:text-sm group hover:translate-x-1 transition-transform">
            See all <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Grid - Adjusted to map MeetingPets and use MeetingCard */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {MeetingPets.map((item, index) => (
            <MeetingCard key={index} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MeetingSection;