import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import NotificationBell from '../Components/NotificationBell';
import {
  Search,
  HelpCircle,
  ArrowLeft,
  ArrowRight,
  Eye,
  ShieldCheck,
  Info,
  Zap,
  Image as ImageIcon,
} from "lucide-react";

const AddPetdetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <>
      {/* Header */}
      <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 shrink-0">
        <div className="relative w-96">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300"
            size={18}
          />
          <input
            type="text"
            placeholder="Search clinic database..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 rounded-xl text-sm focus:outline-none border border-transparent focus:border-indigo-100"
          />
        </div>
        <div className="flex items-center gap-6">
          <NotificationBell iconClassName="text-gray-400" />
          <HelpCircle size={20} className="text-gray-400" />
          <div className="flex items-center gap-3 pl-4 border-l border-gray-100">
            <div className="text-right">
              <p className="text-xs font-bold text-slate-800 leading-none">
                Dr. Ananya Rao
              </p>
              <p className="text-[9px] text-gray-400 font-bold uppercase mt-1">
                Chief Vet Admin
              </p>
            </div>
            <img
              src="https://i.pravatar.cc/100?u=ananya"
              className="w-8 h-8 rounded-full border border-gray-200"
              alt="Admin"
            />
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-10  mx-auto w-full">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-slate-900">
            Add New Pet Listing
          </h2>
          <p className="text-slate-400 mt-1 text-sm font-medium">
            Register a new pet to the clinic database and marketplace.
          </p>
        </div>

        {/* Stepper (static visual) */}
        <div className="bg-white rounded-[24px] p-6 border border-gray-100 shadow-sm mb-8">
          <div className="flex items-center justify-between relative max-w-3xl mx-auto">
            <div className="absolute top-4 left-0 w-full h-[2px] bg-gray-100 -z-0" />
            <Step number={<CheckIcon />} label="BASIC INFO" completed />
            <Step number="02" label="DETAILS" active />
            <Step number="03" label="HEALTH INFO" disabled />
            <Step number="04" label="UPLOAD IMAGES" disabled />
            <Step number="05" label="PUBLISH" disabled />
          </div>
        </div>

        {/* Form Card (placeholder content preserved) */}
        <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm p-10 mb-8">
          <div className="flex justify-between items-start mb-10">
            <div>
              <h3 className="text-xl font-bold text-slate-800">
                Pet Listing Details
              </h3>
              <p className="text-xs text-gray-400 font-medium mt-1">
                Provide specific commercial and behavioral data.
              </p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-xl text-[10px] font-bold border border-emerald-100 uppercase">
              <ShieldCheck size={14} /> Verified Listing Mode
            </div>
          </div>

          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-7 space-y-8">
              <div className="grid grid-cols-2 gap-6">
                <InputBox
                  label="Price (Adoption/Sale Fee)"
                  prefix="₹"
                  placeholder="0.00"
                />
                <InputBox
                  label="Location"
                  icon={<Search size={16} />}
                  placeholder="e.g. Mumbai, MH"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block mb-3">
                  Description
                </label>
                <textarea
                  placeholder="Describe the pet's temperament, behavior, and any important details..."
                  className="w-full bg-white border border-gray-100 rounded-2xl p-5 text-sm min-h-[160px] focus:outline-none focus:border-indigo-200 transition leading-relaxed placeholder:text-gray-300"
                />
                <p className="text-right text-[10px] text-gray-300 mt-2 font-medium">
                  0 / 500 characters
                </p>
              </div>
            </div>

            <div className="col-span-5 space-y-6">
              <div className="bg-slate-50/50 rounded-3xl p-6 border border-slate-100">
                <div className="flex items-center gap-3 text-indigo-600 mb-6">
                  <Eye size={18} />
                  <h4 className="font-bold text-sm">Status & Visibility</h4>
                </div>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-sm font-bold text-slate-700">
                      Availability
                    </p>
                    <p className="text-[10px] text-gray-400">
                      Display pet in public marketplace
                    </p>
                  </div>
                  <div className="w-11 h-6 bg-emerald-500 rounded-full relative cursor-pointer">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                  </div>
                </div>
                <div className="space-y-3">
                  <StatusItem
                    icon={<Info className="text-indigo-500" size={14} />}
                    label="Listing Expiry"
                    sub="STANDARD: 30 DAYS"
                  />
                  <StatusItem
                    icon={<Zap className="text-emerald-500" size={14} />}
                    label="Featured Placement"
                    sub="AVAILABLE FOR UPGRADE"
                    accent
                  />
                </div>
              </div>

              <div className="bg-gray-50 border-2 border-dashed border-gray-100 rounded-3xl h-32 flex flex-col items-center justify-center text-center p-6 grayscale opacity-40">
                <ImageIcon className="text-gray-300 mb-2" size={24} />
                <p className="text-[10px] font-bold text-gray-400 leading-tight">
                  Image preview will be available in the next step.
                </p>
              </div>
            </div>
          </div>

          {/* Footer Controls */}
          <div className="flex items-center justify-between mt-8">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 px-8 py-3 bg-white border border-gray-100 rounded-2xl text-sm font-bold text-slate-500 hover:bg-gray-50 transition"
            >
              <ArrowLeft size={16} /> Back
            </button>
            <div className="flex gap-4">
              <button className="px-8 py-3 bg-white border border-gray-100 rounded-2xl text-sm font-bold text-slate-400 hover:bg-gray-50 transition">
                Save as Draft
              </button>
              <button
                onClick={() => navigate(`/${id}/health`)}
                className="flex items-center gap-2 px-10 py-3 bg-indigo-600 text-white rounded-2xl text-sm font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition"
              >
                Next Step <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// --- Subcomponents reused from original file ---
