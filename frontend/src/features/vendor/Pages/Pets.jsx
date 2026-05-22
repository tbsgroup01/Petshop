



// import React, { useEffect, useMemo, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { PlusCircle, MapPin, Trash2, IndianRupee, Calendar, Tag } from 'lucide-react';
// import Header from '../Components/Header';
// import { listingService } from '../../../services';

// const MyPets = () => {
//   const [activeTab, setActiveTab] = useState('All');
//   const [pets, setPets] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [lastUpdated, setLastUpdated] = useState(null);

//   const fetchMyPets = async () => {
//     try {
//       setLoading(true);
//       const { data } = await listingService.getMyListings();
//       setPets(data?.listings || []);
//       setLastUpdated(new Date());
//     } catch {
//       setPets([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     let mounted = true;
//     const run = async () => {
//       if (!mounted) return;
//       await fetchMyPets();
//     };
//     run();
//     const interval = setInterval(run, 15000);

//     return () => {
//       mounted = false;
//       clearInterval(interval);
//     };
//   }, []);

//   const getStatusLabel = (pet) => String(pet?.status || 'pending').toUpperCase();
//   const getStatusStyle = (pet) => {
//     const status = String(pet?.status || 'pending').toLowerCase();
//     if (status === 'active') return 'bg-emerald-600';
//     if (status === 'sold') return 'bg-slate-700';
//     if (status === 'inactive') return 'bg-rose-600';
//     return 'bg-amber-500';
//   };

//   const visiblePets = useMemo(() => {
//     if (activeTab === 'All') return pets;
//     if (activeTab === 'Active') return pets.filter((pet) => pet.status === 'active' && pet.is_approved);
//     if (activeTab === 'Sold') return pets.filter((pet) => pet.status === 'sold');
//     if (activeTab === 'Draft') return pets.filter((pet) => !pet.is_approved);
//     return pets;
//   }, [activeTab, pets]);

//   const handleDelete = async (e, id) => {
//     e.preventDefault();
//     const ok = window.confirm('Delete this listing?');
//     if (!ok) return;

//     try {
//       await listingService.deleteListing(id);
//       await fetchMyPets();
//     } catch (error) {
//       alert(error?.response?.data?.message || 'Failed to delete listing');
//     }
//   };

//   return (
//     <>
//       <Header />

//       <div className="p-8 overflow-y-auto bg-[#F8F9FD] min-h-screen">
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
//           <div>
//             <div className="text-xs text-gray-400 mb-1 flex items-center gap-1">
//               <Link to="/vendor/dashboard" className="hover:text-indigo-600 transition">Dashboard</Link>
//               <span>/</span>
//               <span className="text-gray-600 font-medium">My Pets</span>
//             </div>
//             <h2 className="text-3xl font-bold text-slate-900">My Pets</h2>
//             <p className="text-slate-500 mt-1">
//               Manage and track your clinic's current pet listings.
//               {lastUpdated ? ` Last updated: ${lastUpdated.toLocaleTimeString()}` : ''}
//             </p>
//           </div>
          
//           <div className="flex items-center gap-3 w-full sm:w-auto">
//             <Link to="/vendor/dashboard" className="border border-gray-200 text-gray-600 px-4 py-2.5 rounded-xl font-semibold text-sm hover:bg-gray-50 transition bg-white text-center flex-1 sm:flex-none">
//               View Dashboard
//             </Link>
//             <Link to="/vendor/add-pets" className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition text-sm flex-1 sm:flex-none">
//               <PlusCircle size={18} /> Add New Pet
//             </Link>
//           </div>
//         </div>

//         <div className="bg-white p-2 rounded-2xl border border-gray-100 flex items-center justify-between mb-8 shadow-sm">
//           <div className="flex gap-1">
//             {['All', 'Active', 'Sold', 'Draft'].map((tab) => (
//               <button
//                 key={tab}
//                 onClick={() => setActiveTab(tab)}
//                 className={`px-6 py-2 rounded-xl text-sm font-semibold transition ${activeTab === tab ? 'bg-indigo-50 text-indigo-600' : 'text-gray-400 hover:text-gray-600'}`}
//               >
//                 {tab}
//               </button>
//             ))}
//           </div>
//         </div>

