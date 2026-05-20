import React, { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, RotateCcw, Star } from "lucide-react";
import { adminService } from '../../../services';
import { useNavigate } from "react-router-dom";

const PetListings = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("All Listings");
  const [currentPage, setCurrentPage] = useState(1);
  const [allListings, setAllListings] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [ownerFilter, setOwnerFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [lastUpdated, setLastUpdated] = useState(null);
  const itemsPerPage = 6;

  const loadListings = async () => {
    try {
      setError("");
      const { data } = await adminService.getAllListings();
      setAllListings(data?.listings || []);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to fetch listings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let mounted = true;

    const fetchLive = async () => {
      if (!mounted) return;
      await loadListings();
    };

    fetchLive();
    const interval = setInterval(fetchLive, 15000);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  const ownerOptions = useMemo(() => {
    const owners = allListings.map((l) => l.owner_name || l.owner?.name).filter(Boolean);
    return Array.from(new Set(owners));
  }, [allListings]);

  const filteredListings = useMemo(() => {
    const q = search.trim().toLowerCase();

    return allListings.filter((listing) => {
      const title = String(listing.title || "").toLowerCase();
      const breed = String(listing.breed || "").toLowerCase();
      const owner = String(listing.owner_name || listing.owner?.name || "").toLowerCase();
      const listingStatus = String(listing.status || "pending").toLowerCase();
      const listingType = String(listing.listing_type || "").toLowerCase();

      const matchesSearch =
        !q ||
        title.includes(q) ||
        breed.includes(q) ||
        owner.includes(q);

      const matchesStatus = statusFilter === "all" || listingStatus === statusFilter;
      const matchesType = typeFilter === "all" || listingType === typeFilter;
      const matchesOwner =
        ownerFilter === "all" ||
        owner === String(ownerFilter).toLowerCase();

      return matchesSearch && matchesStatus && matchesType && matchesOwner;
    });
  }, [allListings, ownerFilter, search, statusFilter, typeFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredListings.length / itemsPerPage));

  const paginatedListings = filteredListings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
    setCurrentPage(1);
  };

  const handleFilterChange = (setter) => (event) => {
    setter(event.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (pageNum) => {
    if (pageNum < 1 || pageNum > totalPages) return;
    setCurrentPage(pageNum);
  };

  const approve = async (id) => {
    try {
      await adminService.approveListing(id, { notes: 'Approved by admin' });
      await loadListings();
    } catch (error) {
      alert(error?.response?.data?.message || 'Approve failed');
    }
  };

  const markAsSold = async (id) => {
    try {
      await adminService.changeListingStatus(id, { status: "sold" });
      await loadListings();
    } catch (error) {
      alert(error?.response?.data?.message || "Mark as sold failed");
    }
  };

  const reject = async (id) => {
    try {
      await adminService.rejectListing(id, { reason: 'Rejected by admin' });
      await loadListings();
    } catch (error) {
      alert(error?.response?.data?.message || 'Reject failed');
    }
  };

  const toggleFeatured = async (id, current) => {
    try {
      await adminService.toggleHomeVisibility(id, { isVisible: !current });
      await loadListings();
    } catch (error) {
      alert(error?.response?.data?.message || 'Failed to update visibility');
    }
  };

  const remove = async (id) => {
    if (!window.confirm('Delete listing permanently?')) return;
    try {
      await adminService.deleteListing(id);
      await loadListings();
    } catch (error) {
      alert(error?.response?.data?.message || 'Delete failed');
    }
  };

  return (
    <div className="p-4 sm:p-10 bg-slate-50 font-sans overflow-hidden">
      <div className="mb-4 flex items-center justify-between">
        <div className="text-xs text-slate-500">
          {loading
            ? "Loading listings..."
            : lastUpdated
              ? `Last updated: ${lastUpdated.toLocaleTimeString()}`
              : ""}
        </div>
        {error && <div className="text-xs font-semibold text-rose-600">{error}</div>}
      </div>

      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5 mb-8">
        <div className="w-full">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">Pet Listings</h1>
          <p className="text-slate-500 leading-relaxed text-sm sm:text-base max-w-2xl">Manage and moderate marketplace listings.</p>
        </div>
      </div>

      <div className="overflow-x-auto scrollbar-hide mb-6">
        <div className="bg-white p-1.5 rounded-2xl inline-flex gap-1 border border-slate-100 shadow-sm min-w-max">
          {["All Listings"].map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                activeTab === tab ? "bg-[#7c74f5] text-white" : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
        <input
          value={search}
          onChange={handleFilterChange(setSearch)}
          placeholder="Search by title, breed, owner..."
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-indigo-400"
        />
        <select
          value={statusFilter}
          onChange={handleFilterChange(setStatusFilter)}
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-indigo-400"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="active">Active</option>
          <option value="sold">Sold</option>
          <option value="inactive">Inactive</option>
        </select>
        <select
          value={typeFilter}
          onChange={handleFilterChange(setTypeFilter)}
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-indigo-400"
        >
          <option value="all">All Types</option>
          <option value="sell">Sell</option>
          <option value="mating">Mating</option>
          <option value="buy">Buy</option>
        </select>
        <select
          value={ownerFilter}
          onChange={handleFilterChange(setOwnerFilter)}
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-indigo-400"
        >
          <option value="all">All Owners</option>
          {ownerOptions.map((owner) => (
            <option key={owner} value={owner}>
              {owner}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {paginatedListings.map((listing) => (
          <div key={listing.id} className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100">
            {(() => {
              const isApproved = Boolean(listing.is_approved) || ["active", "sold"].includes(String(listing.status || "").toLowerCase());
              const isSold = String(listing.status || "").toLowerCase() === "sold";
              return (
                <>
            <div className="flex gap-4">
              {(() => {
                const media = listing.images?.[0]
                  ? `${import.meta.env.VITE_BASE_URL}${listing.images[0]}`
                  : 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=800&q=80';
                const isVideo = /\.(mp4|webm|ogg|mov)$/i.test(media);

                if (isVideo) {
                  return <video src={media} className="w-20 h-20 rounded-2xl object-cover" muted playsInline controls />;
                }

                return (
                  <img
                    src={media}
                    alt={listing.title}
                    className="w-20 h-20 rounded-2xl object-cover"
                  />
                );
              })()}

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="font-bold text-lg text-slate-800">{listing.title}</h2>
                    <p className="text-sm text-slate-400">{listing.breed}</p>
                  </div>

                  <span className="bg-indigo-100 text-indigo-400 px-4 py-1 rounded-full text-xs font-bold uppercase">
                    {listing.status || 'pending'}
                  </span>
                </div>

                <button
                  onClick={() => navigate(`/admin/vendor-details/${listing.owner_id || listing.user_id}`)}
                  className="text-[#5e5adb] font-semibold mt-2 text-sm hover:underline"
                >
                  Owner: {listing.owner_name || listing.owner?.name || '-'}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-5">
              <div>
                <p className="text-xs text-slate-400 mb-1">Price</p>
                <p className="font-bold text-slate-700">₹ {listing.price || listing.mating_fee || 0}</p>
              </div>

              <div>
                <p className="text-xs text-slate-400 mb-1">Date Listed</p>
                <p className="font-medium text-slate-600 text-sm">{new Date(listing.created_at).toLocaleDateString()}</p>
              </div>
            </div>

            <div className="mt-5 flex flex-col sm:flex-row gap-3">
              {!isApproved && (
                <button onClick={() => approve(listing.id)} className="bg-[#4d41df] text-white py-2 rounded-xl text-sm font-bold w-full">Approve</button>
              )}
              {!isSold && (
                <button onClick={() => reject(listing.id)} className="border border-red-400 text-red-500 py-2 rounded-xl text-sm font-bold w-full">Reject</button>
              )}
              {isApproved && !isSold && (
                <button onClick={() => markAsSold(listing.id)} className="border border-emerald-400 text-emerald-600 py-2 rounded-xl text-sm font-bold w-full">
                  Sell
                </button>
              )}
            </div>
                </>
              );
            })()}
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-between items-center">
        <p className="text-slate-500 font-medium text-sm text-center sm:text-left">
          Showing {Math.min((currentPage - 1) * itemsPerPage + 1, filteredListings.length)} to {Math.min(currentPage * itemsPerPage, filteredListings.length)} of {filteredListings.length} listings
        </p>

        <div className="flex items-center gap-2 flex-wrap justify-center">
          <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="p-2 text-slate-300 hover:text-slate-500 border border-slate-100 rounded-lg disabled:opacity-50">
            <ChevronLeft size={20} />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => handlePageChange(pageNum)}
              className={`w-9 h-9 rounded-lg font-bold text-sm transition-all ${currentPage === pageNum ? "bg-[#5e5adb] text-white" : "text-slate-500 hover:bg-slate-50"}`}
            >
              {pageNum}
            </button>
          ))}

          <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="p-2 text-slate-400 hover:text-slate-600 border border-slate-200 rounded-lg disabled:opacity-50">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PetListings;
