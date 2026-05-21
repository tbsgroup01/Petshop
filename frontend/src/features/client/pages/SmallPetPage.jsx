// import React from 'react';
// import { Search, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';

// const SmallPetPage = () => {
//   const quickFilters = ["Rabbits", "Hamsters", "Birds", "Guinea Pigs", "Beginner Friendly"];

//   const featuredPets = [
//     { name: "Snowy", breed: "Holland Lop", age: "3 Months", price: "Rs 1200", location: "San Francisco, CA", badge: "Verified", image: "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=500" },
//     { name: "Biscuit", breed: "Syrian Hamster", age: "2 Months", price: "Rs 4500", location: "Seattle, WA", badge: "Featured", image: "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=500" },
//     { name: "Bluey", breed: "Parakeet", age: "1 Year", price: "Rs 8005", location: "Austin, TX", image: "https://hips.hearstapps.com/hmg-prod/images/low-maintenance-pets-hamster-1643904852.jpg?crop=0.662xw:1.00xh;0.148xw,0" },
//     { name: "Mochi & Pop", breed: "Abyssinian Pair", age: "4 Months", price: "Rs 900", location: "Portland, OR", image: "https://theurbanzoo.ca/cdn/shop/articles/SMALL_ANIMAL_PIC.jpg?v=1693945682" }
//   ];

//   const marketplacePets = [
//     { name: "Pepper", breed: "Winter White Hamster", distance: "2.4 mi away", price: "Rs 350", tag: "Easy Care", image: "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=500" },
//     { name: "Shadow", breed: "Netherland Dwarf", distance: "5.1 mi away", price: "Rs 1500", tag: "Intermediate", image: "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=500" },
//     { name: "Lime", breed: "Budgerigar", age: "6 Months", distance: "1.2 mi away", price: "Rs 600", tag: "Easy Care", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFHsOW69evlTUwUe2uh3s47XndomC-_GHcGA&s" },
//     { name: "Caramel", breed: "Skinny Pig", age: "1 Year", distance: "0.8 mi away", price: "Rs 1100", tag: "Easy Care", image: "https://www.thesprucepets.com/thmb/lvFCtaJErJevCiuLWT0XMslp_2A=/3867x0/filters:no_upscale():strip_icc()/peach-faced-lovebird-couple-131959846-5b4c11d946e0fb0037d187b3.jpg" }
//   ];

//   return (
//     <div className="min-h-screen bg-[#F8F9FF] font-sans text-slate-900 overflow-x-hidden">
      
//       {/* 1. HERO SECTION - Enhanced Responsive Background */}
//       <section 
//         className="relative min-h-[500px] md:min-h-[600px] w-full flex items-center px-6 py-12 md:px-10 lg:px-20 overflow-hidden"
//         style={{ 
//           backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.95) 20%, rgba(255, 255, 255, 0.4) 80%, transparent), url('https://images.unsplash.com/photo-1520808663317-647b476a81b9?q=80&w=1600')`,
//           backgroundSize: 'cover',
//           backgroundPosition: 'center'
//         }}
//       >
//         <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-200/30 rounded-full blur-[100px] z-0"></div>
        
//         <div className="max-w-3xl z-10">
//           <h2 className="text-indigo-600 text-xs md:text-sm font-black mb-1 uppercase tracking-[0.3em]">
//             Find Your Perfect Pet
//           </h2>
          
//           <h1 className="text-4xl md:text-7xl font-black text-slate-900 mb-6 leading-[1.1]">
//             Explore Small <br/>
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-indigo-400">
//               Pets
//             </span>
//           </h1>

//           <p className="text-slate-600 text-base md:text-xl mb-10 leading-relaxed max-w-xl font-medium">
//             Find adorable small companions perfect for cozy homes. Healthy and happy pets from verified breeders.
//           </p>

//           {/* Search bar - Mobile Optimized */}
//           <div className="flex flex-col sm:flex-row items-center bg-white/80 backdrop-blur-xl rounded-[2rem] shadow-2xl p-2 w-full max-w-3xl border border-white/50 group">
//             <div className="flex items-center flex-grow px-4 w-full">
//               <Search className="text-indigo-500 w-5 h-5 mr-3" />
//               <input 
//                 type="text" 
//                 placeholder="Search breeds..."
//                 className="w-full py-4 outline-none text-slate-800 placeholder-slate-400 bg-transparent text-base md:text-lg font-medium"
//               />
//             </div>
//             <button className="w-full sm:w-auto bg-indigo-600 text-white px-8 py-4 rounded-2xl font-black text-sm shadow-lg hover:bg-indigo-700 transition-all active:scale-95 whitespace-nowrap">
//               SEARCH
//             </button>
//           </div>
//         </div>
//       </section>