const CheckIcon = () => (
  <div className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center text-white">
    <svg className="w-3 h-3" viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M20.285 6.708l-11.39 11.39-5.178-5.18 1.414-1.414 3.764 3.766 9.976-9.977z"
      />
    </svg>
  </div>
);

const Step = ({
  number,
  label,
  active = false,
  completed = false,
  disabled = false,
}) => (
  <div
    className={`flex flex-col items-center gap-2 relative z-10 ${disabled ? "opacity-30" : "opacity-100"}`}
  >
    <div
      className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${completed ? "bg-indigo-600 border-indigo-600 text-white" : active ? "bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-100" : "bg-white border-gray-100 text-gray-400"}`}
    >
      {number}
    </div>
    <span
      className={`text-[9px] font-bold tracking-widest ${active ? "text-indigo-600" : "text-gray-400"}`}
    >
      {label}
    </span>
  </div>
);

const InputBox = ({ label, prefix, icon, placeholder }) => (
  <div className="flex-1">
    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block mb-3">
      {label}
    </label>
    <div className="relative">
      {prefix && (
        <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
          {prefix}
        </span>
      )}
      {icon && (
        <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300">
          {icon}
        </span>
      )}
      <input
        type="text"
        placeholder={placeholder}
        className={`w-full bg-white border border-gray-100 rounded-2xl py-3.5 pr-5 text-sm focus:outline-none focus:border-indigo-200 transition placeholder:text-gray-300 ${prefix || icon ? "pl-11" : "pl-5"}`}
      />
    </div>
  </div>
);

const StatusItem = ({ icon, label, sub, accent = false }) => (
  <div
    className={`flex items-center gap-4 p-4 rounded-2xl border ${accent ? "bg-emerald-50/30 border-emerald-100/50" : "bg-white border-gray-100 shadow-sm"}`}
  >
    <div
      className={`w-8 h-8 rounded-lg flex items-center justify-center ${accent ? "bg-emerald-50" : "bg-indigo-50"}`}
    >
      {icon}
    </div>
    <div>
      <p className="text-[10px] font-bold text-slate-700 leading-none">
        {label}
      </p>
      <p
        className={`text-[8px] font-bold mt-1 uppercase tracking-tighter ${accent ? "text-emerald-500" : "text-gray-400"}`}
      >
        {sub}
      </p>
    </div>
  </div>
);

export default AddPetdetail;
