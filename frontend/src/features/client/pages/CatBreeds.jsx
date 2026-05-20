

import React from "react";
import { Search, ArrowRight, MapPin } from "lucide-react";

const CatBreeds = () => {
  const featuredCats = [
    {
      name: "Persian",
      tag: "CALM",
      grooming: "High",
      life: "12-17 Yrs",
      img: "https://headsupfortails.com/cdn/shop/articles/Bengal_Cat_1.jpg?v=1754376983",
    },
    {
      name: "Siamese",
      tag: "SOCIAL",
      grooming: "Low",
      life: "15-20 Yrs",
      img: "https://www.diamondpet.com/wp-content/uploads/2022/02/close-up-white-cat-with-blue-eyes-121224.jpg",
    },
    {
      name: "Maine Coon",
      tag: "GENTLE GIANT",
      grooming: "Medium",
      life: "13-15 Yrs",
      img: "https://i.pinimg.com/236x/c6/2e/47/c62e47ccce4e8e568c9c7e381032bde9.jpg",
    },
    {
      name: "British Shorthair",
      tag: "EASYGOING",
      grooming: "Low",
      life: "14-16 Yrs",
      img: "https://img.magnific.com/free-photo/closeup-vertical-shot-cute-european-shorthair-cat_181624-34587.jpg?semt=ais_hybrid&w=740&q=80",
    },
  ];

  return (
    <div className="min-h-screen bg-white font-sans scroll-smooth overflow-x-hidden">

      {/* --- 1. HERO SECTION - Mobile Optimized Background --- */}
      <section 
        className="relative min-h-[500px] sm:min-h-[600px] w-full flex items-center px-6 py-12 md:px-10 lg:px-20 overflow-hidden"
        style={{ 
          backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.95) 20%, rgba(255, 255, 255, 0.4) 80%, transparent), url('https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=2000')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-200/30 rounded-full blur-[100px] z-0"></div>
        
        <div className="max-w-3xl z-10">
          <h2 className="text-indigo-600 text-xs md:text-sm font-black mb-3 py-3 uppercase tracking-[0.3em]">
            Find Your Perfect Breed
          </h2>
          
          <h1 className="text-4xl md:text-7xl font-black text-slate-900 mb-6 leading-[1.1]">
            Explore <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-indigo-400">
              Cat Breeds
            </span>
          </h1>

          <p className="text-slate-600 text-base md:text-xl mb-10 leading-relaxed max-w-xl font-medium">
            Discover affectionate, playful, and independent feline companions. Learn about breeds that align with your lifestyle.
          </p>

          {/* Search bar - Responsive widths */}
          <div className="flex flex-col sm:flex-row items-center bg-white/80 backdrop-blur-xl rounded-[2rem] shadow-2xl p-2 w-full max-w-3xl border border-white/50 group">
            <div className="flex items-center flex-grow px-4 w-full">
              <Search className="text-indigo-500 w-5 h-5 mr-3" />
              <input 
                type="text" 
                placeholder="Search breeds..."
                className="w-full py-4 outline-none text-slate-800 placeholder-slate-400 bg-transparent text-base md:text-lg font-medium"
              />
            </div>
            <button className="w-full sm:w-auto bg-indigo-600 text-white px-8 py-4 rounded-2xl font-black text-sm shadow-lg hover:bg-indigo-700 transition-all active:scale-95 whitespace-nowrap">
              SEARCH
            </button>
          </div>
        </div>
      </section>

      {/* --- 2. FEATURED CAT BREEDS - Aspect Ratio Images --- */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="container mx-auto px-6 md:px-10 lg:px-20">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Featured Breeds</h2>
              <p className="text-slate-500">Selected companions for your home.</p>
            </div>
            <button className="hidden sm:flex items-center gap-2 text-indigo-500 font-bold hover:underline group">
              View All <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredCats.map((cat, idx) => (
              <div key={idx} className="bg-white rounded-[32px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group">
                {/* Fixed Aspect Ratio for consistent image height on all devices */}
                <div className="aspect-[4/3] sm:aspect-square relative overflow-hidden">
                  <img
                    src={cat.img}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    alt={cat.name}
                  />
                  <span className="absolute top-4 right-4 bg-emerald-100 text-emerald-700 text-[10px] font-black px-3 py-1 rounded-full z-10">
                    {cat.tag}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-6">{cat.name}</h3>
                  <div className="space-y-3 mb-8 text-sm">
                    <div className="flex justify-between border-b border-slate-50 pb-2">
                      <span className="text-slate-400 font-medium">Grooming</span>
                      <span className="text-slate-900 font-bold">{cat.grooming}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-50 pb-2">
                      <span className="text-slate-400 font-medium">Lifespan</span>
                      <span className="text-slate-900 font-bold">{cat.life}</span>
                    </div>
                  </div>
                  <button className="w-full py-3 border border-indigo-100 rounded-2xl text-indigo-500 font-bold text-sm hover:bg-indigo-500 hover:text-white transition-all">
                    View Breed
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- 3. BREED COMPARISON TABLE --- */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 md:px-10 lg:px-20">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Breed Comparison</h2>
          <div className="overflow-x-auto border border-slate-100 rounded-[32px] shadow-sm">
            <table className="w-full text-left border-collapse bg-white min-w-[600px]">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  <th className="p-6 font-bold text-slate-900 text-sm md:text-base">Breed</th>
                  <th className="p-6 font-bold text-slate-900 text-sm md:text-base">Energy Level</th>
                  <th className="p-6 font-bold text-slate-900 text-sm md:text-base">Friendliness</th>
                  <th className="p-6 font-bold text-slate-900 text-sm md:text-base">Maintenance</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "Persian", energy: "w-1/4", friendliness: "Excellent", maintenance: "High" },
                  { name: "Siamese", energy: "w-full", friendliness: "Very High", maintenance: "Low" },
                  { name: "Maine Coon", energy: "w-2/3", friendliness: "Excellent", maintenance: "Medium" },
                ].map((item, idx) => (
                  <tr key={idx} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                    <td className="p-6 font-bold text-slate-900">{item.name}</td>
                    <td className="p-6">
                      <div className="w-24 md:w-32 h-2 bg-slate-100 rounded-full">
                        <div className={`${item.energy} h-full bg-indigo-500 rounded-full`}></div>
                      </div>
                    </td>
                    <td className="p-6 text-emerald-600 font-bold">{item.friendliness}</td>
                    <td className="p-6 text-slate-600">{item.maintenance}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* --- 4. CALL TO ACTION - Mobile Spacing Fix --- */}
      <section className="py-14 container mx-auto px-6 md:px-10 lg:px-20">
        <div className="bg-indigo-600 rounded-[2.5rem] md:rounded-[4rem] p-8 md:p-16 text-center lg:text-left flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
              Ready for a Feline Friend?
            </h2>
            <p className="text-indigo-100 text-lg md:text-xl opacity-90 leading-relaxed font-medium">
              Schedule a lifestyle consultation with our feline experts at Shiva Dog Clinic today.
            </p>
          </div>
          <button className="w-full lg:w-auto bg-white text-indigo-600 px-12 py-5 rounded-2xl font-black text-lg hover:shadow-2xl hover:scale-105 transition-all whitespace-nowrap">
            Book Consultation
          </button>
        </div>
      </section>
    </div>
  );
};

export default CatBreeds;
