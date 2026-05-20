import React from "react";
import { Bell, HelpCircle } from "lucide-react";

export function Header() {
  return (
    <>
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="px-4 sm:px-6 lg:px-8 py-3">
          {/* Mobile/Tablet Layout */}
          <div className="lg:hidden flex items-center justify-end gap-4">
            {/* Right: Icons */}
            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-600">
                <Bell size={20} />
              </button>
              <img
                src="https://i.pravatar.cc/40"
                alt="profile"
                className="w-8 h-8 rounded-full"
              />
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:flex items-center justify-end gap-6">
            {/* Right Section */}
            <div className="flex items-center gap-6">
              {/* Icons */}
              <div className="flex items-center gap-4 text-gray-600">
                <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                  <Bell size={20} />
                </button>
                <div className="relative group">
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                    <HelpCircle size={20} />
                  </button>

                  {/* Tooltip */}
                  <div className="absolute top-12 right-0 whitespace-nowrap rounded-lg bg-gray-900 px-3 py-2 text-xs text-white opacity-0 shadow-lg transition-all duration-200 group-hover:opacity-100">
                    Need help?
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="h-6 w-px bg-gray-300"></div>

              {/* Profile */}
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">Admin Shiva</p>
                  <p className="text-xs text-gray-500">MAIN DASHBOARD</p>
                </div>
                <img
                  src="https://i.pravatar.cc/40"
                  alt="profile"
                  className="w-8 h-8 rounded-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