//       {/* 2. FEATURED SMALL PETS - Responsive Grid Images */}
//       <section className="py-16 md:py-24 container mx-auto px-6 md:px-10 lg:px-20">
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
//           <div>
//             <p className="text-[10px] font-bold text-[#00796B] uppercase tracking-[0.2em] mb-2">PREMIUM SELECTION</p>
//             <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">Featured Small Pets</h2>
//           </div>
//           <div className="flex gap-3">
//             <button className="p-3 border border-slate-200 rounded-full hover:bg-white hover:shadow-md transition-all">
//               <ChevronLeft size={20} className="text-slate-600" />
//             </button>
//             <button className="p-3 border border-slate-200 rounded-full hover:bg-white hover:shadow-md transition-all">
//               <ChevronRight size={20} className="text-slate-600" />
//             </button>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
//           {featuredPets.map((pet, index) => (
//             <div key={index} className="group cursor-pointer">
//               {/* Aspect Ratio Container for Fixed Image Size */}
//               <div className="aspect-[4/5] relative rounded-[28px] overflow-hidden mb-6 shadow-sm">
//                 <img 
//                   src={pet.image} 
//                   alt={pet.name} 
//                   className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
//                 />
//                 {pet.badge && (
//                   <span className="absolute top-4 right-4 bg-[#00796B] text-white text-[10px] font-bold px-3 py-1.5 rounded-lg uppercase tracking-wider z-10">
//                     {pet.badge}
//                   </span>
//                 )}
//               </div>
//               <div className="flex justify-between items-start mb-2">
//                 <h3 className="text-xl md:text-[22px] font-bold text-slate-900">{pet.name}</h3>
//                 <span className="text-[#4F46E5] font-bold text-lg">{pet.price}</span>
//               </div>
//               <p className="text-slate-400 text-sm font-medium mb-4">{pet.breed} • {pet.age}</p>
//               <div className="flex items-center text-slate-400 text-xs font-semibold">
//                 <MapPin size={14} className="mr-1.5 text-rose-400" />
//                 {pet.location}
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* 3. MARKETPLACE SECTION - Responsive Cards */}
//       <section className="py-10 container mx-auto px-6 md:px-10 lg:px-20">
//         <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-12">Small Pets Marketplace</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-16">
//           {marketplacePets.map((pet, index) => (
//             <div key={index} className="bg-white rounded-[32px] p-5 shadow-sm hover:shadow-xl transition-all border border-slate-50 group">
//               {/* Marketplace Image Container */}
//               <div className="relative aspect-square rounded-2xl overflow-hidden mb-6">
//                 <img 
//                   src={pet.image} 
//                   alt={pet.name} 
//                   className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform" 
//                 />
//                 <span className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-md text-[#00796B] text-[9px] font-black px-3 py-1.5 rounded-lg uppercase shadow-sm">
//                   {pet.tag}
//                 </span>
//               </div>
//               <h3 className="text-lg font-bold text-slate-900 mb-1">{pet.name}</h3>
//               <p className="text-slate-400 text-xs font-medium mb-6">{pet.breed} {pet.age ? `• ${pet.age}` : ''}</p>
//               <div className="flex justify-between items-center pt-4 border-t border-slate-50">
//                 <span className="text-[#4F46E5] font-bold text-xl">{pet.price}</span>
//                 <span className="text-slate-300 text-[10px] font-bold uppercase">{pet.distance}</span>
//               </div>
//             </div>
//           ))}
//         </div>
//         <div className="flex justify-center">
//           <button className="w-full sm:w-auto px-14 py-4 border-2 border-[#4F46E5] text-[#4F46E5] font-bold rounded-2xl hover:bg-[#4F46E5] hover:text-white transition-all shadow-sm">
//             View All Marketplace Listings
//           </button>
//         </div>
//       </section>

