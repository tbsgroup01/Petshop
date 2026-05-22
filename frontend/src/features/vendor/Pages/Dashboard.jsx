


// import React, { useEffect, useMemo, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { PlusCircle, Dog, MapPin, IndianRupee, Heart, Calendar, Search, Tag } from 'lucide-react';
// import Header from '../Components/Header';
// import { listingService } from '../../../services';

// const Dashboard = () => {
//   const [pets, setPets] = useState([]);
//   const [search, setSearch] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [lastUpdated, setLastUpdated] = useState(null);

//   const load = async () => {
//     try {
//       const { data } = await listingService.getMyListings();
//       setPets(data?.listings || []);
//       setLastUpdated(new Date());
//     } catch (error) {
//       console.error("Error loading dashboard data:", error);
//       setPets([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     let mounted = true;
//     const run = async () => {
//       if (!mounted) return;
//       await load();
//     };

//     run();
//     const interval = setInterval(run, 15000);

//     return () => {
//       mounted = false;
//       clearInterval(interval);
//     };
//   }, []);

//   const filteredPets = useMemo(() => {
//     const q = search.trim().toLowerCase();
//     if (!q) return pets;
//     return pets.filter((p) => 
//       String(p.title || '').toLowerCase().includes(q) || 
//       String(p.breed || '').toLowerCase().includes(q) ||
//       String(p.petType || '').toLowerCase().includes(q) ||
//       String(p.purpose || p.listingType || '').toLowerCase().includes(q)
//     );
//   }, [pets, search]);

//   const totalInquiries = pets.reduce((s, p) => s + Number(p.favorite_count || 0), 0);
//   const totalActive = pets.filter((p) => p.is_approved && p.status === 'active').length;

//   return (
//     <>
//       <Header />

//       <div className="p-8 overflow-y-auto bg-[#F8F9FD] min-h-screen">
//         {/* Top Header Section */}
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
//           <div>
//             <h2 className="text-2xl font-bold text-slate-800">Vendor Dashboard</h2>
//             <p className="text-gray-500 text-sm mt-1">
//               Live data from backend listings. {lastUpdated ? `Last updated: ${lastUpdated.toLocaleTimeString()}` : ''}
//             </p>
//           </div>
//           <div className="flex items-center gap-3 w-full sm:w-auto">
//             <Link to="/vendor/my-pets" className="border border-gray-200 bg-white text-gray-600 px-5 py-2.5 rounded-xl font-medium text-sm hover:bg-gray-50 transition shadow-sm text-center flex-1 sm:flex-none">
//               View All Pets
//             </Link>
//             <Link to="/vendor/add-pets" className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition text-sm flex-1 sm:flex-none">
//               <PlusCircle size={18} /> Add New Pet
//             </Link>
//           </div>
//         </div>

//         {/* Analytics Metric Cards Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//           <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
//             <div>
//               <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Listings</p>
//               <h3 className="text-3xl font-black text-slate-800 mt-1">{pets.length}</h3>
//             </div>
//             <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
//               <Dog size={24} />
//             </div>
//           </div>

//           <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
//             <div>
//               <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Active & Approved</p>
//               <h3 className="text-3xl font-black  mt-1">{totalActive}</h3>
//             </div>
//             <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
//               <PlusCircle size={24} className="rotate-45" />
//             </div>
//           </div>

//           <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
//             <div>
//               <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Favorites</p>
//               <h3 className="text-3xl font-black  mt-1">{totalInquiries}</h3>
//             </div>
//             <div className="p-3 bg-pink-50 text-pink-600 rounded-xl">
//               <Heart size={24} className="" />
//             </div>
//           </div>
//         </div>

//         {/* Search & Overview Title Section */}
//         <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
//           <h3 className="text-lg font-bold text-slate-800">Quick Listings Overview</h3>
//           <div className="relative w-full md:w-80">
//             <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search by title, breed, category..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500 transition-colors shadow-sm"
//             />
//           </div>
//         </div>

