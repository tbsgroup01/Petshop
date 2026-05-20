import React from 'react';
import NotificationBell from '../Components/NotificationBell';
import { 
  LayoutDashboard, Dog, PlusCircle, MessageSquare, Heart, 
  BarChart3, User, Settings, Search, Mail, 
  Lock, BellRing, Smartphone, MessageCircle, Globe, 
  Sun, Moon, ShieldCheck, ChevronRight, HelpCircle
} from 'lucide-react';

const SettingsPage = () => {
  return (
    <>
      {/* Header */}
      <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8">
        <div className="relative w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search for settings, pets, or clients..." 
            className="w-full pl-10 pr-4 py-2 bg-gray-50 rounded-lg text-sm focus:outline-none" 
          />
        </div>
        <div className="flex items-center gap-6">

            {/* Notification Bell */}
          <NotificationBell />
          
          <button className="text-gray-400 hover:text-indigo-600 transition"><HelpCircle size={20} /></button>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-xs font-bold text-slate-800">Dr. Shiva Sharma</p>
              <p className="text-[10px] text-gray-400 font-bold uppercase">Senior Admin</p>
            </div>
            <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-200">
              <img src="https://i.pravatar.cc/100?u=shiva" alt="Admin" />
            </div>
          </div>
        </div>
      </header>

      {/* Settings Content */}
      <div className="flex-1 overflow-y-auto p-8 max-w-8xl mx-auto w-full">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-900">Settings</h2>
          <p className="text-slate-500 mt-1">Manage your account preferences, security, and notification settings.</p>
        </div>

        {/* 1. Account Settings Card */}
        <SectionCard icon={<User className="text-indigo-500" size={20} />} title="Account Settings" desc="Update your primary login information and security.">
          <div className="grid grid-cols-2 gap-6 mt-6">
            <InputGroup label="Email Address" value="shiva.sharma@shivaclinic.com" />
            <InputGroup label="Password" value="••••••••" type="password" />
          </div>
        </SectionCard>

        {/* 2. Notifications Card */}
        <SectionCard icon={<BellRing className="text-emerald-500" size={20} />} title="Notifications" desc="Choose how you want to be informed about updates.">
          <div className="mt-6 space-y-4">
            <ToggleRow icon={<Mail size={18} />} title="Email Notifications" desc="Receive reports and appointment alerts via email." active />
            <ToggleRow icon={<Smartphone size={18} />} title="Push Notifications" desc="Instant alerts on your mobile or desktop device." active />
            <ToggleRow icon={<MessageCircle size={18} />} title="SMS Alerts" desc="Critical updates delivered via text message." />
          </div>
        </SectionCard>

        {/* 3. Preferences Card */}
        <SectionCard icon={<Settings className="text-amber-500" size={20} />} title="Preferences" desc="Personalize your dashboard experience.">
          <div className="grid grid-cols-2 gap-8 mt-6">
            <div>
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block mb-2">Language</label>
              <select className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none appearance-none cursor-pointer">
                <option>English (United States)</option>
                <option>Hindi</option>
              </select>
            </div>
            <div>
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block mb-2">Theme</label>
              <div className="flex bg-gray-50 p-1 rounded-xl border border-gray-100">
                <button className="flex-1 flex items-center justify-center gap-2 py-1.5 rounded-lg bg-white shadow-sm text-xs font-bold text-indigo-600">
                  <Sun size={14} /> Light
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-1.5 rounded-lg text-xs font-bold text-gray-400 hover:text-gray-600">
                  <Moon size={14} /> Dark
                </button>
              </div>
            </div>
          </div>
        </SectionCard>

        {/* Bottom Actions */}
        <div className="mt-8 flex items-center justify-between border-t border-gray-100 pt-8">
          <p className="text-xs text-gray-400 font-medium italic">Changes will take effect immediately upon saving.</p>
          <div className="flex gap-4">
            <button className="px-8 py-2.5 rounded-xl text-sm font-bold border border-gray-200 text-gray-500 hover:bg-gray-50 transition">Discard</button>
            <button className="px-8 py-2.5 rounded-xl text-sm font-bold bg-indigo-600 text-white shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition">Save Changes</button>
          </div>
        </div>

        {/* Footer Grid */}
        <div className="grid grid-cols-3 gap-6 mt-12 mb-8">
          <div className="col-span-2 relative overflow-hidden bg-indigo-600 rounded-[32px] p-8 text-white group">
            <div className="relative z-10 max-w-xs">
              <h3 className="text-xl font-bold mb-2">New Dashboard Features</h3>
              <p className="text-indigo-100 text-xs leading-relaxed mb-6">Our latest update includes enhanced pet medical timelines and improved analytics for your clinic.</p>
              <button className="bg-white text-indigo-600 px-6 py-2 rounded-full text-xs font-bold flex items-center gap-2 hover:bg-indigo-50 transition">
                Learn More <ChevronRight size={14} />
              </button>
            </div>
            <div className="absolute right-0 top-0 h-full w-1/2 bg-indigo-500/20 rounded-l-full transform translate-x-20" />
          </div>

          <div className="bg-white rounded-[32px] border border-gray-100 p-8 shadow-sm text-center flex flex-col items-center justify-center">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-500 flex items-center justify-center mb-4">
              <ShieldCheck size={24} />
            </div>
            <h4 className="font-bold text-sm mb-1">Security Health</h4>
            <p className="text-[10px] text-gray-400 leading-tight mb-4">Your account is fully secured with 2FA and recent audits.</p>
            <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden mb-2">
              <div className="bg-emerald-500 h-full w-[90%]" />
            </div>
            <span className="text-[10px] font-bold text-emerald-600">90% EXCELLENT</span>
          </div>
        </div>
      </div>
    </>
  );
};

// --- SUB-COMPONENTS ---

const NavItem = ({ icon, label, active = false }) => (
  <div className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all ${active ? 'bg-indigo-600/5 text-indigo-600 font-bold' : 'text-gray-400 hover:text-indigo-600'}`}>
    {icon} <span className="text-sm">{label}</span>
  </div>
);

const SectionCard = ({ icon, title, desc, children }) => (
  <div className="bg-white rounded-[32px] border border-gray-100 p-8 shadow-sm mb-6">
    <div className="flex gap-4 mb-4">
      <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div>
        <h3 className="font-bold text-lg text-slate-800 leading-tight">{title}</h3>
        <p className="text-xs text-gray-400 font-medium">{desc}</p>
      </div>
    </div>
    {children}
  </div>
);

const InputGroup = ({ label, value, type = 'text' }) => (
  <div>
    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block mb-2">{label}</label>
    <div className="flex gap-2">
      <input type={type} defaultValue={value} className="flex-1 bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-200 transition" />
      <button className="px-4 py-2 text-xs font-bold text-indigo-600 border border-indigo-100 rounded-xl hover:bg-indigo-50 transition">Change</button>
    </div>
  </div>
);

const ToggleRow = ({ icon, title, desc, active = false }) => (
  <div className="flex items-center justify-between p-4 rounded-2xl hover:bg-gray-50 transition border border-transparent hover:border-gray-100">
    <div className="flex items-center gap-4">
      <div className="text-gray-400">{icon}</div>
      <div>
        <p className="text-sm font-bold text-slate-700">{title}</p>
        <p className="text-[11px] text-gray-400">{desc}</p>
      </div>
    </div>
    <div className={`w-11 h-6 rounded-full relative transition-colors cursor-pointer ${active ? 'bg-indigo-600' : 'bg-gray-200'}`}>
      <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${active ? 'left-6' : 'left-1'}`} />
    </div>
  </div>
);

export default SettingsPage;
