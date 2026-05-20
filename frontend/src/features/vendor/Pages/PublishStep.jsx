import React from 'react';
import { useNavigate } from 'react-router-dom';
import NotificationBell from '../Components/NotificationBell';
import { HelpCircle, User, ArrowLeft, Rocket, Check, MapPin, Calendar, Eye, ShieldCheck } from 'lucide-react';
import Header from '../Components/Header';

const PublishStep = () => {
  const navigate = useNavigate();

  const handlePublish = () => {
    // TODO: call API to publish listing; for now navigate back to pets
    navigate('/vendor/pets');
  };

  return (
    <>
      <Header />

      <div className="flex-1 overflow-y-auto p-10 max-w-6xl mx-auto w-full">
        <div className="flex items-center justify-between mb-12 relative px-4 max-w-4xl mx-auto">
          <div className="absolute top-4 left-10 right-10 h-[2px] bg-gray-100 -z-0" />
          <Step number={<Check/>} label="Basic Info" completed />
          <Step number={<Check/>} label="Details" completed />
          <Step number={<Check/>} label="Health" completed />
          <Step number={<Check/>} label="Gallery" completed />
          <Step number="5" label="Publish" active />
        </div>

        <div className="grid grid-cols-12 gap-8 items-start">
          <div className="col-span-7 space-y-6">
            <div className="flex items-center gap-2 text-indigo-600 mb-2"><Eye size={18} /><h3 className="font-bold text-sm">Marketplace Preview</h3></div>
            <div className="bg-white rounded-[40px] border border-gray-100 shadow-xl overflow-hidden">
              <div className="relative h-96 group">
                <img src="https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=1000" className="w-full h-full object-cover" alt="Golden Retriever" />
                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 via-black/20 to-transparent text-white">
                  <p className="text-xs font-medium opacity-80 mb-1">Purebred</p>
                  <div className="flex justify-between items-end"><h4 className="text-2xl font-bold">Golden Retriever</h4><span className="text-2xl font-bold">₹15,000</span></div>
                </div>
              </div>
              <div className="p-8">
                <div className="flex gap-6 mb-6"><PreviewBadge icon={<MapPin size={14}/>} label="Mumbai, MH" /><PreviewBadge icon={<Calendar size={14}/>} label="3 Months Old" /><PreviewBadge icon={<User size={14}/>} label="Male" /></div>
                <h5 className="font-bold text-slate-800 mb-2">About this pet</h5>
                <p className="text-sm text-slate-500 leading-relaxed mb-8">Friendly, active, and perfectly socialized Golden Retriever puppy...</p>
                <div className="flex justify-between items-center pt-6 border-t border-gray-50"><div className="flex -space-x-3">{[1,2,3].map(i=> (<div key={i} className="w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-gray-100"><img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="" /></div>))}<div className="w-8 h-8 rounded-full bg-gray-50 border-2 border-white flex items-center justify-center text-[10px] font-bold text-gray-400">+3</div></div><span className="text-[10px] text-gray-300 font-bold italic">Listing preview only</span></div>
              </div>
            </div>
          </div>
          <div className="col-span-5 space-y-6">
            <div className="bg-white rounded-[32px] border border-gray-100 p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-8"><div className="p-2 bg-emerald-50 text-emerald-500 rounded-xl"><Check size={20} /></div><h3 className="font-bold text-slate-800">Completion Checklist</h3></div>
              <div className="space-y-4"><CheckItem label="Basic Information" /><CheckItem label="Pet Details & Traits" /><CheckItem label="Health & Vaccination Record" /><CheckItem label="High-Resolution Images" /></div>
            </div>
            <div className="bg-white rounded-[32px] border border-gray-100 p-8 shadow-sm">
              <h3 className="font-bold text-slate-800 mb-6">Visibility Settings</h3>
              <div className="p-5 bg-indigo-50/50 rounded-2xl border border-indigo-100/50 flex items-center justify-between">
                <div><p className="text-xs font-bold text-indigo-600 mb-0.5">Public Listing</p><p className="text-[10px] text-indigo-400 font-medium">Visible to all marketplace visitors immediately</p></div>
                <div className="w-11 h-6 bg-indigo-600 rounded-full relative cursor-pointer shadow-inner shadow-indigo-900/10"><div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" /></div>
              </div>
            </div>
            <div className="bg-white rounded-[32px] border border-gray-100 p-8 shadow-sm"><div className="flex gap-4 items-start"><div className="w-5 h-5 rounded border-2 border-gray-200 mt-1 flex items-center justify-center cursor-pointer hover:border-indigo-400 transition" /><p className="text-[11px] text-slate-500 leading-relaxed font-medium">I confirm that all health records and images provided are authentic. I agree to <span className="text-indigo-600 font-bold cursor-pointer">Seller Terms of Service</span> and marketplace guidelines.</p></div></div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-12 border-t border-gray-100 pt-10">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 px-8 py-3 bg-white border border-gray-100 rounded-2xl text-sm font-bold text-slate-500 hover:bg-gray-50 transition"><ArrowLeft size={16} /> Back</button>
          <div className="flex items-center gap-8"><button className="text-sm font-bold text-indigo-600 hover:text-indigo-700 transition">Save as Draft</button><button onClick={handlePublish} className="flex items-center gap-3 bg-indigo-600 text-white px-10 py-3.5 rounded-2xl font-bold text-sm shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition active:scale-95"><Rocket size={18} /> Publish Listing</button></div>
        </div>
      </div>
    </>
  );
};

const Step = ({ number, label, active = false, completed = false }) => (
  <div className={`flex flex-col items-center gap-2 relative z-10 ${!active && !completed ? 'opacity-30' : 'opacity-100'}`}>
    <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${completed ? 'bg-emerald-500 border-emerald-500 text-white' : active ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-100' : 'bg-white border-gray-100 text-gray-400'}`}>
      {number}
    </div>
    <span className={`text-[9px] font-bold tracking-widest uppercase ${active ? 'text-indigo-600' : 'text-gray-400'}`}>{label}</span>
  </div>
);

const PreviewBadge = ({ icon, label }) => (
  <div className="flex items-center gap-2 text-indigo-500"><div className="p-1.5 bg-indigo-50 rounded-lg">{icon}</div><span className="text-xs font-bold text-slate-700">{label}</span></div>
);

const CheckItem = ({ label }) => (
  <div className="flex items-center justify-between p-3 bg-gray-50/50 rounded-2xl border border-gray-50"><div className="flex items-center gap-3"><div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center"><Check size={12} strokeWidth={4} /></div><span className="text-xs font-bold text-slate-600">{label}</span></div><button className="text-[10px] font-bold text-indigo-400 uppercase tracking-tighter hover:text-indigo-600 transition">Edit</button></div>
);

export default PublishStep;
