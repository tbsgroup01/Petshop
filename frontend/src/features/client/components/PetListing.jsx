import React, { useEffect, useState } from 'react';
import { MapPin, Heart, ChevronRight } from 'lucide-react';
import { favoriteService, listingService } from '../../../services';
import { isAuthenticated } from '../../../utils/auth';

const PetCard = ({ listing, onToggleFavorite, isFavorited }) => {
  const listingTypeLabel = listing.listing_type === 'mating'
    ? 'MEETING'
    : listing.listing_type === 'buy'
      ? 'DAY CARE'
      : 'SELL';

  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(Number(listing.price || listing.mating_fee || 0));

  const image = listing?.images?.[0]
    ? `${import.meta.env.VITE_BASE_URL}${listing.images[0]}`
    : 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=800&q=80';
  const isVideo = /\.(mp4|webm|ogg|mov)$/i.test(image);

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-md transition-shadow">
      <div className="relative h-40 sm:h-64 overflow-hidden">
        {isVideo ? (
          <video src={image} className="w-full h-full object-cover" muted playsInline controls />
        ) : (
          <img src={image} alt={listing.title || listing.breed} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        )}
        <button
          onClick={() => onToggleFavorite(listing.id)}
          className="absolute top-2 sm:top-4 right-2 sm:right-4 p-1.5 sm:p-2 bg-white/80 backdrop-blur-sm rounded-full text-indigo-600 hover:bg-white transition-colors"
        >
          <Heart size={14} className={`sm:w-5 sm:h-5 ${isFavorited ? 'fill-indigo-600' : ''}`} />
        </button>
      </div>

      <div className="p-3 sm:p-5">
        <div className="flex justify-between items-start mb-1 sm:mb-2 gap-2">
          <h3 className="text-base sm:text-lg font-bold text-slate-800 line-clamp-1">{listing.breed}</h3>
          <span className="text-[8px] sm:text-[10px] font-bold px-2 sm:px-2 py-0.5 sm:py-1 rounded uppercase tracking-wider flex-shrink-0 bg-emerald-50 text-emerald-600">
            {listingTypeLabel}
          </span>
        </div>

        <div className="flex items-center text-slate-400 text-xs sm:text-sm mb-4 sm:mb-6">
          <MapPin size={12} className="mr-1" />
          {listing.city}, {listing.state}
        </div>

        <div className="flex justify-between items-center border-t border-gray-50 pt-3 sm:pt-4">
          <span className="text-indigo-600 font-bold text-base sm:text-lg">{formattedPrice}</span>
          <button className="flex items-center text-indigo-600 font-semibold text-xs sm:text-sm hover:translate-x-1 transition-transform">
            View <ChevronRight size={14} className="ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

const PetListing = () => {
  const [activeTab, setActiveTab] = useState('Popular');
  const [pets, setPets] = useState([]);
  const [favorites, setFavorites] = useState(new Set());

  const fetchListings = async (tab) => {
    const filter = tab === 'Popular' ? 'popular' : 'new';
    const [sellRes, meetingRes, dayCareRes] = await Promise.all([
      listingService.getHomeListings({ type: 'sell', filter, limit: 8 }),
      listingService.getHomeListings({ type: 'meeting', filter, limit: 8 }),
      listingService.getHomeListings({ type: 'day care', filter, limit: 8 }),
    ]);

    const combined = [
      ...(sellRes?.data?.listings || []),
      ...(meetingRes?.data?.listings || []),
      ...(dayCareRes?.data?.listings || []),
    ];

    const deduped = Array.from(new Map(combined.map((item) => [item.id, item])).values())
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
    if (!isAuthenticated()) return alert('Please login to use favorites');

    const isFav = favorites.has(listingId);
    try {
      if (isFav) {
        await favoriteService.removeFavorite(listingId);
      } else {
        await favoriteService.addFavorite(listingId);
      }
      await fetchFavorites();
    } catch (error) {
      alert(error?.response?.data?.message || 'Unable to update favorite');
    }
  };

  return (
    <section className="px-4 sm:px-10 lg:px-24 py-12 bg-gray-50/30">
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-3">
          <span className="h-[2px] w-8 bg-indigo-600"></span>
          <h2 className="text-indigo-600 text-xs sm:text-sm font-bold uppercase tracking-[0.2em]">Available Pets</h2>
        </div>

        <div className="flex items-center justify-between border-b border-gray-200 overflow-x-auto no-scrollbar">
          <div className="flex space-x-6 sm:space-x-10">
            {['Popular', 'New'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 text-sm sm:text-base font-bold transition-all relative ${
                  activeTab === tab ? 'text-slate-900' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {tab}
                {activeTab === tab && <span className="absolute bottom-0 left-0 w-full h-[3px] bg-indigo-600 rounded-full"></span>}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {pets.map((listing) => (
          <PetCard
            key={listing.id}
            listing={listing}
            onToggleFavorite={handleToggleFavorite}
            isFavorited={favorites.has(listing.id)}
          />
        ))}
      </div>
    </section>
  );
};

export default PetListing;
