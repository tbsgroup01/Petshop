import React from "react";
import PetCategoryPage from "../components/PetCategoryPage";

const smallPetLifestyleCards = [
  { title: "Compact Living", subtitle: "Great for smaller spaces", accent: "bg-sky-400" },
  { title: "Low Maintenance", subtitle: "Easy daily care routines", accent: "bg-indigo-400" },
  { title: "Kid Friendly", subtitle: "Gentle and fun companions", accent: "bg-rose-400" },
];

const SmallPetPage = () => (
  <PetCategoryPage
    heroImage="https://images.unsplash.com/photo-1520808663317-647b476a81b9?auto=format&fit=crop&w=1400&q=80"
    ctaImage="https://images.unsplash.com/photo-1425082661705-1834bfd09dca?auto=format&fit=crop&w=900&q=80"
    fallbackImage="https://images.unsplash.com/photo-1520808663317-647b476a81b9?auto=format&fit=crop&w=700&q=80"
    heroTitleLine2="Tiny Companion"
    heroDescription="Discover healthy rabbits, birds, hamsters, guinea pigs, and other small pets from verified sellers in real time."
    searchButtonLabel="Find Small Pets"
    liveResultsLabel="small pets"
    availableTitle="Available Small Pets"
    emptyStateText="No active small pet listings found."
    lifestyleDescription="Different homes need different companions. Choose what fits your lifestyle."
    handbookTitle="First time owning a small pet?"
    ctaImageAlt="First time small pet owner help"
    filterRegex={/^(?!.*\b(dog|puppy|canine|cat|kitten|feline)\b).+/i}
    trustBreedText="Verified healthy small pets"
    lifestyleCards={smallPetLifestyleCards}
  />
);

export default SmallPetPage;
