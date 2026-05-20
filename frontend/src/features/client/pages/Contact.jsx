import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, CheckCircle, Clock } from 'lucide-react';

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    // use min-height and allow vertical scroll for mobile when content grows
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 md:p-8 overflow-x-hidden">
      <div className="max-w-6xl w-full mx-auto bg-white rounded-[2.5rem] shadow-xl border border-slate-100 overflow-hidden">
        
        <div className="flex flex-col lg:flex-row h-full items-stretch">
          
          {/* Left Side: Info (Compact) */}
          <div className="lg:w-1/3 bg-slate-900 p-8 md:p-12 text-white flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-black mb-4">
                Get <span className="text-indigo-400">In Touch</span>
              </h1>
              <p className="text-slate-400 text-sm mb-8">
                We appreciate your interest in our services.
              </p>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="bg-white/10 p-3 rounded-xl text-indigo-400">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-bold uppercase">Call Us</p>
                    <p className="text-sm font-semibold">+91 98765 43210</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="bg-white/10 p-3 rounded-xl text-rose-400">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-bold uppercase">Email</p>
                    <p className="text-sm font-semibold">info@shivaclinic.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="bg-white/10 p-3 rounded-xl text-emerald-400">
                    <Clock size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-bold uppercase">Timing</p>
                    <p className="text-sm font-semibold">10 AM - 08 PM</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-white/10">
              <div className="flex items-start gap-3">
                <MapPin className="text-indigo-400 shrink-0" size={20} />
                <p className="text-xs text-slate-400 leading-relaxed">
                  Plot 45, Sector 62, Noida, UP - 201301
                </p>
              </div>
            </div>
          </div>

          {/* Right Side: Form (Compact) */}
          <div className="lg:w-2/3 p-8 md:p-12 flex flex-col justify-center bg-white overflow-y-auto">
            {submitted ? (
              <div className="text-center py-10 animate-in fade-in zoom-in">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={32} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Message Sent!</h3>
                <p className="text-slate-500">We Will Connect You Soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="flex items-center gap-2 mb-2 text-indigo-600">
                  <MessageSquare size={18} />
                  <span className="text-xs font-black uppercase tracking-widest">Quick Message</span>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-600 ml-1">Name</label>
                    <input 
                      required
                      type="text" 
                      placeholder="Rahul Kumar" 
                      className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-600 ml-1">Email</label>
                    <input 
                      required
                      type="email" 
                      placeholder="rahul@example.com" 
                      className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 ml-1">Message</label>
                  <textarea 
                    required
                    placeholder="Enter your message..." 
                    rows="4" 
                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-none text-sm"
                  ></textarea>
                </div>

                <button className="w-full bg-indigo-600 text-white font-bold py-4 rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 flex items-center justify-center gap-2 text-sm active:scale-95">
                  SEND MESSAGE <Send size={18} />
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;