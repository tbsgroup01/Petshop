import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, Dog, MessageSquare, Heart } from 'lucide-react';
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
    return pets.filter((p) => String(p.title || '').toLowerCase().includes(q) || String(p.breed || '').toLowerCase().includes(q));
  }, [pets, search]);

  const totalInquiries = pets.reduce((s, p) => s + Number(p.favorite_count || 0), 0);
  const totalActive = pets.filter((p) => p.is_approved && p.status === 'active').length;

  return (
    <>
      <Header />

      <div className="p-8 overflow-y-auto">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h2 className="text-2xl font-bold">Vendor Dashboard</h2>
            <p className="text-gray-500">
              Live data from backend listings. {lastUpdated ? `Last updated: ${lastUpdated.toLocaleTimeString()}` : ''}
            </p>
          </div>
          <Link to="/vendor/add-pets" className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-medium flex items-center gap-2 hover:bg-indigo-700">
            <PlusCircle size={18} /> Add New Pet
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard label="Total Pets" value={pets.length} icon={<Dog className="text-indigo-600" />} />
          <StatCard label="Active Listings" value={totalActive} icon={<Heart className="text-emerald-500" />} />
          <StatCard label="Total Favorites" value={totalInquiries} icon={<MessageSquare className="text-purple-500" />} />
          <StatCard label="Draft/Unapproved" value={pets.length - totalActive} icon={<Dog className="text-orange-500" />} />
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg">My Listings</h3>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title or breed"
              className="px-3 py-2 rounded-lg border border-gray-200 text-sm"
            />
          </div>

          {loading ? (
            <div className="text-sm text-gray-500">Loading listings...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredPets.map((p) => {
                const media = p.images?.[0] ? `${import.meta.env.VITE_BASE_URL}${p.images[0]}` : 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=800&q=80';
                const isVideo = /\.(mp4|webm|ogg|mov)$/i.test(media);
                return (
                <div key={p.id} className="border border-gray-100 rounded-2xl overflow-hidden">
                  <div className="relative h-40">
                    {isVideo ? (
                      <video src={media} className="w-full h-full object-cover" muted playsInline controls />
                    ) : (
                      <img
                        src={media}
                        alt={p.title}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold text-sm">{p.title}</h4>
                    <p className="text-xs text-gray-500">{p.breed}</p>
                    <p className="text-xs mt-2 text-indigo-600 font-bold">? {p.price || p.mating_fee || 0}</p>
                  </div>
                </div>
              )})}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const StatCard = ({ label, value, icon }) => (
  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
    <div className="flex justify-between items-start mb-4">
      <div className="p-2.5 bg-gray-50 rounded-xl">{icon}</div>
    </div>
    <p className="text-gray-400 text-sm font-medium">{label}</p>
    <h4 className="text-3xl font-bold mt-1">{value}</h4>
  </div>
);

export default Dashboard;
