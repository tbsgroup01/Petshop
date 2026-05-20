import React from 'react'
import HeroSection from '../components/Hero'
import BreederCTA from '../components/BreederCTA'
import PetListing from '../components/PetListing'
import FeaturesSection from '../components/FeaturesSection'
import ServiceGrid from '../components/ServiceGrid'
import MatingSection from '../components/MatingSection'
import RecentListings from '../components/RecentListings'
import BlogSection from '../components/BlogSection'

const Home = () => {
  return (
    // The "min-h-screen" and "bg-gray-50" create a clean, professional canvas
    <div className="min-h-screen bg-[#F8F9FE] antialiased">
      {/* Container to keep content centered and readable */}
      <main className="">
        <HeroSection />
        
        {/* Adds consistent vertical breathing room between sections */}
        <div className="flex flex-col gap-16 py-16">
          <BreederCTA />
          <PetListing />
          <FeaturesSection />
          <ServiceGrid />
          <MatingSection />
          <RecentListings/>
          <BlogSection/>
  
        </div>
      </main>

      
    </div>
  )
}

export default Home