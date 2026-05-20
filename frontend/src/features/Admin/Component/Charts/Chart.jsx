import React from "react";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const lineChartData = [
  { month: "Jan", userGrowth: 4000, revenue: 2400 },
  { month: "Feb", userGrowth: 3200, revenue: 2700 },
  { month: "Mar", userGrowth: 4500, revenue: 3200 },
  { month: "Apr", userGrowth: 5200, revenue: 4100 },
  { month: "May", userGrowth: 6100, revenue: 5300 },
  { month: "Jun", userGrowth: 6900, revenue: 6400 },
];

const activityShareData = [
  { name: "Users", value: 42, color: "#6366f1" },
  { name: "Revenue", value: 32, color: "#10b981" },
  { name: "Vendors", value: 26, color: "#f59e0b" },
];

export default function Chart() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-[2fr_1fr] gap-6">
      <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-800">User Growth & Revenue</h3>
          <p className="text-sm text-gray-500">
            Month-by-month growth for users and revenue over the last 6 months.
          </p>
        </div>

        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={lineChartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" axisLine={false} tickLine={false} />
            <YAxis axisLine={false} tickLine={false} />
            <Tooltip />
            <Legend verticalAlign="top" height={36} />
            <Line
              type="monotone"
              dataKey="userGrowth"
              name="User Growth"
              stroke="#6366f1"
              strokeWidth={3}
              dot={{ r: 4, fill: "#6366f1" }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="revenue"
              name="Revenue"
              stroke="#10b981"
              strokeWidth={3}
              dot={{ r: 4, fill: "#10b981" }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800">Activity Share</h3>
          <p className="text-sm text-gray-500">Breakdown of the current activity mix across the platform.</p>
        </div>

        <div className="flex flex-col items-center gap-6">
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={activityShareData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={4}
              >
                {activityShareData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>

          <div className="grid w-full grid-cols-3 gap-3 text-sm">
            {activityShareData.map((entry) => (
              <div key={entry.name} className="flex flex-col items-center gap-2 rounded-2xl border border-gray-200 bg-gray-50 p-3">
                <span className="h-3 w-3 rounded-full" style={{ backgroundColor: entry.color }} />
                <span className="font-semibold text-gray-800">{entry.value}%</span>
                <span className="text-gray-500">{entry.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
