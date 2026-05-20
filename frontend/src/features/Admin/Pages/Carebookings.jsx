import React, { useEffect, useMemo, useState } from "react";
import { CalendarCheck, ShieldCheck, Clock, XCircle, Download } from "lucide-react";
import { adminService } from "../../../services";

const bookingTabs = ["All Bookings", "Boarding", "Grooming", "Daycare", "Completed"];

const serviceFromListing = (listingType) => {
  const type = String(listingType || "").toLowerCase();
  if (type === "mating") return "Boarding";
  if (type === "sell") return "Grooming";
  return "Daycare";
};

const statusFromListing = (status) => {
  const s = String(status || "").toLowerCase();
  if (s === "active") return "Confirmed";
  if (s === "sold") return "Completed";
  if (s === "inactive") return "Cancelled";
  return "Pending";
};

const serviceBadge = (service) => {
  if (service === "Boarding") return "bg-violet-100 text-violet-700";
  if (service === "Grooming") return "bg-sky-100 text-sky-700";
  return "bg-amber-100 text-amber-700";
};

const statusBadge = (status) => {
  if (status === "Confirmed") return "bg-emerald-100 text-emerald-700";
  if (status === "Pending") return "bg-amber-100 text-amber-700";
  if (status === "Completed") return "bg-indigo-100 text-indigo-700";
  return "bg-rose-100 text-rose-700";
};

export default function Carebookings() {
  const [activeTab, setActiveTab] = useState("All Bookings");
  const [bookingData, setBookingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [lastUpdated, setLastUpdated] = useState(null);

  const loadBookings = async () => {
    try {
      setError("");
      const { data } = await adminService.getAllListings();
      const listings = data?.listings || [];
      const mapped = listings.map((item) => ({
        id: item.id,
        pet: item.title || "Untitled Pet",
        breed: item.breed || "-",
        owner: item.owner_name || item.owner?.name || "Unknown",
        email: item.owner_email || item.owner?.email || "-",
        service: serviceFromListing(item.listing_type),
        dates: item.created_at ? new Date(item.created_at).toLocaleDateString() : "-",
        details: `Listing #${item.id}`,
        status: statusFromListing(item.status),
      }));
      setBookingData(mapped);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to fetch care bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let mounted = true;
    const fetchLive = async () => {
      if (!mounted) return;
      await loadBookings();
    };
    fetchLive();
    const interval = setInterval(fetchLive, 15000);
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  const filteredBookings = useMemo(() => {
    return bookingData.filter((booking) => {
      if (activeTab === "All Bookings") return true;
      if (activeTab === "Completed") return booking.status === "Completed";
      return booking.service === activeTab;
    });
  }, [activeTab, bookingData]);

  const stats = useMemo(() => {
    const total = bookingData.length;
    const confirmed = bookingData.filter((b) => b.status === "Confirmed").length;
    const pending = bookingData.filter((b) => b.status === "Pending").length;
    const cancelled = bookingData.filter((b) => b.status === "Cancelled").length;
    return { total, confirmed, pending, cancelled };
  }, [bookingData]);

  const handleApprove = async (id) => {
    try {
      await adminService.changeListingStatus(id, { status: "active" });
      await loadBookings();
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to approve booking");
    }
  };

  const handleExportCSV = () => {
    const headers = ["Pet", "Breed", "Owner", "Email", "Service", "Dates", "Details", "Status"];
    const csvRows = [
      headers.join(","),
      ...filteredBookings.map((booking) =>
        [booking.pet, booking.breed, booking.owner, booking.email, booking.service, booking.dates, booking.details, booking.status]
          .map((value) => `"${value}"`)
          .join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvRows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `care-bookings-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="sm:p-10 p-4 bg-gray-50">
      <div className="max-w-full mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">Pet Care Bookings</h1>
            <p className="text-sm text-slate-500 max-w-2xl">Dynamic live data from backend listings.</p>
          </div>
          <div className="text-xs text-slate-500">
            {loading ? "Loading..." : lastUpdated ? `Last updated: ${lastUpdated.toLocaleTimeString()}` : ""}
          </div>
        </div>

        {error && <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</div>}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: "Total Bookings", value: stats.total, icon: CalendarCheck, iconColor: "bg-violet-100 text-violet-600" },
            { label: "Confirmed", value: stats.confirmed, icon: ShieldCheck, iconColor: "bg-emerald-100 text-emerald-600" },
            { label: "Pending", value: stats.pending, icon: Clock, iconColor: "bg-amber-100 text-amber-600" },
            { label: "Cancelled", value: stats.cancelled, icon: XCircle, iconColor: "bg-rose-100 text-rose-600" },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="rounded-2xl bg-slate-100 p-6 border border-slate-100">
                <div className="flex gap-2">
                  <div className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl ${stat.iconColor}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{stat.label}</p>
                    <p className="mt-1 text-2xl font-bold text-slate-900">{stat.value}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="rounded-4xl bg-white p-5 shadow-sm border border-slate-200">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap items-center gap-3">
              {bookingTabs.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${activeTab === tab ? "bg-[#4d41df] text-white shadow" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <button onClick={handleExportCSV} className="inline-flex items-center gap-2 rounded-full bg-[#4d41df] px-4 py-2 text-sm font-semibold text-white hover:bg-[#4236c9]">
              <Download className="h-4 w-4" />
              Export
            </button>
          </div>

          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-sm">
              <thead className="bg-slate-50 text-slate-500 text-left uppercase tracking-[0.12em] text-xs">
                <tr>
                  <th className="px-6 py-4">Pet</th>
                  <th className="px-6 py-4">Owner</th>
                  <th className="px-6 py-4">Service Type</th>
                  <th className="px-6 py-4">Dates</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {filteredBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-5 align-top">
                      <p className="font-semibold text-slate-900">{booking.pet}</p>
                      <p className="text-xs text-slate-500">{booking.breed}</p>
                    </td>
                    <td className="px-6 py-5 align-top">
                      <p className="font-semibold text-slate-900">{booking.owner}</p>
                      <p className="text-xs text-slate-500">{booking.email}</p>
                    </td>
                    <td className="px-6 py-5 align-top">
                      <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${serviceBadge(booking.service)}`}>
                        {booking.service}
                      </span>
                    </td>
                    <td className="px-6 py-5 align-top">
                      <p className="font-semibold text-slate-900">{booking.dates}</p>
                      <p className="text-xs text-slate-500">{booking.details}</p>
                    </td>
                    <td className="px-6 py-5 align-top">
                      <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusBadge(booking.status)}`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-5 align-top">
                      {booking.status === "Pending" ? (
                        <button
                          onClick={() => handleApprove(booking.id)}
                          className="inline-flex rounded-full px-3 py-1 text-xs font-semibold bg-blue-400 text-gray-700 hover:bg-blue-500 hover:text-white transition"
                        >
                          Approve
                        </button>
                      ) : (
                        <span className="text-xs text-slate-400">No action</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 border-t border-slate-200 pt-4 text-sm text-slate-500">
            Showing {filteredBookings.length} of {bookingData.length} bookings
          </div>
        </div>
      </div>
    </div>
  );
}
