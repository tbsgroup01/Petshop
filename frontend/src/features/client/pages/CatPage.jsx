// import React from "react";
// import {
//   ArrowRight,
//   ChevronRight,
//   MapPin,
//   SlidersHorizontal,
//   Search,
//   CheckCircle,
// } from "lucide-react";

// // --- SUB-COMPONENT: CatHero (Isi file mein ya alag se use karein) ---
// const CatHero = () => {
//   return (
//     <section
//       className="relative min-h-[420px] md:min-h-[520px] w-full flex items-center px-4 py-12 md:px-10 md:py-20 lg:px-20 overflow-hidden"
//       style={{
//         backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.9) 10%, rgba(255, 255, 255, 0.2) 60%, transparent), url('https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=1600')`,
//         backgroundSize: "cover",
//         backgroundPosition: "center right",
//       }}
//     >
//       {/* Blur layers */}
//       <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-200/30 rounded-full blur-[100px] z-0"></div>
//       <div className="absolute inset-0 backdrop-blur-[2px] pointer-events-none z-0"></div>

// <div className="max-w-3xl z-10">
//           <h2 className="text-indigo-600 text-xs md:text-sm font-black mb-1  uppercase tracking-[0.3em] ">
//             Find Your Perfect Pet
//           </h2>

// <h1 className="text-4xl md:text-7xl font-black text-slate-900 mb-6 leading-[1.1]">
//             Find your Cat <br/>
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-indigo-400">
//               Pets
//             </span>
//           </h1>

//           <p className="text-slate-600 text-base md:text-xl mb-10 leading-relaxed max-w-xl font-medium">
//             Find adorable cat companions perfect for cozy homes. Healthy and happy pets from verified breeders.
//           </p>
        

//         {/* Search bar */}
//         <div className="flex flex-col sm:flex-row items-center bg-white/70 backdrop-blur-xl rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] p-2 w-full max-w-3xl border border-white/50 group transition-all hover:bg-white/80">
//           <div className="flex items-center flex-grow px-4 w-full">
//             <Search className="text-indigo-500 w-6 h-6 mr-3" />
//             <input
//               type="text"
//               placeholder="Search breeds or locations..."
//               className="w-full py-4 outline-none text-slate-800 placeholder-slate-400 bg-transparent text-lg font-medium"
//             />
//           </div>

//           {/* Filter Tags with Glass Effect */}
//           <div className="flex space-x-2 p-2 w-full sm:w-auto">
//             {["Dogs", "Cats"].map((tag) => (
//               <button
//                 key={tag}
//                 className="flex-1 sm:flex-none bg-white/50 backdrop-blur-md text-slate-700 px-6 py-3 rounded-2xl text-sm font-bold border border-white shadow-sm hover:bg-indigo-600 hover:text-white hover:shadow-indigo-200 transition-all duration-300"
//               >
//                 {tag}
//               </button>
//             ))}
//             <button className="bg-indigo-600 text-white px-8 py-3 rounded-2xl font-black text-sm shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all active:scale-95">
//               SEARCH
//             </button>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// // --- MAIN PAGE COMPONENT ---
// const CatPage = () => {
//   const nearbyCats = [
//     {
//       name: "Oliver",
//       breed: "Scottish Fold",
//       age: "3 months",
//       price: "Rs 1,100",
//       loc: "Manhattan, NY",
//       tags: ["PLAYFUL", "KIDS"],
//       img: "https://thumbs.dreamstime.com/b/maine-coon-cat-inside-pet-bed-tabby-maine-coon-cat-inside-jute-bag-pet-bed-peeking-out-looking-camera-curiously-brown-430637252.jpg?w=500",
//     },
//     {
//       name: "Luna",
//       breed: "Domestic Shorthair",
//       age: "1 year",
//       price: "Rs 4500",
//       loc: "Brooklyn, NY",
//       tags: ["QUIET", "INDOOR"],
//       img: "https://www.rover.com/blog/wp-content/uploads/white-cat-min-960x540.jpg?w=500",
//     },
//     {
//       name: "Simba",
//       breed: "Ragdoll",
//       age: "2 years",
//       price: "Rs 1,800",
//       loc: "Queens, NY",
//       tags: ["LAP CAT", "DOCILE"],
//       img: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=500",
//     },
//     {
//       name: "Coco",
//       breed: "Bengal",
//       age: "6 months",
//       price: "Rs 2,200",
//       loc: "Jersey City, NJ",
//       tags: ["ACTIVE", "CURIOUS"],
//       img: "https://hips.hearstapps.com/hmg-prod/images/somali-cat-portrait-royalty-free-image-1718219279.jpg?w=500",
//     },
//   ];

