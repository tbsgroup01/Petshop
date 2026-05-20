import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Utensils,
  Home,
  CheckCircle2,
  ArrowLeft,
  ShieldCheck,
  Stethoscope,
  ChevronDown,
  MessageCircle,
  AlertCircle,
  Download
} from "lucide-react";

const PetCareDetail = () => {
  const { type } = useParams();
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [type]);

  const content = {
    feeding: {
      title: "Nutrition & Feeding Guide",
      description: "A balanced diet is the foundation of a long, healthy life for your small companion.",
      icon: <Utensils size={32} className="text-indigo-600" />,
      bgGradient: "from-indigo-50 via-white to-white",
      image: "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=800",
      points: [
        { t: "Timothy Hay", d: "Should make up 80% of their daily food intake." },
        { t: "Fresh Greens", d: "Daily serving of leafy greens like romaine or kale." },
        { t: "Pellets", d: "High-quality pellets limited to 1/4 cup per day." },
      ],
      faqs: [
        { q: "How often should I change the water?", a: "Fresh water should be provided at least twice daily." },
        { q: "Can I give them fruits?", a: "Fruits should be treated as occasional snacks (1-2 times a week)." }
      ]
    },
    habitat: {
      title: "Safe Habitat & Environment",
      description: "Create a stress-free sanctuary that mimics your pet's natural environment.",
      icon: <Home size={32} className="text-emerald-600" />,
      bgGradient: "from-emerald-50 via-white to-white",
      image: "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=800",
      points: [
        { t: "Space Requirements", d: "Ensure at least 8-10 square feet for exercise." },
        { t: "Safe Bedding", d: "Use paper-based or aspen shavings, avoid cedar/pine." },
        { t: "Ventilation", d: "Open-top cages or mesh sides are essential for airflow." },
      ],
      faqs: [
        { q: "How often should I clean the cage?", a: "Spot clean daily and do a deep disinfection once a week." },
        { q: "What is the ideal temperature?", a: "Most small pets thrive between 18°C and 24°C." }
      ]
    },
  };

  const active = content[type] || content.feeding;

  return (
    <div className="min-h-screen bg-white">
      {/* 🟢 Hero Section */}
      <section className={`pt-4 pb-16 bg-gradient-to-b ${active.bgGradient}`}>
        <div className="container mx-auto px-6 md:px-10 lg:px-20">
          
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-indigo-600 mb-8 transition-all font-semibold group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> 
            Back to Dashboard
          </Link>

          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            <div className="lg:w-1/2 order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm border border-slate-100 text-indigo-600 font-bold text-xs uppercase tracking-widest mb-6">
                <ShieldCheck size={14} /> Verified Veterinary Advice
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 leading-tight">
                {active.title}
              </h1>
              <p className="text-lg md:text-xl text-slate-500 leading-relaxed mb-8 max-w-2xl">
                {active.description}
              </p>
              <button className="flex items-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold hover:shadow-xl transition-all active:scale-95">
                <Download size={20} /> Download Guide
              </button>
            </div>

            <div className="lg:w-1/2 relative order-1 lg:order-2 w-full max-w-lg">
              <div className="absolute -top-6 -left-6 w-20 h-20 bg-white rounded-3xl shadow-2xl flex items-center justify-center z-10 animate-bounce hidden md:flex">
                {active.icon}
              </div>
              <img
                src={active.image}
                alt="Care"
                className="rounded-[40px] shadow-2xl border-4 md:border-8 border-white w-full h-[350px] md:h-[500px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 🟢 Key Care Pillars */}
      <section className="py-20 container mx-auto px-6 md:px-10 lg:px-20">
        <h2 className="text-3xl font-bold text-slate-900 flex items-center gap-3 mb-12">
          Key Care Pillars
          <div className="h-1 w-20 bg-indigo-600 rounded-full"></div>
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {active.points.map((p, i) => (
            <div key={i} className="p-8 bg-slate-50/50 border border-slate-100 rounded-[32px] hover:bg-white hover:shadow-2xl transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-6 text-indigo-600">
                <CheckCircle2 size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{p.t}</h3>
              <p className="text-slate-500 leading-relaxed">{p.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 🟢 Health Check Section */}
      <section className="py-20 bg-indigo-900 text-white mx-6 md:mx-10 lg:mx-20 rounded-[3rem] mb-20">
        <div className="container mx-auto px-8 md:px-12">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Weekly Health Check</h2>
              <div className="space-y-4">
                {["Clear eyes & nose", "Check teeth growth", "Weight monitoring", "Coat condition"].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 bg-white/10 p-4 rounded-2xl border border-white/10">
                    <AlertCircle className="text-indigo-300" size={20} />
                    <span className="font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:w-1/2 bg-white/5 p-8 rounded-[40px] border border-white/10">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-indigo-500 rounded-2xl"><Stethoscope size={24} /></div>
                <h3 className="text-2xl font-bold">Expert Note</h3>
              </div>
              <p className="text-indigo-100 italic text-lg mb-6">
                "Small animals hide illnesses very well. By the time they look sick, it's often an emergency."
              </p>
              <div className="pt-6 border-t border-white/10 text-sm">
                <p className="font-bold text-white">Shiva Dog Clinic Team</p>
                <p className="text-indigo-300">Verified Veterinarian</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🟢 FAQs */}
      <section className="py-12 container mx-auto px-6 md:px-10 lg:px-20 max-w-4xl">
        <h2 className="text-3xl font-bold text-center mb-12 text-slate-900">Common Questions</h2>
        <div className="space-y-4">
          {active.faqs.map((faq, idx) => (
            <div key={idx} className="border border-slate-100 rounded-3xl overflow-hidden shadow-sm">
              <button 
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between p-6 bg-white hover:bg-slate-50 transition-colors"
              >
                <span className="font-bold text-slate-800 text-left">{faq.q}</span>
                <ChevronDown className={`transition-transform duration-300 ${openFaq === idx ? 'rotate-180 text-indigo-600' : ''}`} />
              </button>
              {openFaq === idx && (
                <div className="p-6 bg-slate-50 text-slate-600 leading-relaxed border-t border-slate-100">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 🟢 CTA */}
      <section className="py-20 container mx-auto px-6 md:px-10 lg:px-20">
        <div className="bg-slate-900 rounded-[3rem] p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold text-white mb-4">Still have questions?</h2>
            <p className="text-slate-400">Our experts are available for virtual consultations.</p>
          </div>
          <button className="flex items-center gap-3 bg-indigo-500 text-white px-8 py-5 rounded-2xl font-bold hover:bg-indigo-400 transition-all shadow-xl active:scale-95">
            <MessageCircle size={20} /> Chat with a Vet
          </button>
        </div>
      </section>
    </div>
  );
};

export default PetCareDetail; // ✅ Sirf ye ek baar hona chahiye!