import React from "react";
import PetCategoryPage from "../components/PetCategoryPage";

const matingLifestyleCards = [
  { title: "Verified Pairs", subtitle: "Health-screened match options", accent: "bg-sky-400" },
  { title: "Safe Connect", subtitle: "Transparent breeder communication", accent: "bg-indigo-400" },
  { title: "Planned Meetups", subtitle: "Flexible scheduling support", accent: "bg-rose-400" },
];

const MatingServices = () => (
  <PetCategoryPage
    heroImage="https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&w=1400&q=80"
    ctaImage="https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=900&q=80"
    fallbackImage="https://images.unsplash.com/photo-1583512603806-077998240c7a?auto=format&fit=crop&w=700&q=80"
    heroTitleLine2="Mating Services"
    heroDescription="Connect with verified mating listings and find safe, transparent breeder matches in real time."
    searchButtonLabel="Find Matches"
    liveResultsLabel="mating listings"
    availableTitle="Available Mating Listings"
    emptyStateText="No active mating listings found."
    lifestyleDescription="Find suitable pairing options based on breed, age, and location preferences."
    handbookTitle="First time using mating services?"
    ctaImageAlt="Mating service support"
    filterRegex={/.+/i}
    listingTypeRegex={/^mating$/i}
    trustBreedText="Verified breeder matches"
    lifestyleCards={matingLifestyleCards}
  />
);

export default MatingServices;
