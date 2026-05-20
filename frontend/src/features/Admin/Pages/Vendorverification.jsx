import { useState } from "react";
import { FileIcon } from "../Component/icons/Fileicon";
import { EyeIcon } from "../Component/icons/EyeIcon";
import { ClockIcon } from "../Component/icons/ClockIcon";
import { CertIcon } from "../Component/icons/CertIcon";
import { IdIcon } from "../Component/icons/Idicon";
import { ClipboardIcon } from "../Component/icons/ClipboardIcon";
import XCircleIcon from "../Component/icons/XCircleIcon";
import { CheckCircleIcon } from "../Component/icons/CheckCircleIcon";
import { RefreshIcon } from "../Component/icons/RefreshIcon";
import { ZoomOutIcon } from "../Component/icons/ZoomOutIcon";
import { ZoomInIcon } from "../Component/icons/ZoomInIcon";
import { IDCardSVG } from "../Component/icons/IDCardSVG";
import { VendorAvatar } from "../Component/icons/VendorAvatar";
import { ChatIcon } from "../Component/icons/ChatIcon";
import { useNavigate } from "react-router-dom";

// ─── Doc Chip ─────────────────────────────────────────────────────────────────

const DocChip = ({ iconType, label, sub, highlight }) => {
  // Map icon types to actual icons
  const iconMap = {
    file: <FileIcon />,
    id: <IdIcon />,
    cert: <CertIcon />,
  };

  const subColor =
    sub === "Verified"
      ? "text-green-600"
      : sub === "Viewing Now"
        ? "text-indigo-600"
        : sub === "Awaiting"
          ? "text-orange-500"
          : "text-gray-500";

  return (
    <div
      className={`flex items-start gap-2 rounded-lg px-2 bg-gray-50 sm:px-3 py-2 border text-xs sm:text-sm ${highlight
        ? "bg-indigo-50 border-indigo-200"
        : "bg-gray-50 border-gray-200"
        }`}
    >
      <span className="mt-0.5 text-gray-500 flex-shrink-0">{iconMap[iconType]}</span>
      <div className="min-w-0">
        <p className="text-xs font-semibold text-gray-800 leading-tight truncate">{label}</p>
        <p className={`text-xs font-medium flex items-center gap-0.5 mt-0.5 ${subColor}`}>
          {sub === "Verified" && <span>✓</span>}
          {sub}
        </p>
      </div>
    </div>
  );
};

// ─── Stat Card ────────────────────────────────────────────────────────────────

const StatCard = ({ icon, label, value, iconBg }) => (
  <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 bg-white rounded-xl px-3 sm:px-5 py-3 sm:py-4 flex-1 shadow-sm">
    <div className={`w-8 sm:w-9 h-8 sm:h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${iconBg}`}>
      {icon}
    </div>
    <div className="text-center sm:text-left">
      <p className="text-xs text-gray-500 font-medium">{label}</p>
      <p className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">{value}</p>
    </div>
  </div>
);

// ─── Vendor Card ──────────────────────────────────────────────────────────────