//   const careArticles = [
//     {
//       title: "Grooming Guide",
//       desc: "Master the art of brushing and coat maintenance for long-haired breeds.",
//       img: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=500",
//     },
//     {
//       title: "Optimal Nutrition",
//       desc: "Understanding specific dietary needs of cats at different life stages.",
//       img: "https://www.kwikpets.com/cdn/shop/articles/Why_Is_Nutri-Vet_Dog_Food_Better_Than_Other_Dog_Food_Brands.webp?v=1775214198&width=1100?w=500",
//     },
//     {
//       title: "Indoor Enrichment",
//       desc: "Creative ways to keep your indoor cat mentally stimulated.",
//       img: "https://images.unsplash.com/photo-1545249390-6bdfa286032f?w=500",
//     },
//   ];

//   return (
//     <div className="min-h-screen w-full flex flex-col font-sans bg-[#F8FAFC] overflow-x-hidden">
//       {/* 1. Hero Section */}
//       <CatHero />

//       <main className="flex-grow">
//         {/* 2. Featured Breeds Section */}
//         <div className="max-w-7xl mx-auto px-6 md:px-10 mb-24 mt-20">
//           <div className="flex justify-between items-end mb-10">
//             <div>
//               <span className="text-[10px] font-black text-indigo-600 tracking-[0.3em] uppercase">
//                 Premium Selection
//               </span>
//               <h2 className="text-4xl font-black text-slate-900 mt-2">
//                 Featured Breeds
//               </h2>
//             </div>
//             <button className="flex items-center gap-1 text-indigo-600 font-bold text-sm group">
//               View All{" "}
//               <ChevronRight
//                 size={18}
//                 className="group-hover:translate-x-1 transition-transform"
//               />
//             </button>
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//             <div className="lg:col-span-2 bg-white rounded-[3rem] overflow-hidden flex flex-col md:flex-row shadow-sm border border-slate-100 hover:shadow-2xl transition-all duration-500 group">
//               <div className="p-12 flex flex-col justify-between w-full md:w-1/2">
//                 <div>
//                   <div className="flex items-center gap-2 text-emerald-600 font-bold text-[10px] uppercase tracking-widest mb-6">
//                     <CheckCircle size={14} /> Vet Verified
//                   </div>
//                   <h3 className="text-4xl font-black text-slate-900 mb-4">
//                     The Persian
//                   </h3>
//                   <p className="text-slate-500 leading-relaxed mb-8">
//                     Sweet, gentle personalities with luxurious long coats.
//                   </p>
//                 </div>
//                 <div className="space-y-6">
//                   <div className="flex gap-10">
//                     <div>
//                       <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">
//                         Price Range
//                       </p>
//                       <p className="text-xl font-black text-indigo-600">
//                         Rs 12k - 25k
//                       </p>
//                     </div>
//                     <div>
//                       <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">
//                         Origin
//                       </p>
//                       <p className="text-xl font-black text-slate-800">Iran</p>
//                     </div>
//                   </div>
//                   <button className="w-full py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-indigo-600 transition-all shadow-xl active:scale-95">
//                     Explore Listings
//                   </button>
//                 </div>
//               </div>
//               <div className="w-full md:w-1/2 min-h-[350px] overflow-hidden">
//                 <img
//                   src="https://moderncat.com/wp-content/uploads/2013/10/Himalayan_AdobeStock_533934217_Ali-Shami-Wirestock-Creators-940x640.jpg"
//                   className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
//                   alt="Persian"
//                 />
//               </div>
//             </div>

