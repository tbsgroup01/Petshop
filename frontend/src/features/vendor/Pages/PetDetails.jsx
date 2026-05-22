

// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate, Link } from 'react-router-dom';
// import { ArrowLeft, MapPin, IndianRupee, Calendar, ShieldCheck, Tag, Heart, Activity, ChevronLeft, ChevronRight, Briefcase } from 'lucide-react';
// import Header from '../Components/Header';
// import { listingService } from '../../../services';

// const PetDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [pet, setPet] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);

//   useEffect(() => {
//     const fetchPetDetails = async () => {
//       try {
//         setLoading(true);
//         const { data } = await listingService.getMyListings();
//         const foundPet = data?.listings?.find((p) => String(p.id) === String(id));
//         setPet(foundPet || null);
//       } catch (error) {
//         console.error("Error fetching pet details:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchPetDetails();
//   }, [id]);

//   if (loading) {
//     return (
//       <>
//         <Header />
//         <div className="p-8 text-center text-gray-500 font-medium animate-pulse min-h-screen bg-[#F8F9FD]">
//           Pet dettails Loading...
//         </div>
//       </>
//     );
//   }

//   if (!pet) {
//     return (
//       <>
//         <Header />
//         <div className="p-6 text-center min-h-screen bg-[#F8F9FD] flex flex-col justify-center items-center">
//           <p className="text-gray-500 mb-4 font-medium">Pet ki details nahi mili ya yeh listing exist nahi karti.</p>
//           <Link to="/vendor/dashboard" className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl text-sm font-semibold shadow-md hover:bg-indigo-700 transition">
//             Dashboard Par Wapas Jayein
//           </Link>
//         </div>
//       </>
//     );
//   }

//   const imagesArray = pet.images && pet.images.length > 0 ? pet.images : [];
  
//   const getMediaUrl = (img) => {
//     if (!img) return 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=800&q=80';
//     return img.startsWith('http') ? img : `${import.meta.env.VITE_BASE_URL}${img}`;
//   };

//   const nextImage = (e) => {
//     e.stopPropagation();
//     setCurrentImageIndex((prev) => (prev === imagesArray.length - 1 ? 0 : prev + 1));
//   };

//   const prevImage = (e) => {
//     e.stopPropagation();
//     setCurrentImageIndex((prev) => (prev === 0 ? imagesArray.length - 1 : prev - 1));
//   };

//   // Extract service category logic
//   const serviceCategory = pet.purpose || pet.listingType || pet.categoryType || 'Sell';

//   return (
//     <>
//       <Header />
//       <div className="p-2 bg-[#F8F9FD] min-h-screen">
//         <div className="max-w-5xl mx-auto mb-6">
//           <div className="text-xs text-gray-400 mb-2 flex items-center gap-1">
//             <Link to="/vendor/dashboard" className="hover:text-indigo-600 transition">Dashboard</Link>
//             <span>/</span>
//             <Link to="/vendor/pets" className="hover:text-indigo-600 transition">My Pets</Link>
//             <span>/</span>
//             <span className="text-gray-600 font-medium truncate">{pet.title || 'Details'}</span>
//           </div>
//           <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 font-bold text-sm transition-colors">
//             <ArrowLeft size={16} /> Go Back
//           </button>
//         </div>

//         <div className="max-w-7xl mx-auto bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-2">
          
//           {/* Left Column */}
//           <div className="relative h-64 md:h-auto bg-slate-900 min-h-[420px] group">
//             {imagesArray.length > 0 ? (
//               (() => {
//                 const currentMedia = getMediaUrl(imagesArray[currentImageIndex]);
//                 const isVideo = /\.(mp4|webm|ogg|mov)$/i.test(currentMedia);
//                 return isVideo ? (
//                   <video src={currentMedia} className="w-full h-full object-cover" controls playsInline />
//                 ) : (
//                   <img src={currentMedia} alt={`${pet.title || 'Pet'} - ${currentImageIndex + 1}`} className="w-full h-full object-cover" />
//                 );
//               })()
//             ) : (
//               <img src={getMediaUrl(null)} alt={pet.title} className="w-full h-full object-cover" />
//             )}

//             <div className="absolute top-4 left-4 flex flex-col gap-2">
//               <span className="bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-xl shadow-md uppercase tracking-wider w-fit">
//                 {pet.petType || pet.category || 'Pet'}
//               </span>
//               {/* {/* <span className="bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-xl shadow-md uppercase tracking-wider w-fit flex items-center gap-1"> */}
//                 {/* <Heart size={12} className="fill-white" /> */}
//                 {/* {serviceCategory} */}
//               {/* </span>  */}
//             </div>