//         {loading ? (
//           <div className="text-sm text-gray-500 py-8 text-center font-medium animate-pulse">Loading your listings...</div>
//         ) : visiblePets.length === 0 ? (
//           <div className="text-sm text-gray-400 py-12 text-center">No pet listings found in this category.</div>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
//             {visiblePets.map((pet) => {
//               const media = pet.images?.[0] ? `${import.meta.env.VITE_BASE_URL}${pet.images[0]}` : 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=800&q=80';
//               const isVideo = /\.(mp4|webm|ogg|mov)$/i.test(media);
//               const serviceCategory = pet.purpose || pet.listingType || pet.categoryType || 'Sell';

//               return (
//                 <div key={pet.id} className="border border-gray-100 rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
//                   <Link to={`/vendor/pet-details/${pet.id}`} className="block block-link flex-1">
//                     <div className="relative h-44 bg-gray-100 overflow-hidden">
//                       {isVideo ? (
//                         <video src={media} className="w-full h-full object-cover" muted playsInline />
//                       ) : (
//                         <img src={media} alt={pet.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
//                       )}
//                       <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase tracking-wider text-indigo-600 shadow-sm">
//                         {pet.petType || 'Pet'}
//                       </span>
//                       <span className={`absolute top-3 right-3 ${getStatusStyle(pet)} text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-sm uppercase`}>
//                         {getStatusLabel(pet)}
//                       </span>
//                     </div>

//                     <div className="p-4 space-y-2">
//                       <div className="flex justify-between items-start gap-2">
//                         <div className="truncate">
//                           <h4 className="font-bold text-base text-slate-800 truncate group-hover:text-indigo-600 transition-colors" title={pet.title}>
//                             {pet.title || pet.breed}
//                           </h4>
//                           <p className="text-xs text-gray-500 font-medium truncate">{pet.breed}</p>
//                         </div>
//                         <div className="text-indigo-600 font-black text-base flex items-center shrink-0">
//                           <IndianRupee size={15} className="stroke-[3]" />
//                           <span>{pet.price ? `${pet.price}` : 0}</span>
//                         </div>
//                       </div>

//                       <div className="flex flex-wrap items-center gap-1.5 pt-1">
//                         <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${pet.gender === 'Female' ? 'bg-pink-50 text-pink-600' : 'bg-blue-50 text-blue-600'}`}>
//                           {pet.gender || 'Male'}
//                         </span>
//                         <span className="text-[10px] bg-gray-100 text-gray-600 font-semibold px-2 py-0.5 rounded-md flex items-center gap-1">
//                           <Calendar size={10} />Age {pet.age ? `${pet.age}` : 'N/A'}
//                         </span>
//                         {/* Added Service Category Tag */}
//                         <span className="text-[10px] bg-indigo-50 text-indigo-600 font-bold px-2 py-0.5 rounded-md flex items-center gap-0.5 uppercase tracking-wide">
//                           <Tag size={10} /> {serviceCategory}
//                         </span>
//                       </div>

//                       <div className="flex items-center gap-1 text-gray-400 text-xs pt-1">
//                         <MapPin size={12} className="text-gray-400 shrink-0" />
//                         <span className="truncate">
//                           {pet.city ? `${pet.city}, ${pet.state || ''}` : (pet.location || 'Noida, UP')}
//                         </span>
//                       </div>
//                     </div>
//                   </Link>

//                   <div className="p-4 border-t border-gray-100 bg-gray-50/50 space-y-3">
//                     <div className="flex items-center justify-between">
//                       <span className="text-xs font-semibold text-gray-400">Approval Status:</span>
//                       <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${pet.is_approved ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
//                         {pet.is_approved ? 'Live' : 'Pending'}
//                       </span>
//                     </div>

