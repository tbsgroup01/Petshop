import React, { useState, useEffect } from "react";
import { revenueData } from "../../Data";
export default function RevenueChart() {
  const [animated, setAnimated] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 100);
    return () => clearTimeout(t);
  }, []);

  const maxVal = Math.max(...revenueData.map((d) => Math.max(d.curr, d.prev || 0)));

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-indigo-50">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Revenue Growth</h2>
          <p className="text-xs text-gray-400">
            Cumulative growth over the last 12 months
          </p>
        </div>
        <select className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 text-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-200">
          <option>All Streams</option>
        </select>
      </div>

      <div className="flex items-end  h-44 relative">
        {revenueData.map((d, i) => (
          <div
            key={d.month}
            className="flex-1 flex flex-col items-center h-full justify-end"
          >
            {d.highlight && (
              <div className="text-xs font-bold text-white bg-gray-900 rounded-md px-2 py-0.5 mb-1">
                ₹12.4L
              </div>
            )}
            <div
              className="w-full flex  items-end justify-center"
              style={{ height: "calc(100% - 28px)" }}
            >
              <div
                className=" transition-all duration-700"
                style={{
                  width: "60%",
                  height: animated ? `${(d.curr / maxVal) * 100}%` : "0%",
                  background: d.highlight ? "#4F46E5" : "#C7D2FE",
                  transitionDelay: `${i * 80}ms`,
                }}
              />
              <div
                className="rounded-t-md transition-all duration-700"
                // style={{
                //   width: "48%",
                //   height: animated ? `${(d.prev / maxVal) * 100}%` : "0%",
                //   background: "#E0E7FF",
                //   transitionDelay: `${i * 80 + 40}ms`,
                // }}
              />
            </div>
            <div className="text-[10px] text-gray-400 mt-1">{d.month}</div>
          </div>
        ))}
      </div>

      <div className="flex  justify-center gap-4 mt-4">
        <span className="flex items-center gap-1.5 text-xs text-gray-500">
          <span className="w-3 h-3 rounded-full bg-indigo-600 inline-block" />
          <span className="font-medium text-gray-600 uppercase tracking-wide">
            Current Year
          </span>
        </span>
        <span className="flex items-center gap-1.5 text-xs text-gray-500">
          <span className="w-3 h-3 rounded-full bg-indigo-200 inline-block" />
          <span className="font-medium text-gray-600 uppercase tracking-wide">
            Previous Year
          </span>
        </span>
      </div>
    </div>
  );
}