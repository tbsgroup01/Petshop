import React, { useEffect, useMemo, useState } from "react";
import {
  PlusCircle,
  BarChart3,
  Search,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Heart,
  Scissors,
  Syringe,
  Home,
} from "lucide-react";
import Header from "../Components/Header";
import { listingService } from "../../../services";

const getBookingStatus = (listing) => {
  if (!listing.is_approved) return "Upcoming";
  if (listing.status === "sold") return "Completed";
  if (listing.status === "inactive") return "Cancelled";
  return "Upcoming";
};

const getStatusColor = (status) => {
  if (status === "Completed") return "bg-emerald-50 text-emerald-600";
  if (status === "Cancelled") return "bg-rose-50 text-rose-500";
  return "bg-indigo-50 text-indigo-600";
};

const getServiceMeta = (listingType) => {
  if (listingType === "mating") return { name: "Breeding Consultation", icon: <Heart size={14} /> };
  return { name: "General Care", icon: <Scissors size={14} /> };
};

const BookingHistory = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [lastUpdated, setLastUpdated] = useState(null);

  const loadData = async () => {
    try {
      setError("");
      const { data } = await listingService.getMyListings();
      const listings = data?.listings || [];

      const mapped = listings.map((item) => {
        const status = getBookingStatus(item);
        const service = getServiceMeta(item.listing_type);
        return {
          id: item.id,
          img: item.images?.[0]
            ? `${import.meta.env.VITE_BASE_URL}${item.images[0]}`
            : "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=100",
          name: item.title || item.breed || "Pet",
          breed: item.breed || "Unknown",
          service: service.name,
          sIcon: service.icon,
          date: item.created_at ? new Date(item.created_at).toLocaleDateString() : "-",
          time: item.updated_at ? new Date(item.updated_at).toLocaleTimeString() : "-",
          status,
          sColor: getStatusColor(status),
          amount: Number(item.price || item.mating_fee || 0),
        };
      });

      setRecords(mapped);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to fetch booking history");
      setRecords([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let mounted = true;
    const run = async () => {
      if (!mounted) return;
      await loadData();
    };

    run();
    const interval = setInterval(run, 15000);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  const filteredBookings = useMemo(() => {
    return records.filter((b) => {
      const matchesTab = activeTab === "All" || b.status === activeTab;
      const matchesSearch =
        b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.breed.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesTab && matchesSearch;
    });
  }, [records, activeTab, searchQuery]);

  const stats = useMemo(() => {
    const total = records.length;
    const upcoming = records.filter((r) => r.status === "Upcoming").length;
    const completed = records.filter((r) => r.status === "Completed").length;
    const revenue = records
      .filter((r) => r.status === "Completed")
      .reduce((sum, r) => sum + r.amount, 0);

    return { total, upcoming, completed, revenue };
  }, [records]);

  return (
    <div className="flex min-h-screen bg-[#F8F9FD] text-slate-800 font-sans pb-12">
      <main className="flex-1 flex flex-col">
        <Header />

        <div className="p-8 space-y-8">
          <div className="relative w-full max-w-lg">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search appointments, pets, or owners..."
              className="w-full pl-10 pr-4 py-2 bg-white rounded-lg text-sm border border-gray-200 focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex justify-between items-end">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Booking History</h2>
              <p className="text-gray-500 mt-1 text-sm">
                Dynamic vendor-side history from live backend listings.
                {lastUpdated ? ` Last updated: ${lastUpdated.toLocaleTimeString()}` : ""}
              </p>
            </div>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-indigo-100">
              <PlusCircle size={18} /> New Booking
            </button>
          </div>

          {error && (
            <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatBox label="TOTAL BOOKINGS" value={stats.total} change="Live" icon={<CalendarDays className="text-indigo-500" size={16} />} />
            <StatBox label="UPCOMING" value={stats.upcoming} change="Current" icon={<CalendarDays className="text-indigo-500" size={16} />} />
            <StatBox label="COMPLETED" value={stats.completed} change="Synced" icon={<CheckCircle2 className="text-emerald-500" size={16} />} />
            <StatBox label="REVENUE" value={`?${stats.revenue.toLocaleString("en-IN")}`} change="From completed" icon={<BarChart3 className="text-emerald-500" size={16} />} />
          </div>

          <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-4 flex flex-wrap items-center justify-between gap-4 border-b border-gray-50">
              <div className="bg-gray-50 p-1 rounded-2xl flex gap-1">
                {["All", "Upcoming", "Completed", "Cancelled"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                      activeTab === tab ? "bg-white text-indigo-600 shadow-sm" : "text-gray-400 hover:text-gray-600"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {loading ? (
              <div className="p-8 text-sm text-gray-500">Loading booking history...</div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                        <th className="px-8 py-5 text-left">Pet</th>
                        <th className="px-8 py-5 text-left">Service</th>
                        <th className="px-8 py-5 text-left">Dates</th>
                        <th className="px-8 py-5 text-left">Status</th>
                        <th className="px-8 py-5 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {filteredBookings.map((b) => (
                        <TableRow key={b.id} {...b} />
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="p-6 flex items-center justify-between border-t border-gray-50">
                  <p className="text-xs font-bold text-gray-400">Showing {filteredBookings.length} live entries</p>
                  <div className="flex items-center gap-1">
                    <button className="p-2 hover:bg-gray-50 rounded-lg text-gray-400"><ChevronLeft size={16} /></button>
                    <button className="w-8 h-8 rounded-lg bg-indigo-600 text-white text-xs font-bold">1</button>
                    <button className="p-2 hover:bg-gray-50 rounded-lg text-gray-400"><ChevronRight size={16} /></button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

const StatBox = ({ label, value, change, icon }) => (
  <div className="bg-white p-6 rounded-[28px] border border-gray-100 shadow-sm flex flex-col justify-between">
    <div className="flex justify-between items-center mb-4">
      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{label}</span>
      <div className="p-2 bg-gray-50 rounded-lg">{icon}</div>
    </div>
    <div>
      <h4 className="text-2xl font-bold text-slate-800">{value}</h4>
      <p className="text-[10px] text-emerald-500 font-semibold mt-1">{change}</p>
    </div>
  </div>
);

const TableRow = ({ img, name, breed, service, sIcon, date, time, status, sColor }) => (
  <tr className="hover:bg-gray-50/50 transition-colors group">
    <td className="px-8 py-4">
      <div className="flex items-center gap-3">
        <img src={img} className="w-10 h-10 rounded-xl object-cover border border-gray-100 shadow-sm" alt={name} />
        <div>
          <p className="font-bold text-sm text-slate-800">{name}</p>
          <p className="text-[11px] text-gray-400 font-medium">{breed}</p>
        </div>
      </div>
    </td>
    <td className="px-8 py-4">
      <div className="flex items-center gap-2 text-sm font-semibold text-slate-600">
        <span className="p-1.5 bg-gray-50 rounded-lg text-indigo-600">{sIcon}</span>
        {service}
      </div>
    </td>
    <td className="px-8 py-4">
      <p className="font-bold text-sm text-slate-800">{date}</p>
      <p className="text-[11px] text-gray-400 font-medium">{time}</p>
    </td>
    <td className="px-8 py-4">
      <span className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-wide ${sColor}`}>{status}</span>
    </td>
    <td className="px-8 py-4 text-right">
      <button className="text-indigo-600 text-xs font-bold hover:underline">View Details</button>
    </td>
  </tr>
);

export default BookingHistory;