//                     <button
//                       onClick={(e) => handleDelete(e, pet.id)}
//                       className="w-full bg-red-50 text-red-600 py-2 rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-red-100 transition-colors"
//                     >
//                       <Trash2 size={16} /> Delete Listing
//                     </button>
//                   </div>
//                 </div>
//               );
//             })}

//             <Link to="/vendor/add-pets" className="border-2 border-dashed border-gray-200 rounded-3xl flex flex-col items-center justify-center p-8 text-center bg-gray-50/50 hover:bg-indigo-50/30 transition cursor-pointer min-h-[350px]">
//               <div className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center text-gray-400 mb-4 bg-white">
//                 <PlusCircle size={24} />
//               </div>
//               <h4 className="font-bold text-slate-800 mb-1">Add New Pet</h4>
//               <p className="text-xs text-gray-400">List a new puppy for your customers</p>
//             </Link>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default MyPets;




import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, MapPin, Trash2, IndianRupee, Calendar, Tag, BarChart3, PieChart as PieIcon } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'; // Chart library imports
import Header from '../Components/Header';
import { listingService } from '../../../services';

const MyPets = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchMyPets = async () => {
    try {
      setLoading(true);
      const { data } = await listingService.getMyListings();
      setPets(data?.listings || []);
      setLastUpdated(new Date());
    } catch {
      setPets([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let mounted = true;
    const run = async () => {
      if (!mounted) return;
      await fetchMyPets();
    };
    run();
    const interval = setInterval(run, 15000);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  const getStatusLabel = (pet) => String(pet?.status || 'pending').toUpperCase();
  const getStatusStyle = (pet) => {
    const status = String(pet?.status || 'pending').toLowerCase();
    if (status === 'active') return 'bg-emerald-600';
    if (status === 'sold') return 'bg-slate-700';
    if (status === 'inactive') return 'bg-rose-600';
    return 'bg-amber-500';
  };

  const visiblePets = useMemo(() => {
    if (activeTab === 'All') return pets;
    if (activeTab === 'Active') return pets.filter((pet) => pet.status === 'active' && pet.is_approved);
    if (activeTab === 'Sold') return pets.filter((pet) => pet.status === 'sold');
    if (activeTab === 'Draft') return pets.filter((pet) => !pet.is_approved);
    return pets;
  }, [activeTab, pets]);

  // --- CHART 1: STATUS DISTRIBUTION DATA ---
  const statusChartData = useMemo(() => {
    const activeCount = pets.filter((pet) => pet.status === 'active' && pet.is_approved).length;
    const soldCount = pets.filter((pet) => pet.status === 'sold').length;
    const draftCount = pets.filter((pet) => !pet.is_approved).length;
    const total = pets.length;

    const getPct = (count) => (total > 0 ? Math.round((count / total) * 100) : 0);

    return [
      { name: 'Active & Approved', value: activeCount, percentage: getPct(activeCount), color: '#4ECDC4' },
      { name: 'Sold Listings', value: soldCount, percentage: getPct(soldCount), color: '#A8E6CF' },
      { name: 'Drafts / Pending', value: draftCount, percentage: getPct(draftCount), color: '#FF8B94' }
    ];
  }, [pets]);

  // --- CHART 2: PET TYPE DISTRIBUTION DATA (TOP 3 TYPES) ---
  const typeChartData = useMemo(() => {
    const total = pets.length;
    if (total === 0) return [];

    const dogCount = pets.filter((pet) => String(pet.petType).toLowerCase() === 'dog').length;
    const catCount = pets.filter((pet) => String(pet.petType).toLowerCase() === 'cat').length;
    const otherCount = total - (dogCount + catCount);

    const getPct = (count) => Math.round((count / total) * 100);

    return [
      { name: 'Dogs', value: dogCount, percentage: getPct(dogCount), color: '#6C5CE7' }, // Premium Purple
      { name: 'Cats', value: catCount, percentage: getPct(catCount), color: '#FFAAA6' }, // Soft Peach
      { name: 'Other Pets', value: otherCount, percentage: getPct(otherCount), color: '#FFD3B6' } // Soft Orange
    ];
  }, [pets]);

  const handleDelete = async (e, id) => {
    e.preventDefault();
    const ok = window.confirm('Delete this listing?');
    if (!ok) return;

    try {
      await listingService.deleteListing(id);
      await fetchMyPets();
    } catch (error) {
      alert(error?.response?.data?.message || 'Failed to delete listing');
    }
  };

  return (
    <>
      <Header />

      <div className="p-8 overflow-y-auto bg-[#F8F9FD] min-h-screen">
        {/* Top Navigation Row */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <div className="text-xs text-gray-400 mb-1 flex items-center gap-1">
              <Link to="/vendor/dashboard" className="hover:text-indigo-600 transition">Dashboard</Link>
              <span>/</span>
              <span className="text-gray-600 font-medium">My Pets</span>
            </div>
            <h2 className="text-3xl font-bold text-slate-900">My Pets</h2>
            <p className="text-slate-500 mt-1">
              Manage and track your clinic's current pet listings.
              {lastUpdated ? ` Last updated: ${lastUpdated.toLocaleTimeString()}` : ''}
            </p>
          </div>
          
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Link to="/vendor/dashboard" className="border border-gray-200 text-gray-600 px-4 py-2.5 rounded-xl font-semibold text-sm hover:bg-gray-50 transition bg-white text-center flex-1 sm:flex-none">
              View Dashboard
            </Link>
            <Link to="/vendor/add-pets" className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition text-sm flex-1 sm:flex-none">
              <PlusCircle size={18} /> Add New Pet
            </Link>
          </div>
        </div>

        {/* --- TWO ROUNDED DONUT CHARTS GRID --- */}
        {!loading && pets.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            
            {/* CHART 1: STATUS OVERVIEW */}
            <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
                  <BarChart3 size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-800">Status Distribution</h3>
                  <p className="text-[11px] text-gray-400 font-medium">Visual tracking of active vs sold listings</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4">
                <div className="w-full sm:w-1/2 h-44 relative">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Tooltip contentStyle={{ background: '#fff', border: 'none', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', fontSize: '12px' }} />
                      <Pie data={statusChartData} cx="50%" cy="50%" innerRadius={50} outerRadius={72} paddingAngle={5} dataKey="value">
                        {statusChartData.map((entry, idx) => (
                          <Cell key={`cell-${idx}`} fill={entry.color} className="focus:outline-none" />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="w-full sm:w-1/2 space-y-3">
                  {statusChartData.map((item) => (
                    <div key={item.name} className="flex items-center justify-between bg-gray-50/60 p-2.5 rounded-xl border border-gray-100/50">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                        <div>
                          <p className="text-xs font-bold text-slate-700">{item.name}</p>
                          <p className="text-[10px] text-gray-400 font-bold">{item.percentage}% share</p>
                        </div>
                      </div>
                      <span className="text-xs font-black text-slate-800 bg-white px-2 py-1 rounded-lg border border-gray-100">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CHART 2: PET TYPE OVERVIEW */}
            <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 bg-purple-50 text-purple-600 rounded-xl">
                  <PieIcon size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-800">Pet Category Mix</h3>
                  <p className="text-[11px] text-gray-400 font-medium">Listing ratio divided by pet categories</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4">
                <div className="w-full sm:w-1/2 h-44 relative">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Tooltip contentStyle={{ background: '#fff', border: 'none', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', fontSize: '12px' }} />
                      <Pie data={typeChartData} cx="50%" cy="50%" innerRadius={50} outerRadius={72} paddingAngle={5} dataKey="value">
                        {typeChartData.map((entry, idx) => (
                          <Cell key={`cell-${idx}`} fill={entry.color} className="focus:outline-none" />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="w-full sm:w-1/2 space-y-3">
                  {typeChartData.map((item) => (
                    <div key={item.name} className="flex items-center justify-between bg-gray-50/60 p-2.5 rounded-xl border border-gray-100/50">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                        <div>
                          <p className="text-xs font-bold text-slate-700">{item.name}</p>
                          <p className="text-[10px] text-gray-400 font-bold">{item.percentage}% share</p>
                        </div>
                      </div>
                      <span className="text-xs font-black text-slate-800 bg-white px-2 py-1 rounded-lg border border-gray-100">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        )}

        {/* Tab Filter Toggles */}
        <div className="bg-white p-2 rounded-2xl border border-gray-100 flex items-center justify-between mb-8 shadow-sm">
          <div className="flex gap-1">
            {['All', 'Active', 'Sold', 'Draft'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-xl text-sm font-semibold transition ${activeTab === tab ? 'bg-indigo-50 text-indigo-600' : 'text-gray-400 hover:text-gray-600'}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="text-sm text-gray-500 py-8 text-center font-medium animate-pulse">Loading your listings...</div>
        ) : visiblePets.length === 0 ? (
          <div className="text-sm text-gray-400 py-12 text-center">No pet listings found in this category.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {visiblePets.map((pet) => {
              const media = pet.images?.[0] ? `${import.meta.env.VITE_BASE_URL}${pet.images[0]}` : 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=800&q=80';
              const isVideo = /\.(mp4|webm|ogg|mov)$/i.test(media);
              const serviceCategory = pet.purpose || pet.listingType || pet.categoryType || 'Sell';

              return (
                <div key={pet.id} className="border border-gray-100 rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
                  <Link to={`/vendor/pet-details/${pet.id}`} className="block block-link flex-1">
                    <div className="relative h-44 bg-gray-100 overflow-hidden">
                      {isVideo ? (
                        <video src={media} className="w-full h-full object-cover" muted playsInline />
                      ) : (
                        <img src={media} alt={pet.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      )}
                      <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase tracking-wider text-indigo-600 shadow-sm">
                        {pet.petType || 'Pet'}
                      </span>
                      <span className={`absolute top-3 right-3 ${getStatusStyle(pet)} text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-sm uppercase`}>
                        {getStatusLabel(pet)}
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
                          <Tag size={10} /> {serviceCategory}
                        </span>
                      </div>

                      <div className="flex items-center gap-1 text-gray-400 text-xs pt-1">
                        <MapPin size={12} className="text-gray-400 shrink-0" />
                        <span className="truncate">
                          {pet.city ? `${pet.city}, ${pet.state || ''}` : (pet.location || 'Noida, UP')}
                        </span>
                      </div>
                    </div>
                  </Link>

                  <div className="p-4 border-t border-gray-100 bg-gray-50/50 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-gray-400">Approval Status:</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${pet.is_approved ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                        {pet.is_approved ? 'Live' : 'Pending'}
                      </span>
                    </div>

                    <button
                      onClick={(e) => handleDelete(e, pet.id)}
                      className="w-full bg-red-50 text-red-600 py-2 rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-red-100 transition-colors"
                    >
                      <Trash2 size={16} /> Delete Listing
                    </button>
                  </div>
                </div>
              );
            })}

            <Link to="/vendor/add-pets" className="border-2 border-dashed border-gray-200 rounded-3xl flex flex-col items-center justify-center p-8 text-center bg-gray-50/50 hover:bg-indigo-50/30 transition cursor-pointer min-h-[350px]">
              <div className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center text-gray-400 mb-4 bg-white">
                <PlusCircle size={24} />
              </div>
              <h4 className="font-bold text-slate-800 mb-1">Add New Pet</h4>
              <p className="text-xs text-gray-400">List a new puppy for your customers</p>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default MyPets;