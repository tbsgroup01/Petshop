import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, Dog, MapPin, Trash2 } from 'lucide-react';
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

  const handleDelete = async (id) => {
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

      <div className="p-8 overflow-y-auto">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">My Pets</h2>
            <p className="text-slate-500 mt-1">
              Manage and track your clinic's current pet listings.
              {lastUpdated ? ` Last updated: ${lastUpdated.toLocaleTimeString()}` : ''}
            </p>
          </div>
          <Link to="/vendor/add-pets" className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition">
            <PlusCircle size={18} /> Add New Pet
          </Link>
        </div>

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
          <div className="text-sm text-slate-500">Loading listings...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {visiblePets.map((pet) => (
              (() => {
                const media = pet.images?.[0] ? `${import.meta.env.VITE_BASE_URL}${pet.images[0]}` : 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=800&q=80';
                const isVideo = /\.(mp4|webm|ogg|mov)$/i.test(media);
                return (
              <div key={pet.id} className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
                <div className="relative h-48">
                  {isVideo ? (
                    <video src={media} className="w-full h-full object-cover" muted playsInline controls />
                  ) : (
                    <img
                      src={media}
                      alt={pet.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                  <span className={`absolute top-4 left-4 ${getStatusStyle(pet)} text-white text-[10px] font-bold px-2.5 py-1 rounded-lg shadow-sm uppercase`}>
                    {getStatusLabel(pet)}
                  </span>
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="text-lg font-bold text-slate-800">{pet.title}</h4>
                    <span className="text-indigo-600 font-extrabold text-lg">? {pet.price || pet.mating_fee || 0}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-gray-400 mb-4">
                    <Dog size={14} />
                    <span className="text-xs font-semibold">{pet.breed}</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-bold text-gray-400 uppercase tracking-tight mb-4">
                    <div className="flex items-center gap-1">
                      <MapPin size={12} className="text-gray-300" />
                      {pet.city}, {pet.state}
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(pet.id)}
                    className="w-full bg-red-50 text-red-600 py-2 rounded-xl text-sm font-bold flex items-center justify-center gap-2"
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </div>
              </div>
                );
              })()
            ))}

            <Link to="/vendor/add-pets" className="border-2 border-dashed border-gray-200 rounded-3xl flex flex-col items-center justify-center p-8 text-center bg-gray-50/50 hover:bg-indigo-50/30 transition cursor-pointer">
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

