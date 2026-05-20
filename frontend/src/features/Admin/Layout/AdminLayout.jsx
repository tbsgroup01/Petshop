import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Component/shared/Sidebar';
import { Header } from '../Component/shared/Navbar';

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar />
      <div className="flex-1 min-w-0">
        <Header />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
