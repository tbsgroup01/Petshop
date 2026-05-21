import React from 'react';
import { 
  Search, MapPin, SlidersHorizontal, ChevronRight, 
  Clock, ArrowRight, ShieldCheck, Zap, 
  Heart, Star, Award, Sparkles, Trophy
} from 'lucide-react';

const DogPage = () => {
  const nearbyDogs = [
    { name: "Max", breed: "Golden Retriever", age: "2 months", price: "₹15,000", loc: "Brooklyn, NY", tags: ["FRIENDLY", "TRAINED"], img: "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=500" },
    { name: "Bella", breed: "French Bulldog", age: "4 months", price: "₹22,090", loc: "Manhattan, NY", tags: ["PLAYFUL", "APARTMENT"], img: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=500" },
    { name: "Charlie", breed: "German Shepherd", age: "1 year", price: "₹9,090", loc: "Queens, NY", tags: ["PROTECTIVE", "ACTIVE"], img: "https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?auto=format&fit=crop&q=80&w=500" },
    { name: "Daisy", breed: "Labrador", age: "3 months", price: "₹12,000", loc: "Jersey City, NJ", tags: ["GOOD WITH KIDS"], img: "https://i.pinimg.com/564x/3a/3d/4b/3a3d4b04d70cc293fadf195b4e1a7bcb.jpg" }
  ];

  return (
    <div className="min-h-screen w-full bg-[#F8F9FE] font-sans overflow-x-hidden pt-0">
      
      {/* --- 1. HERO SECTION --- */}
      <section 
        className="relative min-h-[500px] md:min-h-[600px] w-full flex items-center px-4 py-12 md:px-10 md:py-20 lg:px-20 overflow-hidden"
        style={{ 
          backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.95) 20%, rgba(255, 255, 255, 0.4) 70%, transparent), url('https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&q=80&w=1600')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center right'
        }}
      >
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-200/30 rounded-full blur-[100px] z-0"></div>
        
        <div className="max-w-3xl z-10">
          <h2 className="text-indigo-600 text-xs sm:text-sm font-black mb-2 sm:mb-3 uppercase tracking-[0.2em] sm:tracking-[0.3em]">
            Find Your Perfect Pet
          </h2>
          
          <h1 className="text-3xl md:text-5xl lg:text-7xl font-black text-slate-900 mb-4 sm:mb-6 leading-[1.1]">
            Find Your New <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-indigo-400">
              Best Friend
            </span>
          </h1>

          <p className="text-slate-600 text-base md:text-xl mb-10 leading-relaxed max-w-xl font-medium">
            Discover healthy puppies and adult dogs from verified breeders. Expert care and transparent sourcing.
          </p>

          {/* Search bar - Improved Mobile Responsiveness */}
          <div className="flex flex-col md:flex-row items-center bg-white/80 backdrop-blur-xl rounded-[2rem] md:rounded-full shadow-2xl p-2 w-full max-w-3xl border border-white group">
            <div className="flex items-center flex-grow px-4 w-full">
              <Search className="text-indigo-500 w-5 h-5 mr-3" />
              <input 
                type="text" 
                placeholder="Search breeds..."
                className="w-full py-4 outline-none text-slate-800 placeholder-slate-400 bg-transparent text-base md:text-lg font-bold"
              />
            </div>
            <div className="flex gap-2 p-1 w-full md:w-auto">
              <button className="flex-1 md:flex-none bg-indigo-600 text-white px-8 py-4 rounded-[1.5rem] md:rounded-full font-black text-sm shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-95 whitespace-nowrap">
                FIND PETS
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* --- 2. TRUST SECTION --- */}
      <section className="py-12 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: <ShieldCheck size={28} />, title: "Health Certified", sub: "Vaccinated & Vet Checked", color: "bg-indigo-600", bg: "bg-indigo-50/50" },
              { icon: <Trophy size={28} />, title: "Pure Breeds", sub: "Pedigree Verified Dogs", color: "bg-amber-500", bg: "bg-amber-50/50" },
              { icon: <Heart size={28} />, title: "Lifetime Support", sub: "Post Adoption Advice", color: "bg-rose-500", bg: "bg-rose-50/50" }
            ].map((feature, i) => (
              <div key={i} className={`flex items-center gap-5 p-6 rounded-[2.5rem] ${feature.bg} transition-all hover:scale-[1.02]`}>
                <div className={`w-14 h-14 ${feature.color} rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg`}>
                  {feature.icon}
                </div>
                <div>
                  <h4 className="font-black text-slate-900 text-lg">{feature.title}</h4>
                  <p className="text-slate-500 text-sm font-medium">{feature.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- 3. LISTINGS SECTION --- */}
      <main className=" mx-auto px-4 md:px-10 py-16 md:py-24">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-2">Available Puppies</h2>
            <p className="text-slate-500 font-medium">Hand-picked healthy puppies for your home.</p>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 hover:shadow-xl transition-all">
            <SlidersHorizontal size={16} className="text-indigo-600" /> Filters
          </button>
        </div>

        {/* Card Grid - Mobile Responsive Images Fixed */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {nearbyDogs.map((dog, idx) => (
            <div key={idx} className="bg-white rounded-[3rem] overflow-hidden shadow-sm border border-slate-50 hover:shadow-2xl transition-all group cursor-pointer">
              {/* Responsive Image Container */}
              <div className="relative w-full aspect-[4/5] sm:aspect-[3/4] overflow-hidden">
                <img 
                  src={dog.img} 
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                  alt={dog.name} 
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md text-indigo-600 text-[10px] font-black px-4 py-2 rounded-full uppercase shadow-sm z-10">
                  Verified
                </div>
              </div>
              
              <div className="p-7">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-2xl font-bold text-slate-900">{dog.name}</h3>
                  <span className="text-indigo-600 font-black text-lg">{dog.price}</span>
                </div>
                <p className="text-slate-400 text-xs font-bold mb-5 uppercase tracking-widest">{dog.breed} • {dog.age}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {dog.tags.map(tag => (
                    <span key={tag} className="text-[9px] font-black text-indigo-500 bg-indigo-50 px-3 py-1.5 rounded-lg uppercase">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold pt-5 border-t border-slate-100">
                  <MapPin size={14} className="text-rose-500" /> {dog.loc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* --- 4. BROWSE BY LIFESTYLE --- */}
      <section className="bg-slate-900 py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-10 text-center">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4">Browse by Lifestyle</h2>
          <p className="text-slate-400 font-medium mb-16 max-w-xl mx-auto">Different homes need different dogs. Choose what fits yours.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              { title: "Apartment Friendly", count: "12 Breeds", color: "bg-blue-500" },
              { title: "Family Guard", count: "8 Breeds", color: "bg-indigo-500" },
              { title: "High Energy", count: "15 Breeds", color: "bg-rose-500" }
            ].map((cat, i) => (
              <div key={i} className="bg-white/5 border border-white/10 p-10 rounded-[3rem] hover:bg-white/10 transition-all cursor-pointer group">
                <div className={`w-12 h-1.5 rounded-full ${cat.color} mb-6 mx-auto group-hover:w-20 transition-all`}></div>
                <h3 className="text-2xl font-black text-white mb-2">{cat.title}</h3>
                <p className="text-slate-500 font-bold uppercase text-xs tracking-widest">{cat.count}</p>
                <ChevronRight className="text-white/20 mx-auto mt-8 group-hover:text-white group-hover:translate-x-2 transition-all" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- 5. CTA SECTION --- */}
      <section className="max-w-7xl mx-auto px-4 md:px-10 py-20 md:py-32">
        <div className="relative bg-white border border-indigo-100 rounded-[3rem] md:rounded-[5rem] p-8 md:p-20 overflow-hidden shadow-2xl">
          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12 md:gap-20">
            <div className="lg:w-1/2 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-black uppercase mb-6">
                <Sparkles size={14} /> New Owner Handbook
              </div>
              <h2 className="text-3xl md:text-6xl font-black text-slate-900 mb-8 leading-tight">
                First time <br className="hidden md:block" /> owning a dog?
              </h2>
              <p className="text-slate-500 text-base md:text-lg mb-10 leading-relaxed font-medium">
                Don't worry! Shiva Dog Clinic provides a complete starter kit and 1-month free health checkup for all new adoptions.
              </p>
              <button className="w-full md:w-auto flex items-center justify-center gap-4 bg-indigo-600 text-white px-10 py-5 rounded-2xl font-black hover:bg-indigo-700 transition-all">
                Contact Experts <ArrowRight size={20} />
              </button>
            </div>
            <div className="lg:w-1/2 w-full">
              {/* Responsive Image Container for CTA */}
              <div className="relative aspect-video lg:aspect-square w-full overflow-hidden rounded-[2.5rem] md:rounded-[4rem] shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=800" 
                  className="absolute inset-0 w-full h-full object-cover" 
                  alt="Support" 
                />
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default DogPage;