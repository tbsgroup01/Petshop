import React from "react";
import PetCategoryPage from "../components/PetCategoryPage";

const catLifestyleCards = [
  { title: "Apartment Friendly", subtitle: "Calm indoor companions", accent: "bg-sky-400" },
  { title: "Family Cuddler", subtitle: "Loving and social", accent: "bg-indigo-400" },
  { title: "Playful Energy", subtitle: "Curious and active", accent: "bg-rose-400" },
];

const CatPage = () => (
  <PetCategoryPage
    heroImage="https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=1400&q=80"
    ctaImage="https://images.unsplash.com/photo-1511044568932-338cba0ad803?auto=format&fit=crop&w=900&q=80"
    fallbackImage="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=700&q=80"
    heroTitleLine2="Feline Friend"
    heroDescription="Explore healthy kittens and adult cats from verified breeders with transparent live listings."
    searchButtonLabel="Find Cats"
    liveResultsLabel="cats"
    availableTitle="Available Kittens"
    emptyStateText="No active cat listings found."
    lifestyleDescription="Different homes need different cats. Choose what fits yours."
    handbookTitle="First time owning a cat?"
    ctaImageAlt="First time cat owner help"
    filterRegex={/cat|kitten|feline/i}
    trustBreedText="Pedigree verified cats"
    lifestyleCards={catLifestyleCards}
  />
);

export default CatPage;
