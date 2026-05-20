import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  ShieldCheck,
  Mail,
  PawPrint,
  Clock,
  BadgeCheck,
} from "lucide-react";

import { bookings } from "../../Data";

const statusStyles = {
  Completed: "bg-emerald-100 text-emerald-700",
  Pending: "bg-amber-100 text-amber-700",
  Confirmed: "bg-blue-100 text-blue-700",
  Cancelled: "bg-rose-100 text-rose-700",
};

export default function BookingDetails() {
  const { petName } = useParams();

  const navigate = useNavigate();

  const booking = bookings.find(
    (item) =>
      item.pet.toLowerCase() === petName.toLowerCase()
  );

  if (!booking) {
    return (
      <div className="min-h-screen sm:h-screen bg-slate-100 flex items-center justify-center p-5">
        <div className="bg-white rounded-3xl shadow-xl p-10 text-center max-w-md w-full">
          <h1 className="text-3xl font-bold text-red-500">
            Booking Not Found
          </h1>

          <button
            onClick={() => navigate(-1)}
            className="mt-6 px-6 py-3 rounded-2xl bg-[#4d41df] text-white font-semibold"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 p-4 sm:p-6 lg:p-8">
      
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm border border-slate-200 hover:bg-slate-50 transition"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </button>

      <div className="overflow-hidden rounded-[2rem] bg-white shadow-xl border border-slate-200">
        
        {/* Top Banner */}
        <div className="h-40 bg-gradient-to-r from-[#4d41df] to-[#7a70ff]" />

        <div className="px-5 sm:px-8 lg:px-10 pb-10">
          
          {/* Main Section */}
          <div className="-mt-20 flex flex-col xl:flex-row gap-8">
            
            {/* Left Side */}
            <div className="xl:w-[340px] flex flex-col items-center xl:items-start">
              
              <div className="h-44 w-44 overflow-hidden rounded-[2rem] border-4 border-white shadow-2xl bg-white">
                <img
                  src={booking.avatar}
                  alt={booking.pet}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="mt-6 text-center xl:text-left">
                <h1 className="text-4xl font-bold text-slate-900">
                  {booking.pet}
                </h1>

                <p className="mt-2 text-lg text-slate-500">
                  {booking.breed}
                </p>
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                
                <span
                  className={`inline-flex rounded-full px-4 py-2 text-sm font-semibold ${booking.statusColor}`}
                >
                  {booking.status}
                </span>

                <span
                  className={`inline-flex rounded-full px-4 py-2 text-sm font-semibold ${booking.serviceColor}`}
                >
                  {booking.service}
                </span>
              </div>
            </div>

            {/* Right Side */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-5 pt-4">
              
              {/* Owner */}
              <div className="rounded-3xl bg-slate-50 p-6">
                <div className="mb-4 flex items-center gap-3">
                  <PawPrint className="text-[#4d41df]" />
                  <h2 className="text-lg font-bold text-slate-900">
                    Owner Name
                  </h2>
                </div>

                <p className="text-slate-700 font-medium">
                  {booking.owner}
                </p>
              </div>

              {/* Email */}
              <div className="rounded-3xl bg-slate-50 p-6">
                <div className="mb-4 flex items-center gap-3">
                  <Mail className="text-[#4d41df]" />
                  <h2 className="text-lg font-bold text-slate-900">
                    Email Address
                  </h2>
                </div>

                <p className="text-slate-700 font-medium break-all">
                  {booking.email}
                </p>
              </div>

              {/* Service */}
              <div className="rounded-3xl bg-slate-50 p-6">
                <div className="mb-4 flex items-center gap-3">
                  <ShieldCheck className="text-[#4d41df]" />
                  <h2 className="text-lg font-bold text-slate-900">
                    Service Type
                  </h2>
                </div>

                <p className="text-slate-700 font-medium">
                  {booking.service}
                </p>
              </div>

              {/* Booking Dates */}
              <div className="rounded-3xl bg-slate-50 p-6">
                <div className="mb-4 flex items-center gap-3">
                  <Calendar className="text-[#4d41df]" />
                  <h2 className="text-lg font-bold text-slate-900">
                    Booking Dates
                  </h2>
                </div>

                <p className="text-slate-700 font-medium">
                  {booking.dates}
                </p>
              </div>

              {/* Booking Details */}
              <div className="rounded-3xl bg-slate-50 p-6">
                <div className="mb-4 flex items-center gap-3">
                  <Clock className="text-[#4d41df]" />
                  <h2 className="text-lg font-bold text-slate-900">
                    Booking Details
                  </h2>
                </div>

                <p className="text-slate-700 font-medium">
                  {booking.details}
                </p>
              </div>

              {/* Status */}
              <div className="rounded-3xl bg-slate-50 p-6">
                <div className="mb-4 flex items-center gap-3">
                  <BadgeCheck className="text-[#4d41df]" />
                  <h2 className="text-lg font-bold text-slate-900">
                    Booking Status
                  </h2>
                </div>

                <span
                  className={`inline-flex rounded-full px-4 py-2 text-sm font-semibold ${statusStyles[booking.status]}`}
                >
                  {booking.status}
                </span>
              </div>
            </div>
          </div>

          {/* Extra Description */}
          <div className="mt-10 rounded-[2rem] bg-slate-50 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Booking Overview
            </h2>

            <p className="text-slate-600 leading-relaxed">
              This booking has been scheduled for{" "}
              <span className="font-semibold text-slate-800">
                {booking.service}
              </span>{" "}
              service for{" "}
              <span className="font-semibold text-slate-800">
                {booking.pet}
              </span>
              . The appointment is currently marked as{" "}
              <span className="font-semibold text-slate-800">
                {booking.status}
              </span>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}