//         {/* Dynamic Items Content Grid */}
//         {loading ? (
//           <div className="text-sm text-gray-500 py-12 text-center font-medium animate-pulse">
//             Loading dashboard analytics...
//           </div>
//         ) : filteredPets.length === 0 ? (
//           <div className="text-sm text-gray-400 py-12 text-center bg-white rounded-2xl border border-dashed border-gray-200">
//             No pet records found match your criteria.
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//             {filteredPets.map((pet) => {
//               const media = pet.images?.[0] ? `${import.meta.env.VITE_BASE_URL}${pet.images[0]}` : 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=800&q=80';
//               const isVideo = /\.(mp4|webm|ogg|mov)$/i.test(media);
//               // const serviceCategory = pet.purpose || pet.listingType || pet.categoryType || 'Sell';

//               return (
//                 <Link to={`/vendor/pet-details/${pet.id}`} key={pet.id} className="border border-gray-100 rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
//                   <div className="relative h-44 bg-gray-100 overflow-hidden">
//                     {isVideo ? (
//                       <video src={media} className="w-full h-full object-cover" muted playsInline />
//                     ) : (
//                       <img src={media} alt={pet.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
//                     )}
//                     <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase tracking-wider text-indigo-600 shadow-sm">
//                       {pet.petType || 'Pet'}
//                     </span>
//                     <span className={`absolute top-3 right-3 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-sm uppercase ${
//                       String(pet?.status).toLowerCase() === 'active' ? 'bg-emerald-600' : 'bg-amber-500'
//                     }`}>
//                       {pet.status || 'Pending'}
//                     </span>
//                   </div>

//                   <div className="p-4 space-y-2">
//                     <div className="flex justify-between items-start gap-2">
//                       <div className="truncate">
//                         <h4 className="font-bold text-base text-slate-800 truncate group-hover:text-indigo-600 transition-colors" title={pet.title}>
//                           {pet.title || pet.breed}
//                         </h4>
//                         <p className="text-xs text-gray-500 font-medium truncate">{pet.breed}</p>
//                       </div>
//                       <div className="text-indigo-600 font-black text-base flex items-center shrink-0">
//                         <IndianRupee size={15} className="stroke-[3]" />
//                         <span>{pet.price ? `${pet.price}` : 0}</span>
//                       </div>
//                     </div>

//                     <div className="flex flex-wrap items-center gap-1.5 pt-1">
//                       <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${pet.gender === 'Female' ? 'bg-pink-50 text-pink-600' : 'bg-blue-50 text-blue-600'}`}>
//                         {pet.gender || 'Male'}
//                       </span>
//                       <span className="text-[10px] bg-gray-100 text-gray-600 font-semibold px-2 py-0.5 rounded-md flex items-center gap-1">
//                         <Calendar size={10} />Age {pet.age ? `${pet.age}` : 'N/A'}
//                       </span>
//                       {/* Service Category Badge */}
//                       <span className="text-[10px] bg-indigo-50 text-indigo-600 font-bold px-2 py-0.5 rounded-md flex items-center gap-0.5 uppercase tracking-wide">
//                         <Tag size={10} /> {pet.serviceCategory}
//                       </span>
//                     </div>

//                     <div className="flex items-center gap-1 text-gray-400 text-xs pt-1 border-t border-gray-50 mt-2">
//                       <MapPin size={12} className="text-gray-400 shrink-0" />
//                       <span className="truncate">
//                         {pet.city ? `${pet.city}, ${pet.state || ''}` : (pet.location || 'Noida, UP')}
//                       </span>
//                     </div>
//                   </div>
//                 </Link>
//               );
//             })}
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default Dashboard;




import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, Dog, MapPin, IndianRupee, Heart, Calendar, Search, Tag } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'; // Chart library imports
import Header from '../Components/Header';
import { listingService } from '../../../services';

