import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  PawPrint,
  PlusCircle,
  MessageSquare,
  BarChart3,
  User,
  Settings,
  X,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from "lucide-react";

const nav = [
  { to: "/", label: "Home", icon: <LayoutDashboard size={18} /> },
  {
    to: "/vendor/dashboard",
    label: "Dashboard",
    icon: <LayoutDashboard size={18} />,
  },
  { to: "/vendor/pets", label: "My Pets", icon: <PawPrint size={18} /> },
  {
    to: "/vendor/add-pets",
    label: "Add New Pet",
    icon: <PlusCircle size={18} />,
  },
  {
    to: "/vendor/messaging",
    label: "Inquiries",
    icon: <MessageSquare size={18} />,
  },
  {
    to: "/vendor/booking-history",
    label: "Analytics",
    icon: <BarChart3 size={18} />,
  },
];

const Sidebar = ({ mobileOpen = false, onClose = () => {} }) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  // Handle local storage cleanup and redirection
  const handleLogout = () => {
    localStorage.clear(); // Clears all items or use localStorage.removeItem("your_token_key")
    if (onClose) onClose(); // Closes the mobile drawer if active
    navigate("/login");
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`hidden md:flex bg-white border-r border-gray-200 flex-col p-6 h-screen sticky top-0 overflow-y-auto transition-all duration-300
        ${collapsed ? "w-20" : "w-64"}`}
      >
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          {!collapsed && (
            <div>
              <h1 className="text-xl font-bold text-indigo-600">
                Shiva Dog Clinic
              </h1>
              <p className="text-xs text-gray-400">Vendor Admin</p>
            </div>
          )}

          {/* Toggle Button */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-md hover:bg-gray-100"
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2">
          {nav.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.to === "/vendor/dashboard"}
              title={n.label}
              className={({ isActive }) =>
                `flex items-center rounded-xl transition-colors ${
                  collapsed ? "justify-center" : "gap-3 px-4"
                } py-3 ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-lg"
                    : "text-gray-500 hover:bg-gray-50 hover:text-indigo-600"
                }`
              }
            >
              {/* ICON ALWAYS VISIBLE */}
              <span className="flex items-center justify-center w-6">
                {n.icon}
              </span>

              {/* TEXT ONLY WHEN EXPANDED */}
              {!collapsed && (
                <span className="text-sm font-semibold">{n.label}</span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Bottom Section */}
        <div className="mt-auto pt-6 space-y-2 border-t border-gray-100">
          <NavLink
            to="/vendor/profile-settings"
            title="Profile"
            className={`flex items-center rounded-xl text-gray-500 hover:bg-gray-50 transition-colors ${
              collapsed ? "justify-center" : "gap-3 px-4"
            } py-3`}
          >
            <span className="flex items-center justify-center w-6">
              <User size={18} />
            </span>
            {!collapsed && (
              <span className="text-sm font-semibold">Profile</span>
            )}
          </NavLink>

          <NavLink
            to="/vendor/settings"
            title="Settings"
            className={`flex items-center rounded-xl text-gray-500 hover:bg-gray-50 transition-colors ${
              collapsed ? "justify-center" : "gap-3 px-4"
            } py-3`}
          >
            <span className="flex items-center justify-center w-6">
              <Settings size={18} />
            </span>
            {!collapsed && (
              <span className="text-sm font-semibold">Settings</span>
            )}
          </NavLink>

          {/* Functional Logout Option */}
          <button
            onClick={handleLogout}
            title="Logout"
            className={`w-full flex items-center rounded-xl text-red-500 hover:bg-red-50/60 transition-colors ${
              collapsed ? "justify-center" : "gap-3 px-4"
            } py-3`}
          >
            <span className="flex items-center justify-center w-6">
              <LogOut size={18} />
            </span>
            {!collapsed && (
              <span className="text-sm font-semibold">Logout</span>
            )}
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={onClose} />

          <aside className="absolute left-0 top-0 bottom-0 w-64 bg-white p-6 overflow-y-auto shadow-xl flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-xl font-bold text-indigo-600">
                  Shiva Dog Clinic
                </h1>
                <p className="text-xs text-gray-400">Vendor Admin</p>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-md text-gray-600 hover:bg-gray-100"
              >
                <X size={18} />
              </button>
            </div>

            <nav className="flex-1 space-y-2">
              {nav.map((n) => (
                <NavLink
                  key={n.to}
                  to={n.to}
                  end={n.to === "/vendor/dashboard"}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                      isActive
                        ? "bg-indigo-600 text-white shadow-lg"
                        : "text-gray-500 hover:bg-gray-50 hover:text-indigo-600"
                    }`
                  }
                >
                  {n.icon}
                  <span className="text-sm font-semibold">{n.label}</span>
                </NavLink>
              ))}
            </nav>

            <div className="mt-auto pt-6 border-t border-gray-100 space-y-2">
              <NavLink
                to="/vendor/profile-settings"
                onClick={onClose}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-500 hover:bg-gray-50"
              >
                <User size={18} />
                <span className="text-sm font-semibold">Profile</span>
              </NavLink>

              <NavLink
                to="/vendor/settings"
                onClick={onClose}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-500 hover:bg-gray-50"
              >
                <Settings size={18} />
                <span className="text-sm font-semibold">Settings</span>
              </NavLink>

              {/* Mobile Logout Functional Button */}
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50/60 transition-colors text-left"
              >
                <LogOut size={18} />
                <span className="text-sm font-semibold">Logout</span>
              </button>
            </div>
          </aside>
        </div>
      )}
    </>
  );
};

export default Sidebar;
