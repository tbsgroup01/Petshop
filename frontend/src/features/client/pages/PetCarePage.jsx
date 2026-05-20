import React from 'react';
import { useParams } from 'react-router-dom';
import { Utensils, Home, Scissors, CheckCircle2 } from 'lucide-react';

const PetCarePage = () => {
  const { type } = useParams();

  const careData = {
    feeding: {
      title: "Feeding Your Small Pet",
      icon: <Utensils size={40} className="text-indigo-600" />,
      bg: "bg-indigo-50",
      description: "Discover the perfect balance of hay, fresh greens, and fortified pellets for your tiny friends.",
      tips: ["Always provide fresh Timothy hay", "Limited fruit as treats", "Clean water 24/7"]
    },
    habitat: {
      title: "Habitat & Living Space",
      icon: <Home size={40} className="text-emerald-600" />,
      bg: "bg-emerald-50",
      description: "Create a safe, stimulating space with enough ventilation and cozy corners for rest.",
      tips: ["Ensure proper ventilation", "Use pet-safe bedding", "Add hiding spots"]
    },
    grooming: {
      title: "Grooming & Hygiene",
      icon: <Scissors size={40} className="text-slate-600" />,
      bg: "bg-slate-100",
      description: "Brush techniques and nail care tips for even the smallest and most delicate companions.",
      tips: ["Regular brushing prevents matting", "Safe nail trimming monthly"]
    }
  };

  const currentCare = careData[type] || careData.feeding;

  return (
    <div className="min-h-screen bg-white">
      <div className={`pt-24 pb-20 sm:pt-28 sm:pb-24 ${currentCare.bg}`}>
        <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-20 text-center max-w-3xl">
          <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center shadow-sm mx-auto mb-8">
            {currentCare.icon}
          </div>
          <h1 className="text-5xl font-bold text-slate-900 mb-6">{currentCare.title}</h1>
          <p className="text-xl text-slate-600 leading-relaxed">{currentCare.description}</p>
        </div>
      </div>
    </div>
  );
};

export default PetCarePage;