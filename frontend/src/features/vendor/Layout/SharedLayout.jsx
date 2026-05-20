import React, { useState } from 'react';
import Sidebar from '../Components/Sidebar';
import { Outlet } from 'react-router-dom';
import { Menu } from 'lucide-react';

const SharedLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#F8F9FD] text-slate-800 font-sans">
      <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

      <div className="flex-1 flex flex-col overflow-auto">
        {/* Topbar for small screens */}
        <header className="md:hidden bg-white border-b border-gray-200 h-14 flex items-center px-4 justify-between">
          <button
            aria-label="Open sidebar"
            onClick={() => setMobileOpen(true)}
            className="p-2 rounded-md text-gray-600 hover:bg-gray-100"
          >
            <Menu size={20} />
          </button>
          <div className="text-lg font-bold text-indigo-600">Shiva Dog Clinic</div>
          <div />
        </header>

        <main className="flex-1 min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default SharedLayout;
