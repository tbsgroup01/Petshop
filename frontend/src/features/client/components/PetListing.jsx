import React, { useEffect, useState } from "react";
import { MapPin, Heart, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { favoriteService, listingService } from "../../../services";
import { isAuthenticated } from "../../../utils/auth";
import { getPetPath } from "../../../utils/slug";

const PetCard = ({ listing, onToggleFavorite, isFavorited, onOpenDetails }) => {
  const listingTypeLabel =
    listing.listing_type === "mating"
      ? "MEETING"
      : listing.listing_type === "buy"
        ? "DAY CARE"
        : "SELL";

  const formattedPrice = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(listing.price || listing.mating_fee || 0));

  const image = listing?.images?.[0]
    ? `${import.meta.env.VITE_BASE_URL}${listing.images[0]}`
    : "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=800&q=80";

  const isVideo = /\.(mp4|webm|ogg|mov)$/i.test(image);

  return (
    <article
      onClick={() => onOpenDetails(listing.id)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpenDetails(listing.id);
        }
      }}
      role="button"
      tabIndex={0}
      className="bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-md transition-shadow cursor-pointer"
    >
      <div className="relative h-40 sm:h-64 overflow-hidden">
        <span className="absolute top-2 left-2 sm:top-4 sm:left-4 z-10 bg-indigo-600 text-white text-[8px] sm:text-[10px] font-bold px-2 sm:px-3 py-1 rounded-md uppercase tracking-wider shadow">
          {listingTypeLabel}
        </span>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(listing.id);
          }}
          className="absolute top-2 sm:top-4 right-2 sm:right-4 z-10 p-1.5 sm:p-2 bg-white/80 backdrop-blur-sm rounded-full text-indigo-600 hover:bg-white transition-colors"
        >
          <Heart
            size={14}
            className={`sm:w-5 sm:h-5 ${isFavorited ? "fill-indigo-600" : ""}`}
          />
        </button>

        {isVideo ? (
          <video
            src={image}
            className="w-full h-full object-cover"
            muted
            playsInline
            controls
          />
        ) : (
          <div
            role="img"
            aria-label={listing.breed || "Pet image"}
            className="w-full h-full bg-center bg-cover group-hover:scale-105 transition-transform duration-300"
            style={{ backgroundImage: `url("${image}")` }}
          />
        )}
      </div>

      {/* CONTENT */}
      <div className="p-3 sm:p-5">
        {/* CATEGORY & BREED */}
        <div className="mb-2">
          {listing.categories && (
            <p className="text-[10px] sm:text-xs font-semibold text-indigo-500 uppercase tracking-wider mb-0.5">
              {listing.categories}
            </p>
          )}
          <h3 className="text-base sm:text-lg font-bold text-slate-800 line-clamp-1">
            {listing.breed}
          </h3>
        </div>

        {/* AGE & GENDER */}
        <div className="flex items-center gap-2 mb-3">
          {listing.age && (
            <span className="text-[10px] sm:text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full font-medium">
              Age: {listing.age}
            </span>
          )}
          {listing.gender && (
            <span className="text-[10px] sm:text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full font-medium capitalize">
              {listing.gender}
            </span>
          )}
        </div>

        {/* LOCATION */}
        {(listing.city || listing.state) && (
          <div className="flex items-center text-slate-400 text-xs sm:text-sm mb-4">
            <MapPin size={12} className="mr-1" />
            {[listing.city, listing.state].filter(Boolean).join(", ")}
          </div>
        )}

        {/* FOOTER */}
        <div className="flex justify-between items-center border-t border-gray-50 pt-3 sm:pt-4">
          <span className="text-indigo-600 font-bold text-base sm:text-lg">
            {formattedPrice}
          </span>
          <button className="flex items-center text-indigo-600 font-semibold text-xs sm:text-sm hover:translate-x-1 transition-transform">
            View
            <ChevronRight size={14} className="ml-1" />
          </button>
        </div>
      </div>
    </article>
  );
};

const PetListing = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Popular");
  const [pets, setPets] = useState([]);
  const [favorites, setFavorites] = useState(new Set());

  const fetchListings = async (tab) => {
    const filter = tab === "Popular" ? "popular" : "new";
    const [sellRes, meetingRes, dayCareRes] = await Promise.all([
      listingService.getHomeListings({ type: "sell", filter, limit: 8 }),
      listingService.getHomeListings({ type: "meeting", filter, limit: 8 }),
      listingService.getHomeListings({ type: "day care", filter, limit: 8 }),
    ]);

    const combined = [
      ...(sellRes?.data?.listings || []),
      ...(meetingRes?.data?.listings || []),
      ...(dayCareRes?.data?.listings || []),
    ];

    const deduped = Array.from(
      new Map(combined.map((item) => [item.id, item])).values(),
    )
      .sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0))
      .slice(0, 8);

    setPets(deduped);
  };

  const fetchFavorites = async () => {
    if (!isAuthenticated()) return;
    try {
      const { data } = await favoriteService.getFavorites();
      const ids = new Set((data?.favorites || []).map((f) => f.id));
      setFavorites(ids);
    } catch {
      setFavorites(new Set());
    }
  };

  useEffect(() => {
    fetchListings(activeTab).catch(() => setPets([]));
  }, [activeTab]);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const handleToggleFavorite = async (listingId) => {
    if (!isAuthenticated()) return alert("Please login to use favorites");
    const isFav = favorites.has(listingId);
    try {
      if (isFav) await favoriteService.removeFavorite(listingId);
      else await favoriteService.addFavorite(listingId);
      await fetchFavorites();
    } catch (error) {
      alert(error?.response?.data?.message || "Unable to update favorite");
    }
  };

  return (
    <section className="px-3 sm:px-10 lg:px-24 py-12 bg-gray-50/30">
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-3">
          <span className="h-[2px] w-8 bg-indigo-600"></span>
          <h2 className="text-indigo-600 text-xs sm:text-sm font-bold uppercase tracking-[0.2em]">
            Available Pets
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {pets.map((listing) => (
          <PetCard
            key={listing.id}
            listing={listing}
            onToggleFavorite={handleToggleFavorite}
            isFavorited={favorites.has(listing.id)}
            onOpenDetails={(id) => {
              const listing = pets.find((item) => item.id === id);
              if (!listing) return;
              navigate(getPetPath(listing));
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default PetListing;
