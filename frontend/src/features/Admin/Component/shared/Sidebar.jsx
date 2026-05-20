import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Home,
  Users,
  PawPrint,
  Calendar,
  ShieldCheck,
  BarChart2,
  CreditCard,
  Headphones,
  FileText,
  Settings,
  Menu,
} from "lucide-react";

const menuItems = [
  { name: "Dashboard", icon: Home, to: "/admin/dashboard" },
  { name: "Users", icon: Users, to: "/admin/users" },
  { name: "Pet Listings", icon: PawPrint, to: "/admin/pet-listings" },
  { name: "Care Bookings", icon: Calendar, to: "/admin/carebookings" },
  { name: "Payments", icon: CreditCard, to: "/admin/payments" },
  { name: "Support", icon: Headphones, to: "/admin/support" },
  { name: "Home Slider", icon: FileText, to: "/admin/home-slider" },
  { name: "Settings", icon: Settings, to: "/admin/settings" },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Sidebar Ref
  const sidebarRef = useRef(null);

  // Screen Resize Logic
  useEffect(() => {
    const updateSize = () => {
      const mobile = window.innerWidth < 1024;

      setIsMobile(mobile);
      setSidebarOpen(!mobile);

      if (mobile) {
        setCollapsed(false);
      }
    };

    updateSize();

    window.addEventListener("resize", updateSize);

    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // Click Outside Logic
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMobile &&
        sidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target)
      ) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobile, sidebarOpen]);

  const sidebarVisible = !isMobile || sidebarOpen;

  const sidebarWidthClass = collapsed ? "w-20" : "w-64";

  return (
    <>
      {/* Mobile Open Button */}
      {isMobile && !sidebarOpen && (
        <button
          type="button"
          onClick={() => setSidebarOpen(true)}
          className="fixed z-50 top-3 cursor-pointer left-3 p-3 rounded-full bg-white shadow-lg border border-gray-200 text-gray-700 lg:hidden"
          aria-label="Open sidebar"
        >
          <Menu size={18} />
        </button>
      )}
      {/* Overlay */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`
    h-screen bg-gray-100 shadow-xl
    flex flex-col overflow-hidden
    transition-all duration-300 ease-in-out

    ${collapsed ? "w-[90px]" : "w-[280px]"}

    ${isMobile
            ? `fixed inset-y-0 left-0 z-50 ${sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full"
            }`
            : "relative translate-x-0"
          }
  `}
      >
        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4">

          {/* Header */}
          <div
            className={`mb-8 flex items-center ${collapsed
                ? "justify-center"
                : "justify-between"
              }`}
          >
            {/* Logo + Title */}
            <div className="flex items-center gap-3 overflow-hidden">
              <div
                className={`
            transition-all duration-200 overflow-hidden whitespace-nowrap
            ${collapsed
                    ? "opacity-0 w-0"
                    : "opacity-100 w-auto"
                  }
          `}
              >
                <h1 className="text-xl font-semibold text-indigo-600">
                  PetCare Admin
                </h1>

                <p className="text-sm text-gray-500">
                  Super Administrator
                </p>
              </div>
            </div>

            {/* Toggle Button */}
            <button
              onClick={() => {
                if (isMobile) {
                  setSidebarOpen((prev) => !prev);
                } else {
                  setCollapsed((prev) => !prev);
                }
              }}
              className={`
          p-2 px-3 mx-1 rounded-lg bg-white border border-gray-200
          shadow-sm hover:bg-gray-50 transition cursor-pointer

          ${collapsed ? "absolute right-4" : ""}
        `}
            >
              <Menu size={18} />
            </button>
          </div>

          {/* Menu */}
          <div className="space-y-2">
            {menuItems.map((item, index) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={index}
                  to={item.to}
                  onClick={() => {
                    if (isMobile) {
                      setSidebarOpen(false);
                    }
                  }}
                  className={({ isActive }) =>
                    `
                flex items-center rounded-xl
                px-4 py-3 transition-all duration-200

                ${collapsed
                      ? "justify-center"
                      : "gap-3"
                    }

                ${isActive
                      ? "bg-indigo-600 text-white shadow-md"
                      : "text-gray-600 hover:bg-gray-200"
                    }
              `
                  }
                >
                  {/* Icon */}
                  <Icon size={20} className="shrink-0" />

                  {/* Text */}
                  <span
                    className={`
                whitespace-nowrap overflow-hidden
                transition-all duration-200

                ${collapsed
                        ? "w-0 opacity-0"
                        : "w-auto opacity-100"
                      }
              `}
                  >
                    {item.name}
                  </span>
                </NavLink>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