//             {imagesArray.length > 1 && (
//               <>
//                 <button onClick={prevImage} className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full text-slate-800 hover:bg-white shadow-md transition-all opacity-0 group-hover:opacity-100">
//                   <ChevronLeft size={20} />
//                 </button>
//                 <button onClick={nextImage} className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full text-slate-800 hover:bg-white shadow-md transition-all opacity-0 group-hover:opacity-100">
//                   <ChevronRight size={20} />
//                 </button>
//                 <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 bg-black/30 px-3 py-1.5 rounded-full backdrop-blur-sm">
//                   {imagesArray.map((_, idx) => (
//                     <div key={idx} className={`h-2 w-2 rounded-full transition-all ${idx === currentImageIndex ? 'bg-white w-4' : 'bg-white/50'}`} />
//                   ))}
//                 </div>
//               </>
//             )}
//           </div>

//           {/* Right Column */}
//           <div className="p-8 flex flex-col justify-between space-y-6">
//             <div>
//               <div className="flex justify-between items-start gap-4 mb-2">
//                 <h2 className="text-2xl font-black text-slate-800 leading-tight">{pet.title || pet.breed}</h2>
//                 <div className="text-indigo-600 font-black text-2xl flex items-center shrink-0">
//                   <IndianRupee size={22} className="stroke-[3]" />
//                   <span>{pet.price ? `${pet.price}` : 0}</span>
//                 </div>
//               </div>
//               <p className="text-sm text-gray-500 font-medium mb-6">Breed: <span className="text-slate-700 font-bold">{pet.breed || 'N/A'}</span></p>

//               {/* Specs Grid Updated with Service Category */}
//               <div className="grid grid-cols-2 gap-4 mb-6">
//                 <div className="bg-slate-50 p-3 rounded-xl border border-gray-100 flex items-center gap-3">
//                   <div className={`p-2 rounded-lg ${pet.gender === 'Female' ? 'bg-pink-100 text-pink-600' : 'bg-blue-100 text-blue-600'}`}>
//                     <Tag size={16} />
//                   </div>
//                   <div>
//                     <p className="text-[10px] text-gray-400 font-bold uppercase">Gender</p>
//                     <p className="text-sm font-bold text-slate-700">{pet.gender || 'Male'}</p>
//                   </div>
//                 </div>

//                 <div className="bg-slate-50 p-3 rounded-xl border border-gray-100 flex items-center gap-3">
//                   <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
//                     <Calendar size={16} />
//                   </div>
//                   <div>
//                     <p className="text-[10px] text-gray-400 font-bold uppercase">Age</p>
//                     <p className="text-sm font-bold text-slate-700">{pet.age ? `${pet.age}` : 'N/A'}</p>
//                   </div>
//                 </div>

//                 {/* New Service Category Full Width Specification Row */}
//                 <div className="bg-indigo-50/50 p-3 rounded-xl border border-indigo-100/50 flex items-center gap-3 col-span-2">
//                   <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
//                     <Briefcase size={16} />
//                   </div>
//                   <div>
//                     <p className="text-[10px] text-indigo-400 font-bold uppercase">Service Category</p>
//                     <p className="text-sm font-black text-indigo-700 uppercase tracking-wide">{serviceCategory}</p>
//                   </div>
//                 </div>
//               </div>

//               {/* Health Information Box */}
//               <div className="bg-amber-50/50 border border-amber-100 rounded-2xl p-4 mb-6">
//                 <div className="flex items-center gap-2 text-amber-800 font-bold text-xs uppercase tracking-wider mb-2">
//                   <Activity size={14} />
//                   <span>Health Information</span>
//                 </div>
//                 <div className="grid grid-cols-2 gap-2 text-xs">
//                   <div className="text-slate-600">
//                     <strong>Vaccinated:</strong> <span className={pet.isVaccinated || pet.vaccinated === 'Yes' || pet.vaccinated === true ? "text-emerald-600 font-bold" : "text-rose-500 font-bold"}>{pet.isVaccinated || pet.vaccinated === 'Yes' || pet.vaccinated === true ? "Yes" : "No"}</span>
//                   </div>
//                   <div className="text-slate-600">
//                     <strong>Health Status:</strong> <span className="text-slate-700 font-semibold">{pet.healthCondition || pet.healthStatus || 'Excellent'}</span>
//                   </div>
//                   {pet.certification && (
//                     <div className="text-slate-600 col-span-2 mt-1">
//                       <strong>Certificates:</strong> <span className="text-slate-700">{pet.certification}</span>
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Location & Status details */}
//               <div className="space-y-3 border-t border-gray-100 pt-4">
//                 <div className="flex items-center gap-2.5 text-slate-600 text-sm">
//                   <MapPin size={16} className="text-gray-400 shrink-0" />
//                   <span><strong>Location:</strong> {pet.city ? `${pet.city}, ${pet.state || ''}` : (pet.location || 'Noida, UP')}</span>
//                 </div>
//                 <div className="flex items-center gap-2.5 text-slate-600 text-sm">
//                   <ShieldCheck size={16} className="text-gray-400 shrink-0" />
//                   <span>
//                     <strong>Status:</strong>{' '}
//                     <span className={`inline-block text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase ml-1 ${pet.is_approved ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
//                       {pet.is_approved ? 'Live / Approved' : 'Pending Verification'}
//                     </span>
//                   </span>
//                 </div>
//               </div>
//             </div>