//       {/* 4. HOW TO CARE SECTION */}
//       <section className="py-20 bg-white border-t border-slate-100 mt-20">
//         <div className="container mx-auto px-6 md:px-10 lg:px-20 text-center">
//           <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">How to care for small pets?</h2>
//           <p className="text-slate-500 text-base md:text-lg max-w-3xl mx-auto mb-16">
//             Essential knowledge for every new small pet parent, curated by our expert team.
//           </p>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {[
//               { title: "Feeding", desc: "Discover the perfect balance of hay, greens, and pellets.", icon: "https://cdn-icons-png.flaticon.com/512/3069/3069172.png", bg: "bg-indigo-50" },
//               { title: "Habitat", desc: "Create a safe, stimulating space with enough ventilation.", icon: "https://cdn-icons-png.flaticon.com/512/619/619153.png", bg: "bg-emerald-50" },
//               { title: "Adoption", desc: "Brush techniques and nail care tips for delicate companions.", icon: "https://cdn-icons-png.flaticon.com/512/3159/3159190.png", bg: "bg-slate-100" }
//             ].map((item, i) => (
//               <div key={i} className="bg-[#F8F9FF] rounded-[28px] p-8 md:p-10 text-left border border-slate-100 hover:shadow-lg transition-all group">
//                 <div className={`w-14 h-14 ${item.bg} rounded-xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
//                   <img src={item.icon} alt={item.title} className="w-7 h-7" />
//                 </div>
//                 <h3 className="text-2xl font-bold text-slate-900 mb-4">{item.title}</h3>
//                 <p className="text-slate-500 text-sm leading-relaxed mb-8">{item.desc}</p>
//                 <button className="text-[#4F46E5] font-bold flex items-center gap-2 text-sm">Learn more <ChevronRight size={16} /></button>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* 5. LIST YOUR PET CTA - Responsive Layout */}
//       <section className="container mx-auto px-6 md:px-10 lg:px-20 py-20">
//         <div className="bg-[#4F46E5] rounded-[2rem] md:rounded-[4rem] p-8 md:p-16 flex flex-col lg:row justify-between items-center text-white shadow-2xl relative overflow-hidden">
//           {/* Background Decorative Circle */}
//           <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
          
//           <div className="relative z-10 mb-8 lg:mb-0 text-center lg:text-left">
//             <h2 className="text-3xl md:text-5xl font-black mb-6">List Your Small Pet</h2>
//             <p className="text-indigo-100 text-base md:text-lg max-w-xl font-medium">
//               Rehoming your companion? Connect with verified, loving families within the Shiva Dog Clinic community.
//             </p>
//           </div>
//           <button className="relative z-10 w-full lg:w-auto bg-white text-[#4F46E5] px-12 py-5 rounded-2xl font-black text-lg hover:bg-slate-50 transition-all shadow-xl whitespace-nowrap active:scale-95">
//             Get Started
//           </button>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default SmallPetPage;


import React from "react";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  ChevronRightIcon,
  MapPin,
} from "lucide-react";