//             <div className="bg-white rounded-[3rem] overflow-hidden shadow-sm border border-slate-100 flex flex-col hover:shadow-2xl transition-all duration-500 group">
//               <div className="h-56 overflow-hidden">
//                 <img
//                   src="https://cdn.shopify.com/s/files/1/0086/0795/7054/files/Bengal_Cat.jpg?v=1722406738"
//                   className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
//                   alt="Siamese"
//                 />
//               </div>
//               <div className="p-8 flex-1 flex flex-col justify-between">
//                 <div>
//                   <h3 className="text-2xl font-black text-slate-900 mb-2">
//                     Siamese
//                   </h3>
//                   <p className="text-slate-500 text-sm">
//                     Social, vocal, and deeply affectionate companions.
//                   </p>
//                 </div>
//                 <div className="flex justify-between items-center mt-8 pt-6 border-t border-slate-50">
//                   <span className="text-indigo-600 font-black">
//                     From Rs 8,000
//                   </span>
//                   <span className="bg-indigo-50 text-indigo-600 text-[9px] font-black px-3 py-1 rounded-full">
//                     TOP RATED
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* 3. Available Near You (With Glass Effect) */}
//         <div className="bg-slate-50 py-24">
//           <div className="max-w-7xl mx-auto px-6 md:px-10">
//             <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
//               <h2 className="text-4xl font-black text-slate-900">
//                 Available Near You
//               </h2>
//               <button className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-600 hover:shadow-lg transition-all">
//                 <SlidersHorizontal size={18} /> Filter Results
//               </button>
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
//               {nearbyCats.map((cat, idx) => (
//                 <div
//                   key={idx}
//                   className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-white hover:shadow-2xl transition-all duration-500 group"
//                 >
//                   <div className="h-72 relative overflow-hidden">
//                     <img
//                       src={cat.img}
//                       className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
//                       alt={cat.name}
//                     />
//                     {idx === 0 && (
//                       <div className="absolute top-5 left-5 bg-indigo-600 text-white text-[9px] font-black px-4 py-1.5 rounded-full shadow-lg">
//                         NEW ARRIVAL
//                       </div>
//                     )}
//                   </div>
//                   <div className="p-8">
//                     <div className="flex justify-between items-start mb-2">
//                       <h3 className="text-2xl font-black text-slate-900">
//                         {cat.name}
//                       </h3>
//                       <span className="text-indigo-600 font-black text-lg">
//                         {cat.price}
//                       </span>
//                     </div>
//                     <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-6">
//                       {cat.breed} • {cat.age}
//                     </p>
//                     <div className="flex flex-wrap gap-2 mb-8">
//                       {cat.tags.map((tag) => (
//                         <span
//                           key={tag}
//                           className="text-[9px] font-black text-indigo-500 bg-indigo-50 px-3 py-1.5 rounded-lg uppercase"
//                         >
//                           {tag}
//                         </span>
//                       ))}
//                     </div>
//                     <div className="flex items-center gap-2 text-slate-400 text-xs font-bold pt-6 border-t border-slate-50">
//                       <MapPin size={16} className="text-indigo-400" /> {cat.loc}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* 4. CTA Section with Heavy Blur Background */}
//         <div className="max-w-7xl mx-auto px-6 md:px-10 py-24">
//           <div className="relative rounded-[4rem] bg-slate-900 p-12 md:p-24 overflow-hidden text-center shadow-2xl shadow-indigo-200">
//             {/* Decorative Blurs */}
//             <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/30 rounded-full blur-[120px]"></div>
//             <div className="absolute bottom-0 left-0 w-72 h-72 bg-emerald-600/20 rounded-full blur-[100px]"></div>

//             <div className="relative z-10">
//               <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tight">
//                 Find Your Feline <br /> Soulmate Today
//               </h2>
//               <div className="flex flex-col sm:flex-row gap-6 justify-center">
//                 <button className="px-12 py-5 bg-indigo-600 text-white font-black rounded-2xl hover:bg-indigo-700 transition-all shadow-xl active:scale-95">
//                   START SEARCH
//                 </button>
//                 <button className="px-12 py-5 bg-white/10 backdrop-blur-xl text-white font-black rounded-2xl border border-white/20 hover:bg-white/20 transition-all active:scale-95">
//                   CONTACT VET
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default CatPage;


import React from "react";
import {
  ChevronRight,
  MapPin,
  SlidersHorizontal,
  Search,
  CheckCircle,
} from "lucide-react";

