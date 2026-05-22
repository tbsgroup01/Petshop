import React, { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { listingService } from "../../../services";
import { getPetPath } from "../../../utils/slug";

const fallbackImage =
  "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=800&q=80";

const MeetingCard = ({ breed, traits, age, image, isPromoted, onOpenDetails }) => (
  <div className="bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full">
    {/* Image Section - Updated Height & Object Fit */}
    <div className="relative h-48 sm:h-64 overflow-hidden">
      <div
        role="img"
        aria-label={breed || "Pet image"}
        className="w-full h-full bg-center bg-cover transition-transform duration-500 hover:scale-105"
        style={{ backgroundImage: `url("${image}")` }}
      />
      {/* Meeting Badge */}
      <div className="absolute top-2 left-2 sm:top-4 sm:left-4 bg-[#4F46E5] text-white text-[8px] sm:text-[10px] font-bold px-2 sm:px-3 py-0.5 sm:py-1 rounded-md tracking-wider uppercase shadow-sm">
        Meeting
      </div>
    </div>

    {/* Info Section */}
    <div className="p-4 sm:p-6 flex flex-col flex-grow">
      <h3 className="text-slate-800 font-bold text-base sm:text-lg mb-1">{breed}</h3>
      <p className="text-slate-400 text-xs sm:text-sm mb-4 sm:mb-6">
        {traits} • {age}
      </p>

      {/* Conditional Button Styling */}
      <button
        onClick={onOpenDetails}
        className={`w-full py-2 sm:py-3 rounded-lg sm:rounded-xl font-bold text-xs sm:text-sm transition-all mt-auto ${
        isPromoted 
          ? 'bg-[#4F46E5] text-white hover:bg-indigo-700' 
          : 'bg-indigo-50/50 text-[#4F46E5] border border-indigo-100 hover:bg-indigo-100'
      }`}>
        Contact Breeder
      </button>
    </div>
  </div>
);

const MeetingSection = () => {
  const navigate = useNavigate();
  const [meetingPets, setMeetingPets] = useState([]);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        const { data } = await listingService.getHomeListings({
          type: "meeting",
          filter: "popular",
          limit: 8,
        });

        if (!mounted) return;
        setMeetingPets(data?.listings || []);
      } catch {
        if (!mounted) return;
        setMeetingPets([]);
      }
    };

    load();
    const timer = setInterval(load, 15000);

    return () => {
      mounted = false;
      clearInterval(timer);
    };
  }, []);

  return (
    <section className="px-3 sm:px-6 md:px-10 py-12 sm:py-16 bg-white">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 sm:mb-10 gap-4 w-full">
        <h2 className="text-slate-800 font-semibold text-lg sm:text-2xl">Pets Available for Meeting</h2>
        <button
          onClick={() => navigate("/services/mating-services")}
          className="flex items-center text-indigo-600 font-semibold text-xs sm:text-sm hover:gap-2 transition-all flex-shrink-0"
        >
          View all <ArrowRight size={16} className="ml-1" />
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 w-full">
        {meetingPets.map((pet) => (
          <MeetingCard
            key={pet.id}
            breed={pet.breed || pet.title || "Pet"}
            traits={pet.bloodline || "Verified Match"}
            age={pet.age ? `${pet.age} Years Old` : "Age N/A"}
            image={pet.images?.[0] ? `${import.meta.env.VITE_BASE_URL}${pet.images[0]}` : fallbackImage}
            isPromoted={Boolean(pet.is_approved)}
            onOpenDetails={() => navigate(getPetPath(pet))}
          />
        ))}
      </div>
    </section>
  );
};

export default MeetingSection;
