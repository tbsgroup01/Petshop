import React, { useState, useEffect, useRef } from 'react';
import NotificationBell from '../Components/NotificationBell';
import {
  Search, Mail, Phone, MapPin, Camera, HelpCircle, Edit2, X
} from 'lucide-react';

const ProfileSettings = () => {
  const fileInputRef = useRef(null);
  const [editMode, setEditMode] = useState(false);
  const [profileImage, setProfileImage] = useState('https://i.pravatar.cc/100?u=arnab');
  const [formData, setFormData] = useState({
    fullName: 'Dr. Arnab',
    licenseId: 'SHV-9982-CLINIC',
    phone: '+91 98765-43210',
    location: 'Mumbai, Maharashtra',
    bio: 'Shiva Dog Clinic is a premier pet healthcare facility...',
    email: 'arnab.shiva@clinic.com',
  });
  const [charCount, setCharCount] = useState(formData.bio.length);

  // Load profile from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('profile_data');
    const savedImage = localStorage.getItem('profile_image');
    if (saved) {
      const parsed = JSON.parse(saved);
      setFormData(parsed);
      setCharCount(parsed.bio?.length || 0);
    }
    if (savedImage) {
      setProfileImage(savedImage);
    }
  }, []);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (field === 'bio') {
      setCharCount(value.length);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageData = event.target?.result;
        if (imageData) {
          setProfileImage(imageData);
          localStorage.setItem('profile_image', imageData);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveChanges = () => {
    localStorage.setItem('profile_data', JSON.stringify(formData));
    setEditMode(false);
    alert('Profile updated successfully!');
  };

  const handleCancel = () => {
    setEditMode(false);
    // Reset to saved data
    const saved = localStorage.getItem('profile_data');
    if (saved) {
      const parsed = JSON.parse(saved);
      setFormData(parsed);
      setCharCount(parsed.bio?.length || 0);
    }
  };

  return (
    <>
      {/* Header */}
      <header className="h-14 sm:h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 sm:px-8 sticky top-0 z-10 shrink-0">
        <div className="relative w-36 sm:w-72 md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-9 pr-3 py-2 bg-gray-50 rounded-lg text-xs sm:text-sm focus:outline-none"
          />
        </div>
        <div className="flex items-center gap-3 sm:gap-5">
          
           {/* Notification Bell */}
          <NotificationBell />

          <button className="hidden sm:block text-gray-400 hover:text-indigo-600 transition"><HelpCircle size={18} /></button>
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold text-slate-800">Dr. Arnab</p>
              <p className="text-[10px] text-gray-400 font-bold uppercase">Admin Manager</p>
            </div>
            <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-200">
              <img src="https://i.pravatar.cc/100?u=arnab" alt="Admin" />
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-10 max-w-8xl mx-auto w-full">
        <div className="mb-6 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Profile Settings</h2>
          <p className="text-slate-500 mt-1 text-sm">Manage your personal clinic information and security settings.</p>
        </div>

        {/* Layout: stacks on mobile, side-by-side on lg+ */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">

          {/* Left: Profile Summary Card */}
          <div className="w-full lg:w-80 bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden shrink-0">
            <div className="h-20 sm:h-24 bg-indigo-50/50 w-full" />
            <div className="px-6 sm:px-8 pb-8 sm:pb-10 -mt-12 text-center">
              <div className="relative inline-block mb-4">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-white shadow-md overflow-hidden">
                  <img src={profileImage} alt="Dr. Arnab" className="w-full h-full object-cover" />
                </div>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-0 right-0 p-1.5 bg-white border border-gray-100 rounded-full shadow-sm text-indigo-600 hover:bg-gray-50 transition"
                >
                  <Camera size={13} />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-800">{formData.fullName}</h3>
              <span className="mt-2 inline-block px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-bold uppercase rounded-full border border-emerald-100">
                ✓ Verified Breeder
              </span>

              {/* Contact items: row on mobile, column on lg */}
              <div className="mt-6 sm:mt-8 flex flex-row lg:flex-col flex-wrap justify-center gap-3 lg:gap-4 text-left">
                <ContactItem icon={<Mail size={14} />} label="EMAIL" value={formData.email} />
                <ContactItem icon={<Phone size={14} />} label="PHONE" value={formData.phone} />
                <ContactItem icon={<MapPin size={14} />} label="LOCATION" value={formData.location} />
              </div>
            </div>
          </div>

          {/* Right: Form + Banner */}
          <div className="flex-1 space-y-5 sm:space-y-6 w-full">

            {/* General Information Form */}
            <div className="bg-white rounded-3xl border border-gray-100 p-5 sm:p-8 md:p-10 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 mb-6 sm:mb-8">
                <h3 className="text-base sm:text-lg font-bold flex items-center gap-2">
                  General Information
                  {editMode && <span className="text-[10px] bg-orange-50 text-orange-600 px-2 py-1 rounded font-bold">EDITING</span>}
                </h3>
                {!editMode && (
                  <button
                    onClick={() => setEditMode(true)}
                    className="text-indigo-600 hover:text-indigo-700 text-sm font-bold flex items-center gap-1 transition"
                  >
                    <Edit2 size={14} /> Edit Profile
                  </button>
                )}
              </div>

              {/* 1 col on mobile, 2 col on sm+ */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-5 sm:mb-6">
                <FormInput
                  label="Full Name"
                  value={formData.fullName}
                  onChange={(value) => handleInputChange('fullName', value)}
                  readOnly={!editMode}
                />
                <FormInput
                  label="Clinic License ID"
                  value={formData.licenseId}
                  readOnly={true}
                />
                <FormInput
                  label="Phone Number"
                  value={formData.phone}
                  onChange={(value) => handleInputChange('phone', value)}
                  readOnly={!editMode}
                />
                <FormInput
                  label="City / Location"
                  value={formData.location}
                  onChange={(value) => handleInputChange('location', value)}
                  readOnly={!editMode}
                />
              </div>

              <div className="mb-6 sm:mb-8">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block mb-2">
                  Clinic Description & Bio
                </label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  readOnly={!editMode}
                  className={`w-full border rounded-2xl px-4 sm:px-6 py-4 text-sm focus:outline-none transition h-28 sm:h-32 leading-relaxed ${
                    editMode
                      ? 'bg-white border-indigo-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100'
                      : 'bg-gray-50 border-gray-100 text-slate-700 cursor-not-allowed'
                  }`}
                />
                <div className="text-right mt-2">
                  <span className={`text-[10px] font-medium ${charCount > 1000 ? 'text-red-400' : 'text-gray-300'}`}>
                    Character count: {charCount} / 1000
                  </span>
                </div>
              </div>

              {/* Buttons: full-width stacked on mobile */}
              <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 sm:gap-4 border-t border-gray-50 pt-6 sm:pt-8">
                {editMode ? (
                  <>
                    <button
                      onClick={handleCancel}
                      className="w-full sm:w-auto px-6 sm:px-8 py-3 rounded-xl text-sm font-bold border border-gray-100 text-gray-400 hover:bg-gray-50 transition flex items-center justify-center gap-2"
                    >
                      <X size={16} /> Cancel
                    </button>
                    <button
                      onClick={handleSaveChanges}
                      className="w-full sm:w-auto px-8 sm:px-10 py-3 rounded-xl text-sm font-bold bg-indigo-600 text-white shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition"
                    >
                      Save Changes
                    </button>
                  </>
                ) : (
                  <span className="text-[10px] text-gray-400 font-medium italic">Last updated: 2 days ago</span>
                )}
              </div>
            </div>

           

          </div>
        </div>
      </div>
    </>
  );
};

const ContactItem = ({ icon, label, value }) => (
  <div className="flex items-start gap-3">
    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-indigo-50 text-indigo-500 flex items-center justify-center shrink-0">
      {icon}
    </div>
    <div>
      <p className="text-[9px] font-bold text-gray-400 tracking-widest">{label}</p>
      <p className="text-xs font-bold text-slate-700 truncate">{value}</p>
    </div>
  </div>
);

const FormInput = ({ label, value = '', onChange, readOnly = false }) => (
  <div>
    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block mb-2">{label}</label>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      readOnly={readOnly}
      className={`w-full border rounded-xl px-4 sm:px-6 py-3 text-sm focus:outline-none transition ${
        readOnly
          ? 'bg-gray-50 border-gray-100 text-gray-300 cursor-not-allowed'
          : 'bg-white border-indigo-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 text-slate-700'
      }`}
    />
  </div>
);

export default ProfileSettings;