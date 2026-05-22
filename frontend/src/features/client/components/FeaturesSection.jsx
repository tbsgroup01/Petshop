import React from 'react';
import { ShieldCheck, HeartPulse, ShieldAlert, Headphones } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description, iconBg, iconColor }) => (
  <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-50">
    {/* Icon Container */}
    <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mb-4 sm:mb-6 ${iconBg}`}>
      <Icon className={`w-6 h-6 sm:w-8 sm:h-8 ${iconColor}`} />
    </div>
    
    {/* Text Content */}
    <h3 className="text-slate-800 font-semibold text-base sm:text-lg mb-2 sm:mb-4">
      {title}
    </h3>
    <p className="text-slate-600 leading-relaxed text-xs sm:text-sm">
      {description}
    </p>
  </div>
);

const FeaturesSection = () => {
  const features = [
    {
      icon: ShieldCheck,
      title: "Verified Breeders",
      description: "Every breeder undergoes a rigorous clinical background check.",
      iconBg: "bg-indigo-50",
      iconColor: "text-indigo-600"
    },
    {
      icon: HeartPulse,
      title: "Healthy Pets",
      description: "Pre-adoption health screenings and vaccinations are mandatory.",
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600"
    },
    {
      icon: ShieldAlert,
      title: "Safe Transactions",
      description: "Secure payment processing and contract management.",
      iconBg: "bg-indigo-50",
      iconColor: "text-indigo-600"
    },
    {
      icon: Headphones,
      title: "Expert Support",
      description: "24/7 veterinary advice during your first month of adoption.",
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600"
    }
  ];

  return (
    <section className="bg-[#F8F9FE] px-3 sm:px-6 md:px-10 py-12 sm:py-16">
      {/* Header */}
      <div className="w-full text-center mb-12 sm:mb-15">
        <h2 className="text-slate-500 text-lg sm:text-xl font-bold mb-2 sm:mb-3">
          Why Choose Shiva Dog Clinic?
        </h2>
        <p className="text-slate-500 text-sm sm:text-lg leading-relaxed">
          We combine clinical expertise with a passionate marketplace to ensure every pet finds its perfect, healthy home.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 w-full">
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} />
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
