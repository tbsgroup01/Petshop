import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Signup from '../../Auth/Signup';
import AccountType from './AccountType';
import ProfileSetup from './ProfileSetup'; 

const CreateAccount = () => {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    accountType: 'owner',
    city: '',
    country: '',
    bio: '',
    profileImage: null
  });

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleUpdateFields = (fields) => {
    setFormData(prev => ({ ...prev, ...fields }));
  };

  const handleFinalSubmit = () => {
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen w-full bg-[#F3F5FF] flex items-center justify-center p-4 md:p-6 lg:p-10 font-sans overflow-x-hidden">
        <div className="max-w-xl w-full bg-white rounded-[2.5rem] shadow-2xl p-10 text-center">
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4">
            Account Created Successfully!
          </h1>
          <p className="text-slate-500 mb-8">
            Your account details are ready. You can now proceed to login and start exploring pet listings.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/login" className="px-6 py-3 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all">
              Go to Login
            </Link>
            <Link to="/" className="px-6 py-3 border border-slate-200 rounded-2xl font-bold text-slate-700 hover:bg-slate-50 transition-all">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {step === 1 && (
        <Signup formData={formData} updateFields={handleUpdateFields} onNext={nextStep} />
      )}
      
      {step === 2 && (
        <AccountType formData={formData} updateFields={handleUpdateFields} onBack={prevStep} onNext={nextStep} />
      )}

      {step === 3 && (
        <ProfileSetup 
          formData={formData} 
          updateFields={handleUpdateFields} 
          onBack={prevStep} 
          onSubmit={handleFinalSubmit} 
        />
      )}
    </>
  );
};

export default CreateAccount;