const VendorCard = ({ vendor, selected, onClick }) => {
  const isInReview = vendor.status === "In Review";
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-xl p-3 sm:p-4 cursor-pointer border-2 transition-all duration-200 ${selected
        ? "border-indigo-500 shadow-md"
        : "border-transparent shadow-sm hover:shadow-md hover:border-indigo-200"
        }`}
    >
      {/* Top row */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <VendorAvatar type={vendor.avatarType} />
          <div className="min-w-0 flex-1">
            <p className="font-bold text-gray-900 text-xs sm:text-sm truncate">{vendor.name}</p>
            <div className="flex items-center gap-1 sm:gap-2 mt-0.5 flex-wrap text-xs">
              <span className="text-xs text-indigo-700 bg-indigo-50 border border-indigo-200 rounded px-1.5 py-0.5 font-medium whitespace-nowrap">
                {vendor.type}
              </span>
              <span className="text-xs text-gray-400 whitespace-nowrap">• {vendor.submitted}</span>
            </div>
          </div>
        </div>
        <span
          className={`text-xs font-semibold px-2 sm:px-2.5 py-1 rounded-full flex items-center gap-1 flex-shrink-0 whitespace-nowrap ${isInReview
            ? "bg-indigo-50 text-indigo-700"
            : "bg-amber-50 text-amber-700"
            }`}
        >
          {isInReview ? <EyeIcon /> : <ClockIcon />}
          {vendor.status}
        </span>
      </div>

      {/* Documents */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-3">
        {vendor.docs.map((doc, i) => (
          <DocChip key={i} {...doc} />
        ))}
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 pt-1">
        <button className="flex items-center justify-center sm:justify-start gap-1.5 text-xs text-indigo-600 font-medium hover:text-indigo-800 transition-colors whitespace-nowrap order-2 sm:order-none">
          <ChatIcon />
          <span className="hidden md:inline">Request More Info</span>
          <span className="md:hidden">Request</span>
        </button>
        <div className="hidden sm:flex-1" />
        <div className="flex items-center gap-2 order-1 sm:order-none">
          <button className="flex-1 sm:flex-initial px-3 sm:px-4 py-1.5 rounded-lg text-xs font-semibold border border-red-200 text-red-600 hover:bg-red-50 transition-colors">
            Reject
          </button>
          <button
            className={`flex-1 sm:flex-initial px-3 sm:px-4 py-1.5 rounded-lg text-xs font-semibold text-white transition-colors ${isInReview
              ? "bg-indigo-600 hover:bg-indigo-700"
              : "bg-indigo-300 cursor-default"
              }`}
          >
            Approve
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Data ─────────────────────────────────────────────────────────────────────
// NO REACT ELEMENTS in the data - only serializable values

const vendors = [
  {
    id: 1,
    name: "Elite Paws Veterinary Clinic",
    type: "Registered Clinic",
    submitted: "Submitted 2h ago",
    status: "In Review",
    avatarType: "clinic",
    docs: [
      { iconType: "file", label: "Business License", sub: "Verified", highlight: false },
      { iconType: "id", label: "ID Proof (CEO)", sub: "Viewing Now", highlight: true },
      { iconType: "cert", label: "Certifications", sub: "Awaiting", highlight: false },
    ],
  },
  {
    id: 2,
    name: "Noble Goldens Breeding",
    type: "Breeder",
    submitted: "Submitted 5h ago",
    status: "Pending",
    avatarType: "person",
    docs: [
      { iconType: "file", label: "Business License", sub: "Ready to Review", highlight: false },
      { iconType: "id", label: "ID Proof (CEO)", sub: "Ready to Review", highlight: false },
      { iconType: "cert", label: "Certifications", sub: "Ready to Review", highlight: false },
    ],
  },
];

// ─── Main Component ───────────────────────────────────────────────────────────

export default function VendorVerification() {
  const [selected, setSelected] = useState(0);
  const navigate = useNavigate();

  const handleVendorClick = (vendor, index) => {
    setSelected(index);
    // Pass vendor data through state (now it's serializable)
    navigate(`/admin/vendor-details/${vendor.id}`, { state: { vendor } });
  };

  return (
    <div className="bg-gray-50 p-4 sm:p-10 font-sans min-h-screen">
      <div className="w-full">

        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4 mb-4 sm:mb-5">
          <div className="flex-1 min-w-0">
           
               <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
             Vendor Verification
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
              Review and manage vendor onboarding requests with clinical precision.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 flex-shrink-0">
            {/* <button className="text-xs sm:text-sm font-medium px-3 sm:px-4 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 transition-colors whitespace-nowrap">
              Filter By Type
            </button> */}
            <button className="text-xs sm:text-sm font-medium px-3 sm:px-4 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 transition-colors whitespace-nowrap">
              Export Report
            </button>
          </div>
        </div>

        {/* ── Stat Cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 mb-4 sm:mb-5">
          <StatCard
            label="Total Requests"
            value="1,284"
            iconBg="bg-indigo-50 text-indigo-600"
            icon={<ClipboardIcon />}
          />
          <StatCard
            label="Pending Review"
            value="42"
            iconBg="bg-amber-50 text-amber-500"
            icon={<ClockIcon />}
          />
          <StatCard
            label="Approved Today"
            value="18"
            iconBg="bg-green-50 text-green-500"
            icon={<CheckCircleIcon />}
          />
          <StatCard
            label="Rejected"
            value="3"
            iconBg="bg-red-50 text-red-500"
            icon={<XCircleIcon />}
          />
        </div>

        {/* ── Main Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 sm:gap-4">

          {/* Left: Queue */}
          <div className="lg:col-span-3 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 mb-3 sm:mb-4">
              <h2 className="text-xs font-bold text-gray-500 tracking-widest uppercase whitespace-nowrap">
                Queue: 42 Requests
              </h2>
              <div className="flex items-center gap-1 text-xs text-gray-500 whitespace-nowrap">
                Sort by:&nbsp;
                <span className="text-indigo-600 font-semibold cursor-pointer">
                  Newest First ▾
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-2 sm:gap-3">
              {vendors.map((v, i) => (
                <VendorCard
                  key={v.id}
                  vendor={v}
                  selected={selected === i}
                  onClick={() => handleVendorClick(v, i)}
                />
              ))}
            </div>
          </div>

          {/* Right: Document Preview Panel */}
          <div className="lg:col-span-1 w-full min-w-0">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">

              {/* Panel header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3 px-3 sm:px-4 py-3 border-b border-gray-100">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-5 h-5 bg-indigo-100 rounded flex items-center justify-center flex-shrink-0">
                    <IdIcon className="w-3 h-3 text-indigo-600" />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-gray-800 truncate">ID Proof (CEO)</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400 flex-shrink-0">
                  <button className="hover:text-gray-600 transition-colors p-1"><ZoomInIcon /></button>
                  <button className="hover:text-gray-600 transition-colors p-1"><ZoomOutIcon /></button>
                  <button className="hover:text-gray-600 transition-colors p-1"><RefreshIcon /></button>
                </div>
              </div>

              {/* ID Card */}
              <div className="p-2 sm:p-4 bg-gray-50">
                <div className="rounded-xl overflow-hidden shadow-lg p-2 sm:p-3" style={{ background: "#061b2a" }}>
                  <IDCardSVG />
                </div>
              </div>

              {/* Verification level */}
              <div className="px-3 sm:px-4 py-2 sm:pb-3">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2 mb-1.5">
                  <span className="text-xs font-semibold text-gray-600">Verification Level:</span>
                  <span className="text-xs font-bold text-green-700">High Accuracy Match</span>
                </div>
                <div className="h-1.5 rounded-full bg-gray-200 overflow-hidden mb-1.5">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: "88%",
                      background: "linear-gradient(90deg, #10b981, #059669)",
                    }}
                  />
                </div>
                <p className="text-xs text-gray-400">
                  AI Analysis: ID matches government database standards.
                </p>
              </div>

              {/* Mark Valid button */}
              <div className="px-3 sm:px-4 pb-3 sm:pb-4">
                <button className="w-full py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-100 transition-colors">
                  Mark Document as Valid
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
