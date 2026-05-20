import React from 'react';
import { Upload, Camera, ChevronDown } from 'lucide-react';

const ProfileSetup = ({ formData, updateFields, onBack, onSubmit }) => {
  // Guard clause to prevent errors if formData is undefined
  if (!formData) return null;

  return (
    <div className="min-h-screen w-full bg-[#F3F5FF] flex items-center justify-center p-4 md:p-6 lg:p-10 font-sans overflow-x-hidden">
      
      {/* Main Card Container */}
      <div className="max-w-6xl w-full bg-white rounded-[2.5rem] shadow-sm overflow-hidden flex flex-col md:flex-row">
        
        {/* Left Section - Image Branding (Hidden on mobile for space) */}
        <div className="hidden md:flex md:w-[40%] relative p-10 flex-col justify-end text-white shrink-0">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://www.rd.com/wp-content/uploads/2025/09/Puppy-and-adult-welsh-corgis-sitting-on-top-of-stairs-indoors_Getty-1159745037_FT.jpg" 
              alt="Golden Retriever" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/90 via-indigo-900/20 to-transparent" />
          </div>
          
          <div className="relative z-10">
            <h1 className="text-4xl font-bold mb-4">PetMarket</h1>
            <p className="text-sm text-white/90 leading-relaxed max-w-xs">
              Professional healthcare management for the modern clinic. Join thousands of practitioners providing elite care.
            </p>
          </div>
        </div>

        {/* Right Section - Form Area */}
        <div className="flex-1 p-6 md:p-10 lg:p-12 flex flex-col bg-white overflow-hidden">
          
          {/* Header Progress Bar - Compact */}
          <div className="mb-8 shrink-0">
            <div className="flex justify-between items-end mb-1.5">
              <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-[0.2em]">Step 3 of 3</span>
              <span className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.2em]">Final Step</span>
            </div>
            <div className="h-[3px] w-full bg-slate-100 rounded-full">
              <div className="h-full w-full bg-indigo-600 rounded-full transition-all duration-700 ease-out" />
            </div>
          </div>

          <div className="max-w-xl mx-auto w-full flex-1 flex flex-col justify-center">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-slate-800 mb-1">Complete your profile</h2>
              <p className="text-slate-500 text-xs">Help pet owners identify your clinic at a glance.</p>
            </div>

            <div className="space-y-6">
              {/* Profile Photo Section */}
              <div className="flex flex-col items-center mb-2">
                <div className="relative group">
                  <div className="w-24 h-24 rounded-full border-2 border-dashed border-slate-200 bg-slate-50 flex flex-col items-center justify-center text-slate-400 cursor-pointer hover:bg-indigo-50 hover:border-indigo-200 transition-all duration-300">
                    <Upload size={20} className="mb-1 group-hover:scale-110 transition-transform" />
                    <span className="text-[9px] font-bold uppercase tracking-tighter">Upload</span>
                  </div>
                  <div className="absolute bottom-0 right-0 w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white shadow-lg ring-4 ring-white">
                    <Camera size={14} />
                  </div>
                </div>
              </div>

              {/* Location Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* City Input */}
                <div>
                  <label className="block text-[10px] font-bold text-slate-700 mb-1.5 uppercase tracking-widest">City</label>
                  <input 
                    type="text" 
                    placeholder="e.g. San Francisco"
                    value={formData.city || ''}
                    onChange={(e) => updateFields({ city: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50/50 text-sm transition-all"
                  />
                </div>

                {/* Designed Country Dropdown */}
                <div>
                  <label className="block text-[10px] font-bold text-slate-700 mb-1.5 uppercase tracking-widest">Country</label>
                  <div className="relative group">
                    <select 
                      value={formData.country || ''}
                      onChange={(e) => updateFields({ country: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50/50 text-sm bg-white cursor-pointer appearance-none transition-all pr-10"
                    >
                      <option value="" disabled>Select Country</option>
                      <option value="IN">🇮🇳 India</option>
                      <option value="US">🇺🇸 United States</option>
                      <option value="UK">🇬🇧 United Kingdom</option>
                      <option value="CA">🇨🇦 Canada</option>
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                      <ChevronDown size={18} strokeWidth={2.5} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Bio Section */}
              <div>
                <label className="block text-[10px] font-bold text-slate-700 mb-1.5 uppercase tracking-widest">Clinic Bio</label>
                <textarea 
                  rows="3"
                  placeholder="Tell pet owners about your specialized services and expertise..."
                  value={formData.bio || ''}
                  onChange={(e) => updateFields({ bio: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50/50 text-sm resize-none transition-all"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-4">
                <button 
                  type="button"
                  onClick={onBack}
                  className="text-slate-400 font-bold hover:text-indigo-600 transition-all text-xs flex items-center gap-1 group"
                >
                  <span className="group-hover:-translate-x-1 transition-transform">←</span> Back
                </button>
                <button 
                  type="button"
                  onClick={onSubmit}
                  className="px-10 py-3.5 bg-[#4F46E5] text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 text-sm hover:-translate-y-0.5 active:translate-y-0"
                >
                  Complete Setup
                </button>
              </div>
            </div>
          </div>

          {/* Minimal Footer */}
          <div className="mt-auto pt-6 flex flex-col md:flex-row justify-between items-center gap-2 text-[9px] font-bold text-slate-300 uppercase tracking-widest">
            <p>© 2026 PetMarket Professional</p>
            <div className="flex gap-4">
              <span className="hover:text-indigo-400 cursor-pointer">Privacy</span>
              <span className="hover:text-indigo-400 cursor-pointer">Terms</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProfileSetup;