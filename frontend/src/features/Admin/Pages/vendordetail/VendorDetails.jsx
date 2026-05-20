import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { adminService } from "../../../../services";

export default function VendorDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [vendor, setVendor] = useState(null);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    const loadVendorData = async () => {
      try {
        setError("");
        const { data } = await adminService.getVendorDetails(id);
        if (!mounted) return;
        setVendor(data?.vendor || null);
        setListings(data?.listings || []);
      } catch (err) {
        if (!mounted) return;
        setError(err?.response?.data?.message || "Failed to load vendor details");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    loadVendorData();
    return () => {
      mounted = false;
    };
  }, [id]);

  if (loading) {
    return <div className="p-6 text-sm text-slate-500">Loading vendor details...</div>;
  }

  if (!vendor) {
    return (
      <div className="p-6">
        <p className="text-rose-600 text-sm font-semibold">{error || "Vendor not found"}</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 p-4 md:p-6 min-h-screen">
      <div className="mx-auto max-w-6xl">
        <button
          onClick={() => navigate(-1)}
          className="mb-3 flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-700"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <div className="rounded-2xl bg-white p-6 shadow-sm mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Vendor Details</h1>
          <p className="mt-1 text-sm text-slate-500">Live data from admin panel</p>

          {error && <p className="mt-3 text-xs font-semibold text-rose-600">{error}</p>}

          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs text-slate-400">Name</p>
              <p className="font-semibold text-slate-800">{vendor.name || "-"}</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs text-slate-400">Email</p>
              <p className="font-semibold text-slate-800">{vendor.email || "-"}</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs text-slate-400">Phone</p>
              <p className="font-semibold text-slate-800">{vendor.phone || "-"}</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs text-slate-400">Location</p>
              <p className="font-semibold text-slate-800">{vendor.city || "-"}, {vendor.state || "-"}</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">All Listed Pets</h2>
            <span className="text-sm font-semibold text-indigo-600">{listings.length} listings</span>
          </div>

          {listings.length === 0 ? (
            <p className="text-sm text-slate-500">No listings found for this vendor.</p>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {listings.map((listing) => (
                <div key={listing.id} className="rounded-xl border border-slate-100 p-4">
                  <p className="text-base font-semibold text-slate-800">{listing.title || "-"}</p>
                  <p className="text-sm text-slate-500">{listing.breed || "-"}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xs uppercase font-semibold text-indigo-600">{listing.status || "pending"}</span>
                    <span className="text-sm font-bold text-slate-700">Rs. {listing.price || listing.mating_fee || 0}</span>
                  </div>
                  <p className="mt-2 text-xs text-slate-400">
                    Listed on {listing.created_at ? new Date(listing.created_at).toLocaleDateString() : "-"}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
