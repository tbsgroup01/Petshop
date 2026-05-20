import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  ShieldCheck,
  Mail,
  PawPrint,
  Weight,
  BadgeCheck,
  Clock,
  Heart,
} from "lucide-react";

import { listings } from "../../Data";

const statusStyles = {
  Approved: "bg-emerald-100 text-emerald-700",
  Pending: "bg-amber-100 text-amber-700",
  Featured: "bg-violet-100 text-violet-700",
  Rejected: "bg-rose-100 text-rose-700",
};

export default function Petlistingdetail() {
  const { petName } = useParams();

  const navigate = useNavigate();

const { id } = useParams();

const listing = listings.find(
  (item) => item.id === Number(id)
);

  if (!listing) {
    return (
      <div className=" bg-slate-100 flex items-center justify-center ">
        <div className="bg-white rounded-3xl shadow-xl p-10 text-center max-w-md w-full">
          <h1 className="text-3xl font-bold text-red-500">
            Pet Not Found
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
    <div className=" bg-gradient-to-br from-slate-50 to-indigo-50 p-4 sm:p-6 lg:p-8">
      
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm border border-slate-200 hover:bg-slate-50 transition"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </button>

      <div className="overflow-hidden rounded-[2rem] bg-white shadow-xl border border-slate-200">
        
        {/* Banner */}
        <div className="h-44 bg-gradient-to-r from-[#4d41df] via-[#6b5cff] to-[#8f85ff]" />

        <div className="px-5 sm:px-8 lg:px-10 pb-10">
          
          {/* Main Layout */}
          <div className="-mt-24 flex flex-col xl:flex-row gap-10">
            
            {/* Left Side */}
            <div className="xl:w-[350px] flex flex-col items-center xl:items-start">
              
              <div className="h-52 w-52 overflow-hidden rounded-[2rem] border-[6px] border-white shadow-2xl bg-white">
                <img
                  src={listing.image}
                  alt={listing.name}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="mt-6 text-center xl:text-left">
                <h1 className="text-4xl font-bold text-slate-900">
                  {listing.name}
                </h1>

                <p className="mt-2 text-lg text-slate-500">
                  {listing.breed}
                </p>

                <div className="mt-5 flex flex-wrap justify-center xl:justify-start gap-3">
                  
                  <span
                    className={`inline-flex rounded-full px-4 py-2 text-sm font-semibold ${
                      statusStyles[listing.status]
                    }`}
                  >
                    {listing.status}
                  </span>

                  <span className="inline-flex rounded-full px-4 py-2 text-sm font-semibold bg-indigo-100 text-indigo-700">
                    ₹ {listing.price}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Side */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-5 pt-4">
              
              {/* Vendor */}
              <div className="rounded-3xl bg-slate-50 p-6">
                <div className="mb-4 flex items-center gap-3">
                  <PawPrint className="text-[#4d41df]" />
                  <h2 className="text-lg font-bold text-slate-900">
                    Vendor Name
                  </h2>
                </div>

                <p className="text-slate-700 font-medium">
                  {listing.vendor}
                </p>
              </div>

              {/* Listing Date */}
              <div className="rounded-3xl bg-slate-50 p-6">
                <div className="mb-4 flex items-center gap-3">
                  <Calendar className="text-[#4d41df]" />
                  <h2 className="text-lg font-bold text-slate-900">
                    Listing Date
                  </h2>
                </div>

                <p className="text-slate-700 font-medium">
                  {listing.date}
                </p>
              </div>

              {/* Age */}
              <div className="rounded-3xl bg-slate-50 p-6">
                <div className="mb-4 flex items-center gap-3">
                  <Clock className="text-[#4d41df]" />
                  <h2 className="text-lg font-bold text-slate-900">
                    Pet Age
                  </h2>
                </div>

                <p className="text-slate-700 font-medium">
                  {listing.age}
                </p>
              </div>

              {/* Weight */}
              <div className="rounded-3xl bg-slate-50 p-6">
                <div className="mb-4 flex items-center gap-3">
                  <Weight className="text-[#4d41df]" />
                  <h2 className="text-lg font-bold text-slate-900">
                    Weight
                  </h2>
                </div>

                <p className="text-slate-700 font-medium">
                  {listing.weight}
                </p>
              </div>

              {/* Color */}
              <div className="rounded-3xl bg-slate-50 p-6">
                <div className="mb-4 flex items-center gap-3">
                  <Heart className="text-[#4d41df]" />
                  <h2 className="text-lg font-bold text-slate-900">
                    Color
                  </h2>
                </div>

                <p className="text-slate-700 font-medium">
                  {listing.color}
                </p>
              </div>

              {/* Health Certificate */}
              <div className="rounded-3xl bg-slate-50 p-6">
                <div className="mb-4 flex items-center gap-3">
                  <ShieldCheck className="text-[#4d41df]" />
                  <h2 className="text-lg font-bold text-slate-900">
                    Health Certificate
                  </h2>
                </div>

                <p className="text-slate-700 font-medium">
                  {listing.healthCertificate}
                </p>
              </div>

              {/* Vaccinated */}
              <div className="rounded-3xl bg-slate-50 p-6">
                <div className="mb-4 flex items-center gap-3">
                  <BadgeCheck className="text-[#4d41df]" />
                  <h2 className="text-lg font-bold text-slate-900">
                    Vaccinated
                  </h2>
                </div>

                <span
                  className={`inline-flex rounded-full px-4 py-2 text-sm font-semibold ${
                    listing.vaccinated
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-rose-100 text-rose-700"
                  }`}
                >
                  {listing.vaccinated ? "Yes" : "No"}
                </span>
              </div>

              {/* Microchipped */}
              <div className="rounded-3xl bg-slate-50 p-6">
                <div className="mb-4 flex items-center gap-3">
                  <Mail className="text-[#4d41df]" />
                  <h2 className="text-lg font-bold text-slate-900">
                    Microchipped
                  </h2>
                </div>

                <span
                  className={`inline-flex rounded-full px-4 py-2 text-sm font-semibold ${
                    listing.microchipped
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-rose-100 text-rose-700"
                  }`}
                >
                  {listing.microchipped ? "Yes" : "No"}
                </span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mt-10 rounded-[2rem] bg-slate-50 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Pet Description
            </h2>

            <p className="text-slate-600 leading-relaxed text-base">
              {listing.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}