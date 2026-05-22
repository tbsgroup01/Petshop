import React from "react";
import PetCategoryPage from "../components/PetCategoryPage";

const dayCareLifestyleCards = [
  { title: "Busy Schedule", subtitle: "Reliable daytime supervision", accent: "bg-sky-400" },
  { title: "Social Play", subtitle: "Healthy play and interaction", accent: "bg-indigo-400" },
  { title: "Safe Boarding", subtitle: "Monitored and comfortable stay", accent: "bg-rose-400" },
];

const DayCare = () => (
  <PetCategoryPage
    heroImage="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=1400&q=80"
    ctaImage="https://images.unsplash.com/photo-1581888227599-779811939961?auto=format&fit=crop&w=900&q=80"
    fallbackImage="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=700&q=80"
    heroTitleLine2="Day Care Match"
    heroDescription="Find trusted day-care listings for your pets with verified providers and real-time availability."
    searchButtonLabel="Find Day Care"
    liveResultsLabel="day-care pets"
    availableTitle="Available Day-Care Listings"
    emptyStateText="No active day-care listings found."
    lifestyleDescription="Choose day-care options based on your routine and your pet's comfort level."
    handbookTitle="Need help choosing day care?"
    ctaImageAlt="Day care support"
    filterRegex={/.+/i}
    listingTypeRegex={/^buy$/i}
    trustBreedText="Verified day-care providers"
    lifestyleCards={dayCareLifestyleCards}
  />
);

export default DayCare;