const Dashboard = () => {
  const [pets, setPets] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);

  const load = async () => {
    try {
      const { data } = await listingService.getMyListings();
      setPets(data?.listings || []);
      setLastUpdated(new Date());
    } catch (error) {
      console.error("Error loading dashboard data:", error);
      setPets([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let mounted = true;
    const run = async () => {
      if (!mounted) return;
      await load();
    };

    run();
    const interval = setInterval(run, 15000);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  const filteredPets = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return pets;
    return pets.filter((p) => 
      String(p.title || '').toLowerCase().includes(q) || 
      String(p.breed || '').toLowerCase().includes(q) ||
      String(p.petType || '').toLowerCase().includes(q) ||
      String(p.purpose || p.listingType || '').toLowerCase().includes(q)
    );
  }, [pets, search]);

  const totalInquiries = pets.reduce((s, p) => s + Number(p.favorite_count || 0), 0);
  const totalActive = pets.filter((p) => p.is_approved && p.status === 'active').length;

  // --- DYNAMIC CHART DATA GENERATION ---
  const chartData = useMemo(() => {
    if (pets.length === 0) return [];
    
    // Group pets by their types dynamically
    const counts = pets.reduce((acc, pet) => {
      const type = pet.petType || 'Other';
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {});

    const total = pets.length;

    // Format for Recharts and calculate exact rounded percentage matching your UI style
    return Object.keys(counts).map((key) => ({
      name: key,
      value: counts[key],
      percentage: Math.round((counts[key] / total) * 100)
    }));
  }, [pets]);

  // Premium Custom Colors matched to your image style
  const COLORS = ['#4ECDC4', '#A8E6CF', '#FF8B94', '#FFD3B6', '#6C5CE7'];

  return (
    <>
      <Header />

      <div className="p-8 overflow-y-auto bg-[#F8F9FD] min-h-screen">
        {/* Top Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Vendor Dashboard</h2>
            <p className="text-gray-500 text-sm mt-1">
              Live data from backend listings. {lastUpdated ? `Last updated: ${lastUpdated.toLocaleTimeString()}` : ''}
            </p>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
        
            <Link to="/vendor/add-pets" className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition text-sm flex-1 sm:flex-none">
              <PlusCircle size={18} /> Add New Pet
            </Link>
          </div>
        </div>

        {/* --- MAIN GRID: STATS & NEW DONUT CHART COMPONENT --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          
          {/* Left Side: Stats Stack */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6 h-fit">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between sm:col-span-2">
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Listings</p>
                <h3 className="text-3xl font-black text-slate-800 mt-1">{pets.length}</h3>
              </div>
              <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                <Dog size={24} />
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Active & Approved</p>
                <h3 className="text-3xl font-black mt-1 text-slate-800">{totalActive}</h3>
              </div>
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                <PlusCircle size={24} className="rotate-45" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Favorites</p>
                <h3 className="text-3xl font-black mt-1 text-slate-800">{totalInquiries}</h3>
              </div>
              <div className="p-3 bg-pink-50 text-pink-600 rounded-xl">
                <Heart size={24} />
              </div>
            </div>
          </div>

          {/* Right Side: The Donut Chart (Exact design like image) */}
        {/* Right Side: The Bigger Donut Chart using the 3 Metric Items */}
<div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between min-h-[320px] lg:col-span-1">
  <div>
    <h4 className="text-base font-bold text-slate-800">Platform Performance Overview</h4>
    <p className="text-xs text-gray-400">Ratio comparison between listings, approvals, and favorites</p>
  </div>

  {pets.length === 0 && totalInquiries === 0 ? (
    <div className="text-xs text-gray-400 text-center my-auto">No metrics available for chart</div>
  ) : (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mt-4">
      {/* Increased Size Recharts Container */}
      <div className="w-full sm:w-3/5 h-52 relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip 
              contentStyle={{ background: '#fff', border: 'none', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', fontSize: '12px' }}
            />
            <Pie
              data={[
                { name: 'Total Listings', value: pets.length },
                { name: 'Active & Approved', value: totalActive },
                { name: 'Total Favorites', value: totalInquiries }
              ]}
              cx="50%"
              cy="50%"
              innerRadius={55}  // Size increased from 45
              outerRadius={80}  // Size increased from 65
              paddingAngle={4}  // Gap between segments
              dataKey="value"
            >
              {/* 3 Explicit Premium Colors matching your request */}
              <Cell fill="#4ECDC4" className="focus:outline-none" /> {/* Teal/Cyan */}
              <Cell fill="#A8E6CF" className="focus:outline-none" /> {/* Light Green */}
              <Cell fill="#FF8B94" className="focus:outline-none" /> {/* Coral/Pink */}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Right Side Legend Labels */}
      <div className="w-full sm:w-2/5 space-y-4">
        {[
          { name: 'Total Listings', value: pets.length, color: '#4ECDC4' },
          { name: 'Active & Approved', value: totalActive, color: '#A8E6CF' },
          { name: 'Total Favorites', value: totalInquiries, color: '#FF8B94' }
        ].map((item) => {
          const totalSum = pets.length + totalActive + totalInquiries;
          const percentage = totalSum > 0 ? Math.round((item.value / totalSum) * 100) : 0;

          return (
            <div key={item.name} className="flex items-start gap-2.5">
              <span 
                className="w-3 h-3 rounded-full mt-1 shrink-0" 
                style={{ backgroundColor: item.color }} 
              />
              <div className="leading-tight">
                <p className="text-xs font-bold text-slate-700">{item.name}</p>
                <p className="text-[11px] text-gray-400 font-bold mt-0.5">{percentage}% ({item.value})</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  )}
</div>

          
        </div>

        {/* Search & Overview Title Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <h3 className="text-lg font-bold text-slate-800">Quick Listings Overview</h3>
          <div className="relative w-full md:w-80">
            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by title, breed, category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500 transition-colors shadow-sm"
            />
          </div>
        </div>

        {/* Dynamic Items Content Grid */}
        {loading ? (
          <div className="text-sm text-gray-500 py-12 text-center font-medium animate-pulse">
            Loading dashboard analytics...
          </div>
        ) : filteredPets.length === 0 ? (
          <div className="text-sm text-gray-400 py-12 text-center bg-white rounded-2xl border border-dashed border-gray-200">
            No pet records found match your criteria.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredPets.map((pet) => {
              const media = pet.images?.[0] ? `${import.meta.env.VITE_BASE_URL}${pet.images[0]}` : 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=800&q=80';
              const isVideo = /\.(mp4|webm|ogg|mov)$/i.test(media);

              return (
                <Link to={`/vendor/pet-details/${pet.id}`} key={pet.id} className="border border-gray-100 rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="relative h-44 bg-gray-100 overflow-hidden">
                    {isVideo ? (
                      <video src={media} className="w-full h-full object-cover" muted playsInline />
                    ) : (
                      <img src={media} alt={pet.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    )}
                    <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase tracking-wider text-indigo-600 shadow-sm">
                      {pet.petType || 'Pet'}
                    </span>
                    <span className={`absolute top-3 right-3 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-sm uppercase ${
                      String(pet?.status).toLowerCase() === 'active' ? 'bg-emerald-600' : 'bg-amber-500'
                    }`}>
                      {pet.status || 'Pending'}
                    </span>
                  </div>

                  <div className="p-4 space-y-2">
                    <div className="flex justify-between items-start gap-2">
                      <div className="truncate">
                        <h4 className="font-bold text-base text-slate-800 truncate group-hover:text-indigo-600 transition-colors" title={pet.title}>
                          {pet.title || pet.breed}
                        </h4>
                        <p className="text-xs text-gray-500 font-medium truncate">{pet.breed}</p>
                      </div>
                      <div className="text-indigo-600 font-black text-base flex items-center shrink-0">
                        <IndianRupee size={15} className="stroke-[3]" />
                        <span>{pet.price ? `${pet.price}` : 0}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${pet.gender === 'Female' ? 'bg-pink-50 text-pink-600' : 'bg-blue-50 text-blue-600'}`}>
                        {pet.gender || 'Male'}
                      </span>
                      <span className="text-[10px] bg-gray-100 text-gray-600 font-semibold px-2 py-0.5 rounded-md flex items-center gap-1">
                        <Calendar size={10} />Age {pet.age ? `${pet.age}` : 'N/A'}
                      </span>
                      <span className="text-[10px] bg-indigo-50 text-indigo-600 font-bold px-2 py-0.5 rounded-md flex items-center gap-0.5 uppercase tracking-wide">
                        <Tag size={10} /> {pet.serviceCategory}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 text-gray-400 text-xs pt-1 border-t border-gray-50 mt-2">
                      <MapPin size={12} className="text-gray-400 shrink-0" />
                      <span className="truncate">
                        {pet.city ? `${pet.city}, ${pet.state || ''}` : (pet.location || 'Noida, UP')}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;