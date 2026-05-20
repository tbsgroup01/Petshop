import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, PawPrint, ArrowLeft, MailCheck } from 'lucide-react';

const ForgotPassword = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <div className="min-h-screen w-full bg-[#F8F9FE] flex items-center justify-center p-4 md:p-6 lg:p-10 font-sans">
      <div className="max-w-6xl w-full bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[250px]">
        
        {/* Left Branding Column */}
        <div className="md:w-5/12 relative p-8 flex flex-col justify-between text-white overflow-hidden bg-slate-100">
          <div className="absolute inset-0">
             <img 
              src="https://img.freepik.com/free-photo/outdoor-portrait-curly-european-tanned-woman-holds-happy-pet-dog-pomeranian-spitz_343596-1385.jpg?semt=ais_hybrid&w=740&q=80" 
              alt="Woman with Dog" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          </div>
          
          <div className="relative z-10">
            <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-xl inline-flex items-center gap-2 border border-white/30">
              <PawPrint size={20} />
              <span className="font-bold tracking-tight"></span>
            </div>
          </div>

          <div className="relative z-10 mt-auto">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-12 drop-shadow-md">
              Don't worry, we'll help you get back in.
            </h1>

            <div className="bg-white rounded-[2rem] p-6 shadow-xl text-slate-800 max-w-sm mb-4">
              <div className="flex gap-1 mb-3 text-emerald-500">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              <p className="italic text-slate-600 mb-6 leading-relaxed text-sm">
                "Their support team helped me recover my account in minutes. Truly dedicated to pet parents!"
              </p>
              <div className="flex items-center gap-3">
                <img 
                    src="https://i.pravatar.cc/100?u=mark" 
                    alt="Mark" 
                    className="w-10 h-10 rounded-full border-2 border-white shadow-sm" 
                />
                <div>
                  <p className="font-bold text-sm">Mark Thompson</p>
                  <p className="text-xs text-slate-400">Pet Enthusiast</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Form Column */}
        <div className="md:w-7/12 p-8 md:p-12 lg:p-20 flex flex-col justify-center">
          
          <div className="max-w-md mx-auto w-full">
            {!isSubmitted ? (
              <>
                <div className="mb-8">
                  <Link to="/login" className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-700 transition-colors mb-6 group">
                    <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
                    Back to login
                  </Link>
                  <h2 className="text-3xl font-bold text-slate-800 mb-2">Forgot Password?</h2>
                  <p className="text-slate-500 text-sm">
                    Enter the email address associated with your account and we'll send you a link to reset your password.
                  </p>
                </div>

                <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setIsSubmitted(true); }}>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                    <input 
                      type="email" 
                      required
                      placeholder="name@example.com" 
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-indigo-500 transition-all shadow-sm" 
                    />
                  </div>

                  <button 
                    type="submit"
                    className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
                  >
                    Send Reset Link
                  </button>
                </form>
              </>
            ) : (
              /* Success State */
              <div className="text-center py-8">
                <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                  <MailCheck size={40} />
                </div>
                <h2 className="text-3xl font-bold text-slate-800 mb-4">Check your email</h2>
                <p className="text-slate-500 mb-8 leading-relaxed">
                  We have sent a password reset link to <span className="font-bold text-slate-700">name@example.com</span>. Please check your inbox and spam folder.
                </p>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="w-full py-4 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-slate-200 transition-all mb-4"
                >
                  Resend Email
                </button>
                <Link to="/login" className="text-indigo-600 font-bold hover:underline">
                  Return to login
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;