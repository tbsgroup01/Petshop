import React, { useMemo, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  FileText,
  Filter,
  Zap,
  Wallet,
  Clock,
  CheckCircle,
  BarChart,
} from "lucide-react";
import { transactions } from "../Data";

export default function Payments() {
  const [activeTab, setActiveTab] = useState("All Payments");
  const [viewType, setViewType] = useState("monthly");

  // FILTER STATES
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedMethod, setSelectedMethod] = useState("All");

  const stats = [
    {
      label: "Total Revenue",
      value: "₹4,28,500",
      change: "+12.5%",
      icon: <Wallet />,
      color: "bg-blue-100",
    },
    {
      label: "Pending Payouts",
      value: "₹62,140",
      change: "-3.4%",
      icon: <Clock />,
      color: "bg-red-100",
    },
    {
      label: "Completed Transactions",
      value: "1,248",
      change: "+8.8%",
      icon: <CheckCircle />,
      color: "bg-green-100",
    },
    {
      label: "Monthly Earnings",
      value: "₹84,900",
      change: "+18.2%",
      icon: <BarChart />,
      color: "bg-purple-100",
    },
  ];

  const revenueData = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
  ];

  const revenueValues = [35, 42, 38, 45, 72, 48, 52, 41];

  const tabs = [
    "All Payments",
    "Completed",
    "Pending",
    "Refunded",
  ];

  // PAYMENT METHODS
  const paymentMethods = [
    "All",
    ...new Set(
      transactions.map((item) =>
        typeof item.method === "string" ? item.method : "Card"
      )
    ),
  ];

  // FILTER LOGIC
  const filteredTransactions = useMemo(() => {
    return transactions.filter((txn) => {

      // TAB FILTER
      const matchesTab =
        activeTab === "All Payments"
          ? true
          : txn.status.toLowerCase() === activeTab.toLowerCase();

      // STATUS FILTER
      const matchesStatus =
        selectedStatus === "All"
          ? true
          : txn.status === selectedStatus;

      // METHOD FILTER
      const methodText =
        typeof txn.method === "string" ? txn.method : "Card";

      const matchesMethod =
        selectedMethod === "All"
          ? true
          : methodText.includes(selectedMethod);

      return matchesTab && matchesStatus && matchesMethod;
    });
  }, [activeTab, selectedStatus, selectedMethod]);

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-10">
      <div className="mx-auto space-y-6">

        {/* Header */}
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Payment Management
            </h1>

            <p className="mt-1 text-sm sm:text-base text-gray-600">
              Oversee global revenue streams and transaction history.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full xl:w-auto">
            <button className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50">
              <FileText size={18} />
              Export Report
            </button>

            <button className="flex items-center justify-center gap-2 rounded-xl bg-[#4d41df] px-4 py-3 text-sm font-medium text-white transition hover:bg-[#4337ca]">
              <Zap size={18} />
              + Manual Transaction
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100"
            >
              <div className="mb-4 flex items-start justify-between">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl text-xl ${stat.color}`}
                >
                  {stat.icon}
                </div>

                <span
                  className={`text-sm font-semibold ${stat.change.startsWith("+")
                      ? "text-emerald-600"
                      : "text-red-600"
                    }`}
                >
                  {stat.change}
                </span>
              </div>

              <p className="text-sm text-gray-500">{stat.label}</p>

              <h2 className="mt-1 text-2xl font-bold text-gray-900">
                {stat.value}
              </h2>
            </div>
          ))}
        </div>

        {/* Revenue Chart */}
        <div className="rounded-2xl border border-gray-200 bg-white p-4 sm:p-6">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-xl font-bold text-gray-900">
              Revenue Trends
            </h2>
{/* 
            <div className="flex w-full sm:w-auto rounded-full bg-gray-100 p-1">
              {["monthly", "weekly"].map((type) => (
                <button
                  key={type}
                  onClick={() => setViewType(type)}
                  className={`flex-1 sm:flex-none rounded-full px-4 py-2 text-sm font-medium capitalize transition ${viewType === type
                      ? "bg-[#675df9] text-white"
                      : "text-gray-600 hover:text-gray-900"
                    }`}
                >
                  {type}
                </button>
              ))}
            </div> */}
          </div>

          {/* Chart */}
          <div className="rounded-2xl bg-gray-50 p-3 sm:p-5 lg:p-6">
            <div className="grid h-[260px] grid-cols-8 items-end gap-1.5 sm:h-[320px] sm:gap-3 lg:h-[380px]">
                {revenueData.map((month, idx) => {
                  const maxValue = Math.max(...revenueValues);

                  const barHeight =
                    (revenueValues[idx] / maxValue) * 100;

                  return (
                    // <div
                    //   key={idx}
                    //   className="flex flex-1 flex-col items-center"
                    // >
                    //   <div className="flex h-[240px] sm:h-[320px] items-end w-full">
                    //     <div
                    //       title={`${month}: ₹${revenueValues[idx]}k`}
                    //       className={`w-full rounded-t-xl transition-all duration-300 hover:opacity-80 ${
                    //         idx === 4
                    //           ? "bg-[#675df9]"
                    //           : "bg-[#d9d6ff]"
                    //       }`}
                    //       style={{
                    //         height: `${Math.max(barHeight, 10)}%`,
                    //       }}
                    //     />
                    //   </div>

                    //   <p className="mt-3 text-sm font-semibold text-gray-700">
                    //     {month}
                    //   </p>

                    //   <p className="text-xs text-gray-500">
                    //     ₹{revenueValues[idx]}k
                    //   </p>
                    // </div>
                    <div
                      key={month}
                      title={`${month}: ₹${revenueValues[idx]}k`}
                      className={`
    w-full rounded-t-xl
    transition-all duration-700 ease-out
    hover:scale-105 hover:opacity-80
    origin-bottom
    animate-[growBar_1s_ease-out_forwards]

    ${idx === 4
                          ? "bg-[#675df9]"
                          : "bg-[#d9d6ff]"
                        }
  `}
                      style={{
                        height: `${Math.max(barHeight, 10)}%`,
                        animationDelay: `${idx * 100}ms`,
                      }}
                    />
                  );
                })}
              </div>

              {/* Legend */}
              <div className="mt-6 flex flex-wrap items-center justify-center gap-5 border-t border-gray-200 pt-4">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded bg-blue-300" />
                  <span className="text-sm text-gray-600">
                    Regular Revenue
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded bg-[#675df9]" />
                  <span className="text-sm text-gray-600">
                    Peak Month (May)
                  </span>
                </div>
              </div>
            </div>
          </div>

 

        {/* Transactions */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">

          {/* Top Tabs */}
          <div className="flex items-center border-b border-gray-200 px-3 sm:px-6 overflow-x-auto">
            <div className="flex flex-nowrap">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`whitespace-nowrap border-b-2 px-4 py-4 text-sm font-medium transition ${activeTab === tab
                      ? "border-[#675df9] text-gray-900"
                      : "border-transparent text-gray-500 hover:text-gray-900"
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="flex-1" />
          </div>

          {/* Desktop Table */}
          <div className="hidden lg:block overflow-x-auto">

            {/* Header */}
            <div className="grid min-w-[900px] grid-cols-6 gap-4 border-b border-gray-200 bg-gray-50 px-6 py-4 text-xs font-bold uppercase tracking-wide text-gray-600">
              <div>Transaction ID</div>
              <div>User/Vendor</div>
              <div>Service Type</div>
              <div>Amount</div>
              <div>Method</div>
              <div>Status</div>
            </div>

            {/* Rows */}
            <div className="divide-y divide-gray-100">
              {filteredTransactions.map((txn, idx) => (
                <div
                  key={idx}
                  className="grid min-w-[900px] grid-cols-6 items-center gap-4 px-6 py-4 hover:bg-gray-50"
                >
                  <div className="truncate text-sm font-medium text-[#675df9]">
                    {txn.id}
                  </div>

                  <div className="flex items-center gap-3 min-w-0">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-200 text-sm">
                      {txn.avatar}
                    </div>

                    <span className="truncate text-sm font-medium text-gray-900">
                      {txn.user}
                    </span>
                  </div>

                  <div className="truncate text-sm text-gray-700">
                    {txn.serviceType}
                  </div>

                  <div className="text-sm font-bold text-gray-900">
                    {txn.amount}
                  </div>

                  <div className="truncate text-sm text-gray-600">
                    {txn.method}
                  </div>

                  <div>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${txn.statusColor}`}
                    >
                      {txn.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Cards */}
          <div className="divide-y divide-gray-100 lg:hidden">
            {filteredTransactions.map((txn, idx) => (
              <div key={idx} className="p-4">
                <div className="mb-3 flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-[#675df9]">
                      {txn.id}
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      {txn.method}
                    </p>
                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${txn.statusColor}`}
                  >
                    {txn.status}
                  </span>
                </div>

                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-sm">
                    {txn.avatar}
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-gray-900">
                      {txn.user}
                    </p>

                    <p className="truncate text-xs text-gray-500">
                      {txn.serviceType}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-lg font-bold text-gray-900">
                    {txn.amount}
                  </p>

                  <button className="rounded-lg bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                    Details
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="flex flex-col gap-4 border-t border-gray-200 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <span className="text-sm text-gray-600">
              Showing {filteredTransactions.length} transactions
            </span>

            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50">
                <ChevronLeft size={16} />
                <span className="hidden sm:block">Previous</span>
              </button>

              <button className="flex items-center gap-1 rounded-xl bg-[#675df9] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#5d51ea]">
                <span className="hidden sm:block">Next</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