const SmallPetPage = () => {
  const quickFilters = [
    "Rabbits",
    "Hamsters",
    "Birds",
    "Guinea Pigs",
    "Beginner Friendly",
  ];

  const featuredPets = [
    {
      name: "Snowy",
      breed: "Holland Lop",
      age: "3 Months",
      price: "Rs 1200",
      location: "San Francisco, CA",
      badge: "Verified",
      image:
        "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=500",
    },
    {
      name: "Biscuit",
      breed: "Syrian Hamster",
      age: "2 Months",
      price: "Rs 4500",
      location: "Seattle, WA",
      badge: "Featured",
      image:
        "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=500",
    },
    {
      name: "Bluey",
      breed: "Parakeet",
      age: "1 Year",
      price: "Rs 8005",
      location: "Austin, TX",
      image:
        "https://hips.hearstapps.com/hmg-prod/images/low-maintenance-pets-hamster-1643904852.jpg?crop=0.662xw:1.00xh;0.148xw,0",
    },
    {
      name: "Mochi & Pop",
      breed: "Abyssinian Pair",
      age: "4 Months",
      price: "Rs 900",
      location: "Portland, OR",
      image:
        "https://theurbanzoo.ca/cdn/shop/articles/SMALL_ANIMAL_PIC.jpg?v=1693945682",
    },
  ];

  const marketplacePets = [
    {
      name: "Pepper",
      breed: "Winter White Hamster",
      distance: "2.4 mi away",
      price: "Rs 350",
      tag: "Easy Care",
      image:
        "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=500",
    },
    {
      name: "Shadow",
      breed: "Netherland Dwarf",
      distance: "5.1 mi away",
      price: "Rs 1500",
      tag: "Intermediate",
      image:
        "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=500",
    },
    {
      name: "Lime",
      breed: "Budgerigar",
      age: "6 Months",
      distance: "1.2 mi away",
      price: "Rs 600",
      tag: "Easy Care",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFHsOW69evlTUwUe2uh3s47XndomC-_GHcGA&s",
    },
    {
      name: "Caramel",
      breed: "Skinny Pig",
      age: "1 Year",
      distance: "0.8 mi away",
      price: "Rs 1100",
      tag: "Easy Care",
      image:
        "https://www.thesprucepets.com/thmb/lvFCtaJErJevCiuLWT0XMslp_2A=/3867x0/filters:no_upscale():strip_icc()/peach-faced-lovebird-couple-131959846-5b4c11d946e0fb0037d187b3.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FF] overflow-x-hidden font-sans text-slate-900">
      {/* HERO */}
      <section
        className="relative min-h-[560px] md:min-h-[650px] flex items-center overflow-hidden px-4 sm:px-6 md:px-10 lg:px-20 py-16"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.97) 10%, rgba(255,255,255,0.65) 55%, rgba(255,255,255,0.1) 100%), url('https://images.unsplash.com/photo-1520808663317-647b476a81b9?q=80&w=1600')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Blur Circle */}
        <div className="absolute -top-24 -left-24 w-80 h-80 bg-indigo-200/40 rounded-full blur-[120px]" />

        <div className="relative z-10 max-w-3xl w-full">
          <p className="text-[11px] sm:text-xs md:text-sm uppercase tracking-[0.3em] text-indigo-600 font-black mb-3">
            Find Your Perfect Pet
          </p>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black leading-[1.05] mb-6">
            Explore Small <br />
            <span className="bg-gradient-to-r from-indigo-600 to-indigo-400 bg-clip-text text-transparent">
              Pets
            </span>
          </h1>

          <p className="text-slate-600 text-sm sm:text-base md:text-xl leading-relaxed max-w-2xl mb-8 md:mb-10 font-medium">
            Find adorable small companions perfect for cozy homes. Healthy and
            happy pets from verified breeders.
          </p>

          {/* SEARCH */}
          <div className="bg-white/80 backdrop-blur-xl border border-white/50 rounded-[2rem] shadow-2xl p-3 flex flex-col lg:flex-row gap-3">
            <div className="flex items-center flex-1 px-2 sm:px-4">
              <Search className="text-indigo-500 w-5 h-5 mr-3" />

              <input
                type="text"
                placeholder="Search breeds..."
                className="w-full bg-transparent outline-none text-sm sm:text-base md:text-lg py-3 placeholder:text-slate-400"
              />
            </div>

            <button className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-indigo-600 text-white text-sm font-black hover:bg-indigo-700 transition-all">
              SEARCH
            </button>
          </div>

          {/* FILTERS */}
          <div className="flex flex-wrap gap-3 mt-6">
            {quickFilters.map((filter) => (
              <button
                key={filter}
                className="px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border border-white text-xs sm:text-sm font-bold text-slate-700 hover:bg-indigo-600 hover:text-white transition-all"
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-20">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#00796B] font-black mb-2">
              Premium Selection
            </p>

            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
              Featured Small Pets
            </h2>
          </div>

          <div className="flex gap-3">
            <button className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center hover:bg-white hover:shadow-md transition-all">
              <ChevronLeft size={20} />
            </button>

            <button className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center hover:bg-white hover:shadow-md transition-all">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8">
          {featuredPets.map((pet, index) => (
            <div key={index} className="group cursor-pointer">
              {/* IMAGE */}
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] mb-5 shadow-sm">
                <img
                  src={pet.image}
                  alt={pet.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />

                {pet.badge && (
                  <span className="absolute top-4 right-4 bg-[#00796B] text-white text-[10px] uppercase tracking-wide font-black px-3 py-1.5 rounded-lg">
                    {pet.badge}
                  </span>
                )}
              </div>

              {/* CONTENT */}
              <div className="flex justify-between items-start gap-4 mb-2">
                <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                  {pet.name}
                </h3>

                <span className="text-indigo-600 text-lg font-black whitespace-nowrap">
                  {pet.price}
                </span>
              </div>

              <p className="text-slate-400 text-sm font-medium mb-4">
                {pet.breed} • {pet.age}
              </p>

              <div className="flex items-center text-xs font-semibold text-slate-400">
                <MapPin size={14} className="mr-1.5 text-rose-400" />
                {pet.location}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MARKETPLACE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-20 py-8 md:py-14">
        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-12">
          Small Pets Marketplace
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-8 mb-16">
          {marketplacePets.map((pet, index) => (
            <div
              key={index}
              className="bg-white border border-slate-100 rounded-[2rem] p-5 hover:shadow-xl transition-all group"
            >
              {/* IMAGE */}
              <div className="relative aspect-square rounded-2xl overflow-hidden mb-6">
                <img
                  src={pet.image}
                  alt={pet.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                <span className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-md text-[#00796B] text-[10px] uppercase font-black px-3 py-1.5 rounded-lg">
                  {pet.tag}
                </span>
              </div>

              {/* CONTENT */}
              <h3 className="text-lg sm:text-xl font-black text-slate-900 mb-1">
                {pet.name}
              </h3>

              <p className="text-slate-400 text-xs sm:text-sm font-medium mb-6">
                {pet.breed} {pet.age ? `• ${pet.age}` : ""}
              </p>

              <div className="flex justify-between items-center pt-4 border-t border-slate-100 gap-3">
                <span className="text-indigo-600 text-xl font-black">
                  {pet.price}
                </span>

                <span className="text-slate-300 text-[10px] uppercase font-black whitespace-nowrap">
                  {pet.distance}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* BUTTON */}
        <div className="flex justify-center">
          <button className="w-full sm:w-auto px-10 sm:px-14 py-4 rounded-2xl border-2 border-indigo-600 text-indigo-600 font-bold hover:bg-indigo-600 hover:text-white transition-all">
            View All Marketplace Listings
          </button>
        </div>
      </section>

      {/* CARE SECTION */}
      <section className="py-20 bg-white border-t border-slate-100 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-20 text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4">
            How to care for small pets?
          </h2>

          <p className="text-slate-500 text-sm sm:text-base md:text-lg max-w-3xl mx-auto mb-16 leading-relaxed">
            Essential knowledge for every new small pet parent, curated by our
            expert team.
          </p>

          {/* CARE GRID */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Feeding",
                desc: "Discover the perfect balance of hay, greens, and pellets.",
                icon: "https://cdn-icons-png.flaticon.com/512/3069/3069172.png",
                bg: "bg-indigo-50",
              },
              {
                title: "Habitat",
                desc: "Create a safe, stimulating space with enough ventilation.",
                icon: "https://cdn-icons-png.flaticon.com/512/619/619153.png",
                bg: "bg-emerald-50",
              },
              {
                title: "Adoption",
                desc: "Brush techniques and nail care tips for delicate companions.",
                icon: "https://cdn-icons-png.flaticon.com/512/3159/3159190.png",
                bg: "bg-slate-100",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-[#F8F9FF] border border-slate-100 rounded-[2rem] p-8 md:p-10 text-left hover:shadow-lg transition-all group"
              >
                <div
                  className={`w-14 h-14 ${item.bg} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}
                >
                  <img
                    src={item.icon}
                    alt={item.title}
                    className="w-7 h-7"
                  />
                </div>

                <h3 className="text-2xl font-black text-slate-900 mb-4">
                  {item.title}
                </h3>

                <p className="text-slate-500 text-sm leading-relaxed mb-8">
                  {item.desc}
                </p>

                <button className="text-indigo-600 font-bold flex items-center gap-2 text-sm">
                  Learn More
                  <ChevronRightIcon size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-20 py-20">
        <div className="relative overflow-hidden rounded-[2.5rem] md:rounded-[4rem] bg-indigo-600 p-8 sm:p-10 md:p-16 flex flex-col lg:flex-row items-center justify-between gap-10 shadow-2xl">
          {/* Glow */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-[120px]" />

          {/* CONTENT */}
          <div className="relative z-10 text-center lg:text-left">
            <h2 className="text-3xl sm:text-5xl font-black text-white mb-6 leading-tight">
              List Your Small Pet
            </h2>

            <p className="text-indigo-100 text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed font-medium">
              Rehoming your companion? Connect with verified, loving families
              within the Shiva Dog Clinic community.
            </p>
          </div>

          {/* BUTTON */}
          <button className="relative z-10 w-full sm:w-auto whitespace-nowrap px-10 sm:px-12 py-5 rounded-2xl bg-white text-indigo-600 font-black text-lg hover:bg-slate-100 transition-all active:scale-95">
            Get Started
          </button>
        </div>
      </section>
    </div>
  );
};

export default SmallPetPage;