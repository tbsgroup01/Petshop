import React, { useEffect, useState } from "react";
import { MoreVertical, User, PawPrint, AlertTriangle, Heart } from 'lucide-react';
import Chart from "../Component/Charts/Chart";
import { adminService } from '../../../services';

export default function Dashboard() {
  const [stats, setStats] = useState({ totalUsers: 0, totalListings: 0, pendingListings: 0, totalFavorites: 0 });
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      try {
        if (isMounted) {
          setError('');
        }

        const [statsRes, logsRes] = await Promise.all([
          adminService.getDashboardStats(),
          adminService.getLogs(),
        ]);

        if (!isMounted) return;

        setStats(statsRes.data?.stats || {});
        setLogs(logsRes.data?.logs || []);
        setLastUpdated(new Date());
      } catch (err) {
        if (!isMounted) return;
        setError(err?.response?.data?.message || 'Live data unavailable');
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    load();

    const interval = setInterval(load, 15000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  const topStats = [
    { title: 'Total Users', value: stats.totalUsers ?? 0, icon: User, iconBg: 'bg-indigo-100 text-indigo-600' },
    { title: 'Total Pet Listings', value: stats.totalListings ?? 0, icon: PawPrint, iconBg: 'bg-emerald-100 text-emerald-600' },
    { title: 'Pending Listings', value: stats.pendingListings ?? 0, icon: AlertTriangle, iconBg: 'bg-orange-100 text-orange-600' },
    { title: 'Total Favorites', value: stats.totalFavorites ?? 0, icon: Heart, iconBg: 'bg-pink-100 text-pink-600' },
  ];

  return (
    <div className="p-4 sm:p-10 bg-gray-100 min-h-screen space-y-6">
      <div className="flex items-center justify-between">
        <div className="text-xs text-slate-500">
          {loading
            ? 'Loading live metrics...'
            : lastUpdated
              ? `Last updated: ${lastUpdated.toLocaleTimeString()}`
              : 'Waiting for data...'}
        </div>
        {error && <div className="text-xs font-semibold text-rose-600">{error}</div>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {topStats.map((item, i) => {
          const Icon = item.icon;
          return (
            <div key={i} className="bg-white border border-gray-200 rounded-md p-5 shadow-sm">
              <div className={`inline-flex h-12 w-12 items-center justify-center rounded-3xl ${item.iconBg}`}>
                <Icon className="h-6 w-6" />
              </div>
              <div className="mt-6">
                <p className="text-sm font-medium text-gray-500">{item.title}</p>
                <p className="mt-2 text-3xl font-bold text-slate-900">{item.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white p-5 rounded-xl shadow">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="font-semibold text-lg">Analytics Overview</h2>
            <p className="text-sm text-gray-500">User growth and revenue trends for the last 6 months</p>
          </div>
        </div>
        <Chart />
      </div>

      <div className="w-full mx-auto bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-5">
          <h2 className="text-2xl font-bold text-slate-800">Recent Admin Activity</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-y border-gray-100">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Action</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Target</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Admin</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/30 transition-colors group">
                  <td className="px-6 py-4 font-medium text-slate-700">{log.action}</td>
                  <td className="px-6 py-4 text-slate-600">{log.target_name || log.target_type}</td>
                  <td className="px-6 py-4 text-slate-600">{log.admin_name || '-'}</td>
                  <td className="px-6 py-4 text-slate-600">{new Date(log.created_at).toLocaleString()}</td>
                  <td className="px-6 py-4 text-center">
                    <button className="p-2 hover:bg-gray-100 rounded-full transition-colors inline-block">
                      <MoreVertical className="w-5 h-5 text-slate-400" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
