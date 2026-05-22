import React from "react";
import PetCategoryPage from "../components/PetCategoryPage";

const dogLifestyleCards = [
  { title: "Apartment Friendly", subtitle: "Ideal for compact homes", accent: "bg-sky-400" },
  { title: "Family Guard", subtitle: "Loyal and protective", accent: "bg-indigo-400" },
  { title: "High Energy", subtitle: "Great for active owners", accent: "bg-rose-400" },
];

const DogPage = () => (
  <PetCategoryPage
    heroImage="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=1400&q=80"
    ctaImage="https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=900&q=80"
    fallbackImage="https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=700&q=80"
    heroTitleLine2="Best Friend"
    heroDescription="Discover healthy puppies and adult dogs from verified breeders with transparent live listings."
    searchButtonLabel="Find Pets"
    liveResultsLabel="dogs"
    availableTitle="Available Puppies"
    emptyStateText="No active dog listings found."
    lifestyleDescription="Different homes need different dogs. Choose what fits yours."
    handbookTitle="First time owning a dog?"
    ctaImageAlt="First time dog owner help"
    filterRegex={/dog|puppy|canine/i}
    trustBreedText="Pedigree verified dogs"
    lifestyleCards={dogLifestyleCards}
  />
);

export default DogPage;
