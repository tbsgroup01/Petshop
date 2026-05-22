import React, { useEffect, useMemo, useState } from 'react';
import { Search, Users, Calendar, Plus, AlertCircle } from 'lucide-react';
import Header from '../Components/Header';
import { listingService } from '../../../services';

const PetCare = () => {
  const [listings, setListings] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [lastUpdated, setLastUpdated] = useState(null);

  const [bookings, setBookings] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedService, setSelectedService] = useState('Daycare');
  const [selectedPetId, setSelectedPetId] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [notes, setNotes] = useState('');

  const loadListings = async () => {
    try {
      setError('');
      const { data } = await listingService.getMyListings();
      setListings(data?.listings || []);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to load pet care data');
      setListings([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let mounted = true;
    const run = async () => {
      if (!mounted) return;
      await loadListings();
    };

    run();
    const interval = setInterval(run, 15000);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  const filteredPets = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return listings;

    return listings.filter((pet) =>
      String(pet.title || '').toLowerCase().includes(q) ||
      String(pet.breed || '').toLowerCase().includes(q)
    );
  }, [listings, query]);

  const openBookingModal = (service) => {
    setSelectedService(service);
    setSelectedPetId(filteredPets[0]?.id ? String(filteredPets[0].id) : '');
    setBookingDate('');
    setNotes('');
    setShowModal(true);
  };

  const handleSubmitBooking = () => {
    const selectedPet = listings.find((pet) => String(pet.id) === selectedPetId);
    if (!selectedPet) {
      alert('Please select a pet');
      return;
    }

    const newBooking = {
      id: Date.now(),
      petTitle: selectedPet.title,
      breed: selectedPet.breed,
      service: selectedService,
      date: bookingDate || new Date().toLocaleString(),
      time: bookingTime || new Date().toLocaleTimeString(),
      status: 'Confirmed',
      notes,
    };

    setBookings((prev) => [newBooking, ...prev]);
    setShowModal(false);
  };

  return (
    <>
      <Header />

      <div className="p-8 overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">Pet Care</h2>
            <p className="text-slate-500 mt-1">
              Live vendor pets are synced here. {lastUpdated ? `Last updated: ${lastUpdated.toLocaleTimeString()}` : ''}
            </p>
          </div>
          <button className="flex items-center gap-2 px-3 py-1.5 border border-rose-100 bg-rose-50 text-rose-500 rounded-full text-xs font-bold">
            <AlertCircle size={14} /> Emergency
          </button>
        </div>

        {error && (
          <div className="mb-5 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {error}
          </div>
        )}

        <div className="relative w-full max-w-lg mb-8">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search your pets..."
            className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <ServiceCard icon={<Users className="text-indigo-600" size={24} />} title="Daycare" onClick={() => openBookingModal('Daycare')} />
          <ServiceCard icon={<Calendar className="text-indigo-600" size={24} />} title="Meeting" onClick={() => openBookingModal('Meeting')} />
        </div>

        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold">Registered Pets (Live)</h3>
            <span className="text-sm text-gray-500">{loading ? 'Loading...' : `${filteredPets.length} pets`}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {filteredPets.map((pet) => (
              <div key={pet.id} className="bg-white p-3 rounded-2xl border border-gray-100 shadow-sm">
                <div className="h-36 rounded-xl overflow-hidden mb-3">
                  <img
                    src={pet.images?.[0] ? `${import.meta.env.VITE_BASE_URL}${pet.images[0]}` : 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=800&q=80'}
                    alt={pet.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="font-bold text-sm text-slate-800">{pet.title}</h4>
                <p className="text-xs text-gray-500">{pet.breed}</p>
              </div>
            ))}

            <a href="/vendor/add-pets" className="border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center p-6 text-center bg-gray-50/50 hover:bg-indigo-50/30 transition">
              <div className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-400 mb-3 bg-white">
                <Plus size={18} />
              </div>
              <p className="text-xs font-bold text-slate-600">Add New Pet</p>
            </a>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 overflow-x-auto">
          <h3 className="text-xl font-bold mb-4">Upcoming Bookings</h3>
          <table className="w-full text-left min-w-[700px]">
            <thead>
              <tr className="text-[11px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50">
                <th className="pb-4">Pet</th>
                <th className="pb-4">Breed</th>
                <th className="pb-4">Service</th>
                <th className="pb-4">Date</th>
                <th className="pb-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {bookings.map((booking) => (
                <tr key={booking.id}>
                  <td className="py-4 text-sm font-bold text-slate-800">{booking.petTitle}</td>
                  <td className="py-4 text-sm text-slate-600">{booking.breed}</td>
                  <td className="py-4 text-sm text-slate-600">{booking.service}</td>
                  <td className="py-4 text-sm text-slate-600">{booking.date}</td>
                  <td className="py-4 text-sm"><span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-xs font-bold">Confirmed</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
            <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-xl font-bold">Book {selectedService}</h3>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="text-sm font-bold text-slate-700">Select Pet</label>
                  <select value={selectedPetId} onChange={(e) => setSelectedPetId(e.target.value)} className="mt-2 w-full p-3 bg-gray-50 rounded-xl border border-gray-200">
                    {listings.map((pet) => (
                      <option key={pet.id} value={pet.id}>{pet.title} - {pet.breed}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-sm font-bold text-slate-700">Date / Time</label>
                  <input type='date' value={bookingDate} onChange={(e) => setBookingDate(e.target.value)} className="mt-2 w-full p-3 bg-gray-50 rounded-xl border border-gray-200" placeholder="May 20, 2026 11:00 AM" />
                  <input type="time" value={bookingTime} onChange={(e) => setBookingTime(e.target.value)} className="mt-2 w-full p-3 bg-gray-50 rounded-xl border border-gray-200" />
                
                
                </div>

                <div>
                  <label className="text-sm font-bold text-slate-700">Notes</label>
                  <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} className="mt-2 w-full p-3 bg-gray-50 rounded-xl border border-gray-200" />
                </div>
              </div>
              <div className="p-6 border-t border-gray-100 flex justify-end gap-3">
                <button onClick={() => setShowModal(false)} className="px-4 py-2 rounded-xl border border-gray-200 text-sm font-bold text-gray-500">Cancel</button>
                <button onClick={handleSubmitBooking} className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-bold">Confirm</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

const ServiceCard = ({ icon, title, onClick }) => (
  <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm text-center flex flex-col items-center">
    <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center mb-4">{icon}</div>
    <h4 className="text-lg font-bold mb-4">{title}</h4>
    <button onClick={onClick} className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold text-sm">Book Now</button>
  </div>
);

export default PetCare;
