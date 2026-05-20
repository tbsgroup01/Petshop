import { useState, useEffect } from "react";
import ArrowUp from "../Component/icons/Arrowup";
import RevenueChart from "../Component/Charts/Revenuechart";

const breeds = [
  { name: "Golden Retriever", pct: 28, icon: "🦮", color: "#4d41df" },
  { name: "Beagle", pct: 22, icon: "🐕", color: "#4d41df" },
  { name: "Samoyed", pct: 15, icon: "🐩", color: "#4d41df" },
  { name: "French Bulldog", pct: 12, icon: "🐾", color: "#4d41df" },
];

const services = [
  { name: "Medical" },
  { name: "Grooming" },
  { name: "Boarding" },
  { name: "Daycare" },
];

function StatCard({ icon, label, value, sub, delta, bgColor }) {
  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 flex-1 min-w-0 shadow-sm border border-indigo-50 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">

      <div className="flex justify-between items-start mb-3 gap-3">

        <div
          className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center text-lg ${bgColor}`}
        >
          {icon}
        </div>

        <span className="text-emerald-500 text-xs sm:text-sm font-semibold flex items-center gap-1 whitespace-nowrap">
          <ArrowUp />
          {delta}
        </span>
      </div>

      <div className="text-xs text-gray-500 mb-1">
        {label}
      </div>

      <div className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight break-words">
        {value}
      </div>

      <div className="text-xs text-gray-400 mt-1">
        {sub}
      </div>
    </div>
  );
}

function UserGrowth() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setAnimate(true), 200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-10 shadow-sm border border-indigo-50 flex flex-col h-full">

      <h2 className="text-lg font-bold text-gray-900">
        User Growth
      </h2>

      <p className="text-xs text-gray-400 mb-5">
        Registration acquisition
      </p>

      <div className="space-y-4 flex-1">

        <div>
          <div className="flex justify-between mb-1.5">

            <span className="text-sm text-gray-600 font-medium">
              Buyers
            </span>

            <span className="text-sm font-bold text-indigo-600">
              12,840
            </span>
          </div>

          <div className="h-2 bg-indigo-100 rounded-full overflow-hidden">
            <div
              className="h-2 bg-indigo-600 rounded-full transition-all duration-1000"
              style={{ width: animate ? "90%" : "0%" }}
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-1.5">

            <span className="text-sm text-gray-600 font-medium">
              Vendors
            </span>

            <span className="text-sm font-bold text-emerald-600">
              428
            </span>
          </div>

          <div className="h-2 bg-emerald-100 rounded-full overflow-hidden">
            <div
              className="h-2 bg-emerald-500 rounded-full transition-all duration-1000"
              style={{
                width: animate ? "28%" : "0%",
                transitionDelay: "150ms",
              }}
            />
          </div>
        </div>
      </div>

      <div className="mt-4 bg-indigo-50 rounded-xl p-3.5 flex gap-2.5 items-start">

        <div className="w-6 h-6 rounded-full bg-indigo-200 flex items-center justify-center flex-shrink-0 mt-0.5">

          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M6 10V2M6 2L2.5 5.5M6 2L9.5 5.5"
              stroke="#4F46E5"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <p className="text-xs text-indigo-700 leading-relaxed font-medium">
          Buyer growth is outperforming vendors by 12% MoM.
          Consider incentive programs.
        </p>
      </div>
    </div>
  );
}

function ServiceDistribution() {
  return (
    <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-indigo-50">

      <h2 className="text-lg font-bold text-gray-900 mb-4">
        Service Distribution
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4 pt-3 border-t border-gray-100">

        {services.map((s) => (
          <div key={s.name} className="text-center">

            <div className=" rounded-xl  px-2">

              <div >
                {s.name}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PopularBreeds() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setAnimate(true), 300);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-10 shadow-sm border border-indigo-50">

      <div className="flex justify-between items-center mb-5 gap-3 flex-wrap">

        <h2 className="text-lg font-bold text-gray-900">
          Popular Breeds
        </h2>

        <span className="bg-indigo-600 text-white text-xs font-semibold rounded-full px-3 py-1">
          Top 5
        </span>
      </div>

      <div className="space-y-4">

        {breeds.map((b, i) => (
          <div key={b.name} className="flex items-center gap-3">

            <div className="w-9 h-9 rounded-full bg-amber-50 border-2 border-amber-100 flex items-center justify-center text-lg flex-shrink-0">
              {b.icon}
            </div>

            <div className="flex-1 min-w-0">

              <div className="flex justify-between mb-1 gap-2">

                <span className="text-sm font-medium text-gray-700 truncate">
                  {b.name}
                </span>

                <span className="text-sm font-bold text-gray-900 shrink-0">
                  {b.pct}%
                </span>
              </div>

              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">

                <div
                  className="h-1.5 rounded-full transition-all duration-1000"
                  style={{
                    width: animate ? `${b.pct}%` : "0%",
                    background: b.color,
                    transitionDelay: `${i * 120}ms`,
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function PlatformAnalytics() {
  const [activeTab, setActiveTab] = useState("Monthly");

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-10 font-sans">

      <div className="mx-auto space-y-5">

        {/* Header */}
        <div className="flex flex-col xl:flex-row xl:justify-between xl:items-start gap-4">

          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
              Platform Analytics
            </h1>

            <p className="text-gray-500 text-sm mt-1 max-w-2xl">
              Real-time insights into marketplace performance and growth.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full xl:w-auto">

            {/* Tabs */}
            <div className="bg-white rounded-xl flex p-1 shadow-sm border border-gray-100 overflow-x-auto">

              {["Weekly", "Monthly", "Yearly"].map((t) => (
                <button
                  key={t}
                  onClick={() => setActiveTab(t)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${activeTab === t
                      ? "bg-indigo-600 text-white shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                    }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Export */}
            <button className="bg-green-900 hover:bg-green-800 text-white text-sm font-semibold rounded-xl px-4 py-3 flex items-center justify-center gap-2 shadow-sm transition-colors">

              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M7 1v8M4 6l3 3 3-3M2 11h10"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              Export Report
            </button>
          </div>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">

          <StatCard
            icon="💳"
            label="Monthly Revenue"
            value="₹12,45,000"
            sub="vs. ₹11,11,600 last month"
            delta="+12%"
            bgColor="bg-indigo-50 text-indigo-600"
          />

          <StatCard
            icon="🔄"
            label="Conversion Rate"
            value="3.8%"
            sub="vs. 3.3% last month"
            delta="+0.5%"
            bgColor="bg-cyan-50 text-cyan-600"
          />

          <StatCard
            icon="🏪"
            label="Active Vendors"
            value="428"
            sub="32 new this week"
            delta="+8%"
            bgColor="bg-purple-50 text-purple-600"
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">

          <div className="xl:col-span-2 overflow-hidden">
            <RevenueChart />
          </div>

          <div>
            <UserGrowth />
          </div>
        </div>

        {/* Bottom */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

          <ServiceDistribution />

          <PopularBreeds />
        </div>
      </div>
    </div>
  );
}