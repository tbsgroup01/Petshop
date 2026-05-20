import React from 'react';
import { Search, ArrowRight, CheckCircle2, Heart, ShieldCheck, Zap, MessageCircle, HelpCircle } from 'lucide-react';

const SmallBreedsPage = () => {
  const featuredBreeds = [
    {
      name: "Holland Lop Rabbit",
      image: "https://thumbs.dreamstime.com/b/close-up-funny-rabbit-showing-easter-bunny-sunglasses-431444675.jpg",
      badge: "Easy Care",
      tags: ["GENTLE", "SOCIAL"],
      lifespan: "7-10 yrs",
      careLevel: "Beginner"
    },
    {
      name: "Syrian Hamster",
      image: "https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=600",
      badge: "Budget Friendly",
      tags: ["ACTIVE", "QUIET"],
      lifespan: "2-3 yrs",
      careLevel: "Very Easy"
    },
    {
      name: "Guinea Pig",
      image: "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=600",
      badge: "High Social",
      tags: ["VOCAL", "AFFECTIONATE"],
      lifespan: "4-8 yrs",
      careLevel: "Moderate"
    },
    {
      name: "Budgie",
      image: "https://www.animalfunfacts.net/images/stories/pets/birds/budgies_l.jpg"  ,
      badge: "Intelligence",
      tags: ["SMART", "PLAYFUL"],
      lifespan: "5-10 yrs",
      careLevel: "Moderate"
    }
  ];

  return (
    <div className="bg-[#F8FAFC] min-h-screen font-sans">
      
      {/* --- HERO SECTION --- */}
      <section className="py-16 px-6 md:px-10 lg:px-20 container mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12 bg-white rounded-[48px] p-8 md:p-16 shadow-sm border border-slate-100">
          <div className="lg:w-1/2 space-y-8">
            <h1 className="text-5xl font-extrabold text-slate-900 leading-tight">
              Explore Small Pet Breeds
            </h1>
            <p className="text-xl text-slate-500 leading-relaxed">
              Perfect companions for cozy homes and beginner pet owners. Discover the joy of bonding with our smallest friends.
            </p>
            
            <div className="flex flex-wrap gap-3">
              {['Beginner Friendly', 'Indoor', 'Low Maintenance', 'Small Size'].map((tag) => (
                <span key={tag} className={`px-4 py-2 rounded-full border text-sm font-semibold ${tag === 'Beginner Friendly' ? 'bg-indigo-50 border-indigo-200 text-indigo-600' : 'bg-white border-slate-200 text-slate-500'}`}>
                  {tag}
                </span>
              ))}
            </div>

            <div className="relative max-w-md">
              <input 
                type="text" 
                placeholder="What pet are you looking for?" 
                className="w-full pl-6 pr-14 py-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm transition-all"
              />
              <button className="absolute right-2 top-2 p-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700">
                <Search size={20} />
              </button>
            </div>
          </div>
          <div className="lg:w-1/2">
            <img 
              src="https://static.vecteezy.com/system/resources/thumbnails/053/481/679/small/stylish-bunny-with-sunglasses-against-vibrant-orange-background-summer-vibes-photo.jpg" 
              alt="Small Pets Hero" 
              className="rounded-[40px] w-full h-[320px] sm:h-[380px] md:h-[450px] object-cover shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* --- FEATURED BREEDS GRID --- */}
      <section className="py-16 px-6 md:px-10 lg:px-20 container mx-auto">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Featured Small Breeds</h2>
            <p className="text-slate-500">Carefully selected for their temperament and adaptability.</p>
          </div>
          <button className="flex items-center gap-2 text-indigo-600 font-bold hover:translate-x-1 transition-transform">
            View All Breeds <ArrowRight size={20} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredBreeds.map((breed, idx) => (
            <div key={idx} className="bg-white border border-slate-100 rounded-[32px] p-4 shadow-sm hover:shadow-md transition-all group">
              <div className="relative h-48 mb-6 rounded-[24px] overflow-hidden">
                <img src={breed.image} alt={breed.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <span className="absolute top-3 right-3 bg-[#065F46] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                  {breed.badge}
                </span>
              </div>
              <div className="px-2">
                <h3 className="text-xl font-bold text-slate-900 mb-2">{breed.name}</h3>
                <div className="flex gap-2 mb-6">
                  {breed.tags.map(tag => (
                    <span key={tag} className="bg-indigo-50 text-indigo-600 text-[10px] font-extrabold px-2 py-1 rounded-md">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Lifespan:</span>
                    <span className="font-bold text-slate-900">{breed.lifespan}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Care Level:</span>
                    <span className="font-bold text-slate-900">{breed.careLevel}</span>
                  </div>
                </div>
                <button className="w-full py-3 border-2 border-indigo-100 text-indigo-600 font-bold rounded-xl hover:bg-indigo-50 transition-colors">
                  View Breed
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- NEW SECTION 1: WHY CHOOSE SMALL PETS? --- */}
      <section className="py-12 bg-indigo-600 text-white mt-16 overflow-hidden relative">
        <div className="container mx-auto px-6 md:px-10 lg:px-20 relative z-20">
          <div className="text-center mb-6">
            <h2 className="text-4xl font-extrabold mb-4">Why A Small Pet?</h2>
            <p className="text-indigo-200 max-w-2xl mx-auto">Big love comes in tiny packages. Here is why small breeds might be the perfect fit for your lifestyle.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="p-8 bg-indigo-800/50 rounded-[32px] border border-indigo-700/50 hover:bg-indigo-800 transition-colors">
              <div className="bg-indigo-500 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-indigo-500/30">
                <ShieldCheck className="text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Apartment Friendly</h3>
              <p className="text-indigo-200 leading-relaxed">Perfect for urban living. They require less square footage but offer 100% of the companionship.</p>
            </div>
            <div className="p-8 bg-indigo-800/50 rounded-[32px] border border-indigo-700/50 hover:bg-indigo-800 transition-colors">
              <div className="bg-emerald-500 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/30">
                <Zap className="text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Lower Daily Costs</h3>
              <p className="text-indigo-200 leading-relaxed">Generally more affordable in terms of high-quality nutrition, toys, and grooming needs compared to larger animals.</p>
            </div>
            <div className="p-8 bg-indigo-800/50 rounded-[32px] border border-indigo-700/50 hover:bg-indigo-800 transition-colors">
              <div className="bg-pink-500 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-pink-500/30">
                <Heart className="text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Easier Bonding</h3>
              <p className="text-indigo-200 leading-relaxed">Many small breeds are highly intelligent and form deep, unique emotional bonds with their owners very quickly.</p>
            </div>
          </div>
        </div>
        {/* Decorative Circle */}
        <div className="absolute top-[-100px] right-[-100px] w-80 h-80 bg-indigo-600/20 rounded-full blur-3xl"></div>
      </section>

      {/* --- NEW SECTION 2: HEALTH & CARE TIPS --- */}
      <section className="py-20 container mx-auto px-6 md:px-10 lg:px-20">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <div className="md:w-1/2">
            <div className="relative">
              <img 
                 src="https://w0.peakpx.com/wallpaper/459/26/HD-wallpaper-rabbit-rabit-grass-flower-bunny-easter-sweet.jpg" 
                alt="Health care" 
                className="rounded-[48px] shadow-xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-[24px] shadow-2xl border border-slate-100 hidden md:block">
                <div className="flex items-center gap-4">
                  <div className="bg-emerald-100 p-3 rounded-full text-emerald-600">
                    <CheckCircle2 size={24} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Expert Status</p>
                    <p className="font-bold text-slate-900">Vet Approved Guides</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 space-y-8">
            <h2 className="text-4xl font-extrabold text-slate-900">Essential Care for Your Small Friend</h2>
            <p className="text-slate-500 text-lg">Proper care ensures your pet lives a long, happy, and healthy life. Here are the core pillars of small pet wellness.</p>
            
            <ul className="space-y-4">
              {[
                { title: "Balanced Nutrition", desc: "Fresh greens and species-specific pellets." },
                { title: "Hydration Focus", desc: "Clean, fresh water access 24/7 is vital." },
                { title: "Dental Health", desc: "Many small pets need hay to wear down teeth." },
                { title: "Social Interaction", desc: "Regular playtime outside their habitat." }
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4 p-4 rounded-2xl hover:bg-white hover:shadow-sm transition-all">
                  <div className="mt-1 bg-indigo-50 text-indigo-600 p-1 rounded-full">
                    <CheckCircle2 size={18} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">{item.title}</h4>
                    <p className="text-slate-500 text-sm">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* --- NEW SECTION 3: COMMUNITY & FAQ --- */}
      <section className="py-20 bg-slate-100/50">
        <div className="container mx-auto px-6 md:px-10 lg:px-20 text-center max-w-4xl">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-4 tracking-tight">Got Questions?</h2>
          <p className="text-slate-500 mb-12">New to small pets? We're here to help you make the right choice.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            {[
              { q: "Are small pets good for kids?", a: "Yes, but they require adult supervision as they are delicate." },
              { q: "Do they smell?", a: "With regular cage cleaning and proper bedding, odor is minimal." },
              { q: "How much exercise do they need?", a: "Most need at least 1-2 hours of 'out-of-cage' time daily." },
              { q: "Can they be litter trained?", a: "Rabbits and some ferrets can be easily litter trained!" }
            ].map((faq, i) => (
              <div key={i} className="bg-white p-6 rounded-3xl border border-slate-200/60 shadow-sm">
                <div className="flex gap-4">
                  <HelpCircle className="text-indigo-500 flex-shrink-0" size={24} />
                  <div>
                    <h4 className="font-bold text-slate-900 mb-2">{faq.q}</h4>
                    <p className="text-slate-500 text-sm">{faq.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-white p-10 rounded-[40px] shadow-lg border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-left">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Join Our Community</h3>
              <p className="text-slate-500">Connect with over 5,000+ small pet owners in India.</p>
            </div>
            <button className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-bold flex items-center gap-3 hover:bg-slate-800 transition-all">
              <MessageCircle size={20} />
              Join WhatsApp Group
            </button>
          </div>
        </div>
      </section>

      {/* --- FOOTER CTA --- */}
      <section className="py-20 text-center">
        <h2 className="text-4xl font-extrabold text-slate-900 mb-8">Ready to meet your tiny companion?</h2>
        <button className="bg-indigo-600 text-white px-12 py-5 rounded-3xl font-extrabold text-lg shadow-xl shadow-indigo-200 hover:scale-105 transition-transform active:scale-95">
          Find a Breeder Near Me
        </button>
      </section>

    </div>
  );
};

export default SmallBreedsPage;