// ---------------- HERO ----------------
const CatHero = () => {
  return (
    <section
      className="relative min-h-[520px] md:min-h-[620px] w-full flex items-center overflow-hidden px-4 py-16 sm:px-6 md:px-10 lg:px-20"
      style={{
        backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.95) 5%, rgba(255,255,255,0.65) 45%, rgba(255,255,255,0.1) 100%), url('https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=1600')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Blur Effects */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-indigo-200/40 rounded-full blur-[90px]" />
      <div className="absolute inset-0 backdrop-blur-[1px]" />

      <div className="relative z-10 max-w-3xl w-full">
        <h2 className="text-indigo-600 text-[11px] sm:text-xs md:text-sm font-black uppercase tracking-[0.25em] mb-3">
          Find Your Perfect Pet
        </h2>

        <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-slate-900 leading-[1.05] mb-6">
          Find your Cat <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-indigo-400">
            Pets
          </span>
        </h1>

        <p className="text-slate-600 text-sm sm:text-base md:text-xl leading-relaxed max-w-xl font-medium mb-8 md:mb-10">
          Find adorable cat companions perfect for cozy homes. Healthy and
          happy pets from verified breeders.
        </p>

        {/* Search Box */}
        <div className="bg-white/70 backdrop-blur-xl border border-white/50 rounded-3xl shadow-xl p-3 flex flex-col lg:flex-row gap-3 lg:items-center">
          {/* Input */}
          <div className="flex items-center flex-1 px-2 sm:px-4">
            <Search className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-500 mr-3" />
            <input
              type="text"
              placeholder="Search breeds or locations..."
              className="w-full bg-transparent outline-none py-3 text-sm sm:text-base md:text-lg placeholder:text-slate-400"
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap sm:flex-nowrap gap-2 w-full lg:w-auto">
            {["Dogs", "Cats"].map((tag) => (
              <button
                key={tag}
                className="flex-1 lg:flex-none px-5 py-3 rounded-2xl bg-white/60 border border-white text-slate-700 text-sm font-bold hover:bg-indigo-600 hover:text-white transition-all"
              >
                {tag}
              </button>
            ))}

            <button className="w-full sm:w-auto px-7 py-3 rounded-2xl bg-indigo-600 text-white font-black text-sm hover:bg-indigo-700 transition-all">
              SEARCH
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// ---------------- PAGE ----------------
const CatPage = () => {
  const nearbyCats = [
    {
      name: "Oliver",
      breed: "Scottish Fold",
      age: "3 months",
      price: "Rs 1,100",
      loc: "Manhattan, NY",
      tags: ["PLAYFUL", "KIDS"],
      img: "https://thumbs.dreamstime.com/b/maine-coon-cat-inside-pet-bed-tabby-maine-coon-cat-inside-jute-bag-pet-bed-peeking-out-looking-camera-curiously-brown-430637252.jpg?w=500",
    },
    {
      name: "Luna",
      breed: "Domestic Shorthair",
      age: "1 year",
      price: "Rs 4500",
      loc: "Brooklyn, NY",
      tags: ["QUIET", "INDOOR"],
      img: "https://www.rover.com/blog/wp-content/uploads/white-cat-min-960x540.jpg?w=500",
    },
    {
      name: "Simba",
      breed: "Ragdoll",
      age: "2 years",
      price: "Rs 1,800",
      loc: "Queens, NY",
      tags: ["LAP CAT", "DOCILE"],
      img: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=500",
    },
    {
      name: "Coco",
      breed: "Bengal",
      age: "6 months",
      price: "Rs 2,200",
      loc: "Jersey City, NJ",
      tags: ["ACTIVE", "CURIOUS"],
      img: "https://hips.hearstapps.com/hmg-prod/images/somali-cat-portrait-royalty-free-image-1718219279.jpg?w=500",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] overflow-x-hidden font-sans">
      {/* HERO */}
      <CatHero />

      {/* FEATURED SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 mt-16 md:mt-24 mb-20">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] font-black text-indigo-600">
              Premium Selection
            </span>

            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2">
              Featured Breeds
            </h2>
          </div>

          <button className="flex items-center gap-1 text-indigo-600 font-bold text-sm">
            View All
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Large Card */}
          <div className="lg:col-span-2 bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col md:flex-row">
            {/* Content */}
            <div className="w-full md:w-1/2 p-6 sm:p-10 md:p-12 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-emerald-600 text-[10px] uppercase tracking-widest font-bold mb-5">
                  <CheckCircle size={14} />
                  Vet Verified
                </div>

                <h3 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4">
                  The Persian
                </h3>

                <p className="text-slate-500 leading-relaxed mb-8 text-sm sm:text-base">
                  Sweet, gentle personalities with luxurious long coats.
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-6 mb-8">
                  <div>
                    <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">
                      Price Range
                    </p>
                    <p className="text-lg sm:text-xl font-black text-indigo-600">
                      Rs 12k - 25k
                    </p>
                  </div>

                  <div>
                    <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">
                      Origin
                    </p>
                    <p className="text-lg sm:text-xl font-black text-slate-900">
                      Iran
                    </p>
                  </div>
                </div>

                <button className="w-full py-4 rounded-2xl bg-slate-900 text-white font-bold hover:bg-indigo-600 transition-all">
                  Explore Listings
                </button>
              </div>
            </div>

            {/* Image */}
            <div className="w-full md:w-1/2 h-[320px] md:h-auto overflow-hidden">
              <img
                src="https://moderncat.com/wp-content/uploads/2013/10/Himalayan_AdobeStock_533934217_Ali-Shami-Wirestock-Creators-940x640.jpg"
                alt="Persian"
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
              />
            </div>
          </div>

          {/* Small Card */}
          <div className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500">
            <div className="h-60 overflow-hidden">
              <img
                src="https://cdn.shopify.com/s/files/1/0086/0795/7054/files/Bengal_Cat.jpg?v=1722406738"
                alt="Siamese"
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
              />
            </div>

            <div className="p-6 sm:p-8">
              <h3 className="text-2xl font-black text-slate-900 mb-2">
                Siamese
              </h3>

              <p className="text-slate-500 text-sm leading-relaxed">
                Social, vocal, and deeply affectionate companions.
              </p>

              <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-100">
                <span className="font-black text-indigo-600">
                  From Rs 8,000
                </span>

                <span className="bg-indigo-50 text-indigo-600 text-[10px] font-black px-3 py-1 rounded-full">
                  TOP RATED
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AVAILABLE SECTION */}
      <section className="bg-slate-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
              Available Near You
            </h2>

            <button className="flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-white border border-slate-200 text-sm font-bold text-slate-600 hover:shadow-lg transition-all">
              <SlidersHorizontal size={18} />
              Filter Results
            </button>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8">
            {nearbyCats.map((cat, idx) => (
              <div
                key={idx}
                className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-white hover:shadow-2xl transition-all duration-500"
              >
                {/* Image */}
                <div className="h-72 relative overflow-hidden">
                  <img
                    src={cat.img}
                    alt={cat.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                  />

                  {idx === 0 && (
                    <div className="absolute top-5 left-5 bg-indigo-600 text-white text-[9px] font-black px-4 py-1.5 rounded-full">
                      NEW ARRIVAL
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 sm:p-8">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h3 className="text-2xl font-black text-slate-900">
                      {cat.name}
                    </h3>

                    <span className="text-indigo-600 font-black text-lg whitespace-nowrap">
                      {cat.price}
                    </span>
                  </div>

                  <p className="text-slate-400 text-xs uppercase tracking-widest font-bold mb-6">
                    {cat.breed} • {cat.age}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {cat.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-indigo-50 text-indigo-500 text-[10px] font-black px-3 py-1.5 rounded-lg uppercase"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 text-slate-400 text-xs font-bold pt-6 border-t border-slate-100">
                    <MapPin size={15} className="text-indigo-400" />
                    {cat.loc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-16 md:py-24">
        <div className="relative overflow-hidden rounded-[3rem] bg-slate-900 px-6 py-14 sm:px-10 md:px-20 md:py-24 text-center shadow-2xl">
          {/* Blur BG */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-600/30 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-emerald-500/20 rounded-full blur-[100px]" />

          <div className="relative z-10">
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white leading-tight mb-8">
              Find Your Feline <br /> Soulmate Today
            </h2>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-10 py-4 rounded-2xl bg-indigo-600 text-white font-black hover:bg-indigo-700 transition-all">
                START SEARCH
              </button>

              <button className="px-10 py-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 text-white font-black hover:bg-white/20 transition-all">
                CONTACT VET
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CatPage;