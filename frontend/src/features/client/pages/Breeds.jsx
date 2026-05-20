
import React from "react";
import { Search, Heart, Info, ArrowRight } from "lucide-react";

const Breeds = () => {
  const breedCards = [
    {
      name: "Golden Retriever",
      tags: ["FRIENDLY", "SMART"],
      energy: "High",
      life: "10-12 yrs",
      img: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=400",
    },
    {
      name: "German Shepherd",
      tags: ["LOYAL", "GUARD"],
      energy: "V. High",
      life: "7-10 yrs",
      img: "https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=400",
    },
    {
      name: "Labrador",
      tags: ["PLAYFUL", "GENTLE"],
      energy: "High",
      life: "10-12 yrs",
      img: "https://images.unsplash.com/photo-1591769225440-811ad7d6eca3?w=400",
    },
    {
      name: "Husky",
      tags: ["VOCAL", "ACTIVE"],
      energy: "Extreme",
      life: "12-15 yrs",
      img: "https://images.unsplash.com/photo-1531353826977-0941b4779a1c?w=400",
    },
    {
      name: "Beagle",
      tags: ["FRIENDLY", "SCENTS"],
      energy: "Medium",
      life: "12-15 yrs",
      img: "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=400",
    },
  ];

  return (
    <div className="min-h-screen bg-white font-sans overflow-x-hidden">
      
      {/* --- 1. HERO SECTION --- */}
      <section 
        className="relative min-h-[420px] sm:min-h-[520px] w-full flex items-center px-4 py-12 md:px-10 md:py-20 lg:px-20 overflow-hidden"
        style={{ 
          backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.9) 10%, rgba(255, 255, 255, 0.2) 60%, transparent), url('https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=2000')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center right'
        }}
      >
        <div className="max-w-3xl z-10">
          <h2 className="text-indigo-600 text-sm font-black mb-3 py-3 uppercase tracking-[0.3em]">
            Find Your Perfect Breed
          </h2>
          
          <h1 className="text-4xl md:text-7xl font-black text-slate-900 mb-6 leading-tight">
            Explore <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-indigo-400">
              Dog Breeds
            </span>
          </h1>

          <p className="text-slate-600 text-lg md:text-xl mb-10 leading-relaxed max-w-xl">
            Discover personalities, care needs, and the perfect breed for your lifestyle with our expert-curated database.
          </p>

          {/* Search bar - Fixed & Visible */}
          <div className="flex flex-col sm:flex-row items-center bg-white/70 backdrop-blur-xl rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] p-2 w-full max-w-3xl border border-white/50 group transition-all">
            <div className="flex items-center flex-grow px-4 w-full">
              <Search className="text-indigo-500 w-6 h-6 mr-3" />
              <input 
                type="text" 
                placeholder="Search breeds..."
                className="w-full py-4 outline-none text-slate-800 placeholder-slate-400 bg-transparent text-lg font-medium"
              />
            </div>
            
            <div className="flex space-x-2 p-2 w-full sm:w-auto">
              {['All', 'Puppies'].map((tag) => (
                <button key={tag} className="flex-1 sm:flex-none bg-white/50 backdrop-blur-md text-slate-700 px-4 py-2 rounded-xl text-sm font-bold border border-white hover:bg-indigo-600 hover:text-white transition-all">
                  {tag}
                </button>
              ))}
              <button className="bg-indigo-600 text-white px-6 py-2 rounded-xl font-black text-sm shadow-lg hover:bg-indigo-700">
                SEARCH
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* --- 2. BROWSE BY CATEGORY BENTO GRID --- */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 md:px-10 lg:px-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-12">
            Browse by Category
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto">
            {/* Family Dogs */}
            <div className="md:col-span-7 relative h-[350px] md:h-[600px] group overflow-hidden rounded-[40px] shadow-lg">
              <img src="https://images.unsplash.com/photo-1593134257782-e89567b7718a?w=1000" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Family" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-8 md:p-12">
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">Family Dogs</h3>
                <p className="text-slate-200 text-lg opacity-90 max-w-md">Gentle giants and patient companions.</p>
              </div>
            </div>

            {/* Side Column */}
            <div className="md:col-span-5 flex flex-col gap-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-6">
                <div className="relative h-[250px] md:h-[285px] group overflow-hidden rounded-[32px] cursor-pointer shadow-md">
                  <img src="https://images.unsplash.com/photo-1534361960057-19889db9621e?w=500" className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" alt="Active" />
                  <div className="absolute inset-0 bg-black/40 flex items-end p-8">
                    <h3 className="text-xl font-bold text-white">Active Dogs</h3>
                  </div>
                </div>
                <div className="relative h-[250px] md:h-[285px] group overflow-hidden rounded-[32px] cursor-pointer shadow-md">
                  <img src="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=500" className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" alt="Apartment" />
                  <div className="absolute inset-0 bg-black/40 flex items-end p-8">
                    <h3 className="text-xl font-bold text-white">Apartment Dogs</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- 3. BREED COMPARISON TABLE --- */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-6 md:px-10 lg:px-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Breed Comparison</h2>
            <p className="text-slate-500 text-lg">Compare key traits across top breeds.</p>
          </div>

          <div className="bg-white rounded-[32px] overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px] text-left border-collapse">
                <thead>
                  <tr className="bg-indigo-50/50">
                    <th className="p-8 text-slate-900 font-bold text-xl">Traits</th>
                    {['Golden Retriever', 'German Shepherd', 'Husky'].map((breed) => (
                      <th key={breed} className="p-8 text-center font-bold text-slate-900">{breed}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="p-8 font-medium text-slate-600">Grooming Needs</td>
                    <td className="p-8 text-center text-indigo-600">★★★</td>
                    <td className="p-8 text-center text-indigo-600">★★</td>
                    <td className="p-8 text-center text-indigo-600">★★★★</td>
                  </tr>
                  <tr>
                    <td className="p-8 font-medium text-slate-600">Intelligence</td>
                    <td className="p-8 text-center"><span className="bg-emerald-100 text-emerald-600 px-4 py-1 rounded-full font-bold text-sm">V. High</span></td>
                    <td className="p-8 text-center"><span className="bg-emerald-100 text-emerald-600 px-4 py-1 rounded-full font-bold text-sm">Excellent</span></td>
                    <td className="p-8 text-center"><span className="bg-emerald-100 text-emerald-600 px-4 py-1 rounded-full font-bold text-sm">High</span></td>
                  </tr>
                  <tr>
                    <td className="p-8 font-medium text-slate-600">Activity Level</td>
                    <td className="p-8 text-center font-bold text-slate-900">Moderate</td>
                    <td className="p-8 text-center font-bold text-slate-900">High</td>
                    <td className="p-8 text-center font-bold text-slate-900">V. High</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* --- 4. CTA BANNER --- */}
      <section className="py-12">
        <div className="container mx-auto px-6 lg:px-20">
          <div className="bg-indigo-600 rounded-[40px] p-10 md:p-16 flex flex-col lg:flex-row items-center justify-between gap-10 text-center lg:text-left">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Find Your Ideal Breed</h2>
              <p className="text-indigo-100 text-lg opacity-90">Take our quiz or book a consultation with our vets.</p>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="px-10 py-4 bg-white text-indigo-600 font-bold rounded-2xl hover:scale-105 transition-all">Take Quiz</button>
              <button className="px-10 py-4 border-2 border-white/30 text-white font-bold rounded-2xl hover:bg-white/10 transition-all">Consult Vet</button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Breeds;
