import React from "react";
import { Link } from "react-router-dom";
import { Star, PawPrint } from "lucide-react";

const Signup = ({ formData, updateFields, onNext }) => {
  if (!formData) return null;

  return (
    <div className="min-h-screen w-full bg-[#F3F5FF] flex items-center justify-center p-4 md:p-6 lg:p-10 font-sans overflow-x-hidden">
      <div className="max-w-6xl w-full bg-white rounded-[2.5rem] shadow-sm overflow-hidden flex flex-col md:flex-row">
        {/* Left Sidebar */}
        <div className="hidden md:flex md:w-[40%] relative p-10 flex-col justify-between text-white shrink-0">
          <div className="absolute inset-0 z-0">
            <img
              src="https://img.magnific.com/free-photo/wonderful-european-female-model-chilling-with-puppy-indoor-portrait-debonair-girl-enjoying-portraitshoot-with-her-cute-pet_197531-11031.jpg?w=800"
              alt="Woman"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-900/20 to-indigo-600/90" />
          </div>
          <div className="relative z-10">
            <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-xl inline-flex items-center gap-2 border border-white/20">
              <PawPrint size={18} fill="currentColor" />
              <span className="font-bold tracking-tight">ShivaDogClinic</span>
            </div>
          </div>
          <div className="relative z-10">
            <h1 className="text-3xl lg:text-4xl font-bold leading-tight mb-6">
              Join our community of pet lovers.
            </h1>
            <div className="bg-white rounded-2xl p-5 shadow-lg text-slate-800 max-w-sm">
              <div className="flex gap-1 mb-2 text-emerald-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={12} fill="currentColor" />
                ))}
              </div>
              <p className="italic text-slate-600 mb-4 leading-relaxed text-xs">
                "Finding my puppy through Shiva was seamless!"
              </p>
              <div className="flex items-center gap-3">
                <img
                  src="https://i.pravatar.cc/100?u=sarah"
                  alt="Sarah"
                  className="w-7 h-7 rounded-full"
                />
                <p className="font-bold text-[10px] text-slate-700 uppercase tracking-wider">
                  Sarah Jenkins
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Form Section */}
        <div className="flex-1 p-6 md:p-10 lg:p-12 flex flex-col overflow-y-auto bg-white">
          {/* VISUAL 3 STEPS SECTION */}
          <div className="flex justify-between items-center max-w-sm mx-auto w-full mb-8 relative shrink-0 px-2">
            {/* Connecting Line */}
            <div className="absolute top-[14px] left-0 w-full h-[2px] bg-slate-100 -z-0" />
            <div
              className="absolute top-[14px] left-0 h-[2px] bg-indigo-600 -z-0 transition-all duration-500"
              style={{ width: "0%" }} // Step 1 par 0%, Step 2 par 50%, Step 3 par 100%
            />

            {/* Step 1: Account */}
            <div className="flex flex-col items-center gap-2 bg-white px-3 relative z-10">
              <div className="w-7 h-7 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-[10px] shadow-lg shadow-indigo-200 ring-4 ring-white">
                1
              </div>
              <span className="text-[9px] font-bold text-indigo-600 uppercase tracking-tighter">
                Account
              </span>
            </div>

            {/* Step 2: Role */}
            <div className="flex flex-col items-center gap-2 bg-white px-3 relative z-10">
              <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center font-bold text-[10px] ring-4 ring-white">
                2
              </div>
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">
                Type
              </span>
            </div>

            {/* Step 3: Profile */}
            <div className="flex flex-col items-center gap-2 bg-white px-3 relative z-10">
              <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center font-bold text-[10px] ring-4 ring-white">
                3
              </div>
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">
                Profile
              </span>
            </div>
          </div>

          <div className="max-w-md mx-auto w-full flex-1 flex flex-col justify-center">
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-slate-800 mb-1">
                Create an account
              </h2>
              <p className="text-slate-500 text-xs">
                Step 1: Your basic information
              </p>
            </div>

            <form
              className="space-y-3"
              onSubmit={(e) => {
                e.preventDefault();
                onNext();
              }}
            >
              <div className="grid grid-cols-1 gap-3">
                {/* Full Name */}
                <div>
                  <label className="block text-[10px] font-bold text-slate-700 mb-1 uppercase tracking-widest">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={(e) => updateFields({ fullName: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl border border-slate-200 outline-none focus:border-indigo-500 text-sm transition-all bg-slate-50/30"
                    required
                  />
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-[10px] font-bold text-slate-700 mb-1 uppercase tracking-widest">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => updateFields({ email: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl border border-slate-200 outline-none focus:border-indigo-500 text-sm transition-all bg-slate-50/30"
                    required
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-[10px] font-bold text-slate-700 mb-1 uppercase tracking-widest">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.phone || ""}
                    onChange={(e) => updateFields({ phone: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl border border-slate-200 outline-none focus:border-indigo-500 text-sm transition-all bg-slate-50/30"
                    required
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block text-[10px] font-bold text-slate-700 mb-1 uppercase tracking-widest">
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => updateFields({ password: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl border border-slate-200 outline-none focus:border-indigo-500 text-sm transition-all bg-slate-50/30"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 py-1">
                <input
                  type="checkbox"
                  className="w-3.5 h-3.5 rounded border-slate-300 text-indigo-600 focus:ring-0"
                  required
                />
                <span className="text-[10px] text-slate-500 leading-none">
                  I agree to the{" "}
                  <span className="text-indigo-600 font-bold underline cursor-pointer">
                    Terms
                  </span>
                  .
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#4F46E5] text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-md text-sm mt-2"
              >
                Continue to Step 2
              </button>

              <div className="relative py-1 text-center">
                <div className="absolute top-1/2 left-0 w-full h-[1px] bg-slate-100" />
                <span className="bg-white px-4 text-slate-400 text-[9px] font-bold uppercase relative z-10 tracking-widest">
                  OR
                </span>
              </div>

              <button
                type="button"
                className="w-full py-2 border border-slate-200 rounded-xl font-bold text-slate-700 flex items-center justify-center gap-3 hover:bg-slate-50 transition-all text-xs"
              >
                <img
                  src="https://www.svgrepo.com/show/355037/google.svg"
                  className="w-3 h-3"
                  alt="Google"
                />
                Continue with Google
              </button>
            </form>

            <p className="text-center mt-4 text-slate-500 text-[11px]">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-indigo-600 font-bold hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
