import React from 'react';
import { MapPin, Store, ChevronLeft, PawPrint } from 'lucide-react';

import women from "../../../assets/women.jpg";
const AccountType = ({ formData, updateFields, onBack, onNext }) => {
  return (
    // 1. h-screen aur overflow-hidden lagaya taki pura page freeze rahe
    <div className="min-h-screen w-full bg-[#F3F5FF] flex items-center justify-center p-4 md:p-6 lg:p-10 font-sans overflow-x-hidden">
      
      {/* 2. responsive height so mobile can scroll when needed */}
      <div className="max-w-6xl w-full bg-white rounded-[2.5rem] shadow-sm overflow-hidden flex flex-col md:flex-row">
        
        {/* Left branding Section */}
        <div className="hidden md:flex md:w-[40%] relative p-10 flex-col justify-between text-white shrink-0">
          <div className="absolute inset-0 z-0">
            <img 
              src={women} 
              alt="Dog" 
              className="w-full h-full object-cover" 
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-900/20 to-indigo-600/90" />
          </div>
          
          <div className="relative z-10">
            <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-xl inline-flex items-center gap-2 border border-white/20">
              <PawPrint size={18} fill="currentColor" />
              <span className="font-bold tracking-tight">PetMarket</span>
            </div>
          </div>

          <div className="relative z-10">
            <h1 className="text-3xl lg:text-4xl font-bold leading-tight mb-4">
              The best care for your furry friends.
            </h1>
            <p className="text-white/80 text-sm max-w-xs">
              Choose your path to get started with professional pet care management.
            </p>
          </div>
        </div>

        {/* Right Section - Form Area */}
        <div className="flex-1 p-6 md:p-10 lg:p-12 flex flex-col overflow-y-auto bg-white">
          
          {/* Progress Bar - Compact */}
          <div className="flex items-center justify-between mb-12 max-w-md mx-auto w-full shrink-0">
            <div className="flex gap-2 w-full pr-4">
              <div className="h-1.5 w-full bg-indigo-600 rounded-full" />
              <div className="h-1.5 w-full bg-indigo-600 rounded-full" />
              <div className="h-1.5 w-full bg-slate-100 rounded-full" />
            </div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">Step 2 of 3</span>
          </div>

          <div className="max-w-md mx-auto w-full flex-1 flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Tell us who you are</h2>
            <p className="text-slate-500 text-sm mb-8">Choose an account type to customize your experience.</p>
            
            <div className="space-y-4 mb-10">
              {/* Option 1: Pet Owner */}
              <div 
                onClick={() => updateFields({ accountType: 'owner' })}
                className={`flex items-center p-5 rounded-[1.5rem] border-2 cursor-pointer transition-all duration-200 ${
                  formData.accountType === 'owner' 
                    ? 'border-indigo-600 bg-indigo-50/50 shadow-sm shadow-indigo-100' 
                    : 'border-slate-100 hover:border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="w-12 h-12 bg-white text-indigo-600 rounded-2xl flex items-center justify-center mr-4 shadow-sm border border-slate-100">
                  <MapPin size={22} />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-slate-800 text-base">Pet Owner</p>
                  <p className="text-[11px] text-slate-500">I want to find care or adopt a pet</p>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  formData.accountType === 'owner' ? 'border-indigo-600' : 'border-slate-300'
                }`}>
                  {formData.accountType === 'owner' && <div className="w-2.5 h-2.5 bg-indigo-600 rounded-full" />}
                </div>
              </div>

              {/* Option 2: Breeder */}
              <div 
                onClick={() => updateFields({ accountType: 'breeder' })}
                className={`flex items-center p-5 rounded-[1.5rem] border-2 cursor-pointer transition-all duration-200 ${
                  formData.accountType === 'breeder' 
                    ? 'border-indigo-600 bg-indigo-50/50 shadow-sm shadow-indigo-100' 
                    : 'border-slate-100 hover:border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="w-12 h-12 bg-white text-indigo-600 rounded-2xl flex items-center justify-center mr-4 shadow-sm border border-slate-100">
                  <Store size={22} />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-slate-800 text-base">Breeder / Vendor</p>
                  <p className="text-[11px] text-slate-500">I want to list pets or offer services</p>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  formData.accountType === 'breeder' ? 'border-indigo-600' : 'border-slate-300'
                }`}>
                  {formData.accountType === 'breeder' && <div className="w-2.5 h-2.5 bg-indigo-600 rounded-full" />}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between mt-4">
              <button 
                onClick={onBack} 
                className="text-slate-500 font-bold flex items-center gap-1 hover:text-indigo-600 transition-colors text-sm"
              >
                <ChevronLeft size={18}/> Back
              </button>
              <button 
                onClick={onNext} 
                disabled={!formData.accountType}
                className="px-12 py-3.5 bg-[#4F46E5] text-white rounded-xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              >
                Continue
              </button>
            </div>
          </div>

          {/* Optional Footer Text */}
          <p className="text-center mt-10 text-slate-400 text-[10px] font-medium uppercase tracking-tight">
            Step 2: Profile Persona Identification
          </p>
        </div>

      </div>
    </div>
  );
};

export default AccountType;