import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Mail,
  Calendar,
  ShieldCheck,
  Phone,
  MapPin,
  Activity,
} from "lucide-react";
import { adminService } from "../../../../services";

const badgeStyles = {
  admin: "bg-purple-100 text-purple-700 border border-purple-200",
  user: "bg-blue-100 text-blue-700 border border-blue-200",
  vendor: "bg-green-100 text-green-700 border border-green-200",
};

const UserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [listedPets, setListedPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    let mounted = true;

    const loadUser = async () => {
      try {
        if (mounted) setError("");
        const [{ data: usersData }, { data: userListingsData }] = await Promise.all([
          adminService.getAllUsers(),
          adminService.getVendorDetails(id),
        ]);
        if (!mounted) return;

        const found = (usersData?.users || []).find((item) => String(item.id) === String(id));
        setUser(found || null);
        setListedPets(userListingsData?.listings || []);
        setLastUpdated(new Date());
      } catch (err) {
        if (!mounted) return;
        setError(err?.response?.data?.message || "Failed to load user details");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    loadUser();
    const interval = setInterval(loadUser, 15000);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, [id]);

  const handleToggleStatus = async () => {
    if (!user) return;
    try {
      await adminService.toggleUserStatus(user.id);
      const [{ data: usersData }, { data: userListingsData }] = await Promise.all([
        adminService.getAllUsers(),
        adminService.getVendorDetails(id),
      ]);
      const found = (usersData?.users || []).find((item) => String(item.id) === String(id));
      setUser(found || null);
      setListedPets(userListingsData?.listings || []);
      setLastUpdated(new Date());
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to update user status");
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-gray-500">Loading user details...</div>;
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
        <div className="bg-white rounded-3xl shadow-xl p-10 text-center max-w-md w-full">
          <h2 className="text-3xl font-bold text-red-500">User Not Found</h2>
          <p className="text-gray-500 mt-3">The user you are looking for does not exist.</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-6 px-6 py-3 bg-[#675df9] text-white rounded-2xl hover:bg-[#574ee8] transition"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-[#f4f5ff] via-[#f8f9ff] to-[#eef1ff] p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm bg-white px-5 py-3 rounded-2xl shadow-md hover:shadow-lg transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <div className="text-xs text-slate-500">
            {lastUpdated ? `Last updated: ${lastUpdated.toLocaleTimeString()}` : ""}
          </div>
        </div>

        {error && (
          <div className="mb-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {error}
          </div>
        )}

        <div className="bg-white rounded-[32px] shadow-xl overflow-hidden">
          <div className="h-40 bg-gradient-to-r from-[#675df9] to-[#8d86ff]" />

          <div className="px-6 sm:px-10 pb-10">
            <div className="flex flex-col lg:flex-row gap-10 -mt-20">
              <div className="lg:w-[320px] flex flex-col items-center lg:items-start">
                <div className="h-40 w-40 rounded-[32px] overflow-hidden border-4 border-white shadow-2xl bg-white">
                  <div className="h-full w-full flex items-center justify-center bg-[#675df9] text-white text-5xl font-bold">
                    {String(user.name || "U").charAt(0)}
                  </div>
                </div>

                <div className="mt-6 text-center lg:text-left">
                  <h1 className="text-3xl font-bold text-gray-800">{user.name}</h1>
                  <p className="text-gray-500 mt-2">{user.email}</p>
                </div>

                <div className="flex flex-wrap gap-3 mt-5">
                  <span className={`px-4 py-2 rounded-full text-sm font-semibold ${badgeStyles[user.role] || badgeStyles.user}`}>
                    {user.role}
                  </span>
                  <span className={`px-4 py-2 rounded-full text-sm font-semibold ${user.is_active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                    {user.is_active ? "active" : "suspended"}
                  </span>
                </div>

                <button
                  onClick={handleToggleStatus}
                  className="mt-6 px-5 py-3 rounded-2xl bg-[#675df9] text-white hover:bg-[#574ee8] transition text-sm font-semibold"
                >
                  {user.is_active ? "Suspend User" : "Activate User"}
                </button>
              </div>

              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                <div className="bg-gray-50 rounded-3xl p-6 hover:shadow-lg transition">
                  <div className="flex items-center gap-3 mb-4"><Mail className="text-[#675df9]" /><h2 className="text-lg font-semibold">Email Address</h2></div>
                  <p className="text-gray-700 break-all">{user.email}</p>
                </div>

                <div className="bg-gray-50 rounded-3xl p-6 hover:shadow-lg transition">
                  <div className="flex items-center gap-3 mb-4"><Calendar className="text-[#675df9]" /><h2 className="text-lg font-semibold">Join Date</h2></div>
                  <p className="text-gray-700">{new Date(user.created_at).toLocaleDateString()}</p>
                </div>

                <div className="bg-gray-50 rounded-3xl p-6 hover:shadow-lg transition">
                  <div className="flex items-center gap-3 mb-4"><ShieldCheck className="text-[#675df9]" /><h2 className="text-lg font-semibold">User Role</h2></div>
                  <p className="text-gray-700 capitalize">{user.role}</p>
                </div>

                <div className="bg-gray-50 rounded-3xl p-6 hover:shadow-lg transition">
                  <div className="flex items-center gap-3 mb-4"><Activity className="text-[#675df9]" /><h2 className="text-lg font-semibold">Account Status</h2></div>
                  <p className={`font-semibold capitalize ${user.is_active ? "text-green-600" : "text-red-500"}`}>
                    {user.is_active ? "active" : "suspended"}
                  </p>
                </div>

                <div className="bg-gray-50 rounded-3xl p-6 hover:shadow-lg transition">
                  <div className="flex items-center gap-3 mb-4"><Phone className="text-[#675df9]" /><h2 className="text-lg font-semibold">Phone Number</h2></div>
                  <p className="text-gray-700">{user.phone || "-"}</p>
                </div>

                <div className="bg-gray-50 rounded-3xl p-6 hover:shadow-lg transition">
                  <div className="flex items-center gap-3 mb-4"><MapPin className="text-[#675df9]" /><h2 className="text-lg font-semibold">Location</h2></div>
                  <p className="text-gray-700">{user.city || "-"}, {user.state || "-"}</p>
                </div>
              </div>
            </div>

            <div className="mt-10">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-800">Listed Pets</h2>
                <span className="text-sm font-semibold text-indigo-600">{listedPets.length} listings</span>
              </div>

              {listedPets.length === 0 ? (
                <div className="rounded-2xl bg-gray-50 p-5 text-sm text-gray-500">
                  No listed pets found for this user.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {listedPets.map((pet) => (
                    <div key={pet.id} className="rounded-2xl border border-gray-200 bg-white p-4">
                      <h3 className="font-bold text-gray-800">{pet.title || "-"}</h3>
                      <p className="text-sm text-gray-500 mt-1">{pet.breed || "-"}</p>
                      <div className="mt-3 flex items-center justify-between">
                        <span className="text-xs font-semibold uppercase text-indigo-600">{pet.status || "pending"}</span>
                        <span className="text-sm font-bold text-gray-700">Rs. {pet.price || pet.mating_fee || 0}</span>
                      </div>
                      <p className="text-xs text-gray-400 mt-2">
                        Listed on {pet.created_at ? new Date(pet.created_at).toLocaleDateString() : "-"}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
