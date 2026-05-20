import React from 'react';
import { Users, Calendar, ShieldCheck, Search, Quote } from 'lucide-react';
// import Breadcrumbs from '../components/Breadcrumbs'; // Iski zaroorat nahi hai agar App.jsx me laga hai

const MatingServices = () => {
  const testimonials = [
    {
      name: "Sarah Jenkins",
      role: "COOPER'S MOM",
      text: "Cooper was so anxious around other dogs. The behavior-led social walks at Shiva Clinic helped him find his best friend, Bella.",
      img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200"
    },
    {
      name: "David Miller",
      role: "BREEDER",
      text: "The breeding matchmaking tool is incredible. We found a perfect match with full verified medical history.",
      img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200"
    },
    {
      name: "Emma Wilson",
      role: "PET PARENT",
      text: "Finding playmates for high-energy breeds is tough. This platform made it easy to find active play owners.",
      img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200"
    }
  ];

  return (
    <div className="min-h-screen bg-white font-sans overflow-x-hidden">

      {/* --- 1. HERO SECTION --- */}
      <section 
        className="relative min-h-[420px] sm:min-h-[520px] w-full flex items-center px-4 py-12 md:px-10 md:py-20 lg:px-20 overflow-hidden"
        style={{ 
          backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.9) 10%, rgba(255, 255, 255, 0.2) 60%, transparent), url('https://images.unsplash.com/photo-1544568100-847a948585b9?q=80&w=2000')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center right'
        }}
      >
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-200/30 rounded-full blur-[100px] z-0"></div>
        <div className="absolute inset-0 backdrop-blur-[2px] pointer-events-none z-0"></div>

        <div className="max-w-3xl z-10">
          
          {/* ❌ Breadcrumbs yahan se hata diya gaya hai taaki double na dikhe */}

          <h2 className="text-indigo-600 text-sm font-black mb-3 uppercase tracking-[0.3em]">
            Premium Service
          </h2>
          
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-6 leading-[1.1]">
            Mating <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-indigo-400">
              Services
            </span>
          </h1>

          <p className="text-slate-600 text-lg md:text-xl mb-10 leading-relaxed max-w-xl">
            Connect with verified breeders and find the perfect match for your pets. Safe, transparent, and expert-approved.
          </p>

          <div className="flex flex-wrap gap-4">
            <button className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold text-base hover:bg-indigo-700 transition-all active:scale-95">
              Find Matches
            </button>
            <button className="bg-white/70 backdrop-blur-md text-slate-700 px-8 py-4 rounded-2xl font-bold text-base border border-white/50 hover:bg-white/90 transition-all active:scale-95">
              Create Profile
            </button>
          </div>
        </div>
      </section>

      {/* --- 2. HOW IT WORKS --- */}
      <section className="py-24 bg-white text-center">
        <div className="container mx-auto px-6 md:px-10 lg:px-20">
          <h2 className="text-4xl font-black mb-20">How Matchmaking Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {[
              { title: "Create Profile", icon: <Users /> },
              { title: "Find Matches", icon: <Search /> },
              { title: "Connect Safely", icon: <ShieldCheck /> },
              { title: "Schedule Meetup", icon: <Calendar /> }
            ].map((step, idx) => (
              <div key={idx} className="flex flex-col items-center group">
                <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110">
                  {React.cloneElement(step.icon, { size: 30 })}
                </div>
                <h4 className="font-bold text-xl">{step.title}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- 3. TESTIMONIALS --- */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6 md:px-10 lg:px-20">
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white p-10 rounded-[32px] shadow-sm flex flex-col hover:shadow-xl transition-shadow">
                <Quote className="text-indigo-200 mb-6" size={40} />
                <p className="text-slate-600 italic mb-8 flex-grow">"{t.text}"</p>
                <div className="flex items-center gap-4 border-t border-slate-100 pt-6">
                  <img src={t.img} className="w-12 h-12 rounded-full object-cover" alt={t.name} />
                  <div>
                    <h4 className="font-bold text-slate-900">{t.name}</h4>
                    <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default MatingServices;