//             <button onClick={() => navigate('/vendor/dashboard')} className="w-full bg-indigo-50 hover:bg-indigo-100 text-indigo-600 py-3 rounded-xl font-bold text-sm transition-colors mt-auto">
//               Back to Dashboard
//             </button>
//           </div>

//         </div>
//       </div>
//     </>
//   );
// };

// export default PetDetails;




import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, IndianRupee, Calendar, ShieldCheck, Tag, Activity, ChevronLeft, ChevronRight, Briefcase } from 'lucide-react';
import Header from '../Components/Header';
import { listingService } from '../../../services';

const PetDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchPetDetails = async () => {
      try {
        setLoading(true);
        const { data } = await listingService.getMyListings();
        const foundPet = data?.listings?.find((p) => String(p.id) === String(id));
        setPet(foundPet || null);
      } catch (error) {
        console.error("Error fetching pet details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPetDetails();
  }, [id]);

  if (loading) {
    return (
      <>
        <Header />
        <div className="p-8 text-center text-gray-500 font-medium animate-pulse min-h-screen bg-[#F8F9FD]">
          Pet details Loading...
        </div>
      </>
    );
  }

  if (!pet) {
    return (
      <>
        <Header />
        <div className="p-6 text-center min-h-screen bg-[#F8F9FD] flex flex-col justify-center items-center">
          <p className="text-gray-500 mb-4 font-medium">Pet ki details nahi mili ya yeh listing exist nahi karti.</p>
          <Link to="/vendor/dashboard" className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl text-sm font-semibold shadow-md hover:bg-indigo-700 transition">
            Dashboard Par Wapas Jayein
          </Link>
        </div>
      </>
    );
  }

  const imagesArray = pet.images && pet.images.length > 0 ? pet.images : [];
  
  const getMediaUrl = (img) => {
    if (!img) return 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=800&q=80';
    return img.startsWith('http') ? img : `${import.meta.env.VITE_BASE_URL}${img}`;
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === imagesArray.length - 1 ? 0 : prev + 1));
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === 0 ? imagesArray.length - 1 : prev - 1));
  };

  const serviceCategory = pet.purpose || pet.listingType || pet.listing_type || 'Sell';

  return (
    <>
      <Header />
      <div className="p-2 bg-[#F8F9FD] min-h-screen">
        <div className="max-w-5xl mx-auto mb-6">
          <div className="text-xs text-gray-400 mb-2 flex items-center gap-1">
            <Link to="/vendor/dashboard" className="hover:text-indigo-600 transition">Dashboard</Link>
            <span>/</span>
            <Link to="/vendor/pets" className="hover:text-indigo-600 transition">My Pets</Link>
            <span>/</span>
            <span className="text-gray-600 font-medium truncate">{pet.title || 'Details'}</span>
          </div>
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 font-bold text-sm transition-colors">
            <ArrowLeft size={16} /> Go Back
          </button>
        </div>

        <div className="max-w-7xl mx-auto bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-2">
          
          {/* Left Column */}
          <div className="relative h-64 md:h-auto bg-slate-900 min-h-[420px] group">
            {imagesArray.length > 0 ? (
              (() => {
                const currentMedia = getMediaUrl(imagesArray[currentImageIndex]);
                const isVideo = /\.(mp4|webm|ogg|mov)$/i.test(currentMedia);
                return isVideo ? (
                  <video src={currentMedia} className="w-full h-full object-cover" controls playsInline />
                ) : (
                  <img src={currentMedia} alt={`${pet.title || 'Pet'} - ${currentImageIndex + 1}`} className="w-full h-full object-cover" />
                );
              })()
            ) : (
              <img src={getMediaUrl(null)} alt={pet.title} className="w-full h-full object-cover" />
            )}

            <div className="absolute top-4 left-4 flex flex-col gap-2">
              <span className="bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-xl shadow-md uppercase tracking-wider w-fit">
                {pet.petType || pet.category || 'Pet'}
              </span>
            </div>

            {imagesArray.length > 1 && (
              <>
                <button onClick={prevImage} className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full text-slate-800 hover:bg-white shadow-md transition-all opacity-0 group-hover:opacity-100">
                  <ChevronLeft size={20} />
                </button>
                <button onClick={nextImage} className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full text-slate-800 hover:bg-white shadow-md transition-all opacity-0 group-hover:opacity-100">
                  <ChevronRight size={20} />
                </button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 bg-black/30 px-3 py-1.5 rounded-full backdrop-blur-sm">
                  {imagesArray.map((_, idx) => (
                    <div key={idx} className={`h-2 w-2 rounded-full transition-all ${idx === currentImageIndex ? 'bg-white w-4' : 'bg-white/50'}`} />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Right Column */}
          <div className="p-4 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex justify-between items-start gap-4 mb-2">
                <h2 className="text-2xl font-black text-slate-800 leading-tight">{pet.title || pet.breed}</h2>
                <div className="text-indigo-600 font-black text-2xl flex items-center shrink-0">
                  <IndianRupee size={22} className="stroke-[3]" />
                  <span>{pet.price || pet.mating_fee || 0}</span>
                </div>
              </div>
              <p className="text-sm text-gray-500 font-medium mb-6">Breed: <span className="text-slate-700 font-bold">{pet.breed || 'N/A'}</span></p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-slate-50 p-3 rounded-xl border border-gray-100 flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${pet.gender === 'Female' ? 'bg-pink-100 text-pink-600' : 'bg-blue-100 text-blue-600'}`}>
                    <Tag size={16} />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase">Gender</p>
                    <p className="text-sm font-bold text-slate-700">{pet.gender || 'Male'}</p>
                  </div>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-gray-100 flex items-center gap-3">
                  <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
                    <Calendar size={16} />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase">Age</p>
                    <p className="text-sm font-bold text-slate-700">{pet.age ? `${pet.age}` : 'N/A'}</p>
                  </div>
                </div>

                <div className="bg-indigo-50/50 p-3 rounded-xl border border-indigo-100/50 flex items-center gap-3 col-span-2">
                  <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
                    <Briefcase size={16} />
                  </div>
                  <div>
                    <p className="text-[10px] text-indigo-400 font-bold uppercase">Service Category</p>
                    <p className="text-sm font-black text-indigo-700 uppercase tracking-wide">{serviceCategory}</p>
                  </div>
                </div>
              </div>

              {/* Description Display */}
              {pet.description && (
                <div className="mb-6 bg-slate-50 p-4 rounded-2xl border border-gray-100 text-xs text-slate-600 leading-relaxed">
                  <strong>Description Details:</strong>
                  <p className="mt-1">{pet.description}</p>
                </div>
              )}

              <div className="bg-amber-50/50 border border-amber-100 rounded-2xl p-4 mb-6">
                <div className="flex items-center gap-2 text-amber-800 font-bold text-xs uppercase tracking-wider mb-2">
                  <Activity size={14} />
                  <span>Health Information</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="text-slate-600">
                    <strong>Vaccinated:</strong>{" "}
                    <span className={pet.isVaccinated || pet.vaccinated === 'Yes' || pet.vaccinated === true ? "text-emerald-600 font-bold" : "text-rose-500 font-bold"}>
                      {pet.isVaccinated || pet.vaccinated === 'Yes' || pet.vaccinated === true ? "Yes" : "No"}
                    </span>
                  </div>
                  <div className="text-slate-600">
                    <strong>Health Status:</strong> <span className="text-slate-700 font-semibold">{pet.healthCondition || pet.healthStatus || pet.healthInfo || 'Healthy'}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 border-t border-gray-100 pt-4">
                <div className="flex items-center gap-2.5 text-slate-600 text-sm">
                  <MapPin size={16} className="text-gray-400 shrink-0" />
                  <span><strong>Location:</strong> {pet.city ? `${pet.city}, ${pet.state || ''}` : (pet.location || 'Noida, UP')}</span>
                </div>
                <div className="flex items-center gap-2.5 text-slate-600 text-sm">
                  <ShieldCheck size={16} className="text-gray-400 shrink-0" />
                  <span>
                    <strong>Status:</strong>{' '}
                    <span className={`inline-block text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase ml-1 ${pet.is_approved ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                      {pet.is_approved ? 'Live / Approved' : 'Pending Verification'}
                    </span>
                  </span>
                </div>
              </div>
            </div>

            <button onClick={() => navigate('/vendor/dashboard')} className="w-full bg-indigo-50 hover:bg-indigo-100 text-indigo-600 py-3 rounded-xl font-bold text-sm transition-colors mt-auto">
              Back to Dashboard
            </button>
          </div>

        </div>
      </div>
    </>
  );
};

export default PetDetails;