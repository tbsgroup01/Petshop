import React from 'react';
import { useNavigate } from 'react-router-dom';
import NotificationBell from '../Components/NotificationBell';
import { HelpCircle, User, Check, ArrowLeft, ArrowRight, ShieldCheck, Stethoscope, UploadCloud, Info } from 'lucide-react';
import Header from '../Components/Header';

const HealthInfoStep = () => {
  const navigate = useNavigate();
//   const { id } = useParams();

  return (
    <>
      <Header />

      <div className="flex-1 overflow-y-auto p-10  mx-auto w-full">
        <div className="flex items-center justify-between mb-12 relative px-4">
          <div className="absolute top-4 left-10 right-10 h-[2px] bg-gray-100 -z-0" />
          <Step number={<Check/>} label="Basic Details" completed />
          <Step number={<Check/>} label="Pet Specs" completed />
          <Step number="3" label="Health Info" active />
          <Step number="4" label="Final Review" disabled />
        </div>

        <SectionCard icon={<ShieldCheck className="text-emerald-500" size={20} />} title="Vaccination & Wellness" desc="Ensure the pet's preventative health records are up-to-date.">
          <div className="grid grid-cols-2 gap-8 mt-6">
            <div>
              <label className="text-xs font-bold text-slate-500 block mb-3">Vaccination Status</label>
              <ToggleButton options={[`Vaccinated`, `Not Vaccinated`]} activeIndex={0} color="emerald" />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-500 block mb-3">Deworming Status</label>
              <ToggleButton options={[`Completed`, `Pending`]} activeIndex={0} color="indigo" />
            </div>
          </div>
          <div className="mt-8">
            <label className="text-xs font-bold text-slate-500 block mb-3">Vaccination Details</label>
            <div className="relative">
              <Stethoscope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
              <input type="text" placeholder="e.g. DHPP, Rabies, Bordetella" className="w-full bg-white border border-gray-100 rounded-xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-indigo-200 transition" />
            </div>
            <p className="text-[10px] text-gray-400 italic mt-2 ml-1">Separate multiple vaccines with commas.</p>
          </div>
        </SectionCard>

        <SectionCard icon={<div className="p-1 bg-indigo-50 rounded-lg"><Stethoscope className="text-indigo-500" size={20} /></div>} title="Medical Background" desc="Provide history on chronic conditions or specific care needs.">
          <div className="space-y-6 mt-6">
            <TextAreaGroup label="Medical History" placeholder="Describe any past surgeries, chronic illnesses, or recent clinic visits..." />
            <TextAreaGroup label="Special Care Instructions" placeholder="Dietary restrictions, behavioral triggers, or administration of ongoing medication..." />
            <div>
              <label className="text-xs font-bold text-slate-500 block mb-3">Health Certificate & Documents</label>
              <div className="border-2 border-dashed border-indigo-100 bg-indigo-50/20 rounded-[24px] p-10 flex flex-col items-center justify-center group cursor-pointer hover:bg-indigo-50/40 transition-colors">
                <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <UploadCloud className="text-indigo-600" size={24} />
                </div>
                <p className="text-sm font-bold text-slate-700 mb-1">Upload Health Certificate</p>
                <p className="text-[10px] text-gray-400 font-medium">Drag and drop or <span className="text-indigo-600 underline">browse</span> to upload PDF or JPG (Max 5MB)</p>
              </div>
            </div>
          </div>
        </SectionCard>

        <div className="flex items-center justify-between mt-10">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 px-6 py-2 text-sm font-bold text-slate-400 hover:text-slate-600 transition"><ArrowLeft size={16} /> Back</button>
          <div className="flex items-center gap-8">
            <button className="text-sm font-bold text-slate-400 hover:text-slate-600 transition">Save as Draft</button>
            <button onClick={() => navigate('/health-info')}  className="flex items-center gap-2 bg-indigo-600 text-white px-10 py-3 rounded-2xl font-bold text-sm shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition">
              Next Step <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

// Reuse small components from original file
const Step = ({ number, label, active = false, completed = false, disabled = false }) => (
  <div className={`flex flex-col items-center gap-2 relative z-10 ${disabled ? 'opacity-30' : 'opacity-100'}`}>
    <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${completed ? 'bg-indigo-600 border-indigo-600 text-white' : active ? 'bg-white border-indigo-600 text-indigo-600 shadow-md ring-4 ring-indigo-50' : 'bg-white border-gray-100 text-gray-400'}`}>
      {number}
    </div>
    <span className={`text-[10px] font-bold ${active || completed ? 'text-indigo-600' : 'text-gray-400'}`}>{label}</span>
  </div>
);

const SectionCard = ({ icon, title, desc, children }) => (
  <div className="bg-white rounded-[32px] border border-gray-100 p-10 shadow-sm mb-8">
    <div className="flex gap-4 mb-2">
      <div className="shrink-0">{icon}</div>
      <div>
        <h3 className="text-lg font-bold text-slate-800">{title}</h3>
        <p className="text-[11px] text-gray-400 font-medium">{desc}</p>
      </div>
    </div>
    {children}
  </div>
);

const ToggleButton = ({ options, activeIndex, color }) => {
  const activeStyles = color === 'emerald' ? 'bg-white text-emerald-500 shadow-sm ring-1 ring-emerald-100' : 'bg-white text-indigo-600 shadow-sm ring-1 ring-indigo-100';
  return (
    <div className="bg-gray-50 p-1 rounded-xl flex border border-gray-100">
      {options.map((opt, i) => (
        <button key={opt} className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 ${i === activeIndex ? activeStyles : 'text-gray-400 hover:text-gray-600'}`}>
          {i === activeIndex && <div className={`w-1.5 h-1.5 rounded-full ${color === 'emerald' ? 'bg-emerald-500' : 'bg-indigo-600'}`} />}
          {opt}
        </button>
      ))}
    </div>
  );
};

const TextAreaGroup = ({ label, placeholder }) => (
  <div>
    <label className="text-xs font-bold text-slate-500 block mb-3">{label}</label>
    <textarea placeholder={placeholder} className="w-full bg-white border border-gray-100 rounded-xl p-5 text-sm min-h-[120px] focus:outline-none focus:border-indigo-200 transition leading-relaxed placeholder:text-gray-300" />
  </div>
);

export default HealthInfoStep;
