import React, { useEffect, useMemo, useState } from "react";
import { Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { adminService } from "../../../services";

const badgeStyles = {
  Admin: "bg-purple-100 text-purple-600",
  Vendor: "bg-gray-200 text-gray-700",
  Buyer: "bg-green-100 text-green-600",
};

const statusStyles = {
  Active: "text-green-600",
  Pending: "text-orange-600",
  Suspended: "text-red-500",
};

const tabs = [
  { label: "All Users", filter: "all" },
  { label: "Vendors", filter: "vendor" },
  { label: "Buyers", filter: "buyer" },
  { label: "Suspended", filter: "suspended" },
];

const pageSize = 5;

const getRoleLabel = (role) => {
  if (role === "admin") return "Admin";
  if (role === "vendor") return "Vendor";
  return "Buyer";
};

export default function Users() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [lastUpdated, setLastUpdated] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const loadUsers = async () => {
      try {
        if (isMounted) setError("");
        const { data } = await adminService.getAllUsers();
        if (!isMounted) return;
        setUsers(data?.users || []);
        setLastUpdated(new Date());
      } catch (err) {
        if (!isMounted) return;
        setError(err?.response?.data?.message || "Failed to fetch users");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadUsers();
    const interval = setInterval(loadUsers, 15000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  const filteredUsers = useMemo(() => {
    const normalizedSearch = searchQuery.toLowerCase().trim();

    return users.filter((user) => {
      const userRole = String(user.role || "").toLowerCase();
      const matchesTab =
        activeTab === "all" ||
        (activeTab === "vendor" && userRole === "vendor") ||
        (activeTab === "buyer" && userRole === "user") ||
        (activeTab === "suspended" && !user.is_active);

      const matchesSearch =
        !normalizedSearch ||
        String(user.name || "").toLowerCase().includes(normalizedSearch) ||
        String(user.email || "").toLowerCase().includes(normalizedSearch);

      return matchesTab && matchesSearch;
    });
  }, [activeTab, searchQuery, users]);

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / pageSize));
  const currentPageUsers = filteredUsers.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleTabClick = (filter) => {
    setActiveTab(filter);
    setCurrentPage(1);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-10">
      <div className="mx-auto">
        <div className="mb-4 text-xs text-slate-500">
          {loading ? "Loading users..." : lastUpdated ? `Last updated: ${lastUpdated.toLocaleTimeString()}` : ""}
        </div>

        {error && (
          <div className="mb-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {error}
          </div>
        )}

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">Users</h1>
            <p className="text-gray-500 mt-2 max-w-2xl">
              Manage your platform users, vendors, and buyers with quick search and filters.
            </p>
          </div>
          <button className="w-full sm:w-auto bg-[#675df9] text-white px-5 py-3 rounded-xl shadow hover:bg-[#5a4ce8] transition">
            + Invite New User
          </button>
        </div>

        <div className="bg-white rounded-3xl shadow-sm p-4 sm:p-5 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex flex-wrap gap-3">
              {tabs.map((tab) => (
                <button
                  key={tab.filter}
                  type="button"
                  onClick={() => handleTabClick(tab.filter)}
                  className={`px-4 py-2 rounded-2xl text-sm font-medium transition ${
                    activeTab === tab.filter
                      ? "bg-[#675df9] text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="flex-1 min-w-0">
              <input
                type="search"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search by name or email..."
                className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-sm text-gray-700 focus:border-[#675df9] focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow overflow-hidden">
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left ">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr className="text-gray-500 text-sm uppercase tracking-wide">
                  <th className="px-6 py-4">Profile</th>
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Join Date</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentPageUsers.map((user) => {
                  const roleLabel = getRoleLabel(user.role);
                  return (
                    <tr key={user.id} className=" border-b border-gray-200 last:border-b-0 hover:bg-gray-50">
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-2xl bg-gray-200 flex items-center justify-center text-lg text-gray-600">
                            {String(user.name || "U").charAt(0)}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{user.name}</p>
                            <p className="text-sm text-gray-500">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${badgeStyles[roleLabel]}`}>
                          {roleLabel}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <span className={`text-sm font-medium ${user.is_active ? statusStyles.Active : statusStyles.Suspended}`}>
                          {user.is_active ? "Active" : "Suspended"}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-sm text-gray-600">{new Date(user.created_at).toLocaleDateString()}</td>
                      <td className="px-6 py-5 text-right text-gray-500">
                        <button
                          type="button"
                          onClick={() => navigate(`/admin/users/${user.id}`)}
                          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:bg-gray-100"
                        >
                          <Eye className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="md:hidden divide-y divide-gray-200">
            {currentPageUsers.map((user) => (
              <div key={user.id} className="p-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-2xl bg-gray-200 flex items-center justify-center text-lg text-gray-600">
                      {String(user.name || "U").charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => navigate(`/admin/users/${user.id}`)}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:bg-gray-100"
                  >
                    <Eye className="h-5 w-5" />
                  </button>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-gray-600">
                  <div>
                    <p className="text-gray-500">Status</p>
                    <p className={`font-medium ${user.is_active ? statusStyles.Active : statusStyles.Suspended}`}>{user.is_active ? "Active" : "Suspended"}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Joined</p>
                    <p className="font-medium">{new Date(user.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="px-4 py-4 sm:px-6 bg-gray-50 border-t border-gray-200 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <p className="text-sm text-gray-600">
              Showing {Math.min((currentPage - 1) * pageSize + 1, filteredUsers.length)} to {Math.min(currentPage * pageSize, filteredUsers.length)} of {filteredUsers.length} users
            </p>
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => handlePageClick(page)}
                  className={`px-3 py-2 rounded-full text-sm font-medium transition ${
                    currentPage === page
                      ? "bg-[#675df9] text-white"
                      : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
