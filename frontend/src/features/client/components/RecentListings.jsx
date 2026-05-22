import React, { useEffect, useState } from "react";
import { ArrowRight, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { listingService } from "../../../services";
import { getPetPath } from "../../../utils/slug";

const fallbackImage =
  "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=800&q=80";

const RecentCard = ({ title, subtitle, location, image, onOpenDetails }) => (
  <div className="bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full">
    <div className="relative w-full aspect-[4/3] sm:h-64 overflow-hidden">
      <div
        role="img"
        aria-label={title || "Pet image"}
        className="absolute inset-0 w-full h-full bg-center bg-cover transition-transform duration-500 hover:scale-105"
        style={{ backgroundImage: `url("${image}")` }}
      />
      <div className="absolute top-2 left-2 sm:top-4 sm:left-4 bg-[#4F46E5] text-white text-[8px] sm:text-[10px] font-bold px-2 sm:px-3 py-0.5 sm:py-1 rounded-md tracking-wider uppercase shadow-sm z-10">
        Recent
      </div>
    </div>

    <div className="p-4 sm:p-6 flex flex-col flex-grow">
      <h3 className="text-slate-800 font-bold text-base sm:text-lg mb-1 line-clamp-1">{title}</h3>
      <p className="text-slate-400 text-xs sm:text-sm mb-4 sm:mb-6 line-clamp-1">{subtitle}</p>
      <p className="text-slate-500 text-xs sm:text-sm flex items-center gap-1 mb-4 sm:mb-6">
        <MapPin size={14} className="text-rose-400" /> {location}
      </p>

      <button
        onClick={onOpenDetails}
        className="w-full py-2 sm:py-3 rounded-lg sm:rounded-xl font-bold text-xs sm:text-sm transition-all mt-auto bg-indigo-50/50 text-[#4F46E5] border border-indigo-100 hover:bg-indigo-100"
      >
        View Details
      </button>
    </div>
  </div>
);

const RecentListings = () => {
  const navigate = useNavigate();
  const [listings, setListings] = useState([]);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        const [sellRes, meetingRes, dayCareRes] = await Promise.all([
          listingService.getHomeListings({ type: "sell", filter: "new", limit: 8 }),
          listingService.getHomeListings({ type: "meeting", filter: "new", limit: 8 }),
          listingService.getHomeListings({ type: "day care", filter: "new", limit: 8 }),
        ]);

        const combined = [
          ...(sellRes?.data?.listings || []),
          ...(meetingRes?.data?.listings || []),
          ...(dayCareRes?.data?.listings || []),
        ];

        const deduped = Array.from(new Map(combined.map((item) => [item.id, item])).values())
          .sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0))
          .slice(0, 8);

        if (!mounted) return;
        setListings(deduped);
      } catch {
        if (!mounted) return;
        setListings([]);
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
      <div className="w-full">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8 sm:mb-10">
          <h2 className="text-slate-800 text-lg sm:text-xl font-bold">Recent Listings</h2>
          <button
            onClick={() => navigate("/dog")}
            className="flex items-center text-indigo-600 font-semibold text-xs sm:text-sm hover:gap-2 transition-all"
          >
            View all <ArrowRight size={16} className="ml-1" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {listings.map((pet) => (
            <RecentCard
              key={pet.id}
              title={pet.title || pet.breed || "Pet Listing"}
              subtitle={
                [pet.breed, pet.age ? `${pet.age} Years` : null].filter(Boolean).join(" • ") ||
                "Verified Listing"
              }
              location={[pet.city, pet.state].filter(Boolean).join(", ") || "Location unavailable"}
              image={pet.images?.[0] ? `${import.meta.env.VITE_BASE_URL}${pet.images[0]}` : fallbackImage}
              onOpenDetails={() => navigate(getPetPath(pet))}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentListings;
